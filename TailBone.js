let c_IniTailBlockAlpha = 0.1;
let c_TimeToDeactivate = 0.8;

let c_FadingSpeed = c_IniTailBlockAlpha / c_TimeToDeactivate; // alpha value per second

// fade time

class TailBone{

    constructor(){
        this._createBone();
        this.reset();
    }

    _createBone(){
        this.name = "tailBone";

        this.bone = new Graphics();
        this.bone.name = "bone";
        this.bone.beginFill(CL_TAIL_COLOR);
        this.bone.drawRect(0, 0, 1, 1);
        this.bone.endFill();

        this.bone.pivot.x = 0.5;
        this.bone.pivot.y = 0.5;
    }

    getBone(){
        return this.bone;
    }

    reset(){
        this.currTime = 0;
        this.bone.alpha = c_IniTailBlockAlpha;
        this._used = false;
        this.bone.visible = false;
    }

    setShape(w, h){
        this.bone.width = w;
        this.bone.height = h;
    }

    activate(position, scale, rotation){
        this.bone.width *= scale.x;
        this.bone.height *= scale.y;

        // console.log("bone.width " + this.bone.width + " / bone.height " + this.bone.height );
        // console.log("scale " + scale.x  + " / " + scale.y);

        this.bone.position.x = position.x;
        this.bone.position.y = position.y; // - this.bone.height/2;
        this.bone.rotation = rotation;

        // this.bone.position.x = this.bone.width/2;
        // this.bone.position.y = this.bone.height/2;

        this.bone.visible = true;
        this._used = true;
    }

    visible(){
        return this.bone.visible;
    }


    // fade out
    // move up
    // deactivate
    animate(delta){
        if (! this._used) return;

        // this.bone.position.y -= ENEMY_MOVE_SPEED * delta;
        this.bone.alpha -= c_FadingSpeed * delta;

        this.currTime += delta;

        if (this.currTime > c_TimeToDeactivate){
            this.reset();
        }
    }
}