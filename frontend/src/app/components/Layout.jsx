import Header from "./Header.jsx";
import Footer from "./Footer.jsx";

export default function Layout({ children }) {
  return (
    <div className="app-shell">
      <Header />
      <main className="container main-content">{children}</main>
      <Footer />
    </div>
  );
}
