import React from  "react"
import TodoItem from "./TodoItem"

const styles = {
    ul: {
        listStyle: "none",
        margin: 0,
        marginLeft: "20px",
        padding: "10px",
        color: "red",
        background: "lightGrey",
        width: "300px",
        border: "1px solid black",
        borderRadius: "5px"
    }
}

export default function TestTodo (objMess) {
    return (
        <ul style={styles.ul}>
            { objMess.messages.map(message => {
                return (
                    <TodoItem 
                        message={message} 
                        key={message.id} 
                        clickLi={objMess.onToogle}
                    />   
                )
            }) }
        </ul>
    )
}