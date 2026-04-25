import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { loginUser } from '../services/auth';
import '../styles/pages/login.css';

export default function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [registrationSuccess] = useState(() => {
    const hasSuccess = localStorage.getItem('registrationSuccess') === 'true';
    if (hasSuccess) {
      localStorage.removeItem('registrationSuccess');
    }
    return hasSuccess;
  });

  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      await loginUser({ email, password });
      navigate('/home');
    } catch {
      alert('Invalid email or password');
    }
  };

  return (
    <>
      <header className="top-bar">
        <div className="logo-container">
          <img src="/assets/logo.png" alt="KeySprint Logo" className="logo" />
          <h2>KEYSPRINT</h2>
        </div>
      </header>

      <div className="form-wrapper">
        <div className="container">
          {registrationSuccess ? (
            <div id="successMessage" className="success-message">
              <p>✓ Registration successful! Please log in with your credentials.</p>
            </div>
          ) : null}

          <form onSubmit={onSubmit}>
            <h1>Login</h1>
            <p>Welcome back to Keysprint</p>

            <label>Email</label>
            <input type="email" id="email" placeholder="Enter Email" value={email} onChange={(e) => setEmail(e.target.value)} required />

            <label>Password</label>
            <input type="password" id="password" placeholder="Enter Password" value={password} onChange={(e) => setPassword(e.target.value)} required />

            <div className="login-options">
              <label className="checkbox">
                <input type="checkbox" />
                <span className="checkmark"></span>
                Remember me
              </label>

              <a href="#" className="forgot-link">
                Forgot Password?
              </a>
            </div>

            <button type="submit" className="registerbtn">
              Login
            </button>

            <p className="signin-link">
              Don&apos;t have an account? <Link to="/register">Register</Link>
            </p>
            <button type="button" className="back-btn" onClick={() => navigate('/main')}>
              Back
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
