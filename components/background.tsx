"use client";

import { useEffect, useRef } from "react";

export default function Background() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    let mounted = true;
    const cleanupFns: Array<() => void> = [];
    let raf = 0;
    let renderer: any = null;

    const init = async () => {
      const THREE: any = await import("three");
      if (!mounted) return;

      const canvas = canvasRef.current;
      if (!canvas) return;

      let r: any;
      try {
        r = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
      } catch {
        return;
      }
      renderer = r;

      const W = window.innerWidth;
      const H = window.innerHeight;
      r.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      r.setSize(W, H);

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(45, W / H, 0.1, 100);
      camera.position.set(0, 0, 12);

      function makeField(
        count: number,
        spread: number,
        depth: number,
        size: number,
        opacity: number
      ) {
        const positions = new Float32Array(count * 3);
        for (let i = 0; i < count; i++) {
          positions[i * 3] = (Math.random() - 0.5) * spread;
          positions[i * 3 + 1] = (Math.random() - 0.5) * spread * 0.7;
          positions[i * 3 + 2] = (Math.random() - 0.5) * depth - 2;
        }
        const geometry = new THREE.BufferGeometry();
        geometry.setAttribute(
          "position",
          new THREE.Float32BufferAttribute(positions, 3)
        );
        const material = new THREE.PointsMaterial({
          color: 0xC9A14A,
          size,
          transparent: true,
          opacity,
          sizeAttenuation: true,
        });
        return new THREE.Points(geometry, material);
      }

      const near = makeField(300, 30, 12, 0.045, 0.4);
      const far = makeField(220, 36, 16, 0.028, 0.22);
      scene.add(near, far);

      const reduce = window.matchMedia("(prefers-reduced-motion:reduce)").matches;

      const onResize = () => {
        const w = window.innerWidth;
        const h = window.innerHeight;
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        r.setSize(w, h);
      };
      window.addEventListener("resize", onResize);
      cleanupFns.push(() => window.removeEventListener("resize", onResize));

      if (!reduce) {
        let targetX = 0;
        let targetY = 0;
        let currentX = 0;
        let currentY = 0;

        const onMove = (e: MouseEvent) => {
          targetX = e.clientX / window.innerWidth - 0.5;
          targetY = e.clientY / window.innerHeight - 0.5;
        };
        window.addEventListener("mousemove", onMove);
        cleanupFns.push(() => window.removeEventListener("mousemove", onMove));

        const animate = () => {
          raf = requestAnimationFrame(animate);
          near.rotation.y += 0.0006;
          near.rotation.x += 0.0002;
          far.rotation.y -= 0.0004;
          far.rotation.x += 0.0001;
          currentX += (targetX - currentX) * 0.04;
          currentY += (targetY - currentY) * 0.04;
          camera.position.x = currentX * 2.2;
          camera.position.y = -currentY * 1.5;
          camera.lookAt(0, 0, 0);
          r.render(scene, camera);
        };

        animate();
      } else {
        r.render(scene, camera);
      }
    };

    init();

    return () => {
      mounted = false;
      cancelAnimationFrame(raf);
      cleanupFns.forEach((fn) => fn());
      renderer?.dispose();
    };
  }, []);

  return (
    <>
      <canvas id="bg-3d" ref={canvasRef} aria-hidden="true" />
      <div id="cinema-bloom" aria-hidden="true" />
      <div id="cinema-vignette" aria-hidden="true" />
    </>
  );
}
