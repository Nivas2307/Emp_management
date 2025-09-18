import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import "../style/global.css";

export default function WelcomePage() {
  const containerRef = useRef(null);
  const headingRef = useRef(null);
  const subHeadingRef = useRef(null);
  const lineRef = useRef(null);
  const paraRef = useRef(null);
  const buttonsRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    tl.fromTo(containerRef.current, { opacity: 0 }, { opacity: 1, duration: 1.5 })
      .fromTo(headingRef.current, { y: 50, opacity: 0 }, { y: 0, opacity: 1, duration: 1.2 }, "-=1")
      .fromTo(subHeadingRef.current, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 1 }, "-=0.8")
      .fromTo(lineRef.current, { scaleX: 0, opacity: 0 }, { scaleX: 1, opacity: 1, duration: 1, transformOrigin: "center" }, "-=0.6")
      .fromTo(paraRef.current, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 1 }, "-=0.4")
      .fromTo(buttonsRef.current, { opacity: 0, scale: 0.9 }, { opacity: 1, scale: 1, duration: 0.8 }, "-=0.3");

    // Gentle breathing heading effect
    gsap.to(headingRef.current, {
      scale: 1.02,
      duration: 3,
      repeat: -1,
      yoyo: true,
      ease: "power1.inOut",
    });

    // Floating particles animation
    gsap.utils.toArray(".particle").forEach((particle, i) => {
      gsap.to(particle, {
        x: `random(-40, 40)`,
        y: `random(-30, 30)`,
        duration: `random(4, 8)`,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: i * 0.5,
      });
    });
  }, []);

  return (
    <div className="welcome-wrapper">
      {/* Floating background particles */}
      <div className="particles">
        {Array.from({ length: 12 }).map((_, i) => (
          <span key={i} className="particle"></span>
        ))}
      </div>

      {/* Main content */}
      <div className="welcome-container" ref={containerRef}>
        <h1 ref={headingRef} className="welcome-heading">
          👋 Welcome to Our World
        </h1>
        <h3 ref={subHeadingRef} className="welcome-subheading">
          Elegant • Modern • Inspiring
        </h3>
        <div ref={lineRef} className="welcome-line"></div>
        <p ref={paraRef} className="welcome-text">
          Begin your journey with us. Please{" "}
          <Link to="/login" className="welcome-link">Login</Link> or{" "}
          <Link to="/signup" className="welcome-link">Signup</Link> to continue 🚀
        </p>
        <div ref={buttonsRef} className="welcome-buttons">
          <Link to="/login" className="btn-primary">Login</Link>
          <Link to="/signup" className="btn-secondary">Signup</Link>
        </div>
      </div>

      {/* Bottom Wave */}
      <div className="wave-container">
        <svg className="wave" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 150">
          <path
            fill="#007bff"
            fillOpacity="0.3"
            d="M0,64L60,90.7C120,117,240,171,360,181.3C480,192,600,160,720,154.7C840,149,960,171,1080,176C1200,181,1320,171,1380,165.3L1440,160L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"
          ></path>
        </svg>
      </div>
    </div>
  );
}
