import React from 'react'
import { motion } from 'framer-motion'

import WindowControls from './WindowControls'
import Searchbar from './Searchbar'
import NavControls from './NavControls'
import Extras from './Extras'

const Topbar = ({ show }) => {
  return (
    <motion.div
      animate={{ top: show == true ? 0 : -40 }}
      className="top-bar fixed h-[40px] left-0 w-full flex justify-between pe-[12px]"
      style={{ alignItems: 'center' }}
    >
      <NavControls />
      <Searchbar />
      {/* right div */}
      <div className="flex gap-[16px]">
        <Extras />
        <WindowControls />
      </div>
    </motion.div>
  )
}

export default Topbar
