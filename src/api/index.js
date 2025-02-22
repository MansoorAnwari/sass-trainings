import axios from "axios";

const API_URL = "https://todo-api-livid.vercel.app/api/todos";

// دریافت لیست تسک‌ها
export const getTodos = async () => {
    const response = await axios.get(API_URL);
    return response.data;
};

// اضافه کردن تسک جدید
export const addTodo = async (newTask) => {
    const response = await axios.post(API_URL, newTask);
    return response.data;
};

// حذف تسک
export const deleteTodo = async (id) => {
    await axios.delete(`${API_URL}/${id}`);
};

// ویرایش تسک
export const updateTodo = async (id, updatedTitle) => {
    const response = await axios.put(`${API_URL}/${id}`, { title: updatedTitle });
    return response.data;
};