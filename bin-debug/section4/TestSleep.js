var TestSleep = (function (_super) {
    __extends(TestSleep, _super);
    function TestSleep() {
        _super.call(this);
    }
    var d = __define,c=TestSleep;p=c.prototype;
    p.onAppReady = function () {
        this.createWorld();
        this.createGround();
        this.createDebug();
        this.createBody();
        _super.prototype.enableMouseDrag.call(this, this.world);
        var _this = this;
        document.addEventListener("keydown", function (e) {
            if (e.keyCode == 32)
                _this.switchToCall();
        });
    };
    p.createWorld = function () {
        var wrd = new p2.World();
        wrd.sleepMode = p2.World.NO_SLEEPING;
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
    p.createBody = function () {
        //����Box��״����
        var boxShape = new p2.Box({ width: 80 / this.factor, height: 40 / this.factor });
        this.body = new p2.Body({ mass: 1, position: [160 / this.factor, 100 / this.factor], angularVelocity: 1 });
        this.body.addShape(boxShape);
        this.world.addBody(this.body);
    };
    p.switchToCall = function () {
        if (this.body.sleepState == p2.Body.AWAKE) {
            this.body.sleep();
        }
        else {
            this.body.wakeUp();
        }
    };
    return TestSleep;
})(AbstractP2Test);
egret.registerClass(TestSleep,"TestSleep");
//# sourceMappingURL=TestSleep.js.map