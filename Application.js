let Application = PIXI.Application,
    Container = PIXI.Container,
    Sprite = PIXI.Sprite,
    resources = PIXI.loader.resources,
    Graphics = PIXI.Graphics,
    AnimatedSprite = PIXI.extras.AnimatedSprite,
    BitmapText = PIXI.extras.BitmapText,
    Rectangle = PIXI.Rectangle,
    Point = PIXI.Point;


const REF_WIDTH = 640;
const REF_HEIGHT = 960;

let canvas, app;
let screenSetup = false;
let screenWidth, screenHeight, winScale;

let showLogs = true;
let mainLogic;

window.onresize = function(){
    // console.log("onresize >>> width " + window.innerWidth + " / height " + window.innerHeight);
    trySetupScreen();
};

// Load resources in parallel with initializeAsync:
// You shouldn't wait for the initializeAsync promise to resolve before downloading your resources. You can download in parallel.
// https://developers.facebook.com/docs/games/instant-games/best-practices
window.onload = function() {
    // console.log("onload >>> width " + window.innerWidth + " / height " + window.innerHeight);

    trySetupScreen();
};

// 640x960 - our mockup screen size to follow
// https://docs.unity3d.com/Manual/HOWTO-UIMultiResolution.html
function trySetupScreen(){

    // console.log('trySetupScreen 1');

    if (screenSetup) return;

    // console.log('trySetupScreen 2');

    if (window.innerWidth === 0 || window.innerHeight === 0){
        console.warn(window.innerWidth + " / " + window.innerHeight);
        return;
    }

    // console.log('trySetupScreen 3 - OK');

    screenSetup = true;

    initApp();

    mainLogic = new MainLogic();
    mainLogic.start();
}

function initApp(){
    // portrait
    if (window.innerHeight/1.5 >= window.innerWidth){
        screenWidth = REF_WIDTH;
        screenHeight = screenWidth * window.innerHeight / window.innerWidth;
        winScale =  window.innerHeight / screenHeight;
        // landscape
    } else {
        screenHeight = REF_HEIGHT;
        screenWidth = screenHeight * window.innerWidth/window.innerHeight;
        winScale = window.innerWidth / screenWidth;
    }

    if (showLogs){
        console.log("screenWidth " + screenWidth + " / screenHeight " + screenHeight + " / winScale " + winScale);
        console.log("window.innerWidth " + window.innerWidth + " / window.innerHeight " + window.innerHeight);
        // console.log("GW " + GameInfo.screenWidth);
        // console.log("GH " + GameInfo.screenHeight);
    }

    app = new Application({
            width: screenWidth,
            height: screenHeight,
            antialias: true,
            transparent: true,
            resolution: 1,
        }
    );

    PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.NEAREST;

    // PIXI.settings.TARGET_FPMS = 0.03;
    // console.log(app);
    // app.stage.scale.set(winScale, winScale);
    // app.stage.scale.set(0.3, 0.3);
    // console.log(app.stage.scale);
    // console.log(app.stage.pivot);
    // console.log(winScale);
    // app.ticker.maxFPS = 30;

    let viewport = document.getElementById("viewport");

    app.view.className = "app-view";
    viewport.appendChild(app.view);
}
