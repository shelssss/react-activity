import React from "react";
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
import MainLayout from "@/layouts/MainLayout";
import Todos from "./pages/Todos";
import Todo from "./pages/Todo";
import AddTodo from "./pages/AddTodo";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<MainLayout />}>
      <Route index element={<Todos/>} />
      <Route path="/todo/:id" element={<Todo/>} />
      <Route path="/add-todo" element={<AddTodo/>} />
    </Route>
  )
);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;