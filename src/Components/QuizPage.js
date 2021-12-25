import React,{useState,useEffect} from "react";
import Question from "./Question";
import Answer from "./Answer";
import {nanoid} from "nanoid"

export default function QuizPage(props){

    const [loading, setLoading] = useState(false)
    const [quizData, setQuizData] = useState([])
    const [isConsolidated,setIsConsolidated] = useState(false)
    const [restart,setRestart] = useState(0)

    function shuffle(array) {
        let currentIndex = array.length,  randomIndex;
      
        // While there remain elements to shuffle...
        while (currentIndex !== 0) {
      
          // Pick a remaining element...
          randomIndex = Math.floor(Math.random() * currentIndex);
          currentIndex--;
      
          // And swap it with the current element.
          [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
        }
      
        return array;
      }
    

    useEffect(()=>{

        setLoading(true)

        fetch('https://opentdb.com/api.php?amount=5')
            .then(res => res.json())
            .then(data => {
                
                setLoading(false)

                return setQuizData(data.results.map(newData => ({
                        id:nanoid(),
                        correct:false,
                        selectedAnswer:"",
                        question:newData.question,
                        allAnswers:shuffle([...newData.incorrect_answers,newData.correct_answer]),
                        correctAnswer:newData.correct_answer
                    })))
        })

    },[restart])

    const updateAnswer = (id, answer) => {
        
        setQuizData(oldState => 
            oldState.map(data => 
                {
                   if (data.id === id){ 
                       if (data.correctAnswer === answer)
                            return {...data, selectedAnswer:answer, correct:true} 
                        else
                            return {...data, selectedAnswer:answer, correct:false}
                    }else{
                        return data
                    } 
                }
            )
        )
    }

    const consolidateAnswers = () => {
        const correctAnswers = quizData.filter(data => data.correct)

        return correctAnswers.length
    }

    const Quiz = quizData.map(data => {
        
        const Answers = data.allAnswers.map(ans => 
                <Answer 
                handleChange={updateAnswer} 
                answer={ans} 
                selectedAnswer={data.selectedAnswer} 
                id={data.id} 
                key={nanoid()}
                correct={data.correct}
                isConsolidated={isConsolidated}
                correctAnswer={isConsolidated ? data.correctAnswer : ""}
            />)
        
        return (
            <div className="quiz">
                <Question 
                    key={data.id} 
                    question={data.question}
                />
                <ul className="answer__list">
                    {Answers}
                </ul>
            </div>
        )
        }
    )

    const getContent = () => {
        if(loading){
            return <h1 className="loader">Loading...</h1>
        }else{
            if (isConsolidated){
                return (
                    <div className="play-again">
                        <button className="submit-button" onClick={playAgian}>Play Again</button>
                        <h3 className="score">{`Total number of correct answers = ${consolidateAnswers()}/5`}</h3>
                    </div>
                )
            }
            return <button className="submit-button" onClick={submitForm}>Check Answers</button>
        }
    }

    const submitForm = (e) =>{
        e.preventDefault()
        setIsConsolidated(true)
    }

    const playAgian = (e) => {
        e.preventDefault()
        setRestart(oldState => oldState + 1)
        setIsConsolidated(false)
        setQuizData([])
    }

    return(
        <form className="form__container">
            {Quiz}
            {getContent()}
        </form>
    )
}