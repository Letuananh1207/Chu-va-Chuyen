import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Layout({ children }) {
  const [input, setInput] = useState("");
  const navigate = useNavigate();

  const onSubmit = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    const encoded = encodeURIComponent(input.trim());
    navigate(`/char/${encoded}`);
    setInput("");
  };

  return (
    <div className="app-shell">
      <header className="app-header">
        <div className="container header-inner">
          <Link to="/" className="brand">
            HanziLab
          </Link>
          <nav className="nav">
            <Link to="/">Trang chủ</Link>
          </nav>
          <form
            onSubmit={onSubmit}
            className="quick-search"
            aria-label="Đi tới chữ"
          >
            <input
              placeholder="Nhập Hán tự hoặc ID..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              aria-label="Hán tự hoặc ID"
            />
            <button type="submit">Mở</button>
          </form>
        </div>
      </header>
      <main className="container main-content">{children}</main>
      <footer className="app-footer">
        <div className="container">© {new Date().getFullYear()} HanziLab</div>
      </footer>
    </div>
  );
}
