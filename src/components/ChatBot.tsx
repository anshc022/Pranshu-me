import { useState, useRef, useEffect, KeyboardEvent, ChangeEvent } from "react";
import { Link } from "react-router-dom";
import "./styles/ChatBot.css";

const API_URL = "https://ai.pranshuchourasia.in";
const MODEL = "mistral:latest";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const SUGGESTIONS = [
  { icon: "💡", text: "Explain quantum computing simply" },
  { icon: "✍️", text: "Write a poem about the stars" },
  { icon: "💻", text: "Help me debug my Python code" },
  { icon: "🧠", text: "What's the meaning of life?" },
];

const ChatBot = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [generating, setGenerating] = useState(false);
  const [status, setStatus] = useState("Connecting...");
  const chatRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const abortRef = useRef<AbortController | null>(null);

  useEffect(() => {
    // Check API health
    fetch(`${API_URL}/api/tags`)
      .then((r) => r.json())
      .then((d) => {
        if (d.models?.length) setStatus(`${d.models[0].name} · Online`);
        else setStatus("No model available");
      })
      .catch(() => setStatus("Offline"));

    inputRef.current?.focus();
  }, []);

  const scroll = () => {
    setTimeout(() => {
      chatRef.current?.scrollTo({ top: chatRef.current.scrollHeight, behavior: "smooth" });
    }, 10);
  };

  const autoResize = (el: HTMLTextAreaElement) => {
    el.style.height = "auto";
    el.style.height = Math.min(el.scrollHeight, 160) + "px";
  };

  const handleKey = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const handleInput = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
    autoResize(e.target);
  };

  const useSuggestion = (text: string) => {
    setInput(text);
    // Small delay then send
    setTimeout(() => {
      sendWithText(text);
    }, 100);
  };

  const sendWithText = async (text: string) => {
    if (!text.trim() || generating) return;

    const userMsg: Message = { role: "user", content: text.trim() };
    const newMsgs = [...messages, userMsg];
    setMessages(newMsgs);
    setInput("");
    if (inputRef.current) inputRef.current.style.height = "auto";
    scroll();

    setGenerating(true);
    setStatus(`Thinking...`);

    // Add placeholder for assistant
    const assistantMsg: Message = { role: "assistant", content: "" };
    setMessages([...newMsgs, assistantMsg]);
    scroll();

    try {
      const controller = new AbortController();
      abortRef.current = controller;

      const r = await fetch(`${API_URL}/api/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: MODEL,
          messages: newMsgs.map((m) => ({ role: m.role, content: m.content })),
        }),
        signal: controller.signal,
      });

      const reader = r.body!.getReader();
      const decoder = new TextDecoder();
      let full = "";
      let buf = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        buf += decoder.decode(value, { stream: true });
        const lines = buf.split("\n");
        buf = lines.pop() || "";
        for (const line of lines) {
          if (!line.trim()) continue;
          try {
            const j = JSON.parse(line);
            if (j.message?.content) {
              full += j.message.content;
              setMessages((prev) => {
                const updated = [...prev];
                updated[updated.length - 1] = { role: "assistant", content: full };
                return updated;
              });
              scroll();
            }
          } catch {
            // skip malformed
          }
        }
      }
      // Process remaining buffer
      if (buf.trim()) {
        try {
          const j = JSON.parse(buf);
          if (j.message?.content) {
            full += j.message.content;
            setMessages((prev) => {
              const updated = [...prev];
              updated[updated.length - 1] = { role: "assistant", content: full };
              return updated;
            });
          }
        } catch {
          // ignore
        }
      }

      setStatus(`${MODEL} · Online`);
    } catch (err: unknown) {
      if (err instanceof Error && err.name === "AbortError") {
        setStatus("Cancelled");
      } else {
        setMessages((prev) => {
          const updated = [...prev];
          updated[updated.length - 1] = {
            role: "assistant",
            content: "⚠ Failed to connect. Please try again.",
          };
          return updated;
        });
        setStatus("Connection failed");
      }
    }

    setGenerating(false);
    abortRef.current = null;
    inputRef.current?.focus();
    scroll();
  };

  const sendMessage = () => sendWithText(input);

  const clearChat = () => {
    setMessages([]);
    setStatus(`${MODEL} · Online`);
    inputRef.current?.focus();
  };

  const escapeHtml = (t: string) => {
    const d = document.createElement("div");
    d.textContent = t;
    return d.innerHTML;
  };

  return (
    <div className="chat-page">
      {/* Header */}
      <div className="chat-header">
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

        <div className="chat-header-right">
          <div className="model-badge">
            <span className="dot"></span>
            <span>Nebula AI</span>
          </div>
          {messages.length > 0 && (
            <button className="clear-btn" onClick={clearChat}>
              Clear
            </button>
          )}
          <Link to="/">← BACK</Link>
        </div>
      </div>

      {/* Chat Body */}
      <div className="chat-body" ref={chatRef}>
        <div className="chat-messages">
          {messages.length === 0 ? (
            <div className="chat-welcome">
              <div className="welcome-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="var(--accentColor)" strokeWidth="1.5">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" />
                  <path d="M8 14s1.5 2 4 2 4-2 4-2" strokeLinecap="round" />
                  <circle cx="9" cy="10" r="1" fill="var(--accentColor)" stroke="none" />
                  <circle cx="15" cy="10" r="1" fill="var(--accentColor)" stroke="none" />
                </svg>
              </div>
              <h1>
                <span>Nebula</span> AI
              </h1>
              <p>
                Your private AI assistant — powered by Mistral on a dedicated
                GPU server. Fast, free, and no data collection. Ask anything.
              </p>
              <div className="suggestion-cards">
                {SUGGESTIONS.map((s, i) => (
                  <button
                    key={i}
                    className="suggestion-card"
                    onClick={() => useSuggestion(s.text)}
                  >
                    <span className="sc-icon">{s.icon}</span>
                    <span className="sc-text">{s.text}</span>
                  </button>
                ))}
              </div>
            </div>
          ) : (
            messages.map((msg, i) => (
              <div key={i} className={`msg-row ${msg.role}`}>
                <div className="msg-avatar">
                  {msg.role === "user" ? "👤" : "✦"}
                </div>
                <div className="msg-body">
                  <div className="msg-name">
                    {msg.role === "user" ? "You" : "Nebula"}
                  </div>
                  <div className="msg-bubble">
                    {msg.role === "assistant" && msg.content === "" ? (
                      <div className="thinking-dots">
                        <span></span>
                        <span></span>
                        <span></span>
                      </div>
                    ) : (
                      <span
                        dangerouslySetInnerHTML={{
                          __html: escapeHtml(msg.content),
                        }}
                      />
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Input */}
      <div className="chat-input-area">
        <div className="chat-input-wrap">
          <textarea
            ref={inputRef}
            className="chat-input"
            placeholder="Ask Nebula anything..."
            rows={1}
            value={input}
            onChange={handleInput}
            onKeyDown={handleKey}
          />
          <button
            className="send-btn"
            onClick={sendMessage}
            disabled={generating || !input.trim()}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M22 2L11 13" />
              <path d="M22 2L15 22L11 13L2 9L22 2Z" />
            </svg>
          </button>
        </div>
        <div className="chat-status">{status}</div>
      </div>
    </div>
  );
};

export default ChatBot;
