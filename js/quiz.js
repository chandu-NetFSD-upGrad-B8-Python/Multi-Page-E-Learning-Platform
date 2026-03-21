/* -------- REAL QUIZ DATA -------- */
const quizData = [
{
question: "What does HTML stand for?",
options:["Hyper Text Markup Language","High Text Machine Language","Hyperlinks Text Mark Language","Home Tool Markup Language"],
answer:"Hyper Text Markup Language"
},
{
question: "Which tag is used for links?",
options:["<a>","<link>","<href>","<url>"],
answer:"<a>"
},
{
question: "Which CSS property controls text size?",
options:["font-size","text-style","text-size","font-style"],
answer:"font-size"
},
{
question: "Which is JavaScript framework?",
options:["React","Django","Spring","Laravel"],
answer:"React"
},
{
question: "Which symbol is used for comments in JS?",
options:["//","<!-- -->","#","**"],
answer:"//"
},
{
question: "Which database is relational?",
options:["MySQL","MongoDB","Firebase","Redis"],
answer:"MySQL"
},
{
question: "Which keyword declares variable in JS?",
options:["let","int","varr","define"],
answer:"let"
},
{
question: "Which is backend language?",
options:["Java","HTML","CSS","Bootstrap"],
answer:"Java"
},
{
question: "Which is styling language?",
options:["CSS","HTML","Python","Java"],
answer:"CSS"
},
{
question: "Which is used for responsive design?",
options:["Bootstrap","Java","Node","Spring"],
answer:"Bootstrap"
},
{
question: "Which method prints in console?",
options:["console.log()","print()","echo()","log()"],
answer:"console.log()"
},
{
question: "Which tag for image?",
options:["<img>","<image>","<pic>","<src>"],
answer:"<img>"
},
{
question: "Which is frontend library?",
options:["React","Spring","Hibernate","Flask"],
answer:"React"
},
{
question: "Which is NoSQL DB?",
options:["MongoDB","MySQL","Oracle","Postgres"],
answer:"MongoDB"
},
{
question: "Which company created Java?",
options:["Sun Microsystems","Google","Microsoft","IBM"],
answer:"Sun Microsystems"
}
];

/* -------- LOAD QUIZ -------- */
async function loadQuiz(){
return new Promise(res=>{
setTimeout(()=>res(quizData),500);
});
}

/* -------- INIT -------- */
async function init(){

const data = await loadQuiz();

const form = document.getElementById("quizForm");
form.innerHTML = "";

data.forEach((q,i)=>{
form.innerHTML += `
<div class="mb-3">
<p><b>Q${i+1}. ${q.question}</b></p>
${q.options.map(opt=>`
<label>
<input type="radio" name="q${i}" value="${opt}" onchange="handleChange()"> ${opt}
</label><br>
`).join("")}
</div>
`;
});
}

init();

/* -------- TIMER -------- */
let time = 300;

const timerInterval = setInterval(()=>{
let min = Math.floor(time/60);
let sec = time % 60;

document.getElementById("timer").innerText =
`${min}:${sec < 10 ? "0"+sec : sec}`;

time--;

if(time < 0){
clearInterval(timerInterval);
submitQuiz();
}
},1000);

/* -------- SUBMIT -------- */
function submitQuiz(){

  let answered = document.querySelectorAll('input[type="radio"]:checked').length;

if(answered === 0){
  alert("Please answer at least one question!");
  return;
}

clearInterval(timerInterval);

let score = 0;

quizData.forEach((q,i)=>{
let ans = document.querySelector(`input[name="q${i}"]:checked`);
if(ans && ans.value === q.answer){
  score++;
}
});

let percent = Math.round((score/quizData.length)*100);

/* GRADE */
let grade;
if(percent > 80) grade="A";
else if(percent > 50) grade="B";
else grade="C";

/* MESSAGE */
let msg;
switch(grade){
case "A": msg="Excellent 🔥"; break;
case "B": msg="Good 👍"; break;
default: msg="Keep Practicing 💪";
}

/* SAVE USER DATA */
let user = JSON.parse(localStorage.getItem("user")) || {};

if(!user.completedQuizzes) user.completedQuizzes = [];
if(!user.points) user.points = 0;

/* GET COURSE NAME */
let params = new URLSearchParams(window.location.search);
let courseName = params.get("course");

/* PREVENT DUPLICATE */
if(courseName && !user.completedQuizzes.includes(courseName)){
  user.completedQuizzes.push(courseName);
  user.points += 10;
}

/* PRACTICE TRACK */
let today = new Date().toISOString().split("T")[0];
let practice = JSON.parse(localStorage.getItem("practiceDates")) || [];

if(!practice.includes(today)){
  practice.push(today);
  localStorage.setItem("practiceDates", JSON.stringify(practice));
}

localStorage.setItem("user", JSON.stringify(user));

/* SHOW RESULT */
document.getElementById("result").innerHTML =
`<div class="alert alert-success mt-3">
Score: ${percent}% <br>
Grade: ${grade} <br>
${msg}
</div>`;
}

function handleChange(){
  console.log("Option selected");
}
