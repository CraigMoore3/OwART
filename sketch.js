// ---------------------------------------------------
//  --- Old World Analysis and Reconstruction Team ---
// ---------------------------------------------------
// Operator is tasked with sorting through, archiving digital ephemera 
// Point-and-Drag, Narrative / Exploration driven
// Looking to create parameters surrounding data capacity or battery life
// ---------------------------------------------------
// Sound Credits
// Lever
// https://freesound.org/people/A_Kuha/sounds/676412/
// ---------------------------------------------------


// --- Globals ---
let playerNode01, playerNode02, playerNode03, deNoiseBtn;
let presses = 0;
let catLoad = false;
let width = 1680;
let height = 1050;
let borderWidth = width*2;
let borderHeight = height*2;
// let imgLoc = (575, 65, 350, 350);

// ---------------------------------------- //

function preload() {
    fullCat = loadImage('assets/fabCat.png');
    cat01 = loadImage('assets/fabCat01.gif');
    cat02 = loadImage('assets/fabCat02.gif');
    cat03 = loadImage('assets/fabCat03.gif');
    cat04 = loadImage('assets/fabCat04.gif');

    garage = loadImage('assets/garage.gif');
    
    anhop01 = loadImage('assets/anhop01.gif');

    bathouse01 = loadImage('assets/bathouse01.gif');

    binoc01 = loadImage('assets/binoc01.gif');

    books01 = loadImage('assets/books01.gif');

    cabin01 = loadImage('assets/cabin01.gif');

    dome01 = loadImage('assets/dome01.gif');

    eagles01 = loadImage('assets/eagles01.gif');

    fetti01 = loadImage('assets/fetti01.gif');

    fish01 = loadImage('assets/fish01.gif');

    kingfisher01 = loadImage('assets/kingfisher01.gif');

    nightDrive01 = loadImage('assets/nightDrive01.gif');

    projx01 = loadImage('assets/projx01.gif');

    river01 = loadImage('assets/river01.gif');

    // runner01 loadImage('assets/runner01.gif');

    takeoff01 = loadImage('assets/takeoff01.gif');

    tarpon01 = loadImage('assets/tarpon01.gif');

    lever01 = loadSound('sound/lever_01.mp3');
    lever01.playMode('untilDone');
}

// ---------------------------------------- //

function setup() {
    let canvas = new Canvas(width, height);
    textFont("Courier", 15);
    noStroke();
    gameLoad();
    world.gravity.y = 10;
}

// ---------------------------------------- //

function draw() {
    clear();
    background('black');
    fill('red');
    rect();
    fill('white');
    text('> Old World Analysis and Reconstruction Team', 50, 550);


    // Mouse Cursor
    if (playerNode01.mouse.hovering() || playerNode02.mouse.hovering() || playerNode03.mouse.hovering() || deNoiseBtn.mouse.hovering()) mouse.cursor = 'grab';
    else {mouse.cursor = 'default';}
  

    // Data Node 01
    if (playerNode01.mouse.dragging()) {
        playerNode01.moveTowards(mouse.x + playerNode01.mouse.x, mouse.y + playerNode01.mouse.y, 1);
        // lever01.play();
    }


    if (playerNode01.overlapping(nodeCheck) > 3) {
        image(cat01,575, 65, 350, 350);
    } if (playerNode01.overlapping(nodeCheck) > 3 && presses >= 1) {
        image(cat02,575,65,350,350);
    } if (playerNode01.overlapping(nodeCheck) > 3 && presses >= 2) {
        image(cat03,575,65,350,350);
    } if (playerNode01.overlapping(nodeCheck) > 3 && presses >= 3) {
        image(cat04,575,65,350,350);
    }


    // Data Node 02
    if (playerNode02.mouse.dragging()) {
        playerNode02.moveTowards(mouse.x + playerNode02.mouse.x, mouse.y + playerNode02.mouse.y, 1)
    }
    if (playerNode02.overlapping(nodeCheck) > 3) {
        image(garage,575, 65, 350, 350);
    }


    // Data Node 03
    if (playerNode03.mouse.dragging()) {
        playerNode03.moveTowards(mouse.x + playerNode03.mouse.x, mouse.y + playerNode03.mouse.y, 1)
    }
    if (playerNode03.overlapping(nodeCheck) > 3) {
        image(takeoff01, 575, 65, 350, 350)
    } 


    // deNoise Button
    if (deNoiseBtn.mouse.pressing() > 1 && deNoiseBtn.mouse.pressing() < 3) {
        presses++;
        deNoiseBtn.x = 750;
        deNoiseBtn.y = 450;
        deNoiseBtn.color = 'maroon';
    } else { 
        deNoiseBtn.x = 752; 
        deNoiseBtn.y = 448; 
        deNoiseBtn.color = 'red';
    }

}

