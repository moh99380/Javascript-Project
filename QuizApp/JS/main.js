let mySpanNumber = document.getElementById("numberOfque");
let bulletsSpanContainer = document.querySelector(".bullets .spans");
let bullets= document.querySelector(".bullets");
let questionsArea = document.querySelector(".question_area");
let answersArea = document.querySelector(".answers_area");
let submitbutton=document.getElementById("send");
let ResultContnaier=document.getElementById("Result");
let timer=document.getElementById("time");
 
 //the number of current Questions
 let curentIndex = 0;
 //number of Right Answers 
 let NumberOfRightAnswers=0;
 let countinterval;
function GetQuestions() {
  let myRequst = new XMLHttpRequest();
  myRequst.open("GET", "main.json", true);
  myRequst.send();
  myRequst.onreadystatechange = () => {
    if (myRequst.readyState === 4 && myRequst.status === 200) {
      let questionsObject = JSON.parse(myRequst.responseText);
      let nubmerOfquestions = questionsObject.length;
      //creat Bulletes
      createBullets(nubmerOfquestions);
      //Add questionData
      addQuestionData(questionsObject[curentIndex], nubmerOfquestions);
        // Handle Bullets Class
        countTime(3,nubmerOfquestions);
      //on click submit
      submitbutton.onclick=()=>
      {
        let RightAnswer=questionsObject[curentIndex].right_answer;
        curentIndex++;
       chickAnswer(RightAnswer,nubmerOfquestions);
       //remove the old question
       questionsArea.innerHTML="";
       answersArea.innerHTML="";
       addQuestionData(questionsObject[curentIndex], nubmerOfquestions);
       handleBullets();
        //clear time for the prvius question
       clearInterval(countinterval);
       //Set New time to the Next question
       countTime(3,nubmerOfquestions);
       //function to Show Result
       showResult(nubmerOfquestions);
      }
    }
  };
}

GetQuestions();


function createBullets(num) {
    mySpanNumber.innerHTML = num;
 
    // Create Spans
    for (let i = 0; i < num; i++) {
      // Create Bullet                             
      let theBullet = document.createElement("span"); 
  
      // Check If Its First Span
      if (i === 0) {
        theBullet.className = "on";
       
      }
  
      // Append Bullets To Main Bullet Container
      bulletsSpanContainer.appendChild(theBullet);
    }
  }
 
  function handleBullets() {
    let bulletsSpans = document.querySelectorAll(".bullets .spans span");
    let arrayOfSpans = Array.from(bulletsSpans);
    for(let i=0;i<arrayOfSpans.length;i++)
    {
        if(i==curentIndex)
        {
            arrayOfSpans[i].className ="on"; 
             
        }
    }
  }

//create Element dynamic
function addQuestionData(obj, qcount) {
    if(curentIndex<qcount){
        //create H2 this is the question title
  let myheader = document.createElement("h2");
  //create the text of question
  let headerText = document.createTextNode(obj["title"]);
  //Append text to header
  myheader.appendChild(headerText);
    //Append Header To questionsArea
    questionsArea.prepend(myheader);
    //create answers
  for (let i = 1; i<=4;i++) {
    //Create Div With ClassName Anwser
    let divAnswer = document.createElement("div");
    //Add Class on div
    divAnswer.className = "answer";
    //create Input type radio
    let inputRadio = document.createElement("input");
    //Add type + name +id + dataset
    inputRadio.type = "radio";
    inputRadio.name = "selected_answer";
    inputRadio.id = `answer_${i}`;
    inputRadio.dataset.answer =obj[`answer_${i}`];
   
    //create label And add attribute for to connect with input
    let theLabel=document.createElement("label");
    theLabel.htmlFor=`answer_${i}`;
    //create label Text
   let LabelText1=document.createTextNode(obj[`answer_${i}`]);
   //Append text To Label
   theLabel.appendChild(LabelText1);
   //Append first input than Label
   divAnswer.appendChild(inputRadio);
   divAnswer.appendChild(theLabel);
   answersArea.appendChild(divAnswer);
    
  }

    }
  
}
 
function chickAnswer(Ranswer,Nquestions)
{
   
   let answers=document.getElementsByName("selected_answer");
   //var To stor the student answer
   let choosedAnswer;
   for( let i=0;i<answers.length;i++)
   {
    if(answers[i].checked)
    {
        choosedAnswer=answers[i].dataset.answer;
         StoreInLocalStorage(choosedAnswer);
        if(choosedAnswer===Ranswer)
        {
            NumberOfRightAnswers++;
           
        }
    }
   }
   
}
let x=1;
function StoreInLocalStorage(selectedanswer)
{
    localStorage.setItem(`answerOfqustion NO:${x++}`,selectedanswer);

}

function showResult(nubmerOfquestions)
{
  if(curentIndex===nubmerOfquestions)
  {
    let RetingAndRueslt;
    submitbutton.remove();
    bullets.remove();
    questionsArea.remove();
    answersArea.remove();
    if(NumberOfRightAnswers<(nubmerOfquestions/2))
    {
      RetingAndRueslt=`<span class="pad">Pad</span> ${NumberOfRightAnswers} From ${nubmerOfquestions}`
    }
    else if(NumberOfRightAnswers==nubmerOfquestions)
    {
      RetingAndRueslt=`<span class="perfect">Perfect</span> ${NumberOfRightAnswers} From ${nubmerOfquestions}`
    }
    else
    {
      RetingAndRueslt=`<span class="good">Good</span> ${NumberOfRightAnswers} From ${nubmerOfquestions}`
    }
    ResultContnaier.innerHTML=RetingAndRueslt;
    ResultContnaier.style.backgroundColor="#eee";
    ResultContnaier.style.textAlign="center";
    ResultContnaier.style.marginTop="10px";
    ResultContnaier.style.padding="10px";

  }
}
//function countdownTime
function countTime(duration ,nubmerOfquestions)
{
if(curentIndex<nubmerOfquestions)
{
  let minutes,seconds;
  countinterval=setInterval(() => {
    minutes=parseInt(duration / 60);
    seconds=parseInt(duration % 60);
    minutes=minutes<10?`0${minutes}`:minutes;
    seconds=seconds<10?`0${seconds}`:seconds;
    timer.innerHTML=`${minutes}:${seconds}`
    if(--duration<0)
    {
     clearInterval(countinterval) ;
     submitbutton.onclick();
    }
  }, 1000);
}

}
// window.onload=()=>
// {
//     localStorage.clear();
// }

 
 