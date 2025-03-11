import React from 'react'
import { motion } from 'framer-motion'

import noIcon from '../assets/no-icon.png?asset'

const Tab = ({ index, icon, title, currentTab, setCurrentTab, isExpanded }) => {
  return (
    <motion.div
      initial={{ width: 180, scale: 0 }}
      animate={{ width: isExpanded == true ? 180 : 38, scale: 1 }}
      whileHover={{ scale: isExpanded == true ? 1.05 : 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={async () => {
        setCurrentTab(index)
        await window.electron.ipcRenderer.invoke('update-current-tab', { index })
      }}
      className={`relative flex gap-[6px] bg-[#fff] dark:bg-[#242424] rounded-full h-[38px] w-[180px] px-[10px] transition-[outline] duration-300 outline-2 -outline-offset-2 shadow ${currentTab == index ? 'outline-[rgba(0,0,0,0.5)] dark:outline-[rgba(255,255,255,0.5)]' : 'outline-transparent'}`}
      style={{ alignItems: 'center' }}
    >
      <img
        src={icon || noIcon}
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
        className="absolute right-[2px] top-[2px] h-[34px] bg-[linear-gradient(to_right,transparent,#fff)] dark:bg-[linear-gradient(to_right,transparent,#242424)] w-[80px] rounded-r-full"
      ></motion.div>
    </motion.div>
  )
}

export default Tab
