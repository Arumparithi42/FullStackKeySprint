import { useEffect, useMemo, useState } from 'react';
import '../styles/pages/additional-accuracy.css';

const quotes = [
  'Practice typing every day to improve your speed and accuracy.',
  'Keysprint helps you build muscle memory for common words.',
  'Stay relaxed, look at the screen, and trust your fingers.',
  'Typing fast is useful, but accuracy is even more important.',
];

export default function AdditionalAccuracyPage() {
  const [currentQuote, setCurrentQuote] = useState('');
  const [input, setInput] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const [startTime, setStartTime] = useState(null);
  const [elapsed, setElapsed] = useState(0);

  useEffect(() => {
    if (!isRunning || !startTime) {
      return;
    }

    const timer = setInterval(() => {
      setElapsed(Math.floor((Date.now() - startTime) / 1000));
    }, 1000);

    return () => clearInterval(timer);
  }, [isRunning, startTime]);

  const totalTyped = input.length;
  const totalErrors = useMemo(() => {
    let errors = 0;
    for (let i = 0; i < totalTyped; i += 1) {
      if (input[i] !== currentQuote[i]) {
        errors += 1;
      }
    }
    return errors;
  }, [currentQuote, input, totalTyped]);

  const correctChars = Math.max(0, totalTyped - totalErrors);
  const accuracy = totalTyped === 0 ? 100 : Math.round((correctChars / totalTyped) * 100);
  const seconds = Math.max(1, elapsed);
  const wpm = Math.round((correctChars / 5) / (seconds / 60));

  const startTest = () => {
    const index = Math.floor(Math.random() * quotes.length);
    setCurrentQuote(quotes[index]);
    setInput('');
    setElapsed(0);
    setStartTime(Date.now());
    setIsRunning(true);
  };

  const resetTest = () => {
    setCurrentQuote('');
    setInput('');
    setElapsed(0);
    setStartTime(null);
    setIsRunning(false);
  };

  useEffect(() => {
    if (isRunning && currentQuote && input.length >= currentQuote.length) {
      setIsRunning(false);
    }
  }, [currentQuote, input.length, isRunning]);

  return (
    <>
      <header className="top-bar">
        <div className="logo-container">
          <img src="/assets/logo.png" alt="KeySprint Logo" className="logo" />
          <h2>KEYSPRINT</h2>
        </div>
        <button className="close-btn" onClick={() => window.history.back()}>
          Close
        </button>
      </header>

      <main className="typing-wrapper">
        <section className="typing-card">
          <div className="typing-header">
            <h1>Typing Practice</h1>
            <p>Type the text below as fast and accurately as you can.</p>
          </div>

          <div id="quote" className="quote">
            {currentQuote.split('').map((char, index) => {
              let className = '';
              if (input[index] != null) {
                className = input[index] === char ? 'correct' : 'incorrect';
              }
              return (
                <span key={`${char}-${index}`} className={className}>
                  {char}
                </span>
              );
            })}
          </div>

          <input
            id="hidden-input"
            type="text"
            autoComplete="off"
            value={input}
            onChange={(e) => {
              if (!isRunning) {
                return;
              }
              setInput(e.target.value);
            }}
          />

          <div className="input-display" id="input-display">
            {input.length ? input : 'Click START button to begin test'}
          </div>

          <div className="stats">
            <div className="stat">
              <span className="label">Time</span>
              <span className="value">
                <span id="time">{elapsed}</span>s
              </span>
            </div>
            <div className="stat">
              <span className="label">WPM</span>
              <span className="value" id="wpm">
                {Number.isFinite(wpm) ? wpm : 0}
              </span>
            </div>
            <div className="stat">
              <span className="label">Accuracy</span>
              <span className="value">
                <span id="accuracy">{accuracy}</span>%
              </span>
            </div>
            <div className="stat">
              <span className="label">Errors</span>
              <span className="value" id="errors">
                {totalErrors}
              </span>
            </div>
          </div>

          <div className="controls">
            <button id="start-btn" className="primary-btn" onClick={startTest} disabled={isRunning}>
              Start
            </button>
            <button id="reset-btn" className="secondary-btn" onClick={resetTest}>
              Reset
            </button>
          </div>
        </section>
      </main>
    </>
  );
}
