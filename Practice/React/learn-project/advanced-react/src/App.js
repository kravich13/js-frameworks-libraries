import './App.css'
import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom'
// import JSX_All from './components/jsx-all'
// import Columns from './components/fragment-columns'
// import JSX_All from './components/jsx-all'
// import ErrorBoundary from './components/error-boundary'
// import Modal from './Modal/Modal'
import PortalModal from './Modal/My-modal'

// Фрагменты
// function App() {
//   return (
// <div className="App">
//   <table>
//     <tbody>
//       <tr>
//         <Columns />
//       </tr>
//     </tbody>
//   </table>
// </div>
//   )
// }

// function App() {
//   const [liItem, setLiItem] = useState([
//     { id: 1, title: 'iPhone 5s' },
//     { id: 2, title: 'iPhone 6s Plus' },
//     { id: 3, title: 'iPhone 10' }
//   ])

//   return (
// <div className="App">
//   <Columns test={liItem} />
// </div>
//   )
// }

// JSX в деталях
// function App() {
//   const props = { firstName: 'Влад', lastName: 'Кравич' }

//   return (
//     <div className="App">
//       {/* <JSX_All firstName="Влад" lastName="Кравич"/> */}
//       {/* <JSX_All {...props} /> */}
//       {/* <JSX_All>Тестовый литерал</JSX_All> */}
//       {/* <JSX_All /> */}
//     </div>
//   )
// }

// function App() {
//   return (
//     <div className="App">
//       <JSX_All numTimes={13}>
//         {(index) => <div key={index}>Этот элемент с ключом {index}</div>}
//       </JSX_All>
//     </div>
//   )
// }

// Обработка ошибок
// function BuggyCounter(props) {
//   const [counter, setCounter] = useState(0)

//   function handleClick() {
//     setCounter(() => counter + 1)
//   }

//   if (counter === 3) {
//     throw new Error('I crashed !')
//   }
//   return <h1 onClick={handleClick}>{counter}</h1>
// }

// function App() {
//   return (
//     <div className="App">
//       <div>
//         <ErrorBoundary>
//           <p>
//             При ошибке на любом из элементов сработает обработчик на оба
//             элемента:
//           </p>
//           <BuggyCounter />
//           <BuggyCounter />
//         </ErrorBoundary>
//         <hr />
//         <p>Для каждого элемента свой блок с ошибкой:</p>
//         <ErrorBoundary>
//           <BuggyCounter />
//         </ErrorBoundary>
//         <ErrorBoundary>
//           <BuggyCounter />
//         </ErrorBoundary>
//       </div>
//     </div>
//   )
// }

// ПОРТАЛЫ
// function App() {
//   const [openPortal, setOpenPortal] = useState(false)

//   return (
//     <div className="App">
//       <button onClick={() => setOpenPortal(true)}>Открыть портал</button>
//       <PortalModal isOpen={openPortal} onClose={() => setOpenPortal(false)} />
//     </div>
//   )
// }

function useInput(initialValue) {
  const [value, setValue] = useState(initialValue)

  function onChange(event) {
    setValue(event.target.value)
  }

  return {
    value,
    onChange
  }
}

function App() {
  const input = useInput('')
  const lastName = useInput('')

  return (
    <div className="App">
      <input type="text" {...input} />
      <input type="text" {...lastName} />
      <p>
        {input.value} {lastName.value}
      </p>
    </div>
  )
}

export default App
