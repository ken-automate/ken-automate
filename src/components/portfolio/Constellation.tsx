import { useEffect, useRef } from "react";

type Node = { x: number; y: number; vx: number; vy: number };

// Drifting nodes that link with fading lines when close. The cursor joins as one more node.
// Fixed to the viewport behind all page content, so it runs from the hero down to the footer.
export function Constellation({ className = "" }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const cv = canvasRef.current;
    const ctx = cv?.getContext("2d");
    if (!cv || !ctx) return;

    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    let w = 0;
    let h = 0;
    let dpr = 1;
    let nodes: Node[] = [];
    let color = "";

    const readColor = () => {
      color = getComputedStyle(document.documentElement).getPropertyValue("--constellation").trim();
    };

    // 35 to 60 nodes, scaled to the screen's area.
    const seed = () => {
      const count = Math.min(60, Math.max(35, Math.round((w * h) / 22000)));
      nodes = Array.from({ length: count }, () => {
        const a = Math.random() * Math.PI * 2;
        const v = 0.012 + Math.random() * 0.02;
        return { x: Math.random(), y: Math.random(), vx: Math.cos(a) * v, vy: Math.sin(a) * v };
      });
    };

    const fit = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = cv.clientWidth;
      h = cv.clientHeight;
      cv.width = Math.round(w * dpr);
      cv.height = Math.round(h * dpr);
    };

    const m = { x: 0, y: 0, on: false };
    const onMove = (e: PointerEvent) => {
      m.x = e.clientX / w;
      m.y = e.clientY / h;
      m.on = true;
    };
    const onLeave = () => (m.on = false);

    const draw = (dt: number) => {
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, w, h);
      const pts = nodes.map((n) => {
        n.x += n.vx * (dt / 1000);
        n.y += n.vy * (dt / 1000);
        if (n.x < 0 || n.x > 1) n.vx *= -1;
        if (n.y < 0 || n.y > 1) n.vy *= -1;
        return [n.x * w, n.y * h];
      });
      if (m.on) pts.push([m.x * w, m.y * h]);

      const lim = Math.min(260, Math.min(w, h) * 0.3);
      ctx.strokeStyle = color;
      ctx.fillStyle = color;
      ctx.lineWidth = 1;
      for (let i = 0; i < pts.length; i++) {
        for (let j = i + 1; j < pts.length; j++) {
          const d = Math.hypot(pts[i][0] - pts[j][0], pts[i][1] - pts[j][1]);
          if (d < lim) {
            ctx.globalAlpha = (1 - d / lim) * 0.2;
            ctx.beginPath();
            ctx.moveTo(pts[i][0], pts[i][1]);
            ctx.lineTo(pts[j][0], pts[j][1]);
            ctx.stroke();
          }
        }
      }
      ctx.globalAlpha = 0.4;
      for (const [x, y] of pts) {
        ctx.beginPath();
        ctx.arc(x, y, 2, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
    };

    let frame = 0;
    let last = 0;
    const loop = (now: number) => {
      frame = requestAnimationFrame(loop);
      const dt = now - last;
      last = now;
      if (dt > 200) return;
      draw(dt);
    };

    readColor();
    fit();
    seed();
    draw(0);

    const resize = new ResizeObserver(() => {
      fit();
      draw(0);
    });
    resize.observe(cv);
    const theme = new MutationObserver(() => {
      readColor();
      if (reduce) draw(0);
    });
    theme.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });

    if (!reduce) {
      window.addEventListener("pointermove", onMove);
      document.documentElement.addEventListener("pointerleave", onLeave);
      frame = requestAnimationFrame(loop);
    }

    return () => {
      cancelAnimationFrame(frame);
      resize.disconnect();
      theme.disconnect();
      window.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={`pointer-events-none fixed inset-0 -z-10 h-full w-full ${className}`}
    />
  );
}
