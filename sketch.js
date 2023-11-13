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
let junkNodes, incinerator, archive, selectedNode;
let thumbnail = 0;
let playerNodes, activeNode, dataBox, dataBoxB, dataBoxL, dataBoxR, dataBoxT;
// let imgLoc = (575, 65, 350, 350);

// ---------------------------------------- //

function preload() {

    let empty = color(0,0);

    playerNodes = new Group();
    playerNodes.diameter = 25;
    playerNodes.color = 'white';
    playerNodes.drag = 5;
    
    for (let i = 0; i < 17; i++) {
        let node = new playerNodes.Sprite();
        node.x = 150 + playerNodes.length * 5;
        node.y = 400 + playerNodes.length * 2;
        node.textColor = 'black';
        node.text = playerNodes.length - 1;
        node.pics = [];
        node.pics[0] = loadImage('assets/' + i + '_0.gif');
        node.pics[1] = loadImage('assets/' + i + '_1.gif');
        node.pics[2] = loadImage('assets/' + i + '_2.gif');
    }

    junkNodes = new Group();
    junkNodes.diameter = 25;
    junkNodes.color = 'silver';
    junkNodes.text = 'forgotten'
    junkNodes.drag = 5;

    for (let i = 0; i < 60; i++) {
        let node = new junkNodes.Sprite();
        if (i < 20) {
            node.color = 'lightsilver';
            node.text = 'incomplete';
        } if (i >= 20 && i < 39) {
            node.color = 'darksilver';
            node.text = 'annihilated';
        }
        node.x = 150 + junkNodes.length * 2;
        node.y = -200 + junkNodes.length * 2;
        node.textColor = 'black';
        
    }

    dataBox = new Group();
    dataBox.color = 'white';
    dataBox.collider = 'kinematic';
    dataBoxL = new dataBox.Sprite(55, 450, 20, 900);
    dataBoxR = new dataBox.Sprite(375, 550, 20, 700);
    dataBoxR1 = new dataBox.Sprite(375, 60, 20, 200);
    dataBoxB = new dataBox.Sprite(215, 900, 340, 20);

    dataBoxPlat01 = new dataBox.Sprite(100, 400, 100, 10);
    dataBoxPlat02 = new dataBox.Sprite(200, 600, 100, 10);

    dataBoxBridgeB = new dataBox.Sprite(735, 200, 740, 10);
    dataBoxBridgeT = new dataBox.Sprite(735, 160, 740, 10);


    archive = new Group();
    archive.color = 'white';
    archive.collider = 'static';
    
    // x difference = 40
    small01 = new archive.Sprite(1550, 510, 10, 500);
    small02 = new archive.Sprite(1590, 510, 10, 500);
    small03 = new archive.Sprite(1570, 760, 50, 10);
    smallSensor = new archive.Sprite(1570, 525, 30, 465);
    smallSensor.collider = 'none';
    smallSensor.strokeWeight = 0;
    smallSensor.color= empty;
    smallSensor.layer = 1;

    // x difference = 50
    med01 = new archive.Sprite(1660, 560, 10, 600);
    med02 = new archive.Sprite(1710, 560, 10, 600);
    med03 = new archive.Sprite(1685, 855, 60, 10);
    medSensor = new archive.Sprite(1685, 570, 40, 565);
    medSensor.collider = 'none';
    medSensor.strokeWeight = 0;
    medSensor.color = empty;
    medSensor.layer = 1;
        
    // x difference = 60
    lg01 = new archive.Sprite(1780, 610, 10, 700);
    lg02 = new archive.Sprite(1840, 610, 10, 700);
    lg03 = new archive.Sprite(1810, 960, 70, 10);
    lgSensor = new archive.Sprite(1810, 625, 50, 665);
    lgSensor.collider = 'none';
    lgSensor.strokeWeight = 0;
    lgSensor.color = empty;
    lgSensor.layer = 1;
    
    incinerator = new Sprite(1200, 310);
    incinerator.width = 100;
    incinerator.height = 100;
    incinerator.layer = 1;
    incinerator.collider = 'none';
    incinerator.color = 'red';

    trash = new Group();
    trash.color = 'white';
    trash.collider = 'static';

    rampL = new trash.Sprite(1131, 229, 85, 10)
    rampL.layer = -1;
    rampL.rotation = 45;

    lever01 = loadSound('sound/lever_01.mp3');
    lever01.playMode('untilDone');

}

