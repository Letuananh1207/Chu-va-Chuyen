import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import HanziWriterBox from "../../components/HanziWriterBox.jsx";
import { getCharacter } from "../../../lib/api.js";
import styles from "../../../styles/pages/CharPage.module.css";
import { motion } from "framer-motion";

export default function CharPage() {
  const { id } = useParams();
  let charId = id;
  try {
    charId = decodeURIComponent(id);
  } catch {}

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  const {
    character,
    pinyin,
    meaning,
    examples = [],
    prev,
    next,
    exercises = [],
  } = data;

  return (
    <motion.section
      className={styles.charPage}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className={styles.contentGrid}>
        {/* Cột trái */}
        <motion.div
          className={styles.leftPane}
          initial={{ x: -30, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className={styles.charSub}>
            <span className="hsk1">HSK 1</span>
            <span className="hsk1">Bài 1</span>
          </div>
          <div className={styles.charBox}>
            <HanziWriterBox character={character || charId} size={160} />
            {pinyin && <div className={styles.pinyin}>{pinyin}</div>}
          </div>

          <motion.div
            className={styles.vocabBox}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h3>Từ vựng trong bài :</h3>
            <p>
              {character} [{pinyin}] : {meaning}
            </p>
          </motion.div>
        </motion.div>

        {/* Cột phải */}
        <motion.div
          className={styles.rightPane}
          initial={{ x: 30, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className={styles.practiceTitle}>Luyện tập</h2>
          <div className="grow"></div>
          <div className={styles.practiceButtons}>
            {["✏️ Luyện Viết", "🧩 Ghép từ", "🎤 Phát âm"].map((label, i) => (
              <motion.button
                key={i}
                className={styles.practiceBtn}
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 4px 12px rgba(178,34,34,0.3)",
                }}
                whileTap={{ scale: 0.95 }}
              >
                {label}
              </motion.button>
            ))}
          </div>
          <div className="grow"></div>
        </motion.div>
      </div>

      {/* Bài tập */}
      <motion.div
        className={styles.exercises}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        <h2>Bài học :</h2>
        {exercises.length ? (
          <ul className={styles.exerciseList}>
            <motion.li
              key={prev.id}
              className={styles.exerciseItem}
              whileHover={{ scale: 1.02 }}
            >
              <strong>Trước :</strong> {prev.content || "(Nội dung)"}
            </motion.li>
            <motion.li
              key={next.id}
              className={styles.exerciseItem}
              whileHover={{ scale: 1.02 }}
            >
              <strong>Sau :</strong> {next.content || "(Nội dung)"}
            </motion.li>
          </ul>
        ) : (
          <p>(Chưa có bài tập)</p>
        )}
      </motion.div>

      {/* Điều hướng */}
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
    </motion.section>
  );
}
