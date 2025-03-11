import React, { useEffect, useState } from 'react'

const ImageWithFallback = ({ src, fallback, className }) => {
  const [imgSrc, setImgSrc] = useState(null)

  useEffect(() => {
    setImgSrc(src)
  }, [src])

  const handleError = () => {
    if (imgSrc == src) setImgSrc(fallback)
  }

  return <img src={imgSrc} onError={handleError} className={className} />
}

export default ImageWithFallback
