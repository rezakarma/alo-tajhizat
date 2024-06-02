import React, { useState, useEffect } from 'react';

const CountDown = ({ timeInSeconds, onFinish }) => {
    const [seconds , setSecond] = useState(timeInSeconds);

    useEffect(()=> {
        if(seconds > 0) {
            const countDownInterval = setInterval(()=> {
                setSecond(prevState => prevState - 1);
            }, 1000)

            return () => clearInterval(countDownInterval)
        }else {
          
                onFinish();
                console.log('execurte onfinish')
              
        }

    },[seconds]);
    
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return ( 
        <div>
            { minutes.toString().padStart(2,'0')}:{remainingSeconds.toString().padStart(2,'0')}
        </div>
     );
}
 
export default CountDown;