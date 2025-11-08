const { CATEGORIES, DEFAULT_CATEGORY } = require("../constants/categories");
const Task = require("../models/Task");
const { PRIORITIES } = require("../constants/priorities");

// Fetch all tasks for logged-in user
const getTasks = async (req, res) => {

    try{
      const { category } = req.query;
      const query = { user: req.user._id };

      // If filtered by category
      if (category && CATEGORIES.includes(category)){
        query.category = category;
      }

      const tasks = await Task.find(query);
      res.json(tasks);
    } catch (error){
      console.error("Error fetching tasks:", error);
      res.status(500).json({ message: "Server error" });
    }
}

// Create a new task
const createTask = async (req, res) => {
  try{
    const { title, description, category, priority, dueDate, notes } = req.body;

    const categoryToUse = CATEGORIES.includes(category) ? category : DEFAULT_CATEGORY;

    const priorityToUse = PRIORITIES.includes(priority) ? priority : 'Medium';

    const task = new Task({
        title,
        description,
        user: req.user._id,
        category: categoryToUse,
        priority: priorityToUse,
        dueDate: dueDate || null,
        notes: notes || '',
    });

    const createdTask = await task.save();
    res.status(201).json(createdTask);
  } catch (error) {
    console.error("Error creating task:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Update a task
const updateTask = async (req, res) => {
  try{
    const task = await Task.findById(req.params.id);
  
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
  
    if (task.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: "Not authorized" });
    }
  
    const newCategory = req.body.category;
    if (newCategory && !CATEGORIES.includes(newCategory)) {
      return res.status(400).json({ message: "Invalid category" });
    }

    const newPriority = req.body.priority;
    if (newPriority && !PRIORITIES.includes(newPriority)) {
      return res.status(400).json({ message: "Invalid priority" });
    }
  
    task.title = req.body.title || task.title;
    task.description = req.body.description || task.description;
    task.completed = req.body.completed ?? task.completed;
    task.category = newCategory || task.category;
    task.priority = newPriority || task.priority;
    task.dueDate = req.body.dueDate || task.dueDate;
    task.notes = req.body.notes ?? task.notes;
  
    const updatedTask = await task.save();
    res.json(updatedTask);
  } catch(error){
    console.error("Error updating task: ", error);
    return res.status(500).json({ message: "Server error" });
  }
};

// Delete a task
const deleteTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    // Check ownership
    if (task.user.toString() !== req.user._id.toString()) {
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


