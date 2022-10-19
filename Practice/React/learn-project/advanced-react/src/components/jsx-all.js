import React from 'react'

// export default function JSX_All(props) {
//   return (
//     <div>
//       {/* <span>{props.firstName}</span> <br /> */}
//       {/* <span>{props.lastName}</span> */}

//       {/* <span>{props.children}</span> */}

//     </div>
//   )
// }

export default function JSX_All(props) {
  //   return [
  //     <li key="A">Первый элемент</li>,
  //     <li key="B">Второй элемент</li>,
  //     <li key="C">Третий элемент</li>
  //   ]

  const items = []

  for (let i = 0; i < props.numTimes; i++) {
    items.push(props.children(i))
  }

  return <div>{items}</div>
}
