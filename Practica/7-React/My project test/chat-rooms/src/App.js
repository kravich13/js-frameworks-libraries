import React from "react"
import './App.css'
import Header from "./all-blocks/Header"
import Rooms from "./all-blocks/Rooms"
import WindowChat from "./all-blocks/WindowChat"

function App() {
  return (
    <div className="App">

      <Header />
      
      <section>
        <Rooms />
        <WindowChat />
      </section>


    </div>
  );
}

export default App;
