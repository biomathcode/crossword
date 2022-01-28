
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

import { AiFillPlayCircle} from 'react-icons/ai'




function App() {
  const [playbackRate, setPlaybackRate] = React.useState(1);

  const [win , setWin] = React.useState(false);

  const { width, height } = useWindowSize()

  const [open , setOpen] = React.useState(false);

  const htmlRef = useRef(null);

  const [play] = useSound(CorrectSound, {
    playbackRate,
    interrupt: true,
  });

  const [congratulate, {stop}] = useSound(Audience)

  const playAgain = () => {
    htmlRef.current.reset();
    setWin(false);
    stop();
  }
  const fillallanswer = () => {
    htmlRef.current.fillAllAnswers();
  }


  const onWinning = (value) => {
    const modal = () => {
      return (
        <div style={{zIndex:'1000',boxShadow:'' }}>
        <h3>
       CONGRATULATIONS!!!!! YOU WON 
     </h3>
     <button onClick={playAgain}>Play Again <AiFillPlayCircle/> </button>

     </div>
      )
    }

    if(value === true) {
       modal(true)
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

    </div>
  );
}

export default App;
