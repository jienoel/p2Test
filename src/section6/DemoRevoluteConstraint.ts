class DemoRevoluteConstraint extends AbstractP2Test{
    private debugDraw: p2DebugDraw;
    private world: p2.World;
    private trackingBody: p2.Body;

    public constructor() {
        super();
    }
    public onAppReady(): void {
        this.createWorld();
        this.createGround();
        this.createDebug();
        this.createJoint();

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

        this.createRectangle(0, 200, 10, 400,true);
        this.createRectangle(550, 200, 10, 400, true);
        this.createCircle(275, 450, 200, true);
    }
    private createDebug(): void {

        var sprite: egret.Sprite = new egret.Sprite();
        this.addChild(sprite);
        this.debugDraw = new p2DebugDraw(this.world,sprite);
    }
    
    private createJoint(): void {
        var car: p2.Body = this.createRectangle(290, 100, 90, 30);
        var wheelA: p2.Body = this.createCircle(260, 120,15);
        var wheelB: p2.Body = this.createCircle(320, 120,15);
        wheelA.allowSleep = false;
        wheelB.allowSleep = false;

        var jointA: p2.RevoluteConstraint = new p2.RevoluteConstraint(
            car, wheelA,
            { worldPivot: [260 / this.factor, 120 / this.factor] }
            );
        jointA.collideConnected = false;
        var jointB: p2.RevoluteConstraint = new p2.RevoluteConstraint(
            car, wheelB,
            { worldPivot: [320 / this.factor, 120 / this.factor] }
            );
        jointB.collideConnected = false;
        this.world.addConstraint(jointA);
        this.world.addConstraint(jointB);
    }
    public loop(): void {
        this.world.step(1/60);
        this.debugDraw.drawDebug();
    }
    private createRectangle(x: number, y: number, w: number, h: number,isStatic:boolean = false): p2.Body {
        var shape: p2.Box = new p2.Box({ width: w / this.factor, height: h / this.factor });
        var body: p2.Body = new p2.Body({ mass: 1, position: [x / this.factor, y / this.factor] });
        body.addShape(shape);
        if (isStatic) {
            body.type = p2.Body.STATIC;
            body.updateMassProperties();
        }
        this.world.addBody(body);

        return body;
    }
    private createCircle(x: number, y: number, r: number,isStatic:boolean=false): p2.Body {
        var circleShape: p2.Circle = new p2.Circle({ radius: r / this.factor });
        var body: p2.Body = new p2.Body({ mass: 1, position: [x / this.factor, y / this.factor] });
        body.addShape(circleShape);
        if (isStatic) {
            body.type = p2.Body.STATIC;
            body.updateMassProperties();
        }
        this.world.addBody(body);
        return body;
    }
}


