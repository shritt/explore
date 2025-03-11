import React from 'react'
import { motion } from 'framer-motion'

const NavControls = ({ controls }) => {
  return (
    <div className="flex">
      <div className="flex ms-[4px] gap-[4px]">
        {/* back button */}
        <motion.button
          initial={{ opacity: 0.25 }}
          animate={{ opacity: controls.canGoBack == true ? 1 : 0.5 }}
          whileHover={{ scale: 1.2 }}
          whileTap={{ x: -4 }}
          onClick={async () => {
            await window.electron.ipcRenderer.invoke('go-back')
          }}
        >
          <svg width="30px" height="30px" viewBox="0 0 24 24" fill="none">
            <g id="SVGRepo_iconCarrier">
              <path
                d="M15 7L10 12L15 17"
                className="stroke-[var(--text-light)] dark:stroke-[var(--text-dark)]"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </g>
          </svg>
        </motion.button>
        {/* forward button */}
        <motion.button
          initial={{ opacity: 0.25 }}
          animate={{ opacity: controls.canGoForward == true ? 1 : 0.5 }}
          whileHover={{ scale: 1.2 }}
          whileTap={{ x: 4 }}
          onClick={async () => {
            await window.electron.ipcRenderer.invoke('go-forward')
          }}
        >
          <svg width="30px" height="30px" viewBox="0 0 24 24" fill="none" className="rotate-180">
            <g id="SVGRepo_iconCarrier">
              <path
                d="M15 7L10 12L15 17"
                className="stroke-[var(--text-light)] dark:stroke-[var(--text-dark)]"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </g>
          </svg>
        </motion.button>
        {/* reload button */}
        <motion.button
          initial={{ rotate: 45 }}
          whileHover={{ rotate: 360 + 45 }}
          whileTap={{ scale: 2 / 3 }}
          onClick={async () => {
            await window.electron.ipcRenderer.invoke('reload')
          }}
        >
          <svg width="22px" height="22px" viewBox="0 0 16 16" fill="none">
            <g id="SVGRepo_iconCarrier">
              <path
                className="fill-[var(--text-light)] dark:fill-[var(--text-dark)]"
                d="M7.248 1.307A.75.75 0 118.252.193l2.5 2.25a.75.75 0 010 1.114l-2.5 2.25a.75.75 0 01-1.004-1.114l1.29-1.161a4.5 4.5 0 103.655 2.832.75.75 0 111.398-.546A6 6 0 118.018 2l-.77-.693z"
              />
            </g>
          </svg>
        </motion.button>
      </div>
    </div>
  )
}

export default NavControls
