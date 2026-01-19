import React from "react";

export default function Filters({ query, setQuery, platform, setPlatform, platforms, sortBy, setSortBy }) {
  return (
    <div className="filters">
      <div className="search">
        <input
          placeholder="Search title..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          aria-label="Search title"
        />
      </div>

      <div className="controls">
        <label className="select">
          <span className="label">Platform</span>
          <select value={platform} onChange={(e) => setPlatform(e.target.value)}>
            {platforms.map((p) => (
              <option key={p} value={p}>
                {p}
              </option>
            ))}
          </select>
        </label>

        <label className="select">
          <span className="label">Sort</span>
          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
            <option value="latest">Newest</option>
            <option value="ending">Ending soon</option>
          </select>
        </label>
      </div>
    </div>
  );
}
