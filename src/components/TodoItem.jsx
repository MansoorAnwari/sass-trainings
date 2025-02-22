import { useTodo } from "../context/TodoContext.jsx";
import { useState } from "react";

const TodoItem = ({ todo }) => {
    const { handleDeleteTodo, handleUpdateTodo } = useTodo();
    const [isEditing, setIsEditing] = useState(false);
    const [newTitle, setNewTitle] = useState(todo.title);
    const [newDescription, setNewDescription] = useState(todo.description);
    const [isLoading, setIsLoading] = useState(false);

    const handleSave = async () => {
        if (newTitle.trim() === "" || newDescription.trim() === "") {
            alert("عنوان و توضیحات نمی‌توانند خالی باشند!");
            return;
        }
        setIsLoading(true);
        try {
            await handleUpdateTodo(todo._id, { title: newTitle, description: newDescription });
            setIsEditing(false);
        } catch (error) {
            alert("خطا در ذخیره تسک");
        } finally {
            setIsLoading(false);
        }
    };

    const handleDelete = async () => {
        setIsLoading(true);
        try {
            await handleDeleteTodo(todo._id);
        } catch (error) {
            alert("خطا در حذف تسک");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="todo-item">
            {isEditing ? (
                <>
                    <input
                        type="text"
                        value={newTitle}
                        onChange={(e) => setNewTitle(e.target.value)}
                        className="todo-edit-input"
                        placeholder="عنوان"
                    />
                    <textarea
                        value={newDescription}
                        onChange={(e) => setNewDescription(e.target.value)}
                        className="todo-edit-textarea"
                        placeholder="توضیحات"
                    />
                    <button onClick={handleSave} className="todo-save-button" disabled={isLoading}>
                        {isLoading ? <div className="spinner"></div> : "ذخیره"}
                    </button>
                </>
            ) : (
                <>
                    <span className="todo-text">{todo.title}</span>
                    <p className="todo-description">{todo.description}</p>
                    <div className="todo-actions">
                        <button onClick={() => setIsEditing(true)} className="todo-edit">ویرایش</button>
                        <button onClick={handleDelete} className="todo-delete" disabled={isLoading}>
                            {isLoading ? <div className="spinner"></div> : "حذف"}
                        </button>
                    </div>
                </>
            )}
        </div>
    );
};

export default TodoItem;
