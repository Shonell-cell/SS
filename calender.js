 const questions = [
    "What Subjects Are You Not Good At?",
    "What Subjects Can You Handle But Are Not Particularly Easy?",
    "What Subjects Are You Particularly Good At?"
  ];

  let answers = {
    weak: [],
    fair: [],
    good: []
  };

  let step = 0;

  document.getElementById('btn').addEventListener('click', () => {
    const input = document.getElementById('input');
    const value = input.value.trim();
    const feedback = document.getElementById('catch');

    if (value === "") {
      feedback.textContent = "Please enter your subjects.";
      feedback.style.color = "red";
      return;
    }

    feedback.textContent = "";

    const subjects = value.split(',').map(s => s.trim());

    if (step === 0) answers.weak = subjects;
    if (step === 1) answers.fair = subjects;
    if (step === 2) answers.good = subjects;

    step++;

    if (step < questions.length) {
      document.getElementById('qq').textContent = questions[step];
      input.value = "";
    } else {
      document.getElementById('qq').textContent = "Here's Your Study Schedule!";
      input.style.display = "none";
      document.getElementById('btn').style.display = "none";
      document.getElementById('catch').textContent = "Your Study Schedule is being generated...";

      generateTimetable()// 💡 Call this AFTER collecting answers
      document.getElementById('table').style.display = "block";
      document.getElementById('cct').style.display = "flex";
    }
  });

  // Time slot setup
  const days = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"];
  const sessionsPerDay = 3;
  let timeSlots = [];

  for (let day of days) {
    for (let i = 1; i <= sessionsPerDay; i++) {
      timeSlots.push(`${day}${i}`);
    }
  }

  function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  // ✅ The timetable generator
  function generateTimetable() {
    let plan = [];

    answers.weak.forEach(sub => {
      for (let i = 0; i < 5; i++) plan.push(sub + " (Weak)");
    });

    answers.fair.forEach(sub => {
      for (let i = 0; i < 3; i++) plan.push(sub + " (Fair)");
    });

    answers.good.forEach(sub => {
      for (let i = 0; i < 2; i++) plan.push(sub + " (Good)");
    });

    shuffle(plan);
    shuffle(timeSlots);

    for (let i = 0; i < plan.length && i < timeSlots.length; i++) {
      const cell = document.getElementById(timeSlots[i]);
      if (cell) cell.textContent = plan[i];
    }

    document.getElementById('catch').textContent = "Timetable generated successfully!";
  }


document.getElementById('btn2').addEventListener('click',function(){
  const color = document.getElementById('color').value;
  // Change background color of all <th> elements
  const ths = document.querySelectorAll('th');
  ths.forEach(th => {
    th.style.backgroundColor = color;
  });
})
 