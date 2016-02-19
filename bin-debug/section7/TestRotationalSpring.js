var TestRotationalSpring = (function (_super) {
    __extends(TestRotationalSpring, _super);
    function TestRotationalSpring() {
        _super.call(this);
    }
    var d = __define,c=TestRotationalSpring;p=c.prototype;
    p.onAppReady = function () {
        this.createWorld();
        this.createGround();
        this.createDebug();
        this.createSpring();
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
    p.createSpring = function () {
        var ba = this.createRectangle(200, 150, 100, 100);
        var bb = this.createCircle(350, 150, 30);
        ba.allowSleep = false;
        bb.allowSleep = false;
        var s = new p2.RotationalSpring(ba, bb, { stiffness: 10 });
        s.restAngle = Math.PI / 2;
        this.world.addSpring(s);
    };
    p.loop = function () {
        this.world.step(1 / 60);
        this.debugDraw.drawDebug();
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
    return TestRotationalSpring;
})(AbstractP2Test);
egret.registerClass(TestRotationalSpring,"TestRotationalSpring");
//# sourceMappingURL=TestRotationalSpring.js.map