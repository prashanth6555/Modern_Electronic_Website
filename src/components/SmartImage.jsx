import { useEffect, useState } from 'react';

export default function SmartImage({ src, alt, className = '', priority = false }) {
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    setFailed(false);
  }, [src]);

  if (failed || !src) {
    return (
      <div
        className={`flex items-center justify-center bg-mist px-3 text-center text-xs font-semibold text-ink/40 ${className}`}
        role="img"
        aria-label={alt}
      >
        {alt}
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      loading={priority ? 'eager' : 'lazy'}
      decoding="async"
      onError={() => setFailed(true)}
    />
  );
}
