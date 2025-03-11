import React, { useEffect, useState } from 'react'

import Topbar from './components/Topbar'
import Sidebar from './components/Sidebar'

const App = () => {
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(true)

  const [tabs, setTabs] = useState([
    {
      icon: 'https://cdn.iconscout.com/icon/free/png-256/free-notion-logo-icon-download-in-svg-png-gif-file-formats--productivity-application-brand-apps-pack-logos-icons-8630396.png',
      title: 'Monochromium'
    },
    {
      // icon: 'https://cdn4.iconfinder.com/data/icons/new-google-logo-2015/400/new-google-favicon-512.png',
      // title: 'how to create a browser with electron & react - Google search'
    },
    {
      // icon: 'https://img.icons8.com/m_rounded/512/spotify.png',
      title: 'Cheques(Shubh) - Spotify'
    },
    {
      // icon: 'https://cdn-icons-png.flaticon.com/512/2111/2111615.png',
      title: 'Monochromium - Slack'
    }
  ])
  const [currentTab, setCurrentTab] = useState(0)

  useEffect(() => {
    const openSidebar = () => {
      setIsSidebarExpanded(true)
    }

    const closeSidebar = () => {
      setIsSidebarExpanded(false)
    }

    const updateCurrentTab = (event, data) => {
      const { index } = data
      setCurrentTab(index)
    }

    window.electron.ipcRenderer.on('open-sidebar', openSidebar)
    window.electron.ipcRenderer.on('close-sidebar', closeSidebar)
    window.electron.ipcRenderer.on('update-tab', updateCurrentTab)

    return () => {
      window.electron.ipcRenderer.removeListener('open-sidebar', openSidebar)
      window.electron.ipcRenderer.removeListener('close-sidebar', openSidebar)
      window.electron.ipcRenderer.removeListener('update-tab', updateCurrentTab)
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
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
      />
      <div
        className={`absolute outline-1 outline-[rgba(0,0,0,0.1)] rounded-[8px] h-[calc(100vh-40px-8px)] duration-250 top-[40px] ${isSidebarExpanded == true ? 'w-[calc(100vw-200px-6px)] left-[200px]' : 'w-[calc(100vw-52px-6px)] left-[52px]'}`}
      />
    </main>
  )
}

export default App
