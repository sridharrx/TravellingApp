import { useEffect, useState } from "react";

const backgrounds = [
  "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1600&q=80",
  "https://images.unsplash.com/photo-1518837695005-2083093ee35b?auto=format&fit=crop&w=1600&q=80",
  "https://images.unsplash.com/photo-1473116763249-2faaef81ccda?auto=format&fit=crop&w=1600&q=80",
  "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1600&q=80",
];

function BackgroundSlider() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((previous) => (previous + 1) % backgrounds.length);
    }, 10000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    document.body.style.backgroundImage = `
      linear-gradient(rgba(15, 23, 42, 0.42), rgba(15, 23, 42, 0.42)),
      url("${backgrounds[index]}")
    `;
    document.body.style.backgroundSize = "cover";
    document.body.style.backgroundPosition = "center";
    document.body.style.backgroundAttachment = "fixed";

    return () => {
      document.body.style.backgroundImage = "";
    };
  }, [index]);

  return null;
}

export default BackgroundSlider;