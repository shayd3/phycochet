import * as Matter from 'matter-js';

export type PaddleSide = 'left' | 'right';

export class Paddle {
    public body: Matter.Body;
    private side: PaddleSide;
    private speed: number = 600;
    private canvasWidth: number;
    private canvasHeight: number;
    private height: number;
    private width: number
    private targetY: number = 0;

    constructor(
        world: Matter.World,
        side: PaddleSide,
        canvasWidth: number,
        canvasHeight: number,
        width: number = 20,
        height: number = 100,
    ) {
        this.side = side;
        this.canvasWidth = canvasWidth;
        this.canvasHeight = canvasHeight;
        this.width = width;
        this.height = height;

        const x = this.side === 'left' ? this.width : this.canvasWidth - this.width;
        const y = this.canvasHeight / 2;

        this.body = Matter.Bodies.rectangle(
            x,
            y,
            this.width,
            this.height,
            {
                isStatic: true,
                restitution: 0.5,
                friction: 0.1,
                render: {
                    fillStyle: '#ed8d26',
                },
            }
        );

        this.targetY = y;

        Matter.World.add(world, this.body);
    }

    public setTargetY(y: number): void {
        // Only allow left paddle to move
        if (this.side === 'left') {
            // Clamp to canvas bounds
            const halfHeight = this.height / 2;
            this.targetY = Math.max(halfHeight, Math.min(y, this.canvasHeight - halfHeight));
        }
    }

    public update(deltaTime: number): void {
        // Only update left paddle
        if (this.side === 'left') {
            const currentY = this.body.position.y;
            const diff = this.targetY - currentY;


            if (Math.abs(diff) > 1) {
                const moveDistance = this.speed * deltaTime * Math.sign(diff);
                // Use setPosition for static bodies
                Matter.Body.setPosition(this.body, {
                    x: this.body.position.x,
                    y: currentY + moveDistance
                });
            }
        }
    }

}
