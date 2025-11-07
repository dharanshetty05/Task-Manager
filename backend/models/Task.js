const mongoose = require('mongoose');
const { CATEGORIES, DEFAULT_CATEGORIES } = require('../constants/categories');
const { PRIORITIES } = require('../constants/priorities');

const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    notes: {
        type: String,
        default: '',
    },
    dueDate: { type: Date },
    description: String,
    completed: {
        type: Boolean,
        default: false
    },
    category: {
        type: String,
        enum: CATEGORIES,
        default: DEFAULT_CATEGORIES,
        required: true
    },
    priority:{
        type: String,
        enum: PRIORITIES,
        default: 'Medium'
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },}, { timestamps: true }
);

taskSchema.index({ user: 1, category: 1, createdAt: -1 });
taskSchema.index({ user: 1, priority: 1 });
taskSchema.index({ user: 1, dueDate: 1});

module.exports = mongoose.model('Task', taskSchema);