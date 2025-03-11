import React, { useRef } from 'react'

const Searchbar = () => {
  const searchBarRef = useRef(null)

  return (
    <div
      className="flex min-w-[400px] w-[600px] mx-[12px] bg-[#fff] dark:bg-[#242424] h-[32px] rounded-full px-[4px] gap-[8px] shadow-sm"
      style={{ appRegion: 'no-drag', alignItems: 'center' }}
    >
      {/* lock button */}
      <div className="h-[24px] w-[36px] rounded-full bg-[var(--bg-dark)] dark:bg-[var(--bg-light)] relative">
        <svg
          width="18px"
          height="18px"
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
      {/* search box */}
      <input
        ref={searchBarRef}
        type="text"
        className="w-full text-[13px] leading-[100%]"
        placeholder="Search or Enter URL"
        onFocus={() => {
          searchBarRef.current.select()
        }}
        onKeyDown={async (e) => {
          if (e.key == 'Enter') {
            const query = searchBarRef.current.value
            let url = `https://google.com/search?q=${query}`

            if (query.startsWith('http') || query.startsWith('https')) {
              url = query
            }

            searchBarRef.current.blur()
            await window.electron.ipcRenderer.invoke('load-url', url)
          }
        }}
        spellCheck="false"
      />
      {/* extra controls */}
      <div
        className="h-[26px] rounded-full flex gap-[6px] px-[8px] bg-[#eee] dark:bg-[#161616]"
        style={{ alignItems: 'center' }}
      >
        {/* shield button */}
        <button>
          <svg width="18px" height="18px" viewBox="0 0 24 24" fill="none">
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
          <svg width="18px" height="18px" viewBox="0 0 24 24" fill="none">
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
          <svg width="18px" height="18px" viewBox="0 0 24 24" fill="none">
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
  )
}

export default Searchbar
