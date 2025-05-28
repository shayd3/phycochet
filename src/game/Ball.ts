import * as Matter from 'matter-js';

export class Ball {
    public body: Matter.Body;
    private spinFactor: number = 0.05; // Spin factor to control spin effect

    constructor(
        world: Matter.World,
        x: number,
        y: number,
        radius: number = 10
    ) {
        this.body = Matter.Bodies.circle(x, y, radius, {
            restitution: 0.9, // Bounciness
            friction: 0.05, // Surface friction
            frictionAir: 0.001,
            density: 0.001, // Density for mass calculation
            render: {
                fillStyle: '#ffffff', // Ball color
            }
        });

        Matter.Composite.add(world, this.body);
    }

    public update(): void {
        // The ball's current velocity
        const velocity = this.body.velocity;

        // Spin is going to be calculated perpendicular to current
        // ball velocity.
        const spinEffect = {
            x: -velocity.y * this.spinFactor * this.body.angularVelocity,
            y: velocity.x * this.spinFactor * this.body.angularVelocity
        }

        Matter.Body.setVelocity(this.body, {
            x: velocity.x + spinEffect.x,
            y: velocity.y + spinEffect.y
        });
    }
}
