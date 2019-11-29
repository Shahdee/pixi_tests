class Snake{

    constructor(){
        this._createSnake();
    }

    _createSnake(){

        this.count = 0;

        // build a rope!
        this.ropeLength = 45;

        this.points = [];

        for (var i = 0; i < 25; i++) {
            this.points.push(new PIXI.Point(i * this.ropeLength, 0));
        }

        var strip = new PIXI.mesh.Rope(PIXI.Texture.fromImage('assets/snake.png'), this.points);

        strip.x = -40;
        strip.y = 300;

        this.key = new PIXI.Graphics();
        this.key.x = strip.x;
        this.key.y = strip.y;
        

        app.stage.addChild(strip);

        app.stage.addChild(this.key);

    }

    animate(){

        this.count += 0.1;

        // make the snake
        for (var i = 0; i < this.points.length; i++) {
            this.points[i].y = Math.sin((i * 0.5) + this.count) * 30;
            this.points[i].x = i * this.ropeLength + Math.cos((i * 0.3) + this.count) * 20;
        }

        this._renderPoints();
    }

    _renderPoints(){
        this.key.clear();
    
        this.key.lineStyle(2, 0xffc2c2);
        this.key.moveTo(this.points[0].x, this.points[0].y);
    
        for (var i = 1; i < this.points.length; i++) {
            this.key.lineTo(this.points[i].x, this.points[i].y);
        }
    
        for (var i = 1; i < this.points.length; i++) {
            this.key.beginFill(0xff0022);
            this.key.drawCircle(this.points[i].x, this.points[i].y, 10);
            this.key.endFill();
        }
    }
}











