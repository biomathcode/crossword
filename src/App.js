
import './App.css';
import React, { useRef } from 'react';
import Crossword from '@jaredreisinger/react-crossword';
import { data } from './data';
import { Toaster, toast } from 'react-hot-toast';

import useSound from 'use-sound';

import CorrectSound from './sounds/correct.wav';
import Audience from './sounds/audience.wav'
import Confetti from 'react-confetti';
import useWindowSize from 'react-use/lib/useWindowSize';






function App() {
  const [playbackRate, setPlaybackRate] = React.useState(1);

  const [win , setWin] = React.useState(false);

  const { width, height } = useWindowSize()


  const htmlRef = useRef(null);

  const [play] = useSound(CorrectSound, {
    playbackRate,
    interrupt: true,
  });

  const [congratulate, {stop}] = useSound(Audience)

  const playAgain = () => {
    htmlRef.current.reset();
    setPlaybackRate(1);
    setWin(false);
    stop();
  }
  // const fillallanswer = () => {
  //   htmlRef.current.fillAllAnswers();
  // }


  const onWinning = (value) => {
    if(value === true) {
       congratulate();
       alert('you won!!!')
      return  setWin(true);

    }
  }

  return (
    <div className="App" style={{maxWidth: '500px', margin:'5%'}}>
      <Confetti
      width={width}
      height={height}
      run={win}
      tweenDuration={3000}
      onCanPlay={false}
      
    />
      <Toaster
      position="top-center"
      reverseOrder={false}
    />  
  
      <Crossword
      ref={htmlRef}
      data={data}

      onCrosswordCorrect={onWinning}
      onLoadedCorrect={() => {setWin(false)}}
      onCorrect={(number, direction, answer) => {console.log(answer, direction); play(); toast.success(`you succesfully answered: ${answer}`)   } }/>
      <button onClick={playAgain}>Play again</button>
    </div>
  );
}

export default App;
