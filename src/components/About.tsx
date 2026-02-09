import "./styles/About.css";
import { aboutData } from "../data/portfolioData";

const About = () => {
  return (
    <div className="about-section" id="about">
      <div className="about-me">
        <h3 className="title">{aboutData.title}</h3>
        <p className="para">
          {aboutData.content.split("\n\n")[0]}
        </p>
      </div>
    </div>
  );
};

export default About;
