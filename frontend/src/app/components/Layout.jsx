import Header from "./Header.jsx";
export default function Layout({ children }) {
  return (
    <div className="app-shell">
      <Header />
      <main className="container main-content">{children}</main>
      <footer className="app-footer">
        <div className="container">
          © {new Date().getFullYear()} Chữ & Chuyện
        </div>
      </footer>
    </div>
  );
}
