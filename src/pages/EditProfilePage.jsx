import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUserProfile, getUserStats, updateUserProfile, updateUserPassword } from '../services/auth';
import '../styles/pages/edit-profile.css';

export default function EditProfilePage() {
  const navigate = useNavigate();
  const [fields, setFields] = useState({
    username: '',
    email: '',
    phone: '',
    location: '',
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
  const [editedFields, setEditedFields] = useState(new Set());
  const [popup, setPopup] = useState({ open: false, title: '', field: '', type: 'text', value: '' });
  const [passwordOpen, setPasswordOpen] = useState(false);
  const [passwordForm, setPasswordForm] = useState({ oldPassword: '', newPassword: '', confirmPassword: '' });
  const [passwordError, setPasswordError] = useState('');
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const user = JSON.parse(localStorage.getItem('user'));
        if (!user || !user.uid) {
          navigate('/login');
          return;
        }

        setUserId(user.uid);

        // Fetch user profile data
        const profileData = await getUserProfile(user.uid);
        setFields({
          username: profileData.username || '',
          email: profileData.email || '',
          phone: profileData.phone || '',
          location: profileData.location || '',
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
            mostFrequentWeakLetter: statsData.weakestLetter || '-',
            totalTests: statsData.totalTests || 0,
          });
        } catch {
          setStats({ wpm: 0, accuracy: 0, weakestLetter: '-' });
          setAverageStats({ averageWpm: 0, averageAccuracy: 0, mostFrequentWeakLetter: '-', totalTests: 0 });
        }
      } catch (error) {
        console.error('Error loading profile:', error);
        navigate('/login');
      }
    };

    loadProfile();
  }, [navigate]);

  useEffect(() => {
    const onBeforeUnload = (event) => {
      if (editedFields.size > 0) {
        event.preventDefault();
      }
    };

    window.addEventListener('beforeunload', onBeforeUnload);
    return () => window.removeEventListener('beforeunload', onBeforeUnload);
  }, [editedFields]);

  const bioCount = useMemo(() => popup.value.length, [popup.value]);

  const openPopup = (title, field, type) => {
    setPopup({ open: true, title: `Edit ${title}`, field, type, value: fields[field] || '' });
  };

  const applyChange = () => {
    setFields((previous) => ({ ...previous, [popup.field]: popup.value }));
    setEditedFields((previous) => new Set(previous).add(popup.field));
    setPopup({ open: false, title: '', field: '', type: 'text', value: '' });
  };

  const closePopup = () => {
    setPopup({ open: false, title: '', field: '', type: 'text', value: '' });
  };

  const exitWithoutSave = () => {
    if (editedFields.size > 0) {
      const shouldExit = window.confirm('Exit without saving changes?');
      if (!shouldExit) {
        return;
      }
    }
    navigate(-1);
  };

  const openPasswordPopup = () => {
    setPasswordOpen(true);
    setPasswordError('');
    setPasswordForm({ oldPassword: '', newPassword: '', confirmPassword: '' });
  };

  const closePasswordPopup = () => {
    setPasswordOpen(false);
    setPasswordError('');
  };

  const updatePassword = async () => {
    if (!passwordForm.oldPassword || !passwordForm.newPassword || !passwordForm.confirmPassword) {
      setPasswordError('All fields are required.');
      return;
    }

    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      setPasswordError('New passwords do not match.');
      return;
    }

    if (passwordForm.newPassword.length < 8) {
      setPasswordError('Password must be at least 8 characters.');
      return;
    }

    if (!userId) {
      alert('No user ID found.');
      return;
    }

    try {
      await updateUserPassword(userId, passwordForm.oldPassword, passwordForm.newPassword);
      setEditedFields((previous) => new Set(previous).add('password'));
      alert('Password updated successfully!');
      closePasswordPopup();
    } catch (error) {
      setPasswordError(error.message || 'Failed to update password.');
    }
  };

  const saveChanges = async () => {
    if (!userId) {
      alert('No user ID found');
      return;
    }

    try {
      const updates = {
        username: fields.username.trim(),
        email: fields.email.trim(),
      };

      if (editedFields.has('phone')) {
        updates.phone = fields.phone.trim();
      }

      if (editedFields.has('location')) {
        updates.location = fields.location.trim();
      }

      if (editedFields.has('bio')) {
        updates.bio = fields.bio.trim();
      }

      await updateUserProfile(userId, updates);

      alert('Profile updated successfully');
      setEditedFields(new Set());
    } catch (error) {
      alert(error.message || 'Update failed');
    }
  };

  return (
    <div style={{ backgroundColor: 'rgb(195,227,236)' }}>
      <header className="top-bar">
        <div className="logo-container">
          <img src="/assets/logo.png" alt="KeySprint Logo" className="logo" />
          <h2>KEYSPRINT</h2>
        </div>
        <div className="top-actions">
          <img className="homepng" src="/assets/home.png" alt="Home" />
          <button type="button" className="home-btn" onClick={() => navigate('/home')}>
            Home
          </button>
          <button className="close-btn" onClick={exitWithoutSave}>
            Close
          </button>
        </div>
      </header>

      <main className="content">
        <section className="profile-section">
          <h2 className="page-title">Edit Profile</h2>

          <div className="section-header">
            <h3>Profile Information</h3>
            <p>Update your personal details and keep your profile up to date.</p>
          </div>

          <div className="field">
            <label>Username</label>
            <span id="username">{fields.username}</span>
            <button onClick={() => openPopup('Username', 'username', 'text')}>Edit</button>
          </div>

          <div className="field">
            <label>Email</label>
            <span id="email">{fields.email}</span>
            <button onClick={() => openPopup('Email', 'email', 'text')}>Edit</button>
          </div>

          <div className="field">
            <label>Phone</label>
            <span id="phone">{fields.phone}</span>
            <button onClick={() => openPopup('Phone', 'phone', 'text')}>Edit</button>
          </div>

          <div className="field">
            <label>Location</label>
            <span id="location">{fields.location}</span>
            <button onClick={() => openPopup('Location', 'location', 'text')}>Edit</button>
          </div>

          <div className="field">
            <label>Bio</label>
            <span id="bio">{fields.bio}</span>
            <button onClick={() => openPopup('Bio', 'bio', 'textarea')}>Edit</button>
          </div>

          <div className="field">
            <label>Password</label>
            <span id="password">••••••••</span>
            <button onClick={openPasswordPopup}>Change</button>
          </div>

          <div className="section-header">
            <h3>Performance Stats - Latest Test</h3>
            <p>Your most recent typing test performance.</p>
          </div>

          <div className="field">
            <label>WPM (Words Per Minute)</label>
            <span id="wpm">{stats.wpm}</span>
          </div>

          <div className="field">
            <label>Accuracy</label>
            <span id="accuracy">{stats.accuracy}%</span>
          </div>

          <div className="field">
            <label>Weakest Letter</label>
            <span id="weakestLetter">{stats.weakestLetter}</span>
          </div>

          <div className="section-header">
            <h3>Performance Stats - Overall Average</h3>
            <p>Your average performance across all {averageStats.totalTests} {averageStats.totalTests === 1 ? 'test' : 'tests'}.</p>
          </div>

          <div className="field">
            <label>Average WPM</label>
            <span id="averageWpm">{averageStats.averageWpm}</span>
          </div>

          <div className="field">
            <label>Average Accuracy</label>
            <span id="averageAccuracy">{averageStats.averageAccuracy}%</span>
          </div>

          <div className="field">
            <label>Most Frequent Weak Letter</label>
            <span id="mostFrequentWeakLetter">{averageStats.mostFrequentWeakLetter}</span>
          </div>

          <div className="save-area">
            <button className="save-btn" onClick={saveChanges}>
              Save Changes
            </button>
          </div>
        </section>
      </main>

      {popup.open ? (
        <div className="overlay" style={{ display: 'flex' }}>
          <div className="popup">
            <h3>{popup.title}</h3>

            {popup.type === 'textarea' ? (
              <>
                <textarea id="popupTextarea" maxLength={250} value={popup.value} onChange={(e) => setPopup((previous) => ({ ...previous, value: e.target.value }))} />
                <small id="bioCount">{bioCount} / 250</small>
              </>
            ) : (
              <input type="text" id="popupInput" value={popup.value} onChange={(e) => setPopup((previous) => ({ ...previous, value: e.target.value }))} />
            )}

            <div className="popup-actions">
              <button onClick={applyChange}>Update</button>
              <button className="cancel" onClick={closePopup}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      ) : null}

      {passwordOpen ? (
        <div className="overlay" style={{ display: 'flex' }}>
          <div className="popup">
            <h3>Change Password</h3>

            <input
              type="password"
              id="oldPassword"
              placeholder="Enter old password"
              value={passwordForm.oldPassword}
              onChange={(e) => setPasswordForm((previous) => ({ ...previous, oldPassword: e.target.value }))}
            />
            <input
              type="password"
              id="newPassword"
              placeholder="Enter new password"
              value={passwordForm.newPassword}
              onChange={(e) => setPasswordForm((previous) => ({ ...previous, newPassword: e.target.value }))}
            />
            <input
              type="password"
              id="confirmPassword"
              placeholder="Re-enter new password"
              value={passwordForm.confirmPassword}
              onChange={(e) => setPasswordForm((previous) => ({ ...previous, confirmPassword: e.target.value }))}
            />
            {passwordError ? <small id="passwordError" style={{ color: '#ef4444', marginTop: '8px' }}>{passwordError}</small> : null}

            <div className="popup-actions">
              <button onClick={updatePassword}>Update</button>
              <button className="cancel" onClick={closePasswordPopup}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
