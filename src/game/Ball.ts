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

    // Reset to center of the canvas with random velocity
    public reset(canvasWidth: number, canvasHeight: number): void {
        const centerX = canvasWidth / 2;
        const centerY = canvasHeight / 2;

        // Reset position
        Matter.Body.setPosition(this.body, { x: centerX, y: centerY });

        // Reset rotation and angular velocity
        Matter.Body.setAngle(this.body, 0);
        Matter.Body.setAngularVelocity(this.body, 0);

        // Randomize initial velocity
        const speed = 10;
        const angle = Math.random() * Math.PI / 4 - Math.PI / 8; // Random angle between -22.5 and 22.5 degrees
        const direction = Math.random() > 0.5 ? 1 : -1; // Random left or right

        Matter.Body.setVelocity(this.body, {
            x: Math.cos(angle) * speed * direction,
            y: Math.sin(angle) * speed
        });
    }
}
