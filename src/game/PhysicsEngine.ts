import * as Matter from 'matter-js';

export class PhysicsEngine {
    public engine: Matter.Engine;
    public world: Matter.World;
    public render: Matter.Render;

    constructor(canvasId: string) {
        this.engine = Matter.Engine.create({
            positionIterations: 10,
            velocityIterations: 10,
            gravity: {
                y: 0, // Disable gravity
            }
        });

        this.world = this.engine.world;

        const canvas = document.getElementById(canvasId) as HTMLCanvasElement;
        if (!canvas) {
            throw new Error(`Canvas with id ${canvas} not found`);
        }

        this.render = Matter.Render.create({
            canvas: canvas,
            engine: this.engine,
            options: {
                width: canvas.width,
                height: canvas.height,
                wireframes: false,
                background: '#000000'
            }
        })
    }

    public start(): void {
        Matter.Render.run(this.render);
        const runner = Matter.Runner.create();
        Matter.Runner.run(runner, this.engine);
    }

    public stop(): void {
        Matter.Render.stop(this.render);
        Matter.Engine.clear(this.engine);
    }

    public applySpinToBall(ball: Matter.Body, spinForce: number): void {
        Matter.Body.setAngularVelocity(ball, spinForce);
    }
}
