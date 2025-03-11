import React, { useState } from 'react'
import { motion } from 'framer-motion'

import noIcon from '../assets/no-icon.png?asset'

const Tab = ({ index, title, currentTab, setCurrentTab, domain, isExpanded }) => {
  const [isOvering, setIsOvering] = useState(false)

  return (
    <motion.div
      initial={{ width: 180, scale: 0 }}
      animate={{ width: isExpanded == true ? 180 : 38, scale: 1 }}
      whileHover={{ scale: isExpanded == true ? 1.05 : 1.1 }}
      whileTap={{ scale: 0.9 }}
      onMouseEnter={() => {
        setIsOvering(true)
      }}
      onMouseLeave={() => {
        setIsOvering(false)
      }}
      onClick={async () => {
        setCurrentTab(index)
        await window.electron.ipcRenderer.invoke('update-current-tab', { index })
      }}
      className={`relative flex gap-[6px] bg-[#fff] dark:bg-[#242424] rounded-full h-[38px] w-[180px] px-[10px] transition-[outline] duration-300 outline-2 -outline-offset-2 shadow ${currentTab == index ? 'outline-[rgba(0,0,0,0.5)] dark:outline-[rgba(255,255,255,0.5)]' : 'outline-transparent'}`}
      style={{ alignItems: 'center' }}
    >
      <img
        src={`https://www.google.com/s2/favicons?domain=${domain}&sz=32` || noIcon}
        className={`${isExpanded == true ? 'h-[20px]' : 'h-[18px]'} w-[20px] block`}
      />
      <motion.p
        animate={{ opacity: isExpanded == true ? 1 : 0 }}
        className="text-[12px] overflow-hidden whitespace-nowrap"
      >
        {title || 'Welcome - Monochromium'}
      </motion.p>
      <motion.div
        initial={{ opacity: 1 }}
        animate={{ opacity: isExpanded == true ? 1 : 0 }}
        className="absolute right-[2px] top-[2px] h-[34px] bg-[linear-gradient(to_right,transparent,#fff)] dark:bg-[linear-gradient(to_right,transparent,#242424)] w-[80px] rounded-r-full pointer-events-none"
      />
      {/* close button */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: isOvering == true ? 1 : 0 }}
        onClick={async () => {
          await window.electron.ipcRenderer.invoke('close-tab', { index })
        }}
        className={`absolute right-[8px] top-1/2 -translate-y-1/2 ${isExpanded == true ? 'block' : 'hidden'} p-[1.5px] rounded-full bg-[#e0e0e0] dark:bg-[#313131] cursor-pointer`}
      >
        <svg width="20px" height="20px" viewBox="0 0 24 24" fill="none">
          <g id="SVGRepo_iconCarrier">
            <path
              d="M6.99486 7.00636C6.60433 7.39689 6.60433 8.03005 6.99486 8.42058L10.58 12.0057L6.99486 15.5909C6.60433 15.9814 6.60433 16.6146 6.99486 17.0051C7.38538 17.3956 8.01855 17.3956 8.40907 17.0051L11.9942 13.4199L15.5794 17.0051C15.9699 17.3956 16.6031 17.3956 16.9936 17.0051C17.3841 16.6146 17.3841 15.9814 16.9936 15.5909L13.4084 12.0057L16.9936 8.42059C17.3841 8.03007 17.3841 7.3969 16.9936 7.00638C16.603 6.61585 15.9699 6.61585 15.5794 7.00638L11.9942 10.5915L8.40907 7.00636C8.01855 6.61584 7.38538 6.61584 6.99486 7.00636Z"
              className="fill-[var(--text-light)] dark:fill-[var(--text-dark)]"
            />
          </g>
        </svg>
      </motion.button>
    </motion.div>
  )
}

export default Tab
