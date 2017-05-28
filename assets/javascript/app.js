//Initialize Question Array with questions as objects inside the array
var questions = [

Q1 = {
	question: "Which NBA team has the record for the most number of wins in the regular season?",
	option1: "Philadelphia 76ers",
	option2: "Chicago Bulls",
	option3: "Golden State Warriors",
	option4: "Los Angeles Lakers",
	answer: 3,
	explanation: "The Golden State Warriors won a total of 73 out of 82 games in the 2015-2016 NBA season."
},

Q2 = {
	question: "Which NBA player has the most championship titles?",
	option1: "Robert Horry",
	option2: "Sam Jones",
	option3: "John Havlicek",
	option4: "Bill Russell",
	answer: 4,
	explanation: "Bill Russell has a total of 11 championships with the Boston Celtics between the years 1957 and 1969."
},

Q3 = {
	question: "Who was the shortest professional basketball player to play in NBA history?",
	option1: "Spud Webb",
	option2: "Mugsy Bogues",
	option3: "Earl Boykins",
	option4: "Nate Robinson",
	answer: 2,
	explanation: "Mugsy Bogues at a height of 5 Feet 3 Inches was the shortest player in NBA history."
},

Q4 = {
	question: "Which team has the longest winning streak in NBA history?",
	option1: "Los Angeles Lakers",
	option2: "Chicago Bulls",
	option3: "Boston Celtics",
	option4: "Golden State Warriors",
	answer: 1,
	explanation: "The Los Angeles Lakers won a total of 33 straight games from the 1971-1972 season."
},

Q5 = {
	question: "In an NBA regulated court how far away is the free-throw line from the basket?",
	option1: "10 feet",
	option2: "12 feet",
	option3: "15 feet",
	option4: "20 feet",
	answer: 3,
	explanation: "The measurement is 15 feet taken from the free-throw line to the point directly under the backboard."
},

Q6 = {
	question: "Who is the current NBA championship trophy named after?",
	option1: "Walter A. Brown",
	option2: "Adam Silver",
	option3: "Larry O'Brien",
	option4: "David Stern",
	answer: 3,
	explanation: "Larry O'Brien was the NBA commisioner who served from 1975 to 1984."
},

Q7 = {
	question: "Who was the youngest player ever to play in an NBA game?",
	option1: "Jermaine O'Neal",
	option2: "Kobe Bryant",
	option3: "Lebron James",
	option4: "Andrew Bynum",
	answer: 4,
	explanation: "At the start of the 2005 NBA season Andrew Bynum of the Los Angeles Lakers played his first NBA game at 18 years and 6 days old."
},

Q8 = {
	question: "Which NBA player was nicknamed \"The Mailman?\"",
	option1: "Karl Malone",
	option2: "John Sally",
	option3: "Lebron James",
	option4: "Dennis Rodman",
	answer: 1,
	explanation: "Karl Malone was nicknamed \"The Mailman\" because \"he delivered\" match winning performances."
},

Q9 = {
	question: "What number did Michael Jordan wear when he came out of retirement at the end of the 1994-1995 season?",
	option1: "23",
	option2: "45",
	option3: "9",
	option4: "12",
	answer: 2,
	explanation: "Since his original number 23 was retired by Chicaco when he left Jordan opted to wear the number 45 which his older brother wore in high school."
},

Q10 = {
	question: "Who is the NBA's all-time leading scorer?",
	option1: "Kobe Bryant",
	option2: "Karl Malone",
	option3: "Michael Jordan",
	option4: "Kareem Abdul-Jabbar",
	answer: 4,
	explanation: "In his 20 year NBA career Kareem Abdul-Jabbar scored 38,387 regular season points."
}];

var gamestate="page load"; // game states are "page load", "question countdown", and "question explanation"
var questionIndex; //index of the question to be loaded into the game
var timer;
var correct;
var wrong;
var result;


$(".start-button").click(function(){ //when the start button or play again button is clicked
	questionIndex = 0;
	timer = 24; //24 seconds just like in an NBA shotclock
	correct = 0;
	wrong = 0;
	intervalId = setInterval(updateTimer,1000); //set a timer to run the updateTimer function every second
	gamestate = "question countdown";	
	updateGraphics(questions[questionIndex],"Shot Clock: ",timer,"");
});


$(".option").click(questionAnswered); // when an answer is chosen run the questionAnswered function



function questionAnswered (){
	if (gamestate === "question countdown"){
		clearInterval(intervalId); //stop the timer from going down
		$(".timer").css("color","white");
		if ($(this).attr("id") == questions[questionIndex].answer){ //if the id of the button is the same as the correct answer
			console.log("correct answer");	
			correct++;
			$(".explanation").html("Correct! " + questions[questionIndex].explanation);
		}
		else{
			console.log("wrong anwer");
			wrong++;
			if (timer > 0){
				$(".explanation").html("Wrong! " + questions[questionIndex].explanation);
			}
			else{
				$(".explanation").html("Time Up! " + questions[questionIndex].explanation);
			};
		};	
		questionIndex++;
	 	gamestate="question explanation";
	 	timer=8;
	 	intervalId = setInterval(updateTimer,1000); //set a new timer for the waiting period between questions
		$(".time-desc").html("Next Question: ");
		$(".timer").html(timer);
	 }
};

 
function updateTimer(){
	if (timer > 0){ //decrement the timer to 0
	timer--;
	$(".timer").html(timer);
	};

	if (timer <=5 && gamestate === "question countdown"){ //make the timer red when there are only 5 or less seconds left
		$(".timer").css("color","red")	;	
	};


	if (timer === 0 && gamestate === "question countdown"){ //if the player didn't answer the question in time			
		questionAnswered(); //if the timer runs out run the questionAnswered function. The player will get the question wrong.
	}
	else if (timer === 0 && gamestate === "question explanation" && questionIndex < questions.length){// load the next question after the explanation phase
		clearInterval(intervalId);
		timer=24;
	 	intervalId = setInterval(updateTimer,1000);
	 	gamestate = "question countdown"; 	
		updateGraphics(questions[questionIndex],"Shot Clock: ",timer,"");
	}
	else if (timer === 0 && questionIndex === questions.length){//at the end of the game show the results screen
		clearInterval(intervalId);	
		updateGraphics("end game","",timer,"");
	}
	else{

	};
};



function updateGraphics(q,timer_phrase,timer,explanation){ //update all graphics on the page
	if (q==="end game"){
		$(".question").html("Trivia Results<br/>Correct: " + correct.toString() + "<br/>Wrong: " + wrong.toString());
		$(".timerbar").css("display","none");	
		$(".option").css("display","none");
		$(".explanation").html("");
		$(".start-button").css("display","inline-block");		
		$(".start-button").html("Play Again");	
	}
	else{
		$(".start-button").css("display","none");		
		$(".question").html("Q" + (questionIndex+1).toString() + ":   " +  q.question);
		$(".timerbar").css("display","inline-block");
		$(".time-desc").html(timer_phrase);			
		$(".timer").html(timer);
		$(".option").css("display","inline-block");	
		$("#1").html(q.option1);
		$("#2").html(q.option2);
		$("#3").html(q.option3);
		$("#4").html(q.option4);
		$(".explanation").html(explanation);
	};
};