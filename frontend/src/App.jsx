import { useEffect, useState } from "react";

const API_URL = "http://127.0.0.1:8000";

export default function App() {
  const [items, setItems] = useState([]);
  const [name, setName] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  async function loadItems() {
    setMessage("");

    try {
      const response = await fetch(`${API_URL}/items`);

      if (!response.ok) {
        throw new Error("Could not load pantry items.");
      }

      const data = await response.json();
      setItems(data);
    } catch {
      setMessage("Could not connect to the API. Check that the backend is running.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadItems();
  }, []);

  async function handleSubmit(event) {
    event.preventDefault();
    setMessage("");
    setSaving(true);

    try {
      const response = await fetch(`${API_URL}/items`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          expiry_date: expiryDate,
        }),
      });

      if (!response.ok) {
        throw new Error("Could not save this item.");
      }

      const savedItem = await response.json();
      setItems((currentItems) => [...currentItems, savedItem]);
      setName("");
      setExpiryDate("");
      setMessage("Item added to your pantry.");
    } catch {
      setMessage("Could not save the item. Check that the backend is running.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <main style={styles.page}>
      <section style={styles.card}>
        <h1 style={styles.title}>Fresh Track</h1>
        <p style={styles.subtitle}>Keep track of what’s in your pantry.</p>

        <form onSubmit={handleSubmit} style={styles.form}>
          <label htmlFor="item-name">Food name</label>
          <input
            id="item-name"
            type="text"
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder="For example, Milk"
            required
          />

          <label htmlFor="expiry-date">Expiry date</label>
          <input
            id="expiry-date"
            type="date"
            value={expiryDate}
            onChange={(event) => setExpiryDate(event.target.value)}
            required
          />

          <button type="submit" disabled={saving}>
            {saving ? "Adding…" : "Add to pantry"}
          </button>
        </form>

        {message && <p role="status" style={styles.message}>{message}</p>}

        <h2 style={styles.heading}>Your pantry</h2>

        {loading ? (
          <p>Loading pantry items…</p>
        ) : items.length === 0 ? (
          <p>Your pantry is empty. Add your first item above.</p>
        ) : (
          <ul style={styles.list}>
            {items.map((item) => (
              <li key={item.id} style={styles.item}>
                <strong>{item.name}</strong>
                <span>Expires: {item.expiry_date}</span>
              </li>
            ))}
          </ul>
        )}
      </section>
    </main>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    background: "#f2f7f1",
    padding: "48px 20px",
    fontFamily: "Arial, sans-serif",
    color: "#203328",
  },
  card: {
    maxWidth: "620px",
    margin: "0 auto",
    background: "white",
    padding: "32px",
    borderRadius: "16px",
    boxShadow: "0 8px 28px rgba(32, 51, 40, 0.1)",
  },
  title: { margin: 0, color: "#24734b" },
  subtitle: { marginTop: "8px", color: "#5f7065" },
  form: { display: "grid", gap: "10px", marginTop: "28px" },
  heading: { marginTop: "32px" },
  list: { listStyle: "none", padding: 0 },
  item: {
    display: "flex",
    justifyContent: "space-between",
    gap: "16px",
    padding: "14px 0",
    borderBottom: "1px solid #e4ebe5",
  },
  message: { color: "#24734b" },
};
