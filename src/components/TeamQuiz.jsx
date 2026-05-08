import React, { useState } from 'react';
import { quizData } from '../data/quizData';

const TeamQuiz = ({ teamId, teamName, onExit }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);

  const questions = quizData[teamId];

  if (!questions || questions.length === 0) {
    return (
      <div className="quiz-container empty-state">
        <h2 className="quiz-title">No quiz available for {teamName} yet!</h2>
        <p style={{marginBottom: '2rem'}}>Check back later for more Ball Knowledge challenges.</p>
        <button onClick={onExit} className="quiz-btn">Return to Profile</button>
      </div>
    );
  }

  const handleAnswerClick = (option) => {
    setSelectedAnswer(option);
    
    if (option === questions[currentQuestion].answer) {
      setScore(score + 1);
    }

    setTimeout(() => {
      const nextQuestion = currentQuestion + 1;
      if (nextQuestion < questions.length) {
        setCurrentQuestion(nextQuestion);
        setSelectedAnswer(null);
      } else {
        setShowResult(true);
      }
    }, 1000); 
  };

  const getKnowledgeLevel = (finalScore) => {
    if (finalScore <= 4) return "Beginner";
    if (finalScore <= 9) return "Good Ball Knower";
    if (finalScore <= 14) return "Elite Ball Knower";
    return "God Level Ball Knower";
  };

  return (
    <div className="quiz-container">
      {showResult ? (
        <div className="quiz-result">
          <h2 className="quiz-title">{teamName} Quiz Results</h2>
          <div className="score-display">
            You scored {score} out of {questions.length}
          </div>
          <div className="knowledge-level">
            Your Rank: <span className="rank-text">{getKnowledgeLevel(score)}</span>
          </div>
          <button onClick={onExit} className="quiz-btn mt-4">Return to Profile</button>
        </div>
      ) : (
        <div className="quiz-playing">
          <div className="quiz-header">
            <h2 className="quiz-title">{teamName} Ball Knowledge Quiz</h2>
            <span className="quiz-progress">Question {currentQuestion + 1} / {questions.length}</span>
          </div>
          <div className="question-text">
            {questions[currentQuestion].question}
          </div>
          <div className="options-grid">
            {questions[currentQuestion].options.map((option, index) => (
              <button
                key={index}
                className="option-btn"
                onClick={() => handleAnswerClick(option)}
                disabled={selectedAnswer !== null}
              >
                {option}
              </button>
            ))}
          </div>
          <button onClick={onExit} className="quiz-btn-small">Quit Quiz</button>
        </div>
      )}
    </div>
  );
};

export default TeamQuiz;
