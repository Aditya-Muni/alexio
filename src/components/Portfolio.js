import Isotope from "isotope-layout";
import { useCallback, useEffect, useRef, useState } from "react";
import SectionContainer from "./SectionContainer";
import Testimonials from "./Testimonials";
import { useAlexio } from "../Context";

const Portfolio = () => {
  const user = useAlexio();

  // Isotope
  const isotope = useRef();
  const [filterKey, setFilterKey] = useState("*");

  useEffect(() => {
    if (user.userData) {
      const imagesLoaded = require("imagesloaded");
      imagesLoaded(
        document.querySelector(".portfolio-cols"),
        function (instance) {
          isotope.current = new Isotope(".portfolio-cols", {
            itemSelector: ".portfolio-item",
            layoutMode: "fitRows",
            percentPosition: true,
            masonry: {
              columnWidth: ".portfolio-item",
            },
            animationOptions: {
              duration: 750,
              easing: "linear",
              queue: false,
            },
          });
        }
      );
    }
  }, [user.userData]);

  useEffect(() => {
    if (isotope.current) {
      filterKey === "*"
        ? isotope.current.arrange({ filter: `*` })
        : isotope.current.arrange({ filter: `.${filterKey}` });
    }
  }, [filterKey]);

  const handleFilterKeyChange = useCallback(
    (key) => () => {
      setFilterKey(key);
    },
    []
  );

  const activeBtn = (value) => (value === filterKey ? "active" : "");

  if (!user.userData) {
    return <div>loading..</div>;
  }
  const projects = user.userData.user.projects.sort(
    (a, b) => a.sequence - b.sequence
  );
  return (
    <SectionContainer
      name={"portfolio"}
      title={"My Projects"}
      subTitle={"Latest Work"}
      leftImage={user.userData.user.about.avatar.url}
    >
      <div className="portfolio-section">
        <div className="portfolio-filter m-10px-b">
          <ul className="filter text-left text-md-center">
            {" "}
            <li
              className={`${activeBtn("*")} theme-after`}
              onClick={handleFilterKeyChange("*")}
            >
              All
            </li>{" "}
            <li
              className={`${activeBtn("tailwindcss")} theme-after`}
              onClick={handleFilterKeyChange("tailwindcss")}
              data-filter=".tailwindcss"
            >
              tailwind
            </li>{" "}
            <li
              className={`${activeBtn("nextjs")} theme-after`}
              onClick={handleFilterKeyChange("nextjs")}
              data-filter=".nextjs"
            >
              Nextjs
            </li>{" "}
            <li
              className={`${activeBtn("reactjs")} theme-after`}
              onClick={handleFilterKeyChange("reactjs")}
              data-filter=".reactjs"
            >
              Reactjs
            </li>
            <li
              className={`${activeBtn("css")} theme-after`}
              onClick={handleFilterKeyChange("css")}
              data-filter=".css"
            >
              CSS
            </li>
          </ul>
        </div>{" "}
        {/* Portfolio Filter */}
        <div className="portfolio-content">
          <ul className="portfolio-cols portfolio-cols-3">
            {projects.map((project, index) => (
              <li
                className={`portfolio-item website ${project.techStack
                  .map((tech) => tech.toLowerCase())
                  .join(" ")}`}
                key={index}
              >
                <div className="portfolio-col portfolio-hover-01">
                  <div className="portfolio-img">
                    <a href={project.image.url}>
                      <img src={project.image.url} title alt />
                    </a>
                    <div className="hover">
                      <div className="action-btn">
                        <a
                          href="http://www.youtube.com/watch?v=0O2aH4XLbto"
                          className="popup-video theme-color"
                        >
                          <i className="fa fa-play" />
                        </a>
                        <a
                          className="lightbox-gallery theme-color"
                          href={project.image.url}
                          title="Lightbox gallery image title..."
                        >
                          <i className="fas fa-expand" />
                        </a>
                        <a href={project.githuburl} className="theme-color">
                          <i className="fa fa-link" />
                        </a>
                      </div>{" "}
                      {/* Video Btn */}
                    </div>{" "}
                    {/* Hover */}
                  </div>
                  <div className="portfolio-info">
                    <h5>{project.title}</h5>
                    {project.techStack.slice(0, 4).map((tech, index) => (
                      <span key={index}>{tech}</span>
                    ))}
                    {project.techStack.length - 4 > 0 && (
                      <span key="ellipsis">...</span>
                    )}
                  </div>
                </div>{" "}
                {/* Portfolio */}
              </li>
            ))}
          </ul>
        </div>
      </div>
      {/* 
          ==========================
            Testimonials
          ==========================
          */}
      <Testimonials />
    </SectionContainer>
  );
};
export default Portfolio;
