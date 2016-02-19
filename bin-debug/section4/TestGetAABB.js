var TestGetAABB = (function (_super) {
    __extends(TestGetAABB, _super);
    function TestGetAABB() {
        _super.call(this);
    }
    var d = __define,c=TestGetAABB;p=c.prototype;
    p.onAppReady = function () {
        this.createWorld();
        this.createGround();
        this.createDebug();
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
        this.debugDraw.isDrawAABB = true;
    };
    p.loop = function () {
        this.world.step(1 / 60);
        this.debugDraw.drawDebug();
        this.highestPoint = 1000;
        var _this = this;
        this.world.bodies.forEach(function (body) {
            if (body.type == p2.Body.DYNAMIC) {
                if (body.getAABB().lowerBound[1] < _this.highestPoint) {
                    _this.highestPoint = body.getAABB().lowerBound[1];
                }
            }
        });
        this.debugDraw.drawSegment([0, this.highestPoint], [600, this.highestPoint], 0xff0000);
    };
    //add new function bleow here===========================
    p.createRectangle = function (x, y) {
        x = x / this.factor;
        y = y / this.factor;
        var shape = new p2.Box({ width: 60 / this.factor, height: 40 / this.factor });
        var body = new p2.Body({ mass: 1, position: [x, y] });
        body.addShape(shape);
        this.world.addBody(body);
    };
    p.createCircle = function (x, y) {
        x = x / this.factor;
        y = y / this.factor;
        var r = (Math.random() * 30 + 10) / this.factor;
        var shape = new p2.Circle({ radius: r });
        var body = new p2.Body({ mass: 1, position: [x, y] });
        body.addShape(shape);
        this.world.addBody(body);
    };
    p.createTriangle = function (x, y) {
        x = x / this.factor;
        y = y / this.factor;
        var shape = new p2.Convex({ vertices: [[-50 / this.factor, 25 / this.factor], [0, -50 / this.factor], [50 / this.factor, 25 / this.factor]] });
        var body = new p2.Body({ mass: 1, position: [x, y] });
        body.addShape(shape);
        this.world.addBody(body);
    };
    p.onTouch = function (te) {
        switch (te.type) {
            case egret.TouchEvent.TOUCH_BEGIN:
                var rnd = Math.random();
                var x = Math.random() * 500 + 20;
                var y = 100;
                if (rnd < 0.3) {
                    this.createCircle(x, y);
                }
                else if (rnd < 0.6) {
                    this.createRectangle(x, y);
                }
                else {
                    this.createTriangle(x, y);
                }
                break;
        }
    };
    return TestGetAABB;
})(AbstractP2Test);
egret.registerClass(TestGetAABB,"TestGetAABB");
//# sourceMappingURL=TestGetAABB.js.map