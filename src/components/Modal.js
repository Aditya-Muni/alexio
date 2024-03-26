import React from "react";
import PropTypes from "prop-types";

const Modal = ({ selectedProject, closeModal }) => {
  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={closeModal}>
          &times;
        </span>
        {selectedProject && (
          <div>
            <div className="d-flex align-items-center justify-content-between">
              <h2 className="text-warning">{selectedProject.title}</h2>
              <div className="d-flex justify-content-center">
                <a
                  href={selectedProject.githuburl}
                  target="_blank"
                  className="theme-color mx-2 text-dark"
                >
                  <i className="fab fa-lg fa-github"></i>
                </a>
                <a
                  href={selectedProject.liveurl}
                  target="_blank"
                  className="theme-color mx-2 text-dark"
                >
                  <i className="fa fa-link" />
                </a>
              </div>
            </div>

            <p className="text-dark">{selectedProject.description}</p>
            <div>
              <h4 className="text-dark">Tech stack</h4>
              {selectedProject.techStack.map((tech, index) => (
                <span className="text-dark" key={index}>
                  {tech}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Modal;
