import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Swal from "sweetalert2"; // Import SweetAlert2

// Components
import FadeIn from "../components/animations/fade-in";
import { EnglishEasy, EnglishMedium, EnglishHard } from "../components/pages/english";
import { MathEasy, MathMedium, MathHard } from "../components/pages/math";
import { ScienceEasy, ScienceMedium, ScienceHard } from "../components/pages/science";

const Quiz = () => {
  const navigate = useNavigate();
  const { subject, mode } = useParams();

  const [isAllowed, setIsAllowed] = useState(false); 

  const handleReturn = () => {
    navigate(-1);
  };

  // Function to get the appropriate quiz
  const getQuizData = () => {
    if (subject === "english") {
      if (mode === "easy") return EnglishEasy();
      if (mode === "medium") return EnglishMedium();
      if (mode === "hard") return EnglishHard();
    } else if(subject === "math") {
      if(mode === "easy") return MathEasy();
      if(mode === "medium") return MathMedium();
      if(mode === "hard") return MathHard();
    } else if(subject === "science") {
      if(mode === "easy") return ScienceEasy();
      if(mode === "medium") return ScienceMedium();
      if(mode === "hard") return ScienceHard();
    }

    return [];
  };

  const quizData = getQuizData();

  // State to track the answers chosen by the user
  const [answers, setAnswers] = useState({});
  const [score, setScore] = useState(null); 

  // Check if the user is allowed to take the quiz based on previous progress
  useEffect(() => {
    const quizStatus = JSON.parse(localStorage.getItem("quizStatus")) || {};
    const easyKey = `${subject}_easy`;
    const mediumKey = `${subject}_medium`;

    if (mode === "medium" && quizStatus[easyKey] !== "passed") {
      Swal.fire({
        title: "Access Denied",
        text: "You need to pass the easy quiz before taking the medium quiz.",
        icon: "error",
        confirmButtonText: "OK",
      });
      navigate(-1); // Redirect back
    } else if (mode === "hard" && quizStatus[mediumKey] !== "passed") {
      Swal.fire({
        title: "Access Denied",
        text: "You need to pass the medium quiz before taking the hard quiz.",
        icon: "error",
        confirmButtonText: "OK",
      });
      navigate(-1); // Redirect back
    } else {
      setIsAllowed(true); // Allow access to the quiz
    }
  }, [subject, mode, navigate]);

  // Function to handle answer selection
  const handleAnswerSelection = (taskIndex, taskDetailsIndex, questionIndex, selectedAnswer) => {
    const answerKey = `${taskIndex}-${taskDetailsIndex}-${questionIndex}`;

    // Prevent changing the answer if it's already selected
    if (answers[answerKey]) return;

    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [answerKey]: selectedAnswer,
    }));
  };

  const calculateScore = () => {
    let correctAnswers = 0;
    let totalQuestions = 0;
  
    quizData.forEach((task, taskIndex) => {
      task.tasks.forEach((taskDetails, taskDetailsIndex) => {
        taskDetails.questions.forEach((q, questionIndex) => {
          const answerKey = `${taskIndex}-${taskDetailsIndex}-${questionIndex}`;
          const selectedAnswer = answers[answerKey];
          const correctOption = q.options.find((option) => option.startsWith(q.answer));
          if (selectedAnswer === correctOption) {
            correctAnswers++;
          }
          totalQuestions++;
        });
      });
    });
  
    const calculatedScore = (correctAnswers / totalQuestions) * 100;
    setScore(calculatedScore);
  
    // Determine pass/fail and update localStorage
    const passThreshold = 60; // Minimum score to pass
    const status = calculatedScore >= passThreshold ? "passed" : "failed";
  
    // Update quizStatus in localStorage
    const localStorageKey = `${subject}_${mode}`;
    const quizStatus = JSON.parse(localStorage.getItem("quizStatus")) || {};
  
    quizStatus[localStorageKey] = status;
  
    // Mark untouched quizzes as "not_taken"
    ["english", "math", "science"].forEach((subj) => {
      ["easy", "medium", "hard"].forEach((mod) => {
        const key = `${subj}_${mod}`;
        if (!quizStatus[key]) {
          quizStatus[key] = "not_taken";
        }
      });
    });
  
    localStorage.setItem("quizStatus", JSON.stringify(quizStatus));
  
    // Store scores in another localStorage key
    const scores = JSON.parse(localStorage.getItem("scores")) || {};
  
    // Update the specific subject and mode with the score
    if (!scores[subject]) {
      scores[subject] = {
        easy: "not_taken",
        medium: "not_taken",
        hard: "not_taken",
      };
    }
  
    // Set the score for the current mode
    scores[subject][mode] = `${correctAnswers}/${totalQuestions}`;
  
    // Save updated scores to localStorage
    localStorage.setItem("scores", JSON.stringify(scores));
  
    // SweetAlert for displaying the result
    Swal.fire({
      title: `Your score: ${calculatedScore.toFixed(2)}%`,
      text: `You have ${status === "passed" ? "passed" : "failed"} the quiz.`,
      icon: status === "passed" ? "success" : "error",
      confirmButtonText: "OK",
    });
  
    navigate(-1);
  };  

  // Function to get background color based on the answer correctness
  const getAnswerBackgroundColor = (taskIndex, taskDetailsIndex, questionIndex, selectedAnswer, correctAnswer, options) => {
    const answerKey = `${taskIndex}-${taskDetailsIndex}-${questionIndex}`;

    if (!answers[answerKey]) return ""; // No selection yet

    // Get the correct option based on the answer letter
    const correctOption = options.find((option) => option.startsWith(correctAnswer));

    // Compare the selected answer to the correct answer
    return answers[answerKey] === correctOption ? "green" : "red";
  };

  if (!isAllowed) {
    return null; // Prevent rendering the quiz if the user is not allowed
  }

  return (
    <FadeIn>
      <div className="quiz">
        <div className="quiz-game">
          <div className="header">
            <button onClick={handleReturn}>Return</button>
          </div>
          <div className="grow">
            {quizData.length > 0 ? (
              quizData.map((task, taskIndex) => (
                <div key={taskIndex}>
                  <h2>{task.title}</h2>
                  {task.tasks.map((taskDetails, taskDetailsIndex) => (
                    <div key={taskDetailsIndex}>
                      <h3>{taskDetails.title}</h3>
                      {taskDetails.questions.map((q, qIndex) => {
                        const selectedAnswer = answers[`${taskIndex}-${taskDetailsIndex}-${qIndex}`];

                        return (
                          <div key={qIndex} className="question">
                            <p>{q.question}</p>
                            <b>{q.poem}</b>
                            <div className="options">
                              {q.options.map((option, optionIndex) => (
                                <button
                                  key={optionIndex}
                                  onClick={() =>
                                    handleAnswerSelection(taskIndex, taskDetailsIndex, qIndex, option)
                                  }
                                  style={{
                                    backgroundColor: getAnswerBackgroundColor(
                                      taskIndex,
                                      taskDetailsIndex,
                                      qIndex,
                                      selectedAnswer,
                                      q.answer,
                                      q.options
                                    ),
                                    pointerEvents: selectedAnswer ? "none" : "auto",
                                  }}
                                >
                                  {option}
                                </button>
                              ))}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  ))}
                </div>
              ))
            ) : (
              <p>No quiz found for the selected subject and mode.</p>
            )}
            <div className="quiz-footer">
              <button className="submit-quiz" onClick={calculateScore} disabled={score !== null}>
                Submit Quiz
              </button>
              {score !== null && <p>Your Score: {score.toFixed(2)}%</p>}
            </div>
          </div>
        </div>
      </div>
    </FadeIn>
  );
};

export default Quiz;
