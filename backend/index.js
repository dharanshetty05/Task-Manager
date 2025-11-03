const express = require('express');
const app = express();
const PORT = 3000;
const cors = require('cors');

let tasks = [
  { id: 1, title: "Learn Express", completed: false },
  { id: 2, title: "Build Task API", completed: false }
];

app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
})

app.use((req, res) => {
    res.status(404).json({ message: "Route not found" });
})

app.get("/", (req, res) => {
    res.send("Task Manager API is running...");
});

app.get("/tasks", (req, res) => {
    res.json(tasks);
});

app.post("/tasks", (req, res) => {
    const { title } = req.body;
    if(!title){
        return res.status(400).json({ message: "Title is required" });
    }

    const newTask = {
        id: tasks.length + 1,
        title,
        completed: false
    }
    tasks.push(newTask);
    res.status(201).json(newTask);
});

app.put('/tasks/:id', (req, res) => {
    const { id } = req.params;
    const { title, completed } = req.body;
    const task = tasks.find(t => t.id === parseInt(id));

    if(!task){
        return res.status(404).json({ message: "Task not found" });
    }

    if(title) task.title = title;
    if(completed !== undefined) task.completed = completed;

    res.json(task);
});

app.delete("/tasks/:id", (req, res) => {
    const { id } = req.params;
    const index = tasks.findIndex(t => t.id === parseInt(id));

    if(index === -1){
        return res.status(404).json({ message: "Task not found" });
    }

    const deletedTask = tasks.splice(index, 1);
    res.json({ message: "Task deleted", task: deletedTask});
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
