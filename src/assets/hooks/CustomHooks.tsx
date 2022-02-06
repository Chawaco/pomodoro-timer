import { useRef, useEffect } from "react";

// custom hook
// https://overreacted.io/making-setinterval-declarative-with-react-hooks/
// https://qiita.com/FumioNonaka/items/587c3ed8545d820f330c
export const useInterval = (callback: Function, delay?: number | null) => {
  const savedCallback = useRef<Function>(() => {});
  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);
  // Set up the interval.
  useEffect(() => {
    const tick = () => {
      savedCallback.current();
    };
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
};
