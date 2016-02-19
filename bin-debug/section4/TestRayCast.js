var TestRayCast = (function (_super) {
    __extends(TestRayCast, _super);
    function TestRayCast() {
        _super.call(this);
        this.from = [100, 100];
        this.to = [500, 300];
        this.speed = 5;
    }
    var d = __define,c=TestRayCast;p=c.prototype;
    p.onAppReady = function () {
        this.createWorld();
        this.createGround();
        this.createDebug();
        this.createBodies();
        this.createRaycast();
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
        this.updateRay();
        this.debugDraw.drawSegment(this.from, this.to, 0xff0000);
        this.createRaycast();
        while (this.hitPoint) {
            this.carWander();
            this.updateRay();
            this.createRaycast();
        }
        if (Math.random() < 0.1)
            this.carWander();
        var v = this.car.velocity;
        p2.vec2.normalize(v, v);
        p2.vec2.scale(v, v, this.speed);
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
    p.createCircle = function (x, y, r) {
        x = x / this.factor;
        y = y / this.factor;
        r = r / this.factor;
        var shape = new p2.Circle({ radius: r });
        var body = new p2.Body({ mass: 1, position: [x, y] });
        body.addShape(shape);
        this.world.addBody(body);
        return body;
    };
    p.createTriangle = function (x, y, w, h) {
        x = x / this.factor;
        y = y / this.factor;
        w = w / this.factor;
        h = h / this.factor;
        var shape = new p2.Convex({ vertices: [[-w / 2, h / 2], [0, -h], [w / 2, h / 2]] });
        var body = new p2.Body({ mass: 1, position: [x, y] });
        body.addShape(shape);
        this.world.addBody(body);
        return body;
    };
    p.createBodies = function () {
        var b;
        this.createRectangle(50, 50, 100, 100).type = p2.Body.STATIC;
        this.createRectangle(500, 350, 100, 100).type = p2.Body.STATIC;
        this.createCircle(275, 200, 50).type = p2.Body.STATIC;
        b = this.createRectangle(150, 300, 60, 80);
        b.angle = Math.PI / 6;
        b.type = p2.Body.STATIC;
        b = this.createRectangle(400, 100, 50, 50);
        b.angle = -Math.PI / 6;
        b.type = p2.Body.STATIC;
        this.car = this.createTriangle(200, 100, 20, 20);
        this.car.velocity = [0, -1];
        this.car.collisionResponse = false;
    };
    p.carWander = function () {
        var angle = Math.PI / 9 * (Math.random() - 0.5);
        this.car.angle += angle;
        p2.vec2.rotate(this.car.velocity, this.car.velocity, angle);
    };
    p.updateRay = function () {
        this.from = this.car.position;
        this.car.toWorldFrame(this.to, [0, -100 / this.factor]);
    };
    p.createRaycast = function () {
        var _this = this;
        var result = new p2.RaycastResult();
        var ray = new p2.Ray({
            skipBackfaces: false,
            checkCollisionResponse: true,
            from: _this.from,
            to: _this.to,
            mode: p2.Ray.ALL
        });
        this.world.raycast(result, ray);
        if (result.hasHit()) {
            this.hitPoint = [];
            result.getHitPoint(this.hitPoint, ray);
        }
        else {
            this.hitPoint = null;
        }
    };
    return TestRayCast;
})(AbstractP2Test);
egret.registerClass(TestRayCast,"TestRayCast");
//# sourceMappingURL=TestRayCast.js.map