import React from "react";

export default function LandingPage(props){
    return (
        <section className="landing-page">
            <h1 className="landing__header">Quizzical</h1>
            <p className="para">Know your knowledge</p>
            <button 
                className="button"
                onClick={props.startQuiz}
            >Start quiz</button>
        </section>
    )
}