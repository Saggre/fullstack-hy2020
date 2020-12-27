import React from 'react'

const Header = ({text}) => {
    return (
        <>
            <h1>{text}</h1>
        </>
    )
}

const Part = ({name, exercises}) => {
    return (
        <>
            <p>{name} {exercises}</p>
        </>
    );
}

const Content = ({course}) => {
    return (
        <>
            {course.parts.map(part => <Part key={part.name} name={part.name} exercises={part.exercises}/>)}
        </>
    )
}

const Total = ({course}) => {
    let sum = course.parts.reduce((carry, part) => carry + part.exercises, 0);

    return (
        <>
            <p><b>Total of {sum} exercises</b></p>
        </>
    )
}

const Course = ({course}) => {
    return (
        <>
            <Header text={course.name}/>
            <Content course={course}/>
            <Total course={course}/>
        </>
    );
}

export default Course;