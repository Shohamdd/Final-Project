import React from "react";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import CreateAccount from "./screens/CreateAccount";
import LoginAccount from "./screens/LoginAccount";
import QuizDetail from "./screens/QuizDetail";
import QuizForm from "./screens/QuizForm";
import ResultPage from "./screens/ResultPage";
import { toast } from 'react-toastify';
import '../node_modules/react-toastify/dist/ReactToastify.css';




toast.configure({
	autoClose: 3000,
	draggable: false,
	//etc you get the idea
});

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<CreateAccount />} />
        <Route path="/loginAccount" element={<LoginAccount />} />
        <Route path="/quizDetail" element={<QuizDetail />} />
        <Route path="/quizForm" element={<QuizForm />} />
        <Route path="/resultPage" element={<ResultPage />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
