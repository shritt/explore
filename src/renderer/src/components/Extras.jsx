import React from 'react'
import { motion } from 'framer-motion'

const Extras = () => {
  return (
    <div className="flex gap-[12px]">
      {/* extensions button */}
      <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
        <svg
          width="20px"
          height="20px"
          viewBox="0 0 16 16"
          fill="none"
          className="stroke-[var(--text-light)] dark:stroke-[var(--text-dark)]"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.25"
        >
          <g id="SVGRepo_iconCarrier">
            <path d="m1.75 8.75h5.5v5.5m5-12.5v4m-2-2h4m-12.5-1v11.5h11.5v-5.5h-6v-6z" />
          </g>
        </svg>
      </motion.button>
      {/* more button */}
      <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
        <svg
          width="24px"
          height="24px"
          viewBox="0 0 24 24"
          className="fill-[var(--text-light)] dark:fill-[var(--text-dark)]"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g id="SVGRepo_iconCarrier">
            <path
              d="M8,12a2,2,0,1,1-2-2A2,2,0,0,1,8,12Zm10-2a2,2,0,1,0,2,2A2,2,0,0,0,18,10Zm-6,0a2,2,0,1,0,2,2A2,2,0,0,0,12,10Z"
              id="Horizontal"
            />
          </g>
        </svg>
      </motion.button>
    </div>
  )
}

export default Extras
