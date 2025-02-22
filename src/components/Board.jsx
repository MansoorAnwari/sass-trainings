import React, { useEffect, useState } from "react";
import Column from "./Column";
import { getTasks, updateTaskStatus } from "../../api/tasks";
import { DndContext } from "@dnd-kit/core";

const Board = () => {
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        loadTasks();
    }, []);

    const loadTasks = async () => {
        const response = await getTasks();
        setTasks(response);
    };

    const handleDragEnd = async (event) => {
        const { active, over } = event;
        if (!over) return;

        const taskId = active.id;
        const newStatus = over.id; // وضعیت جدید بر اساس ستون

        const updatedTask = await updateTaskStatus(taskId, newStatus);
        setTasks(tasks.map(task => (task._id === taskId ? updatedTask : task)));
    };


    return (
        <DndContext onDragEnd={handleDragEnd}>
            <div className="board">
                {["To Do", "In Progress", "Done", "Delete"].map((status) => (
                    <Column key={status} status={status} tasks={tasks} />
                ))}
            </div>
        </DndContext>
    );
};

export default Board;
