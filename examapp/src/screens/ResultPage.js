import { Paper } from '@material-ui/core';
import React from 'react'
import { useLocation } from 'react-router-dom'

const ResultPage = () => {
    let location = useLocation();
    console.log(location.state)
    return (
        <React.Fragment>
            <Paper elevation={3} className="page-result">
                <span>
                    <h2> Total = {location.state.amount}</h2>

                </span>
                <span>
                    <h2> Obtained = {location.state.totalScore} </h2>

                </span>
                <span>
                    <h2>   Percentage = {location.state.percentage} %</h2>

                </span>
                <span>
                    <h2>  Status = {location.state.status ? "Passed" : "Failed"} </h2>

                </span>
            </Paper>
        </React.Fragment>
    )
}

export default ResultPage