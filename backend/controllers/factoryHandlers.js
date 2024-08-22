const APImethods = require("../utils/APImethods");
const AppError = require("./../utils/AppError");
const asyncHandler = require("express-async-handler");

exports.deleteOne = (Model) => {
  return asyncHandler(async (req, res, next) => {
    const deletedDoc = await Model.findByIdAndDelete(req.params.id);
    if (!deletedDoc)
      return next(new AppError(400, "The requested product is not found"));
    res.status(204).json({
      status: "success",
      doc: null,
    });
  });
};

exports.editOne = (Model) =>
  asyncHandler(async (req, res, next) => {
    const editedDoc = await Model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({
      status: "success",
      editedDoc,
    });
  });

exports.getAll = (Model) =>
  asyncHandler(async (req, res, next) => {
    let filter = {};
    if (req.params.productId) {
      filter = {
        product: req.params.productId,
      };
    }
    const apimethods = new APImethods(Model.find(filter), req.query);
    apimethods.filter().sort().selectFields().makePagination();

    const docs = await apimethods.query;

    res.status(200).json({
      status: "success",
      docs,
    });
  });
exports.createOne = (Model) =>
  asyncHandler(async (req, res, next) => {
    const newDoc = await Model.create(req.body);
    res.status(201).json({
      status: "success",
      newDoc,
    });
  });

exports.getOne = (Model) =>
  asyncHandler(async (req, res, next) => {
    if (!req.params.id)
      return next(new AppError(403, "The id is not provided"));
    const doc = await Model.findById(req.params.id);
    if (!doc) return next(new AppError(400, "The requested doc is not found"));
    res.status(200).json({
      status: "success",
      doc,
    });
  });
