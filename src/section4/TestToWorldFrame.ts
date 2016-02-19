class TestToWorldFrame extends AbstractP2Test {
    private debugDraw: p2DebugDraw;
    private world: p2.World;
    private rotatedBody: p2.Body;
    private worldPoint: number[] = [0,0];
    private localPoint: number[]=[0,0];

    public constructor() {
        super();
    }
    public onAppReady(): void {
        this.createWorld();
        this.createGround();
        this.createDebug();
        this.createBodies();

        this.stage.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouch, this);
    }
    private createWorld(): void {
        var wrd:p2.World = new p2.World();
        wrd.gravity = [0,0];
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

        if (this.localPoint != null) {
            this.rotatedBody.toWorldFrame(this.worldPoint, this.localPoint);
        }
        this.debugDraw.drawCircle(this.worldPoint, 10/this.factor, 0xff0000, 1,false);
    }
    //add new function bleow here===========================

    private createBodies(): void {
        var shape: p2.Circle = new p2.Circle({ radius: 100/this.factor });
        this.rotatedBody = new p2.Body({ mass: 1, position: [275/this.factor, 200/this.factor] });
        this.rotatedBody.type = p2.Body.KINEMATIC;
        this.rotatedBody.angularVelocity  =5* Math.PI / 20;
        this.rotatedBody.updateMassProperties();
        this.rotatedBody.addShape(shape);
        this.world.addBody(this.rotatedBody);
    }
    public onTouch(te: egret.TouchEvent): void {
        var mousePoint: number[] = new Array(te.stageX/this.factor, te.stageY/this.factor);
        if (this.world.hitTest(mousePoint, [this.rotatedBody],1).length > 0) {
            this.localPoint = [];
            this.rotatedBody.toLocalFrame(this.localPoint, mousePoint);
        } else {
            this.localPoint = null;
            this.worldPoint = mousePoint;
        }
    }
}


