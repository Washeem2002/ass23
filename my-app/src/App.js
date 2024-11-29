import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import TaskBoard from "./components/taskboard";
import TaskDetails from "./components/TaskDetails";
import AddTask from "./components/AddTask";

const App = () => (
  <Router>
    <Routes>
      <Route path="/" element={<TaskBoard />} />
      <Route path="/task/:id" element={<TaskDetails />} />
      <Route path="/new-task" element={<AddTask />} />
    </Routes>
  </Router>
);

export default App;
