import React from "react";
import TaskCard from "./TaskCard";
import { useDroppable } from "@dnd-kit/core";

const Column = ({ status, tasks }) => {
    const { setNodeRef } = useDroppable({ id: status });

    const filteredTasks = tasks.filter(task => task.status === status);

    return (
        <div ref={setNodeRef} className="column">
            <h2>{status}</h2>
            {filteredTasks.map(task => (
                <TaskCard key={task._id} task={task} />
            ))}
        </div>
    );
};

export default Column;
