import { createContext, useState } from "react";

export const SongContext = createContext();

export const SongContextProvider = ({ children }) => {
  const [song, setSong] = useState({
    // url: "https://ik.imagekit.io/vclk2b3f9/cohort-2-moodify/songs/Aaraaro_Aararo_NzdaSy36pR.mp3",
    // posterUrl:
    //   "https://ik.imagekit.io/vclk2b3f9/cohort-2-moodify/posters/Aaraaro_Aaraaro_TM0eNG5p_8.jpeg",
    // title: "Aaraaro Aararo",
    // mood: "sad",
  });

  const [loading, setLoading] = useState(false);
  return (
    <SongContext.Provider value={{ song, setSong, loading, setLoading }}>
      {children}
    </SongContext.Provider>
  );
};
