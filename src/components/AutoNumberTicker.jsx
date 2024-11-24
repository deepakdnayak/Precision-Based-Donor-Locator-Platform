import React, { useState, useEffect, useRef } from 'react';

const AutoNumberTicker = ({ limit = 10, fastInterval = 50, slowInterval = 500 }) => {
  const [number, setNumber] = useState(0);
  const [interval, setIntervalState] = useState(fastInterval);
  const [isVisible, setIsVisible] = useState(false);
  const tickerRef = useRef(null);

  // Intersection Observer to check visibility
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting); // Update visibility state
      },
      { threshold: 0.1 } // Trigger when 10% of the component is visible
    );

    if (tickerRef.current) {
      observer.observe(tickerRef.current);
    }

    return () => {
      if (tickerRef.current) {
        observer.unobserve(tickerRef.current);
      }
    };
  }, []);

  // Update the number when the component is visible
  useEffect(() => {
    if (!isVisible || number >= limit) return; // Stop if not visible or limit is reached

    // Adjust interval based on progress
    const progress = number / limit;
    if (progress >= 0.95) {
      setIntervalState(slowInterval); // Slow down for the last 5%
    }

    // Set up the ticker
    const ticker = setTimeout(() => {
      setNumber((prev) => prev + 1);
    }, interval);

    return () => clearTimeout(ticker); // Cleanup on component unmount
  }, [number, limit, interval, fastInterval, slowInterval, isVisible]);

  return (
    <div ref={tickerRef} style={{fontSize: '5rem' }}>
      <p className="text-danger">{number}</p>
    </div>
  );
};

export default AutoNumberTicker;
