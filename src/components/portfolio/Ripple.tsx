import { useCallback, type MouseEvent } from "react";

/** Attach to any element to get a material-style click ripple. */
export function useRipple() {
  return useCallback((event: MouseEvent<HTMLElement>) => {
    const host = event.currentTarget;
    const rect = host.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const dot = document.createElement("span");
    dot.className = "ripple-dot";
    dot.style.width = `${size}px`;
    dot.style.height = `${size}px`;
    dot.style.left = `${event.clientX - rect.left - size / 2}px`;
    dot.style.top = `${event.clientY - rect.top - size / 2}px`;
    host.appendChild(dot);
    window.setTimeout(() => dot.remove(), 620);
  }, []);
}