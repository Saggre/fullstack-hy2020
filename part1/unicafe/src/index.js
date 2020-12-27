import React, {useState} from 'react'
import ReactDOM from 'react-dom'

const Button = (props) => (
    <button onClick={props.handleClick}>
        {props.text}
    </button>
)

const Statistics = ({good, neutral, bad}) => {
    const getAverage = () => {
        return (good - bad) / Math.max(getCount(), 1);
    };

    const getCount = () => {
        return good + neutral + bad;
    };

    const getPositive = () => {
        return good / Math.max(getCount(), 1);
    };

    if (getCount() === 0) {
        return (
            <>
                <p>No feedback given</p>
            </>
        );
    }

    return (
        <table>
            <tbody>
            <Statistic value={good} text='good'/>
            <Statistic value={neutral} text='neutral'/>
            <Statistic value={bad} text='bad'/>
            <Statistic value={getCount()} text='all'/>
            <Statistic value={getAverage()} text='average'/>
            <Statistic value={(getPositive() * 100) + ' %'} text='positive'/>
            </tbody>
        </table>
    );
}

const Statistic = ({value, text}) => {
    return (
        <tr>
            <td>{text}</td>
            <td>{value}</td>
        </tr>
    );
}

const App = () => {
    // save clicks of each button to its own state
    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)

    return (
        <div>
            <h2>give feedback</h2>
            <Button handleClick={() => setGood(good + 1)} text='good'/>
            <Button handleClick={() => setNeutral(neutral + 1)} text='neutral'/>
            <Button handleClick={() => setBad(bad + 1)} text='bad'/>
            <h2>statistics</h2>
            <Statistics good={good} neutral={neutral} bad={bad}/>
        </div>
    )
}

ReactDOM.render(<App/>,
    document.getElementById('root')
)