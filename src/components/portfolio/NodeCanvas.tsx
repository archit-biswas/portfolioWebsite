import { useEffect, useRef } from "react";

type Node = { x: number; y: number; vx: number; vy: number };

const LINK_DIST = 120;

export function NodeCanvas({ targetId }: { targetId: string }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf = 0;
    let running = true;
    let nodes: Node[] = [];
    let width = 0;
    let height = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const pointer = { x: -9999, y: -9999 };
    const POINTER_DIST = 170;

    const isDark = () => document.documentElement.classList.contains("dark");
    const nodeColor = () =>
      isDark() ? "rgba(99, 102, 241, 0.4)" : "rgba(79, 70, 229, 0.35)";
    const nodeColorBright = (alpha: number) =>
      isDark() ? `rgba(129, 140, 248, ${alpha})` : `rgba(79, 70, 229, ${alpha})`;
    const lineColor = (alpha: number) =>
      isDark() ? `rgba(6, 182, 212, ${alpha})` : `rgba(14, 165, 233, ${alpha})`;

    const seed = () => {
      const count = Math.max(24, Math.floor((width * height) / 22000));
      nodes = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
      }));
    };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      seed();
    };

    const step = () => {
      if (!running) return;
      ctx.clearRect(0, 0, width, height);
      const nc = nodeColor();
      for (const n of nodes) {
        n.x += n.vx;
        n.y += n.vy;
        if (n.x < 0 || n.x > width) n.vx *= -1;
        if (n.y < 0 || n.y > height) n.vy *= -1;
        const pd = Math.hypot(n.x - pointer.x, n.y - pointer.y);
        const near = pd < POINTER_DIST ? 1 - pd / POINTER_DIST : 0;
        ctx.beginPath();
        ctx.arc(n.x, n.y, 1.6 + near * 1.8, 0, Math.PI * 2);
        ctx.fillStyle = near > 0 ? nodeColorBright(0.35 + near * 0.55) : nc;
        ctx.fill();
      }
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i];
          const b = nodes[j];
          if (!a || !b) continue;
          const dist = Math.hypot(a.x - b.x, a.y - b.y);
          if (dist < LINK_DIST) {
            const alpha = (1 - dist / LINK_DIST) * 0.3;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = lineColor(alpha);
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      }
      raf = requestAnimationFrame(step);
    };

    resize();
    window.addEventListener("resize", resize);

    const finePointer = window.matchMedia("(pointer: fine)").matches;
    const onPointerMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      pointer.x = e.clientX - rect.left;
      pointer.y = e.clientY - rect.top;
    };
    const onPointerLeave = () => {
      pointer.x = -9999;
      pointer.y = -9999;
    };
    if (finePointer) {
      window.addEventListener("mousemove", onPointerMove, { passive: true });
      document.documentElement.addEventListener("mouseleave", onPointerLeave);
    }

    const target = targetId ? document.getElementById(targetId) : null;
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry) return;
        if (entry.isIntersecting && !running) {
          running = true;
          raf = requestAnimationFrame(step);
        } else if (!entry.isIntersecting && running) {
          running = false;
          cancelAnimationFrame(raf);
        }
      },
      { threshold: 0 },
    );
    if (target) observer.observe(target);

    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!media.matches) raf = requestAnimationFrame(step);
    else running = false;

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      observer.disconnect();
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onPointerMove);
      document.documentElement.removeEventListener("mouseleave", onPointerLeave);
    };
  }, [targetId]);

  return <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />;
}
