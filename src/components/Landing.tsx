import { PropsWithChildren } from "react";
import "./styles/Landing.css";
import { personalInfo } from "../data/portfolioData";

const Landing = ({ children }: PropsWithChildren) => {
  return (
    <>
      <div className="landing-section" id="landingDiv">
        <div className="landing-container">
          <div className="landing-intro">
            <h2>Hello! I'm</h2>
            <h1>
              {personalInfo.firstName}
              <br />
              <span>{personalInfo.lastName}</span>
            </h1>
          </div>
          <div className="landing-info">
            <h3>{personalInfo.title}</h3>
            <h2 className="landing-info-h2">
              <div className="landing-h2-1">{personalInfo.role2}</div>
              <div className="landing-h2-2">{personalInfo.role1}</div>
            </h2>
            <h2>
              <div className="landing-h2-info">{personalInfo.role1}</div>
              <div className="landing-h2-info-1">{personalInfo.role2}</div>
            </h2>
          </div>
        </div>
        {children}
      </div>
    </>
  );
};

export default Landing;
