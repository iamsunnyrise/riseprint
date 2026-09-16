import React, { useState, useRef, useEffect } from 'react';
import { useHindiTyping } from '../../context/HindiTypingContext';
import { fetchHindiSuggestions, getQuickTransliteration } from '../../utils/hindiTransliteration';

export default function HindiInput({
  value = '',
  onChange,
  placeholder = '',
  className = '',
  disabled = false,
  name,
  id,
  type = 'text',
  enableHindi = true,
  ...restProps
}) {
  const { isHindiTyping, toggleHindiTyping } = useHindiTyping();
  const [localEnabled, setLocalEnabled] = useState(true);
  const [suggestions, setSuggestions] = useState([]);
  const [activeSuggestionIdx, setActiveSuggestionIdx] = useState(0);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [currentWordRange, setCurrentWordRange] = useState(null); // { start, end, word }

  const inputRef = useRef(null);
  const containerRef = useRef(null);
  const lastConversionRef = useRef(null); // { originalWord, convertedWord, position }
  const debounceTimerRef = useRef(null);

  const isPhoneticActive = enableHindi && isHindiTyping && localEnabled;

  // Extract current word ending at cursor
  const extractCurrentWord = (text, cursorPos) => {
    const textBefore = text.slice(0, cursorPos);
    // Match the last sequence of English alphabet letters or letters with apostrophe
    const match = textBefore.match(/[a-zA-Z]+$/);
    if (!match) return null;

    const word = match[0];
    const start = cursorPos - word.length;
    const end = cursorPos;
    return { word, start, end };
  };

  // Handle caret and suggestions on input change
  const handleInputChange = (e) => {
    const nextVal = e.target.value;
    const caret = e.target.selectionStart || nextVal.length;

    // Call parent onChange
    if (onChange) {
      onChange(e);
    }

    if (!isPhoneticActive) {
      setShowSuggestions(false);
      return;
    }

    const current = extractCurrentWord(nextVal, caret);
    if (current && current.word.length >= 1) {
      setCurrentWordRange(current);
      // Quick immediate preview
      const quick = getQuickTransliteration(current.word);
      setSuggestions([quick]);
      setShowSuggestions(true);
      setActiveSuggestionIdx(0);

      // Debounced API fetch for top accurate dictionary suggestions
      if (debounceTimerRef.current) clearTimeout(debounceTimerRef.current);
      debounceTimerRef.current = setTimeout(async () => {
        const fullSuggestions = await fetchHindiSuggestions(current.word);
        if (fullSuggestions && fullSuggestions.length > 0) {
          setSuggestions(fullSuggestions);
        }
      }, 120);
    } else {
      setShowSuggestions(false);
      setCurrentWordRange(null);
    }
  };

  // Apply chosen Hindi suggestion to replace English word
  const applyTransliteration = (chosenWord, addSpace = true) => {
    if (!inputRef.current || !currentWordRange) return;

    const el = inputRef.current;
    const fullText = el.value || '';
    const { start, end, word: originalWord } = currentWordRange;

    const prefix = fullText.slice(0, start);
    const suffix = fullText.slice(end);
    const separator = addSpace ? ' ' : '';
    const newText = prefix + chosenWord + separator + suffix;
    const newCaretPos = prefix.length + chosenWord.length + separator.length;

    // Record for undo on backspace
    lastConversionRef.current = {
      originalWord,
      convertedWord: chosenWord,
      position: newCaretPos,
      addSpace
    };

    // Synthesize change event
    const syntheticEvent = {
      target: {
        value: newText,
        name: name || el.name,
        id: id || el.id
      }
    };

    if (onChange) {
      onChange(syntheticEvent);
    }

    setShowSuggestions(false);
    setCurrentWordRange(null);

    // Reposition caret
    requestAnimationFrame(() => {
      if (inputRef.current) {
        inputRef.current.setSelectionRange(newCaretPos, newCaretPos);
        inputRef.current.focus();
      }
    });
  };

  // Keyboard navigation & space trigger
  const handleKeyDown = (e) => {
    // 1. Check for Ctrl+G shortcut to toggle
    if ((e.ctrlKey || e.metaKey) && (e.key === 'g' || e.key === 'G')) {
      e.preventDefault();
      toggleHindiTyping();
      return;
    }

    if (!isPhoneticActive) {
      if (restProps.onKeyDown) restProps.onKeyDown(e);
      return;
    }

    const caret = inputRef.current?.selectionStart || 0;

    // 2. Backspace undo: If pressed right after space of converted word, revert to English
    if (e.key === 'Backspace' && lastConversionRef.current) {
      const last = lastConversionRef.current;
      if (caret === last.position) {
        e.preventDefault();
        const currentText = inputRef.current.value || '';
        const prefix = currentText.slice(0, last.position - (last.convertedWord.length + (last.addSpace ? 1 : 0)));
        const suffix = currentText.slice(last.position);
        const revertedText = prefix + last.originalWord + suffix;
        const newCaret = prefix.length + last.originalWord.length;

        lastConversionRef.current = null;

        if (onChange) {
          onChange({ target: { value: revertedText, name } });
        }

        requestAnimationFrame(() => {
          if (inputRef.current) {
            inputRef.current.setSelectionRange(newCaret, newCaret);
            inputRef.current.focus();
          }
        });
        return;
      }
    }

    // 3. If suggestions are open
    if (showSuggestions && suggestions.length > 0 && currentWordRange) {
      // Space or Enter converts to active suggestion
      if (e.key === ' ' || e.key === 'Spacebar') {
        e.preventDefault();
        const chosen = suggestions[activeSuggestionIdx] || suggestions[0];
        applyTransliteration(chosen, true);
        return;
      }

      if (e.key === 'Enter') {
        e.preventDefault();
        const chosen = suggestions[activeSuggestionIdx] || suggestions[0];
        applyTransliteration(chosen, false);
        return;
      }

      if (e.key === 'Tab') {
        e.preventDefault();
        const chosen = suggestions[activeSuggestionIdx] || suggestions[0];
        applyTransliteration(chosen, true);
        return;
      }

      // Arrow keys to navigate choices
      if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
        e.preventDefault();
        setActiveSuggestionIdx((prev) => (prev + 1) % suggestions.length);
        return;
      }

      if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
        e.preventDefault();
        setActiveSuggestionIdx((prev) => (prev - 1 + suggestions.length) % suggestions.length);
        return;
      }

      // Number keys 1-5 to select
      if (['1', '2', '3', '4', '5'].includes(e.key)) {
        const numIdx = parseInt(e.key, 10) - 1;
        if (numIdx < suggestions.length) {
          e.preventDefault();
          applyTransliteration(suggestions[numIdx], true);
          return;
        }
      }

      // Escape to close suggestions
      if (e.key === 'Escape') {
        setShowSuggestions(false);
        return;
      }
    }

    if (restProps.onKeyDown) {
      restProps.onKeyDown(e);
    }
  };

  // Close suggestions if clicked outside
  useEffect(() => {
    const handleClickOutside = (ev) => {
      if (containerRef.current && !containerRef.current.contains(ev.target)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div ref={containerRef} className="relative w-full">
      <input
        ref={inputRef}
        type={type}
        name={name}
        id={id}
        value={value}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        placeholder={
          placeholder ||
          (isPhoneticActive ? 'इंग्लिश में टाइप करें, हिंदी बनेगी...' : '')
        }
        disabled={disabled}
        className={`${className} pr-8`}
        autoComplete="off"
        {...restProps}
      />

      {/* Floating Mode Indicator / Toggle Badge */}
      {enableHindi && (
        <button
          type="button"
          tabIndex={-1}
          onClick={(e) => {
            e.stopPropagation();
            setLocalEnabled((prev) => !prev);
          }}
          title={
            isPhoneticActive
              ? 'इंग्लिश ➔ हिंदी टाइपिंग चालू है (क्लिक करके बंद करें)'
              : 'हिंदी टाइपिंग बंद है (क्लिक करके चालू करें)'
          }
          className={`absolute right-1.5 top-1/2 -translate-y-1/2 px-1.5 py-0.5 rounded text-[11px] font-bold transition-all select-none ${
            isPhoneticActive
              ? 'bg-amber-100 text-amber-900 border border-amber-300 shadow-2xs hover:bg-amber-200'
              : 'bg-stone-100 text-stone-400 border border-stone-200 hover:text-stone-600'
          }`}
        >
          {isPhoneticActive ? 'अ' : 'A'}
        </button>
      )}

      {/* Floating Suggestions Dropdown */}
      {showSuggestions && suggestions.length > 0 && isPhoneticActive && (
        <div className="absolute left-0 top-full mt-1 z-50 bg-stone-900/95 backdrop-blur text-white text-xs rounded-lg shadow-xl border border-amber-500/40 py-1 px-1.5 flex flex-wrap items-center gap-1 min-w-[200px] animate-in fade-in slide-in-from-top-1 duration-150">
          <span className="text-[10px] text-amber-400 font-semibold px-1 flex items-center gap-0.5">
            <span>✨ सुझाव:</span>
          </span>
          {suggestions.map((sug, idx) => {
            const isSelected = idx === activeSuggestionIdx;
            return (
              <button
                key={idx}
                type="button"
                onMouseDown={(e) => {
                  e.preventDefault();
                  applyTransliteration(sug, true);
                }}
                className={`px-2 py-0.5 rounded text-xs font-semibold flex items-center gap-1 transition ${
                  isSelected
                    ? 'bg-amber-500 text-stone-950 font-bold shadow-xs'
                    : 'bg-stone-800 text-stone-200 hover:bg-stone-700'
                }`}
              >
                <span className="text-[9.5px] opacity-70">{idx + 1}.</span>
                <span>{sug}</span>
              </button>
            );
          })}
          <span className="text-[9.5px] text-stone-400 ml-auto px-1 hidden sm:inline">
            [स्पेस / 1-5 दबाएं]
          </span>
        </div>
      )}
    </div>
  );
}
