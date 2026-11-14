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

  async function handleDelete(itemId) {
    setMessage("");

    try {
      const response = await fetch(`${API_URL}/items/${itemId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Could not remove this item.");
      }

      setItems((currentItems) =>
        currentItems.filter((item) => item.id !== itemId)
      );
      setMessage("Item removed from your pantry.");
    } catch (error) {
      setMessage(error.message || "Could not remove the item.");
    }
  }

  return (
    <main style={styles.page}>
      <section style={styles.card}>
        <h1 style={styles.title}>Fresh Track</h1>
        <p style={styles.subtitle}>Keep track of what’s in your pantry.</p>

        <form onSubmit={handleSubmit} style={styles.form}>
          <label htmlFor="item-name" style={styles.label}>
            Food name
          </label>
          <input
            id="item-name"
            type="text"
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder="For example, Milk"
            required
            style={styles.input}
          />

          <label htmlFor="expiry-date" style={styles.label}>
            Expiry date
          </label>
          <input
            id="expiry-date"
            type="date"
            value={expiryDate}
            onChange={(event) => setExpiryDate(event.target.value)}
            required
            style={styles.input}
          />

          <button type="submit" disabled={saving} style={styles.addButton}>
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
                <div style={styles.itemDetails}>
                  <strong>{item.name}</strong>
                  <span>Expires: {item.expiry_date}</span>
                </div>
                <button
                  type="button"
                  onClick={() => handleDelete(item.id)}
                  style={styles.removeButton}
                >
                  Remove
                </button>
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
    background: "linear-gradient(135deg, #f4f2e8 0%, #fae9ed 100%)",
    padding: "48px 20px",
    fontFamily: "Arial, sans-serif",
    color: "#343b29",
  },
  card: {
    maxWidth: "680px",
    margin: "0 auto",
    background: "#fffdf8",
    padding: "36px",
    borderRadius: "24px",
    border: "1px solid #e9e4d5",
    boxShadow: "0 12px 32px rgba(68, 75, 45, 0.12)",
  },
  title: {
    margin: 0,
    color: "#687443",
    fontSize: "2.5rem",
    textAlign: "center",
  },
  subtitle: {
    marginTop: "8px",
    color: "#77765f",
    textAlign: "center",
  },
  form: {
    display: "grid",
    gap: "12px",
    marginTop: "30px",
  },
  label: {
    color: "#505b36",
    fontWeight: "bold",
  },
  input: {
    boxSizing: "border-box",
    width: "100%",
    padding: "13px 14px",
    border: "1px solid #cbd0ae",
    borderRadius: "10px",
    background: "#ffffff",
    color: "#343b29",
    fontSize: "1rem",
    colorScheme: "light",
  },
  addButton: {
    marginTop: "8px",
    padding: "14px",
    border: "none",
    borderRadius: "10px",
    background: "#687443",
    color: "#ffffff",
    fontSize: "1rem",
    fontWeight: "bold",
    cursor: "pointer",
  },
  message: {
    color: "#586737",
    background: "#f0f2e6",
    padding: "12px",
    borderRadius: "10px",
  },
  heading: {
    marginTop: "34px",
    color: "#505b36",
  },
  list: {
    listStyle: "none",
    padding: 0,
  },
  item: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "16px",
    padding: "15px 0",
    borderBottom: "1px solid #e9e4d5",
  },
  itemDetails: {
    display: "grid",
    gap: "6px",
  },
  removeButton: {
    padding: "9px 13px",
    border: "1px solid #e7bdc7",
    borderRadius: "9px",
    background: "#f8e2e7",
    color: "#763d4d",
    fontWeight: "bold",
    cursor: "pointer",
  },
};
