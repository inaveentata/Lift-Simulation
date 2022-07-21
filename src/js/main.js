const numOfFloors = document.getElementById("numOfFloors");
const numOfLifts = document.getElementById("numOfLifts");
const generator = document.getElementById("generator");
const output = document.getElementById("output");

generator.addEventListener("click", () => {
  if (numOfFloors.value >= 1 && numOfLifts.value >= 1) {
    output.innerHTML = floorsGenerator(numOfFloors.value);
  } else {
    output.innerHTML = `<p class='info'>Not selected enough Floors or Lifts! Try again</p>`;
    setTimeout(() => {
      output.innerHTML = "";
    }, 3000);
  }
});

function floorsGenerator(totalFloors) {
  let floors = ``;
  for (let i = totalFloors - 1; i >= 0; i--) {
    floors += `<div class="floor-container" data-floorContainer="${i}"><div class='wrapper'>
    
      <div class="lift-btns">
        <button class="toggle btn-up" data-floor="${i}">UP</button>
        <button class="toggle btn-down" data-floor="${i}">Down</button>
      </div>
      <div class='lift-container'>
      ${i === 0 ? liftsGenerator(numOfLifts.value) : ""}
      </div>
    </div>
    <div class="floor">
      <div class="floor-line"></div>
      <div class="floor-num-text">
        Floor : <span class="floor-num">${i}</span>
      </div>
    </div>
  </div>`;
  }
  return floors;
}

function liftsGenerator(totalLifts) {
  let lifts = "";
  for (let i = 0; i < totalLifts; i++) {
    lifts += `<div class="lift" data-liftposition="0">
    <div class="left-door"></div>
    <div class="right-door"></div>
  </div>`;
  }
  return lifts;
}

let currentFloor = 0;
document.addEventListener("click", (e) => {
  if (e.target.classList.contains("toggle")) {
    if (e.target.dataset.floor == currentFloor) {
      return;
    } else {
      checkForLift(e.target.dataset.floor);
    }
    currentFloor = e.target.dataset.floor;
  }
});

function checkForLift(targetFloor) {
  const allLifts = Array.from(document.getElementsByClassName("lift"));
  for (let index = 0; index < allLifts.length; index++) {
    if (!allLifts[index].classList.contains("engaged")) {
      startLift(targetFloor, allLifts[index]);
      return;
    }
  }
}

function startLift(targetFloor, idleLift) {
  const currentLiftPostion = idleLift.dataset.liftposition;
  const time = Math.abs(targetFloor - currentLiftPostion);
  idleLift.style.transition = `transform ${time * 2}s linear`;
  idleLift.style.transform = `translateY(${-85 * targetFloor}px)`;
  idleLift.classList.add("engaged");
  idleLift.dataset.liftposition = targetFloor;
  setTimeout(() => {
    idleLift.children[0].classList.add("move-left");
    idleLift.children[1].classList.add("move-right");
  }, time * 2000 + 1000);
  setTimeout(() => {
    idleLift.children[0].classList.remove("move-left");
    idleLift.children[1].classList.remove("move-right");
  }, time * 2000 + 4000);

  setTimeout(() => {
    idleLift.classList.remove("engaged");
  }, time * 2000 + 6000);
}
