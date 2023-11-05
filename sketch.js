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
let width = 1914;
let height = 1074;
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

    catPics = [cat01, cat02, cat03, cat04];
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

    // Standard p5
    clear();
    background('black');
    fill('red');
    rect();
    fill('white');
    text('> Old World Analysis and Reconstruction Team', 50, 550);

    
    // Mouse Cursor
    if (playerNodes.mouse.hovering() || deNoiseBtn.mouse.hovering()) mouse.cursor = 'grab';
    else {mouse.cursor = 'default';}


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


    // Mouse Interaction
    for (let i = 0; i < playerNodes.length; i++) {
        const node = playerNodes[i];
        
        if (node.mouse.dragging()) {
            node.moveTowards(mouse.x + node.mouse.x, mouse.y + node.mouse.y, 1);
        }
    }

    if (playerNodes[0].overlapping(nodeCheck) > 3) {
      let catPic = image(cat01,575, 65, 350, 350);
    }



    // ----------------------- //
        // for (let i = 0; i < otherNodes.length; i++) {
        //     const otherNode = otherNodes[i];
        // }

        // if (otherNode.mouse.dragging()) {
        //     otherNode.moveTowards(mouse.x + otherNode.mouse.x, mouse.y + otherNode.mouse.y, 1);
        // }
    // ----------------------- //

    
    
    // if (playerNodes.mouse.dragging()) {
    //     playerNodes.moveTowards(mouse.x + playerNodes.mouse.x, mouse.y + playerNodes.mouse.y);
    // }

    // Data Node 01
    // if (playerNode01.mouse.dragging()) {
    //     playerNode01.moveTowards(mouse.x + playerNode01.mouse.x, mouse.y + playerNode01.mouse.y, 1);
    //     // lever01.play();
    // }

    // if (playerNode01.overlapping(nodeCheck) > 3) {
    //     image(cat01,575, 65, 350, 350);
    // } if (playerNode01.overlapping(nodeCheck) > 3 && presses >= 1) {
    //     image(cat02,575,65,350,350);
    // } if (playerNode01.overlapping(nodeCheck) > 3 && presses >= 2) {
    //     image(cat03,575,65,350,350);
    // } if (playerNode01.overlapping(nodeCheck) > 3 && presses >= 3) {
    //     image(cat04,575,65,350,350);
    // }
}

// ---------------------------------------- //

function gameLoad() {

    playerNodes = new Group();
    playerNodes.diameter = 25;
    playerNodes.color = 'blue';
    playerNodes.drag = 5;
    
    while (playerNodes.length < 18) {
        let node = new playerNodes.Sprite();
        node.x = playerNodes.length * 5;
        node.y = 5;
        node.textColor = 'white';
        node.text = playerNodes.length - 1;
    }

    otherNodes = new Group();
    otherNodes.width = 15;
    otherNodes.height = 18;
    otherNodes.color = 'orange';

    while (otherNodes.length < 10) {
        let node = new otherNodes.Sprite();
        node.x = ( (otherNodes.length * 20) + 200 )
        node.y = 40;
    }
    

    // Data Node 01 - Fab Cat
    // playerNode01 = new Sprite(350,25,25);
    // playerNode01.color = 'blue';
    // playerNode01.textColor = 'white';
    // playerNode01.text = '01';
    // playerNode01.drag = 3;
    // playerNode01.layer = 2;

    // Data Node 02 - Garage
    // playerNode02 = new Sprite(250, 25, 25);
    // playerNode02.color = 'blue';
    // playerNode02.textColor = 'white';
    // playerNode02.text = '02';
    // playerNode02.drag = 3;

    // Data Node 03 - Takeoff
    // playerNode03 = new Sprite(255, 25, 25);
    // playerNode03.color = 'blue';
    // playerNode03.textColor = 'white';
    // playerNode03.text = '03';
    // playerNode03.drag = 3;

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
    // 'nodeCheck', 'sensor', 'Lwall', 'Rwall', 'Bwall'
    // sensor = new Group();
    // sensor.length = 5;
    // let lwal
    // sensor.color = 'white';
    // sensor[1].color = 'red';
    // sensor.collider = 'static';
    
    // while (sensor.length < 5) {
    //     let
    // }
    
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

    

    // Top border
    // let borderT = new Sprite(0, 0, borderWidth, 12);
    // borderT.color = 'white';
    // borderT.collider = 'static'

    // // Bottom border 1
    let borderB1 = new Sprite(0, 500, borderWidth, 12);
    borderB1.color = 'white';
    borderB1.collider = 'static'

    // // Bottom border 2
    // let borderB2 = new Sprite(0, 750, borderWidth, 12);
    // borderB2.color = 'white';
    // borderB2.collider = 'static';

    // this sprite can be created on a single line, but it's easier to read this way:
	// spinningShape = new Sprite();
	// spinningShape.width = canvas.width/5;
	// spinningShape.height = spinningShape.width;
    // spinningShape.collider = "kinematic";
}

// ---------------------------------------- //