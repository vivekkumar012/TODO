import React, { useEffect, useState } from "react";
import axios from "axios";

function Home() {
  const [todos, setTodos] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const [newTodo, setNewTodo] = useState("");

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          "http://localhost:3001/api/v1/todo/fetch",
          {
            withCredentials: true,
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        setTodos(response.data);
        setError(null);
      } catch (error) {
        setError("Failed to fetch todos");
      } finally {
        setLoading(false);
      }
    };
    fetchTodos();
  }, []);

  const craeteTodo = async () => {
    if (!newTodo) return;
    try {
      const response = await axios.post(
        "http://localhost:3001/api/v1/todo/create",
        {
          text: newTodo,
          completed: false,
        },
        {
          withCredentials: true,
        }
      );
      setTodos([...todos, response.data]);
    } catch (error) {
      setError("Failed to fetch todos");
    }
  };

  const todoStatus = async (id) => {
    const todo = todos.find((t) => t._id === id);
    try {
      const response = await axios.post(
        `http://localhost:3001//api/v1/todo/update/${id}`,
        {
          ...todo,
          completed: !todo.completed,
        },
        {
          withCredentials: true,
        }
      );
      setTodos(todos.map((t) => (t._id === id ? response.data : t)));
    } catch (error) {
      setError("Failed to fetch todos");
    }
  };

  const todoDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3001//api/v1/todo/delete/${id}`, {
        withCredentials: true,
      });
      setTodos(todos.filter((t) => t._id !== id));
    } catch (error) {
      setError("Failed to fetch todos");
    }
  };

  return <div>Home Page</div>;
}

export default Home;
