var DemoPrismaticConstraint = (function (_super) {
    __extends(DemoPrismaticConstraint, _super);
    function DemoPrismaticConstraint() {
        _super.call(this);
    }
    var d = __define,c=DemoPrismaticConstraint;p=c.prototype;
    p.onAppReady = function () {
        this.createWorld();
        this.createGround();
        this.createDebug();
        this.createJoint();
        _super.prototype.enableMouseDrag.call(this, this.world);
    };
    p.createWorld = function () {
        var wrd = new p2.World();
        wrd.sleepMode = p2.World.BODY_SLEEPING;
        wrd.gravity = [0, 10];
        this.world = wrd;
        ;
    };
    p.createGround = function () {
        var groundShape = new p2.Plane();
        var groundBody = new p2.Body();
        groundBody.addShape(groundShape);
        groundBody.type = p2.Body.STATIC;
        groundBody.position = [0, 300 / this.factor];
        groundBody.angle = Math.PI;
        this.world.addBody(groundBody);
    };
    p.createDebug = function () {
        var sprite = new egret.Sprite();
        this.addChild(sprite);
        this.debugDraw = new p2DebugDraw(this.world, sprite);
    };
    p.createJoint = function () {
        var emptyBody = new p2.Body({ position: [275 / this.factor, 100 / this.factor] });
        this.world.addBody(emptyBody);
        var bodyA = this.createCircle(275, 100, 10);
        bodyA.allowSleep = false;
        var bodyB = this.createRectangle(350, 50, 30, 20);
        bodyB.allowSleep = false;
        var prismaticJoint = new p2.PrismaticConstraint(emptyBody, bodyA);
        prismaticJoint.localAxisA = [1, 0];
        prismaticJoint.setLimits(-100 / this.factor, 100 / this.factor);
        var distanceJoint = new p2.DistanceConstraint(bodyA, bodyB);
        this.world.addConstraint(prismaticJoint);
        this.world.addConstraint(distanceJoint);
    };
    p.loop = function () {
        this.world.step(1 / 60);
        this.debugDraw.drawDebug();
    };
    p.createRectangle = function (x, y, w, h) {
        var shape = new p2.Box({ width: w / this.factor, height: h / this.factor });
        var body = new p2.Body({ mass: 2, position: [x / this.factor, y / this.factor] });
        body.addShape(shape);
        this.world.addBody(body);
        return body;
    };
    p.createCircle = function (x, y, r) {
        var circleShape = new p2.Circle({ radius: r / this.factor });
        var body = new p2.Body({ mass: 1, position: [x / this.factor, y / this.factor], angularVelocity: 2 });
        body.addShape(circleShape);
        this.world.addBody(body);
        return body;
    };
    return DemoPrismaticConstraint;
})(AbstractP2Test);
egret.registerClass(DemoPrismaticConstraint,"DemoPrismaticConstraint");
//# sourceMappingURL=DemoPrismaticConstraint.js.map