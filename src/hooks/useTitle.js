import { useEffect } from 'react';

export default function useTitle(title) {
  useEffect(() => {
    document.title = title ? `${title} · VOLT` : 'VOLT — Modern Electronics';
  }, [title]);
}
