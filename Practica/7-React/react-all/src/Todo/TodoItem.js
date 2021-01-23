import React from "react"

export default function TodoItem ({ message, clickLi }) {
    const classes = ["testLi"]

    if (message.completed) {
        classes.push("clickLi")
    }

    return (
        <li className={classes.join(" ")}
            // className="testLi"
            onClick={ () => clickLi(message.id)}
        >
        {`[${message.id}]: ${message.title}`}
        </li>
    )
}