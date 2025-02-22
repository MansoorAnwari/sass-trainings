import { useParams } from "react-router-dom";
import { useTodo } from "../context/TodoContext";

const TaskDetails = () => {
    const { id } = useParams(); // آیدی تسک رو از URL بگیر
    const { todos } = useTodo(); // لیست تسک‌ها رو بگیر
    const task = todos.find((todo) => todo._id === id); // تسک مورد نظر رو پیدا کن

    if (!task) return <p>تسک پیدا نشد!</p>;

    return (
        <div className="task-details">
            <h2>{task.title}</h2>
            <p>{task.description}</p>
            <p>وضعیت: {task.status}</p>
        </div>
    );
};

export default TaskDetails;