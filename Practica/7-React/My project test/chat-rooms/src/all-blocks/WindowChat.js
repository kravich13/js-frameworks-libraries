import React from "react"
import SendMessageForm from "./SendMessageForm"

const styles = {
    divMain: {
        width: "1070px",
    },
    divChat: {
        display: "flex",
        flexDirection: "column",
        height: "742px",
        background: "grey"
    }
}

export default function WindowChat () {

    let i = 0
    const messages = [{
            id: i++,
            nickname: "Влад Кравич",
            messages: "ну привет",
            timestamp: new Date().getTime()
        },
        {
            id: i++,
            nickname: "Maksym Baranovkyi",
            messages: "Привет",
            timestamp: new Date().getTime()
        },
        {
            id: i++,
            nickname: "SV",
            messages: "Здравствуй",
            timestamp: new Date().getTime()
        }
    ]

    return (
        <div style={styles.divMain}>
            <div style={styles.divChat}>
                {messages.map( user => {
                    return (
                        <div key={user.id}>
                            <p>
                                {user.nickname}: {user.messages} 
                                <br/>
                            </p>
                            <span>{user.timestamp}</span>
                        </div>
                    )
                })}
            </div>

            <SendMessageForm />
        </div>
    )
}