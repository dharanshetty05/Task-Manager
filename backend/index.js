const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('✅ MongoDB Connected'))
    .catch(() => console.error('MongoDB connection error:', err));

mongoose.connection.once('open', () => {
  console.log('Connected to MongoDB:', mongoose.connection.name);
});

const Task = require('./models/Task');

app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
})


app.get("/", (req, res) => {
    res.send("Task Manager API is running...");
});

app.get("/tasks", async (req, res) => {
    const tasks = await Task.find();
    res.json(tasks);
});

app.post("/tasks", async (req, res) => {
    try{
        const { title } = req.body;
        if(!title)  return res.status(400).json({ message: "Title is required" });
        
        const newTask = await Task.create({ title });
        res.status(201).json(newTask);
    } catch(err) {
        res.status(500).json({ error: err.message });
    }
});

app.put('/tasks/:id', async (req, res) => {
    try{
        const { id } = req.params;
        const updated = await Task.findByIdAndUpdate(id, req.body, { new: true });
        if(!updated)    return res.status(404).json({ message: "Task not found" });
        res.json(updated);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.delete("/tasks/:id", async (req, res) => {
    try{
        const { id } = req.params;
        const deleted = await Task.findByIdAndDelete(id);
        if(!deleted)    return res.status(404).json({ message: "Task not found" });
        res.json({ message: 'Task deleted', task: deleted});
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

app.use((req, res) => {
    res.status(404).json({ message: "Route not found" });
})