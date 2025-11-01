import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Admin.css";

function Admin() {
  const [view, setView] = useState("bookings");
  const [bookings, setBookings] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [donors, setDonors] = useState([]);
  const [gallery, setGallery] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        if (view === "bookings") {
          const res = await axios.get("http://localhost:5000/api/admin/bookings");
          setBookings(res.data);
        } else if (view === "contacts") {
          const res = await axios.get("http://localhost:5000/api/admin/contacts");
          setContacts(res.data);
        } else if (view === "donors") {
          const res = await axios.get("http://localhost:5000/api/admin/donors");
          setDonors(res.data);
        } else if (view === "gallery") {
          const res = await axios.get("http://localhost:5000/api/admin/gallery");
          setGallery(res.data);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [view]);

  const deleteBooking = async (id) => {
    if (!window.confirm("Are you sure you want to delete this booking?")) return;
    await axios.delete(`http://localhost:5000/api/admin/bookings/${id}`);
    setBookings(bookings.filter((b) => b._id !== id));
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
          {view === "bookings" && (
            <table>
              <thead>
                <tr>
                  <th>Name</th><th>Email</th><th>Category</th><th>Date</th>
                  <th>Time</th><th>Duration</th><th>Phone</th><th>Notes</th><th>Action</th>
                </tr>
              </thead>
              <tbody>
                {bookings.map((b) => (
                  <tr key={b._id}>
                    <td>{b.name}</td><td>{b.email}</td><td>{b.category}</td>
                    <td>{b.date}</td><td>{b.time}</td><td>{b.duration}</td>
                    <td>{b.phone}</td><td>{b.notes}</td>
                    <td><button className="delete-btn" onClick={() => deleteBooking(b._id)}>Delete</button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {view === "contacts" && (
            <table>
              <thead><tr><th>Name</th><th>Email</th><th>Subject</th><th>Message</th><th>Date</th></tr></thead>
              <tbody>
                {contacts.length > 0 ? (
                  contacts.map((c) => (
                    <tr key={c._id}>
                      <td>{c.name}</td><td>{c.email}</td><td>{c.subject}</td>
                      <td>{c.message}</td><td>{new Date(c.createdAt).toLocaleDateString()}</td>
                    </tr>
                  ))
                ) : (
                  <tr><td colSpan={5}>No contacts yet</td></tr>
                )}
              </tbody>
            </table>
          )}

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

          {view === "gallery" && (
            <div className="gallery-admin">
              <form
                className="upload-form"
                onSubmit={async (e) => {
                  e.preventDefault();
                  const formData = new FormData();
                  formData.append("title", e.target.title.value);
                  formData.append("caption", e.target.caption.value);
                  formData.append("media", e.target.media.files[0]);
                  await axios.post("http://localhost:5000/api/admin/gallery/upload", formData);
                  const res = await axios.get("http://localhost:5000/api/admin/gallery");
                  setGallery(res.data);
                  e.target.reset();
                }}
              >
                <h3>Upload New Media</h3>
                <input type="text" name="title" placeholder="Title" required />
                <textarea name="caption" placeholder="Short caption..." maxLength={150} />
                <input type="file" name="media" accept="image/*,video/mp4" required />
                <button type="submit">Upload</button>
              </form>

              <div className="gallery-grid">
                {gallery.map((item) => (
                  <div className="gallery-card" key={item._id}>
                    {item.mediaType === "video" ? (
                      <video controls src={`http://localhost:5000${item.mediaUrl}`} />
                    ) : (
                      <img src={`http://localhost:5000${item.mediaUrl}`} alt={item.title} />
                    )}
                    <h4>{item.title}</h4>
                    <p>{item.caption}</p>
                    <button
                      className="delete-btn"
                      onClick={async () => {
                        if (window.confirm("Delete this item?")) {
                          await axios.delete(`http://localhost:5000/api/admin/gallery/${item._id}`);
                          setGallery(gallery.filter((g) => g._id !== item._id));
                        }
                      }}
                    >
                      Delete
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Admin;
