import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Admin.css";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000";

function Admin() {
  const [view, setView] = useState<"bookings" | "contacts" | "donors" | "gallery">("bookings");
  const [bookings, setBookings] = useState<any[]>([]);
  const [contacts, setContacts] = useState<any[]>([]);
  const [donors, setDonors] = useState<any[]>([]);
  const [gallery, setGallery] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // === Fetch data when tab changes ===
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        let url = "";
        switch (view) {
          case "bookings":
            url = `${API_BASE}/api/admin/bookings`;
            break;
          case "contacts":
            url = `${API_BASE}/api/admin/contacts`;
            break;
          case "donors":
            url = `${API_BASE}/api/admin/donors`;
            break;
          case "gallery":
            url = `${API_BASE}/api/admin/gallery`;
            break;
        }

        const res = await axios.get(url);
        if (view === "bookings") setBookings(res.data);
        if (view === "contacts") setContacts(res.data);
        if (view === "donors") setDonors(res.data);
        if (view === "gallery") setGallery(res.data);
      } catch (err) {
        console.error("Error fetching data:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [view]);

  // === Delete booking ===
  const deleteBooking = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this booking?")) return;
    try {
      await axios.delete(`${API_BASE}/api/admin/bookings/${id}`);
      setBookings((prev) => prev.filter((b) => b._id !== id));
    } catch (err) {
      console.error("Error deleting booking:", err);
    }
  };

  return (
    <div className="admin-container">
      <header className="admin-header">
        <h1>Reliance Studios Admin Dashboard</h1>
        <p>Welcome back, Admin 👋</p>
      </header>

      <div className="admin-tabs">
        <button className={view === "bookings" ? "active" : ""} onClick={() => setView("bookings")}>
          🎙️ Bookings
        </button>
        <button className={view === "contacts" ? "active" : ""} onClick={() => setView("contacts")}>
          💌 Contacts
        </button>
        <button className={view === "donors" ? "active" : ""} onClick={() => setView("donors")}>
          ❤️ Donors
        </button>
        <button className={view === "gallery" ? "active" : ""} onClick={() => setView("gallery")}>
          📸 Gallery
        </button>
      </div>

      {loading ? (
        <div className="loading">Loading {view}...</div>
      ) : (
        <div className="admin-content">
          {/* === BOOKINGS === */}
          {view === "bookings" && (
            <table>
              <thead>
                <tr>
                  <th>Name</th><th>Email</th><th>Category</th><th>Date</th>
                  <th>Time</th><th>Duration</th><th>Phone</th><th>Notes</th><th>Action</th>
                </tr>
              </thead>
              <tbody>
                {bookings.length > 0 ? (
                  bookings.map((b) => (
                    <tr key={b._id}>
                      <td>{b.name}</td>
                      <td>{b.email}</td>
                      <td>{b.category}</td>
                      <td>{b.date}</td>
                      <td>{b.time}</td>
                      <td>{b.duration}</td>
                      <td>{b.phone}</td>
                      <td>{b.notes}</td>
                      <td>
                        <button className="delete-btn" onClick={() => deleteBooking(b._id)}>
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr><td colSpan={9}>No bookings found</td></tr>
                )}
              </tbody>
            </table>
          )}

          {/* === CONTACTS === */}
          {view === "contacts" && (
            <table>
              <thead>
                <tr><th>Name</th><th>Email</th><th>Subject</th><th>Message</th><th>Date</th></tr>
              </thead>
              <tbody>
                {contacts.length > 0 ? (
                  contacts.map((c) => (
                    <tr key={c._id}>
                      <td>{c.name}</td>
                      <td>{c.email}</td>
                      <td>{c.subject}</td>
                      <td>{c.message}</td>
                      <td>{new Date(c.createdAt).toLocaleDateString()}</td>
                    </tr>
                  ))
                ) : (
                  <tr><td colSpan={5}>No contacts yet</td></tr>
                )}
              </tbody>
            </table>
          )}

          {/* === DONORS === */}
          {view === "donors" && (
            <table>
              <thead><tr><th>Email</th><th>Amount (USD)</th><th>Date</th></tr></thead>
              <tbody>
                {donors.length > 0 ? (
                  donors.map((d) => (
                    <tr key={d._id}>
                      <td>{d.donorEmail}</td>
                      <td>${(d.amount / 100).toFixed(2)}</td>
                      <td>{new Date(d.createdAt).toLocaleDateString()}</td>
                    </tr>
                  ))
                ) : (
                  <tr><td colSpan={3}>No donations yet</td></tr>
                )}
              </tbody>
            </table>
          )}

          {/* === GALLERY === */}
          {view === "gallery" && (
            <div className="gallery-admin">
              <form
                className="upload-form"
                onSubmit={async (e: React.FormEvent<HTMLFormElement>) => {
                  e.preventDefault();
                  const form = e.currentTarget;
                  const formData = new FormData(form);
                  try {
                    await axios.post(`${API_BASE}/api/admin/gallery/upload`, formData);
                    const res = await axios.get(`${API_BASE}/api/admin/gallery`);
                    setGallery(res.data);
                    form.reset();
                  } catch (err) {
                    console.error("Error uploading:", err);
                  }
                }}
              >
                <h3>Upload New Media</h3>
                <input type="text" name="title" placeholder="Title" required />
                <textarea name="caption" placeholder="Short caption..." maxLength={150} />
                <input type="file" name="media" accept="image/*,video/mp4" required />
                <button type="submit">Upload</button>
              </form>

              <div className="gallery-grid">
                {gallery.length > 0 ? (
                  gallery.map((item) => (
                    <div className="gallery-card" key={item._id}>
                      {item.mediaType === "video" ? (
                        <video controls src={`${API_BASE}${item.mediaUrl}`} />
                      ) : (
                        <img src={`${API_BASE}${item.mediaUrl}`} alt={item.title} />
                      )}
                      <h4>{item.title}</h4>
                      <p>{item.caption}</p>
                      <button
                        className="delete-btn"
                        onClick={async () => {
                          if (window.confirm("Delete this item?")) {
                            await axios.delete(`${API_BASE}/api/admin/gallery/${item._id}`);
                            setGallery((prev) => prev.filter((g) => g._id !== item._id));
                          }
                        }}
                      >
                        Delete
                      </button>
                    </div>
                  ))
                ) : (
                  <p>No media uploaded yet.</p>
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Admin;
