import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

import Icon from '../assets/icon.png?asset'

const Topbar = ({ show }) => {
  const [isMaximized, setIsMaximized] = useState(false)

  useEffect(() => {
    const checkMaximized = async () => {
      const isMax = await window.electron.ipcRenderer.invoke('is-maximized')
      setIsMaximized(isMax)
    }

    checkMaximized()
  }, [])

  return (
    <motion.div
      animate={{ top: show == true ? 0 : -48 }}
      className="top-bar fixed h-[48px] left-0 w-full flex justify-between"
      style={{ alignItems: 'center' }}
    >
      {/* left div */}
      <div className="flex">
        {/* app icon */}
        <div className="w-[12px]" />
        <img src={Icon} height={32} width={32} />
        {/* button controls */}
        <div className="flex ms-[8px] gap-[4px]">
          {/* back button */}
          <motion.button whileHover={{ scale: 1.2 }} whileTap={{ x: -4 }}>
            <svg width="32px" height="32px" viewBox="0 0 24 24" fill="none">
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
          <motion.button whileHover={{ scale: 1.2 }} whileTap={{ x: 4 }}>
            <svg width="32px" height="32px" viewBox="0 0 24 24" fill="none" className="rotate-180">
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
          >
            <svg width="24px" height="24px" viewBox="0 0 16 16" fill="none">
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
      {/* middle div */}
      <div
        className="flex w-[50vw] max-w-[600px] bg-[#fff] dark:bg-[#242424] h-[36px] rounded-full px-[4px] gap-[8px]"
        style={{ appRegion: 'no-drag', alignItems: 'center' }}
      >
        {/* lock button */}
        <div className="h-[30px] w-[36px] rounded-full bg-[var(--bg-dark)] dark:bg-[var(--bg-light)] relative">
          <svg
            width="20px"
            height="20px"
            viewBox="0 0 24 24"
            fill="none"
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
          >
            <g id="SVGRepo_iconCarrier">
              <path
                d="M7 10.0288C7.47142 10 8.05259 10 8.8 10H15.2C15.9474 10 16.5286 10 17 10.0288M7 10.0288C6.41168 10.0647 5.99429 10.1455 5.63803 10.327C5.07354 10.6146 4.6146 11.0735 4.32698 11.638C4 12.2798 4 13.1198 4 14.8V16.2C4 17.8802 4 18.7202 4.32698 19.362C4.6146 19.9265 5.07354 20.3854 5.63803 20.673C6.27976 21 7.11984 21 8.8 21H15.2C16.8802 21 17.7202 21 18.362 20.673C18.9265 20.3854 19.3854 19.9265 19.673 19.362C20 18.7202 20 17.8802 20 16.2V14.8C20 13.1198 20 12.2798 19.673 11.638C19.3854 11.0735 18.9265 10.6146 18.362 10.327C18.0057 10.1455 17.5883 10.0647 17 10.0288M7 10.0288V8C7 5.23858 9.23858 3 12 3C14.7614 3 17 5.23858 17 8V10.0288"
                className="stroke-[var(--text-dark)] dark:stroke-[var(--text-light)]"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </g>
          </svg>
        </div>
        {/* search bar */}
        <input type="text" className="w-full" placeholder="Search or Enter URL" />
        {/* extra controls */}
        <div
          className="h-[30px] rounded-full flex gap-[8px] px-[8px] bg-[#eee] dark:bg-[#161616]"
          style={{ alignItems: 'center' }}
        >
          {/* shield button */}
          <button>
            <svg width="20px" height="20px" viewBox="0 0 24 24" fill="none">
              <g id="SVGRepo_iconCarrier">
                <path
                  d="M11.3586 20.6831C11.5639 20.7901 11.6666 20.8436 11.809 20.8713C11.92 20.8929 12.08 20.8929 12.191 20.8713C12.3334 20.8436 12.4361 20.7901 12.6414 20.6831C14.54 19.6939 20 16.4612 20 12.0001V8.21772C20 7.4182 20 7.01845 19.8692 6.67482C19.7537 6.37126 19.566 6.10039 19.3223 5.88564C19.0465 5.64255 18.6722 5.50219 17.9236 5.22146L12.5618 3.21079C12.3539 3.13283 12.25 3.09385 12.143 3.07839C12.0482 3.06469 11.9518 3.06469 11.857 3.07839C11.75 3.09385 11.6461 3.13283 11.4382 3.21079L6.0764 5.22146C5.3278 5.50219 4.9535 5.64255 4.67766 5.88564C4.43398 6.10039 4.24627 6.37126 4.13076 6.67482C4 7.01845 4 7.4182 4 8.21772V12.0001C4 16.4612 9.45996 19.6939 11.3586 20.6831Z"
                  className="stroke-[var(--text-light)] dark:stroke-[var(--text-dark)]"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </g>
            </svg>
          </button>
          {/* link button */}
          <button>
            <svg width="20px" height="20px" viewBox="0 0 24 24" fill="none">
              <g id="SVGRepo_iconCarrier">
                <path
                  d="M14 7H16C18.7614 7 21 9.23858 21 12C21 14.7614 18.7614 17 16 17H14M10 7H8C5.23858 7 3 9.23858 3 12C3 14.7614 5.23858 17 8 17H10M8 12H16"
                  className="stroke-[var(--text-light)] dark:stroke-[var(--text-dark)]"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </g>
            </svg>
          </button>
          {/* star button */}
          <button>
            <svg width="20px" height="20px" viewBox="0 0 24 24" fill="none">
              <g id="SVGRepo_iconCarrier">
                <path
                  d="M11.2691 4.41115C11.5006 3.89177 11.6164 3.63208 11.7776 3.55211C11.9176 3.48263 12.082 3.48263 12.222 3.55211C12.3832 3.63208 12.499 3.89177 12.7305 4.41115L14.5745 8.54808C14.643 8.70162 14.6772 8.77839 14.7302 8.83718C14.777 8.8892 14.8343 8.93081 14.8982 8.95929C14.9705 8.99149 15.0541 9.00031 15.2213 9.01795L19.7256 9.49336C20.2911 9.55304 20.5738 9.58288 20.6997 9.71147C20.809 9.82316 20.8598 9.97956 20.837 10.1342C20.8108 10.3122 20.5996 10.5025 20.1772 10.8832L16.8125 13.9154C16.6877 14.0279 16.6252 14.0842 16.5857 14.1527C16.5507 14.2134 16.5288 14.2807 16.5215 14.3503C16.5132 14.429 16.5306 14.5112 16.5655 14.6757L17.5053 19.1064C17.6233 19.6627 17.6823 19.9408 17.5989 20.1002C17.5264 20.2388 17.3934 20.3354 17.2393 20.3615C17.0619 20.3915 16.8156 20.2495 16.323 19.9654L12.3995 17.7024C12.2539 17.6184 12.1811 17.5765 12.1037 17.56C12.0352 17.5455 11.9644 17.5455 11.8959 17.56C11.8185 17.5765 11.7457 17.6184 11.6001 17.7024L7.67662 19.9654C7.18404 20.2495 6.93775 20.3915 6.76034 20.3615C6.60623 20.3354 6.47319 20.2388 6.40075 20.1002C6.31736 19.9408 6.37635 19.6627 6.49434 19.1064L7.4341 14.6757C7.46898 14.5112 7.48642 14.429 7.47814 14.3503C7.47081 14.2807 7.44894 14.2134 7.41394 14.1527C7.37439 14.0842 7.31195 14.0279 7.18708 13.9154L3.82246 10.8832C3.40005 10.5025 3.18884 10.3122 3.16258 10.1342C3.13978 9.97956 3.19059 9.82316 3.29993 9.71147C3.42581 9.58288 3.70856 9.55304 4.27406 9.49336L8.77835 9.01795C8.94553 9.00031 9.02911 8.99149 9.10139 8.95929C9.16534 8.93081 9.2226 8.8892 9.26946 8.83718C9.32241 8.77839 9.35663 8.70162 9.42508 8.54808L11.2691 4.41115Z"
                  className="stroke-[var(--text-light)] dark:stroke-[var(--text-dark)]"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </g>
            </svg>
          </button>
        </div>
      </div>
      {/* right div */}
      <div className="flex gap-[16px]">
        {/* extra buttons */}
        <div className="flex gap-[12px]">
          {/* extensions button */}
          <motion.button whileHover={{ scale: 1.2 }} whileTap={{ scale: 2 / 3 }}>
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
          <motion.button whileHover={{ scale: 1.2 }} whileTap={{ scale: 2 / 3 }}>
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
        {/* window controls */}
        <div className="flex gap-[8px]">
          {/* minimize button */}
          <motion.button
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 2 / 3 }}
            className="bg-[#fff] dark:bg-[#313131] dark:hover:bg-[#424242] group h-[24px] w-[24px] relative rounded-full"
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
            className="bg-[#fff] dark:bg-[#313131] dark:hover:bg-[#424242] group h-[24px] w-[24px] relative rounded-full"
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
            className="bg-[#fff] dark:bg-[#313131] hover:bg-[#e53935] group h-[24px] w-[24px] relative rounded-full"
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
        <div className="w-[0px]" />
      </div>
    </motion.div>
  )
}

export default Topbar
