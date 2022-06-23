var inGame = false;
var answer;
var currentWord="";
var palyerWord = [];
var chances = 0;
var score = 0;
var lScore = 0;
var HighScoreHangMan = 0;



dictionary = [
    "trichy",
    "spider",
    "delta",
    "application",
    "website",
    "rain",
    "window",
    "apple",
    "orange",
    "orion",
    "inductions",
    "cycle",
];

// const api_url = "https://random-word-api.herokuapp.com/word";

// var request = new XMLHttpRequest();

// request.open('GET', api_url , true);

// request.onload = function () {
//     var data = JSON.parse(this.response);
//     console.log(data[0]);
//     answer = data[0];
// };

// request.send();



score = window.localStorage.getItem(lScore);
score = parseInt(score,10) + 0;
 document.querySelector("h3").innerHTML = "Score : " + score ;


function playSound(){
    var aud = new Audio("sounds/won.mp3");
    aud.play();
}

function playSound2(){
    var aud = new Audio("sounds/wrong.mp3");
    aud.play();
}


function tileEffects(currentKey){
    console.log(currentKey);
    var activetile = document.getElementById(currentKey);
    activetile.classList.add("pressed");
    activetile.classList.add("pressed-effects");

    setTimeout(function(){
        activetile.classList.remove("pressed");
        activetile.classList.remove("pressed-effects");
    },150);
    setTimeout(()=>{
        activetile.classList.add("fpressed");
        return;
    },400);


}

function displayWord(){
 
    // randomWord();   
    let text = window.prompt("Player 2 : Enter Any Word","Word");
    answer = text.toLowerCase();
    if(answer == ""){
          answer = dictionary[Math.floor(Math.random()*(dictionary.length))];
    }
    let letters= answer.split('').map(h=>
              `
                <span
                  class="spn"
                >
                  ` + "<u>*</u>" + `
                </span>
              `).join('');

    document.getElementById('answer').innerHTML = letters  ;       
    
}

function gameOver(){
    window.localStorage.setItem(lScore , 0);
//    score=0;
    
    playSound2();    

    setTimeout(()=>{
       alert("Answer =>  " + answer + "  🙃");
       reset();
    },1300);
   setTimeout(()=>{
      location.reload();
   },1380);
}

function reset(){
    inGame = false;
    answer="";
    palyerWord = [];
    currentWord = "";
    chances=0;
    

    for(var n=0;n<26;n++){
        document.querySelectorAll(".btn")[n].classList.remove("fpressed");
    }

}


function updateWord(tkey){
    palyerWord.push(tkey);
    
    currentWord = answer.split('').map(letter => (palyerWord.indexOf(letter) >= 0 ? letter : " _ ")).join(' ');
    document.getElementById('answer').innerHTML = currentWord;

}



function gameMain(currentKey){


    
    if(currentWord.includes(" _ ") === false && currentWord!=""){

        inGame = false;
        playSound();

        setTimeout(()=>{
            reset();
            score = window.localStorage.getItem(lScore);
            score = parseInt(score,10) +  100;
            window.localStorage.setItem(lScore,score);
            var dum = score;
            document.querySelector("h3").innerHTML = "Score : " + dum ;
            console.log(score);
            alert("You Won!!");
            
            setTimeout(()=>{
                location.reload();
             },500);
            // document.querySelector("h2").innerHTML = "Press any Key to Restart" ;
            return ;
        },500);
        
    }
    if(answer.includes(currentKey) === false){
        chances++;
        document.querySelector("h2").innerHTML = "Guess Left " + (6-chances) + "" ;
        var activeId = "img" + chances;
        document.getElementById(activeId).style.display = "block";
     }
    
    if(chances > 5){
        document.querySelector("h2").innerHTML = "Answer : " + answer + ""  ;
        gameOver();
    }
    

  return;
  
} 

document.addEventListener('keypress',gameStart);


for(var n=0;n<26;n++){
    document.querySelectorAll(".btn")[n].addEventListener("click", gameStart);
}


function gameStart(){

    
    function tmp(){
       if(inGame == true){
            tileEffects(this.id);
            updateWord(this.id);
            gameMain(this.id);
       }
          
    }
    if(inGame == false){
        console.log("i");
        inGame = true;
        displayWord();
        document.querySelector("h2").innerHTML = "Enter an Alphabet";


        for(var n=0;n<26;n++){
            document.querySelectorAll(".btn")[n].addEventListener("click", tmp); 
        }


        document.addEventListener('keypress', function(event){

            if(inGame === true){
               var tkey = event.key;
               tileEffects(tkey);
               updateWord(tkey);
               gameMain(tkey);
              
            }

        });

    }
  return;
   
}

