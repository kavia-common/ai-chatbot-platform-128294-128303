import React, { useState, useRef, useEffect } from 'react';

/**
 * PUBLIC_INTERFACE
 * ChatInput provides the message composer with send action.
 * - Props:
 *   - onSend: function(message: string) => void
 *   - disabled: boolean disable input when bot typing
 *   - placeholder: optional string
 */
export default function ChatInput({ onSend, disabled = false, placeholder = "Type your message..." }) {
  const [value, setValue] = useState('');
  const textareaRef = useRef(null);

  // Auto-resize textarea
  useEffect(() => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = 'auto';
    el.style.height = `${Math.min(el.scrollHeight, 140)}px`;
  }, [value]);

  const handleSend = () => {
    const trimmed = value.trim();
    if (!trimmed || disabled) return;
    onSend(trimmed);
    setValue('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="chat-input">
      <textarea
        ref={textareaRef}
        className="chat-textarea"
        placeholder={placeholder}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={handleKeyDown}
        rows={1}
        maxLength={4000}
        disabled={disabled}
        aria-label="Message input"
      />
      <button
        className="btn btn-send"
        onClick={handleSend}
        disabled={disabled || !value.trim()}
        aria-label="Send message"
        title="Send (Enter)"
      >
        ➤
      </button>
    </div>
  );
}
