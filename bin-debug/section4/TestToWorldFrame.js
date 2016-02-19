var TestToWorldFrame = (function (_super) {
    __extends(TestToWorldFrame, _super);
    function TestToWorldFrame() {
        _super.call(this);
        this.worldPoint = [0, 0];
        this.localPoint = [0, 0];
    }
    var d = __define,c=TestToWorldFrame;p=c.prototype;
    p.onAppReady = function () {
        this.createWorld();
        this.createGround();
        this.createDebug();
        this.createBodies();
        this.stage.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouch, this);
    };
    p.createWorld = function () {
        var wrd = new p2.World();
        wrd.gravity = [0, 0];
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
        if (this.localPoint != null) {
            this.rotatedBody.toWorldFrame(this.worldPoint, this.localPoint);
        }
        this.debugDraw.drawCircle(this.worldPoint, 10 / this.factor, 0xff0000, 1, false);
    };
    //add new function bleow here===========================
    p.createBodies = function () {
        var shape = new p2.Circle({ radius: 100 / this.factor });
        this.rotatedBody = new p2.Body({ mass: 1, position: [275 / this.factor, 200 / this.factor] });
        this.rotatedBody.type = p2.Body.KINEMATIC;
        this.rotatedBody.angularVelocity = 5 * Math.PI / 20;
        this.rotatedBody.updateMassProperties();
        this.rotatedBody.addShape(shape);
        this.world.addBody(this.rotatedBody);
    };
    p.onTouch = function (te) {
        var mousePoint = new Array(te.stageX / this.factor, te.stageY / this.factor);
        if (this.world.hitTest(mousePoint, [this.rotatedBody], 1).length > 0) {
            this.localPoint = [];
            this.rotatedBody.toLocalFrame(this.localPoint, mousePoint);
        }
        else {
            this.localPoint = null;
            this.worldPoint = mousePoint;
        }
    };
    return TestToWorldFrame;
})(AbstractP2Test);
egret.registerClass(TestToWorldFrame,"TestToWorldFrame");
//# sourceMappingURL=TestToWorldFrame.js.map