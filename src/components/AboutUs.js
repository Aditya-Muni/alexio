import SectionContainer from "./SectionContainer";
import { useAlexio } from "../Context";

const AboutUs = () => {
  const user = useAlexio();

  if (!user.userData) {
    return <div></div>;
  }

  const services = user.userData.user.services;
  const iconarray = [
    "ti-ruler-pencil",
    "ti-tablet",
    "ti-vector",
    "ti-bar-chart",
    "ti-image",
    "ti-brush-alt",
  ];

  return (
    <SectionContainer
      name={"about"}
      extraClass="about-section"
      title={"About"}
      subTitle={"WHO I AM"}
      leftImage={user.userData.user.about.avatar.url}
      leftImageTitle={"About Me"}
    >
      <div className="row">
        <div className="col-md-4">
          <img src={user.userData.user.about.avatar.url} title alt />
        </div>
        <div className="col-md-8 md-m-30px-t">
          <div className="about-text">
            <h3 className="dark-color">{user.userData.user.about.name}</h3>
            <p className="m-0px">{user.userData.user.about.description}</p>
          </div>{" "}
          {/* about-text */}
          <div className="row m-30px-t">
            {services.map((service, index) => (
              <div className="col-md-6 col-sm-6 m-30px-b" key={index}>
                <div className="feature-box">
                  <i
                    className={`icon dark-color theme-after ${
                      iconarray[index % iconarray.length]
                    } `}
                  />
                  <div className="feature-content">
                    <h5 className="dark-color">{service.name}</h5>
                    <p>{service.desc}</p>
                  </div>
                </div>
              </div>
            ))}{" "}
          </div>{" "}
          {/* row */}
          <div className="btn-bar">
            <a href="#" className="btn btn-theme">
              Download CV
            </a>
          </div>
        </div>
      </div>{" "}
      {/* row */}
      {/* 
     ==========================
       Counter
     ==========================
     */}
      <div className="counter-row m-50px-t p-40px-t lg-m-35px-t lg-p-25px-t sm-p-15px-t">
        <div className="row">
          <div className="col-md-3 col-sm-6 md-m-15px-tb">
            <div className="counter-col counter-box">
              <div className="counter-data" data-count={375}>
                <i className="theme-color ti-face-smile" />
                <div className="count dark-color">
                  {user.userData.user.about.some_total}
                </div>
                <h6>Happy Clients</h6>
              </div>
            </div>
          </div>{" "}
          {/* col */}
          <div className="col-md-3 col-sm-6 md-m-15px-tb">
            <div className="counter-col counter-box">
              <div className="counter-data" data-count={375}>
                <i className="theme-color ti-headphone" />
                <div className="count dark-color">
                  {user.userData.user.about.exp_year + "+ Years"}
                </div>
                <h6>Experience</h6>
              </div>
            </div>
          </div>{" "}
          {/* col */}
          <div className="col-md-3 col-sm-6 md-m-15px-tb">
            <div className="counter-col counter-box">
              <div className="counter-data" data-count={375}>
                <i className="theme-color ti-camera" />
                <div className="count dark-color">
                  {user.userData.user.skills.length}
                </div>
                <h6>Skills</h6>
              </div>
            </div>
          </div>{" "}
          {/* col */}
          <div className="col-md-3 col-sm-6 md-m-15px-tb">
            <div className="counter-col counter-box">
              <div className="counter-data" data-count={375}>
                <i className="theme-color ti-thumb-up" />
                <div className="count dark-color">
                  {user.userData.user.projects.length + "+"}
                </div>
                <h6>Projects</h6>
              </div>
            </div>
          </div>{" "}
          {/* col */}
        </div>{" "}
        {/* row */}
      </div>
    </SectionContainer>
  );
};
export default AboutUs;
