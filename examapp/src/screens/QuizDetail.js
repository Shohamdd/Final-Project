import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/quiz.css'

const QuizDetail = () => {
    let navigate = useNavigate();

    const proceedToQuiz = () => {
        navigate('/quizForm');
    }

    return (
        <div className='button-container'>
            <button className='btns' onClick={proceedToQuiz}>Start Quiz</button>
        </div>
    )
}

export default QuizDetail