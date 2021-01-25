import React from "react"

const styles = {
    form: {
        display: "flex",
        alignSelf: "stretch",
        width: "100%",
        height: "38px",
    },
    userName: {
        width: "185px",
        background: "rgba(192, 0, 0, 0.568)",
        border: "1px solid grey",
        color: "white",
        fontWeight: 600,
        outline: "none" 

    },
    userMessage: {
        width: "76%",
        background: "rgba(192, 0, 0, 0.568)",
        border: "1px solid grey",
        color: "white",
        fontWeight: 600,
        outline: "none" 

    },
    sendMessage: {
        width: "5%",
        background: "rgba(192, 0, 0, 0.568)",
        border: "1px solid grey",
        outline: "none",
        color: "black",
        fontWeight: 600,
        fontSize: "25px"

    }
}

export default function SendMessageForm () {

    return (
        <form 
            style={styles.form}
            name="formUserData"
            id="formSendChat"
            // enctype="multipart/form-data"
        >
            <input style={styles.userName}
                id="userName"
                name="userName" 
                type="text" 
                placeholder="Введите имя" 
            />
            <input style={styles.userMessage}
                id="userMessage" 
                name="userMessage" 
                type="text" 
                placeholder="Напишите сообщение..." 
            />
            <button style={styles.sendMessage}
            id="sendMessage" 
            name="sendMessage"
            >
                &rsaquo;
            </button>

        </form>
    )
}