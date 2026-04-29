import { useEffect, useMemo, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../services/firebase';
import { saveTestResult } from '../services/auth';
import '../styles/pages/home.css';
import '../styles/pages/typing.css';

const defaultParagraph =
  'The quick brown fox jumps over the lazy dog, but great success never comes by chance alone. Focused practice, smart planning, and extreme dedication help you explore new ideas, fix complex problems, and achieve your goals. Every keystroke you type builds speed, accuracy, and confidence, making your journey exciting, joyful, and uniquely rewarding.';

function buildChars(text) {
  return text.split('').map((char, index) => ({
    id: `${index}-${char}`,
    char,
    status: 'pending',
  }));
}

export default function TypingPage() {
  const navigate = useNavigate();
  const inputRef = useRef(null);
  const hasSavedResultsRef = useRef(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [backendUid, setBackendUid] = useState(null);
  const [totalTime, setTotalTime] = useState(60);
  const [timeLeft, setTimeLeft] = useState(60);
  const [started, setStarted] = useState(false);
  const [text, setText] = useState(defaultParagraph);
  const [chars, setChars] = useState(() => buildChars(defaultParagraph));
  const [input, setInput] = useState('');

  useEffect(() => {
    // Get uid from localStorage (backend uid)
    const user = JSON.parse(localStorage.getItem('user'));
    if (user && user.uid) {
      setBackendUid(user.uid);
    }

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user || null);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (!started) {
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((previous) => {
        if (previous <= 1) {
          clearInterval(timer);
          setStarted(false);
          return 0;
        }
        return previous - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [started]);

  useEffect(() => {
    if (input.length >= chars.length && chars.length > 0) {
      setStarted(false);
    }
  }, [chars.length, input.length]);

  const correctChars = useMemo(() => chars.filter((char) => char.status === 'correct').length, [chars]);
  const totalTyped = input.length;
  const errors = Math.max(0, totalTyped - correctChars);
  const elapsedSec = totalTime - timeLeft;
  const minutes = Math.max(elapsedSec / 60, 1 / 60);
  const wpm = Math.round((correctChars / 5) / minutes);
  const accuracy = totalTyped > 0 ? Math.max(0, Math.round((correctChars / totalTyped) * 100)) : 0;

  const weakestLive = useMemo(() => {
    const stat = {};
    for (let index = 0; index < input.length; index += 1) {
      const expected = text[index]?.toLowerCase();
      if (!expected || !/[a-z]/.test(expected)) {
        continue;
      }
      if (!stat[expected]) {
        stat[expected] = { total: 0, wrong: 0 };
      }
      stat[expected].total += 1;
      if (input[index] !== text[index]) {
        stat[expected].wrong += 1;
      }
    }

    let maxRate = 0;
    let weakestLetter = null;
    Object.entries(stat).forEach(([letter, value]) => {
      if (value.total <= 0) {
        return;
      }
      const rate = value.wrong / value.total;
      if (rate > maxRate) {
        maxRate = rate;
        weakestLetter = letter;
      }
    });

    return weakestLetter ? `${weakestLetter} (${Math.round(maxRate * 100)}%)` : '-';
  }, [input, text]);

  const testEnded = !started && (timeLeft === 0 || (input.length >= chars.length && chars.length > 0));

  useEffect(() => {
    const saveResultsToBackend = async () => {
      if (!testEnded || !backendUid || hasSavedResultsRef.current) {
        console.log('Save skipped:', { testEnded, backendUid, alreadySaved: hasSavedResultsRef.current });
        return;
      }

      const weakestLetter = weakestLive === '-' ? 'None' : weakestLive.split(' ')[0];
      const testData = {
        wpm,
        accuracy,
        errors,
        weakestLetter,
        testDuration: totalTime,
      };

      console.log('Saving test result:', { uid: backendUid, testData });

      try {
        const result = await saveTestResult(backendUid, testData);
        console.log('Test result saved successfully:', result);
        hasSavedResultsRef.current = true;
      } catch (error) {
        console.error('Error saving results:', error);
      }
    };

    saveResultsToBackend();
  }, [accuracy, backendUid, errors, testEnded, totalTime, weakestLive, wpm]);

  const prepareText = (nextText) => {
    hasSavedResultsRef.current = false;
    setText(nextText);
    setChars(buildChars(nextText));
    setInput('');
    setTimeLeft(totalTime);
    setStarted(false);
    inputRef.current?.focus();
  };

  const restart = () => {
    prepareText(text);
  };

  const refresh = async () => {
    try {
      const response = await fetch('/para.json');
      const paragraphs = await response.json();
      if (Array.isArray(paragraphs) && paragraphs.length > 0) {
        const randomIndex = Math.floor(Math.random() * paragraphs.length);
        prepareText(paragraphs[randomIndex]);
      }
    } catch (error) {
      console.error('Error loading paragraphs:', error);
    }
  };

  const onInput = (nextInput) => {
    if (timeLeft === 0 || nextInput.length > chars.length) {
      return;
    }

    if (!started && nextInput.length > 0) {
      setStarted(true);
    }

    setInput(nextInput);
    setChars((previous) =>
      previous.map((char, index) => {
        if (nextInput[index] == null) {
          return { ...char, status: 'pending' };
        }
        return {
          ...char,
          status: nextInput[index] === char.char ? 'correct' : 'incorrect',
        };
      })
    );
  };

  const setDuration = (duration) => {
    setTotalTime(duration);
    setTimeLeft(duration);
    setStarted(false);
    setInput('');
    setChars(buildChars(text));
    inputRef.current?.focus();
  };

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
          </ul>
        </nav>
      </header>
      <main className="container">
        <div id="settings-bar" className="settings-bar">
          <div className="pill-group">
            <div className="group-label">Time</div>
            {[30, 60, 120].map((duration) => (
              <button key={duration} className={`pill time-btn ${totalTime === duration ? 'active' : ''}`} data-time={duration} onClick={() => setDuration(duration)}>
                {duration}s
              </button>
            ))}
          </div>
          <div className="settings-actions">
            <button id="restart" className="btn" onClick={restart}>
              Restart
            </button>
            <button id="refresh" className="btn" onClick={refresh}>
              Refresh
            </button>
          </div>
        </div>

        <section className="typing-area">
          <h2>Typing Practice</h2>

          <div id="text-display" className="text-display" tabIndex={0} onClick={() => inputRef.current?.focus()}>
            <div className="timer-badge">
              <span id="time">{timeLeft}</span>
            </div>
            <div id="typing-viewport" className="typing-viewport">
              <div id="typing-text">
                {chars.map((char, index) => (
                  <span
                    key={char.id}
                    className={`char ${char.char === ' ' ? 'space' : ''} ${char.status === 'correct' ? 'correct' : ''} ${char.status === 'incorrect' ? 'incorrect' : ''} ${
                      index === input.length && !testEnded ? 'current' : ''
                    }`}
                  >
                    {char.char}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <input
            ref={inputRef}
            id="hidden-input"
            type="text"
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="off"
            spellCheck={false}
            className="hidden-input"
            value={input}
            onChange={(e) => onInput(e.target.value)}
          />
        </section>

        <div id="results-cards" className={`stats live-stats ${testEnded ? '' : 'hidden'}`} aria-hidden={!testEnded}>
          <div className="stat-card">
            <div className="card-title">Speed (WPM)</div>
            <div className="card-value">
              <span id="wpm">{Number.isFinite(wpm) ? wpm : 0}</span>
            </div>
          </div>
          <div className="stat-card">
            <div className="card-title">Accuracy</div>
            <div className="card-value">
              <span id="accuracy">{accuracy}</span>%
            </div>
          </div>
          <div className="stat-card">
            <div className="card-title">Errors</div>
            <div className="card-value">
              <span id="errors">{errors}</span>
            </div>
          </div>
          <div className="stat-card">
            <div className="card-title">Weakest Letter</div>
            <div className="card-value">
              <span id="weakest-live">{weakestLive}</span>
            </div>
          </div>
        </div>
        <button className="back-btn" onClick={() => navigate('/home')}>
          Back
        </button>
      </main>
    </>
  );
}
