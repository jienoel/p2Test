var TestDistanceConstraint = (function (_super) {
    __extends(TestDistanceConstraint, _super);
    function TestDistanceConstraint() {
        _super.call(this);
    }
    var d = __define,c=TestDistanceConstraint;p=c.prototype;
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
        wrd.gravity = [0, 0];
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
        var bodyA = this.createRectangle(200, 100);
        var bodyB = this.createCircle(350, 100);
        bodyA.allowSleep = false;
        bodyB.allowSleep = false;
        //bodyA.type = p2.Body.STATIC;
        bodyA.updateMassProperties();
        var joint = new p2.DistanceConstraint(bodyA, bodyB, {
            localAnchorA: [40 / this.factor, 0],
            localAnchorB: [40 / this.factor, 0]
        });
        joint.collideConnected = false;
        joint.distance = 100 / this.factor;
        joint.upperLimitEnabled = true;
        joint.upperLimit = 200 / this.factor;
        joint.lowerLimitEnabled = true;
        joint.lowerLimit = 100 / this.factor;
        this.world.addConstraint(joint);
    };
    p.loop = function () {
        this.world.step(1 / 60);
        this.debugDraw.drawDebug();
    };
    p.createRectangle = function (x, y) {
        var shape = new p2.Box({ width: 60 / this.factor, height: 80 / this.factor });
        var body = new p2.Body({ mass: 1, position: [x / this.factor, y / this.factor] });
        body.addShape(shape);
        this.world.addBody(body);
        return body;
    };
    p.createCircle = function (x, y) {
        var circleShape = new p2.Circle({ radius: 30 / this.factor });
        var body = new p2.Body({ mass: 1, position: [x / this.factor, y / this.factor], angularVelocity: 2 });
        body.addShape(circleShape);
        this.world.addBody(body);
        return body;
    };
    return TestDistanceConstraint;
})(AbstractP2Test);
egret.registerClass(TestDistanceConstraint,"TestDistanceConstraint");
//# sourceMappingURL=TestDistanceConstraint.js.map