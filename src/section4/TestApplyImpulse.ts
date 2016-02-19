class TestApplyImpulse extends AbstractP2Test {
    private debugDraw: p2DebugDraw;
    private world: p2.World;
    private bodyRef: p2.Body;
    private mouseStart: number[];
    private mouseEnd: number[];

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
        if (this.mouseStart != null && this.mouseEnd!=null) {
            this.debugDraw.drawCircle(this.mouseStart, 3 / this.factor, 0, 1, true);
            this.debugDraw.drawSegment(this.mouseStart, this.mouseEnd, 0);
            this.debugDraw.drawSegment(this.bodyRef.position, this.mouseStart,0x00ff00);
        }
        this.debugDraw.drawCircle(this.bodyRef.position, 3 / this.factor, 0xff0000);
    }
    //add new function bleow here===========================
    private createBody(): void {
        var shape: p2.Box = new p2.Box({ width: 60 / this.factor, height: 40 / this.factor});
        var body: p2.Body = new p2.Body({ mass: 1, position: [274 / this.factor, 200 / this.factor] });
        body.addShape(shape);
        this.world.addBody(body);

        this.bodyRef = body;
        body.allowSleep = false;
    }
    public onTouch(te: egret.TouchEvent): void {
        switch (te.type) {
            case egret.TouchEvent.TOUCH_BEGIN:
                this.mouseStart = new Array(te.stageX / this.factor, te.stageY / this.factor);
                this.mouseEnd = new Array(te.stageX / this.factor, te.stageY / this.factor);
                this.stage.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.onTouch, this);
                break;
            case egret.TouchEvent.TOUCH_END:
                var impulse: number[] = new Array();
                p2.vec2.subtract(impulse, this.mouseStart, this.mouseEnd);
                if (impulse.length > 1) {
                    p2.vec2.scale(impulse, impulse, 10);
                    this.bodyRef.applyImpulse(impulse, this.mouseStart);
                    this.mouseStart = null;
                    this.mouseEnd = null;
                }
                this.stage.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.onTouch, this);
                break;
            case egret.TouchEvent.TOUCH_MOVE:
                this.mouseEnd = new Array(te.stageX / this.factor, te.stageY / this.factor);
                break;
        }
    }
}


