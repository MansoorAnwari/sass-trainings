import { useState } from "react";
import * as Yup from "yup";

const validationSchema = Yup.object({
    title: Yup.string()
        .required("عنوان نمی‌تواند خالی باشد")
        .min(3, "عنوان باید حداقل ۳ کاراکتر باشد"),
    description: Yup.string()
        .required("توضیحات نمی‌تواند خالی باشد")
        .min(10, "توضیحات باید حداقل ۱۰ کاراکتر باشد"),
});

const AddTaskDialog = ({ isOpen, onClose, onAdd, isLoading }) => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [errors, setErrors] = useState({});

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = { title, description };

        try {
            await validationSchema.validate(formData, { abortEarly: false });

            await onAdd({ ...formData, status: "To Do" });

            setTitle("");
            setDescription("");
            setErrors({});
        } catch (error) {
            const newErrors = {};
            error.inner.forEach((err) => {
                newErrors[err.path] = err.message;
            });
            setErrors(newErrors);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="dialog-overlay">
            <div className="dialog">
                <h2>افزودن تسک جدید</h2>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>عنوان:</label>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                        />
                        {errors.title && <span className="error">{errors.title}</span>}
                    </div>
                    <div>
                        <label>توضیحات:</label>
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            required
                        />
                        {errors.description && <span className="error">{errors.description}</span>}
                    </div>
                    <div className="dialog-actions">
                        <button type="button" onClick={onClose}>لغو</button>
                        <button type="submit" disabled={isLoading}>
                            {isLoading ? <div className="spinner"></div> : "افزودن"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddTaskDialog;