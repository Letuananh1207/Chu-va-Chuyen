import { useEffect, useRef } from "react";
import HanziWriter from "hanzi-writer";
import styles from "../../styles/components/WritingPractice.module.css";

export default function WritingPractice() {
  const containerRef = useRef(null);
  const writerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const writer = HanziWriter.create(containerRef.current, "永", {
      width: 250,
      height: 250,
      padding: 5,
      showOutline: true,
      showCharacter: true,
      showHintAfterMisses: 1,
      strokeAnimationSpeed: 1,
      drawingWidth: 8, // 🔹 tăng độ dày nét vẽ (mặc định khoảng 4)
      strokeColor: "#000", // màu nét khi vẽ
    });

    writer.loopCharacterAnimation();
    writerRef.current = writer;

    return () => {
      writer.hideCharacter();
    };
  }, []);

  const handleReplay = () => {
    writerRef.current?.animateCharacter();
  };

  const handleReset = () => {
    writerRef.current?.hideCharacter();
    writerRef.current?.showCharacter();
  };

  const handleShowStrokeOrder = () => {
    writerRef.current?.quiz();
  };

  return (
    <div className={styles.practiceWrapper}>
      <div ref={containerRef} className={styles.writerBox}></div>
      <div className={styles.controls}>
        <button onClick={handleReplay}>▶ Phát lại</button>
        <button onClick={handleReset}>🔄 Reset</button>
        <button onClick={handleShowStrokeOrder}>✏ Luyện viết</button>
      </div>
    </div>
  );
}
