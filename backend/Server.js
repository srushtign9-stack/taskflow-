const express = require("express");
const cors = require("cors");
const tasks = require("./tasks");

const app = express();

app.use(cors());
app.use(express.json());

// Home route
app.get("/", (req, res) => {
  res.json({
    message: "Welcome to TaskFlow API 🚀"
  });
});

// Get all tasks
app.get("/api/tasks", (req, res) => {
  res.json(tasks);
});

// Add a new task
app.post("/api/tasks", (req, res) => {
  const { title, status, priority } = req.body;

  const newTask = {
    id: tasks.length + 1,
    title,
    status: status || "To Do",
    priority: priority || "Medium"
  };

  tasks.push(newTask);
  res.status(201).json(newTask);
});

// Update a task
app.put("/api/tasks/:id", (req, res) => {
  const task = tasks.find(
    (task) => task.id === Number(req.params.id)
  );

  if (!task) {
    return res.status(404).json({ message: "Task not found" });
  }

  task.title = req.body.title || task.title;
  task.status = req.body.status || task.status;
  task.priority = req.body.priority || task.priority;

  res.json(task);
});

// Delete a task
app.delete("/api/tasks/:id", (req, res) => {
  const index = tasks.findIndex(
    (task) => task.id === Number(req.params.id)
  );

  if (index === -1) {
    return res.status(404).json({ message: "Task not found" });
  }

  tasks.splice(index, 1);

  res.json({ message: "Task deleted successfully" });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
 
