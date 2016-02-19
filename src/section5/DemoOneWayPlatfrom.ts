class DemoOneWayPlatfrom extends AbstractP2Test {
    private debugDraw: p2DebugDraw;
    private world: p2.World;

    private character: p2.Body;
    private platform: p2.Body;
    private readyToJump: boolean = false;
    private passThrough: boolean = false;
    private speed:number=0;

    public constructor() {
        super();
    }
    public onAppReady(): void {
        this.createWorld();
        this.createGround();
        this.createDebug();
        this.createBodies();

        this.addEvents();
    }
    private createWorld(): void {
        var wrd:p2.World = new p2.World();
        wrd.sleepMode = p2.World.BODY_SLEEPING;
        wrd.gravity = [0,10];
        this.world = wrd;
    }
    private createGround(): void {
        var groundShape: p2.Plane = new p2.Plane();
        var groundBody: p2.Body = new p2.Body();
        groundBody.addShape(groundShape, [0, 20 / this.factor]);
        groundShape = new p2.Plane();
        groundBody.addShape(groundShape, [0, 380 / this.factor], Math.PI);

        groundShape = new p2.Plane();
        groundBody.addShape(groundShape, [530 / this.factor, 0], Math.PI / 2);

        groundShape = new p2.Plane();
        groundBody.addShape(groundShape, [20 / this.factor, 380 / this.factor], -Math.PI / 2);
        groundBody.type = p2.Body.STATIC;
        this.world.addBody(groundBody);
    }
    private createDebug(): void {
        var sprite: egret.Sprite = new egret.Sprite();
        this.addChild(sprite);
        this.debugDraw = new p2DebugDraw(this.world,sprite);
    }
    
    public loop(): void {
        this.world.step(1/60);
        this.debugDraw.drawDebug();
        this.character.velocity[0] = this.speed;
    }
    public createBodies(): void {
        var cShape: p2.Box = new p2.Box({ width: 20 / this.factor, height: 60 / this.factor });
        var c: p2.Body = new p2.Body({ mass: 1, position: [100 / this.factor, 100 / this.factor] });
        c.addShape(cShape);
        c.fixedRotation = true;
        c.allowSleep = false;
        this.world.addBody(c);
        this.character = c;

        var pShape: p2.Box = new p2.Box({ width: 200 / this.factor, height: 20 / this.factor });
        var p: p2.Body = new p2.Body({ mass: 1, position: [275 / this.factor, 300 / this.factor] });
        p.type = p2.Body.STATIC;
        p.addShape(pShape);
        this.world.addBody(p);
        this.platform = p;
    }
    public addEvents(): void {
        var _this = this;
        document.addEventListener("keydown", function (e) {
            if (e.keyCode == 37) { //left
                _this.speed = -5;
            } else if (e.keyCode == 39) {
                _this.speed = 5;
            } else if (e.keyCode == 38) {
                if (_this.readyToJump) {
                    _this.character.velocity[1] = -10;
                }
            }
        });
        document.addEventListener("keyup", function () {
            _this.speed= 0;
        });

        this.world.on("beginContact", function (evt): void {
            _this.readyToJump = true;
            
            var otherBody = evt.bodyA === _this.character ? evt.bodyB : evt.bodyA;
            if (otherBody != _this.platform) return;

            if (otherBody.position[1] < _this.character.position[1]) {
                _this.passThrough = true;
            } else {
                _this.passThrough = false;
            }
        });
        this.world.on("endContact", function (evt): void {
            _this.readyToJump = false;
        });
        this.world.on("preSolve", function (evt): void {
            for (var i: number = 0; i < evt.contactEquations.length; i++) {
                var ce: p2.ContactEquation = evt.contactEquations[i];
                if (ce.bodyA === _this.character && ce.bodyB === _this.platform || ce.bodyA === _this.platform && ce.bodyB === _this.character) {
                    ce.enabled = !_this.passThrough;
                }
            }
            for (var i: number = 0; i < evt.frictionEquations.length; i++) {
                var fe: p2.FrictionEquation = evt.frictionEquations[i];
                if (fe.bodyA === _this.character && fe.bodyB === _this.platform || fe.bodyA === _this.platform && fe.bodyB === _this.character) {
                    ce.enabled = !_this.passThrough;
                }                
            }
        });
    }
}


