class DemoPrismaticConstraint extends AbstractP2Test{
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
    }
    private createDebug(): void {

        var sprite: egret.Sprite = new egret.Sprite();
        this.addChild(sprite);
        this.debugDraw = new p2DebugDraw(this.world,sprite);
    }
    
    private createJoint(): void {
        var emptyBody: p2.Body = new p2.Body({position:[275/this.factor,100/this.factor]});
        this.world.addBody(emptyBody);

        var bodyA: p2.Body = this.createCircle(275, 100, 10);
        bodyA.allowSleep = false;
        var bodyB: p2.Body = this.createRectangle(350, 50,30,20);
        bodyB.allowSleep = false;

        var prismaticJoint: p2.PrismaticConstraint = new p2.PrismaticConstraint(emptyBody, bodyA);
        prismaticJoint.localAxisA = [1, 0];
        prismaticJoint.setLimits(-100/this.factor, 100/this.factor);

        var distanceJoint: p2.DistanceConstraint = new p2.DistanceConstraint(bodyA, bodyB);
        

        this.world.addConstraint(prismaticJoint);
        this.world.addConstraint(distanceJoint);
    }
    public loop(): void {
        this.world.step(1/60);
        this.debugDraw.drawDebug();
    }
    private createRectangle(x: number, y: number, w: number, h: number): p2.Body {
        var shape: p2.Box = new p2.Box({ width: w / this.factor, height: h / this.factor });
        var body: p2.Body = new p2.Body({ mass: 2, position: [x / this.factor, y / this.factor] });
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