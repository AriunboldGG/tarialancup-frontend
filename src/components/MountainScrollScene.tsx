"use client";

import { useEffect, useRef, useState } from "react";
import { IconType } from "react-icons";
import {
  FaArrowDown,
  FaArrowUp,
  FaCalendarAlt,
  FaCreditCard,
  FaEnvelope,
  FaFacebookF,
  FaMouse,
  FaPen,
  FaPhoneAlt,
  FaTrophy,
  FaUser,
} from "react-icons/fa";
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
    title: "Tarialan cup 2026",
    description:
      "Tarialan cup - 2026 тэмцээний мэдээлэл хүргэх албан ёсны вэбсайт ",
  },
  {
    title: "Зохион байгуулалт",
    description:
      "Тэмцээний зохион байгуулалтын талаарх мэдээллийг эндээс авна уу",
  },
  {
    title: "Холбоо барих",
    description:
      "Асууж тодруулах зүйлс гарвал доорх холбоосоор холбогдоно уу",
  },
  {
    title: "Бүртгэлийн мэдээлэл",
    description:
      "Бүртгэлийн хүсэлт илгээх заавар, шаардлагатай мэдээллүүд.",
  },
];

const organizationCards: { title: string; icon: IconType; items: string[] }[] = [
  {
    title: "Тэмцээний мэдээлэл",
    icon: FaCalendarAlt,
    items: [
      "Зохион байгуулагч: 2014–2017 оны төгсөгчид",
      "Тэмцээн болох хугацаа: 2025.05.16–17",
      "Тэмцээн болох байршил: Тариалан сумын спорт заал",
      "Нээлтийн оройн шоу: 2025.05.16",
    ],
  },
  {
    title: "Тэмцээний төрөл",
    icon: FaTrophy,
    items: [
      "Сагсан бөмбөг",
      "Дартс (эрэгтэй 2, эмэгтэй 2 – баг)",
      "Теннис (ганцаарчилсан)",
    ],
  },
];

const contactCards = [
  {
    title: "Холбоо барих - Ерөнхий зохион байгуулагч",
    name: "Э. Өсөхбаяр",
    phone: "-",
    email: "example1@tarialancup.mn",
    facebook: "https://www.facebook.com/ariukaazzz/",
  },
  {
    title: "Холбоо барих - Бүртгэл хариуцсан ЗБ",
    name: "Г. Ариунболд",
    phone: "89141818",
    email: "ganbatariunbold8@gmail.com",
    facebook: "https://www.facebook.com/ariukaazzz/",
  },
  {
    title: "Холбоо барих - Сагсан бөмбөг ЗБ",
    name: "Э.Чинбат",
    phone: "+976 0000 0001",
    email: "example2@tarialancup.mn",
    facebook: "https://facebook.com/organizer.two",
  },
  {
    title: "Холбоо барих - Дартс ЗБ",
    name: "Нэр",
    phone: "+976 0000 0001",
    email: "example2@tarialancup.mn",
    facebook: "https://facebook.com/organizer.two",
  },
  {
    title: "Холбоо барих - Теннис ЗБ",
    name: "Нэр",
    phone: "+976 0000 0001",
    email: "example2@tarialancup.mn",
    facebook: "https://facebook.com/organizer.two",
  },
];

const registrationCards: { title: string; icon: IconType; items: string[] }[] = [
  {
    title: "Бүртгэл илгээх",
    icon: FaPen,
    items: [
      "Бүртгүүлэх цэсээр дамжин спортын оролцох төрлөө сонгон хүсэлт илгээнэ",
      "Нэг багийн бүртгэл нь вэбсайтаар нэг удаа илгээгдэнэ",
      "Шаардлагатай талбаруудыг бүрэн бөглөнө",
      "Багийн гишүүдийн мэдээллээ оруулна",
      "Багийн мэдээллээ шинэчлэх бол бүртгэл хариуцсан ЗБ-д холбогдоно уу",
    ],
  },
  {
    title: "Тэмцээний хураамжийн мэдээлэл",
    icon: FaCreditCard,
    items: [
      "Хураамж: Спортын төрөлөөс хамаарна",
      "Хүлээн авах дансны дугаарт хураамжийг шилжүүлснээр бүртгэл баталгаажна",
      "Гүйлгээний кодыг ашиглан хураамжийг шилжүүлнэ",
      "Бүртгэгдсэн багуудын мэдээллийг БҮРТГЭГДСЭН БАГУУД цэсээр нэвтэрч харах боломжтой",
    ],
  },
];

