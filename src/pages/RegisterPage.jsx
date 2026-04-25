import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { registerUser } from '../services/auth';
import '../styles/pages/register.css';

export default function RegisterPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    username: '',
    email: '',
    password: '',
    repeatPassword: '',
  });

  const onChange = (key, value) => {
    setForm((previous) => ({ ...previous, [key]: value }));
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      await registerUser(form);
      localStorage.setItem('registrationSuccess', 'true');
      alert('Registration successful!');
      navigate('/login');
    } catch (error) {
      alert(error.message || 'Registration failed');
    }
  };

  return (
    <>
      <header className="header">
        <div className="logo-container">
          <img src="/assets/logo.png" alt="KeySprint Logo" className="logo" />
          <h1 className="website-name">KeySprint</h1>
        </div>
      </header>

      <div className="form-wrapper">
        <div className="container">
          <form onSubmit={onSubmit} id="regForm">
            <h1>Register</h1>
            <p>Create your Keysprint account</p>

            <label>Username</label>
            <input type="text" placeholder="Enter Username" id="username" value={form.username} onChange={(e) => onChange('username', e.target.value)} required />

            <label>Email</label>
            <input type="email" placeholder="Enter Email" id="email" value={form.email} onChange={(e) => onChange('email', e.target.value)} required />

            <label>Password</label>
            <input type="password" placeholder="Min 8 chars" id="password" value={form.password} onChange={(e) => onChange('password', e.target.value)} required />

            <label>Repeat Password</label>
            <input
              type="password"
              placeholder="Repeat Password"
              id="psw-repeat"
              value={form.repeatPassword}
              onChange={(e) => onChange('repeatPassword', e.target.value)}
              required
            />

            <p className="terms">
              By registering you agree to our <Link to="/terms">Terms</Link>
            </p>

            <button type="submit" className="registerbtn">
              Register
            </button>

            <p className="signin-link">
              Already have an account? <Link to="/login">Sign in</Link>
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
