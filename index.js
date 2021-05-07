let rocketImage = document.querySelector(".rocket_img");
let rocket = document.querySelector(".rocket");
let rocketBlock = document.querySelector(".rocket_block");
let planetWithOrbit = document.querySelector(".planet_with_orbit");
planetWithOrbit.style.top = "50%";
planetWithOrbit.style.left = "50%";

let rocketStyleSettings = {
  left: "-11vw",
  transform: "scale(1)",
};

function initRocketStyleSettings() {
  for (let prop in rocketStyleSettings) {
    rocket.style[prop] = rocketStyleSettings[prop];
  }
}

function createStars() {
  let count = 100;
  let scene = document.querySelector(".scene");
  let i = 0;
  while (i < count) {
    let star = document.createElement("i");
    star.classList.add("star");
    let x = Math.floor(Math.random() * window.innerWidth);
    let duration = randomNum(0.3, 10);
    let h = Math.random() * 8;

    star.style.left = x + "px";
    star.style.width = 1 + "px";
    star.style.height = h + "px";
    star.style.borderRadius = "100px";
    star.style.animationDuration = duration + "s";

    scene.appendChild(star);
    i++;
  }
}

function randomNum(min, max) {
  return Math.random() * (max - min) + min;
}

function startRocketFlyingInSpace() {
  rocketBlock.classList.add("rocket_fly_animation");
  rocket.classList.add("rocket_big_fire");
}

function startRocketFlyingAroundEarth() {
  rocketBlock.classList.add("rocket_fly_around_earth_animate");
  rocket.classList.add("rocket_small_fire");
}

function stopRocketFlyingAroundEarth() {
  rocketBlock.classList.remove("rocket_fly_around_earth_animate");
  rocket.classList.remove("rocket_small_fire");
}

function removeEarthWithOrbit() {
  let top = +planetWithOrbit.style.top
    .split("")
    .filter((x) => x !== "%")
    .join("");
  if (top !== 150) {
    planetWithOrbit.style.top = top + 1 + "%";
    requestAnimationFrame(removeEarthWithOrbit);
  }
}

// setTimeout(() => removeEarthWithOrbit(), 1000);

function rocketToCenter() {
  const left = +rocketStyleSettings.left.replace("vw", "");
  if (left < 0) {
    const newLeftStyle = left + 0.25 + "vw";
    rocketStyleSettings.left = newLeftStyle;
    rocket.style.left = newLeftStyle;
    requestAnimationFrame(rocketToCenter);
  }
}

function rocketScale([scaleTo, scaleStep, timeout = 0]) {
  setTimeout(() => {
    const transform = +rocketStyleSettings.transform
      .replace("scale(", "")
      .replace(")", "");
    if (transform < scaleTo) {
      const newTransformStyle = `scale(${transform + scaleStep})`;
      rocketStyleSettings.transform = newTransformStyle;
      rocket.style.transform = newTransformStyle;
      requestAnimationFrame(rocketScale.bind(this, [scaleTo, scaleStep]));
    }
  }, timeout);
}

// setTimeout(() => {
//   rocketToCenter();
//   rocketScale();
// }, 1000);

setTimeout(() => {
  stopRocketFlyingAroundEarth();

  createStars();
  startRocketFlyingInSpace();
  removeEarthWithOrbit();

  // rocket.style.left = '-11vw;';
  // console.log(rocket.style.left);
  setTimeout(() => {
    rocketToCenter();
    rocketScale([17, 0.1, 300]);
  }, 1700);
}, 5000);


startRocketFlyingAroundEarth();

initRocketStyleSettings();