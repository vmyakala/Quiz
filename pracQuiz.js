(function() {
  const myQuestions = [
    {
      question: "Which type of magical creature carries Sirius Black away from Hogwarts?",
      answers: {
        a: "Dragon",
        b: "Hippogriff",
        c: "Thestral",
		d: "Unicorn"
      },
      correctAnswer: "b"
    },
    {
      question: "Which of the following dragons was NOT used in the Triwizard Tournament in 1994?",
      answers: {
        a: "Swedish Short-Snout",
        b: "Hungarian Horntail",
        c: "Chinese Fireball",
		d: "Norwegian Ridgeback"
      },
      correctAnswer: "d"
    },
    {
      question: "By law,  ________ is banned in Japanese restaurants.",
      answers: {
        a: "tipping",
		b: "sitting"
      },
      correctAnswer: "a"
    },
    {
      question: "________ is the most difficult language in the world.",
      answers: {
        a: "chinese",
		b: "spanish"
      },
      correctAnswer: "a"
    },
    {
      question: "PIKACHU the fictional specie of Pokemon is of CAT category.",
      answers: {
        a: "true",
        b: "false"
      },
      correctAnswer: "b"
    },
    {
      question: "In 1998 Pokemon TV show come out in America.",
      answers: {
        a: "true",
        b: "false"
      },
      correctAnswer: "a"
    }
  ];

  function buildQuiz() {
    // we'll need a place to store the HTML output
    const output = [];

    // for each question...
    myQuestions.forEach((currentQuestion, questionNumber) => {
      // we'll want to store the list of answer choices
      const answers = [];

      // and for each available answer...
	  
      for (letter in currentQuestion.answers) {
        // ...add an HTML radio button
		console.log(letter);

        answers.push
		(
          `<label>
             <input type="radio" name="question${questionNumber}" value="${letter}" >
              ${letter} :
              ${currentQuestion.answers[letter]}
           </label>`
        );
      }
	  
	  

      // add this question and its answers to the output
      output.push(
        `<div class="slide">
           <div class="question"> ${currentQuestion.question} </div>
           <div class="answers"> ${answers.join("")} </div>
         </div>`
      );
    });

    // finally combine our output list into one string of HTML and put it on the page
    quizContainer.innerHTML = output.join("");
  }

  function showResults() {
    // gather answer containers from our quiz
    const answerContainers = quizContainer.querySelectorAll(".answers");
	var answersArray = [];
    // keep track of user's answers
    let numCorrect = 0;

    // for each question...
    myQuestions.forEach((currentQuestion, questionNumber) => {
      // find selected answer
      const answerContainer = answerContainers[questionNumber];
      const selector = `input[name=question${questionNumber}]:checked`;
      var userAnswer = (answerContainer.querySelector(selector) || {}).value;

      // if answer is correct
	  
      if (userAnswer === currentQuestion.correctAnswer) {
        // add to the number of correct answers
		
        numCorrect++;
		answersArray.push (`Question ${questionNumber+1}.  your answer: ${userAnswer}, correct answers: ${currentQuestion.correctAnswer} [correct]</br>`);

        // color the answers green
        answerContainers[questionNumber].style.color = "lightgreen";
      } else if(userAnswer == undefined){
		  userAnswer = 'null';
		  answersArray.push (`Question ${questionNumber+1}.  your answer: ${userAnswer}, correct answers: ${currentQuestion.correctAnswer} [you did not Answer]</br>`);
		  answerContainers[questionNumber].style.color = "Orange";
	  }else {
        // if answer is wrong or blank
        // color the answers red
		answersArray.push (`Question ${questionNumber+1}.  your answer: ${userAnswer}, correct answers: ${currentQuestion.correctAnswer} [Wrong]</br>`);
        answerContainers[questionNumber].style.color = "red";
      }
    });

    // show number of correct answers out of total
	document.getElementById("viewContainer").innerHTML = '';
    resultsContainer.innerHTML = `your score is ${numCorrect} out of ${myQuestions.length}</br>${answersArray}`;
	//resultsContainer.innerHTML = ;
	document.getElementById("retake").style.display = '';
  }

  function showSlide(n) {
    slides[currentSlide].classList.remove("active-slide");
	//console.log("this is classList: " +slides[currentSlide].classList.answers);
    slides[n].classList.add("active-slide");
    currentSlide = n;
    
    if (currentSlide === 0) {
      previousButton.style.display = "none";
    } else {
      previousButton.style.display = "inline-block";
    }
    
    if (currentSlide === slides.length - 1) {
      nextButton.style.display = "none";
      submitButton.style.display = "inline-block";
    } else {
      nextButton.style.display = "inline-block";
      submitButton.style.display = "none";
    }
  }

  function showNextSlide() {
	  const answerContainers = quizContainer.querySelectorAll(".answers");
	  const answerContainer = answerContainers[currentSlide];
      const selector = `input[name=question${currentSlide}]:checked`;
      const userAnswer = (answerContainer.querySelector(selector) || {}).value;
	  console.log(userAnswer);
	  if(userAnswer == undefined){
		  alert("please select the answer OR you Must view the answer");
	  }else {
			showSlide(currentSlide + 1);}
  }

  function showPreviousSlide() {
    showSlide(currentSlide - 1);
  }
  
  function showAnswer() {
	  //const answerContainers = quizContainer.querySelectorAll(".answers");
	  //const answerContainer = answerContainers[currentSlide];
      //const selector = `input[name=question${currentSlide}]`;
      //const userAnswer = (answerContainer.querySelector(selector) || {}).value;
	  //console.log(selector);
    show(currentSlide);
  }
  
  function show(i){
	  
	  document.getElementById("viewContainer").innerHTML = myQuestions[i].correctAnswer;
	  
  }
  
  function terminate(){
	  showResults();
  }

  const quizContainer = document.getElementById("quiz");
  const resultsContainer = document.getElementById("results");
  const submitButton = document.getElementById("submit");
  const showAns = document.getElementById("view");
  const exit = document.getElementById("exit");
	
  // display quiz right away
  buildQuiz();

  const previousButton = document.getElementById("previous");
  const nextButton = document.getElementById("next");
  const slides = document.querySelectorAll(".slide");
  let currentSlide = 0;

  showSlide(0);

  // on submit, show results
  submitButton.addEventListener("click", showResults);
  previousButton.addEventListener("click", showPreviousSlide);
  nextButton.addEventListener("click", showNextSlide);
  showAns.addEventListener("click", showAnswer);
  exit.addEventListener("click", terminate);
  
	document.getElementById("slide1").onclick = function(){
	showSlide(0);}
	document.getElementById("slide2").onclick = function(){
	showSlide(1);}
	document.getElementById("slide3").onclick = function(){
	showSlide(2);}
	document.getElementById("slide4").onclick = function(){
	showSlide(3);}
	document.getElementById("slide5").onclick = function(){
	showSlide(4);}
	document.getElementById("slide6").onclick = function(){
	showSlide(5);}
	
	document.getElementById("retake").onclick = function(){
	window.open("pracQuiz.html", "_self");}
  
})();