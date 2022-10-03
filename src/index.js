import Matter, { World } from "matter-js";
import "./styles.css";
import A from "./cavalete.png"
import S from "./hand.png"
import T from "./hand2.png"
import B from "./box.png"



// Canvas setup
var canvas = document.getElementById("world");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener("resize", function () {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

function percentX(percent) {
  return Math.round((percent / 100) * canvas.width);
}
function percentY(percent) {
  return Math.round((percent / 100) * canvas.height);
}
//

var Engine = Matter.Engine;
var Render = Matter.Render;
var Bodies = Matter.Bodies;
var Body = Matter.Body;
var Mouse = Matter.Mouse;
var MouseConstraint = Matter.MouseConstraint;
var Runner = Matter.Runner;
//var Events = Matter.Events;

// Setup Engine, Runner, World and Render
var engine = Engine.create();
var runner = Runner.create();
var world = engine.world;
var render = Render.create({
  element: canvas,
  engine: engine,
  options: {
    wireframes: false,
    // showBounds: true,
    // hasBounds: true,
    width: percentX(100),
    height: percentY(100),
    background: "transparent"
  }
});

Render.run(render);
Runner.run(runner, engine);

engine.positionIterations = 100;
engine.velocityIterations = 100;

//
var wordSize = 80; {

}

var monique = Bodies.rectangle(
  percentX(25),
  -percentY(75),
  percentY(15) + percentX(6),
  percentY(15) + percentX(6),

  {
    density: 0.001,
    friction: 1,
    frictionAir: 0.07,
    restitution: 0,
    render: {
      sprite: {
        texture: A,
        xScale: (percentY(15) + percentX(6)) / 800,
        yScale: (percentY(15) + percentX(6)) / 800,

      }

    }
  }
);

var ethan = Bodies.rectangle(
  percentX(25),
  -percentY(75),
  percentY(20) + percentX(3),
  percentY(20) + percentX(3),
  {

    density: 0.001,
    friction: 1,
    frictionAir: 0.07,
    restitution: 0,
    render: {
      sprite: {
        texture: S,
        xScale: (percentY(15) + percentX(6)) / 800,
        yScale: (percentY(15) + percentX(6)) / 800,


      }

    }
  }
);


var drawer = Bodies.rectangle(
  percentX(125),
  percentY(50),
  percentX(50),
  percentY(800),
  {
    isStatic: true,
    friction: 0.3,
    restitution: 0,
    frictionStatic: 1,
    render: { fillStyle: "transparent" }
  }
);

var ball1 = Bodies.rectangle(
  percentX(55),
  -percentY(75),
  percentY(20) + percentX(3),
  percentY(20) + percentX(3),
  {

    density: 0.001,
    friction: 1,
    frictionAir: 0.07,
    restitution: 0,
    render: {
      sprite: {
        texture: T,
        xScale: (percentY(15) + percentX(6)) / 800,
        yScale: (percentY(15) + percentX(6)) / 800,

      }

    }
  }
);

var milk = Bodies.rectangle(
  percentX(75),
  -percentY(75),
  percentY(20) + percentX(3),
  percentY(20) + percentX(3),
  {

    density: 0.001,
    friction: 1,
    frictionAir: 0.07,
    restitution: 0,
    render: {
      sprite: {
        texture: B,
        xScale: (percentY(15) + percentX(6)) / 800,
        yScale: (percentY(15) + percentX(6)) / 800,
      }

    }
  }
);

//Ceiling
var ceiling = Bodies.rectangle(
  percentX(50),
  -percentY(1400),
  percentX(800),
  percentY(800),
  {
    isStatic: true,
    render: { fillStyle: "" }
  }
);

var wallOptions = {
  isStatic: true,
  render: {
    fillStyle: ""
  }
};

World.add(world, [
  //Left
  Bodies.rectangle(
    -percentX(400),
    percentY(50),
    percentX(800),
    percentY(800),
    wallOptions
  ),
  //Floor
  Bodies.rectangle(
    percentX(50),
    percentY(500),
    percentX(800),
    percentY(800),
    wallOptions
  ),
  milk,
  monique,
  ball1,
  ethan,
  drawer,
  ceiling
]);

//Move ceiling to 100vh after bodies fall into view
console.log(ceiling.position);
function moveCeiling() {
  Body.setPosition(ceiling, { x: percentX(50), y: -percentY(400) });
  console.log(ceiling.position);
}
setTimeout(moveCeiling, 3000);

var mouse = Mouse.create(render.canvas);
var mouseConstraint = MouseConstraint.create(engine, {
  mouse: mouse,
  constraint: {
    stiffness: 1,
    render: {
      visible: false
    }
  }
});

World.add(world, mouseConstraint);
render.mouse = mouse;

// Update resize
var resizeTimeout;
window.addEventListener("resize", function (event) {
  clearTimeout(resizeTimeout);
  resizeTimeout = setTimeout(function () {
    window.location.reload();
  }, 500);
});

function menuOpen() {
  var menu = document.getElementById("menu");
  menu.classList.toggle("open");
}

//Create a loop to act as a timer, which will update position of drawer using cos function
function countUp(max, time) {
  var px = 0;
  var deg = -1;
  //convert desgrees to radians
  var RADIANS = deg * (Math.PI / 180);
  //console.log(Math.cos(RADIANS));
  var step = time / max; // calculate the time between two steps of counting
  // create an inner function that performs one step of counting
  var fn = function () {
    deg++;
    if (deg <= max) {
      // if the limit is not reached, display the number ...
      RADIANS = deg * (Math.PI / 180);
      px = percentX(125) * Math.cos(RADIANS);
      //Body.setVelocity(drawer, { x: px - drawer.position.x, y: 0 });
      Body.setPosition(drawer, { x: px, y: percentY(50) });
      // ... and call the inner function again, after 'step' amount of time
      window.setTimeout(fn, step);
    }
  };
  // call the inner function for the first time
  fn();
}

document.getElementById("menu_button").onclick = () => {
  if (drawer.position.x === percentX(125)) {
    menuOpen();
    countUp(53, 500); // count up to 53.13 in 1000ms
    Body.setPosition(ceiling, { x: percentX(50), y: -percentY(600) });
  } else if (
    drawer.position.x ===
    percentX(125) * Math.cos(53 * (Math.PI / 180))
  ) {
    menuOpen();
    Body.setPosition(drawer, { x: percentX(125), y: percentY(50) });
    setTimeout(moveCeiling, 2000);
  }
};

document.getElementById("close").onclick = () => {
  if (drawer.position.x === percentX(125)) {
    menuOpen();
    countUp(53, 500); // count up to 53.13 in 1000ms
    Body.setPosition(ceiling, { x: percentX(50), y: -percentY(600) });
  } else if (
    drawer.position.x ===
    percentX(125) * Math.cos(53 * (Math.PI / 180))
  ) {
    menuOpen();
    Body.setPosition(drawer, { x: percentX(125), y: percentY(50) });
    setTimeout(moveCeiling, 2000);
  }
};
