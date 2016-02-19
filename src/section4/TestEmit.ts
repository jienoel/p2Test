class TestEmit extends AbstractP2Test {
    private debugDraw: p2DebugDraw;
    private world: p2.World;
    private bodyRef: p2.Body;

    public constructor() {
        super();
    }
    public onAppReady(): void {
        this.createWorld();
        this.createGround();
        this.createDebug();

        this.createBody();
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
    }
    
    public loop(): void {
        this.world.step(1/60);
        this.debugDraw.drawDebug();
        if (this.bodyRef.velocity[1] < 0) {
            this.bodyRef.emit({ type: "myEvent" });
        }
    }
    private createBody(): void {
        var shape: p2.Box = new p2.Box({ width: 60 / this.factor, height: 40 / this.factor });
        var body: p2.Body = new p2.Body({ mass: 1, position: [274 / this.factor, 200 / this.factor] });
        body.addShape(shape);
        this.world.addBody(body);
        
        var onMyEvent = function (event) {
            console.log("myEvent is fired, beacause I am moving up.");
        };
        body.on("myEvent", onMyEvent);
        this.bodyRef = body;
    }
}


