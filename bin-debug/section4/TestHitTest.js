var TestHitTest = (function (_super) {
    __extends(TestHitTest, _super);
    function TestHitTest() {
        _super.call(this);
        this.offset = new Array();
    }
    var d = __define,c=TestHitTest;p=c.prototype;
    p.onAppReady = function () {
        this.createWorld();
        this.createGround();
        this.createDebug();
        this.createBodies();
        this.stage.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouch, this);
        this.stage.addEventListener(egret.TouchEvent.TOUCH_END, this.onTouch, this);
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
    };
    //add new function bleow here===========================
    p.createRectangle = function (x, y, w, h) {
        x = x / this.factor;
        y = y / this.factor;
        w = w / this.factor;
        h = h / this.factor;
        var shape = new p2.Box({ width: w, height: h });
        var body = new p2.Body({ mass: 1, position: [x, y] });
        body.addShape(shape);
        this.world.addBody(body);
        return body;
    };
    p.createBodies = function () {
        this.dragableBody = this.createRectangle(275, 200, 80, 60);
    };
    p.onTouch = function (te) {
        var mousePoint = new Array(te.stageX / this.factor, te.stageY / this.factor);
        switch (te.type) {
            case egret.TouchEvent.TOUCH_BEGIN:
                if (this.world.hitTest(mousePoint, [this.dragableBody], 1)) {
                    this.dragableBody.sleep();
                    p2.vec2.subtract(this.offset, this.dragableBody.position, mousePoint);
                    this.stage.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.onTouch, this);
                }
                break;
            case egret.TouchEvent.TOUCH_END:
                this.dragableBody.wakeUp();
                this.stage.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.onTouch, this);
                break;
            case egret.TouchEvent.TOUCH_MOVE:
                p2.vec2.add(this.dragableBody.position, mousePoint, this.offset);
                break;
        }
    };
    return TestHitTest;
})(AbstractP2Test);
egret.registerClass(TestHitTest,"TestHitTest");
//# sourceMappingURL=TestHitTest.js.map