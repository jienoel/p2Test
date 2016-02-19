class TestAdjustCenterOfMass extends AbstractP2Test {
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

        groundBody.addShape(groundShape);
        groundBody.type = p2.Body.STATIC;
        groundBody.position = [0,350/this.factor];
        groundBody.angle = Math.PI;
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
        this.debugDraw.drawCircle(this.bodyRef.position, 3/this.factor, 0xff0000);
    }
    //add new function bleow here===========================
    private createBody(): void {
        var size: number = 40/this.factor;
        var circle: p2.Circle = new p2.Circle({ radius: size });
        var body: p2.Body = new p2.Body({ mass: 1, position: [274/this.factor, 200/this.factor] });
        body.addShape(circle, [0, -size]);

        var rect: p2.Box = new p2.Box({ width: size * 2, height: size });
        body.addShape(rect, [0, -size*2]);
        rect = new p2.Box({ width: size * 2, height: size });
        body.addShape(rect, [0, -size*3]);
        rect = new p2.Box({ width: size * 2, height: size });
        body.addShape(rect, [0, -size * 4]);
        rect = new p2.Box({ width: size * 2, height: size });
        body.addShape(rect, [0, -size * 5]);
        this.world.addBody(body);

        this.bodyRef = body;
        body.allowSleep = false;
        body.updateMassProperties();
    }
}


