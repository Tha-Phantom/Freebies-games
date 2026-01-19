import React from "react";

export default function Header({ count }) {
  return (
    <header className="header">
      <div className="brand">
        <svg className="logo" viewBox="0 0 24 24" width="32" height="32" aria-hidden>
          <defs />
          <path fill="currentColor" d="M12 2L15 8l6 .5-4.5 3L18 20l-6-3-6 3 1.5-8.5L3 8.5 9 8 12 2z" />
        </svg>
        <div>
          <h1>Freebies</h1>
          <p className="subtitle">Currently free games & giveaways</p>
        </div>
      </div>

      <div className="header-right">
        <div className="count-pill">{count} total</div>
      </div>
    </header>
  );
}
