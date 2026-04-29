import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getUserProfile, getUserStats } from '../services/auth';
import '../styles/pages/profile.css';

export default function ProfilePage() {
  const navigate = useNavigate();
  const [profile, setProfile] = useState({
    username: 'Loading...',
    email: 'Loading...',
    phone: '',
    bio: '',
  });
  const [stats, setStats] = useState({
    wpm: 0,
    accuracy: 0,
    weakestLetter: '-',
  });
  const [averageStats, setAverageStats] = useState({
    averageWpm: 0,
    averageAccuracy: 0,
    mostFrequentWeakLetter: '-',
    totalTests: 0,
  });

  // Refresh profile and stats
  const refreshStats = async () => {
    try {
      const user = JSON.parse(localStorage.getItem('user'));
      if (!user || !user.uid) {
        setProfile({ username: 'Not signed in', email: '-', phone: '', bio: '' });
        setStats({ wpm: 0, accuracy: 0, weakestLetter: '-' });
        setAverageStats({ averageWpm: 0, averageAccuracy: 0, mostFrequentWeakLetter: '-', totalTests: 0 });
        return;
      }

      // Fetch user profile data
      const profileData = await getUserProfile(user.uid);
      setProfile({
        username: profileData.username || 'Unknown',
        email: profileData.email || '',
        phone: profileData.phone || '',
        bio: profileData.bio || '',
      });

      // Fetch stats
      try {
        const statsData = await getUserStats(user.uid);
        setStats({
          wpm: statsData.wpm || 0,
          accuracy: statsData.accuracy || 0,
          weakestLetter: statsData.weakestLetter || '-',
        });

        setAverageStats({
          averageWpm: statsData.averageWpm || 0,
          averageAccuracy: statsData.averageAccuracy || 0,
          mostFrequentWeakLetter: statsData.mostFrequentWeakLetter || '-',
          totalTests: statsData.totalTests || 0,
        });
      } catch {
        setStats({ wpm: 0, accuracy: 0, weakestLetter: '-' });
        setAverageStats({ averageWpm: 0, averageAccuracy: 0, mostFrequentWeakLetter: '-', totalTests: 0 });
      }
    } catch (error) {
      console.error('Error loading profile:', error);
      setProfile({ username: 'Error', email: '-', phone: '', bio: '' });
    }
  };

  useEffect(() => {
    refreshStats();
    // Refresh stats every 5 seconds to pick up updates from TypingPage
    const interval = setInterval(refreshStats, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <header className="header">
        <div className="logo-container">
          <img src="/assets/logo.png" alt="KeySprint Logo" className="logo" />
          <h1 className="website-name">KeySprint</h1>
        </div>
        <nav className="navigation">
          <ul>
            <img className="homepng" src="/assets/home.png" alt="Home" />
            <li style={{ marginLeft: 0, padding: 0 }}>
              <Link to="/home">Home</Link>
            </li>
          </ul>
        </nav>
      </header>

      <main className="profile-page">
        <div className="profile-card">
          <div className="profile-header">
            <h1>Profile</h1>
            <Link to="/edit-profile" className="edit-btn">
              Edit Profile
            </Link>
          </div>

          <hr />

          <div className="section">
            <h3>User Information</h3>

            <div className="user-details">
              <p>
                <strong>Username:</strong> <span id="username">{profile.username}</span>
              </p>
              <p>
                <strong>Email:</strong> <span id="email">{profile.email}</span>
              </p>
              {profile.phone ? (
                <p id="phoneRow">
                  <strong>Mobile:</strong> <span id="phone">{profile.phone}</span>
                </p>
              ) : null}
              {profile.bio ? (
                <p id="bioRow">
                  <strong>Bio:</strong>{' '}
                  <span id="bio" style={{ fontStyle: 'italic' }}>
                    {profile.bio}
                  </span>
                </p>
              ) : null}
            </div>
          </div>

          <div className="section">
            <h3>Performance - Latest Test</h3>

            <div className="stats-container">
              <div className="stat-circle wpm">
                <div className="inner-circle">
                  <span className="stat-value">{stats.wpm}</span>
                  <span className="stat-label">WPM</span>
                </div>
              </div>

              <div className="stat-circle accuracy">
                <div className="inner-circle">
                  <span className="stat-value">{stats.accuracy}%</span>
                  <span className="stat-label">Accuracy</span>
                </div>
              </div>
            </div>

            <div className="weak-letter-section">
              <p>
                <strong>Weakest Letter:</strong> <span id="weakestLetter">{stats.weakestLetter}</span>
              </p>
            </div>
          </div>

          <div className="section">
            <h3>Performance - Overall Average</h3>
            <p style={{ marginBottom: '15px', color: '#666', fontSize: '14px' }}>
              Based on {averageStats.totalTests} {averageStats.totalTests === 1 ? 'test' : 'tests'}
            </p>

            <div className="stats-container">
              <div className="stat-circle wpm">
                <div className="inner-circle">
                  <span className="stat-value">{averageStats.averageWpm}</span>
                  <span className="stat-label">Avg WPM</span>
                </div>
              </div>

              <div className="stat-circle accuracy">
                <div className="inner-circle">
                  <span className="stat-value">{averageStats.averageAccuracy}%</span>
                  <span className="stat-label">Avg Accuracy</span>
                </div>
              </div>
            </div>

            <div className="weak-letter-section">
              <p>
                <strong>Most Frequent Weak Letter:</strong> <span id="mostFrequentWeakLetter">{averageStats.mostFrequentWeakLetter}</span>
              </p>
            </div>
          </div>

          <div className="section">
            <h3>Bio</h3>

            <p className="bio-text">Keyboard enthusiast. Practicing daily to hit 100 WPM!</p>
          </div>
          <button className="back-btn" onClick={() => navigate('/home')}>
            Back
          </button>
        </div>
      </main>
    </>
  );
}
