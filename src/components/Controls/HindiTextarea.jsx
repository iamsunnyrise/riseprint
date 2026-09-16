import React, { useState, useRef, useEffect } from 'react';
import { useHindiTyping } from '../../context/HindiTypingContext';
import { fetchHindiSuggestions, getQuickTransliteration } from '../../utils/hindiTransliteration';

export default function HindiTextarea({
  value = '',
  onChange,
  placeholder = '',
  className = '',
  disabled = false,
  name,
  id,
  rows = 3,
  enableHindi = true,
  ...restProps
}) {
  const { isHindiTyping, toggleHindiTyping } = useHindiTyping();
  const [localEnabled, setLocalEnabled] = useState(true);
  const [suggestions, setSuggestions] = useState([]);
  const [activeSuggestionIdx, setActiveSuggestionIdx] = useState(0);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [currentWordRange, setCurrentWordRange] = useState(null);

  const textareaRef = useRef(null);
  const containerRef = useRef(null);
  const lastConversionRef = useRef(null);
  const debounceTimerRef = useRef(null);

  const isPhoneticActive = enableHindi && isHindiTyping && localEnabled;

  const extractCurrentWord = (text, cursorPos) => {
    const textBefore = text.slice(0, cursorPos);
    const match = textBefore.match(/[a-zA-Z]+$/);
    if (!match) return null;

    const word = match[0];
    const start = cursorPos - word.length;
    const end = cursorPos;
    return { word, start, end };
  };

  const handleInputChange = (e) => {
    const nextVal = e.target.value;
    const caret = e.target.selectionStart || nextVal.length;

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
      const quick = getQuickTransliteration(current.word);
      setSuggestions([quick]);
      setShowSuggestions(true);
      setActiveSuggestionIdx(0);

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

  const applyTransliteration = (chosenWord, addSpace = true) => {
    if (!textareaRef.current || !currentWordRange) return;

    const el = textareaRef.current;
    const fullText = el.value || '';
    const { start, end, word: originalWord } = currentWordRange;

    const prefix = fullText.slice(0, start);
    const suffix = fullText.slice(end);
    const separator = addSpace ? ' ' : '';
    const newText = prefix + chosenWord + separator + suffix;
    const newCaretPos = prefix.length + chosenWord.length + separator.length;

    lastConversionRef.current = {
      originalWord,
      convertedWord: chosenWord,
      position: newCaretPos,
      addSpace
    };

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

    requestAnimationFrame(() => {
      if (textareaRef.current) {
        textareaRef.current.setSelectionRange(newCaretPos, newCaretPos);
        textareaRef.current.focus();
      }
    });
  };

  const handleKeyDown = (e) => {
    if ((e.ctrlKey || e.metaKey) && (e.key === 'g' || e.key === 'G')) {
      e.preventDefault();
      toggleHindiTyping();
      return;
    }

    if (!isPhoneticActive) {
      if (restProps.onKeyDown) restProps.onKeyDown(e);
      return;
    }

    const caret = textareaRef.current?.selectionStart || 0;

    // Backspace undo
    if (e.key === 'Backspace' && lastConversionRef.current) {
      const last = lastConversionRef.current;
      if (caret === last.position) {
        e.preventDefault();
        const currentText = textareaRef.current.value || '';
        const prefix = currentText.slice(0, last.position - (last.convertedWord.length + (last.addSpace ? 1 : 0)));
        const suffix = currentText.slice(last.position);
        const revertedText = prefix + last.originalWord + suffix;
        const newCaret = prefix.length + last.originalWord.length;

        lastConversionRef.current = null;

        if (onChange) {
          onChange({ target: { value: revertedText, name } });
        }

        requestAnimationFrame(() => {
          if (textareaRef.current) {
            textareaRef.current.setSelectionRange(newCaret, newCaret);
            textareaRef.current.focus();
          }
        });
        return;
      }
    }

    // Space or Tab converts
    if (showSuggestions && suggestions.length > 0 && currentWordRange) {
      if (e.key === ' ' || e.key === 'Spacebar') {
        e.preventDefault();
        const chosen = suggestions[activeSuggestionIdx] || suggestions[0];
        applyTransliteration(chosen, true);
        return;
      }

      if (e.key === 'Tab') {
        e.preventDefault();
        const chosen = suggestions[activeSuggestionIdx] || suggestions[0];
        applyTransliteration(chosen, true);
        return;
      }

      if (['1', '2', '3', '4', '5'].includes(e.key)) {
        const numIdx = parseInt(e.key, 10) - 1;
        if (numIdx < suggestions.length) {
          e.preventDefault();
          applyTransliteration(suggestions[numIdx], true);
          return;
        }
      }

      if (e.key === 'Escape') {
        setShowSuggestions(false);
        return;
      }
    }

    if (restProps.onKeyDown) {
      restProps.onKeyDown(e);
    }
  };

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
      <textarea
        ref={textareaRef}
        rows={rows}
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
        {...restProps}
      />

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
          className={`absolute right-1.5 top-2 px-1.5 py-0.5 rounded text-[11px] font-bold transition-all select-none ${
            isPhoneticActive
              ? 'bg-amber-100 text-amber-900 border border-amber-300 shadow-2xs hover:bg-amber-200'
              : 'bg-stone-100 text-stone-400 border border-stone-200 hover:text-stone-600'
          }`}
        >
          {isPhoneticActive ? 'अ' : 'A'}
        </button>
      )}

      {showSuggestions && suggestions.length > 0 && isPhoneticActive && (
        <div className="absolute left-0 top-full mt-1 z-50 bg-stone-900/95 backdrop-blur text-white text-xs rounded-lg shadow-xl border border-amber-500/40 py-1 px-1.5 flex flex-wrap items-center gap-1 min-w-[200px]">
          <span className="text-[10px] text-amber-400 font-semibold px-1">✨ सुझाव:</span>
          {suggestions.map((sug, idx) => (
            <button
              key={idx}
              type="button"
              onMouseDown={(e) => {
                e.preventDefault();
                applyTransliteration(sug, true);
              }}
              className={`px-2 py-0.5 rounded text-xs font-semibold flex items-center gap-1 transition ${
                idx === activeSuggestionIdx
                  ? 'bg-amber-500 text-stone-950 font-bold shadow-xs'
                  : 'bg-stone-800 text-stone-200 hover:bg-stone-700'
              }`}
            >
              <span className="text-[9.5px] opacity-70">{idx + 1}.</span>
              <span>{sug}</span>
            </button>
          ))}
          <span className="text-[9.5px] text-stone-400 ml-auto px-1 hidden sm:inline">
            [स्पेस / 1-5 दबाएं]
          </span>
        </div>
      )}
    </div>
  );
}
