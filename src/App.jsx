import { useState, useEffect, useMemo } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import GlobalStyles from './style/GlobalStyles';
import styled from 'styled-components';

import Start from './pages/Start';
import Questions from './pages/Questions';
import Result from './pages/Result';

function App() {
  const [isPlaying, setIsPlaying] = useState(false);

  const music = useMemo(() => {
    const audio = new Audio('./music/ost.mp3');
    audio.loop = true;
    return audio;
  }, []);

  const handleMusicStart = () => {
    if (!isPlaying) {
      music.play();
      setIsPlaying(true);
    } else {
      music.pause();
      setIsPlaying(false);
    }
  };

  const getMusicIcon = () => {
    return isPlaying ? './img/icon/music.png' : './img/icon/mute.png';
  };

  useEffect(() => {
    const handleEnded = () => {
      setIsPlaying(false);
    };
    music.addEventListener('ended', handleEnded);

    return () => {
      music.removeEventListener('ended', handleEnded);
    };
  }, [music]);

  return (
    <AppContainer>
      <MusicPlayer>
        <Music src={getMusicIcon()} onClick={handleMusicStart} />
      </MusicPlayer>
      <BrowserRouter>
        <GlobalStyles />
        <Background />
        <Routes>
          <Route path="/" element={<Start />} />
          <Route path="/questions" element={<Questions />} />
          <Route path="/result" element={<Result />} />
        </Routes>
      </BrowserRouter>
    </AppContainer>
  );
}

const AppContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  position: relative;
  font-family: 'Heir of Light';
`;

const MusicPlayer = styled.div`
  width: 30px;
  height: 30px;
  position: absolute;
  top: 0;
  right: 0;
  z-index: 999;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: white;
  border-radius: 25px;
  margin: 10px;
  box-shadow: 0 0 10px #fff;
  cursor: pointer;
`;

const Music = styled.img`
  width: 20px;
  height: 20px;
  padding: 2px;
`;

const Background = styled.div`
  position: absolute;
  width: 100vw;
  height: 100vh;
  background-image: url('./img/background/background.jpg');
  background-size: cover;
  background-position: center center;
  filter: brightness(0.6);
`;

export default App;
