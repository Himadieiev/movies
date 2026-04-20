import {NavLink, useLocation, useNavigate} from "react-router-dom";

const Navigation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const isDetailsPage = location.pathname.startsWith("/movie/");

  const getActiveText = () => {
    const path = location.pathname;
    if (path === "/") return "Home";
    if (path === "/favorites") return "Favorites";
    if (path === "/unwatched") return "Unwatched";
    if (path === "/trending") return "Trending";
    if (path === "/upcoming") return "Upcoming";
    if (path.startsWith("/movie/")) return "Movie Details";

    return "";
  };

  return (
    <div className="nav-wrapper">
      <nav className="nav">
        {isDetailsPage && (
          <button onClick={() => navigate(-1)} className="back-button">
            <svg
              className="back-arrow"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            <span>Back</span>
          </button>
        )}

        <NavLink
          to="/"
          data-tooltip="Home"
          className={({isActive}) => `nav-link ${isActive ? "active" : ""}`}
          end
        >
          <svg
            viewBox="0 0 26 26"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="home-icon"
          >
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2h-5v-8H7v8H5a2 2 0 0 1-2-2z" />
          </svg>
          <span>Home</span>
        </NavLink>
        <NavLink to="/favorites" className={({isActive}) => `nav-link ${isActive ? "active" : ""}`}>
          <svg
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 615.433 615.433"
            fill="currentColor"
            stroke="currentColor"
            strokeWidth="15"
            className="favorite-icon"
          >
            <g>
              <path
                d="M253.193,573.177c12.128,10.043,23.367,19,33.493,26.733c6.092,4.674,10.488,7.929,12.88,9.653l8.151,5.869l8.123-5.869
		c2.393-1.725,6.787-4.979,12.88-9.653c10.126-7.761,21.364-16.719,33.493-26.733c34.605-28.652,69.239-60.31,101.563-94.025
		c72.217-75.304,122.734-149.912,141.762-220.766c5.396-20.057,8.179-39.613,8.179-58.641
		c0-188.913-172.473-269.697-306.139-127.352C174.412-69.98,1.716,15.812,1.716,199.745c0,19.028,2.782,38.612,8.151,58.641
		c19.027,70.854,69.518,145.434,141.761,220.766C183.981,512.867,218.587,544.496,253.193,573.177z M29.535,199.745
		c0-164.489,150.969-235.23,267.555-97.308l10.626,12.546l10.627-12.574c116.586-137.895,267.555-67.181,267.555,97.336
		c0,16.496-2.448,33.66-7.205,51.436c-17.553,65.374-65.679,136.476-134.974,208.72c-31.546,32.909-65.4,63.843-99.255,91.855
		c-11.823,9.792-36.748,30.183-36.748,30.183s-29.626-24.285-36.775-30.21c-33.855-28.041-67.682-58.975-99.255-91.856
		C102.418,387.63,54.292,316.554,36.711,251.153C31.982,233.377,29.535,216.241,29.535,199.745z"
              />
            </g>
          </svg>
          <span>Favorites</span>
        </NavLink>
        <NavLink to="/unwatched" className={({isActive}) => `nav-link ${isActive ? "active" : ""}`}>
          <svg
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 497.301 497.301"
            fill="currentColor"
            stroke="currentColor"
            strokeWidth="15"
            className="unwatched-icon"
          >
            <g>
              <path
                d="M97.5,342.351C30.6,302.15,0,248.65,0,248.65s76.5-133.9,248.6-133.9c24.9,0,47.8,1.9,68.8,7.6l-15.301,15.3
		c-17.199-1.9-34.4-3.8-53.5-3.8c-153,0-225.7,114.8-225.7,114.8s28.7,45.9,88,80.3L97.5,342.351z M172.1,248.65
		c0,5.7,0,11.5,1.9,17.2l17.2-17.2c0-15.3,5.7-28.7,17.2-40.2s26.8-17.2,40.2-17.2l17.201-17.2c-5.701-1.9-11.5-1.9-17.201-1.9
		C206.5,172.15,172.1,206.55,172.1,248.65z M399.699,154.95l-13.398,13.4c59.299,34.4,88,80.3,88,80.3S401.6,363.45,248.6,363.45
		c-19.1,0-36.3-1.899-53.5-3.8l-15.3,15.3c21,5.7,44,7.601,68.9,7.601c172.101,0,248.601-133.9,248.601-133.9
		S466.6,195.15,399.699,154.95z M401.4,76.95L76.9,401.45l18.9,18.9l324.6-324.6L401.4,76.95z M288.801,288.851
		c-11.5,11.5-24.9,17.2-40.201,17.2l-17.2,17.199c5.7,1.9,11.5,1.9,17.2,1.9c42.099,0,76.5-34.4,76.5-76.5c0-5.7,0-11.5-1.9-17.2
		L306,248.65C306,263.95,300.199,277.351,288.801,288.851z"
              />
            </g>
          </svg>
          <span>Unwatched</span>
        </NavLink>
        <NavLink to="/trending" className={({isActive}) => `nav-link ${isActive ? "active" : ""}`}>
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="trending-icon"
          >
            <path d="M16.5 9.5L12.3 13.7L10.7 11.3L7.5 14.5" />
            <path d="M14.5 9.5H16.5V11.5" />
            <path d="M9 22H15C20 22 22 20 22 15V9C22 4 20 2 15 2H9C4 2 2 4 2 9V15C2 20 4 22 9 22Z" />
          </svg>

          <span>Trending</span>
        </NavLink>
        <NavLink
          to="/upcoming"
          data-tooltip="Upcoming"
          className={({isActive}) => `nav-link ${isActive ? "active" : ""}`}
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="upcoming-icon"
          >
            <circle cx="12" cy="12" r="10" />
            <polyline points="12 6 12 12 16 14" />
          </svg>
          <span>Upcoming</span>
        </NavLink>
      </nav>

      <div className="nav-active-text">{getActiveText()}</div>
    </div>
  );
};

export default Navigation;
