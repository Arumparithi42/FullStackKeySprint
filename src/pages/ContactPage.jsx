import { Link } from 'react-router-dom';
import '../styles/pages/contact.css';

export default function ContactPage() {
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
            <li className="profile-item">
              <img src="/assets/profile.png" alt="Profile" className="profile-icon" />
              <Link to="/profile">Profile</Link>
            </li>
          </ul>
        </nav>
      </header>

      <main className="contact-page">
        <section className="container contact-card">
          <h2>Project Team Contacts</h2>
          <p className="subtitle">
            Students of Anna University, Madras Institute of Technology (MIT) Campus
            <br />
            Computer Science Engineering, 2nd Year
          </p>
          <Link to="/home" className="back-home-btn">
            <img src="/assets/home.png" alt="Home" style={{ width: '16px', height: '16px', verticalAlign: 'middle', marginRight: '6px' }} />
            Back to Home
          </Link>

          <ul className="team-list">
            <li>
              <span className="name">Arumparithi B</span>
              <span className="detail">Phone: 7397158733</span>
            </li>
            <li>
              <span className="name">Keerthivasn B</span>
              <span className="detail">Phone: 9345000599</span>
            </li>
            <li>
              <span className="name">Marish Dhanush K</span>
              <span className="detail">Phone: 9342866619</span>
            </li>
            <li>
              <span className="name">Phaneendra V</span>
              <span className="detail">Phone: 8056442189</span>
            </li>
            <li>
              <span className="name">Sivaraman G</span>
              <span className="detail">Phone: 6383944692</span>
            </li>
          </ul>
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
