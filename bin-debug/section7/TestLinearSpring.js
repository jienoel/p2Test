var TestLinearSpring = (function (_super) {
    __extends(TestLinearSpring, _super);
    function TestLinearSpring() {
        _super.call(this);
    }
    var d = __define,c=TestLinearSpring;p=c.prototype;
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
    p.createSpring = function () {
        var bodyA = this.createRectangle(275, 100, 100, 100);
        var bodyB = this.createCircle(350, 100, 30);
        var s = new p2.LinearSpring(bodyA, bodyB);
        s.stiffness = 10;
        s.restLength = 150 / this.factor;
        s.damping = 1;
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
    return TestLinearSpring;
})(AbstractP2Test);
egret.registerClass(TestLinearSpring,"TestLinearSpring");
//# sourceMappingURL=TestLinearSpring.js.map