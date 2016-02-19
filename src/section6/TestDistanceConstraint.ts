class TestDistanceConstraint extends AbstractP2Test{
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
        wrd.gravity = [0,0];
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
        var bodyA: p2.Body = this.createRectangle(200, 100);
        var bodyB: p2.Body = this.createCircle(350, 100);
        bodyA.allowSleep = false;
        bodyB.allowSleep = false;
        //bodyA.type = p2.Body.STATIC;
        bodyA.updateMassProperties();

        var joint: p2.DistanceConstraint = new p2.DistanceConstraint(
            bodyA,
            bodyB,
            {
                localAnchorA: [40/this.factor, 0],
                localAnchorB: [40/this.factor, 0]
            });
        joint.collideConnected = false;
        joint.distance = 100/this.factor;
        joint.upperLimitEnabled = true;
        joint.upperLimit = 200/this.factor;
        joint.lowerLimitEnabled = true;
        joint.lowerLimit = 100/this.factor;

        this.world.addConstraint(joint);
        
    }
    public loop(): void {
        this.world.step(1/60);
        this.debugDraw.drawDebug();
    }
    private createRectangle(x:number,y:number): p2.Body {
        var shape: p2.Box = new p2.Box({width:60/this.factor, height:80/this.factor});
        var body: p2.Body = new p2.Body({ mass: 1, position: [x/this.factor, y/this.factor] });
        body.addShape(shape);
        this.world.addBody(body);

        return body;
    }
    private createCircle(x: number, y: number): p2.Body {
        var circleShape: p2.Circle = new p2.Circle({radius:30/this.factor});
        var body: p2.Body = new p2.Body({ mass: 1, position: [x/this.factor, y/this.factor], angularVelocity: 2 });
        body.addShape(circleShape);
        this.world.addBody(body);
        return body;
    }
}


