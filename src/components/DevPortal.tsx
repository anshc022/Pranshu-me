import { useState, useCallback } from "react";
import { Link } from "react-router-dom";
import "./styles/DevPortal.css";

const API = "https://ai.pranshuchourasia.in";

export default function DevPortal() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [apiKey, setApiKey] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState("");

  const copy = useCallback((text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(""), 2000);
  }, []);

  const register = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setApiKey("");
    setLoading(true);
    try {
      const res = await fetch(`${API}/api/dev/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Registration failed");
      setApiKey(data.apiKey);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const curlExample = `curl -X POST ${API}/api/v1/chat \\
  -H "Content-Type: application/json" \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -d '{
    "messages": [
      { "role": "user", "content": "Hello!" }
    ],
    "stream": false
  }'`;

  const jsExample = `const response = await fetch("${API}/api/v1/chat", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "Authorization": "Bearer YOUR_API_KEY"
  },
  body: JSON.stringify({
    messages: [{ role: "user", content: "Hello!" }],
    stream: false
  })
});
const data = await response.json();
console.log(data.message.content);`;

  const pyExample = `import requests

response = requests.post(
    "${API}/api/v1/chat",
    headers={
        "Content-Type": "application/json",
        "Authorization": "Bearer YOUR_API_KEY"
    },
    json={
        "messages": [{"role": "user", "content": "Hello!"}],
        "stream": False
    }
)
print(response.json()["message"]["content"])`;

  return (
    <div className="dev-page">
      {/* Header */}
      <header className="dev-header">
        <Link to="/">← Back</Link>
        <div className="dev-header-right">
          <Link to="/ai">Try Nebula AI</Link>
        </div>
      </header>

      <div className="dev-container">
        {/* Title */}
        <h1>
          Nebula <span>API</span>
        </h1>
        <p className="dev-subtitle">
          Access Nebula AI programmatically. Generate an API key, integrate into
          your apps, and build on top of a powerful LLM — all for free.
        </p>

        {/* Feature cards */}
        <div className="dev-grid">
          <div className="dev-card">
            <div className="dev-card-icon">⚡</div>
            <h3>Fast Inference</h3>
            <p>GPU-accelerated responses powered by NVIDIA A10G with low latency streaming.</p>
          </div>
          <div className="dev-card">
            <div className="dev-card-icon">🔑</div>
            <h3>Simple Auth</h3>
            <p>Bearer token authentication. One key, instant access. No OAuth complexity.</p>
          </div>
          <div className="dev-card">
            <div className="dev-card-icon">📡</div>
            <h3>Streaming</h3>
            <p>Real-time token streaming with Server-Sent Events for responsive UIs.</p>
          </div>
          <div className="dev-card">
            <div className="dev-card-icon">🛡️</div>
            <h3>Rate Limiting</h3>
            <p>60 requests per minute per key. Fair usage for all developers.</p>
          </div>
        </div>

        {/* Registration */}
        <section className="dev-section">
          <h2>Get Your API Key</h2>
          <form className="dev-form" onSubmit={register}>
            <div className="dev-form-group">
              <label>Name</label>
              <input
                type="text"
                placeholder="Your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="dev-form-group">
              <label>Email</label>
              <input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            {error && <div className="dev-error">{error}</div>}

            {apiKey && (
              <div className="key-result">
                <h3>Your API Key</h3>
                <div className="key-display">
                  <code>{apiKey}</code>
                  <button
                    type="button"
                    className="copy-btn"
                    onClick={() => copy(apiKey, "key")}
                  >
                    {copied === "key" ? "Copied!" : "Copy"}
                  </button>
                </div>
                <p className="key-warning">
                  <strong>Save this key now.</strong> It won't be shown again in
                  full. You can regenerate a new key at any time by registering
                  with the same email.
                </p>
              </div>
            )}

            <button
              type="submit"
              className="dev-submit"
              disabled={loading || !name || !email}
            >
              {loading ? "Generating..." : "Generate API Key"}
            </button>
          </form>
        </section>

        {/* Documentation */}
        <section className="dev-docs">
          <h2>Quick Start</h2>

          {/* cURL */}
          <div className="code-block">
            <div className="code-header">
              <span className="code-lang">cURL</span>
              <button
                className="code-copy"
                onClick={() => copy(curlExample, "curl")}
              >
                {copied === "curl" ? "Copied!" : "Copy"}
              </button>
            </div>
            <div className="code-body">
              <pre>{curlExample}</pre>
            </div>
          </div>

          {/* JavaScript */}
          <div className="code-block">
            <div className="code-header">
              <span className="code-lang">JavaScript</span>
              <button
                className="code-copy"
                onClick={() => copy(jsExample, "js")}
              >
                {copied === "js" ? "Copied!" : "Copy"}
              </button>
            </div>
            <div className="code-body">
              <pre>{jsExample}</pre>
            </div>
          </div>

          {/* Python */}
          <div className="code-block">
            <div className="code-header">
              <span className="code-lang">Python</span>
              <button
                className="code-copy"
                onClick={() => copy(pyExample, "py")}
              >
                {copied === "py" ? "Copied!" : "Copy"}
              </button>
            </div>
            <div className="code-body">
              <pre>{pyExample}</pre>
            </div>
          </div>

          {/* API Info */}
          <div className="api-info">
            <div className="api-info-card">
              <h4>Base URL</h4>
              <p><code>{API}/api/v1</code></p>
            </div>
            <div className="api-info-card">
              <h4>Model</h4>
              <p><code>mistral:latest</code></p>
            </div>
            <div className="api-info-card">
              <h4>Rate Limit</h4>
              <p>60 requests / minute</p>
            </div>
            <div className="api-info-card">
              <h4>Auth</h4>
              <p><code>Bearer &lt;api_key&gt;</code></p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
