import {useLocation} from "react-router-dom";

import Navigation from "./Navigation";

const Header = () => {
  const location = useLocation();
  const isDetailsPage = location.pathname.startsWith("/movie/");

  return (
    <header>
      <Navigation />
      <img
        src="/hero.png"
        alt="Hero Banner"
        width={512}
        height={476}
        loading="lazy"
        className={isDetailsPage ? "hidden" : ""}
      />
    </header>
  );
};

export default Header;
