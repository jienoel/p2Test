var TestAddShape = (function (_super) {
    __extends(TestAddShape, _super);
    function TestAddShape() {
        _super.call(this);
    }
    var d = __define,c=TestAddShape;p=c.prototype;
    p.onAppReady = function () {
        this.createWorld();
        this.createGround();
        this.createDebug();
        this.createBody();
        _super.prototype.enableMouseDrag.call(this, this.world);
    };
    p.createWorld = function () {
        var wrd = new p2.World();
        wrd.sleepMode = p2.World.BODY_SLEEPING;
        wrd.gravity = [0, 0];
        this.world = wrd;
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
    p.loop = function () {
        this.world.step(1 / 60);
        this.debugDraw.drawDebug();
        this.debugDraw.drawCircle(this.bodyRef.position, 3 / this.factor, 0xff0000);
    };
    //add new function bleow here===========================
    p.createBody = function () {
        var rectSize = 40 / this.factor;
        var shape = new p2.Box({ width: rectSize, height: rectSize });
        var body = new p2.Body({ mass: 1, position: [274 / this.factor, 200 / this.factor] });
        body.addShape(shape, [0, 0]);
        shape = new p2.Box({ width: rectSize, height: rectSize });
        body.addShape(shape, [0, rectSize]);
        shape = new p2.Box({ width: rectSize, height: rectSize });
        body.addShape(shape, [0, rectSize * 2]);
        shape = new p2.Box({ width: rectSize, height: rectSize });
        body.addShape(shape, [rectSize, rectSize * 2]);
        this.world.addBody(body);
        this.bodyRef = body;
        body.allowSleep = false;
    };
    return TestAddShape;
})(AbstractP2Test);
egret.registerClass(TestAddShape,"TestAddShape");
//# sourceMappingURL=TestAddShape.js.map