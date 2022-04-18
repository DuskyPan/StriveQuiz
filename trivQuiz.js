const question = document.getElementById("question");
const answers = Array.from(document.getElementsByClassName('answer-button'));
const questionCount = document.getElementById('questionCount');
const livesCountText = document.getElementById('livesCount');

const CORRECT_POINTS = 1;
const MAX_QUESTIONS = 5;
const MAX_LIVES = 3;

let currQuestion = {};
let accAnswer = true;
let questionIndex = 0;
let availableQs =  [];
let currentLives = 0;

let questionBank = [

	{
		question: "What was Faust called in the older Guilty Gear titles?",
		answer1: "Dr.Baldhead",
		answer2: "Mr.James",
		answer3: "Col.Sanders",
		answer4: "Mr.Simon",
		correct: 1
	},
	
	{
		question: "Who is Kliff Undersn's foster child?",
		answer1: "Ky",
		answer2: "Chipp",
		answer3: "Testament",
		answer4: "Tyr",
		correct: 3
	},
	
	{
		question: "What animal does May call upon when activating her super in Strive?",
		answer1: "Dolphin",
		answer2: "Whale",
		answer3: "Shark",
		answer4: "Otter",
		correct: 2
	},
	
	{
		question: "Which Queen album does Sol Badguy love listening to?",
		answer1: "Made in Heaven",
		answer2: "The Game",
		answer3: "News of the World",
		answer4: "Sheer Heart Attack",
		correct: 4
	},
	
	{
		question: "What position of power does Chipp the ninja eventually want to obtain?",
		answer1: "King",
		answer2: "Assassin's Syndicate Leader",
		answer3: "President",
		answer4: "Baker",
		correct: 3
	}
];


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
		return window.location.assign("/gameOver.html"); //get game over page when user loses all lives
	}
	
	
	if (availableQs.length == 0 || questionIndex >= MAX_QUESTIONS) {
		return window.location.assign("/trivResults.html"); //get results page when user is done
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
}

startQuiz();