const crypto = require("crypto");
const User = require("./../models/userModel");
const AppError = require("./../utils/AppError");
const jwt = require("jsonwebtoken");
const { promisify } = require("util");
const asyncHandler = require("express-async-handler");
const sendEmail = require("./../utils/email");
exports.registerUser = asyncHandler(async (req, res, next) => {
  const { email, password, confirmPassword } = req.body;
  // if (!email ||!password||!confirmPassword) return next(new AppError(403, 'Missing details'))
  const newUser = await User.create({ email, password, confirmPassword });
  res.status(201).json({
    status: "success",
    newUser,
  });
});
exports.loginUser = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password)
    return next(new AppError(403, "Missing login details"));
  ///find user by its email
  const user = await User.findOne({ email }).select("+password");
  if (!user)
    return next(
      new AppError(
        404,
        "The user not exist please check your email or register"
      )
    );
  ///check the password
  if (!(await user.checkPassword(password, user.password)))
    return next(new AppError(403, "Email or password is incorrect"));
  /// generate token
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

  res.cookie("jwt", token, {
    httpOnly: true,
    expires: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
    /* secure:true */
  });
  ///send it to a client
  res.status(200).json({
    status: "success",
    token,
  });
  ///cookie or res.json()
});

exports.protect = asyncHandler(async (req, res, next) => {
  ///1 extract token from : a req.headers or b from cookies
  //a
  //console.log(req.cookies);
  /////WITH COOKIES//////////////
  /* if (!req.cookies || !req.cookies.jwt)
    return next(new AppError(403, "Please login!"));
  const token = req.cookies.jwt; */
  ////////////////////////
  if (
    !req.headers.authorization ||
    !req.headers.authorization.startsWith("Bearer")
  )
    return next(new AppError(400, "No token"));
  const token = req.headers.authorization.split(" ")[1];
  //console.log(token);
  ///2 verify token and extract payload data id
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
  console.log(decoded.exp);
  console.log(Date.now());

  if (!decoded || !decoded.exp >= Date.now() / 1000) {
    return next(new AppError(403, "Please login"));
  }
  ///3 find user by id
  const user = await User.findById(decoded.id);
  if (!user) return next(new AppError(403, "Please login user"));
  ///4 upload user to req object
  /*  if (user.passwordChangedAt > decoded.iat)
    return next(new AppError(403, "Login again")); */
  req.user = user;
  //5 check if user role is premium ==> later will refactor to a different function

  /// go to the next function
  next();
});

///1 forgot password :
//נבדוק את המייל  ונשלח אליו קישור לשינוי סיסמה  הקישור יהיה תקף כ 5 דק
//sending emails
//change password
exports.forgotPassword = asyncHandler(async (req, res, next) => {
  const { email } = req.body;
  if (!email) return next(new AppError(401, "Bad request email is missing"));
  const user = await User.findOne({ email });
  if (!user)
    return next(
      new AppError(404, "No account associated with the given email")
    );
  //change password token
  const resetToken = user.createPasswordResetToken();

  await user.save({
    validateBeforeSave: false,
  });
  const resetUrl = `${req.protocol}://${req.get(
    "host"
  )}/api/users/resetPassword/${resetToken}`;
  console.log(resetUrl);

  ///send this reset url to the users email
  const mailOptions = {
    from: "Shoppi <donotreplay@shoppi.com>",
    to: user.email,
    subject: "Password reset",
    text: `<h3>Please follow this link to reset your password </h3> <a href="${resetUrl}">Click here to reset your password</a> `,
  };
  try {
    await sendEmail(mailOptions);

    res.status(200).json({
      status: "success",
      message: "The password reset link has been sent to your email",
      resetToken,
    });
  } catch (err) {
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save({ validateBeforeSave: false });
    return next(new AppError(500, "There was a problem sending email"));
  }
});

exports.resetPassword = asyncHandler(async (req, res, next) => {
  const { password, confirmPassword } = req.body;
  const { plainResetToken } = req.params;
  if (!password || !confirmPassword || !plainResetToken)
    return next(new AppError(401, "Missing Detailes"));
  ///encrypt plain token to match the reset token in db
  const hashedToken = crypto
    .createHash("sha256")
    .update(plainResetToken)
    .digest("hex");
  ///find user based on the reset token
  const user = await User.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpires: { $gte: Date.now() },
  }).select("+password");
  if (!user) return next(new AppError(400, "Do forgot password again"));
  ///change password
  user.password = password;
  user.confirmPassword = confirmPassword;
  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;

  ///save user
  await user.save();
  res.status(200).json({
    status: "success",
    message: "The password has been changed",
  });
  ///delete token
});

exports.logout = (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(Date.now() - 1000),
    secure: true,
  });
  ///send it to a client
  res.status(200).json({
    status: "success",
    message: "Logout success",
  });
  ///cookie or res.json()
};
