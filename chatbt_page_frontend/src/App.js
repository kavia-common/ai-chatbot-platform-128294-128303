import React, { useEffect, useMemo, useState } from 'react';
import './App.css';
import './chatbot.css';
import Header from './components/Header';
import ChatWindow from './components/ChatWindow';
import ChatInput from './components/ChatInput';

// PUBLIC_INTERFACE
/**
 * App renders the Chatbot Page with header, chat window, and input.
 * It maintains conversation state and simulates bot responses.
 */
function App() {
  const [theme] = useState('light'); // fixed to light per requirements
  const [messages, setMessages] = useState(() => [
    {
      id: 'm-welcome',
      role: 'bot',
      text: 'Hi! I am your AI assistant. Ask me anything.',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [typing, setTyping] = useState(false);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  // PUBLIC_INTERFACE
  const handleSend = (text) => {
    const userMsg = {
      id: `m-${Date.now()}`,
      role: 'user',
      text,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setMessages((prev) => [...prev, userMsg]);
    // Simulate bot response
    setTyping(true);
    const latency = Math.min(1800 + Math.random() * 1200, 3500);
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: `m-${Date.now()}-bot`,
          role: 'bot',
          text: generateBotReply(text),
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
      setTyping(false);
    }, latency);
  };

  const title = useMemo(() => 'AI Chatbot', []);
  const subtitle = useMemo(() => 'Modern • Light', []);

  return (
    <div className="App">
      <Header title={title} subtitle={subtitle} />
      <main className="page">
        <section className="chat-card container" aria-label="Chatbot panel">
          <ChatWindow messages={messages} typing={typing} />
          <ChatInput onSend={handleSend} disabled={typing} />
        </section>
        <footer className="footer">
          <div className="container footer-inner">
            <span className="footer-text">Built with ❤ — Demo only. No backend connected.</span>
          </div>
        </footer>
      </main>
    </div>
  );
}

function generateBotReply(input) {
  // Very basic placeholder: echo intent with helper text
  const trimmed = input.trim();
  if (!trimmed) return "Could you please provide more details?";
  const starters = [
    "Here's what I understood:",
    "Thanks for the message:",
    "Let me reflect that back:",
    "I hear you saying:",
  ];
  const guides = [
    " If you'd like, ask a follow-up or try another question.",
    " I can provide examples or break it down further.",
    " Want me to summarize or expand?",
    " Would you like related tips?"
  ];
  const start = starters[Math.floor(Math.random() * starters.length)];
  const guide = guides[Math.floor(Math.random() * guides.length)];
  return `${start} “${trimmed}”.${guide}`;
}

export default App;
