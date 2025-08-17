import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

export default function HomePage() {
  const [val, setVal] = useState("你");
  const navigate = useNavigate();

  const go = (e) => {
    e.preventDefault();
    if (!val.trim()) return;
    navigate(`/char/${encodeURIComponent(val.trim())}`);
  };

  return (
    <section>
      <h1>Học theo QR cho từng Hán tự</h1>
      <p>
        Quét mã QR trên flashcard hoặc nhập trực tiếp Hán tự/ID để mở trang
        luyện tập.
      </p>
      <form onSubmit={go} className="home-open">
        <input
          value={val}
          onChange={(e) => setVal(e.target.value)}
          aria-label="Hán tự hoặc ID"
        />
        <button type="submit">Mở trang</button>
      </form>
      <p>
        Thử nhanh: <Link to="/char/%E4%BD%A0">/char/你</Link>
      </p>
    </section>
  );
}
