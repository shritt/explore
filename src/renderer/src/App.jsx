import React from 'react'
import Topbar from './components/Topbar'
import Sidebar from './components/Sidebar'

const App = () => {
  return (
    <main>
      <Topbar show={true} />
      <Sidebar show={true} />
      {/* <h1 className="text-3xl pt-[52px] ps-[64px]">Content</h1> */}
    </main>
  )
}

export default App
