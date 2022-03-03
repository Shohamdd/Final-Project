import React, { useState } from "react";
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom'
import { Radio, Typography, Slider, } from "@material-ui/core";
import '../css/quiz.css'
import { useStateValue } from "../StateProvider";
import logo from '../img/questionLogo.png';

const QuestionCard = ({ question, correct_answer, callback, options, amount }) => {

    let navigate = useNavigate();
    const [{ user }, dispatch] = useStateValue();

    const [Value, setValue] = useState(null);
    const [counter, setCounter] = useState(0);
    const [total, settotal] = useState(0);

    const notify = (message) => toast(message);


    const evaluateResult = () => {
        if (Value === correct_answer) {
            setCounter(counter + 1);
            settotal(total + 1);
        } else if (Value !== correct_answer) {
            settotal(total + 1);
        } else {
            notify('Please select an answer!');
        }
        setValue(null);
    }
    const evaluateResultCalculate = () => {
        const state = {
            amount: amount,
            totalScore: counter,
            percentage: (counter / amount) * 100,
            status: (counter / amount) * 100 >= 50 ? true : false
        }


        fetch('http://localhost:8080/api/v1/saveExam', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: user.email || localStorage.getItem('useremail'),
                scoreObtained: counter,
                scoreTotal: amount,
                percentage: (counter / amount) * 100,
                status: (counter / amount) * 100 >= 50 ? true : false
            })
        }).then(res => res.json())
            .then(data => {
                if (data.status) {
                    notify('Score submitted & Email Sent!');
                    navigate('/resultPage', { state });
                } else {
                    notify(data.message);
                }
            })

    }


    return (
        <div className="QuestionCard">
            <div className="QuestionIllustration">
                <div className="image-container">
                    <Typography id="discrete-slider-small-steps" gutterBottom>
                        Questions (Total Question = {amount})
                    </Typography>
                    <Slider
                        defaultValue={total}
                        aria-labelledby="discrete-slider-small-steps"
                        step={1}
                        marks
                        min={0}
                        max={amount}
                        valueLabelDisplay="auto"
                        value={total}
                        style={{ width: "400px" }}
                    />
                </div>
                <div className="image-container"
                >

                    <img src={logo} width="40%" className="Photo__Illustration" />
                </div>
            </div>

            <div className="QuestionTemplate">
                <h2 style={{ height: "100px" }}>{question}</h2>
                <form onSubmit={callback} className="form-question">
                    <ul className="Options">
                        {options.map((currentOption, index) => {
                            return (
                                <li className="option_number" key={index}>
                                    <div className="option_Each">
                                        <Radio
                                            checked={Value === currentOption}
                                            value={currentOption}
                                            name="name"
                                            style={{ userSelect: 'none' }}
                                            onChange={(e) => setValue(e.target.value)}
                                        />
                                        {currentOption}
                                    </div>
                                </li>
                            );
                        })}
                        <br />
                        {total < amount ?

                            <button type="submit" onClick={evaluateResult} className='btns'>
                                Next Question
                            </button>

                            :
                            <button type="submit" onClick={evaluateResultCalculate} className='btns'>
                                Submit
                            </button>}

                    </ul>
                </form>
            </div>
        </div>
    );
};


export default QuestionCard;
