
const uiNames = {
    enemy: 'enemyProfile.png',
    help: 'help.png',
    soundOn: 'soundOn.png',
    soundOff: 'soundOff.png',
    pause: 'pause.png',
    share: 'share.png',
    envelope: 'envelope.png',
    heroFace: 'heroFace.png',
    tutorialCircle: 'tutorialCircle.png',
    tutorialDevice: 'tutorialDevice.png',
    tutorialHand: 'tutorialHand.png',
    tutorialHandAnim: 'tutorialHandAnim.png',
    tutorialKey: 'tutorialKey.png',
    tutorialArrowsUD: 'tutorialArrowsUD.png',
    tutorialArrowLeft: 'tutorialArrowLeft.png',
    tutorialArrowRight: 'tutorialArrowRight.png',
    rain: 'rain.png',
    spark: 'sparks.png',
    tail: 'tail.png',
    star: 'pt2.png',
    arrow: 'arrow.png',
    tick: 'tick.png',
    btnArrowLeft: 'btnArrowLeftGreen.png',
    splash: 'splash.png',
    video: 'video.png',
    saw: 'saw.png'
};

const allUIElements = {
    uiSheet: './images/new_sheet.json',
    tooth: './images/saw.png'
};

class GUILogic{

    constructor(){

    }

    loadInitialUIAssets(loadClbck){

        for (let n in allUIElements)
            addAssetToLoad(n, allUIElements[n]);

        loadAllAssets(()=>{
            this.spriteSheet = loader.resources.uiSheet.spritesheet;
            this.saw = loader.resources.tooth;
            loadClbck();
        });

    }

    getTexture(name){
        return this.spriteSheet.textures[name];
    }

    getSaw(){
        return this.saw.texture;
    }
}