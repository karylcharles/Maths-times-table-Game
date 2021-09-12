var playing = false;
var score;
var count;
var startClock;
var correctAns;

document.getElementById("startReset").onclick=function(){
    if(playing == true){
        location.reload();        
    }
    else{
        score = 0;
        document.getElementById("scoreValue").innerHTML=score;
        hide("gameover");
        show("timeRemaining");
        count = 60;
        document.getElementById("watch").innerHTML=count;
        document.getElementById("startReset").innerHTML="RESET";
        playing = true;
        startTime();
        generateQA();
    }
}

document.getElementById("box1").onclick=function(){
    if(playing == true){
        if(this.innerHTML == correctAns){
            score += 1;
            document.getElementById("scoreValue").innerHTML=score;
            hide("wrong");
            setTimeout(function(){hide("correct");},1000);
        }
        else{
            show("wrong");
            hide("correct");
            setInterval(function(){hide("wrong")}, 1000);
        }
    }
}

for(i=1; i<5; i++){
    document.getElementById("box" + i).onclick=function(){
        if(playing == true){
            if(this.innerHTML == correctAns){
                score += 1;
                document.getElementById("scoreValue").innerHTML=score;
                show("correct");
                hide("wrong");
                setTimeout(function(){hide("correct");},1000);
                generateQA();
            }
            else{
                show("wrong");
                hide("correct");
                setInterval(function(){hide("wrong")}, 1000);
            }
        }
    }
}



function startTime(){
    startClock = setInterval(function(){
        count-=1;
        document.getElementById("watch").innerHTML=count;
        if(count == 0){
            stopCountdown();
            show("gameover");
            document.getElementById("gameover").innerHTML="<p>Game Over</p><p>Your score is " + score + "</p>";
            hide("timeRemaining");
            hide("correct");
            hide("wrong");
            playing = false;
            document.getElementById("startReset").innerHTML="START GAME";
        }
    },1000);
}

function stopCountdown(){
    clearInterval(startClock);
}

function hide(id){
    document.getElementById(id).style.display="none";
}

function show(id){
    document.getElementById(id).style.display="block";
}

function generateQA(){
    var x = Math.round(1 + (Math.random() * 12));
    var y = Math.round(1 + (Math.random() * 12));
    correctAns = x * y;

    document.getElementById("question").innerHTML=x + " x " + y;
    var randSelect = Math.floor(1 + (Math.random() * 4));
    document.getElementById("box"+randSelect).innerHTML=correctAns;

    var answers = [correctAns];

    for(i=1; 1<4; i++){
        if(i != randSelect){
            var wrongAns;
            do{
                wrongAns = Math.floor(1 + Math.random() * 12) * Math.round(1 + Math.random() * 12); 
            }while(answers.indexOf(wrongAns) > -1);
            document.getElementById("box"+i).innerHTML=wrongAns;
            answers.push(wrongAns);
        }  

    }
}