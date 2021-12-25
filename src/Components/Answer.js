import React from "react"

export default function Answer(props){

    const verifyAnswerClass = () => {
        if(props.isConsolidated){

            if(props.answer === props.correctAnswer){
                return "correct"
            }

            if(props.answer === props.selectedAnswer){
                return "final"
            }

        }
        return ""
    }

    const checkBlock = () => {
        return props.isConsolidated ? "block" : ""
    }

    return   (
                <li className="item">              
                    <input 
                        className="radio__input"
                        type="radio"
                        id={props.answer+props.id}
                        name={props.id}
                        value={props.answer}
                        checked={props.selectedAnswer === props.answer}
                        onChange={() => props.handleChange(props.id, props.answer)}
                    />
                    <label className={`radio__label ${verifyAnswerClass()} ${checkBlock()}`} htmlFor={props.answer+props.id}>{props.answer}</label>
                    <br />
                </li>
            )
    
}