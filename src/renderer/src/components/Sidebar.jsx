import React from 'react'
import { motion } from 'framer-motion'

const Sidebar = ({ show }) => {
  return (
    <motion.div
      animate={{ left: show == true ? 0 : -64 }}
      className="side-bar fixed h-[calc(100vh-52px)] top-[52px] w-[64px] flex flex-col justify-between py-[8px]"
      style={{ alignItems: 'center' }}
    >
      Sidebar
    </motion.div>
  )
}

export default Sidebar
