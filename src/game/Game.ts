import * as Matter from 'matter-js';
import { Paddle } from './Paddle';

const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;
const Runner = Matter.Runner;

export class Game {
  private canvas: HTMLCanvasElement;
  private engine: Matter.Engine;
  private runner: Matter.Runner;
  private render: Matter.Render;
  private leftPaddle: Paddle;
  private rightPaddle: Paddle;
  private lastTime: number = 0;

  constructor(canvasId: string) {
    this.canvas = document.getElementById(canvasId) as HTMLCanvasElement;

    if (!this.canvas) {
      throw new Error(`Canvas with id ${canvasId} not found`);
    }

    // Create engine
    this.engine = Engine.create();

    // Create renderer
    this.render = Render.create({
      engine: this.engine,
      canvas: this.canvas,
      options: {
        width: this.canvas.width,
        height: this.canvas.height,
        wireframes: false,
        background: '#222',
      },
    });

    // Create runner
    this.runner = Runner.create();

    // Create paddles
    this.leftPaddle = new Paddle(
      this.engine.world,
      'left',
      this.canvas.width,
      this.canvas.height
    );
    this.rightPaddle = new Paddle(
      this.engine.world,
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
    World.add(this.engine.world, [topWall, bottomWall]);
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

      requestAnimationFrame(gameLoop);
    };

    // Initialize the game loop
    requestAnimationFrame((time) => {
      this.lastTime = time;
      requestAnimationFrame(gameLoop);
    });
  }

  public start(): void {
    // Run the renderer
    Render.run(this.render);
    // Run the engine
    Runner.run(this.runner, this.engine);
    console.log("Phycochet demo started!")
  }
}
