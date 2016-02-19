var TestAsset = (function (_super) {
    __extends(TestAsset, _super);
    function TestAsset() {
        _super.call(this);
    }
    var d = __define,c=TestAsset;p=c.prototype;
    p.onAppReady = function () {
        this.createWorld();
        this.createGround();
        this.createBodies();
        this.createDebug();
        this.stage.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.addOneBox, this);
    };
    p.createWorld = function () {
        var wrd = new p2.World();
        wrd.sleepMode = p2.World.BODY_SLEEPING;
        wrd.gravity = [0, 10];
        this.world = wrd;
    };
    p.createDebug = function () {
        var sprite = new egret.Sprite();
        this.addChild(sprite);
        this.debugDraw = new p2DebugDraw(this.world, sprite);
    };
    p.loop = function () {
        var _this = this;
        this.world.step(1 / 60);
        this.world.bodies.forEach(function (b) {
            if (b.displays != null && b.displays[0] != null) {
                b.displays[0].x = b.position[0] * _this.factor;
                b.displays[0].y = b.position[1] * _this.factor;
                b.displays[0].rotation = b.angle * 180 / Math.PI;
            }
        });
        this.debugDraw.drawDebug();
    };
    p.createGround = function () {
        var stageHeight = egret.MainContext.instance.stage.stageHeight;
        var groundShape = new p2.Plane();
        var groundBody = new p2.Body();
        groundBody.position[1] = 300 / this.factor;
        groundBody.angle = Math.PI;
        groundBody.addShape(groundShape);
        this.world.addBody(groundBody);
    };
    p.createBodies = function () {
        this.createBox(100, 200);
        this.createDesk(300, 100);
    };
    p.createBox = function (x, y) {
        x = x / this.factor;
        y = y / this.factor;
        var boxShape = new p2.Box({ width: 60 / this.factor, height: 60 / this.factor });
        var boxBody = new p2.Body({ mass: 1, position: [x, y] });
        boxBody.addShape(boxShape);
        this.world.addBody(boxBody);
        this.bindAsset(boxBody, "box");
    };
    p.createDesk = function (x, y) {
        var _this = this;
        x = x / this.factor;
        y = y / this.factor;
        var deskVertices = new Array([0, 0], [0, 16], [16, 16], [16, 46], [32, 46], [32, 16], [178, 16], [178, 46], [194, 46], [194, 16], [210, 16], [210, 0]);
        deskVertices.forEach(function (vertice) {
            vertice[0] = vertice[0] / _this.factor;
            vertice[1] = vertice[1] / _this.factor;
        });
        var deskBody = new p2.Body({ mass: 1, position: [x, y] });
        deskBody.fromPolygon(deskVertices);
        this.world.addBody(deskBody);
        this.bindAsset(deskBody, "desk");
    };
    p.addOneBox = function (e) {
        var positionX = Math.floor(e.stageX);
        var positionY = Math.floor(e.stageY);
        if (Math.random() < 0.5) {
            this.createBox(positionX, positionY);
        }
        else {
            this.createDesk(positionX, positionY);
        }
    };
    p.bindAsset = function (body, assetName) {
        var offset = [];
        body.updateAABB();
        var bodyWidth = body.aabb.upperBound[0] - body.aabb.lowerBound[0];
        var bodyHeight = body.aabb.upperBound[1] - body.aabb.lowerBound[1];
        var asset = new egret.Bitmap();
        asset.texture = RES.getRes(assetName);
        asset.scaleX = bodyWidth / asset.width * this.factor;
        asset.scaleY = bodyHeight / asset.height * this.factor;
        this.addChild(asset);
        p2.vec2.subtract(offset, body.position, body.aabb.lowerBound);
        asset.anchorOffsetX = offset[0] / asset.scaleX * this.factor;
        asset.anchorOffsetY = offset[1] / asset.scaleY * this.factor;
        body.displays = [asset];
    };
    return TestAsset;
})(AbstractP2Test);
egret.registerClass(TestAsset,"TestAsset");
//# sourceMappingURL=TestAsset.js.map