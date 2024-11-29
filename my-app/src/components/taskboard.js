import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const TaskBoard = () => {
  const [tasks, setTasks] = useState([]);
  const [draggedTask, setDraggedTask] = useState(null);
  const statuses = ["To Do", "In Progress", "Done"];
  const navigate = useNavigate();

  useEffect(() => {
    fetch("/tasks")
      .then((response) => response.json())
      .then((data) => setTasks(data))
      .catch((error) => console.error("Error fetching tasks:", error));
  }, []);

  const handleDragStart = (task) => {
    setDraggedTask(task);
  };

  const handleDrop = async (status) => {
    if (draggedTask) {
      const updatedTask = { ...draggedTask, status };
      try {
        await fetch(`http://localhost:5001/tasks/${draggedTask._id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updatedTask),
        });
        setTasks(tasks.map((t) => (t._id === draggedTask._id ? updatedTask : t)));
      } catch (error) {
        console.error("Error updating task:", error);
      }
      setDraggedTask(null);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-3xl font-bold mb-6">Task Manager</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {statuses.map((status) => (
          <div
            key={status}
            onDragOver={(e) => e.preventDefault()}
            onDrop={() => handleDrop(status)}
            className="bg-white rounded-lg shadow-md p-4"
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">
                {status} ({tasks.filter((task) => task.status === status).length})
              </h2>
              <button
                onClick={() => navigate("/new-task")}
                className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 transition"
              >
                New
              </button>
            </div>
            <div className="space-y-4">
              {tasks
                .filter((task) => task.status === status)
                .map((task) => (
                  <div
                    key={task._id}
                    draggable
                    onDragStart={() => handleDragStart(task)}
                    onClick={() => navigate(`/task/${task._id}`)}
                    className="p-4 bg-gray-100 rounded shadow-sm hover:shadow-lg transition-shadow cursor-pointer mb-4"
                  >
                    <h3 className="text-lg font-semibold">{task.title}</h3>
                    <p className="text-gray-600 text-sm mt-2">{task.description}</p>
                  </div>
                ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TaskBoard;
