import { useTodo } from "../context/TodoContext";
import TodoItem from "./TodoItem";

const TodoList = () => {
    const { todos } = useTodo();

    if (todos.length === 0) return <p>هیچ تسکی وجود ندارد</p>;

    return (
        <ul>
            {todos.map((todo) => (
                <TodoItem key={todo._id} todo={todo} />
            ))}
        </ul>
    );
};

export default TodoList;
