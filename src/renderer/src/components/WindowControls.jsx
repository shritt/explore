import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

const WindowControls = () => {
  const [isMaximized, setIsMaximized] = useState(false)

  useEffect(() => {
    const checkMaximized = async () => {
      const isMax = await window.electron.ipcRenderer.invoke('is-maximized')
      setIsMaximized(isMax)
    }

    checkMaximized()
  }, [])
  return (
    <div className="flex gap-[8px]">
      {/* minimize button */}
      <motion.button
        whileHover={{ scale: 1.2 }}
        whileTap={{ scale: 2 / 3 }}
        className="bg-[#fff] dark:bg-[#313131] dark:hover:bg-[#424242] group h-[24px] w-[24px] relative rounded-full shadow-sm"
        onClick={async () => {
          await window.electron.ipcRenderer.invoke('minimize')
        }}
      >
        <svg
          width="18px"
          height="18px"
          viewBox="0 0 24 24"
          fill="none"
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        >
          <g id="SVGRepo_iconCarrier">
            <path
              d="M6 12L18 12"
              className="stroke-[var(--text-light)] dark:stroke-[var(--text-dark)] d"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </g>
        </svg>
      </motion.button>
      {/* min-max button */}
      <motion.button
        whileHover={{ scale: 1.2 }}
        whileTap={{ scale: 2 / 3 }}
        className="bg-[#fff] dark:bg-[#313131] dark:hover:bg-[#424242] group h-[24px] w-[24px] relative rounded-full shadow-sm"
        onClick={async () => {
          const isMax = await window.electron.ipcRenderer.invoke('toggle-maximize')
          setIsMaximized(isMax)
        }}
      >
        {isMaximized == false ? (
          <svg
            width="14px"
            height="14px"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
          >
            <g id="SVGRepo_iconCarrier">
              <path
                className="fill-[var(--text-light)] dark:fill-[var(--text-dark)]"
                fillRule="evenodd"
                d="M19 2a1 1 0 00-1-1h-6a1 1 0 100 2h3.586l-3.793 3.793a1 1 0 001.414 1.414L17 4.414V8a1 1 0 102 0V2zM1 18a1 1 0 001 1h6a1 1 0 100-2H4.414l3.793-3.793a1 1 0 10-1.414-1.414L3 15.586V12a1 1 0 10-2 0v6z"
              />
            </g>
          </svg>
        ) : (
          <svg
            width="14px"
            height="14px"
            viewBox="0 0 20 20"
            fill="none"
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
          >
            <g id="SVGRepo_iconCarrier">
              <path
                className="fill-[var(--text-light)] dark:fill-[var(--text-dark)]"
                fillRule="evenodd"
                d="M11 8a1 1 0 001 1h6a1 1 0 100-2h-3.586l3.793-3.793a1 1 0 00-1.414-1.414L13 5.586V2a1 1 0 10-2 0v6zm-2 4a1 1 0 00-1-1H2a1 1 0 100 2h3.586l-3.793 3.793a1 1 0 101.414 1.414L7 14.414V18a1 1 0 102 0v-6z"
              />
            </g>
          </svg>
        )}
      </motion.button>
      {/* close button */}
      <motion.button
        whileHover={{ scale: 1.2 }}
        whileTap={{ scale: 2 / 3 }}
        className="bg-[#fff] dark:bg-[#313131] hover:bg-[#e53935] duration-200 transition-colors group h-[24px] w-[24px] relative rounded-full shadow-sm"
        onClick={async () => {
          await window.electron.ipcRenderer.invoke('close-window')
        }}
      >
        <svg
          width="22px"
          height="22px"
          viewBox="0 0 24 24"
          fill="none"
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        >
          <g id="SVGRepo_iconCarrier">
            <path
              className="fill-[var(--text-light)] dark:fill-[var(--text-dark)] group-hover:fill-[#fff]"
              d="M6.99486 7.00636C6.60433 7.39689 6.60433 8.03005 6.99486 8.42058L10.58 12.0057L6.99486 15.5909C6.60433 15.9814 6.60433 16.6146 6.99486 17.0051C7.38538 17.3956 8.01855 17.3956 8.40907 17.0051L11.9942 13.4199L15.5794 17.0051C15.9699 17.3956 16.6031 17.3956 16.9936 17.0051C17.3841 16.6146 17.3841 15.9814 16.9936 15.5909L13.4084 12.0057L16.9936 8.42059C17.3841 8.03007 17.3841 7.3969 16.9936 7.00638C16.603 6.61585 15.9699 6.61585 15.5794 7.00638L11.9942 10.5915L8.40907 7.00636C8.01855 6.61584 7.38538 6.61584 6.99486 7.00636Z"
            />
          </g>
        </svg>
      </motion.button>
    </div>
  )
}

export default WindowControls
