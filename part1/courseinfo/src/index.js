import React from 'react'
import ReactDOM from 'react-dom'

const Header = (props) => {
    return (
        <>
            <h1>{props.name}</h1>
        </>
    )
}

const Part = (props) => {
    return (
        <>
            <p>{props.name} {props.exercises}</p>
        </>
    );
}

const Content = (props) => {
    return (
        <>
            {props.course.parts.map((part, i) => {
                return <Part name={part.name} exercises={part.exercises}/>
            })}
        </>
    )
}

const Total = (props) => {
    const parts = props.course.parts;
    let sum = 0;

    for (let i = 0; i < parts.length; i++) {
        sum += parts[i].exercises;
    }

    return (
        <>
            <p>Number of exercises {sum}</p>
        </>
    )
}

const App = () => {
    const course = {
        name: 'Half Stack application development',
        parts: [
            {
                name: 'Fundamentals of React',
                exercises: 10
            },
            {
                name: 'Using props to pass data',
                exercises: 7
            },
            {
                name: 'State of a component',
                exercises: 14
            }
        ]
    };

    return (
        <div>
            <Header name={course.name}/>
            <Content course={course}/>
            <Total course={course}/>
        </div>
    )
}

ReactDOM.render(<App/>, document.getElementById('root'))