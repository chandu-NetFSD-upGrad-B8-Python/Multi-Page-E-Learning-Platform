/* GET USER */
function getUser(){
  return JSON.parse(localStorage.getItem("user")) || {};
}

/* SAVE USER */
function saveUser(user){
  localStorage.setItem("user", JSON.stringify(user));
}

/* ADD POINTS */
function addPoints(type){
  let user = getUser();

  if(!user.points) user.points = 0;

  if(type === "course"){
    user.points += 10;
  }

  if(type === "quiz"){
    user.points += 20;
  }

  saveUser(user);
}
