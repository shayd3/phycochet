import * as Matter from 'matter-js';
import { Paddle } from './Paddle';
import { PhysicsEngine } from './PhysicsEngine';
import { Ball } from './Ball';

const Bodies = Matter.Bodies;

export class Game {
  private canvas: HTMLCanvasElement;
  private physics: PhysicsEngine;
  private ball: Ball;
  private leftPaddle: Paddle;
  private rightPaddle: Paddle;
  private lastTime: number = 0;

  constructor(canvasId: string) {
    this.canvas = document.getElementById(canvasId) as HTMLCanvasElement;

    if (!this.canvas) {
      throw new Error(`Canvas with id ${canvasId} not found`);
    }

    this.physics = new PhysicsEngine(this.canvas);

    // Create Ball
    this.ball = new Ball(
      this.physics.world,
      this.canvas.width / 2,
      this.canvas.height / 2
    )

    // Create paddles
    this.leftPaddle = new Paddle(
      this.physics.world,
      'left',
      this.canvas.width,
      this.canvas.height
    );
    this.rightPaddle = new Paddle(
      this.physics.world,
      'right',
      this.canvas.width,
      this.canvas.height);


    this.createWalls();
    this.setupMouseInput();
    this.setupGameLoop();
  }


  private createWalls(): void {

    const topWall = Bodies.rectangle(
      this.canvas.width / 2,
      0,
      this.canvas.width,
      10,
      { isStatic: true, render: { fillStyle: '#949494' } }
    )

    const bottomWall = Bodies.rectangle(
      this.canvas.width / 2,
      this.canvas.height,
      this.canvas.width,
      10,
      { isStatic: true, render: { fillStyle: '#949494' } }
    )

    // Add to world
    Matter.Composite.add(this.physics.world, [topWall, bottomWall]);
  }

  private setupMouseInput(): void {
    this.canvas.addEventListener('mousemove', (event) => {
      const rect = this.canvas.getBoundingClientRect();
      const mouseY = event.clientY - rect.top;

      // Set target Y for left paddle
      this.leftPaddle.setTargetY(mouseY);
    });
  }

  private setupGameLoop(): void {
    const gameLoop = (currentTime: number) => {
      const deltaTime = (currentTime - this.lastTime) / 1000; // Convert to seconds
      this.lastTime = currentTime;

      // Update paddles
      this.leftPaddle.update(deltaTime);
      this.rightPaddle.update(deltaTime);

      this.ball.update();

      requestAnimationFrame(gameLoop);
    };

    // Initialize the game loop
    requestAnimationFrame((time) => {
      this.lastTime = time;
      requestAnimationFrame(gameLoop);
    });
  }

  public start(): void {
    this.physics.start();

    this.ball.reset(this.canvas.width, this.canvas.height);
    console.log("Phycochet demo started!")
  }
}
