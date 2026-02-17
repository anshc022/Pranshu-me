import { useState, FormEvent } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../lib/supabase";
import bookingHero from "../assets/booking-hero.svg";
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
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
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

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!selectedSlot) {
      setError("Please select a time slot.");
      return;
    }

    setSubmitting(true);
    setError(null);

    const { error: insertError } = await supabase.from("bookings").insert({
      name: formData.name,
      email: formData.email,
      phone: formData.phone || null,
      business_name: formData.business || null,
      preferred_date: formData.date,
      preferred_time: selectedSlot,
      message: formData.message || null,
    });

    setSubmitting(false);

    if (insertError) {
      console.error("Booking error:", insertError);
      setError("Something went wrong. Please try again or email directly.");
      return;
    }

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

      <div className="booking-hero">
        <img src={bookingHero} alt="Booking illustration" />
      </div>

      <div className="booking-container">
        {!submitted ? (
          <>
            <div className="booking-badge">
              <span className="dot"></span>
              Available for Projects
            </div>
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

              {error && (
                <p style={{ color: "#ff4444", marginBottom: "1rem", textAlign: "center" }}>
                  {error}
                </p>
              )}

              <button type="submit" className="booking-submit" disabled={submitting}>
                {submitting ? "Submitting..." : "Book Consultation"}
              </button>

              <a
                href="https://wa.me/918789520648"
                target="_blank"
                rel="noopener noreferrer"
                className="whatsapp-link"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                Or chat on WhatsApp
              </a>
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
            <a
              href="https://wa.me/918789520648"
              target="_blank"
              rel="noopener noreferrer"
              className="whatsapp-link confirmation-whatsapp"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              Chat on WhatsApp
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default Booking;
