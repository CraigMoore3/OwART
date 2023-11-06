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

// individual_sprite.pics[0] // or 1 or 2

// --- Globals ---
let activate, deNoiseBtn;
let presses = 0;
let catLoad = false;
let width = 1914;
let height = 1074;
let borderWidth = width*2;
let borderHeight = height*2;
let playerNodes, activeNode;
// let imgLoc = (575, 65, 350, 350);

// ---------------------------------------- //

function preload() {
// 0_1.gif
// 
    
    playerNodes = new Group();
    playerNodes.diameter = 25;
    playerNodes.color = 'blue';
    playerNodes.drag = 5;
    
    //Class, properties, methods
    for (let i = 0; i < 17; i++) {
        let node = new playerNodes.Sprite();
        node.x = playerNodes.length * 5;
        node.y = 5;
        node.textColor = 'white';
        node.text = playerNodes.length - 1;
        node.pics = [];
        node.pics[0] = loadImage('assets/' + i + '_0.gif');
        node.pics[1] = loadImage('assets/' + i + '_1.gif');
        node.pics[2] = loadImage('assets/' + i + '_2.gif');
    }


    // catPics = [cat01, cat02, cat03];

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
    text(presses, 50, 150);
    text(activate,50, 165);
    
    // Mouse Cursor
    if (playerNodes.mouse.hovering() || deNoiseBtn.mouse.hovering()) mouse.cursor = 'grab';
    else {mouse.cursor = 'default';}


    


    // Mouse Interaction
    for (let i = 0; i < playerNodes.length; i++) {
        const node = playerNodes[i];
        
        if (node.mouse.dragging()) {
            node.moveTowards(mouse.x + node.mouse.x, mouse.y + node.mouse.y, 1);
        }
    }

   

    for (let i = 0; i < playerNodes.length; i++) {

          if (playerNodes[i].overlapping(nodeCheck) > 3) {
            
            activeNode = playerNodes[i];
            text(i, 50, 175);
            console.log("overlapping");
        } 
        
        if (activate && presses < 1) {
            image(activeNode.pics[0], 575, 65, 350, 350);
      } if (activate && presses == 1) {
          image(activeNode.pics[1],575, 65, 350, 350);
      } if (activate && presses >= 2) {
          image(activeNode.pics[2],575, 65, 350, 350);
      }
    }

    if (playerNodes.overlapping(nodeCheck) >3) {
        activate = true;
    } else {activate = false; presses = 0;}
   
    // deNoise Button
    if (deNoiseBtn.mouse.pressing() > 1 && deNoiseBtn.mouse.pressing() < 3 && activate) {
        presses++;
        deNoiseBtn.x = 750;
        deNoiseBtn.y = 450;
        deNoiseBtn.color = 'maroon';
    } else {
        deNoiseBtn.x = 752; 
        deNoiseBtn.y = 448; 
        deNoiseBtn.color = 'red';
    }

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
//  Capital letter = class

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
    
    Lwall = new Sprite (425, 455, 15, 100);
    Lwall.color = "white";
    Lwall.collider = 'static';
    Rwall = new Sprite (475, 455, 15, 100);
    Rwall.color = "white";
    Rwall.collider = 'static';

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

    // -------------------- //

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

    // // Bottom border 1
    let borderB1 = new Sprite(0, 500, borderWidth, 12);
    borderB1.color = 'white';
    borderB1.collider = 'static'

}

// ---------------------------------------- //