
let c_Enemy_Width = 336;
let c_Enemy_Height = 65;

const SmoothDt_NumFramesToAgregate = 100;

let globalTimer = 0;

class MainLogic{

    start(){
        this._initTimer();
        this._setupFramesData();

        this.guiLogic = new GUILogic();
        this.guiLogic.loadInitialUIAssets(this._assetsLoaded.bind(this));
    }

    getGUILogic(){
        return this.guiLogic;
    }

    _assetsLoaded(){

        app.ticker.add(delta => this._gameLoop(delta));

        // this.snake = new Snake();

        // this.container = new Container();
        // app.stage.addChild(this.container);
        //
        // this.container.x = app.screen.width/2;
        // this.container.y = app.screen.height/2;
        //
        // this.container.pivot.x = this.container.width/2;
        // this.container.pivot.y = this.container.height/2;

        this._createBox();

        this._createEnemy();

        // this._createContainerBounds();
    }

    // https://www.html5gamedevs.com/topic/37296-scaling-rectangle-from-center-and-transform-origin/
    _createBox(){

        this.boxcontainer = new Container();
        app.stage.addChild(this.boxcontainer);

        this.box = new Graphics();
        this.box.name = "box";
        this.box.beginFill(0xffffff);
        this.box.drawRect(-50, -50, 100, 100);
        this.box.endFill();

        // app.stage.addChild(this.box);
        this.boxcontainer.addChild(this.box);

        this.boxcontainer.position.set(50);

        this.fill = new Graphics();
        this.fill.beginFill(0xffff00, 0.3);
        this.fill.drawRect(0, 0, this.boxcontainer.width, this.boxcontainer.height);
        this.fill.endFill();
        this.boxcontainer.addChild(this.fill);

        // this.box.width = 200;
        // this.box.height = 100;
        //
        // this.box.pivot.x = 0.5;
        // this.box.pivot.y = 0.5;
        //
        // this.box.rotation = 3.14159;
        //
        // this.box.position.x = 100;
        // this.box.position.y = 50;
    }


    _createContainerBounds(){

        this.glx = this.enemy.container.x - this.enemy.container.width/2;
        this.gly = this.enemy.container.y - this.enemy.container.height/2;

        if (! this.boundBox){
            this.boundBox = new Graphics();
            this.boundBox.name = "box";

            this.boundBox.beginFill(0x00ff00, 0.25);
            this.boundBox.drawRect(this.glx , this.gly, this.enemy.container.width, this.enemy.container.height);
            this.boundBox.endFill();

            app.stage.addChild(this.boundBox);
        }
        else{

            this.boundBox.clear();
            this.boundBox.beginFill(0x00ff00, 0.25);
            this.boundBox.drawRect(this.glx, this.gly, this.enemy.container.width, this.enemy.container.height);
            this.boundBox.endFill();

        }
    }

    _createEnemy(){
        this.enemy = new Enemy(this);

        // vertical
        // let width = c_Enemy_Height;
        // let height = c_Enemy_Width * 0.7;

        // hor long
        let width = c_Enemy_Width;
        let height = c_Enemy_Height/1.9;

        this.enemy.setShape(width, height);
        this.enemy.placeTo(app.screen.width/2, app.screen.height/2);
    }

    _gameLoop(delta){

        this.trueDeltaMs = this._getTrueDelta(delta, this.frameIndex);
        globalTimer += this.trueDeltaMs;
        ++this.frameIndex;

        // this.snake.animate();
        // this.box.rotation += 0.07;

        // this._createContainerBounds();

        this.enemy.animate(this.trueDeltaMs);
    }

    //---- timer

    _initTimer(){
        this.trueDeltaMs = 0;
        this.rawTrueDeltaMs = 0;

        this.framesDt = new Array(SmoothDt_NumFramesToAgregate);
        this.frameIndex = 0;
        this.scaleByFPS = 60;

        this.avgDt = 0;
    }

    _setupFramesData(){
        for (let i=0; i<SmoothDt_NumFramesToAgregate; i++){
            this.framesDt[i] = 1/this.scaleByFPS;
        }
    }

    _getTrueDelta(delta, frame){

        // console.log("delta " + delta);
        // console.log("app.ticker.elapsedMS " + app.ticker.elapsedMS);

        this.rawTrueDeltaMs = Math.min(app.ticker.elapsedMS * 0.001, 1/20);
        this._setFrameDt(frame, this.rawTrueDeltaMs);

        // if (frameIndex >= SmoothDt_NumFramesToAgregate)
        return this._getSmoothDt();
        // else
        //     trueDeltaMs = this.rawTrueDeltaMs;
    }

    _setFrameDt(frameI, dt){
        this.framesDt[frameI % SmoothDt_NumFramesToAgregate] = dt;
    }

    _getSmoothDt(){
        // for (let i = 0; i < Math.min(frameIndex, SmoothDt_NumFramesToAgregate); ++i)
        this.avgDt = 0;
        for (let i = 0; i < SmoothDt_NumFramesToAgregate; ++i)
            this.avgDt += this.framesDt[i];

        return this.avgDt / SmoothDt_NumFramesToAgregate;
    }
}




