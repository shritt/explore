import React from 'react'
import { motion } from 'framer-motion'
import Favorite from './Favorite'

const SideControls = ({ favorites, isExpanded, setIsExpanded }) => {
  return (
    <>
      <div className="flex flex-col gap-[16px] pt-[8px]" style={{ alignItems: 'center' }}>
        <motion.div
          initial={{ flexDirection: 'row', justifyContent: 'center', width: 160 }}
          animate={{
            flexDirection: isExpanded == true ? 'row' : 'column',
            justifyContent: isExpanded == true ? 'space-around' : 'center',
            width: isExpanded == true ? 160 : 32
          }}
          className="flex gap-[12px]"
          style={{ alignItems: 'center' }}
        >
          <motion.div
            whileHover={{ y: -2 }}
            whileTap={{ y: -4 }}
            className="h-[20px] w-[20px]"
            style={{ alignItems: 'center' }}
            onClick={async () => {
              if (isExpanded == true) {
                await window.electron.ipcRenderer.invoke('close-sidebar')
              } else {
                await window.electron.ipcRenderer.invoke('open-sidebar')
              }
              setIsExpanded((prevVal) => !prevVal)
            }}
          >
            <svg width="20px" height="20px" viewBox="0 0 24 24" fill="none">
              <g id="SVGRepo_iconCarrier">
                <g id="Complete">
                  <g id="sidebar-left">
                    <g>
                      <rect
                        data-name="Square"
                        fill="none"
                        height="18"
                        id="Square-2"
                        rx="2"
                        ry="2"
                        className="stroke-[var(--text-light)] dark:stroke-[var(--text-dark)]"
                        strokeMiterlimit="10"
                        strokeWidth="2"
                        width="18"
                        x="3"
                        y="3"
                      />{' '}
                      <line
                        fill="none"
                        className="stroke-[var(--text-light)] dark:stroke-[var(--text-dark)]"
                        strokeMiterlimit="10"
                        strokeWidth="2"
                        x1="9"
                        x2="9"
                        y1="21"
                        y2="3"
                      />
                    </g>
                  </g>
                </g>
              </g>
            </svg>
          </motion.div>
        </motion.div>
      </div>
    </>
  )
}

export default SideControls
