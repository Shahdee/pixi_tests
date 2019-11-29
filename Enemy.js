
const CL_LEFT_CIRCLE_COLOR = 0x37FEEB;
const CL_TAIL_COLOR = 0xffffff;
const CL_ENEMY_ACTIVE = 0x6aff00; // 0xFFFFFF;

const ENEMY_MOVE_SPEED = 200; // [px / sec]
const ENEMY_ROTATION_SPEED = 0.9; // emperical for tests

const CENTER_DISP = 0.4; // empirical

class Enemy{
    constructor(mainLogic){

        this.mainLogic = mainLogic;

        this.container = new Container();
        this.container.name = "enemy";
        app.stage.addChild(this.container); // ?

        this.visual = new Container();
        this.visual.name = "visual";
        this.container.addChild(this.visual);

        // this._createTestBack();

        this._createAdvancedTail();
        this._createBody();

        this.width = 0;
        this.halfWidth = 0;
        this.height = 0;
        this.halfHeight = 0;

        this.moveDirection = 1;

        this.sizeScale = 1;
    }

    _createTestBack(){
        this.testBack = new Graphics();
        this.testBack.beginFill(0xff0000, 0.3);
        this.testBack.drawRect(0, 0, 1, 1);
        this.testBack.endFill();

        this.container.addChild(this.testBack)
    }

    _createAdvancedTail(){
        this.tail = new Tail(this.container, this.visual);
    }

    _createBody(){
        this.body = new Container();
        this.body.name = "body";
        this.visual.addChild(this.body);

        this._createBodyMask();
        this._createBodyColor();
        this._createBodyPaint();
        this._createSaw();
        this._createBodyCollider();
    }

    _createSaw(){
        this.saw = new PIXI.TilingSprite(
            this.mainLogic.getGUILogic().getSaw(),
            336,
            32
        );

        this.saw.anchor.set(0, 1);
        this.saw.position.y = 65;

        this.body.addChildAt(this.saw, 0);
    }

    _createBodyMask(){
        this.bodyMask = new Graphics();
        this.bodyMask.name = "bodyMask";
        this.bodyMask.beginFill(CL_ENEMY_ACTIVE);
        this.bodyMask.drawRect(0, 0, 1, 1);
        this.bodyMask.endFill();
        this.bodyMask.renderable = false;

        this.body.addChild(this.bodyMask);
    }

    // just white body
    _createBodyPaint(){
        this.bodyPaint = new Graphics();
        this.bodyPaint.name = "bodyPaint";
        this.bodyPaint.beginFill(CL_ENEMY_ACTIVE);
        this.bodyPaint.drawRect(0, 0, 1, 1);
        this.bodyPaint.endFill();
        this.bodyPaint.renderable = true;

        this.body.addChild(this.bodyPaint);

        this.currPainTime = 0;
        this.finalPaintHeight = 0;

        // this.onPaintDone = new BaseAction();
    }

    _createBodyCollider(){
        this.bodyCollider = new Container();
        this.bodyCollider.name = 'collider';

        this.body.addChild(this.bodyCollider);
    }

    // when body is filled with color
    _createBodyColor(){
        this.bodyColor = new Graphics();
        this.bodyColor.name = "bodyColor";
        this.bodyColor.beginFill(CL_LEFT_CIRCLE_COLOR);
        this.bodyColor.drawRect(0, 0, 1, 1);
        this.bodyColor.endFill();

        this.body.addChild(this.bodyColor);
    }

    // TODO why dont I restore scale ?
    reset(){
        this.setVisible(true);

        this.container.rotation = 0;

        this.visual.alpha = 1;
        this.visual.rotation = 0;
        this.visual.position.set(0,0);

        this.rotating = false;
        this.gates = false;
        this.invisible = false;
        this.bodyColor.renderable = true;
        this.displaced = false;

        this.rotation = 0;
        this.testHit = true;

        this._resetPaint();
    }

    _resetPaint(){
        this.painted = false;
        this.painting = false;
        this.bodyPaint.renderable = true;
        this.currPainTime = 0;
    }

    // square, rect
    setShape(w, h){
        this.width = w;
        this.halfWidth = w/2;
        this.height = h;
        this.halfHeight = h/2;

        this.finalPaintHeight = h;

        this._setAdvancedTailShape(w, h);
        this._setBodyShape(w, h);

        // this._setShapeTestBack(w, h);

        this.body.position.x = w/2;
        this.body.position.y = h/2;
        this.body.pivot.x = w/2;
        this.body.pivot.y = h/2;

        this.visual.position.x = this.visual.width/2;
        this.visual.position.y = this.visual.height/2;
        this.visual.pivot.x = this.visual.width/2;
        this.visual.pivot.y = this.visual.height/2;

        this.container.pivot.x = this.container.width / 2;
        this.container.pivot.y = this.container.height / 2;

        this.bodyCollider.position.x = w/2;
        this.bodyCollider.position.y = h/2;
    }

    _setShapeTestBack(w, h){

        this.testBack.clear();

        this.testBack.beginFill(0xff0000, 0.3);
        this.testBack.drawRect(0, 0, this.container.width, this.container.height);
        this.testBack.endFill();

        // this.testBack.width = this.container.width;
        // this.testBack.height = this.container.height;
    }

    _setAdvancedTailShape(w, h){
        this.tail.setShape(w, h);
    }

    _setBodyShape(w, h){
        this._setMaskShape(w, h);
        this._setPaintShape(w, h);
        this._setColorShape(w, h);

        // console.log('>> _setBodyShape');
        // console.log(this.body.width);
        // console.log(this.body.height);
    }

    _setMaskShape(w, h){
        this.bodyMask.width = w;
        this.bodyMask.height = h;
    }

    _setPaintShape(w, h){
        this.bodyPaint.width = w;
        this.bodyPaint.height = h;
        this.bodyPaint.renderable = true;
    }

    _setColorShape(w, h){
        this.bodyColor.width = w;
        this.bodyColor.height = h;
    }

    setVisible(vis){
        this.container.visible = vis;
    }

    setInvisible(){
        this.invisible = true;
        this.bodyColor.renderable = false;
    }

    placeTo(x, y){
        // console.log('place x= ' + x  + '/ y= ' + y);
        this.container.position.set(x, y);
        // this._printCoords();
    }

    animate(delta){
        this._scale(delta);
        this._advance(delta);

        // this._setShapeTestBack();

        this.tail.animate(delta);
    }

    _scale(delta){
        this.sizeScale = 1 + Math.sin(globalTimer * 6.8) * 0.02;
        this.visual.scale.x = this.visual.scale.y = this.sizeScale;
    }

    _advance(delta){

        // this.container.rotation += ENEMY_ROTATION_SPEED * delta;

        this.container.y += (ENEMY_MOVE_SPEED * delta) * this.moveDirection;

        // if (this.container.y > app.screen.height + this.visual.height){
        if (this.container.y > 2 * app.screen.height / 3 ){

            this.moveDirection *= -1;

            // this.reset();
            // this.setShape(c_Enemy_Width, c_Enemy_Height);
            // this.placeTo(app.screen.width/2 - this.width*CENTER_DISP, -this.halfHeight);
        }

        if (this.container.y < app.screen.height / 4 ){

            this.moveDirection *= -1;
        }
    }
}