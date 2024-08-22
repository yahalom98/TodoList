import { apiSlice } from "./apiSlice";
export const todoApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getTodos: builder.query({
      query: () => ({
        url: "",
      }),
    }),
    getTodosById: builder.query({
      query: (todoId) => ({
        url: `/todos/${todoId}`,
      }),
    }),
    addTodo: builder.mutation({
      query: (data) => ({
        url: `/todos`,
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useGetTodosQuery, useGetTodosByIdQuery, useAddTodoMutation } =
  todoApiSlice;
