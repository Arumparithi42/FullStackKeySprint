import { Link } from 'react-router-dom';
import '../styles/pages/terms.css';

export default function TermsPage() {
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
              <Link to="/about">About</Link>
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
            <h2>Terms &amp; Privacy Policy</h2>
            <p>Effective Date: 18 February 2026</p>
          </div>
        </section>

        <section className="policy-section">
          <div className="container policy-grid">
            <article className="policy-card">
              <h3>1. Usage Rules</h3>
              <ul>
                <li>Use KeySprint only for legal and educational typing practice purposes.</li>
                <li>Do not misuse the platform by attempting unauthorized access or harmful activity.</li>
                <li>Do not submit abusive, offensive, or misleading content in profile fields.</li>
                <li>Respect fair usage so all users can access the platform smoothly.</li>
              </ul>
            </article>

            <article className="policy-card">
              <h3>2. Authentication &amp; Account Details</h3>
              <ul>
                <li>Users must provide true and accurate details during registration and profile updates.</li>
                <li>Email and password are used for secure authentication through Firebase Auth.</li>
                <li>Users are responsible for maintaining password confidentiality.</li>
                <li>If suspicious activity is detected, users should reset credentials immediately.</li>
              </ul>
            </article>

            <article className="policy-card">
              <h3>3. Data We Store</h3>
              <ul>
                <li>Account details: username, email, and optional profile data (phone, location, bio).</li>
                <li>Typing-related data required for performance display and improvement tracking.</li>
                <li>Authentication is handled securely using Firebase services integrated in this project.</li>
              </ul>
            </article>

            <article className="policy-card">
              <h3>4. Privacy Commitments</h3>
              <ul>
                <li>Personal details are used only for account functionality and user experience.</li>
                <li>We do not intentionally expose private account details publicly.</li>
                <li>Users can request correction of incorrect profile information by updating their account.</li>
              </ul>
            </article>

            <article className="policy-card full-width">
              <h3>5. Project Team Contact Details</h3>
              <p>The following student team details are maintained as provided:</p>
              <ul>
                <li>Arumparithi B - 7397158733</li>
                <li>Keerthivasn B - 9345000599</li>
                <li>Marish Dhanush K - 9342866619</li>
                <li>Phaneendra V - 8056442189</li>
                <li>Sivaraman G - 6383944692</li>
              </ul>
              <p className="team-note">Students of Anna University, Madras Institute of Technology (MIT) Campus, Computer Science Engineering, 2nd Year.</p>
            </article>
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
