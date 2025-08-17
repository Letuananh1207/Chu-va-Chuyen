import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import HanziWriterBox from "../../components/HanziWriterBox.jsx";
import { getCharacter } from "../../../lib/api.js";

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

  const { character, pinyin, meaning, examples = [], exercises = [] } = data;

  return (
    <section className="char-page">
      <header className="char-header">
        <h1 className="char-symbol">{character || charId}</h1>
        <div className="char-meta">
          {pinyin && (
            <div>
              <strong>Âm đọc:</strong> {pinyin}
            </div>
          )}
          {meaning && (
            <div>
              <strong>Nghĩa:</strong> {meaning}
            </div>
          )}
        </div>
      </header>

      <div className="char-grid">
        <div>
          <h2>Luyện viết</h2>
          <HanziWriterBox character={character || charId} size={220} />
        </div>

        <div>
          <h2>Ví dụ</h2>
          {examples.length ? (
            <ul>
              {examples.map((ex, idx) => (
                <li key={idx}>{ex}</li>
              ))}
            </ul>
          ) : (
            <p>(Chưa có ví dụ)</p>
          )}
        </div>
      </div>

      <div className="exercises">
        <h2>Bài tập</h2>
        {exercises.length ? (
          <ul className="exercise-list">
            {exercises.map((ex) => (
              <li key={ex.id} className="exercise-item">
                <strong>{ex.type.toUpperCase()}</strong>:{" "}
                {ex.question || ex.prompt || "(Nội dung)"}
              </li>
            ))}
          </ul>
        ) : (
          <p>(Chưa có bài tập)</p>
        )}
      </div>
    </section>
  );
}
