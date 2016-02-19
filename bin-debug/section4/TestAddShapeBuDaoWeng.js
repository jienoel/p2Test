var TestAddShapeBuDaoWeng = (function (_super) {
    __extends(TestAddShapeBuDaoWeng, _super);
    function TestAddShapeBuDaoWeng() {
        _super.call(this);
    }
    var d = __define,c=TestAddShapeBuDaoWeng;p=c.prototype;
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
        var size = 40 / this.factor;
        var circle = new p2.Circle({ radius: size });
        var body = new p2.Body({ mass: 1, position: [274 / this.factor, 200 / this.factor] });
        body.addShape(circle, [0, -size]);
        var rect = new p2.Box({ width: size * 2, height: size });
        body.addShape(rect, [0, -size * 2]);
        rect = new p2.Box({ width: size * 2, height: size });
        body.addShape(rect, [0, -size * 3]);
        rect = new p2.Box({ width: size * 2, height: size });
        body.addShape(rect, [0, -size * 4]);
        rect = new p2.Box({ width: size * 2, height: size });
        body.addShape(rect, [0, -size * 5]);
        this.world.addBody(body);
        this.bodyRef = body;
        body.allowSleep = false;
        body.adjustCenterOfMass();
    };
    return TestAddShapeBuDaoWeng;
})(AbstractP2Test);
egret.registerClass(TestAddShapeBuDaoWeng,"TestAddShapeBuDaoWeng");
//# sourceMappingURL=TestAddShapeBuDaoWeng.js.map