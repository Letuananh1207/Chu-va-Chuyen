import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import HanziWriterBox from "../../components/HanziWriterBox.jsx";
import PracticeSlide from "../../components/PracticeSlide.jsx";
import { getCharacter } from "../../../lib/api.js";
import styles from "../../../styles/pages/CharPage.module.css";
import { motion, AnimatePresence } from "framer-motion";

export default function CharPage() {
  const { id } = useParams();
  let charId = id;
  try {
    charId = decodeURIComponent(id);
  } catch {}

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activePractice, setActivePractice] = useState(null);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    getCharacter(charId)
      .then((res) => {
        if (isMounted) {
          setData(res);
          setError(null);
        }
      })
      .catch((err) => {
        if (isMounted) setError(err?.message || "Lỗi tải dữ liệu");
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });
    return () => {
      isMounted = false;
    };
  }, [charId]);

  if (loading) return <p>Đang tải...</p>;
  if (error) return <p>Lỗi: {error}</p>;
  if (!data) return <p>Không có dữ liệu.</p>;

  const { character, pinyin, meaning } = data;
  const practiceButtons = ["✏️ Luyện Viết", "🧩 Ghép từ", "🎤 Phát âm"];

  return (
    <motion.section
      className={styles.charPage}
      style={{ position: "relative" }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className={styles.contentGrid}>
        {/* Left Pane */}
        {/* <motion.div className={styles.leftPane}>
          <div className={styles.charSub}>
            <span className="hsk1">HSK 1</span>
            <span className="hsk1">Bài 1</span>
          </div>
          <div className={styles.charBox}>
            <HanziWriterBox character={character || charId} size={140} />
            {pinyin && <div className={styles.pinyin}>{pinyin}</div>}
          </div>
          <div className={styles.vocabBox}>
            <h3>Từ vựng trong bài :</h3>
            <p>
              {character} [{pinyin}] : {meaning}
            </p>
          </div>
        </motion.div> */}

        {/* Right Pane */}
        <motion.div className={styles.rightPane}>
          <h2 className={styles.practiceTitle}>Luyện tập</h2>
          <div className={styles.practiceButtons}>
            {practiceButtons.map((label) => (
              <motion.button
                key={label}
                className={styles.practiceBtn}
                whileHover={{ scale: 1.05 }}
                onClick={() => setActivePractice(label)}
              >
                {label}
              </motion.button>
            ))}
          </div>
        </motion.div>
      </div>

      <div className={styles.navigation}>
        <motion.div whileHover={{ scale: 1.05 }}>
          <Link to="#" className={styles.prevBtn}>
            ⬅ Chữ trước
          </Link>
        </motion.div>
        <motion.div whileHover={{ scale: 1.05 }}>
          <Link to="#" className={styles.nextBtn}>
            Chữ sau ➡
          </Link>
        </motion.div>
      </div>

      {/* Slide toàn bộ nội dung */}
      <AnimatePresence>
        {activePractice && (
          <PracticeSlide
            type={activePractice}
            onClose={() => setActivePractice(null)}
          />
        )}
      </AnimatePresence>
    </motion.section>
  );
}
