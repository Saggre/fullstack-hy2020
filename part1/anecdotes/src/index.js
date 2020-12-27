import React, {useState} from 'react'
import ReactDOM from 'react-dom'

const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const Button = ({text, onClick}) => (
    <button onClick={onClick}>
        {text}
    </button>
)

const Anecdote = ({anecdote, votes}) => {
    return (
        <>
            {anecdote}
            <br/>
            has {votes} votes
        </>
    );
}

const App = ({anecdotes}) => {
    const [selected, setSelected] = useState(0)
    const [votes, setVotes] = useState(new Array(anecdotes.length).fill(0))

    /**
     * Get index for a random anecdote
     * @returns {number}
     */
    const getRandomAnecdoteIndex = () => {
        return (anecdotes.length * Math.random()) | 0;
    }

    /**
     * Get index of the anecdote with the most votes
     * @returns {number}
     */
    const getTopAnecdoteIndex = () => {
        let top = [0, 0];
        anecdotes.forEach((anecdote, i) => {
            if (votes[i] > top[1]) {
                top[0] = i;
                top[1] = votes[i];
            }
        });

        return top[0];
    }

    const topAnecdoteIndex = getTopAnecdoteIndex();

    return (
        <div>
            <h2>Anecdote of the day</h2>
            <Anecdote anecdote={anecdotes[selected]} votes={votes[selected]}/>
            <br/>
            <Button text='vote' onClick={() => {
                const newVotes = [...votes];
                newVotes[selected]++;
                setVotes(newVotes);
            }}/>
            <Button text='next anecdote' onClick={() => setSelected(getRandomAnecdoteIndex())}/>
            <h2>Anecdote with most votes</h2>
            <Anecdote anecdote={anecdotes[topAnecdoteIndex]} votes={votes[topAnecdoteIndex]}/>
        </div>
    )
}

ReactDOM.render(
    <App anecdotes={anecdotes}/>,
    document.getElementById('root')
)