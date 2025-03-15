import React from 'react'
import { motion } from 'framer-motion'

const Favorite = ({ show, fav }) => {
  return (
    <motion.div
      initial={{ scale: 0 }}
      animate={{ opacity: show == true ? 1 : 0, scale: 1 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      className="h-[36px] bg-[#fff] dark:bg-[#212121] rounded-[8px] relative shadow-sm"
      onClick={async () => {
        await window.electron.ipcRenderer.invoke('create-tab', { url: fav.url })
      }}
    >
      <img src={fav.icon} className="w-[20px] absolute top-1/2 left-1/2 -translate-1/2" />
    </motion.div>
  )
}

export default Favorite
