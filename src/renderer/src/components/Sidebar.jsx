import React, { useRef, useState, useEffect } from 'react'
import { motion } from 'framer-motion'

import Tab from './Tab'
import Searchbar from './Searchbar'
import SideControls from './SideControls'
import WindowControls from './WindowControls'
import NavControls from './NavControls'
import { Compass, ChevronLeft, ChevronRight, RotateCw } from 'lucide-react'

const Sidebar = ({ show, isExpanded, setIsExpanded, tabs, currentTab, setCurrentTab }) => {
  const tempFavorites = []
  const searchBarRef = useRef(null)
  const [controls, setControls] = useState({ canGoBack: false, canGoForward: false })

  useEffect(() => {
    const updateUrl = (event, data) => {
      console.log(data)
      const { url, canGoBack, canGoForward } = data

      searchBarRef.current.value = url
      setControls({ canGoBack, canGoForward })
    }

    window.electron.ipcRenderer.on('update-url', updateUrl)

    return () => {
      window.electron.ipcRenderer.removeListener('update-url', updateUrl)
    }
  }, [])

  return (
    <motion.div
      initial={{ left: 0, width: 200 }}
      animate={{ left: show == true ? 0 : -52, width: isExpanded == true ? 200 : 52 }}
      className="side-bar fixed h-[calc(100vh-8px)] top-[0px] flex flex-col justify-between pt-[2px] pb-[4px]"
      style={{ alignItems: 'center' }}
    >
      {/* top div */}

      <div className="flex flex-col">
        <div className="flex p-3 px-4 h-[40px]"><div className={`flex grow text-[16px] items-center ${!isExpanded && 'justify-center'}`}>
          <div className="">
            <Compass size={16} />
          </div>
          {isExpanded && <span className="ml-1">Explore</span>}
        </div>
        {isExpanded && <div className="flex">
        <motion.button
            initial={{ opacity: 0.25 }}
            animate={{ opacity: controls.canGoBack == true ? 1 : 0.5 }}
            whileHover={{ scale: 1.2 }}
            whileTap={{ x: -4 }}
            onClick={async () => {
              await window.electron.ipcRenderer.invoke('go-back')
            }}
          >
            <ChevronLeft size={16}/>
          </motion.button>
          <motion.button
            initial={{ opacity: 0.25 }}
            animate={{ opacity: controls.canGoForward == true ? 1 : 0.5 }}
            whileHover={{ scale: 1.2 }}
            whileTap={{ x: 4 }}
            onClick={async () => {
              await window.electron.ipcRenderer.invoke('go-forward')
            }}
            className='mr-1'
          >
            <ChevronRight size={16}/>
          </motion.button>
          <motion.button
            // initial={{ rotate: 45 }}
            // whileHover={{ rotate: 360 + 45 }}
            whileTap={{ scale: 2 / 3 }}
            onClick={async () => {
              await window.electron.ipcRenderer.invoke('reload')
            }}
          >
            <RotateCw size={16}/>
          </motion.button>
        </div>}
        </div>
        <div className="flex">
          <Searchbar searchBarRef={searchBarRef} isExpanded={isExpanded} />
          
        </div>
        <div
          className="tabs-list py-[2px] flex flex-col overflow-y-auto w-full"
          style={{ alignItems: 'center' }}
        >
          {/* tab list */}
          <div className="flex flex-col gap-[6px]" style={{ alignItems: 'center' }}>
            {tabs.map((tab, index) => (
              <Tab
                key={index}
                index={index}
                domain={tab.domain}
                icon={tab.icon}
                title={tab.title}
                isClosed={tab.isClosed}
                currentTab={currentTab}
                setCurrentTab={setCurrentTab}
                isExpanded={isExpanded}
              />
            ))}
            {/* plus button */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={async () => {
                await window.electron.ipcRenderer.invoke('create-tab')
              }}
              className="rounded-full bg-[#fff] dark:bg-[#242424] relative shadow h-[28px] w-[28px]"
            >
              <svg
                width="24px"
                height="24px"
                viewBox="0 0 24 24"
                fill="none"
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
              >
                <g id="SVGRepo_iconCarrier">
                  <path
                    d="M6 12H18M12 6V18"
                    className="stroke-[var(--text-light)] dark:stroke-[var(--text-dark)]"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </g>
              </svg>
            </motion.button>
          </div>
        </div>
      </div>
      <SideControls
        favorites={tempFavorites}
        isExpanded={isExpanded}
        setIsExpanded={setIsExpanded}
      />
    </motion.div>
  )
}

export default Sidebar
