import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Link } from "react-router-dom";

const TodoCard = ({ data }) => {
  return (
    <div>
      <Card className="w-[600px]">
        <CardHeader>
          <CardTitle>
            <Link to={`todo/${data.id}`}>{data.title}</Link>
          </CardTitle>
        </CardHeader>
        <CardContent>{data.description}</CardContent>
        <CardFooter className="flex justify-between">
          <h1>{data.date}</h1>
        </CardFooter>
      </Card>
    </div>
  );
};

export default TodoCard;