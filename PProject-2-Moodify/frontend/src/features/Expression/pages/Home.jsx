import { useSong } from "../hooks/useSong";
import FaceExpressionDetector from "../components/FaceExpressionDetector";
import MusicPlayer from "../components/MusicPlayer";
import "../style/Home.scss";

const Home = () => {
  const { handleGetSong } = useSong({});

  const moodMap = {
    "Happy 😀": "happy",
    "Sad 😢": "sad",
    "Angry 😠": "angry",
    "Neutral 😐": "neutral",
    "Laughing 😆": "happy",
    "Surprised 😲": "surprised",
    "Smirk 😏": "happy",
    "Wink 😉": "happy",
    "Thinking 🤔": "neutral",
  };

  const handleExpressionCaptured = (expression) => {
    console.log(expression); //all expressions comming here but song not playing for all of them

    const mood = moodMap[expression] || "neutral";
    handleGetSong({ mood: mood });
  };

  return (
    <div className="home-page">
      <FaceExpressionDetector onCapture={handleExpressionCaptured} />
      <div className="player-dock">
        <MusicPlayer />
      </div>
    </div>
  );
};

export default Home;
