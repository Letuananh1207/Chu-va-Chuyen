import { useEffect, useRef } from "react";
import HanziWriter from "hanzi-writer";

export default function HanziWriterBox({ character, size = 200 }) {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current || !character) return;

    // Xóa nội dung cũ trước khi vẽ lại
    containerRef.current.innerHTML = "";

    // Vẽ chữ Hán tĩnh (không animation)
    HanziWriter.create(containerRef.current, character, {
      width: size,
      height: size,
      padding: 20,
      showOutline: true,
      showCharacter: true,
      strokeColor: "#222",
      radicalColor: "#ff7a00",
    });
  }, [character, size]);

  return <div ref={containerRef} className="hanzi-canvas" />;
}
