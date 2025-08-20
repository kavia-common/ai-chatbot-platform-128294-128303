import React from 'react';

/**
 * PUBLIC_INTERFACE
 * Header component renders the top navigation bar with branding.
 * - Props:
 *   - title: string title to show in the navbar
 *   - subtitle: optional string small subtitle or environment hint
 */
export default function Header({ title = "Chatbot", subtitle }) {
  return (
    <header className="navbar">
      <div className="navbar-inner container">
        <div className="brand">
          <div className="brand-logo" aria-hidden="true">🤖</div>
          <div className="brand-text">
            <h1 className="brand-title">{title}</h1>
            {subtitle ? <span className="brand-subtitle">{subtitle}</span> : null}
          </div>
        </div>
        <nav className="nav-actions">
          <a className="nav-link" href="#" onClick={(e) => e.preventDefault()} aria-label="Help">Help</a>
        </nav>
      </div>
    </header>
  );
}
