class DemoLockConstraint extends AbstractP2Test{
    private debugDraw: p2DebugDraw;
    private world: p2.World;
    private centerBody: p2.Body;

    public constructor() {
        super();
    }
    public onAppReady(): void {
        this.createWorld();
        this.createGround();
        this.createDebug();
        this.createBody();
        this.addEvent();
        
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

        groundBody.position = [0,350/this.factor];
        groundBody.angle = Math.PI;

        this.world.addBody(groundBody);
    }
    private createDebug(): void {
        var sprite: egret.Sprite = new egret.Sprite();
        this.addChild(sprite);
        this.debugDraw = new p2DebugDraw(this.world,sprite);
    }
    private createBody(): void {
        this.centerBody = this.createCircle(275,200,50);
        this.centerBody.type = p2.Body.KINEMATIC;
        this.centerBody.angularVelocity = 2* Math.PI/180*60;
    }
    private createJoint(bodyA:p2.Body,bodyB:p2.Body): void {
        var localAngleB:number = bodyB.angle - bodyA.angle;
        var localOffsetB: number[] = [];
        p2.vec2.sub(localOffsetB, bodyB.position, bodyA.position);
        bodyA.vectorToLocalFrame(localOffsetB,localOffsetB);

        var joint: p2.LockConstraint = new p2.LockConstraint(
            bodyA,
            bodyB,
            {
                localAngleB: localAngleB,
                localOffsetB: localOffsetB
            });
        
        this.world.addConstraint(joint);
    }
    public loop(): void {
        this.world.step(1/60);
        this.debugDraw.drawDebug();
    }
    public onClick(te: egret.TouchEvent): void {
        this.createRectangle(te.localX, te.localY, 30, 30);
    }
    public addEvent(): void {
        var _this = this;
        this.world.on("beginContact", function (e: any) {
            if (e.bodyA != _this.centerBody && e.bodyB != _this.centerBody) return;
            var otherBody: p2.Body = (e.bodyA == _this.centerBody)? e.bodyB: e.bodyA;
            _this.createJoint(_this.centerBody, otherBody);
        });

        this.stage.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onClick, this);
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