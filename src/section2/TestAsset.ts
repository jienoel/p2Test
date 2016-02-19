
class TestAsset extends AbstractP2Test {
    private debugDraw: p2DebugDraw;
    private world: p2.World;

    public constructor() {
        super();
    }
    public onAppReady(): void {
        this.createWorld();
        this.createGround();
        this.createBodies();
        this.createDebug();

        this.stage.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.addOneBox, this);
    }
    private createWorld(): void {
        var wrd:p2.World = new p2.World();
        wrd.sleepMode = p2.World.BODY_SLEEPING;
        wrd.gravity = [0,10];
        this.world = wrd;
    }
    private createDebug(): void {
        var sprite: egret.Sprite = new egret.Sprite();
        this.addChild(sprite);
        this.debugDraw = new p2DebugDraw(this.world, sprite);
    }
    public loop(): void {
        var _this = this;
        this.world.step(1/60);
        this.world.bodies.forEach(function (b: p2.Body) {
            if (b.displays!= null && b.displays[0] != null) {
                b.displays[0].x = b.position[0] * _this.factor;
                b.displays[0].y = b.position[1] * _this.factor;
                b.displays[0].rotation = b.angle * 180 / Math.PI;
            }
        });
        this.debugDraw.drawDebug();
    }
    private createGround(): void {
        var stageHeight:number = egret.MainContext.instance.stage.stageHeight;
        var groundShape: p2.Plane = new p2.Plane();
        var groundBody: p2.Body = new p2.Body();
        groundBody.position[1] = 300/this.factor;
        groundBody.angle = Math.PI;
        groundBody.addShape(groundShape);

        this.world.addBody(groundBody);
    }
    private createBodies(): void {
        this.createBox(100, 200);
        this.createDesk(300, 100);
    }
    private createBox(x: number, y: number): void {
        x = x / this.factor;
        y = y / this.factor;
        var boxShape: p2.Box = new p2.Box({ width: 60/this.factor, height: 60/this.factor });
        var boxBody: p2.Body = new p2.Body({ mass: 1, position: [x, y] });
        boxBody.addShape(boxShape);
        this.world.addBody(boxBody);
        this.bindAsset(boxBody, "box");
    }
    private createDesk(x: number, y: number): void {
        var _this = this;
        x = x / this.factor;
        y = y / this.factor;

        var deskVertices: number[][] = new Array(
            [0, 0],
            [0, 16],
            [16, 16],
            [16, 46],
            [32, 46],
            [32, 16],
            [178, 16],
            [178, 46],
            [194, 46],
            [194, 16],
            [210, 16],
            [210, 0]
            );
        deskVertices.forEach(function (vertice: number[]) {
            vertice[0] = vertice[0] / _this.factor;
            vertice[1] = vertice[1] / _this.factor;
        });
        var deskBody: p2.Body = new p2.Body({ mass: 1, position: [x, y] });
        deskBody.fromPolygon(deskVertices);
        this.world.addBody(deskBody);
        this.bindAsset(deskBody, "desk");
    }
    
    private addOneBox(e: egret.TouchEvent): void {
        var positionX: number = Math.floor(e.stageX);
        var positionY: number = Math.floor(e.stageY);

        if (Math.random() < 0.5) {
            this.createBox(positionX, positionY);
        } else {
            this.createDesk(positionX, positionY);
        }
        
    }
    private bindAsset(body: p2.Body, assetName: string): void {
        var offset: number[] = [];
        body.updateAABB();
        var bodyWidth: number = body.aabb.upperBound[0] - body.aabb.lowerBound[0];
        var bodyHeight: number = body.aabb.upperBound[1] - body.aabb.lowerBound[1];

        var asset: egret.Bitmap = new egret.Bitmap();
        asset.texture = RES.getRes(assetName);
        asset.scaleX = bodyWidth / asset.width*this.factor;
        asset.scaleY = bodyHeight / asset.height*this.factor;
        this.addChild(asset);

        p2.vec2.subtract(offset, body.position, body.aabb.lowerBound);
        asset.anchorOffsetX = offset[0]/asset.scaleX*this.factor;
        asset.anchorOffsetY = offset[1] / asset.scaleY * this.factor;
        body.displays = [asset];
    }
}


