import React, { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'

import WindowControls from './WindowControls'
import Searchbar from './Searchbar'
import NavControls from './NavControls'
import Extras from './Extras'

const Topbar = ({ show }) => {
  const searchBarRef = useRef(null)
  const [controls, setControls] = useState({ canGoBack: false, canGoForward: false })

  useEffect(() => {
    const updateUrl = (event, data) => {
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
      animate={{ top: show == true ? 0 : -40 }}
      className="top-bar fixed h-[40px] left-0 w-full flex justify-between pe-[12px]"
      style={{ alignItems: 'center' }}
    >
      <NavControls controls={controls} />
      <Searchbar searchBarRef={searchBarRef} />
      {/* right div */}
      <div className="flex gap-[16px]">
        <Extras />
        <WindowControls />
      </div>
    </motion.div>
  )
}

export default Topbar
