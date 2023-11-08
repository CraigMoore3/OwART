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
let playerNodes, activeNode, dataBox, dataBoxB, dataBoxL, dataBoxR, dataBoxT;
// let imgLoc = (575, 65, 350, 350);

// ---------------------------------------- //

function preload() {

    playerNodes = new Group();
    playerNodes.diameter = 25;
    playerNodes.color = 'blue';
    playerNodes.drag = 5;
    
    for (let i = 0; i < 17; i++) {
        let node = new playerNodes.Sprite();
        node.x = width/2 + playerNodes.length * 5;
        node.y = height/2 + playerNodes.length * 2;
        node.textColor = 'white';
        node.text = playerNodes.length - 1;
        node.pics = [];
        node.pics[0] = loadImage('assets/' + i + '_0.gif');
        node.pics[1] = loadImage('assets/' + i + '_1.gif');
        node.pics[2] = loadImage('assets/' + i + '_2.gif');
    }

    dataBox = new Group();
    dataBox.color = 'white';
    dataBox.collider = 'kinematic';
    dataBoxL = new dataBox.Sprite(width/2 - 200,height/2, 20, 400);
    dataBoxR = new dataBox.Sprite(width/2 + 200, height/2, 20, 400);
    // dataBoxT = new dataBox.Sprite(width/2, height/2 - 200, 400, 20);
    dataBoxB = new dataBox.Sprite(width/2, height/2 + 200, 400, 20);

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
        deNoiseBtn.visible = true;
        deNoiseBG.visible = true;
    } else {activate = false; presses = 0; deNoiseBtn.visible = false; deNoiseBG.visible = false;}
   
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
    

    // -------------------- //

    deNoiseBG = new Sprite(750, 450, 60, 60);
    deNoiseBG.color = 'white';
    deNoiseBG.collider = 'static';
    deNoiseBtn = new Sprite(752, 447, 50, 50);
    deNoiseBtn.color = 'red';
    deNoiseBtn.collider = 'static';

    // Border for the gamespace
    // Leftmost border
    // borderL = new Sprite(0,0,12, borderHeight);
    // borderL.color = 'white';
    // borderL.collider = 'static;'

    // // Interior border
    // borderR1 = new Sprite(500,0,12,1000);
    // borderR1.color = 'white';
    // borderR1.collider = 'static'

    // // // Bottom border 1
    // borderB1 = new Sprite(0, 500, borderWidth, 12);
    // borderB1.color = 'white';
    // borderB1.collider = 'static'

    // platform1 = new Sprite (12, 250, 500, 12);
    // platform1.color = 'white';
    // platform1.collider = 'static';
}

// ---------------------------------------- //
// Class, properties, methods