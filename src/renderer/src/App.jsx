import React, { useEffect, useState } from 'react'
import Topbar from './components/Topbar'
import Sidebar from './components/Sidebar'

const App = () => {
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(true)

  const [tabs, setTabs] = useState([
    {
      icon: 'https://cdn.iconscout.com/icon/free/png-256/free-notion-logo-icon-download-in-svg-png-gif-file-formats--productivity-application-brand-apps-pack-logos-icons-8630396.png',
      title: 'Monochrome'
    },
    {
      icon: 'https://cdn4.iconfinder.com/data/icons/new-google-logo-2015/400/new-google-favicon-512.png',
      title: 'how to create a browser with electron & react - Google search'
    },
    {
      icon: 'https://img.icons8.com/m_rounded/512/spotify.png',
      title: 'Cheques(Shubh) - Spotify'
    },
    {
      icon: 'https://cdn-icons-png.flaticon.com/512/2111/2111615.png',
      title: 'Monochrome - Slack'
    }
  ])
  const [currentTab, setCurrentTab] = useState(0)

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.ctrlKey && e.key == 's') {
        setIsSidebarExpanded((prevVal) => !prevVal)
      }

      if (e.ctrlKey && e.key == 'w') {
        e.preventDefault()
        console.log('close current tab')
      }

      if (e.ctrlKey && e.key == 't') {
        console.log('open new tab')
      }

      if (e.ctrlKey && e.shiftKey && e.key == 'T') {
        console.log('open currently closed tab')
      }

      if (e.ctrlKey && e.key == 'Tab') {
        console.log('cycle through tabs')
      }
    }

    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [])

  return (
    <main>
      <Topbar show={true} />
      <Sidebar
        show={true}
        isExpanded={isSidebarExpanded}
        setIsExpanded={setIsSidebarExpanded}
        tabs={tabs}
        setTabs={setTabs}
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
      />
    </main>
  )
}

export default App
