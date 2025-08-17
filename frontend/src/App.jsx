import { Routes, Route } from "react-router-dom";
import Layout from "./app/components/Layout.jsx";
import HomePage from "./app/routes/HomePage.jsx";
import CharPage from "./app/routes/char/CharPage.jsx";
import NotFound from "./app/routes/NotFound.jsx";

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/char/:id" element={<CharPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Layout>
  );
}
