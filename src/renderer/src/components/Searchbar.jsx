import React from 'react'
import { Link } from 'lucide-react'

const Searchbar = ({ searchBarRef, isExpanded }) => {
  const validateQuery = (str) => {
    var pattern = new RegExp(
      '^(https?:\\/\\/)?' + // protocol
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
        '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
        '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
        '(\\#[-a-z\\d_]*)?$',
      'i'
    ) // fragment locator
    return !!pattern.test(str)
  }

  return (
    <div
      className="flex w-full mx-3 mb-2 bg-[#fff] dark:bg-[#242424] h-[32px] rounded-full px-[8px] gap-[8px] shadow-sm"
      style={{ appRegion: 'no-drag', alignItems: 'center' }}
    >
      <Link size={18} />
      {isExpanded && <input
        ref={searchBarRef}
        type="text"
        className="w-full text-[14px] leading-[100%]"
        placeholder="Search or Enter URL"
        onFocus={() => {
          searchBarRef.current.select()
        }}
        onKeyDown={async (e) => {
          if (e.key == 'Enter') {
            const query = searchBarRef.current.value.trim()
            let url = `https://start.duckduckgo.com/t=h_&hps=1&start=1&q=${query}`

            if (validateQuery(query)) {
              if (query.startsWith('https://')) {
                url = query
              } else {
                url = `https://${query}`
              }
            }

            searchBarRef.current.blur()
            await window.electron.ipcRenderer.invoke('load-url', url)
          }
        }}
        spellCheck="false"
      />}
    </div>
  )
}

export default Searchbar
