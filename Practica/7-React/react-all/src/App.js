import React, { useState, useEffect } from "react"
import "./App.css"
import TestTodo from "./Todo/TestTodo"
import TodoItem from "./Todo/TodoItem"


// function randomState () {
//     return Math.trunc(Math.random () * 13)
// }

function App () {

    ////// Работа с useState()

    // let [counterI, setCounterI] = useState( () => {
    //     return randomState()
    // })
    
    // function increment () { setCounterI(++counterI) } // работает плюс
    // function decrement () { setCounterI(--counterI) } // работает минус


    // let [counterStr, setCounterStr] = useState("Влад")

    // function strPlus () { 
    //     setCounterStr( prev => `${prev}П` )
    // }

    // function strMinus () { setCounterStr( prev => prev = "Влад") }

    // return (
    //     <div className="App">
    //         <h1>Строка: {counterI}</h1>    
    //         <button onClick={increment}>Добавить</button>
    //         <button onClick={decrement}>Убрать</button>
    //     </div>
    // )


    ////// Работа с компонентами

    let i = 1   
    let [messages, setMessages] = useState([
        { id: i++, completed: false, title: "Привет"  },
        { id: i++, completed: false, title: "ну даров"  },
        { id: i++, completed: false, title: "хай"  },
        { id: i++, completed: false, title: "кравич?"  },
        { id: i++, completed: false, title: "да"  }
    ])

    function toogleMessage (id) {
        setMessages(
            messages.map(mess => {
                if (mess.id === id) {
                    return mess.completed = !mess.completed
                }
                return mess
            })
        )
        
    }


    /////// Условия для рендеринга компонентов

    // function Greeting (props) {
    //     const isLoggedIn = props.isLoggedIn
    //     if (isLoggedIn) {
    //         return <UserGreeting />
    //     }
    //     return <GuestGreeting />
    // }

    // function UserGreeting ()  {
    //     return (
    //         <div>
    //             <h2>Блок с сообщениями:</h2>
    //             <p>Четверг <span>[1]: Привет</span></p>
    //             <p>Четверг <span>[2]: Привет</span></p>
    //         </div>
    //     )
    // }

    // function GuestGreeting () {
    //     return <p>Вы не авторизировались!</p>
    // }

    // return (
    //     <div className="App">
    //         <h1>Привет раз.</h1>
    //         <p>Спустя 1 год я взялся за реакт</p>

    //         <Greeting isLoggedIn={true} />
    
    //         {/* <TestTodo 
    //             messages={messages} 
    //             onToogle={toogleMessage}
    //         /> */}
    //     </div>
    // )


    ////// Условия в JSX

    // const messages = ["заработал 13 битков?", "эй ты"]

    // function MailBox (objArr)  {
    //     const arrMessage = objArr.myMessages

    //     return (
    //         <div>
    //             <h3>Здравствуйте</h3>
    //             {arrMessage.length > 0 &&
    //                 <p>
    //                     У вас {arrMessage.length} непрочитанных сообщений
    //                 </p>
    //             }   
    //         </div>
    //     )
    // }
    
    // const [flag, setFlag] = useState( () => false)

    // function MenuClick (objFlag) {
    //     if (!objFlag.flag) return null

    //     return (
    //         <div>1 лист...</div>
    //     )
    // }

    // function clickButton () { setFlag(!flag) }




    ////// Работа с формарми

    // const [userName, setUserName] = useState( () => "")

    // function handleSubmit (event) {
    //     event.preventDefault()
    //     alert(`Отправленное имя: ${userName}`)
    // }

    // function handleChange (event) {
    //     setUserName(event.target.value)
    // }




    /////// Хук useEffect

    // const [type, setType] = useState("users")
    
    // // console.log("рендер компонента")

    // useEffect( () => {
    //     // Вызывается всегда при рендере любого компонента
    //     console.log("рендер эффекта")
    // })

    // useEffect( () => {
    //     // Отслеживание изменения конкретного компонента 
    //     console.log("Тип изменён", type)
    // }, [type])

    return (
        <div className="App">

            {/* <h1>Ресурс: {type}</h1>

            <button onClick={ () => setType("users")}>Пользователи</button>
            <button onClick={ () => setType("todo")}>Todo</button>
            <button onClick={ () => setType("posts")}>Посты</button> */}


            {/* <form onSubmit={handleSubmit}>
               <label>
                Введите имя:
                <input onChange={handleChange}
                    type="text" 
                    name="userName" 
                    placeholder="Kravich" 
                />
               </label>
                <button>Отправить</button>
            </form> */}



            {/* <button onClick={() => clickButton(flag)}>
                {flag ? "Скрыть" : "Показать"} меню
            </button>

            <MenuClick flag={flag}/> */}


            {/* <p>
                Пользователь <b style={{color: "grey"}}>{flag ? "в сети" : "не в сети"}</b>
            </p> */}

            {/* <MailBox myMessages={messages} /> */}


            <div className="App">
                <h1>Привет ещё раз.</h1>
                <p>Спустя 1 год я взялся за реакт</p>
    
                <TestTodo messages={messages}/>
            </div>
        </div>
    )
}

export default App