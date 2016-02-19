var TestContactMaterial = (function (_super) {
    __extends(TestContactMaterial, _super);
    function TestContactMaterial() {
        _super.call(this);
    }
    var d = __define,c=TestContactMaterial;p=c.prototype;
    p.onAppReady = function () {
        this.createWorld();
        this.createGround();
        this.createDebug();
        this.createBody();
        _super.prototype.enableMouseDrag.call(this, this.world);
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
        var materialA = new p2.Material(1000);
        var materialB = new p2.Material(1001);
        //创建斜坡刚体slopeBody
        var slopeShape = new p2.Plane();
        slopeShape.material = materialA;
        var slopeBody = new p2.Body({ mass: 0, position: [274 / this.factor, 350 / this.factor] });
        slopeBody.addShape(slopeShape);
        slopeBody.angle = Math.PI * 11 / 10;
        this.world.addBody(slopeBody);
        //创建刚体body
        var shape = new p2.Box({ width: 50 / this.factor, height: 30 / this.factor });
        shape.material = materialB;
        var body = new p2.Body({ mass: 3, position: [100 / this.factor, 100 / this.factor] });
        body.addShape(shape);
        this.world.addBody(body);
        var contactMaterial = new p2.ContactMaterial(materialA, materialB);
        contactMaterial.restitution = 1;
        this.world.addContactMaterial(contactMaterial);
    };
    return TestContactMaterial;
})(AbstractP2Test);
egret.registerClass(TestContactMaterial,"TestContactMaterial");
//# sourceMappingURL=TestContactMaterial.js.map