function calculatePercentage(score,total){
  return (score/total)*100;
}

function getGrade(percent){
  if(percent > 80) return "A";
  else if(percent > 50) return "B";
  else return "C";
}

function isPass(percent){
  return percent >= 50;
}

/* TESTS */
test("percentage calculation", ()=>{
  expect(calculatePercentage(12,15)).toBe(80);
});

test("grade logic", ()=>{
  expect(getGrade(85)).toBe("A");
  expect(getGrade(60)).toBe("B");
  expect(getGrade(30)).toBe("C");
});

test("pass fail", ()=>{
  expect(isPass(60)).toBe(true);
  expect(isPass(40)).toBe(false);
});
