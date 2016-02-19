class TestSleep extends AbstractP2Test {
    private debugDraw: p2DebugDraw;
    private world: p2.World;
    private body: p2.Body;

    public constructor() {
        super();
    }
    public onAppReady(): void {
        this.createWorld();
        this.createGround();
        this.createDebug();

        this.createBody();
        super.enableMouseDrag(this.world);

        var _this = this;
        document.addEventListener("keydown", function (e) {
            if(e.keyCode == 32) _this.switchToCall();
        });
    }
    public createWorld(): void {
        var wrd:p2.World = new p2.World();
        wrd.sleepMode = p2.World.NO_SLEEPING;
        wrd.gravity = [0,10];
        this.world = wrd;
    }
    public createGround(): void {
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
    }
    private createBody(): void {
        //创建Box形状刚体
        var boxShape: p2.Box = new p2.Box({width:80/this.factor,height:40/this.factor });
        this.body = new p2.Body({mass:1, position: [160/this.factor, 100/this.factor],angularVelocity:1 });
        this.body.addShape(boxShape);
        this.world.addBody(this.body);
    }
    private switchToCall(): void {
        if (this.body.sleepState == p2.Body.AWAKE) {
            this.body.sleep();
        } else {
            this.body.wakeUp();
        }
    }
}