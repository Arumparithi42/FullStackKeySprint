import { useNavigate } from 'react-router-dom';
import '../styles/pages/main.css';

export default function MainPage() {
  const navigate = useNavigate();

  return (
    <div className="card">
      <div className="landr">
        <button className="login" id="login" onClick={() => navigate('/login')}>
          Login
        </button>
        <p>Start TYPING by logging in!</p>
        <button className="register" id="register" onClick={() => navigate('/register')}>
          Register
        </button>
        <p>Start your TYPING adventure!</p>
      </div>
      <div className="num-det">
        <div className="num-det1">
          <p className="num">
            2<span className="num1">mil</span>
          </p>
          <p className="det">users</p>
        </div>
        <div className="num-det2">
          <p className="num">
            50<span className="num2">k</span>
          </p>
          <p className="det">words used</p>
        </div>
        <div className="num-det3">
          <p className="num">6</p>
          <p className="det">test types</p>
        </div>
      </div>
    </div>
  );
}
