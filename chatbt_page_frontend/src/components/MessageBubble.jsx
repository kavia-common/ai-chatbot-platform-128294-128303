import React from 'react';

/**
 * PUBLIC_INTERFACE
 * MessageBubble renders a single chat message with role-based styling.
 * - Props:
 *   - role: 'user' | 'bot'
 *   - text: string content of the message
 *   - time: string timestamp to display (optional)
 */
export default function MessageBubble({ role = 'bot', text, time }) {
  const isUser = role === 'user';
  return (
    <div className={`msg-row ${isUser ? 'right' : 'left'}`}>
      {!isUser && (
        <div className="avatar" aria-hidden="true">🤖</div>
      )}
      <div className={`bubble ${isUser ? 'user' : 'bot'}`} role="listitem" aria-label={`${role} message`}>
        <div className="bubble-text">{text}</div>
        {time ? <div className="bubble-time" aria-hidden="true">{time}</div> : null}
      </div>
      {isUser && (
        <div className="avatar user" aria-hidden="true">🙂</div>
      )}
    </div>
  );
}
