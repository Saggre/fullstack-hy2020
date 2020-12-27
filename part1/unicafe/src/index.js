import React, {useState} from 'react'
import ReactDOM from 'react-dom'

const Display = ({value, text}) => <div>{text + ' ' + value}</div>

const Button = (props) => (
    <button onClick={props.handleClick}>
        {props.text}
    </button>
)

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
            <Display value={good} text='good'/>
            <Display value={neutral} text='neutral'/>
            <Display value={bad} text='bad'/>
        </div>
    )
}

ReactDOM.render(<App/>,
    document.getElementById('root')
)