var TestFromPolygon = (function (_super) {
    __extends(TestFromPolygon, _super);
    function TestFromPolygon() {
        _super.call(this);
        this.points = new Array();
    }
    var d = __define,c=TestFromPolygon;p=c.prototype;
    p.onAppReady = function () {
        this.createWorld();
        this.createGround();
        this.createDebug();
        this.stage.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.touchEventHandler, this);
        this.stage.addEventListener(egret.TouchEvent.TOUCH_END, this.touchEventHandler, this);
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
        groundBody.position = [0, 390 / this.factor];
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
        if (this.points.length > 1)
            this.debugDraw.drawConvex(this.points, 0x000000, 1, false);
    };
    p.touchEventHandler = function (te) {
        var mousePos = new Array(te.stageX / this.factor, te.stageY / this.factor);
        switch (te.type) {
            case egret.TouchEvent.TOUCH_BEGIN:
                this.prePoint = this.copyPoint(mousePos);
                this.points.push(this.prePoint, this.prePoint);
                this.stage.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.touchEventHandler, this);
                break;
            case egret.TouchEvent.TOUCH_END:
                this.createConvexBody();
                this.stage.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.touchEventHandler, this);
                break;
            case egret.TouchEvent.TOUCH_MOVE:
                var dis = p2.vec2.dist(mousePos, this.prePoint);
                if (dis > 30 / this.factor) {
                    this.points.push(this.prePoint);
                    this.prePoint = this.copyPoint(mousePos);
                    this.points[this.points.length - 1] = this.copyPoint(mousePos);
                }
                else {
                    this.points[this.points.length - 1] = this.copyPoint(mousePos);
                }
                break;
        }
    };
    p.createConvexBody = function () {
        var body = new p2.Body({ mass: 1 });
        body.fromPolygon(this.points, { optimalDecomp: false });
        this.world.addBody(body);
        this.points = [];
    };
    p.copyPoint = function (p) {
        return new Array(p[0], p[1]);
    };
    return TestFromPolygon;
})(AbstractP2Test);
egret.registerClass(TestFromPolygon,"TestFromPolygon");
//# sourceMappingURL=TestFromPolygon.js.map