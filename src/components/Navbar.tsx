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
            width="42"
            height="42"
            viewBox="0 0 100 100"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Outer hexagonal border */}
            <polygon
              points="50,2 93,27 93,73 50,98 7,73 7,27"
              stroke="white"
              strokeWidth="2.5"
              fill="none"
            />
            {/* Inner accent line */}
            <polygon
              points="50,10 86,31 86,69 50,90 14,69 14,31"
              stroke="rgba(255,255,255,0.15)"
              strokeWidth="1"
              fill="none"
            />
            {/* P letter - custom path */}
            <path
              d="M30 70 L30 30 L48 30 Q58 30 58 40 Q58 50 48 50 L30 50"
              stroke="white"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />
            {/* C letter - custom path */}
            <path
              d="M70 35 Q60 28 52 35 Q44 42 52 50 Q60 58 70 50"
              stroke="white"
              strokeWidth="4"
              strokeLinecap="round"
              fill="none"
              transform="translate(12, 15) scale(0.85)"
            />
            {/* Decorative dot */}
            <circle cx="72" cy="68" r="2.5" fill="white" />
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
        </ul>
      </div>

      <div className="landing-circle1"></div>
      <div className="landing-circle2"></div>
      <div className="nav-fade"></div>
    </>
  );
};

export default Navbar;
