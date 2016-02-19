var SimpleP2APP = (function (_super) {
    __extends(SimpleP2APP, _super);
    function SimpleP2APP() {
        _super.call(this);
        this.factor = 30;
        this.createP2App();
    }
    var d = __define,c=SimpleP2APP;p=c.prototype;
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
        //添加游戏帧频事件
        this.addEventListener(egret.Event.ENTER_FRAME, this.loop, this);
    };
    p.loop = function (e) {
        this.world.step(1 / 60);
    };
    return SimpleP2APP;
})(egret.DisplayObjectContainer);
egret.registerClass(SimpleP2APP,"SimpleP2APP");
//# sourceMappingURL=SimpleP2APP.js.map