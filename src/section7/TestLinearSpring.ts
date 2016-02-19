class TestLinearSpring extends AbstractP2Test {
    private debugDraw: p2DebugDraw;
    private world: p2.World;

    public constructor() {
        super();
    }
    public onAppReady(): void {
        this.createWorld();
        this.createGround();
        this.createDebug();
        this.createSpring();

        super.enableMouseDrag(this.world);
    }
    private createWorld(): void {
        var wrd:p2.World = new p2.World();
        wrd.sleepMode = p2.World.BODY_SLEEPING;
        wrd.gravity = [0,10];
        this.world = wrd;;
    }
    private createGround(): void {
        var groundShape: p2.Plane = new p2.Plane();
        var groundBody: p2.Body = new p2.Body();

        groundBody.addShape(groundShape);
        groundBody.type = p2.Body.STATIC;

        groundBody.position = [0,300/this.factor];
        groundBody.angle = Math.PI;

        this.world.addBody(groundBody);
    }
    private createDebug(): void {
        var sprite: egret.Sprite = new egret.Sprite();
        this.addChild(sprite);
        this.debugDraw = new p2DebugDraw(this.world,sprite);
    }
    private createSpring(): void {
        var bodyA: p2.Body = this.createRectangle(275, 100,100,100);
        var bodyB: p2.Body = this.createCircle(350, 100,30);

        var s: p2.LinearSpring = new p2.LinearSpring(bodyA, bodyB);
        s.stiffness = 10;
        s.restLength = 150/this.factor;
        s.damping = 1;

        this.world.addSpring(s);
    }
    public loop(): void {
        this.world.step(1/60);
        this.debugDraw.drawDebug();
    }
    private createRectangle(x: number, y: number, w: number, h: number): p2.Body {
        var shape: p2.Box = new p2.Box({ width: w / this.factor, height: h / this.factor });
        var body: p2.Body = new p2.Body({ mass: 1, position: [x / this.factor, y / this.factor] });
        body.addShape(shape);
        this.world.addBody(body);

        return body;
    }
    private createCircle(x: number, y: number, r: number): p2.Body {
        var circleShape: p2.Circle = new p2.Circle({ radius: r / this.factor });
        var body: p2.Body = new p2.Body({ mass: 1, position: [x / this.factor, y / this.factor], angularVelocity: 2 });
        body.addShape(circleShape);
        this.world.addBody(body);
        return body;
    }
}