export default function MountainScrollScene({ slides }: { slides: Slide[] }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const sectionRefs = useRef<HTMLElement[]>([]);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [activeChapter, setActiveChapter] = useState(0);

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
    const startRotationY = -Math.PI * 0.9;
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
        // Fallback geometry so the scene is visible if the GLB is missing.
        const fallbackGeometry = new THREE.ConeGeometry(1.8, 3.6, 6);
        const fallbackMaterial = new THREE.MeshStandardMaterial({
          color: 0x8899aa,
          roughness: 0.7,
          metalness: 0.1,
        });
        const fallbackMesh = new THREE.Mesh(fallbackGeometry, fallbackMaterial);
        fallbackMesh.position.y = 0.2;
        mountainGroup.add(fallbackMesh);
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
        const total = sections.length;
        const index = Math.min(
          total - 1,
          Math.floor(self.progress * total + 0.0001)
        );
        setActiveChapter(index);
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

    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll);

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
            {section.title === "Зохион байгуулалт" ? (
              <div className="mt-6 grid w-full gap-4 md:grid-cols-2">
                {organizationCards.map((card) => (
                  <div
                    key={card.title}
                    className="rounded-2xl border-2 border-[#1f632b]/70 bg-white/10 p-4 text-left shadow-lg backdrop-blur"
                  >
                    <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-[#1f632b]/20 px-3 py-1 text-sm font-semibold text-white">
                      <card.icon className="h-4 w-4" aria-hidden="true" />
                      <span>{card.title}</span>
                    </div>
                    <ul className="space-y-1 text-sm text-white/90">
                      {card.items.map((item) => (
                        <li key={item} className="flex items-start gap-2">
                          <span className="mt-1 text-[10px]">•</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            ) : null}
            {section.title === "Холбоо барих" ? (
              <div className="mt-6 grid w-full gap-4 md:grid-cols-2">
                {contactCards.map((card) => (
                  <div
                    key={card.title}
                    className="rounded-2xl border-2 border-[#1f632b]/70 bg-white/10 p-4 text-left shadow-lg backdrop-blur"
                  >
                    <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-[#1f632b]/20 px-3 py-1 text-sm font-semibold text-white">
                      <FaUser className="h-4 w-4" aria-hidden="true" />
                      <span>{card.title}</span>
                    </div>
                    <div className="space-y-1 text-sm text-white/90">
                      <div className="flex items-start gap-2">
                        <FaUser className="mt-1 h-3.5 w-3.5" aria-hidden="true" />
                        <span>Нэр: {card.name}</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <FaPhoneAlt className="mt-1 h-3.5 w-3.5" aria-hidden="true" />
                        <a
                          href={`tel:${card.phone.replace(/[^\d+]/g, "")}`}
                          className="hover:underline"
                        >
                          Утас: {card.phone}
                        </a>
                      </div>
                      <div className="flex items-start gap-2">
                        <FaEnvelope className="mt-1 h-3.5 w-3.5" aria-hidden="true" />
                        <a
                          href={`mailto:${card.email}`}
                          className="hover:underline"
                        >
                          Имэйл хаяг: {card.email}
                        </a>
                      </div>
                      <div className="flex items-start gap-2">
                        <FaFacebookF className="mt-1 h-3.5 w-3.5" aria-hidden="true" />
                        <a
                          href={card.facebook}
                          className="hover:underline"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Facebook
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : null}
            {section.title === "Бүртгэлийн мэдээлэл" ? (
              <div className="mt-6 grid w-full gap-4 md:grid-cols-2">
                {registrationCards.map((card) => (
                  <div
                    key={card.title}
                    className="rounded-2xl border-2 border-[#1f632b]/70 bg-white/10 p-4 text-left shadow-lg backdrop-blur"
                  >
                    <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-[#1f632b]/20 px-3 py-1 text-sm font-semibold text-white">
                      <card.icon className="h-4 w-4" aria-hidden="true" />
                      <span>{card.title}</span>
                    </div>
                    <ul className="space-y-1 text-sm text-white/90">
                      {card.items.map((item) => (
                        <li key={item} className="flex items-start gap-2">
                          <span className="mt-1 text-[10px]">•</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            ) : null}
          </div>
        </section>
      ))}
      <div className="fixed right-6 top-1/2 z-20 flex -translate-y-1/2 flex-col items-center gap-4">
        {sections.map((_, idx) => {
          const isActive = idx === activeChapter;
          return (
            <span
              key={`dot-${idx}`}
              className={`rounded-full border transition-all ${
                isActive
                  ? "h-4 w-4 border-white bg-white"
                  : "h-2.5 w-2.5 border-white/60 bg-transparent"
              }`}
            />
          );
        })}
      </div>
      {showScrollTop ? (
        <div className="fixed bottom-6 right-6 z-30 flex flex-col items-end gap-2">
          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="rounded-full bg-white/90 px-4 py-2 text-sm font-semibold text-black shadow-lg backdrop-blur hover:bg-white cursor-pointer"
          >
            <FaArrowUp className="mr-2 inline-block h-3.5 w-3.5" aria-hidden="true" />
            Дээш буцах
          </button>
          <a
            href="https://ariunbold-portfolio.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-white/80 hover:text-white"
          >
            Developed by: Ariunbold Ganbat
          </a>
        </div>
      ) : null}

      {!showScrollTop ? (
        <div className="fixed bottom-6 left-1/2 z-20 -translate-x-1/2 text-center text-white/90">
          <div className="text-xs uppercase tracking-[0.3em]">Scroll</div>
          <div className="mt-2 flex flex-col items-center gap-1">
            <span className="h-6 w-4 rounded-full border border-white/60 flex items-center justify-center">
              <FaMouse className="h-3 w-3" aria-hidden="true" />
            </span>
            <FaArrowDown className="text-lg animate-bounce" aria-hidden="true" />
          </div>
        </div>
      ) : null}
    </div>
  );
}
