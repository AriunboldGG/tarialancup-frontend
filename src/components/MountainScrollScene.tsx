"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import type { GLTF } from "three/examples/jsm/loaders/GLTFLoader.js";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import HeroSlider from "@/components/HeroSlider";

gsap.registerPlugin(ScrollTrigger);

type Slide = {
  id: string;
  image: string;
  title: string;
  subtitle?: string;
  ctaLabel?: string;
  href?: string;
};

const sections = [
  {
    title: "The Mountain",
    description:
      "Scroll to explore the cinematic mountain journey and discover the story behind each chapter.",
  },
  {
    title: "Geography",
    description:
      "Highlight the landscapes, terrain features, and the natural setting that shapes the region.",
  },
  {
    title: "Nature",
    description:
      "Showcase the forests, wildlife, and seasonal beauty that make this place unique.",
  },
  {
    title: "Adventure",
    description:
      "Emphasize the experience, challenge, and spirit of the journey through the mountains.",
  },
];

export default function MountainScrollScene({ slides }: { slides: Slide[] }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const sectionRefs = useRef<HTMLElement[]>([]);
  const scrollTrackRef = useRef<HTMLDivElement | null>(null);
  const grainRef = useRef<HTMLDivElement | null>(null);
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    if (!canvasRef.current || !wrapperRef.current) return;

    const canvas = canvasRef.current;
    const wrapper = wrapperRef.current;

    const scene = new THREE.Scene();
    scene.fog = new THREE.Fog(0x0b0f12, 10, 60);

    const camera = new THREE.PerspectiveCamera(35, 1, 0.1, 100);
    // Start closer to the mountain for the initial view.
    camera.position.set(-1.2, 1.2, 5.6);

    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.setClearColor(0x0b0f12, 1);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(ambientLight);

    const sunLight = new THREE.DirectionalLight(0xffffff, 1.4);
    sunLight.position.set(6, 8, 4);
    scene.add(sunLight);

    const fillLight = new THREE.DirectionalLight(0xbfd7ff, 0.4);
    fillLight.position.set(-6, 4, 6);
    scene.add(fillLight);

    const mountainGroup = new THREE.Group();
    const startRotationY = -Math.PI * 0.45;
    const endRotationY = Math.PI * 0.35;
    mountainGroup.rotation.y = startRotationY;
    scene.add(mountainGroup);

    const loader = new GLTFLoader();
    loader.load(
      "/mountain.glb",
      (gltf: GLTF) => {
        const model = gltf.scene;

        model.traverse((child: THREE.Object3D) => {
          if (child instanceof THREE.Mesh) {
            child.castShadow = false;
            child.receiveShadow = true;
            if (child.material && "envMapIntensity" in child.material) {
              child.material.envMapIntensity = 0.8;
            }
          }
        });

        const box = new THREE.Box3().setFromObject(model);
        const size = new THREE.Vector3();
        const center = new THREE.Vector3();
        box.getSize(size);
        box.getCenter(center);

        model.position.sub(center);

        const maxDimension = Math.max(size.x, size.y, size.z);
        const scale = 5.2 / maxDimension;
        model.scale.setScalar(scale);
        mountainGroup.position.y = -0.6;

        mountainGroup.add(model);
      },
      undefined,
      () => {
        // Keep scene alive even if the model fails to load.
      }
    );

    const mouse = { x: 0, y: 0 };
    const onMouseMove = (event: MouseEvent) => {
      mouse.x = event.clientX / window.innerWidth - 0.5;
      mouse.y = event.clientY / window.innerHeight - 0.5;
    };
    window.addEventListener("mousemove", onMouseMove);

    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: wrapper,
        start: "top top",
        end: "bottom bottom",
        scrub: 1,
      },
    });

    timeline.fromTo(
      mountainGroup.rotation,
      { y: startRotationY },
      {
        y: endRotationY,
        ease: "none",
      },
      0
    );
    timeline.to(
      camera.position,
      {
        z: 3.2,
        y: 2.4,
        ease: "none",
      },
      0
    );

    sectionRefs.current
      .filter(Boolean)
      .forEach((section, index) => {
        if (index === 0) {
          gsap.set(section, { autoAlpha: 1, y: 0 });
          return;
        }

        gsap.fromTo(
          section,
          { autoAlpha: 0, y: 30 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.6,
            ease: "power2.out",
            scrollTrigger: {
              trigger: section,
              start: "top 70%",
              end: "bottom 30%",
              toggleActions: "play reverse play reverse",
            },
          }
        );
      });

    const scrollIndicator = ScrollTrigger.create({
      trigger: wrapper,
      start: "top top",
      end: "bottom bottom",
      onUpdate: (self) => {
        if (!scrollTrackRef.current || !grainRef.current) return;
        const trackHeight = scrollTrackRef.current.clientHeight;
        const iconHeight = grainRef.current.clientHeight;
        const y = (trackHeight - iconHeight) * self.progress;
        grainRef.current.style.transform = `translateY(${y}px)`;
      },
    });

    let animationId = 0;
    const animate = () => {
      const baseRotationY = gsap.getProperty(mountainGroup.rotation, "y") as number;
      mountainGroup.rotation.y += (baseRotationY + mouse.x * 0.12 - mountainGroup.rotation.y) * 0.04;
      mountainGroup.rotation.x += (mouse.y * 0.08 - mountainGroup.rotation.x) * 0.04;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
      animationId = requestAnimationFrame(animate);
    };
    animate();

    const handleResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    };
    window.addEventListener("resize", handleResize);

    const updateGrain = () => {
      if (!scrollTrackRef.current || !grainRef.current || !wrapperRef.current) return;
      const start = wrapperRef.current.offsetTop;
      const end = start + wrapperRef.current.offsetHeight - window.innerHeight;
      const progress = Math.min(Math.max((window.scrollY - start) / (end - start), 0), 1);
      const trackHeight = scrollTrackRef.current.clientHeight;
      const iconHeight = grainRef.current.clientHeight;
      const y = (trackHeight - iconHeight) * progress;
      grainRef.current.style.transform = `translateY(${y}px)`;
    };

    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
      updateGrain();
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    updateGrain();

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", handleScroll);
      cancelAnimationFrame(animationId);
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      scrollIndicator.kill();
      timeline.kill();
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={wrapperRef}
      className="relative min-h-[400vh] bg-[#0b0f12] text-white overflow-hidden pt-24 md:pt-32"
    >
      <div className="fixed inset-0 z-0">
        <canvas ref={canvasRef} className="h-full w-full" />
      </div>

      {sections.map((section, index) => (
        <section
          key={section.title}
          ref={(el) => {
            if (el) sectionRefs.current[index] = el;
          }}
          id={`chapter-${index + 1}`}
          className="relative z-10 h-screen flex items-center justify-center px-6"
        >
          <div
            className={`text-center space-y-4 rounded-2xl bg-black/35 px-6 py-8 backdrop-blur-md ${
              index === 0 ? "max-w-5xl" : "max-w-xl"
            }`}
          >
            <p className="text-sm uppercase tracking-[0.3em] text-white/70">
              Chapter {index + 1}
            </p>
            <h1 className="text-3xl md:text-5xl font-semibold">
              {section.title}
            </h1>
            <p className="text-sm md:text-base text-white/80">
              {section.description}
            </p>
            {index === 0 ? (
              <div className="pt-4">
                <div className="overflow-hidden rounded-xl border border-white/10 bg-white/5">
                  <HeroSlider slides={slides} />
                </div>
              </div>
            ) : null}
          </div>
        </section>
      ))}
      <div className="fixed right-6 top-1/2 z-20 flex h-80 -translate-y-1/2 items-center">
        <div
          ref={scrollTrackRef}
          className="relative h-full w-1.5 rounded-full bg-white/50"
        >
          <div className="absolute -top-3 left-1/2 h-3 w-3 -translate-x-1/2 rounded-full bg-white/80" />
          <div className="absolute -bottom-3 left-1/2 h-3 w-3 -translate-x-1/2 rounded-full bg-white/80" />
          <div ref={grainRef} className="absolute left-1/2 -translate-x-1/2">
            <img
              src="/images/grain-scroll.svg"
              alt="Grain scroll indicator"
              className="h-16 w-16 drop-shadow-xl"
            />
          </div>
        </div>
      </div>
      {showScrollTop ? (
        <button
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-6 right-6 z-30 rounded-full bg-white/90 px-4 py-2 text-sm font-semibold text-black shadow-lg backdrop-blur hover:bg-white"
        >
          Дээш буцах
        </button>
      ) : null}
    </div>
  );
}
