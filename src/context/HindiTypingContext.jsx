import React, { createContext, useContext, useState, useEffect } from 'react';

const HindiTypingContext = createContext({
  isHindiTyping: true,
  setIsHindiTyping: () => {},
  toggleHindiTyping: () => {}
});

export function HindiTypingProvider({ children }) {
  const [isHindiTyping, setIsHindiTyping] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('hi_typing_enabled');
      return saved !== null ? saved === 'true' : true;
    }
    return true;
  });

  const toggleHindiTyping = () => {
    setIsHindiTyping((prev) => {
      const next = !prev;
      try {
        localStorage.setItem('hi_typing_enabled', String(next));
      } catch (_) {}
      return next;
    });
  };

  // Listen for Ctrl+G or Cmd+G keyboard shortcut to toggle Hindi typing anywhere
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && (e.key === 'g' || e.key === 'G')) {
        e.preventDefault();
        toggleHindiTyping();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <HindiTypingContext.Provider value={{ isHindiTyping, setIsHindiTyping, toggleHindiTyping }}>
      {children}
    </HindiTypingContext.Provider>
  );
}

export function useHindiTyping() {
  return useContext(HindiTypingContext);
}
