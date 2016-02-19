var TestGearConstraint = (function (_super) {
    __extends(TestGearConstraint, _super);
    function TestGearConstraint() {
        _super.call(this);
    }
    var d = __define,c=TestGearConstraint;p=c.prototype;
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
        groundBody.position = [0, 300];
        groundBody.angle = Math.PI;
        this.world.addBody(groundBody);
    };
    p.createDebug = function () {
        var sprite = new egret.Sprite();
        this.addChild(sprite);
        this.debugDraw = new p2DebugDraw(this.world, sprite);
    };
    p.createJoint = function () {
        var bodyA = this.createRectangle(200, 100, 60, 80);
        var bodyB = this.createCircle(350, 100, 30);
        bodyA.allowSleep = false;
        bodyB.allowSleep = false;
        //bodyA.type = p2.Body.STATIC;
        bodyA.updateMassProperties();
        var joint = new p2.GearConstraint(bodyA, bodyB);
        joint.angle = Math.PI / 2;
        joint.ratio = 1;
        joint.setStiffness(100);
        this.world.addConstraint(joint);
    };
    p.loop = function () {
        this.world.step(1 / 60);
        this.debugDraw.drawDebug();
    };
    p.createRectangle = function (x, y, w, h, isStatic) {
        if (isStatic === void 0) { isStatic = false; }
        var shape = new p2.Box({ width: w / this.factor, height: h / this.factor });
        var body = new p2.Body({ mass: 1, position: [x / this.factor, y / this.factor] });
        body.addShape(shape);
        if (isStatic) {
            body.type = p2.Body.STATIC;
            body.updateMassProperties();
        }
        this.world.addBody(body);
        return body;
    };
    p.createCircle = function (x, y, r, isStatic) {
        if (isStatic === void 0) { isStatic = false; }
        var circleShape = new p2.Circle({ radius: r / this.factor });
        var body = new p2.Body({ mass: 1, position: [x / this.factor, y / this.factor] });
        body.addShape(circleShape);
        if (isStatic) {
            body.type = p2.Body.STATIC;
            body.updateMassProperties();
        }
        this.world.addBody(body);
        return body;
    };
    return TestGearConstraint;
})(AbstractP2Test);
egret.registerClass(TestGearConstraint,"TestGearConstraint");
//# sourceMappingURL=TestGearConstraint.js.map