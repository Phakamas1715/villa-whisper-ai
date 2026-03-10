import { useEffect, useRef } from 'react';

interface GenerativeArtProps {
  seed: number;
  width?: number;
  height?: number;
  className?: string;
}

function seededRandom(seed: number) {
  let s = seed;
  return () => {
    s = (s * 16807 + 0) % 2147483647;
    return s / 2147483647;
  };
}

const GenerativeArt = ({ seed, width = 400, height = 200, className = '' }: GenerativeArtProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rand = seededRandom(seed);
    const dpr = window.devicePixelRatio || 1;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.scale(dpr, dpr);

    // Background — deep water
    ctx.fillStyle = '#2C3E50';
    ctx.fillRect(0, 0, width, height);

    const palettes = [
      ['#3a5f8a', '#6b8cae', '#a8c3d9', '#2ECC71'],
      ['#4a7c8a', '#7db0b5', '#c5dfe0', '#2ECC71'],
      ['#5a6e8a', '#8a9bb5', '#bcc8d9', '#2ECC71'],
    ];
    const palette = palettes[Math.floor(rand() * palettes.length)];

    // Flow field particles
    const particleCount = 600 + Math.floor(rand() * 400);
    for (let i = 0; i < particleCount; i++) {
      let x = rand() * width;
      let y = rand() * height;
      const colorIdx = Math.floor(rand() * palette.length);

      ctx.beginPath();
      ctx.strokeStyle = palette[colorIdx];
      ctx.globalAlpha = 0.15 + rand() * 0.3;
      ctx.lineWidth = 0.5 + rand() * 1.5;

      for (let step = 0; step < 20; step++) {
        const angle =
          Math.sin(x * 0.008 + seed * 0.001) * Math.cos(y * 0.006 + seed * 0.002) * Math.PI * 2;
        const dx = Math.cos(angle) * 2;
        const dy = Math.sin(angle) * 2;
        if (step === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
        x += dx;
        y += dy;
      }
      ctx.stroke();
    }

    // Soft circles
    const circleCount = 3 + Math.floor(rand() * 4);
    for (let i = 0; i < circleCount; i++) {
      const cx = rand() * width;
      const cy = rand() * height;
      const r = 20 + rand() * 60;
      ctx.beginPath();
      ctx.arc(cx, cy, r, 0, Math.PI * 2);
      ctx.fillStyle = palette[Math.floor(rand() * palette.length)];
      ctx.globalAlpha = 0.06 + rand() * 0.1;
      ctx.fill();
    }

    ctx.globalAlpha = 1;
  }, [seed, width, height]);

  return (
    <canvas
      ref={canvasRef}
      style={{ width, height }}
      className={`rounded-lg ${className}`}
    />
  );
};

export default GenerativeArt;
