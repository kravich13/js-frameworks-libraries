import React from 'react'

const styles = {
  header: {
    background: 'rgba(192, 0, 0, 0.568)',
    color: 'white',
    padding: '10px 0',
    fontSize: '18px',
    fontWeight: 600,
    display: 'flex',
    justifyContent: 'space-around'
  }
}

export default function Header() {
  return (
    <header style={styles.header}>
      <h2>Чат комнаты:</h2>
      <h2>None</h2>
      <h2>Онлайн: 0</h2>
    </header>
  )
}
