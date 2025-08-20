import React, { useEffect, useRef } from 'react';
import MessageBubble from './MessageBubble';

/**
 * PUBLIC_INTERFACE
 * ChatWindow displays the conversation list and bot typing indicator.
 * - Props:
 *   - messages: Array<{ id: string, role: 'user'|'bot', text: string, time?: string }>
 *   - typing: boolean whether the bot is typing
 */
export default function ChatWindow({ messages = [], typing = false }) {
  const endRef = useRef(null);
  const containerRef = useRef(null);

  // Auto-scroll on new messages or typing changes
  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
  }, [messages, typing]);

  return (
    <div className="chat-window" ref={containerRef} role="list" aria-label="Conversation">
      {messages.map((m) => (
        <MessageBubble key={m.id} role={m.role} text={m.text} time={m.time} />
      ))}
      {typing && (
        <div className="msg-row left">
          <div className="avatar" aria-hidden="true">🤖</div>
          <div className="bubble bot typing" aria-live="polite" aria-label="Bot is typing">
            <span className="dot"></span>
            <span className="dot"></span>
            <span className="dot"></span>
          </div>
        </div>
      )}
      <div ref={endRef} />
    </div>
  );
}
