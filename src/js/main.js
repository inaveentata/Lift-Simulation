const increaseFloor = document.querySelector("#increase-floor");
const increaseLift = document.querySelector("#increase-lift");
const building = document.querySelector(".building");
const liftContainer = document.querySelector(".lift-container");
const lift = document.querySelector('.lift')
const leftDoor = document.querySelector(".left-door");
const rightDoor = document.querySelector(".right-door");

function moveDoors() {
  leftDoor.classList.add("move-left");
  rightDoor.classList.add("move-right");
  setTimeout(() => {
    leftDoor.classList.remove("move-left");
    rightDoor.classList.remove("move-right");
  }, 2500);
}

increaseFloor.addEventListener("click", () => {
  const newFloor = building.firstElementChild.cloneNode(true);
  let newFlooreNum = newFloor.querySelector(".floor-num");
  newFlooreNum.textContent = Number(newFlooreNum.textContent) + 1;
  let toggleBtns = newFloor.querySelectorAll(".toggle");
  toggleBtns[0].dataset.floor = Number(toggleBtns[0].dataset.floor) + 1;
  toggleBtns[1].dataset.floor = Number(toggleBtns[1].dataset.floor) + 1;
  if (newFloor.firstElementChild.lastElementChild.isEqualNode(liftContainer)) {
    newFloor.firstElementChild.removeChild(
      newFloor.firstElementChild.lastElementChild
    );
  }
  building.prepend(newFloor);
});

increaseLift.addEventListener("click", () => {
  liftContainer.append(lift.cloneNode(true));
});

let currentFloor = 0;

document.addEventListener("click", (e) => {
  if (e.target.classList.contains("toggle")) {
    if (e.target.dataset.floor == currentFloor) {
      moveDoors();
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
