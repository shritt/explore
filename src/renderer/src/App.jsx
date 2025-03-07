import React from 'react'
import Topbar from './components/Topbar'
import Sidebar from './components/Sidebar'

const App = () => {
  return (
    <main>
      <Topbar show={true} />
      <Sidebar show={true} expanded={false} />
    </main>
  )
}

export default App
