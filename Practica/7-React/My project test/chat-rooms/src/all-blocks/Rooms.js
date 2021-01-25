import React from "react"

const styles = {
    div: {
        width: "300px",
        background: "rgb(153,153,153, 0.5)"
    },
    divInput: {
        textAlign: "center",
        padding: "10px 0",
    },
    input: {
        width: "230px",
        background: "rgba(192, 0, 0, 0.568)",
        border: "1px solid grey",
        borderRadius: "5px",
        color: "white",
        fontWeight: 600,
        outline: "none",
        height: "38px"
    },
    rooms: {
        display: "flex",
        flexDirection: "column"
    }
}

export default function Rooms () {

    let i = 0
    const rooms = [
        { id: i++, nameRoom: "Общий чат"  },
        { id: i++, nameRoom: "Ещё один чат"  },
        { id: i++, nameRoom: "Трейдинг"  }
    ]


    return (
        <div style={styles.div}>

            <div style={styles.divInput}>
                <input 
                    style={styles.input}
                    type="text" 
                    id="addRoom" 
                    placeholder="Название и Enter" 
                />
            </div>

            <ul>
                { rooms.map( room => {
                    return <li style={{listStyleType: "none"}} key={room.id}>{room.nameRoom}</li>
                }) }
            </ul>

        </div>
    )
}