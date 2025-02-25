let stations = {
  stationAbbr: [
    "12th", "16th", "19th", "24th", "ashb", "antc", "balb", "bayf",
    "bery", "cast", "civc", "cols", "colm", "conc", "daly", "dbrk",
    "dubl", "deln", "plza", "ember", "frmt", "ftvl", "glen", "hayw",
    "lafy", "lake", "mcar", "mlbr", "mlpt", "mont", "nbrk", "ncon",
    "oakl", "orin", "pitt", "pctr", "phil", "powl", "rich", "rock",
    "sbrn", "sfia", "sanl", "shay", "ssan", "ucty", "warm", "wcrk",
    "wdub", "woak"
  ],
  stationNames: [
    "12th", "16th", "19th", "24th", "ashby", "antioch", "balboa park",
    "bay fair", "berryessa", "castro valley", "civic center",
    "coliseum", "colma", "concord", "daly city", "downtown berkeley",
    "dublin pleasanton", "el cerrito del norte", "el cerrito plaza",
    "embarcadero", "fremont", "fruitvale", "glen park", "hayward",
    "lafayette", "lake merritt", "macarthur", "millbrae", "milpitas",
    "montgomery", "north berkeley", "north concord", "oakland airport",
    "orinda", "pittsburg", "pittsburg center", "pleasant hill",
    "powell", "richmond", "rockridge", "san bruno", "sf airport",
    "san leandro", "south hayward", "south sf", "union city",
    "warm springs", "walnut creek", "west dublin", "west oakland"
  ]
};

let input, button, mapButton, mapImage;
let scrollingTrains = [];
let apiKey = "Q52K-PUEI-929T-DWEI"; 
let showMap = false;
let canvasContainer;

class ScrollingText {
  constructor(speed, results) {
    this.x = 20; // Fixed x position to keep trains aligned
    this.yPositions = Array(results.length).fill().map((_, i) => height + i * 28);
    this.speed = speed;
    this.results = results;
  }

  update() {
    for (let i = 0; i < this.yPositions.length; i++) {
      this.yPositions[i] -= this.speed;
      if (this.yPositions[i] < -28) {
        this.yPositions[i] = height;
      }
    }
  }

  display() {
    for (let i = 0; i < this.results.length; i++) {
      let yOffset = this.yPositions[i];
      push();
      fill(255, 150, 100);
      text(this.results[i], this.x, yOffset);
      pop();
    }
  }
}

function preload() {
  // Replace 'map.png' with the actual file path of your map image
  mapImage = loadImage('map.jpg');
}

function setup() {
  canvasContainer = $("#canvas-container");
  let canvas = createCanvas(canvasContainer.width(), canvasContainer.height());
  canvas.parent("canvas-container");
  textFont("monospace");
  textSize(18);
  textAlign(LEFT, TOP);

  let buttonOffset = 50; // Adjust this value to move buttons further down

  input = createInput();
  input.position(75, height - 20 + buttonOffset);

  button = createButton("Get Trains");
  button.position(input.x + input.width + 10, height - 20 + buttonOffset);
  button.mousePressed(fetchTrains);

  mapButton = createButton("Toggle Map");
  mapButton.position(button.x + button.width + 30, height - 20 + buttonOffset);
  mapButton.mousePressed(toggleMap);
}

function draw() {
  background(0);

  if (showMap) {
    image(mapImage, 0, 0, width , height); // Display the map if toggled on
  } else {
    for (let train of scrollingTrains) {
      train.update();
      train.display();
    }
  }
}

async function fetchTrains() {
  let userInput = input.value().toLowerCase();
  input.value('');

  let stationCode = getStationCode(userInput);
  if (!stationCode) {
    scrollingTrains.push(new ScrollingText(1, ["Invalid station name"]));
    return;
  }

  let url = `https://api.bart.gov/api/etd.aspx?cmd=etd&orig=${stationCode}&key=${apiKey}&json=y`;
  let response = await fetch(url);
  let json = await response.json();

  let results = [];
  if (json.root.station.length > 0 && json.root.station[0].etd) {
    json.root.station[0].etd.forEach(train => {
      let trainInfo = `Train to ${train.destination}, Arrives in ${train.estimate[0].minutes} min`;
      results.push(trainInfo);
    });
  } else {
    results.push("No trains currently running");
  }

  scrollingTrains.push(new ScrollingText(random(1, 2), results));
}

// Function to get station code from input
function getStationCode(userInput) {
  let index = stations.stationNames.indexOf(userInput);
  if (index === -1) {
    index = stations.stationAbbr.indexOf(userInput);
  }
  return index !== -1 ? stations.stationAbbr[index].toUpperCase() : null;
}

// Function to toggle the map display
function toggleMap() {
  showMap = !showMap;
}

// Function to clear trains when space is pressed
function keyPressed() {
  if (key === ' ') {
    scrollingTrains = [];
  }
}
