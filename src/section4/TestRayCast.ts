class TestRayCast extends AbstractP2Test {
    private debugDraw: p2DebugDraw;
    private world: p2.World;

    private from: number[] = [100, 100];
    private to: number[] = [500, 300];
    private hitPoint: number[];
    private car: p2.Body;
    private speed: number = 5;
    
    public constructor() {
        super();
    }
    public onAppReady(): void {
        this.createWorld();
        this.createGround();
        this.createDebug();
        this.createBodies();
        this.createRaycast();
    }
    private createWorld(): void {
        var wrd: p2.World = new p2.World();
        wrd.gravity = [0,0];
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
        this.debugDraw = new p2DebugDraw(this.world, sprite);
    }
    
    public loop(): void {
        this.world.step(1/60);
        this.debugDraw.drawDebug();

        this.updateRay();
        this.debugDraw.drawSegment(this.from, this.to, 0xff0000);

        this.createRaycast();
        while (this.hitPoint) {
            this.carWander();
            this.updateRay();
            this.createRaycast();
        }
        if (Math.random() < 0.1) this.carWander();
        

        var v: number[] = this.car.velocity;
        p2.vec2.normalize(v, v);
        p2.vec2.scale(v,v,this.speed);

    }
    //add new function bleow here===========================
    private createRectangle(x: number, y: number, w: number, h: number): p2.Body {
        x = x / this.factor;
        y = y / this.factor;
        w = w / this.factor;
        h = h / this.factor;

        var shape: p2.Box = new p2.Box({ width: w, height: h });
        var body: p2.Body = new p2.Body({ mass: 1, position: [x, y] });
        body.addShape(shape);
        this.world.addBody(body);
        return body;
    }
    private createCircle(x: number, y: number, r: number): p2.Body {
        x = x / this.factor;
        y = y / this.factor;
        r = r / this.factor;
        var shape: p2.Circle = new p2.Circle({ radius: r });
        var body: p2.Body = new p2.Body({ mass: 1, position: [x, y] });
        body.addShape(shape);
        this.world.addBody(body);
        return body;
    }
    private createTriangle(x: number, y: number, w: number, h: number): p2.Body {
        x = x / this.factor;
        y = y / this.factor;
        w = w / this.factor;
        h = h / this.factor;
        var shape: p2.Convex = new p2.Convex({ vertices: [[-w / 2, h / 2], [0, -h], [w / 2, h / 2]] });
        var body: p2.Body = new p2.Body({ mass: 1, position: [x, y] });
        body.addShape(shape);
        this.world.addBody(body);
        return body;
    }
    private createBodies(): void {
        var b: p2.Body 
        this.createRectangle(50, 50, 100, 100).type = p2.Body.STATIC;
        this.createRectangle(500, 350, 100, 100).type = p2.Body.STATIC;
        this.createCircle(275, 200, 50).type = p2.Body.STATIC;
        b = this.createRectangle(150, 300, 60, 80);
        b.angle = Math.PI / 6;
        b.type = p2.Body.STATIC;

        b = this.createRectangle(400, 100, 50,50);
        b.angle = -Math.PI / 6;
        b.type = p2.Body.STATIC;

        this.car = this.createTriangle(200, 100, 20, 20);
        this.car.velocity = [0, -1];
        this.car.collisionResponse = false;
    }
    private carWander(): void {
        var angle: number = Math.PI / 9 * (Math.random() - 0.5);
        this.car.angle += angle;
        p2.vec2.rotate(this.car.velocity, this.car.velocity, angle);
    }

    private updateRay(): void {
        this.from = this.car.position;
        this.car.toWorldFrame(this.to, [0, -100/this.factor]);
    }
    private createRaycast(): void {
        var _this = this;
        var result: p2.RaycastResult = new p2.RaycastResult();
        var ray: p2.Ray = new p2.Ray({
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
        } else {
            this.hitPoint = null;
        }
    }
}