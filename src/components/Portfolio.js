import Isotope from "isotope-layout";
import { useCallback, useEffect, useRef, useState } from "react";
import SectionContainer from "./SectionContainer";
import { useAlexio } from "../Context";
import Modal from "./Modal";

const Portfolio = () => {
  const user = useAlexio();

  // Isotope
  const isotope = useRef();
  const [filterKey, setFilterKey] = useState("*");
  const [currentPage, setCurrentPage] = useState(1);
  const [projectsPerPage] = useState(2);
  const [selectedProject, setSelectedProject] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (user.userData) {
      import("imagesloaded").then((module) => {
        const imagesLoaded = module.default;
        imagesLoaded(document.querySelector(".portfolio-cols"), function () {
          isotope.current = new Isotope(".portfolio-cols", {
            itemSelector: ".portfolio-item",
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
        });
      });
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
      setCurrentPage(1);
    },
    []
  );

  const activeBtn = (value) => (value === filterKey ? "active" : "");

  if (!user.userData) {
    return <div></div>;
  }
  const projects = user.userData.user.projects.sort(
    (a, b) => a.sequence - b.sequence
  );

  const indexOfLastProject = currentPage * projectsPerPage;
  const indexOfFirstProject = indexOfLastProject - projectsPerPage;
  let currentProjects = projects.slice(indexOfFirstProject, indexOfLastProject);

  if (
    currentPage === Math.ceil(projects.length / projectsPerPage) &&
    projects.length % projectsPerPage === 1
  ) {
    currentProjects = projects.slice(
      indexOfFirstProject - 1,
      indexOfLastProject - 1
    );
  }

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const openModal = (project) => {
    setSelectedProject(project);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

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
            <li
              className={`${activeBtn("*")} theme-after`}
              onClick={handleFilterKeyChange("*")}
            >
              All
            </li>
            <li
              className={`${activeBtn("tailwindcss")} theme-after`}
              onClick={handleFilterKeyChange("tailwindcss")}
              data-filter=".tailwindcss"
            >
              tailwind
            </li>
            <li
              className={`${activeBtn("nextjs")} theme-after`}
              onClick={handleFilterKeyChange("nextjs")}
              data-filter=".nextjs"
            >
              Nextjs
            </li>
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
        </div>
        <div className="portfolio-content">
          <ul className="portfolio-cols portfolio-cols-2">
            {currentProjects.map((project, index) => (
              <li
                className={`portfolio-item website portfolio-hover-01 my-2 project-list ${project.techStack
                  .map((tech) => tech.toLowerCase())
                  .join(" ")}`}
                key={index}
                onClick={() => openModal(project)} // Open modal on click
              >
                <div className="portfolio-col">
                  <div className="portfolio-img">
                    <a>
                      <img src={project.image.url} alt="" />
                    </a>
                    <div className="hover">
                      <div className="action-btn">
                        <a
                          href={project.githuburl}
                          target="_blank"
                          className="theme-color"
                        >
                          <i className="fab fa-lg fa-github"></i>
                        </a>
                        <a
                          href={project.liveurl}
                          target="_blank"
                          className="theme-color"
                        >
                          <i className="fa fa-link" />
                        </a>
                      </div>{" "}
                      {/* Action Btn */}
                    </div>{" "}
                    {/* Hover */}
                  </div>
                  <div className="portfolio-info">
                    <h5>{project.title}</h5>
                    {project.techStack.map((tech, index) => (
                      <span key={index}>{tech} </span>
                    ))}
                  </div>
                </div>{" "}
                {/* Portfolio Col */}
              </li>
            ))}
          </ul>
        </div>
        <ul className="pagination d-flex justify-content-center">
          {Array.from({
            length: Math.ceil(projects.length / projectsPerPage),
          }).map((_, index) => (
            <li key={index} className="page-item">
              <button onClick={() => paginate(index + 1)} className="page-link">
                {index + 1}
              </button>
            </li>
          ))}
        </ul>
      </div>
      {showModal && (
        <Modal selectedProject={selectedProject} closeModal={closeModal} />
      )}
    </SectionContainer>
  );
};

export default Portfolio;
