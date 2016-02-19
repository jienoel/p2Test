var DemoRevoluteConstraint = (function (_super) {
    __extends(DemoRevoluteConstraint, _super);
    function DemoRevoluteConstraint() {
        _super.call(this);
    }
    var d = __define,c=DemoRevoluteConstraint;p=c.prototype;
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
        this.createRectangle(0, 200, 10, 400, true);
        this.createRectangle(550, 200, 10, 400, true);
        this.createCircle(275, 450, 200, true);
    };
    p.createDebug = function () {
        var sprite = new egret.Sprite();
        this.addChild(sprite);
        this.debugDraw = new p2DebugDraw(this.world, sprite);
    };
    p.createJoint = function () {
        var car = this.createRectangle(290, 100, 90, 30);
        var wheelA = this.createCircle(260, 120, 15);
        var wheelB = this.createCircle(320, 120, 15);
        wheelA.allowSleep = false;
        wheelB.allowSleep = false;
        var jointA = new p2.RevoluteConstraint(car, wheelA, { worldPivot: [260 / this.factor, 120 / this.factor] });
        jointA.collideConnected = false;
        var jointB = new p2.RevoluteConstraint(car, wheelB, { worldPivot: [320 / this.factor, 120 / this.factor] });
        jointB.collideConnected = false;
        this.world.addConstraint(jointA);
        this.world.addConstraint(jointB);
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
    return DemoRevoluteConstraint;
})(AbstractP2Test);
egret.registerClass(DemoRevoluteConstraint,"DemoRevoluteConstraint");
//# sourceMappingURL=DemoRevoluteConstraint.js.map