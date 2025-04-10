import { useState } from "react";
import n2words from "n2words"; // Import thư viện n2words

export default function Home() {
  const [level, setLevel] = useState("easy");
  const [number, setNumber] = useState<number | null>(null);
  const [userInput, setUserInput] = useState("");
  const [result, setResult] = useState("");

  const generateNumber = () => {
    let min = 0,
      max = 1000;
    if (level === "easy") max = 20;
    else if (level === "medium") {
      min = 0;
      max = 100;
    } // Cập nhật mức trung bình từ 0 đến 100
    else {
      min = 101;
      max = 1000;
    }

    const random = Math.floor(Math.random() * (max - min + 1)) + min;
    setNumber(random);
    setUserInput("");
    setResult("");
  };

  const checkAnswer = () => {
    if (number === null) return;

    // Sử dụng n2words để chuyển đổi số sang chữ tiếng Đức
    const correct = n2words(number, { lang: "de" }); // Chuyển đổi sang chữ tiếng Đức
    const input = userInput.trim().toLowerCase();

    if (input === correct.toLowerCase()) {
      setResult("✅ Chính xác!");
      // Random số mới sau 1 giây
      setTimeout(generateNumber, 1000);
    } else {
      setResult(`❌ Sai rồi. Đáp án: "${correct}". Hãy thử lại!`); // Thông báo khi sai
    }
  };

  // Thêm sự kiện kiểm tra khi nhấn phím Enter
  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Enter") {
      checkAnswer();
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4 font-serif">
      <h1 className="text-3xl font-bold mb-6">🇩🇪 Luyện số tiếng Đức</h1>
      <div className="mb-4">
        <label className="mr-2">Chọn mức:</label>
        <select
          className="p-2 rounded border"
          value={level}
          onChange={(e) => setLevel(e.target.value)}
        >
          <option value="easy">Dễ (0–20)</option>
          <option value="medium">Trung bình (0–100)</option>
          <option value="hard">Khó (101–1000)</option>
        </select>
      </div>
      <button
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        onClick={generateNumber}
      >
        🎲 Tạo số
      </button>

      {number !== null && (
        <div className="mt-6 text-center">
          <div className="text-4xl font-semibold mb-4">{number}</div>
          <input
            type="text"
            className="border p-2 rounded w-64 text-center"
            placeholder="Nhập tiếng Đức..."
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            onKeyDown={handleKeyDown} // Thêm sự kiện cho phím Enter
          />
          <button
            className="ml-2 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            onClick={checkAnswer}
          >
            ✅ Kiểm tra
          </button>
          <div className="mt-4 text-lg font-medium">{result}</div>
        </div>
      )}
    </div>
  );
}
