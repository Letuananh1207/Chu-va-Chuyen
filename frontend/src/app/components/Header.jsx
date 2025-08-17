import { Link } from "react-router-dom";
import logo from "../../assets/logo_ic.png"; // đặt logo vào thư mục src/assets/

export default function Header() {
  return (
    <header className="app-header">
      <div className="container">
        <Link to="/" className="brand">
          <img className="logo" src={logo} alt="logo" />
          <span className="brand-text">Chữ & Chuyện</span>
        </Link>
      </div>
    </header>
  );
}
