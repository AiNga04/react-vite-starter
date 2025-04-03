import "./NotFound404.scss";

const NotFound404 = () => {
  return (
    <section className="not-found-container">
      <div className="not-found-content">
        <div className="error-animation">
          <h1 className="error-code">404</h1>
        </div>

        <div className="error-message">
          <h2>Looks like you're lost</h2>
          <p>The page you are looking for is not available!</p>
          <a href="/" className="home-link">
            Go to Home
          </a>
        </div>
      </div>
    </section>
  );
};

export default NotFound404;
