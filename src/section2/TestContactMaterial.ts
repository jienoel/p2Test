class TestContactMaterial extends AbstractP2Test {
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
        groundBody.addShape(groundShape, [0, 20/this.factor]);
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
        var materialA = new p2.Material(1000);
        var materialB = new p2.Material(1001);
        
        //创建斜坡刚体slopeBody
        var slopeShape: p2.Plane = new p2.Plane();
        slopeShape.material = materialA;
        var slopeBody: p2.Body = new p2.Body({ mass: 0, position: [274 / this.factor, 350 / this.factor] });
        slopeBody.addShape(slopeShape);
        slopeBody.angle = Math.PI * 11 / 10;
        this.world.addBody(slopeBody);

        //创建刚体body
        var shape: p2.Box = new p2.Box({ width: 50 / this.factor, height: 30 / this.factor });
        shape.material = materialB;
        var body: p2.Body = new p2.Body({ mass: 3, position: [100 / this.factor, 100 / this.factor] });
        body.addShape(shape);
        this.world.addBody(body);

        var contactMaterial: p2.ContactMaterial = new p2.ContactMaterial(materialA, materialB);
        contactMaterial.restitution = 1;
        this.world.addContactMaterial(contactMaterial);
    }
}


