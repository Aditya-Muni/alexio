import SectionContainer from "./SectionContainer";
import { useAlexio } from "../Context";

const Services = () => {
  const user = useAlexio();

  if (!user.userData) {
    return <div></div>;
  }

  const skills = user.userData.user.skills.sort(
    (a, b) => a.sequence - b.sequence
  );
  const timeline = user.userData.user.timeline.sort(
    (a, b) => a.sequence - b.sequence
  );
  const experiences = timeline.filter((item) => !item.forEducation);
  const education = timeline.filter((item) => item.forEducation);

  const dateString = timeline[0].startDate;
  const dateObject = new Date(dateString);

  const formattedDate = dateObject.toLocaleDateString("en-US", {
    month: "short",
    year: "numeric",
  });

  return (
    <SectionContainer
      name={"resume"}
      extraClass={"resume-section"}
      title={"My Resume"}
      subTitle={"History"}
      leftImage={user.userData.user.about.avatar.url}
    >
      <div className="row">
        <div className="col-md-6">
          <div className="resume-row">
            <h2 className="theme-after dark-color">Experience</h2>
            <ul>
              {experiences.map((experience, index) => (
                <li key={index}>
                  <div className="r-name">
                    <i className="theme-bg ti-briefcase" />
                    <span className="dark-color">
                      {experience.company_name}
                    </span>
                    <label>
                      {new Date(experience.startDate)
                        .toLocaleDateString("en-US", {
                          month: "short",
                          year: "numeric",
                        })
                        .toUpperCase() +
                        " - " +
                        new Date(experience.endDate)
                          .toLocaleDateString("en-US", {
                            month: "short",
                            year: "numeric",
                          })
                          .toUpperCase()}
                    </label>
                  </div>
                  <div className="r-info">
                    {experience.bulletPoints.map((point, index) => (
                      <p key={index}>•{point}</p>
                    ))}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>{" "}
        {/* col */}
        <div className="col-md-6">
          <div className="resume-row">
            <h2 className="theme-after dark-color">Education</h2>
            <ul>
              {education.map((university, index) => (
                <li key={index}>
                  <div className="r-name">
                    <i className="theme-bg fas fa-graduation-cap" />
                    <span className="dark-color">
                      {university.company_name}
                    </span>
                    <label>
                      {new Date(university.startDate)
                        .toLocaleDateString("en-US", {
                          month: "short",
                          year: "numeric",
                        })
                        .toUpperCase() +
                        " - " +
                        new Date(university.endDate)
                          .toLocaleDateString("en-US", {
                            month: "short",
                            year: "numeric",
                          })
                          .toUpperCase()}
                    </label>
                  </div>
                  <div className="r-info">
                    {university.bulletPoints.map((point, index) => (
                      <p key={index}>•{point}</p>
                    ))}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>{" "}
        {/* col */}
      </div>{" "}
      {/* row */}
      <div className="skill-row m-30px-t sm-m-20px-t">
        <div className="sub-title m-30px-b">
          <h2 className="dark-color theme-after">My Skills</h2>
        </div>

        <h3 className="dark-color">Skills</h3>
        <div className="skills row">
          {skills.map((skill, index) => (
            <div className="progress-lt col-6" key={index}>
              <h6>{skill.name}</h6>
              <span className="theme-bg">{skill.percentage}</span>
              <div className="progress">
                <div
                  className="progress-bar"
                  style={{ width: skill.percentage + "%" }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </SectionContainer>
  );
};
export default Services;
