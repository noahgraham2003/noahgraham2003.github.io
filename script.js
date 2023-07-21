var timer;
var timers = [
  { label: "Pomodoro", minutes: 25 },
  { label: "Short Break", minutes: 5 },
  { label: "Long Break", minutes: 15 },
];
var currentTimerIndex = 0;
var minutes = timers[currentTimerIndex].minutes;
var seconds = 0;
var isRunning = false;

function chooseTimer(index) {
  if (!isRunning && currentTimerIndex !== index) {
    var buttons = document.getElementsByTagName("button");
    buttons[currentTimerIndex].classList.remove("active");
    buttons[index].classList.add("active");
    currentTimerIndex = index;
    minutes = timers[currentTimerIndex].minutes;
    seconds = 0;
    updateTimerDisplay();
  }
}

function toggleTimer() {
  var startStopBtn = document.getElementById("startStopBtn");

  if (isRunning) {
    stopTimer();
    startStopBtn.innerHTML = "Start";
  } else {
    if (minutes === 0 && seconds === 0) {
      resetTimer();
    }
    startTimer();
    startStopBtn.innerHTML = "Stop";
  }

  updateTabTitle();
}

function resetTimer() {
  isRunning = false;
  clearInterval(timer);
  minutes = timers[currentTimerIndex].minutes;
  seconds = 0;
  updateTimerDisplay();
  updateTabTitle();
}

function startTimer() {
  isRunning = true;
  updateTimer();
  timer = setInterval(updateTimer, 1000);
  updateTabTitle();
}


function stopTimer() {
  isRunning = false;
  clearInterval(timer);
  updateTabTitle();
}

function updateTimer() {
  var timerDisplay = document.getElementById("timer");
  var timerLabel = document.getElementById("timerLabel");

  if (seconds === 0) {
    if (minutes === 0) {
      // Timer has ended
      timerDisplay.innerHTML = "Time's up!";
      stopTimer();

      // Move to the next timer
      currentTimerIndex++;
      if (currentTimerIndex >= timers.length) {
        currentTimerIndex = 0;
      }

      // Update the minutes and seconds based on the next timer
      minutes = timers[currentTimerIndex].minutes;
      seconds = 0;

      // Update the timer label
      timerLabel.innerHTML = timers[currentTimerIndex].label;

      updateTabTitle(); // Add this line to update the tab title after the timer ends
      return;
    } else {
      minutes--;
      seconds = 59;
    }
  } else {
    seconds--;
  }

  updateTimerDisplay();
  updateTabTitle(); // Add this line to update the tab title while the timer is running
}


function updateTimerDisplay() {
  var minutesDisplay = document.getElementById("minutes");
  var secondsDisplay = document.getElementById("seconds");

  minutesDisplay.textContent = minutes < 10 ? "0" + minutes : minutes;
  secondsDisplay.textContent = seconds < 10 ? "0" + seconds : seconds;
}

function addTodoItem() {
  var todoInput = document.getElementById("todoInput");
  var todoList = document.getElementById("todoList");
  var todoText = todoInput.value.trim();

  if (todoText !== "") {
    var listItem = document.createElement("li");
    var checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.addEventListener("change", function() {
      this.parentElement.classList.toggle("completed");
    });
    var label = document.createElement("label");
    label.appendChild(checkbox);
    label.appendChild(document.createTextNode(todoText));
    listItem.appendChild(label);
    var deleteButton = document.createElement("button");
    deleteButton.innerHTML = "Delete";
    deleteButton.addEventListener("click", function() {
      this.parentElement.remove();
    });
    listItem.appendChild(deleteButton);
    todoList.appendChild(listItem);

    todoInput.value = "";
  }
}

// Function to update the tab title with the remaining time
function updateTabTitle() {
  if (isRunning) {
    document.title = formatTime(minutes) + ":" + formatTime(seconds) + " - Pomodoro Timer";
  } else {
    document.title = "Pomodoro Timer";
  }
}

// Function to format the time in "00" format
function formatTime(time) {
  return time < 10 ? "0" + time : time;
}