// ---------------------------------------- //

function setup() {

    let canvas = new Canvas(width, height);
    textFont("Courier", 15);
    noStroke();
    gameLoad();
    world.gravity.y = 20;
}

// ---------------------------------------- //

function draw() {

    // Standard p5
    clear();
    background('black');
    fill('white');
    text('> Old World Analysis and Reconstruction Team', 1050, 550);
    text(presses, 80, 950);
    text(activate,80, 975);
    text(frameRate(), 80, 1000);
    text(selectedNode,80, 1025);
    rect(470, 260, 560, 560);
    rect(1145, 255, 110, 110);
    fill('black');
    rect(475, 265, 550, 550);
    
    

    // Mouse Cursor
    if (playerNodes.mouse.hovering() || deNoiseBtn.mouse.hovering() || junkNodes.mouse.hovering()) mouse.cursor = 'grab';
    else {mouse.cursor = 'default';}

    
   for (let i = 0; i < junkNodes.length; i++) {
        let node = junkNodes[i];

        if (node.mouse.dragging()) {
            node.moveTowards(mouse.x + node.mouse.x, mouse.y + node.mouse.y, 1);
        }

        if (node.overlapping(incinerator)){
            node.remove();
        }   
   }

    for (let i = 0; i < playerNodes.length; i++) {
        let node = playerNodes[i];

        if (node.mouse.dragging()) {
            node.moveTowards(mouse.x + node.mouse.x, mouse.y + node.mouse.y, 1);
            selectedNode = node;
        }

        if (playerNodes[i].overlapping(nodeCheck) > 3) {
            activeNode = playerNodes[i];
            text(i, 50, 175);
            console.log("overlapping");
        } 

        if (node.overlapping(smallSensor) > 3) {
            image(node.pics[1], (i*50) + 200, 900, 55, 55);
            thumbnail++;
        }
        
        if (activate && presses < 1) {
          image(activeNode.pics[0], 475, 265, 550,550);
      } if (activate && presses == 1) {
          image(activeNode.pics[1],475, 265, 550, 550);
          activeNode.color = 'blue';
          activeNode.diameter = 35;
      } if (activate && presses >= 2) {
          image(activeNode.pics[2],475, 265, 550, 550);
          activeNode.color = 'green';
          activeNode.diameter = 45;
      }

      if (node.overlapping(incinerator)){
        node.remove();
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
        deNoiseBtn.y = 860;
        deNoiseBtn.color = 'maroon';
    } else {
        deNoiseBtn.x = 752; 
        deNoiseBtn.y = 858; 
        deNoiseBtn.color = 'red';
    }
}

// ---------------------------------------- //

function gameLoad() {
//  Capital letter = class

    

    spinner = new Sprite(220, 750);
    spinner.width = 210;
    spinner.height = 10;
    spinner.rotationSpeed = 2;
    spinner.color = 'black';
    spinner.collider = 'kinematic';

    // Red "Sensor" - visual only
    sensor = new Sprite(1450,325);
    sensor.color = 'darkorange';
    sensor.width = 25;
    sensor.height= 50;
    sensor.collider = 'static';

    // Invisible collider sprite - the actual sensor
    nodeCheck = new Sprite(1450, 325, 50, 75);
    nodeCheck.layer = 1;
    nodeCheck.collider = 'none'
    nodeCheck.strokeWeight = 0;
    let empty = color(0,0);
    nodeCheck.color = empty;
    
    Lwall = new Sprite (1415, 310, 15, 100);
    Lwall.color = "white";
    Lwall.collider = 'static';
    Rwall = new Sprite (1485, 310, 15, 100);
    Rwall.color = "white";
    Rwall.collider = 'static';
    

    // -------------------- //

    deNoiseBG = new Sprite(750, 860, 250, 60);
    deNoiseBG.color = 'white';
    deNoiseBG.collider = 'static';
    deNoiseBtn = new Sprite(752, 857, 240, 50);
    deNoiseBtn.color = 'red';
    deNoiseBtn.collider = 'static';

}

// ---------------------------------------- //
// Class, properties, methods