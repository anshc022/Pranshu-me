import { useEffect } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import HoverLinks from "./HoverLinks";
import { gsap } from "gsap";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import "./styles/Navbar.css";
import { personalInfo } from "../data/portfolioData";

gsap.registerPlugin(ScrollSmoother, ScrollTrigger);
export let smoother: ScrollSmoother;

const Navbar = () => {
  useEffect(() => {
    smoother = ScrollSmoother.create({
      wrapper: "#smooth-wrapper",
      content: "#smooth-content",
      smooth: 1.7,
      speed: 1.7,
      effects: true,
      autoResize: true,
      ignoreMobileResize: true,
    });

    smoother.scrollTop(0);
    smoother.paused(true);

    let links = document.querySelectorAll(".header ul a");
    links.forEach((elem) => {
      let element = elem as HTMLAnchorElement;
      element.addEventListener("click", (e) => {
        if (window.innerWidth > 1024) {
          e.preventDefault();
          let elem = e.currentTarget as HTMLAnchorElement;
          let section = elem.getAttribute("data-href");
          smoother.scrollTo(section, true, "top top");
        }
      });
    });
    window.addEventListener("resize", () => {
      ScrollSmoother.refresh(true);
    });
  }, []);
  return (
    <>
      <div className="header">
        <a href="/#" className="navbar-title" data-cursor="disable">
          <svg
            width="38"
            height="38"
            viewBox="0 0 120 120"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Rounded square frame */}
            <rect
              x="3"
              y="3"
              width="114"
              height="114"
              rx="24"
              stroke="white"
              strokeWidth="3"
            />
            {/* P - vertical stroke */}
            <line x1="28" y1="30" x2="28" y2="90" stroke="white" strokeWidth="6" strokeLinecap="round" />
            {/* P - top bar */}
            <path
              d="M28 30 L52 30 C64 30 64 54 52 54 L28 54"
              stroke="white"
              strokeWidth="6"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />
            {/* C - arc */}
            <path
              d="M92 38 C78 24 58 28 56 48 C54 68 74 78 92 64"
              stroke="white"
              strokeWidth="6"
              strokeLinecap="round"
              fill="none"
            />
            {/* Connecting slash between P and C */}
            <line x1="52" y1="82" x2="68" y2="38" stroke="rgba(255,255,255,0.25)" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </a>
        <a
          href={`mailto:${personalInfo.email}`}
          className="navbar-connect"
          data-cursor="disable"
        >
          {personalInfo.email}
        </a>
        <ul>
          <li>
            <a data-href="#about" href="#about">
              <HoverLinks text="ABOUT" />
            </a>
          </li>
          <li>
            <a data-href="#work" href="#work">
              <HoverLinks text="WORK" />
            </a>
          </li>
          <li>
            <a data-href="#contact" href="#contact">
              <HoverLinks text="CONTACT" />
            </a>
          </li>
          <li>
            <a href="/book" data-cursor="disable" style={{ color: '#c2a4ff' }}>
              <HoverLinks text="BOOK" />
            </a>
          </li>
          <li>
            <a href="/ai" data-cursor="disable" style={{ color: '#c2a4ff' }}>
              <HoverLinks text="AI" />
            </a>
          </li>
        </ul>
      </div>

      <div className="landing-circle1"></div>
      <div className="landing-circle2"></div>
      <div className="nav-fade"></div>
    </>
  );
};

export default Navbar;
