import {NavLink} from "react-router-dom";

const Navigation = () => {
  return (
    <nav className="nav">
      <NavLink to="/" className={({isActive}) => `nav-link ${isActive ? "active" : ""}`} end>
        Home
      </NavLink>
      <NavLink to="/favorites" className={({isActive}) => `nav-link ${isActive ? "active" : ""}`}>
        Favorites
      </NavLink>
    </nav>
  );
};

export default Navigation;
