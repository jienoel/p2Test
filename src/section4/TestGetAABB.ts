class TestGetAABB extends AbstractP2Test {
    private debugDraw: p2DebugDraw;
    private world: p2.World;
    private highestPoint: number;

    public constructor() {
        super();
    }
    public onAppReady(): void {
        this.createWorld();
        this.createGround();
        this.createDebug();

        super.enableMouseDrag(this.world);
    }
    private createWorld(): void {
        var wrd:p2.World = new p2.World();
        wrd.sleepMode = p2.World.BODY_SLEEPING;
        wrd.gravity = [0,10];
        this.world = wrd;
    }
    private createGround(): void {
        var groundShape: p2.Plane = new p2.Plane();
        var groundBody: p2.Body = new p2.Body();
        groundBody.addShape(groundShape, [0, 20 / this.factor]);
        groundShape = new p2.Plane();
        groundBody.addShape(groundShape, [0, 380 / this.factor], Math.PI);

        groundShape = new p2.Plane();
        groundBody.addShape(groundShape, [530 / this.factor, 0], Math.PI / 2);

        groundShape = new p2.Plane();
        groundBody.addShape(groundShape, [20 / this.factor, 380 / this.factor], -Math.PI / 2);
        groundBody.type = p2.Body.STATIC;
        this.world.addBody(groundBody);
    }
    private createDebug(): void {
        var sprite: egret.Sprite = new egret.Sprite();
        this.addChild(sprite);
        this.debugDraw = new p2DebugDraw(this.world,sprite);
        this.debugDraw.isDrawAABB = true;
    }
    
    public loop(): void {
        this.world.step(1/60);
        this.debugDraw.drawDebug();

        this.highestPoint = 1000;
        var _this = this;
        this.world.bodies.forEach(function (body: p2.Body) {
            if (body.type == p2.Body.DYNAMIC) {
                if (body.getAABB().lowerBound[1] < _this.highestPoint) {
                    _this.highestPoint = body.getAABB().lowerBound[1];
                }
            }
        });
        this.debugDraw.drawSegment([0, this.highestPoint], [600, this.highestPoint],0xff0000);
    }
    //add new function bleow here===========================
    private createRectangle(x: number, y: number): void {
        x = x / this.factor;
        y = y / this.factor;
        var shape: p2.Box = new p2.Box({ width: 60 / this.factor, height: 40 / this.factor });
        var body: p2.Body = new p2.Body({ mass: 1, position: [x,y] });
        body.addShape(shape);
        this.world.addBody(body);
    }
    private createCircle(x: number, y: number): void {
        x = x / this.factor;
        y = y / this.factor;
        var r:number = (Math.random() * 30 + 10) / this.factor;
        var shape: p2.Circle = new p2.Circle({ radius: r });
        var body: p2.Body = new p2.Body({ mass: 1, position: [x, y] });
        body.addShape(shape);
        this.world.addBody(body);
    }
    private createTriangle(x: number, y: number): void {
        x = x / this.factor;
        y = y / this.factor;
        var shape: p2.Convex = new p2.Convex({ vertices: [[-50 / this.factor, 25 / this.factor], [0, -50 / this.factor], [50 / this.factor, 25 / this.factor]] });
        var body: p2.Body = new p2.Body({ mass: 1, position: [x, y] });
        body.addShape(shape);
        this.world.addBody(body);
    }
    public onTouch(te: egret.TouchEvent): void {
        switch (te.type) {
            case egret.TouchEvent.TOUCH_BEGIN:
                var rnd: number = Math.random();
                var x: number = Math.random() * 500 + 20;
                var y: number = 100;
                if (rnd < 0.3) {
                    this.createCircle(x,y);
                } else if (rnd < 0.6) {
                    this.createRectangle(x,y);
                } else {
                    this.createTriangle(x,y);
                }
                break;
        }
    }
}
