import { useEffect, useMemo, useRef, useState } from 'react';
import '../styles/pages/additional-type.css';

const paragraph =
  'Success does not happen overnight; it grows from small efforts repeated every day with discipline and focus. When challenges appear, consistency and patience turn obstacles into learning opportunities. Keep practicing without fear of mistakes, because improvement is the reward of persistence.';

export default function AdditionalTypePage() {
  const inputRef = useRef(null);
  const [value, setValue] = useState('');
  const [startTime, setStartTime] = useState(null);
  const [isComplete, setIsComplete] = useState(false);
  const [elapsed, setElapsed] = useState(0);

  useEffect(() => {
    if (!startTime || isComplete) {
      return;
    }

    const timer = setInterval(() => {
      setElapsed((Date.now() - startTime) / 1000);
    }, 100);

    return () => clearInterval(timer);
  }, [startTime, isComplete]);

  const typedLength = value.length;
  const correctness = useMemo(() => {
    let correct = 0;
    const wrongByLetter = {};

    for (let index = 0; index < typedLength; index += 1) {
      if (value[index] === paragraph[index]) {
        correct += 1;
      } else {
        const letter = paragraph[index] || '';
        if (letter) {
          wrongByLetter[letter] = (wrongByLetter[letter] || 0) + 1;
        }
      }
    }

    return { correct, wrongByLetter };
  }, [typedLength, value]);

  const accuracy = typedLength === 0 ? 0 : Math.round((correctness.correct / typedLength) * 100);
  const finalSeconds = Math.max(Math.floor(elapsed), 0);
  const minutes = Math.max(elapsed / 60, 1 / 60000);
  const finalWpm = Math.round((typedLength / 5) / minutes) || 0;
  const weakestLetter = useMemo(() => {
    const entries = Object.entries(correctness.wrongByLetter);
    if (!entries.length) {
      return '-';
    }
    entries.sort((a, b) => b[1] - a[1]);
    return entries[0][0];
  }, [correctness.wrongByLetter]);

  const restart = () => {
    setValue('');
    setStartTime(null);
    setIsComplete(false);
    setElapsed(0);
    inputRef.current?.focus();
  };

  const onInputChange = (nextValue) => {
    if (isComplete) {
      return;
    }

    if (!startTime && nextValue.length > 0) {
      setStartTime(Date.now());
    }

    setValue(nextValue);
  };

  const completeTest = () => {
    if (isComplete) {
      return;
    }
    setIsComplete(true);
  };

  return (
    <div style={{ backgroundColor: 'rgb(195,227,236)', minHeight: '100vh' }}>
      <header className="top-bar">
        <div className="logo-container">
          <img src="/assets/logo.png" alt="KeySprint Logo" className="logo" />
          <h2>KEYSPRINT</h2>
        </div>
      </header>

      <div className="main-container">
        <div className="container">
          <h2 className="test-title">Typing Speed Test</h2>

          <div className="timer-display" id="timerDisplay">
            <span className="timer-label">Time:</span>
            <span className="timer-value" id="timerValue">
              {elapsed.toFixed(1)}s
            </span>
          </div>

          <div className="text" id="text">
            {paragraph.split('').map((char, index) => {
              let className = 'char';
              if (value[index] != null) {
                className += value[index] === char ? ' correct' : ' incorrect';
              }
              if (!isComplete && index === value.length) {
                className += ' caret';
              }
              return (
                <span key={`${char}-${index}`} className={className}>
                  {char}
                </span>
              );
            })}
          </div>

          <input
            ref={inputRef}
            type="text"
            id="input"
            value={value}
            onChange={(e) => onInputChange(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                completeTest();
              }
            }}
            autoFocus
            style={{ opacity: isComplete ? 0 : 1 }}
          />

          <button onClick={restart}>Restart</button>

          {isComplete ? (
            <div className="result-panel" id="resultPanel" style={{ display: 'block' }}>
              <h3>Test Completed!</h3>
              <div className="final-stats">
                <div className="stat-item">
                  <span className="stat-label">Final WPM:</span>
                  <span className="stat-value" id="finalWpm">
                    {finalWpm}
                  </span>
                </div>
                <div className="stat-item">
                  <span className="stat-label">Time Taken (s):</span>
                  <span className="stat-value" id="finalTime">
                    {finalSeconds}
                  </span>
                </div>
                <div className="stat-item">
                  <span className="stat-label">Accuracy (%):</span>
                  <span className="stat-value" id="accuracy">
                    {accuracy}
                  </span>
                </div>
                <div className="stat-item">
                  <span className="stat-label">Weakest Letter:</span>
                  <span className="stat-value" id="weakestLetter">
                    {weakestLetter}
                  </span>
                </div>
              </div>
              <button onClick={restart} className="restart-btn">
                Try Again
              </button>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
