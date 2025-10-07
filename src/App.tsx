import { useEffect } from "react";
import AnniversaryTimeline from "./components/AnniversaryTimeline";
// import bgAudio from "../assets/background.mp3";

const AppWithAudio = () => {
  // useEffect(() => {
  //   console.log("useEffect is running");

  //   const audio = new Audio(bgAudio);
  //   audio.loop = true;

  //   const playAudio = async () => {
  //     try {
  //       await audio.play();
  //       console.log("Audio is playing");
  //     } catch (err) {
  //       console.log("Audio play failed:", err);
  //     }
  //   };

  //   const root = document.getElementById("root");
  //   if (root) {
  //     root.addEventListener("click", playAudio);
  //     console.log("Click listener added to root");
  //   }

  //   return () => {
  //     root?.removeEventListener("click", playAudio);
  //   };
  // }, []);

  return <AnniversaryTimeline />;
};

export default AppWithAudio;