// ---------------------------------------- //

function gameLoad() {

    // Data Node 01 - Fab Cat
    playerNode01 = new Sprite(350,25,25);
    playerNode01.color = 'blue';
    playerNode01.textColor = 'white';
    playerNode01.text = '01';
    playerNode01.drag = 3;
    // playerNode01.layer = 2;

    // Data Node 02 - Garage
    playerNode02 = new Sprite(250, 25, 25);
    playerNode02.color = 'blue';
    playerNode02.textColor = 'white';
    playerNode02.text = '02';
    playerNode02.drag = 3;

    // Data Node 03 - Takeoff
    playerNode03 = new Sprite(255, 25, 25);
    playerNode03.color = 'blue';
    playerNode03.textColor = 'white';
    playerNode03.text = '03';
    playerNode03.drag = 3;

    // Red "Sensor" - visual only
    sensor = new Sprite(450,465);
    sensor.color = 'red';
    sensor.width = 25;
    sensor.height= 50;
    sensor.collider = 'static';

    // Invisible collider sprite - the actual sensor
    nodeCheck = new Sprite(450, 465, 50, 75);
    nodeCheck.layer = 1;
    nodeCheck.collider = 'none'
    nodeCheck.strokeWeight = 0;
    let empty = color(0,0);
    nodeCheck.color = empty;
    
    // Sensor walls
    Lwall = new Sprite (425, 455, 15, 100);
    Lwall.color = "white";
    Lwall.collider = 'static';
    Rwall = new Sprite (475, 455, 15, 100);
    Rwall.color = "white";
    Rwall.collider = 'static';

    platform1 = new Sprite (12, 250, 500, 12);
    platform1.color = 'white';
    platform1.collider = 'static';

    deNoiseBG = new Sprite(750, 450, 60, 60);
    deNoiseBG.color = 'white';
    deNoiseBG.collider = 'static';
    deNoiseBtn = new Sprite(752, 447, 50, 50);
    deNoiseBtn.color = 'red';
    deNoiseBtn.collider = 'static';

    // Border for the gamespace
    // Leftmost border
    let borderL = new Sprite(0,0,12, borderHeight);
    borderL.color = 'white';
    borderL.collider = 'static;'

    // Interior border
    let borderR1 = new Sprite(500,0,12,1000);
    borderR1.color = 'white';
    borderR1.collider = 'static'

    // Rightmost border
    let borderR2 = new Sprite (width, 0, 12, borderHeight);
    borderR2.color = 'white';
    borderR2.collider = 'static'

    // Top border
    let borderT = new Sprite(0, 0, borderWidth, 12);
    borderT.color = 'white';
    borderT.collider = 'static'

    // Bottom border 1
    let borderB1 = new Sprite(0, 500, borderWidth, 12);
    borderB1.color = 'white';
    borderB1.collider = 'static'

    // Bottom border 2
    let borderB2 = new Sprite(0, 750, borderWidth, 12);
    borderB2.color = 'white';
    borderB2.collider = 'static';

    // this sprite can be created on a single line, but it's easier to read this way:
	// spinningShape = new Sprite();
	// spinningShape.width = canvas.width/5;
	// spinningShape.height = spinningShape.width;
    // spinningShape.collider = "kinematic";
}

// ---------------------------------------- //