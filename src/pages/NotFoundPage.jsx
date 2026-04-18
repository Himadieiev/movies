import {Link} from "react-router-dom";

const NotFoundPage = () => {
  return (
    <div className="not-found-wrapper">
      <h1 className="text-gradient mb-5">404</h1>
      <h2>Page Not Found</h2>
      <p>The page you are looking for doesn't exist or has been moved.</p>
      <Link className="not-found-link" to="/">
        Go Back Home
      </Link>
    </div>
  );
};

export default NotFoundPage;
