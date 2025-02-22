import AddTaskDialog from "../components/AddTaskDialog.jsx";
import TodoItem from "../components/TodoItem.jsx";
import { useTodo } from "../context/TodoContext.jsx";
import { useState } from "react";
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy, arrayMove } from "@dnd-kit/sortable";
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";

const Home = () => {
    const { todos, handleAddTodo, handleUpdateTodo } = useTodo();
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor)
    );

    const handleAddTask = async (newTask) => {
        setIsLoading(true);
        try {
            await handleAddTodo(newTask);
        } catch (error) {
            console.error("خطا در افزودن تسک:", error);
        } finally {
            setIsLoading(false);
            setIsDialogOpen(false);
        }
    };

    const onDragEnd = (event) => {
        const { active, over } = event;

        if (active.id !== over.id) {
            const oldIndex = todos.findIndex((todo) => todo._id === active.id);
            const newIndex = todos.findIndex((todo) => todo._id === over.id);
            const newTodos = arrayMove(todos, oldIndex, newIndex);

            handleUpdateTodo(active.id, { status: newTodos[newIndex].status });
        }
    };

    return (
        <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={onDragEnd}
            modifiers={[restrictToVerticalAxis]}
        >
            <div className="todo-container">
                <h2 className="todo-title">لیست کارها</h2>
                <button className="todo-button" onClick={() => setIsDialogOpen(true)}>
                    افزودن تسک
                </button>

                <AddTaskDialog
                    isOpen={isDialogOpen}
                    onClose={() => setIsDialogOpen(false)}
                    onAdd={handleAddTask}
                    isLoading={isLoading}
                />

                <div className="columns">
                    {["To Do", "In Progress", "Done"].map((status) => (
                        <div key={status} className="column">
                            <h3>{status}</h3>
                            <SortableContext items={todos.filter((todo) => todo.status === status)} strategy={verticalListSortingStrategy}>
                                {todos
                                    .filter((todo) => todo.status === status)
                                    .map((todo) => (
                                        <TodoItem key={todo._id} todo={todo} />
                                    ))}
                            </SortableContext>
                        </div>
                    ))}
                </div>
            </div>
        </DndContext>
    );
};

export default Home;
