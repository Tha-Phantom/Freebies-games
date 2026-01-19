import React from "react";

function hostFromUrl(url) {
  try {
    const u = new URL(url);
    return u.hostname.replace("www.", "");
  } catch {
    return "";
  }
}

export default function GameCard({ item, formatTimeLeft }) {
  const {
    title,
    description,
    image,
    url,
    platforms,
    worth,
    open_giveaway: openGiveaway,
    end_date,
    published_date,
    type
  } = item;

  return (
    <article className="card">
      <div className="card-image" style={{ backgroundImage: `url(${image || ""})` }}>
        <div className="badge">{type}</div>
      </div>

      <div className="card-body">
        <h3 className="card-title">
          <a href={url} target="_blank" rel="noreferrer">{title}</a>
        </h3>

        <p className="card-desc">{description ? description.slice(0, 160) + (description.length > 160 ? "…" : "") : "No description."}</p>

        <div className="meta">
          <div className="meta-left">
            <div className="platforms">{platforms}</div>
            {worth ? <div className="worth">{worth}</div> : null}
          </div>

          <div className="meta-right">
            <div className="time">{formatTimeLeft(end_date)}</div>
            <div className="source">{hostFromUrl(url)}</div>
          </div>
        </div>

        <div className="card-actions">
          <a className="btn primary" href={url} target="_blank" rel="noreferrer">Go to giveaway</a>
          <span className="small">Published: {published_date ? new Date(published_date).toLocaleDateString() : "—"}</span>
        </div>
      </div>
    </article>
  );
}
