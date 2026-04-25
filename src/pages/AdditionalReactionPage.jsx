import { useEffect, useMemo, useRef, useState } from 'react';
import '../styles/pages/additional-reaction.css';

const quotes = [
  'Practice makes perfect, keep trying. Consistency beats talent',
  'Never give up. The greatest people have failed many times before succeeding',
  'Always plan for big events. Planning to lose is better than losing to plan',
  'In the end, the greatest attribute a human can have for his longevity is gratitude',
  'Life is and always will be unfair, its your duty to make it fair through persistence and consisteny in work',
];

export default function AdditionalReactionPage() {
  const timerRef = useRef(null);
  const [selectedTime, setSelectedTime] = useState(30);
  const [timeLeft, setTimeLeft] = useState(30);
  const [quoteIndex, setQuoteIndex] = useState(0);
  const [input, setInput] = useState('');
  const [startedAt, setStartedAt] = useState(null);
  const [endedAt, setEndedAt] = useState(null);
  const [finished, setFinished] = useState(false);

  const currentQuote = quotes[quoteIndex];

  const correctChars = useMemo(() => {
    let total = 0;
    for (let i = 0; i < input.length; i += 1) {
      if (input[i] === currentQuote[i]) {
        total += 1;
      }
    }
    return total;
  }, [currentQuote, input]);

  const weakestLetter = useMemo(() => {
    const counts = {};
    for (let i = 0; i < input.length; i += 1) {
      if (input[i] !== currentQuote[i]) {
        const char = currentQuote[i];
        if (char && char !== ' ') {
          counts[char] = (counts[char] || 0) + 1;
        }
      }
    }
    const entries = Object.entries(counts);
    if (!entries.length) {
      return '-';
    }
    entries.sort((a, b) => b[1] - a[1]);
    return entries[0][0];
  }, [currentQuote, input]);

  const wpm = useMemo(() => {
    if (finished && startedAt && endedAt) {
      const sec = Math.max(1, (endedAt - startedAt) / 1000);
      return ((correctChars * 60) / 5 / sec).toFixed(1);
    }
    const factor = selectedTime === 15 ? 4 : selectedTime === 30 ? 2 : 1;
    return ((correctChars * factor) / 5).toFixed(1);
  }, [correctChars, endedAt, finished, selectedTime, startedAt]);

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
  }, []);

  const chooseTime = (seconds) => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    setSelectedTime(seconds);
    setTimeLeft(seconds);
    setInput('');
    setFinished(false);
    setStartedAt(null);
    setEndedAt(null);
    setQuoteIndex((previous) => (previous + 1) % quotes.length);
  };

  const onInput = (nextValue) => {
    if (finished) {
      return;
    }

    if (!startedAt && nextValue.length > 0) {
      setStartedAt(Date.now());
      timerRef.current = setInterval(() => {
        setTimeLeft((previous) => {
          if (previous <= 1) {
            if (timerRef.current) {
              clearInterval(timerRef.current);
              timerRef.current = null;
            }
            setFinished(true);
            setEndedAt(Date.now());
            return 0;
          }
          return previous - 1;
        });
      }, 1000);
    }

    setInput(nextValue);
    if (nextValue.length >= currentQuote.length) {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
      setFinished(true);
      setEndedAt(Date.now());
    }
  };

  return (
    <div>
      <div className="timer">{timeLeft}</div>
      <div className="set-timer">
        {[15, 30, 60].map((seconds) => (
          <button key={seconds} className={`time-elt ${selectedTime === seconds ? 'active' : ''}`} onClick={() => chooseTime(seconds)}>
            {seconds}
          </button>
        ))}
      </div>
      <div className="quote-main">
        <div className="quote-display" id="quote-display">
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
        <textarea rows={1} className="type-area" id="type-area" autoComplete="off" value={input} onChange={(e) => onInput(e.target.value)} disabled={finished} />
      </div>
      <div id="wpm">WPM: {wpm}</div>
      <div id="weak-letter">Weak Letter: {weakestLetter}</div>
    </div>
  );
}
