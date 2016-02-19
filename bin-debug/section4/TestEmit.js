var TestEmit = (function (_super) {
    __extends(TestEmit, _super);
    function TestEmit() {
        _super.call(this);
    }
    var d = __define,c=TestEmit;p=c.prototype;
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
        wrd.gravity = [0, 10];
        this.world = wrd;
    };
    p.createGround = function () {
        var groundShape = new p2.Plane();
        var groundBody = new p2.Body();
        groundBody.addShape(groundShape, [0, 20 / this.factor]);
        groundShape = new p2.Plane();
        groundBody.addShape(groundShape, [0, 380 / this.factor], Math.PI);
        groundShape = new p2.Plane();
        groundBody.addShape(groundShape, [530 / this.factor, 0], Math.PI / 2);
        groundShape = new p2.Plane();
        groundBody.addShape(groundShape, [20 / this.factor, 380 / this.factor], -Math.PI / 2);
        groundBody.type = p2.Body.STATIC;
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
        if (this.bodyRef.velocity[1] < 0) {
            this.bodyRef.emit({ type: "myEvent" });
        }
    };
    p.createBody = function () {
        var shape = new p2.Box({ width: 60 / this.factor, height: 40 / this.factor });
        var body = new p2.Body({ mass: 1, position: [274 / this.factor, 200 / this.factor] });
        body.addShape(shape);
        this.world.addBody(body);
        var onMyEvent = function (event) {
            console.log("myEvent is fired, beacause I am moving up.");
        };
        body.on("myEvent", onMyEvent);
        this.bodyRef = body;
    };
    return TestEmit;
})(AbstractP2Test);
egret.registerClass(TestEmit,"TestEmit");
//# sourceMappingURL=TestEmit.js.map