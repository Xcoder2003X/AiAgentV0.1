import { motion } from "framer-motion";
import "./AiModelPage.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import speak from "./TextToSpeech";
import VoiceListener from "./VoiceListener";

export default function AIModelPage() {
    const [tasks, setTasks] = useState([]);  
      
    const [newTask, setNewTask] = useState({ title: "", description: "" });

  // Fetch tasks from backend
  useEffect(() => {
    fetchTasks();
  }, []);

  const handleTaskRequested = () => {
    // Convert tasks to speech
    let taskText = "Today's tasks are: ";
    tasks.forEach((task) => {
      taskText += `${task.title} - ${task.description}. `;
    });

    // Call the speak function to read out the tasks
    speak(taskText , "en-US");
  };

  const fetchTasks = () => {
    axios
      .get("http://localhost:8080/api/tasks/today")
      .then((response) => setTasks(response.data))
      .catch((error) => console.error("Error fetching tasks:", error));
  };

  // Handle input changes
  const handleChange = (e) => {
    setNewTask({ ...newTask, [e.target.name]: e.target.value });
  };

  // Add new task
  const addTask = () => {
    axios
      .post("http://localhost:8080/api/tasks/add", newTask)
      .then(() => {
        fetchTasks(); // Refresh task list
        setNewTask({ title: "", description: "" }); // Reset form
      })
      .catch((error) => console.error("Error adding task:", error));
  };

  // Delete a task
 /*const deleteTask = (id) => {
    axios
      .delete(`http://localhost:8080/api/tasks/delete/${id}`)
      .then(fetchTasks)
      .catch((error) => console.error("Error deleting task:", error));
  };*/

  const [loading, setLoading] = useState(false);

  const handleClick = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 2000);
  };

  return (
    <div className="container">
        <VoiceListener onTaskRequested={handleTaskRequested} />


      {/* Micro Logo */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="logo"
      >
        <img src="https://cdn.pixabay.com/animation/2023/10/03/13/05/13-05-39-823_512.gif" alt="mic"/>
        AI Hub
      </motion.div>

      {/* AI Model Image */}
      <motion.img
        src="https://cdn.pixabay.com/animation/2023/03/31/11/25/11-25-00-669_512.gif"
        alt="AI Model"
        className="ai-image"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1 }}
      />

      {/* Interactive Button */}
      <motion.div
        className="button-container"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.5 }}
      >
        <button onClick={handleClick} className="explore-button">
          {loading ? "Processing..." : "Explore AI"}
        </button>
      </motion.div>

      <div className="add-task">
      <h3>Add New Task</h3>
      <input
        type="text"
        name="title"
        placeholder="Task Title"
        value={newTask.title}
        onChange={handleChange}
      />
      <input
        type="text"
        name="description"
        placeholder="Task Description"
        value={newTask.description}
        onChange={handleChange}
      />
      <button onClick={addTask}>➕ Add Task</button>
      </div>
    </div>
  );
}