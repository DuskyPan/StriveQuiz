const question = document.getElementById("question");
const answers = Array.from(document.getElementsByClassName('answer-button'));
const questionCount = document.getElementById('questionCount');
const livesCountText = document.getElementById('livesCount');

const CORRECT_POINTS = 1;
const MAX_QUESTIONS = 15;
const MAX_LIVES = 3;

let currQuestion = {};
let accAnswer = false;
let questionIndex = 0;
let availableQs =  [];
let currentLives = 0;

let questionBank = [];

fetch("questionBank.json")
	.then( rep => {
		return rep.json();
	})
	.then(loadQs => {
		questionBank = loadQs;
		startQuiz();
});

startQuiz = () => {
	questionIndex = 0;
	currentLives = MAX_LIVES;
	availableQs = [...questionBank];
	console.log(availableQs);
	getNextQuestion();
};

//go to next question
getNextQuestion = () => {
	if (currentLives == 0) {
		return window.location.assign("trivLoss.html"); //get game over page when user loses all lives
	}
	
	
	if (availableQs.length == 0 || questionIndex >= MAX_QUESTIONS) {
		return window.location.assign("trivWin.html"); //get results page when user is done
	}
	
	questionIndex++;
	questionCount.innerText = questionIndex + "/" + MAX_QUESTIONS;
	livesCountText.innerText = currentLives;
	
	const questionNum = Math.floor(Math.random() * availableQs.length);
	currQuestion = availableQs[questionNum];
	question.innerText = currQuestion.question;
	
	answers.forEach(choice => {
		const no = choice.dataset["number"];
		choice.innerText = currQuestion["answer" + no];
	});
	
	availableQs.splice(questionNum, 1);
	accAnswer = true;
};

//check if user clicks on answers
answers.forEach(choice => {
	choice.addEventListener("click", clk => {
	if (!accAnswer) return;
	
	accAnswer = false;
	const selChoice = clk.target;
	const selAns = selChoice.dataset["number"];
	
	let choiceType = "wrong";
		if (selAns == currQuestion.correct) {
			choiceType = "right";
		}
	
	if (choiceType === "wrong") {
		loseLife();
	}
	
	selChoice.classList.remove("col");
	selChoice.parentElement.classList.add(choiceType);
	
	setTimeout(() => {
		selChoice.parentElement.classList.remove(choiceType);
		selChoice.classList.add("col");
		getNextQuestion();
	}, 1000);
	
	});
});

loseLife = () => {
	currentLives = currentLives - 1;
	livesCountText.innerText = currentLives;
};
