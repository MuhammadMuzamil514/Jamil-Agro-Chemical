function OptimizedImage({ src, alt, className = '', width, height }) {
  return (
    <img
      src={src}
      alt={alt}
      width={width}
      height={height}
      loading="lazy"
      decoding="async"
      className={className}
    />
  )
}

export default OptimizedImage
