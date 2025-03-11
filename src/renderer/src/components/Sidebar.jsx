import React from 'react'
import { motion } from 'framer-motion'

import Tab from './Tab'
import SideControls from './SideControls'

const Sidebar = ({ show, isExpanded, setIsExpanded, tabs, currentTab, setCurrentTab }) => {
  return (
    <motion.div
      initial={{ left: 0, width: 200 }}
      animate={{ left: show == true ? 0 : -52, width: isExpanded == true ? 200 : 52 }}
      className="side-bar fixed h-[calc(100vh-52px)] top-[40px] flex flex-col justify-between pt-[2px] pb-[4px]"
      style={{ alignItems: 'center' }}
    >
      {/* top div */}
      <div className="flex flex-col gap-[6px]" style={{ alignItems: 'center' }}>
        {/* tab list */}
        {tabs.map((tab, index) => (
          <Tab
            key={index}
            index={index}
            icon={tab.icon}
            title={tab.title}
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
          className="rounded-full bg-[#fff] dark:bg-[#242424] relative shadow-md h-[28px] w-[28px]"
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
      <SideControls isExpanded={isExpanded} setIsExpanded={setIsExpanded} />
    </motion.div>
  )
}

export default Sidebar
