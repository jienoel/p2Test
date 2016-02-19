class TestShape extends AbstractP2Test {
    private debugDraw: p2DebugDraw;
    private world: p2.World;
    private bodyRef: p2.Body;

    public constructor() {
        super();
    }
    public onAppReady(): void {
        this.createWorld();
        this.createGround();
        this.createDebug();
        this.createBody();

        super.enableMouseDrag(this.world);

        this.stage.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onClick,this);
    }

    private createWorld(): void {
        var wrd:p2.World = new p2.World();
        wrd.sleepMode = p2.World.NO_SLEEPING;
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
    }

    private createBody(): void {
        //创建Line形状刚体
        var lineShape: p2.Line = new p2.Line({ length: 200 / this.factor});
        var lineBody: p2.Body = new p2.Body({ position: [421.5 / this.factor, 200 / this.factor] });
        lineBody.addShape(lineShape);
        this.world.addBody(lineBody);


        //创建Particle形状刚体
        var particleShape1: p2.Particle = new p2.Particle();
        var particleBody1: p2.Body = new p2.Body({ position: [130 / this.factor, 200 / this.factor]});
        particleBody1.addShape(particleShape1);
        this.world.addBody(particleBody1);

        var particleShape2: p2.Particle = new p2.Particle();
        var particleBody2: p2.Body = new p2.Body({ position: [180 / this.factor, 200 / this.factor] });
        particleBody2.addShape(particleShape2);
        this.world.addBody(particleBody2);

        //创建Box形状刚体
        var boxShape: p2.Box = new p2.Box({ width: 80 / this.factor, height: 40 / this.factor });
        var boxBody: p2.Body = new p2.Body({ mass: 1, position: [160 / this.factor, 100 / this.factor] });
        boxBody.addShape(boxShape);
        this.world.addBody(boxBody);

        //创建Circle形状刚体
        var circleShape: p2.Circle = new p2.Circle({ radius: 40 / this.factor });
        var circleBody: p2.Body = new p2.Body({ mass: 1, position: [400 / this.factor, 100 / this.factor] });
        circleBody.addShape(circleShape);
        this.world.addBody(circleBody);
    }

    private onClick(te: egret.TouchEvent):void {
        var x: number = te.stageX / this.factor;
        var y: number = te.stageY / this.factor;
        if(this.world.hitTest([x, y], this.world.bodies,1).length>0) return;

        //创建随机的形状刚体
        var shape: p2.Shape;
        var random: number = Math.random();
        if (random < 0.25) {
            shape = new p2.Circle({ radius: 30 / this.factor });
        } else if (random < 0.5) {
            shape = new p2.Box({ width: 80 / this.factor, height: 30 / this.factor });
        } else if (random < 0.75) {
            shape = new p2.Capsule({ length: 80 / this.factor, radius: 20 / this.factor });
        } else {
            shape = new p2.Line({ length: 80 / this.factor });
        }
        var body: p2.Body = new p2.Body({ mass: 1, position: [x , y ] });
        body.addShape(shape);
        this.world.addBody(body);
    }
}