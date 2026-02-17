import { useState, FormEvent } from "react";
import { Link } from "react-router-dom";
import "./styles/Booking.css";

const TIME_SLOTS = [
  "09:00 AM",
  "10:00 AM",
  "11:00 AM",
  "12:00 PM",
  "02:00 PM",
  "03:00 PM",
  "04:00 PM",
  "05:00 PM",
];

const Booking = () => {
  const [submitted, setSubmitted] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    business: "",
    date: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  // Get tomorrow as min date
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minDate = tomorrow.toISOString().split("T")[0];

  return (
    <div className="booking-page">
      <div className="booking-header">
        <Link to="/" style={{ display: "flex", alignItems: "center" }}>
          <svg
            width="38"
            height="38"
            viewBox="0 0 120 120"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect x="3" y="3" width="114" height="114" rx="24" stroke="white" strokeWidth="3" />
            <line x1="28" y1="30" x2="28" y2="90" stroke="white" strokeWidth="6" strokeLinecap="round" />
            <path d="M28 30 L52 30 C64 30 64 54 52 54 L28 54" stroke="white" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" fill="none" />
            <path d="M92 38 C78 24 58 28 56 48 C54 68 74 78 92 64" stroke="white" strokeWidth="6" strokeLinecap="round" fill="none" />
            <line x1="52" y1="82" x2="68" y2="38" stroke="rgba(255,255,255,0.25)" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </Link>
        <Link to="/">← BACK TO PORTFOLIO</Link>
      </div>

      <div className="booking-container">
        {!submitted ? (
          <>
            <h1>
              Book a <span>Free</span>
              <br />
              Consultation
            </h1>
            <p className="booking-pitch">
              Looking to build a web application, mobile app, or AI-powered
              platform? I specialize in full-stack development with React,
              Next.js, Django, and modern cloud technologies. Let's discuss your
              project and bring your vision to life — from concept to
              production-ready deployment.
            </p>

            <form className="booking-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Name *</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your full name"
                  required
                />
              </div>
              <div className="form-group">
                <label>Email *</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  required
                />
              </div>
              <div className="form-group">
                <label>Phone</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+91 XXXXX XXXXX"
                />
              </div>
              <div className="form-group">
                <label>Business Name</label>
                <input
                  type="text"
                  name="business"
                  value={formData.business}
                  onChange={handleChange}
                  placeholder="Your company or project"
                />
              </div>

              <div className="booking-schedule">
                <h3>Schedule a Meeting</h3>
                <div className="schedule-grid">
                  <div className="form-group">
                    <label>Preferred Date *</label>
                    <input
                      type="date"
                      name="date"
                      value={formData.date}
                      onChange={handleChange}
                      min={minDate}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Preferred Time *</label>
                    <div className="time-slots">
                      {TIME_SLOTS.map((slot) => (
                        <button
                          type="button"
                          key={slot}
                          className={`time-slot ${selectedSlot === slot ? "selected" : ""}`}
                          onClick={() => setSelectedSlot(slot)}
                        >
                          {slot}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="form-group full-width">
                <label>Message</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell me about your project, goals, and timeline..."
                />
              </div>

              <button type="submit" className="booking-submit">
                Book Consultation
              </button>
            </form>
          </>
        ) : (
          <div className="booking-confirmation">
            <svg
              width="64"
              height="64"
              viewBox="0 0 64 64"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="32" cy="32" r="30" stroke="var(--accentColor)" strokeWidth="2" />
              <path
                d="M20 32L28 40L44 24"
                stroke="var(--accentColor)"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <h2>
              <span>Confirmed!</span>
            </h2>
            <p>
              Thanks, {formData.name}! Your consultation request has been
              submitted.
              <br />
              I'll reach out to {formData.email} within 24 hours to confirm
              your {selectedSlot && `${selectedSlot} `}appointment
              {formData.date && ` on ${new Date(formData.date).toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })}`}.
            </p>
            <Link to="/" className="back-link">
              ← Back to Portfolio
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Booking;
