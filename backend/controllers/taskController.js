const Task = require("../models/Task");

// Fetch all tasks for logged-in user
const getTasks = async (req, res) => {
    const tasks = await Task.find({ user: req.user._id });
    res.json(tasks);
}

// Create a new task
const createTask = async (req, res) => {
    const { title, description } = req.body;

    const task = new Task({
        title,
        description,
        user: req.user._id,
    });

    const createdTask = await task.save();
    res.status(201).json(createdTask);
};

// Update a task
const updateTask = async (req, res) => {
  const task = await Task.findById(req.params.id);

  if (!task) {
    return res.status(404).json({ message: "Task not found" });
  }

  if (task.user.toString() !== req.user._id.toString()) {
    return res.status(401).json({ message: "Not authorized" });
  }

  task.title = req.body.title || task.title;
  task.description = req.body.description || task.description;
  task.completed = req.body.completed ?? task.completed;

  const updatedTask = await task.save();
  res.json(updatedTask);
};

// Delete a task
const deleteTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    // Check ownership
    if (task.user.toString() !== req.user._id) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    await Task.deleteOne({ _id: task._id });

    res.status(200).json({ message: 'Task removed' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
};


