
const TAIL_BONES_COUNT = 20;
const DELAY_BETWEEN_BONE_SPAWN = 0.04; // period [s/x]

// collection of tail bones

// TODO
// use a container which holds tailBones . it's now commented
// there is a bug, so that if I put bones inside a container, the scale from point (0,0)
// rather then a center pivot
// that's why for now I put them directly on app.stage

class Tail{
    constructor(parent, parentVisual){

        this.parent = parent;
        this.parentVisual = parentVisual;

        this.spawnBoneDelay = 0;
        this.currTailBoneToUse = 0;

        // this.container = new Container();
        // this.container.name = "tail";
        // app.stage.addChild(this.container);

        this.tailBones = new Array(TAIL_BONES_COUNT);
        let tailBone;

        for (let i=0; i<this.tailBones.length; i++){
            tailBone = new TailBone();

            this.tailBones[i] = tailBone;
            app.stage.addChild(tailBone.getBone());
            // this.container.addChild(tailBone.getBone());
        }
        this.visualGlobalPos = new Point();
    }

    setShape(w, h){
        for (let i=0; i<this.tailBones.length; i++){
            this.tailBones[i].setShape(w, h);
        }
    }

    animate(delta){
        this._spawnTailBone(delta);

        for (let i=0; i<this.tailBones.length; i++){
            this.tailBones[i].animate(delta);
        }

        // this._advanceContainer();
    }

    // _advanceContainer(){
    //     this.visualGlobalPos = this.parentVisual.getGlobalPosition(this.visualGlobalPos);
    //     this.container.x = this.visualGlobalPos.x;
    //     this.container.y = this.visualGlobalPos.y;
    //     this.container.pivot.x = this.container.width/2;
    //     this.container.pivot.y = this.container.height/2;
    // }

    _spawnTailBone(delta){
        if (this.currTailBoneToUse >= this.tailBones.length)
            this.currTailBoneToUse = 0;

        if (this.spawnBoneDelay <= 0){
            if (! this.tailBones[this.currTailBoneToUse].visible()){

                this.visualGlobalPos = this.parentVisual.getGlobalPosition(this.visualGlobalPos);

                this.tailBones[this.currTailBoneToUse].activate(this.visualGlobalPos, this.parentVisual.scale, this.parent.rotation);

                this.currTailBoneToUse ++;
                this.spawnBoneDelay = DELAY_BETWEEN_BONE_SPAWN;
            }
            else
                console.log("cant spawn");
        }
        else
            this.spawnBoneDelay -= delta;
    }
}