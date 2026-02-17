import { useState, FormEvent } from "react";
import "./styles/Book.css";

interface BookingForm {
  name: string;
  email: string;
  phone: string;
  business: string;
  date: string;
  time: string;
  message: string;
}

const timeSlots = [
  "09:00 AM", "09:30 AM", "10:00 AM", "10:30 AM",
  "11:00 AM", "11:30 AM", "12:00 PM", "12:30 PM",
  "01:00 PM", "01:30 PM", "02:00 PM", "02:30 PM",
  "03:00 PM", "03:30 PM", "04:00 PM", "04:30 PM",
  "05:00 PM",
];

const Book = () => {
  const [form, setForm] = useState<BookingForm>({
    name: "",
    email: "",
    phone: "",
    business: "",
    date: "",
    time: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    // For now, just show confirmation. Wire up backend later.
    setSubmitted(true);
  };

  const today = new Date().toISOString().split("T")[0];

  if (submitted) {
    return (
      <div className="book-page">
        <div className="book-container">
          <div className="book-confirmation">
            <div className="book-check">✓</div>
            <h2>Meeting Requested</h2>
            <p>
              Thanks, {form.name}. I'll confirm your {form.time} slot on{" "}
              {new Date(form.date).toLocaleDateString("en-US", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}{" "}
              via email at {form.email}.
            </p>
            <a href="/" className="book-back">
              ← Back to Portfolio
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="book-page">
      <div className="book-container">
        <a href="/" className="book-back-link">
          ← Back
        </a>
        <div className="book-header">
          <h1>Book a Meeting</h1>
          <p className="book-subtitle">
            Let's discuss how I can help your business grow with a custom website,
            app, or digital solution.
          </p>
        </div>

        <form className="book-form" onSubmit={handleSubmit}>
          <div className="book-grid">
            <div className="book-field">
              <label htmlFor="name">Your Name *</label>
              <input
                type="text"
                id="name"
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                placeholder="John Doe"
              />
            </div>
            <div className="book-field">
              <label htmlFor="email">Email *</label>
              <input
                type="email"
                id="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
                placeholder="john@business.com"
              />
            </div>
            <div className="book-field">
              <label htmlFor="phone">Phone</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                placeholder="+1 234 567 8900"
              />
            </div>
            <div className="book-field">
              <label htmlFor="business">Business Name</label>
              <input
                type="text"
                id="business"
                name="business"
                value={form.business}
                onChange={handleChange}
                placeholder="Your Business"
              />
            </div>
            <div className="book-field">
              <label htmlFor="date">Preferred Date *</label>
              <input
                type="date"
                id="date"
                name="date"
                value={form.date}
                onChange={handleChange}
                required
                min={today}
              />
            </div>
            <div className="book-field">
              <label htmlFor="time">Preferred Time *</label>
              <select
                id="time"
                name="time"
                value={form.time}
                onChange={handleChange}
                required
              >
                <option value="">Select a time</option>
                {timeSlots.map((slot) => (
                  <option key={slot} value={slot}>
                    {slot}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="book-field book-full">
            <label htmlFor="message">What do you need help with?</label>
            <textarea
              id="message"
              name="message"
              value={form.message}
              onChange={handleChange}
              rows={4}
              placeholder="Tell me about your project — website, app, redesign, etc."
            />
          </div>
          <button type="submit" className="book-submit">
            Request Meeting
          </button>
        </form>

        <div className="book-footer">
          <p>
            Pranshu Chourasia · Full-Stack Developer & App Development
          </p>
          <p>
            <a href="mailto:me@pranshuchourasia.in">me@pranshuchourasia.in</a>
            {" · "}
            <a href="https://pranshuchourasia.in">pranshuchourasia.in</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Book;
