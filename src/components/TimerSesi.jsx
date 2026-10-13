import { useEffect, useState } from "react";

export default function TimerSesi() {
  const [detik, setDetik] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setDetik((prev) => prev + 1);
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  const menit = String(Math.floor(detik / 60)).padStart(2, "0");
  const sisaDetik = String(detik % 60).padStart(2, "0");
  return (
    <span role="timer" aria-label="Lama sesi">
      Lama sesi: {menit}:{sisaDetik}
    </span>
  );
}