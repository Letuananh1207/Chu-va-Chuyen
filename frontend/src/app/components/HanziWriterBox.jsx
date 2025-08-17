import { useEffect, useRef } from "react";
import HanziWriter from "hanzi-writer";

export default function HanziWriterBox({ character, size = 200 }) {
  const containerRef = useRef(null);
  const writerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current || !character) return;
    // Destroy cũ nếu có
    if (writerRef.current) {
      try {
        writerRef.current.destroy();
      } catch {}
      writerRef.current = null;
    }
    // Khởi tạo
    writerRef.current = HanziWriter.create(containerRef.current, character, {
      width: size,
      height: size,
      padding: 2,
      showOutline: true,
      showCharacter: true,
      radicalColor: "#ff7a00",
      strokeColor: "#222",
      drawingColor: "#0b5fff",
      strokeAnimationSpeed: 1,
      delayBetweenStrokes: 300,
    });

    return () => {
      if (writerRef.current) {
        try {
          writerRef.current.destroy();
        } catch {}
        writerRef.current = null;
      }
    };
  }, [character, size]);

  const animate = () => writerRef.current?.animateCharacter();
  const quiz = () => writerRef.current?.quiz();
  const showChar = () => writerRef.current?.updateColor("strokeColor", "#222");

  return (
    <div className="hanzi-box">
      <div ref={containerRef} className="hanzi-canvas" />
      <div className="hanzi-actions">
        <button onClick={animate}>Animate</button>
        <button onClick={quiz}>Quiz</button>
      </div>
    </div>
  );
}
