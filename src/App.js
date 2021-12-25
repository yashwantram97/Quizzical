import React,{useState} from 'react';
import LandingPage from './Components/LandingPage';
import QuizPage from './Components/QuizPage';

export default function App(){

    const [start,setStart] = useState(false)

    const toggleStart = () => setStart(oldState => !oldState)

    return (
        <>
            {start ? <QuizPage/> : <LandingPage startQuiz={toggleStart}/>}
        </>
    )
}
