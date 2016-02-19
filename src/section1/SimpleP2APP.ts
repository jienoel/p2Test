class SimpleP2APP extends egret.DisplayObjectContainer {
    public constructor() {
        super();
        this.createP2App();
    }
    private world: p2.World;
    private factor:number =30;

    public createP2App(): void {
        //创建p2物理世界world
        this.world = new p2.World();
        var world = this.world;
        world.gravity = [0, 10];

        //创建矩形形状shape
        var shape: p2.Box = new p2.Box({ width: 100/this.factor, height: 50/this.factor});
        
        //创建刚体body
        var body: p2.Body = new p2.Body({ mass: 1});
        body.position = [275/this.factor, 100/this.factor];
        body.addShape(shape);
        world.addBody(body);

        //添加游戏帧频事件
        this.addEventListener(egret.Event.ENTER_FRAME, this.loop, this);
    }
    private loop(e:egret.Event): void {
        this.world.step(1/60);
    }
}