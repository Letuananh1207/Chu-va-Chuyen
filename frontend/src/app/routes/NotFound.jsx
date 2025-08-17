import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <section>
      <h1>404</h1>
      <p>Không tìm thấy trang.</p>
      <p>
        <Link to="/">Về trang chủ</Link>
      </p>
    </section>
  );
}
