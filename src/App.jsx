import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { TodoProvider } from "./context/TodoContext";
import Home from "./pages/Home";

function App() {
    return (
        <TodoProvider>
            <Router basename="/TodoList">
                <Routes>
                    <Route path="/" element={<Home />} />
                </Routes>
            </Router>
        </TodoProvider>
    );
}

export default App;
