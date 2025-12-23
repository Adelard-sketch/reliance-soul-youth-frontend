import React, { useEffect, useState } from "react";
import apiClient from "../services/api";
import "./Admin.css";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000";

function Admin() {
  const [view, setView] = useState<"overview" | "bookings" | "contacts" | "donors" | "gallery">("overview");
  const [bookings, setBookings] = useState<any[]>([]);
  const [contacts, setContacts] = useState<any[]>([]);
  const [donors, setDonors] = useState<any[]>([]);
  const [gallery, setGallery] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalBookings: 0,
    totalContacts: 0,
    totalDonors: 0,
    totalDonations: 0,
    galleryItems: 0
  });

  // === Fetch all data for statistics ===
  useEffect(() => {
    const fetchAllData = async () => {
      try {
        const [bookingsRes, contactsRes, donorsRes, galleryRes] = await Promise.all([
          apiClient.get('/api/admin/bookings'),
          apiClient.get('/api/admin/contacts'),
          apiClient.get('/api/admin/donors'),
          apiClient.get('/api/admin/gallery')
        ]);

        setBookings(bookingsRes.data);
        setContacts(contactsRes.data);
        setDonors(donorsRes.data);
        setGallery(galleryRes.data);

        const totalDonations = donorsRes.data.reduce((sum: number, d: any) => sum + (d.amount || 0), 0);

        setStats({
          totalBookings: bookingsRes.data.length,
          totalContacts: contactsRes.data.length,
          totalDonors: donorsRes.data.length,
          totalDonations: totalDonations,
          galleryItems: galleryRes.data.length
        });
      } catch (err) {
        console.error("Error fetching data:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchAllData();
  }, []);

  // === Fetch data when tab changes ===
  useEffect(() => {
    const fetchData = async () => {
      if (view === "overview") return;
      setLoading(true);
      try {
        let url = "";
        switch (view) {
          case "bookings":
            url = `/api/admin/bookings`;
            break;
          case "contacts":
            url = `/api/admin/contacts`;
            break;
          case "donors":
            url = `/api/admin/donors`;
            break;
          case "gallery":
            url = `/api/admin/gallery`;
            break;
        }

        const res = await apiClient.get(url);
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
      await apiClient.delete(`/api/admin/bookings/${id}`);
      setBookings((prev) => prev.filter((b) => b._id !== id));
    } catch (err) {
      console.error("Error deleting booking:", err);
    }
  };

  // Approve booking
  const approveBooking = async (id: string) => {
    if (!window.confirm("Approve this booking?")) return;
    try {
      const res = await apiClient.put(`/api/admin/bookings/${id}/approve`);
      setBookings((prev) => prev.map((b) => (b._id === id ? res.data.booking : b)));
      alert("Booking approved and user notified.");
    } catch (err) {
      console.error("Error approving booking:", err);
      alert("Failed to approve booking");
    }
  };

  // Reject booking
  const rejectBooking = async (id: string) => {
    if (!window.confirm("Reject this booking?")) return;
    try {
      const res = await apiClient.put(`/api/admin/bookings/${id}/reject`);
      setBookings((prev) => prev.map((b) => (b._id === id ? res.data.booking : b)));
      alert("Booking marked rejected and user notified.");
    } catch (err) {
      console.error("Error rejecting booking:", err);
      alert("Failed to reject booking");
    }
  };

  return (
    <div className="admin-container">
      <header className="admin-header">
        <h1>Reliance Soul Internation Youth Foundation Admin Dashboard</h1>
        <p>Welcome back, Admin</p>
      </header>

      <div className="admin-tabs">
        <button className={view === "overview" ? "active" : ""} onClick={() => setView("overview")}>
          Overview
        </button>
        <button className={view === "bookings" ? "active" : ""} onClick={() => setView("bookings")}>
          Bookings
        </button>
        <button className={view === "contacts" ? "active" : ""} onClick={() => setView("contacts")}>
          Contacts
        </button>
        <button className={view === "donors" ? "active" : ""} onClick={() => setView("donors")}>
          Donors
        </button>
        <button className={view === "gallery" ? "active" : ""} onClick={() => setView("gallery")}>
          Gallery
        </button>
      </div>

      {loading && view === "overview" ? (
        <div className="loading">Loading dashboard...</div>
      ) : (
        <div className="admin-content">
          {/* === OVERVIEW === */}
          {view === "overview" && (
            <div className="overview-section">
              <div className="stats-grid">
                <div className="stat-card stat-blue">
                  <div className="stat-accent" />
                  <div className="stat-info">
                    <h3>{stats.totalBookings}</h3>
                    <p>Total Bookings</p>
                  </div>
                </div>
                
                <div className="stat-card stat-green">
                  <div className="stat-accent" />
                  <div className="stat-info">
                    <h3>{stats.totalContacts}</h3>
                    <p>Contact Messages</p>
                  </div>
                </div>
                
                <div className="stat-card stat-purple">
                  <div className="stat-accent" />
                  <div className="stat-info">
                    <h3>{stats.totalDonors}</h3>
                    <p>Total Donors</p>
                  </div>
                </div>
                
                <div className="stat-card stat-orange">
                  <div className="stat-accent" />
                  <div className="stat-info">
                    <h3>${stats.totalDonations.toFixed(2)}</h3>
                    <p>Total Donations</p>
                  </div>
                </div>
                
                <div className="stat-card stat-pink">
                  <div className="stat-accent" />
                  <div className="stat-info">
                    <h3>{stats.galleryItems}</h3>
                    <p>Gallery Items</p>
                  </div>
                </div>
              </div>

              {/* Recent Activity */}
              <div className="recent-section">
                <h2>Recent Bookings</h2>
                <div className="recent-table-container">
                  <table className="recent-table">
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Category</th>
                        <th>Date</th>
                        <th>Time</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {bookings.slice(0, 5).map((b) => (
                        <tr key={b._id}>
                          <td>{b.name}</td>
                          <td><span className="badge">{b.category}</span></td>
                          <td>{b.date}</td>
                          <td>{b.time}</td>
                          <td>
                            <span className={`status-badge status-${b.status || 'pending'}`}>
                              { (b.status || 'pending').toUpperCase() }
                            </span>
                          </td>
                        </tr>
                      ))}
                      {bookings.length === 0 && (
                        <tr><td colSpan={5} style={{textAlign: 'center'}}>No bookings yet</td></tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="recent-section">
                <h2>Recent Donations</h2>
                <div className="recent-table-container">
                  <table className="recent-table">
                    <thead>
                      <tr>
                        <th>Email</th>
                        <th>Amount</th>
                        <th>Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {donors.slice(0, 5).map((d) => (
                        <tr key={d._id}>
                          <td>{d.email || d.donorEmail || "—"}</td>
                          <td className="amount">${(d.amount || 0).toFixed(2)}</td>
                          <td>{new Date(d.createdAt).toLocaleDateString()}</td>
                        </tr>
                      ))}
                      {donors.length === 0 && (
                        <tr><td colSpan={3} style={{textAlign: 'center'}}>No donations yet</td></tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* === BOOKINGS === */}
          {view === "bookings" && (
            loading ? <div className="loading">Loading bookings...</div> : (
            <>
              <div className="section-header">
                <h2>All Bookings ({bookings.length})</h2>
              </div>
              <div className="table-container">
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
                        <td><strong>{b.name}</strong></td>
                        <td>{b.email}</td>
                        <td><span className="badge">{b.category}</span></td>
                        <td>{b.date}</td>
                        <td>{b.time}</td>
                        <td>{b.duration}h</td>
                        <td>{b.phone}</td>
                        <td className="notes-cell">{b.notes}</td>
                        <td>
                          <div style={{display: 'flex', gap: 8}}>
                            {b.status !== 'approved' && (
                              <button className="approve-btn" onClick={() => approveBooking(b._id)}>Approve</button>
                            )}
                            {b.status !== 'rejected' && (
                              <button className="reject-btn" onClick={() => rejectBooking(b._id)}>Reject</button>
                            )}
                            <button className="delete-btn" onClick={() => deleteBooking(b._id)} aria-label="Delete booking">Delete</button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr><td colSpan={9} style={{textAlign: 'center'}}>No bookings found</td></tr>
                  )}
                </tbody>
              </table>
            </div>
            </>
          ))}

          {/* === CONTACTS === */}
          {view === "contacts" && (
            loading ? <div className="loading">Loading contacts...</div> : (
            <>
              <div className="section-header">
                <h2>Contact Messages ({contacts.length})</h2>
              </div>
              <div className="table-container">
                <table>
                  <thead>
                    <tr><th>Name</th><th>Email</th><th>Subject</th><th>Message</th><th>Date</th></tr>
                  </thead>
                  <tbody>
                    {contacts.length > 0 ? (
                      contacts.map((c) => (
                        <tr key={c._id}>
                          <td><strong>{c.name}</strong></td>
                          <td>{c.email}</td>
                          <td><strong>{c.subject}</strong></td>
                          <td className="message-cell">{c.message}</td>
                          <td>{new Date(c.createdAt).toLocaleDateString()}</td>
                        </tr>
                      ))
                    ) : (
                      <tr><td colSpan={5} style={{textAlign: 'center'}}>No contacts yet</td></tr>
                    )}
                  </tbody>
                </table>
              </div>
            </>
            )
          )}

          {/* === DONORS === */}
          {view === "donors" && (
            loading ? <div className="loading">Loading donors...</div> : (
            <>
              <div className="section-header">
                <h2>Donation History ({donors.length})</h2>
              </div>
              <div className="table-container">
                <table>
                  <thead><tr><th>Email</th><th>Amount (USD)</th><th>Date</th></tr></thead>
                  <tbody>
                      {donors.length > 0 ? (
                      donors.map((d) => (
                        <tr key={d._id}>
                          <td>{d.email || d.donorEmail || "—"}</td>
                          <td className="amount"><strong>${(d.amount || 0).toFixed(2)}</strong></td>
                          <td>{new Date(d.createdAt).toLocaleDateString()}</td>
                        </tr>
                      ))
                    ) : (
                      <tr><td colSpan={3} style={{textAlign: 'center'}}>No donations yet</td></tr>
                    )}
                  </tbody>
                </table>
              </div>
            </>
            )
          )}

          {/* === GALLERY === */}
          {view === "gallery" && (
            loading ? <div className="loading">Loading gallery...</div> : (
            <div className="gallery-admin">
              <form
                className="upload-form"
                onSubmit={async (e: React.FormEvent<HTMLFormElement>) => {
                  e.preventDefault();
                  const form = e.currentTarget;
                  const formData = new FormData(form);
                  try {
                    await apiClient.post('/api/admin/gallery/upload', formData, {
                      headers: { 'Content-Type': 'multipart/form-data' }
                    });
                    const res = await apiClient.get('/api/admin/gallery');
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
                        <video controls src={item.mediaUrl && (item.mediaUrl.startsWith('http') || item.mediaUrl.startsWith('https')) ? item.mediaUrl : `${API_BASE}${item.mediaUrl}`} />
                      ) : (
                        <img src={item.mediaUrl && (item.mediaUrl.startsWith('http') || item.mediaUrl.startsWith('https')) ? item.mediaUrl : `${API_BASE}${item.mediaUrl}`} alt={item.title} />
                      )}
                      <h4>{item.title}</h4>
                      <p>{item.caption}</p>
                      <button
                        className="delete-btn"
                        onClick={async () => {
                          if (window.confirm("Delete this item?")) {
                            await apiClient.delete(`/api/admin/gallery/${item._id}`);
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
            )
          )}
        </div>
      )}
    </div>
  );
}

export default Admin;
