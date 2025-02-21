import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const Todo = () => {
  const [todo, setTodo] = useState({ title: "", description: "", date: "" });
  const [isEditing, setIsEditing] = useState(false);
  const [updatedTitle, setUpdatedTitle] = useState("");
  const [updatedDescription, setUpdatedDescription] = useState("");
  const [updatedDate, setUpdatedDate] = useState("");

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTodo = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/todolist/${id}`);
        setTodo(response.data);
        setUpdatedTitle(response.data.title);
        setUpdatedDescription(response.data.description);
        setUpdatedDate(response.data.date);
      } catch (error) {
        console.log(error);
      }
    };

    fetchTodo();
  }, [id]);

  const handleUpdate = async () => {
    try {
      await axios.put(`http://localhost:3000/todolist/${id}`, {
        title: updatedTitle,
        description: updatedDescription,
        date: updatedDate,
      });
      setTodo({ ...todo, title: updatedTitle, description: updatedDescription, date:updatedDate });
      setIsEditing(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:3000/todolist/${id}`);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Card className="w-[750px]">
        <CardHeader>
          <CardTitle className="flex justify-between">
            {isEditing ? (
              <input
                type="text"
                value={updatedTitle}
                onChange={(e) => setUpdatedTitle(e.target.value)}
                className="border p-1"
              />
            ) : (
              <h1>{todo.title}</h1>
            )}
            <div className="justify-end">
              {isEditing ? (
                <Button onClick={handleUpdate} className="bg-blue-400">
                  Save
                </Button>
              ) : (
                <Button onClick={() => setIsEditing(true)} className="bg-green-400">
                  Update
                </Button>
              )}
              <Button onClick={handleDelete} variant="destructive">
                Delete To Do
              </Button>
            </div>
          </CardTitle>
          {isEditing ? (
            <input
              type="text"
              value={updatedDate}
              onChange={(e) => setUpdatedDate(e.target.value)}
              className="border p-1"
            />
          ) : (
              <p className="text-grey-200">{todo.date}</p>
          )}
        </CardHeader>
        <CardContent className="flex flex-col items-center py-10">
          {isEditing ? (
            <textarea
              value={updatedDescription}
              onChange={(e) => setUpdatedDescription(e.target.value)}
              className="border p-2 w-full"
            />
          ) : (
            <p>{todo.description}</p>
          )}
        </CardContent>
        <CardFooter className="flex justify-between">
          <h1>Made with ♥ by Mario Inguito</h1>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Todo;
