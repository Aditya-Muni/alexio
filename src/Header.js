import { useContext } from "react";
import { AlexioContext, useAlexio } from "./Context";
import Preloader from "../src/Preloader";

const Header = () => {
  const { changeNav, nav, toggle } = useContext(AlexioContext);
  const user = useAlexio();

  if (!user.userData) {
    return (
      <div>
        <Preloader />
      </div>
    );
  }
  return (
    <header className="header theme-bg">
      <div className="logo">{user.userData.user.about.name}</div>
      <div className="menu-toggle">
        <button
          className={`menu-button ${toggle ? "menu-button--open" : ""}`}
          onClick={() => changeNav(nav, !toggle)}
        >
          <span>Menu</span>
        </button>
      </div>
    </header>
  );
};
export default Header;
