import React, { useEffect, useState, useMemo } from "react";
import Header from "./components/Header";
import Filters from "./components/Filters";
import GameCard from "./components/GameCard";

const API_URL = "https://api.allorigins.win/raw?url=https://www.gamerpower.com/api/giveaways";

function formatTimeLeft(endDateStr) {
  if (!endDateStr) return "No end date";
  const end = new Date(endDateStr);
  const now = new Date();
  const diff = end - now;
  if (isNaN(end)) return "Unknown";
  if (diff <= 0) return "Ended";
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  if (days > 0) return `${days}d ${hours}h`;
  if (hours > 0) return `${hours}h ${minutes}m`;
  return `${minutes}m`;
}

export default function App() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [query, setQuery] = useState("");
  const [platform, setPlatform] = useState("all");
  const [sortBy, setSortBy] = useState("latest"); // "latest" or "ending"

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      // The GamerPower endpoint returns an array of giveaways
      const res = await fetch(API_URL);
      if (!res.ok) throw new Error(`API error: ${res.status}`);
      const data = await res.json();
      setItems(data);
    } catch (err) {
      setError(err.message || "Unknown error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    const id = setInterval(fetchData, 5 * 60 * 1000); // refresh every 5 minutes
    return () => clearInterval(id);
  }, []);

  const platforms = useMemo(() => {
    const setp = new Set();
    items.forEach((it) => {
      if (it.platforms) {
        it.platforms.split(",").map((p) => p.trim()).forEach((p) => setp.add(p));
      }
    });
    return ["all", ...Array.from(setp).sort()];
  }, [items]);

  const filtered = useMemo(() => {
    let arr = items.slice();
    if (query.trim()) {
      const q = query.toLowerCase();
      arr = arr.filter((it) => (it.title || "").toLowerCase().includes(q));
    }
    if (platform !== "all") {
      arr = arr.filter((it) => {
        if (!it.platforms) return false;
        return it.platforms.toLowerCase().includes(platform.toLowerCase());
      });
    }
    if (sortBy === "latest") {
      arr.sort((a, b) => new Date(b.published_date) - new Date(a.published_date));
    } else if (sortBy === "ending") {
      arr.sort(
        (a, b) =>
          (new Date(a.end_date).getTime() || Infinity) - (new Date(b.end_date).getTime() || Infinity)
      );
    }
    return arr;
  }, [items, query, platform, sortBy]);

  return (
    <div className="app">
      <Header count={items.length} />
      <main className="container">
        <Filters
          query={query}
          setQuery={setQuery}
          platform={platform}
          setPlatform={setPlatform}
          platforms={platforms}
          sortBy={sortBy}
          setSortBy={setSortBy}
        />

        {loading && (
          <div className="status">Loading giveaways…</div>
        )}
        {error && (
          <div className="status error">Error: {error}</div>
        )}

        {!loading && !error && filtered.length === 0 && (
          <div className="status">No giveaways found for this filter.</div>
        )}

        <section className="grid">
          {filtered.map((item) => (
            <GameCard key={item.id || item.title} item={item} formatTimeLeft={formatTimeLeft} />
          ))}
        </section>
      </main>

      <footer className="footer">
        Data from <a href="https://www.gamerpower.com/" target="_blank" rel="noreferrer">GamerPower</a> · Refreshes automatically every 5 minutes
      </footer>
    </div>
  );
}
