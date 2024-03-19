import { useContext } from "react";
import { AlexioContext, useAlexio } from "../Context";
import TypingAnimation from "./TypingAnimation";
// import { useAlexio } from "../Context.js";

const HomeBanner = () => {
  const { nav, changeNav } = useContext(AlexioContext);
  const activePageClass = () => ("home" === nav ? "" : "page--inactive");

  const user = useAlexio();

  if (!user.userData) {
    return <div></div>;
  }

  const socialmedia = user.userData.user.social_handles;
  return (
    <div
      className={`page home-banner white-bg ${activePageClass("home")}`}
      id={"home"}
      onClick={() => changeNav("home", false)}
    >
      <div className="container-fluid p-0">
        <div className="row no-gutters full-screen">
          <div className="col-lg-3 col-xl-4">
            <div className=" align-items-end home-user-avtar v-center-box">
              <img src={user.userData.user.about.avatar.url} alt="Avatar" />
            </div>
          </div>
          <div className="col-lg-9 col-xl-8">
            <div className="page-scroll">
              <div className="page-content">
                <div className="v-center-box d-flex align-items-center">
                  <div className="home-text">
                    <h6 className="dark-color theme-after">Hello, There</h6>
                    <h1 className="dark-color blue-after">
                      I&apos;m {user.userData.user.about.name}
                    </h1>
                    <p>
                      <TypingAnimation />
                    </p>
                    <div className="btn-bar">
                      <a href="#" className="btn btn-theme">
                        Download CV
                      </a>
                    </div>
                  </div>
                  <ul className="social-icons">
                    {socialmedia.map((icon, index) => (
                      <li className="p-1" key={index}>
                        <a
                          className={icon.platform.toLowerCase()}
                          href={icon.url}
                        >
                          <i
                            className={`fab fa-${
                              icon.platform.toLowerCase() === "facebook"
                                ? icon.platform.toLowerCase() + "-f"
                                : icon.platform.toLowerCase() === "linkedin"
                                ? icon.platform.toLowerCase() + "-in"
                                : icon.platform.toLowerCase()
                            }`}
                          />
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default HomeBanner;
