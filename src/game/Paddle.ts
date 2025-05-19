import * as Matter from 'matter-js';

type PaddleSide = 'left' | 'right';

export class Paddle {
    public body: Matter.Body;
    private side: PaddleSide;
    private speed: number = 10;
    private spinStrength: number = 0.2;
    private lastPosition: Matter.Vector = { x: 0, y: 0 };

    constructor(
        world: Matter.World,
        side: PaddleSide,
        canvasWidth: number,
        canvasHeight: number,
        width: number = 20,
        height: number = 100,
    ) {
        this.side = side;

        const x = side === 'left' ? width : canvasWidth - width;
        const y = canvasHeight / 2;

        this.body = Matter.Bodies.rectangle(
            x,
            y,
            width,
            height,
            {
                isStatic: true,
                restitution: 0.5,
                friction: 0.1,
                render: {
                    fillStyle: '#ed8d26',
                },
            }
        );

        this.lastPosition = { x: this.body.position.x, y: this.body.position.y };
        Matter.World.add(world, this.body);
    }
}
