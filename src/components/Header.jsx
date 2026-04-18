import {useLocation} from "react-router-dom";

import Navigation from "./Navigation";

const Header = () => {
  const location = useLocation();
  const isDetailsPage = location.pathname.startsWith("/movie/");

  return (
    <header>
      <Navigation />
      <img
        className={isDetailsPage ? "hidden" : ""}
        src="/hero.png"
        alt="Hero Banner"
        width={512}
        height={285}
        loading="eager"
        fetchPriority="high"
      />
    </header>
  );
};

export default Header;
