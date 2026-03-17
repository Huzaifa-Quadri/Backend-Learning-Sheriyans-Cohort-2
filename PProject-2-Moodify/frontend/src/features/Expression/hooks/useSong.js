import { getSong } from "../service/song.api";
import { useContext, useEffect, useState } from "react";
import { SongContext } from "../song.context";

export function useSong({ mood }) {
  // const [song, setSong] = useState(null);
  // const [loading, setLoading] = useState(false);
  // const [error, setError] = useState(null);

  // useEffect(() => {
  //   async function fetchSong() {
  //     setLoading(true);
  //     setError(null);
  //     try {
  //       const data = await getSong({ mood });
  //       setSong(data);
  //     } catch (err) {
  //       setError(err);
  //     } finally {
  //       setLoading(false);
  //     }
  //   }
  //   fetchSong();
  // }, [mood]);

  const context = useContext(SongContext);
  const { song, setSong, loading, setLoading } = context;

  async function handleGetSong({ mood }) {
    setLoading(true);
    const data = await getSong({ mood });
    setSong(data.song);
    setLoading(false);
  }

  return { song, loading, handleGetSong };
}
