export async function getCharacter(id) {
  try {
    const res = await fetch(`/api/char/${encodeURIComponent(id)}`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.json();
  } catch (err) {
    // Fallback mock khi chưa có backend
    if (id === "你") {
      return {
        character: "你",
        pinyin: "nǐ",
        type: "dt.",
        meaning: "bạn",
        examples: ["你好 (nǐ hǎo): xin chào", "你在做什么？: bạn đang làm gì?"],
        prev: {
          id: "123456",
          content: "我",
        },
        next: {
          id: "123457",
          content: "好",
        },
        exercises: [
          {
            id: "ex1",
            type: "mcq",
            question: "Nghĩa của 你 là gì?",
            options: ["tôi", "bạn", "anh ấy"],
            answerIndex: 1,
          },
          {
            id: "ex2",
            type: "compose",
            prompt: "Ghép cụm có 你 để chào hỏi (gợi ý: 你好)",
          },
        ],
      };
    }
    return {
      character: id,
      pinyin: "",
      meaning: "",
      examples: [],
      exercises: [],
    };
  }
}
