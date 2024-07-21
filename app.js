let canvas = document.getElementById("canvas");
let g = canvas.getContext("2d")

let boardPositionSize= 50;
let pawnPositions = [];
let boardPositions= [];
let playerAmountButtons= [];
let uiWindow = createRect(600, 200,300,300)


const gamestate_start=0;
const gamestate_ingame=1;
const gamestate_gameover=2;

const ingamestate_start=0;
const ingamestate_roll=1;
const ingamestate_end=0;

let gamestate = gamestate_start;
let ingameState = ingamestate_start;

let images = {};


function imagesLoaded(){
    initGame()
    canvas.addEventListener("click",(e=>{canvasClicked(e)}));
    draw()
}
function startGame(playerAmount){
    
}
function canvasClicked(mouseEvent){
    if (gamestate == gamestate_start){
        for (let i = 0; i < playerAmountButtons.length; i++) {
            let button = playerAmountButtons[i];
            if (hitButton=true) {
                startGame(button.playerAmount);
                break;
            }
        }
    }
    let mX= mouseEvent.layerX;
    let mY= mouseEvent.layerY;
    let hitButton = inRect(mX,mY,button);

}

function inRect(px,py,rect){
    let result= (px >= rect.x && px <= rect.x2 && py >= rect.y && py <= rect.y2)
    return result
}


function drawGameStart(){
    for (let i = 0; i < playerAmountButtons.length; i++) {
        let pos = playerAmountButtons[i];
        g.fillStyle = "#3f3324";
        g.fillRect(pos.x,pos.y,pos.w,pos.h);
        g.fillStyle = "#c67c1e";
        g.fillText((i+1)+"",pos.x,pos.y+20);
        g.drawImage(images["pawn"+i+".png"],pos.x,pos.y,pos.w,pos.h)
    }
}

function drawIngame(){
    for(let i =0 ; i<boardPositions.length;i++)
    {
        let pos = boardPositions[i]

        g.fillStyle = "#004400"
        g.fillRect(pos.x,pos.y,pos.w,pos.h);
        g.fillStyle = "#FFFFFF"
        g.fillText((i+1) +"",pos.x,pos.y+20);
        g.fillText("Click the amount of players to start", 610, 240);
    }

}
function loadImages()
{
    let sources = [
        "img/dice1.png", "img/dice2.png", "img/dice3.png", "img/dice4.png", "img/dice5.png", "img/dice6.png",
        "img/pawn0.png", "img/pawn1.png", "img/pawn2.png", "img/pawn3.png", 
        "img/snakes.png", 
        "img/trophy.png", 
        "img/window.png", 
    ];
    
    let scope = this;

    let loaded = 0;
    for (let i = 0; i < sources.length; i++)
    {
        let img = new Image();


        img.onload = function ()
        {
            loaded++;
            if (loaded == sources.length)
            {
                imagesLoaded();
            }
        };
        img.src = sources[i];

        images[ sources[i].replace("img/","")] = img;
    }

}



function drawGameOver(){

}



function createRect(x,y,w,h)
{
    let vierkant = {
        x:x,
        y:y,
        x2:x+w,
        w:w,
        h:h
    };
    return vierkant;
}

function clearCanvas()
{
    g.fillStyle = "lightslategray";
    g.fillRect(0,0, canvas.width, canvas.height);
}

function draw()
{
    clearCanvas();
    if (gamestate == gamestate_start) {
       drawGameStart();
    }
    else if (gamestate == gamestate_ingame) {
        drawIngame();
    }
}

function createBoardPositions() {
    let x = 0;
    let y = canvas.height - boardPositionSize;
    let path = [1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 3, 3, 3, 3, 3, 3, 3, 3, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 3, 3, 3, 3, 3, 3, 3, 3, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1];
 
    for (let i = 0; i < path.length; i++) {
 
        if (path[i] == 1)//gaan naar rechts
        {
            x += boardPositionSize;
        }
        else if (path[i] == 3)//gaan naar links
        {
            x -= boardPositionSize;
        }
        else if (path[i] == 0)//gaan hier naar boven
        {
            y -= boardPositionSize;
        }
        boardPositions.push(createRect(x, y, boardPositionSize, boardPositionSize));
    }
}

function initGame() {
    createBoardPositions();
     for (let i = 0; i < 4; i++) {
          let button = createRect(uiWindow.x+5+ (i*50) , uiWindow.y+50,50,50);
          button.playerAmount=i+1;
          playerAmountButtons.push(button);
     } 
     
}
loadImages();