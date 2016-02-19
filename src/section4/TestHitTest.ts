class TestHitTest extends AbstractP2Test {
    private debugDraw: p2DebugDraw;
    private world: p2.World;

    private dragableBody: p2.Body;
    private offset: number[] = new Array();

    public constructor() {
        super();
    }
    public onAppReady(): void {
        this.createWorld();
        this.createGround();
        this.createDebug();
        this.createBodies();

        this.stage.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouch, this);
        this.stage.addEventListener(egret.TouchEvent.TOUCH_END, this.onTouch, this);
    }
    private createWorld(): void {
        var wrd: p2.World = new p2.World();
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
    }
    //add new function bleow here===========================
    private createRectangle(x: number, y: number, w: number, h: number): p2.Body {
        x = x / this.factor;
        y = y / this.factor;
        w = w / this.factor;
        h = h / this.factor;

        var shape: p2.Box = new p2.Box({ width: w, height: h });
        var body: p2.Body = new p2.Body({ mass: 1, position: [x, y] });
        body.addShape(shape);
        this.world.addBody(body);
        return body;
    }
   
    private createBodies(): void {
        this.dragableBody = this.createRectangle(275, 200, 80, 60);
    }
    public onTouch(te: egret.TouchEvent): void {
        var mousePoint: number[] = new Array(te.stageX/this.factor, te.stageY/this.factor);
        switch (te.type) {
            case egret.TouchEvent.TOUCH_BEGIN:
                if (this.world.hitTest(mousePoint, [this.dragableBody],1)) {
                    this.dragableBody.sleep();
                    p2.vec2.subtract(this.offset, this.dragableBody.position, mousePoint);
                    this.stage.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.onTouch, this);
                }
                break;
            case egret.TouchEvent.TOUCH_END:
                this.dragableBody.wakeUp();
                this.stage.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.onTouch, this);
                break;
            case egret.TouchEvent.TOUCH_MOVE:
                p2.vec2.add(this.dragableBody.position, mousePoint, this.offset);
                break;
        }
    }
}


