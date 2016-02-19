var DemoOneWayPlatfrom = (function (_super) {
    __extends(DemoOneWayPlatfrom, _super);
    function DemoOneWayPlatfrom() {
        _super.call(this);
        this.readyToJump = false;
        this.passThrough = false;
        this.speed = 0;
    }
    var d = __define,c=DemoOneWayPlatfrom;p=c.prototype;
    p.onAppReady = function () {
        this.createWorld();
        this.createGround();
        this.createDebug();
        this.createBodies();
        this.addEvents();
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
        this.character.velocity[0] = this.speed;
    };
    p.createBodies = function () {
        var cShape = new p2.Box({ width: 20 / this.factor, height: 60 / this.factor });
        var c = new p2.Body({ mass: 1, position: [100 / this.factor, 100 / this.factor] });
        c.addShape(cShape);
        c.fixedRotation = true;
        c.allowSleep = false;
        this.world.addBody(c);
        this.character = c;
        var pShape = new p2.Box({ width: 200 / this.factor, height: 20 / this.factor });
        var p = new p2.Body({ mass: 1, position: [275 / this.factor, 300 / this.factor] });
        p.type = p2.Body.STATIC;
        p.addShape(pShape);
        this.world.addBody(p);
        this.platform = p;
    };
    p.addEvents = function () {
        var _this = this;
        document.addEventListener("keydown", function (e) {
            if (e.keyCode == 37) {
                _this.speed = -5;
            }
            else if (e.keyCode == 39) {
                _this.speed = 5;
            }
            else if (e.keyCode == 38) {
                if (_this.readyToJump) {
                    _this.character.velocity[1] = -10;
                }
            }
        });
        document.addEventListener("keyup", function () {
            _this.speed = 0;
        });
        this.world.on("beginContact", function (evt) {
            _this.readyToJump = true;
            var otherBody = evt.bodyA === _this.character ? evt.bodyB : evt.bodyA;
            if (otherBody != _this.platform)
                return;
            if (otherBody.position[1] < _this.character.position[1]) {
                _this.passThrough = true;
            }
            else {
                _this.passThrough = false;
            }
        });
        this.world.on("endContact", function (evt) {
            _this.readyToJump = false;
        });
        this.world.on("preSolve", function (evt) {
            for (var i = 0; i < evt.contactEquations.length; i++) {
                var ce = evt.contactEquations[i];
                if (ce.bodyA === _this.character && ce.bodyB === _this.platform || ce.bodyA === _this.platform && ce.bodyB === _this.character) {
                    ce.enabled = !_this.passThrough;
                }
            }
            for (var i = 0; i < evt.frictionEquations.length; i++) {
                var fe = evt.frictionEquations[i];
                if (fe.bodyA === _this.character && fe.bodyB === _this.platform || fe.bodyA === _this.platform && fe.bodyB === _this.character) {
                    ce.enabled = !_this.passThrough;
                }
            }
        });
    };
    return DemoOneWayPlatfrom;
})(AbstractP2Test);
egret.registerClass(DemoOneWayPlatfrom,"DemoOneWayPlatfrom");
//# sourceMappingURL=DemoOneWayPlatfrom.js.map