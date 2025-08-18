import { motion } from "framer-motion";
import WritingPractice from "./WritingPractice.jsx";
import WordMatchPractice from "./WordMatchPractice.jsx";
import PronunciationPractice from "./PronunciationPractice.jsx";

export default function PracticeSlide({ type, onClose }) {
  const getContent = () => {
    switch (type) {
      case "✏️ Luyện Viết":
        return <WritingPractice />;
      case "🧩 Ghép từ":
        return <WordMatchPractice />;
      case "🎤 Phát âm":
        return <PronunciationPractice />;
      default:
        return null;
    }
  };

  return (
    <motion.div
      initial={{ y: "100%" }}
      animate={{ y: 0 }}
      exit={{ y: "100%" }}
      transition={{ type: "tween", duration: 0.5 }}
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        background: "rgba(255,248,235,0.98)",
        zIndex: 999,
        padding: "40px",
        overflowY: "auto",
        boxShadow: "0 0 30px rgba(0,0,0,0.2)",
      }}
    >
      <button
        onClick={onClose}
        style={{
          position: "absolute",
          top: 20,
          right: 20,
          padding: "8px 12px",
          borderRadius: "8px",
          border: "none",
          background: "#b22222",
          color: "#fff",
          cursor: "pointer",
        }}
      >
        ✖ Đóng
      </button>
      {getContent()}
    </motion.div>
  );
}
