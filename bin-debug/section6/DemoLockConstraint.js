var DemoLockConstraint = (function (_super) {
    __extends(DemoLockConstraint, _super);
    function DemoLockConstraint() {
        _super.call(this);
    }
    var d = __define,c=DemoLockConstraint;p=c.prototype;
    p.onAppReady = function () {
        this.createWorld();
        this.createGround();
        this.createDebug();
        this.createBody();
        this.addEvent();
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
        groundBody.position = [0, 350 / this.factor];
        groundBody.angle = Math.PI;
        this.world.addBody(groundBody);
    };
    p.createDebug = function () {
        var sprite = new egret.Sprite();
        this.addChild(sprite);
        this.debugDraw = new p2DebugDraw(this.world, sprite);
    };
    p.createBody = function () {
        this.centerBody = this.createCircle(275, 200, 50);
        this.centerBody.type = p2.Body.KINEMATIC;
        this.centerBody.angularVelocity = 2 * Math.PI / 180 * 60;
    };
    p.createJoint = function (bodyA, bodyB) {
        var localAngleB = bodyB.angle - bodyA.angle;
        var localOffsetB = [];
        p2.vec2.sub(localOffsetB, bodyB.position, bodyA.position);
        bodyA.vectorToLocalFrame(localOffsetB, localOffsetB);
        var joint = new p2.LockConstraint(bodyA, bodyB, {
            localAngleB: localAngleB,
            localOffsetB: localOffsetB
        });
        this.world.addConstraint(joint);
    };
    p.loop = function () {
        this.world.step(1 / 60);
        this.debugDraw.drawDebug();
    };
    p.onClick = function (te) {
        this.createRectangle(te.localX, te.localY, 30, 30);
    };
    p.addEvent = function () {
        var _this = this;
        this.world.on("beginContact", function (e) {
            if (e.bodyA != _this.centerBody && e.bodyB != _this.centerBody)
                return;
            var otherBody = (e.bodyA == _this.centerBody) ? e.bodyB : e.bodyA;
            _this.createJoint(_this.centerBody, otherBody);
        });
        this.stage.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onClick, this);
    };
    p.createRectangle = function (x, y, w, h) {
        var shape = new p2.Box({ width: w / this.factor, height: h / this.factor });
        var body = new p2.Body({ mass: 1, position: [x / this.factor, y / this.factor] });
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
    return DemoLockConstraint;
})(AbstractP2Test);
egret.registerClass(DemoLockConstraint,"DemoLockConstraint");
//# sourceMappingURL=DemoLockConstraint.js.map