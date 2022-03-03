import React, { useState, useEffect } from 'react';
import questions from '../questions.json';
import QuestionCard from '../components/QuestionCard';
const QuizForm = () => {

    const [response, setResponse] = useState(questions?.results);
    const [currentStep, setcurrentStep] = useState(0);


    const handleSubmit = (e) => {
        e.preventDefault();
        if (currentStep < +response.length - 1) {
            setcurrentStep(currentStep + 1);
        } else {
            setcurrentStep(currentStep);
        }
    };

    return (
        <div>
            {response !== undefined && (
                <QuestionCard
                    amount={+response.length}
                    question={response[currentStep].question}
                    correct_answer={response[currentStep].correct_answer}
                    incorrect_answers={response[currentStep].incorrect_answers}
                    callback={handleSubmit}
                    options={[
                        ...response[currentStep].incorrect_answers,
                        response[currentStep].correct_answer,
                    ]
                        .map((a) => ({ sort: Math.random(), value: a }))
                        .sort((a, b) => a.sort - b.sort)
                        .map((a) => a.value)}
                />
            )}
        </div>
    )
}

export default QuizForm