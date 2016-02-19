class TestContactEquation extends AbstractP2Test {
    private debugDraw: p2DebugDraw;
    private world: p2.World;

    private worldContactPoint: number[];
    private worldNormal: number[] = new Array();

    public constructor() {
        super();
    }
    public onAppReady(): void {
        this.createWorld();
        this.createGround();
        this.createDebug();

        this.createBodies();
        this.addEvent();
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
    
    public loop(): void {
        this.world.step(1/60);
        this.debugDraw.drawDebug();
        if (this.worldContactPoint != null) {
            this.debugDraw.drawCircle(this.worldContactPoint, 3/this.factor, 0xff0000, 1, true);
            this.debugDraw.drawVecAt(this.worldNormal, this.worldContactPoint, 0x0000ff);
        }
    }
    private addEvent(): void {
        var _this = this;
        this.world.on("beginContact", function (event: any) {
            for (var i: number = 0; i < event.contactEquations.length; i++) {
                var contactEquation: p2.ContactEquation = event.contactEquations[i];
                _this.worldContactPoint = [];
                p2.vec2.add(_this.worldContactPoint, contactEquation.bodyA.position, contactEquation.contactPointA);
                p2.vec2.copy(_this.worldNormal, contactEquation.normalA);
            }
        });
        this.world.on("endContact", function () {
            _this.worldContactPoint = null;
        });
    }
    private createBodies(): void {
        var b: p2.Body = this.createRectangle(100, 50);
        var b2: p2.Body = this.createCircle(200, 200);
    }
    private createRectangle(x: number, y: number): p2.Body {
        x = x / this.factor;
        y = y / this.factor;
        var shape: p2.Box = new p2.Box({ width: 100/this.factor, height: 50/this.factor });
        var body: p2.Body = new p2.Body({ mass: 1, position: [x, y],angle:Math.PI/4 });
        body.addShape(shape);
        this.world.addBody(body);

        return body;
    }
    private createCircle(x: number, y: number): p2.Body {
        x = x / this.factor;
        y = y / this.factor;
        var circleShape: p2.Circle = new p2.Circle({ radius: 50 / this.factor });
        var body: p2.Body = new p2.Body({ mass: 1, position: [x, y], angularVelocity: 2 });
        body.addShape(circleShape);
        this.world.addBody(body);
        return body;
    }
}


