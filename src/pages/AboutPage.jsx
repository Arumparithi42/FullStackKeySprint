import { Link } from 'react-router-dom';
import '../styles/pages/about.css';

export default function AboutPage() {
  return (
    <>
      <header className="header">
        <div className="logo-container">
          <img src="/assets/logo.png" alt="KeySprint Logo" className="logo" />
          <h1 className="website-name">KeySprint</h1>
        </div>
        <nav className="navigation">
          <ul>
            <li className="home-item">
              <img className="homepng" src="/assets/home.png" alt="Home" />
              <Link to="/home">Home</Link>
            </li>
            <li>
              <Link to="/contact">Contact</Link>
            </li>
          </ul>
        </nav>
      </header>

      <main>
        <section className="hero">
          <div className="container">
            <h2>About KeySprint</h2>
            <p>
              KeySprint is a typing practice platform built to help users improve speed, accuracy, and confidence through regular practice and
              real-time feedback.
            </p>
          </div>
        </section>

        <section className="about-content">
          <div className="container grid">
            <article className="card">
              <h3>Project Purpose</h3>
              <p>
                This project is created to make typing practice simple and engaging. Users can test their typing skills, monitor progress, and
                build better typing habits over time.
              </p>
            </article>

            <article className="card">
              <h3>How to Use KeySprint</h3>
              <ol>
                <li>Open the typing test from the home page.</li>
                <li>Type the displayed text carefully and continuously.</li>
                <li>Check your WPM and accuracy after each test.</li>
                <li>Repeat daily to improve consistency and speed.</li>
              </ol>
            </article>

            <article className="card">
              <h3>What You Get</h3>
              <ul>
                <li>Typing speed measurement in WPM</li>
                <li>Accuracy and mistake tracking</li>
                <li>Focused practice experience</li>
                <li>Progress-oriented learning support</li>
              </ul>
            </article>
          </div>
        </section>

        <section className="cta">
          <div className="container cta-box">
            <h3>Start Practicing Today</h3>
            <p>Spend a few minutes every day and see visible typing improvement.</p>
            <Link to="/typing" className="btn">
              Start Typing Test
            </Link>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="container footer-grid">
          <div className="footer-brand">
            <h4>KeySprint</h4>
            <p>Type faster. Compete smarter.</p>
          </div>
          <div className="footer-links">
            <Link to="/about">About</Link>
            <Link to="/contact">Contact</Link>
            <Link to="/terms">Terms &amp; Privacy</Link>
          </div>
          <div className="footer-copy">
            <p>&copy; 2026 KeySprint</p>
          </div>
        </div>
      </footer>
    </>
  );
}
