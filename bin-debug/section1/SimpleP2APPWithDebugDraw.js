var SimpleP2APPWithDebugDraw = (function (_super) {
    __extends(SimpleP2APPWithDebugDraw, _super);
    function SimpleP2APPWithDebugDraw() {
        _super.call(this);
        this.factor = 30;
        this.createP2App();
    }
    var d = __define,c=SimpleP2APPWithDebugDraw;p=c.prototype;
    p.createP2App = function () {
        //创建p2物理世界world
        this.world = new p2.World();
        var world = this.world;
        world.gravity = [0, 10];
        //创建矩形形状shape
        var shape = new p2.Box({ width: 100 / this.factor, height: 50 / this.factor });
        //创建刚体body
        var body = new p2.Body({ mass: 1 });
        body.position = [275 / this.factor, 100 / this.factor];
        body.addShape(shape);
        world.addBody(body);
        //添加p2调试试图
        var sprite = new egret.Sprite();
        this.addChild(sprite);
        this.debugDraw = new p2DebugDraw(world, sprite);
        //添加游戏帧频事件
        this.addEventListener(egret.Event.ENTER_FRAME, this.loop, this);
    };
    p.loop = function (e) {
        this.world.step(1 / 60);
        this.debugDraw.drawDebug();
    };
    return SimpleP2APPWithDebugDraw;
})(egret.DisplayObjectContainer);
egret.registerClass(SimpleP2APPWithDebugDraw,"SimpleP2APPWithDebugDraw");
//# sourceMappingURL=SimpleP2APPWithDebugDraw.js.map