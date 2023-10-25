let playerNode01, playerNode02, playerNode03;
let width = 500;
let height = 500;

function preload() {
    cat = loadImage('assets/fabCat.png');
    garage = loadImage('assets/garage.gif');
    lever01 = loadSound('sound/lever_01.mp3');
    lever01.playMode('untilDone');
}

function setup() {
    let canvas = new Canvas(width, height);
    textFont("Courier", 15);
    noStroke();

    playerNode01 = new Sprite(350,15,25,25);
    playerNode01.color = 'black';
    playerNode01.textColor = 'white';
    playerNode01.text = '01';
    playerNode01.drag = 3;
    // playerNode01.layer = 2;

    playerNode02 = new Sprite(250, 40, 25, 25);
    playerNode02.color = 'black';
    playerNode02.textColor = 'white';
    playerNode02.text = '02';
    playerNode02.drag = 3;

    sensor = new Sprite(450,465);
    sensor.color = 'orange';
    sensor.width = 25;
    sensor.height= 50;
    sensor.collider = 'static';

    nodeCheck = new Sprite(450, 465, 50, 75);
    nodeCheck.layer = 1;
    nodeCheck.collider = 'none'
    nodeCheck.strokeWeight = 0;
    let empty = color(0,0);
    nodeCheck.color = empty;

    Lwall = new Sprite (425, 455, 15, 105);
    Lwall.color = "white";
    Lwall.collider = 'static';
    Rwall = new Sprite (475, 455, 15, 105);
    Rwall.color = "white";
    Rwall.collider = 'static';

    
    let Ldummy = new Sprite(0,0,25,1000);
    Ldummy.color = 'white';
    let Rdummy = new Sprite(500,0,25,1000);
    Rdummy.color = 'white';
    let Tdummy = new Sprite(0,0,1000,25);
    Tdummy.color = 'white';
    let Bdummy = new Sprite(0,500,1000,25);
    Bdummy.color = 'white';
    Ldummy.collider = 'static;'
    Rdummy.collider = 'static'
    Tdummy.collider = 'static'
    Bdummy.collider = 'static'

    world.gravity.y = 10;
    // this sprite can be created on a single line, but it's easier to read this way:
	// spinningShape = new Sprite();
	// spinningShape.width = canvas.width/5;
	// spinningShape.height = spinningShape.width;
    // spinningShape.collider = "kinematic";
}

function draw() {
    clear();
    background('blue');
    fill("white");
    text('Old World Analysis and Reconstruction Team', 50, height/10);
    


    if (playerNode01.mouse.hovering()) mouse.cursor = 'grab';
    else mouse.cursor = 'default';

    if (playerNode01.mouse.dragging()) {
        playerNode01.moveTowards(mouse.x + playerNode01.mouse.x, mouse.y + playerNode01.mouse.y, 1);
        lever01.play();
    }

    if (playerNode01.overlapping(nodeCheck) > 3) {
        image(cat,125,125,250,250);
       
    }

    if (playerNode02.mouse.hovering()) mouse.cursor = 'grab';
    else mouse.cursor = 'default';

    if (playerNode02.mouse.dragging()) {
        playerNode02.moveTowards(mouse.x + playerNode02.mouse.x, mouse.y + playerNode02.mouse.y, 1)
    }

    if (playerNode02.overlapping(nodeCheck) > 3) {
        image(garage,125,125,250,250);
    }
}




// Sound
// Lever
// https://freesound.org/people/A_Kuha/sounds/676412/
