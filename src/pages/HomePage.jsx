import { Link } from 'react-router-dom';
import '../styles/pages/home.css';

export default function HomePage() {
  return (
    <>
      <header className="header">
        <div className="logo-container">
          <img src="/assets/logo.png" alt="KeySprint Logo" className="logo" />
          <h1 className="website-name">KeySprint</h1>
        </div>
        <nav className="navigation">
          <ul>
            <li className="profile-item">
              <img src="/assets/profile.png" alt="Profile" className="profile-icon" />
              <Link to="/profile">Profile</Link>
            </li>
            <li>
              <Link to="/main">Logout</Link>
            </li>
          </ul>
        </nav>
      </header>

      <section className="hero">
        <div className="container hero-content">
          <h2>Improve Your Typing Speed</h2>
          <p>Practice, track progress, and compete with others</p>
          <Link to="/typing" className="btn primary">
            Start Typing Test
          </Link>
        </div>
      </section>

      <section className="features">
        <div className="container features-grid">
          <div className="feature">
            <h3>Leaderboard</h3>
            <p>Compete with others and climb the ranks.</p>
          </div>
          <div className="feature">
            <h3>Speed (WPM)</h3>
            <p>Measure how fast you type in words per minute.</p>
          </div>
          <div className="feature">
            <h3>Accuracy</h3>
            <p>Track your mistake rate and improve precision.</p>
          </div>
          <div className="feature">
            <h3>Progress Tracking</h3>
            <p>View your improvement over time with simple charts.</p>
          </div>
          <div className="feature">
            <h3>Custom Practice Modes</h3>
            <p>Choose time, word count, or difficulty to match your practice style.</p>
          </div>
          <div className="feature">
            <h3>Real-Time Feedback</h3>
            <p>Get instant visual feedback on correct and incorrect keystrokes.</p>
          </div>
        </div>
      </section>

      <section className="how-it-works">
        <div className="container">
          <h3>How It Works</h3>
          <ol>
            <li>Start a typing test</li>
            <li>Type the shown text</li>
            <li>Get speed &amp; accuracy results</li>
            <li>Practice daily to improve</li>
          </ol>
        </div>
      </section>

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
