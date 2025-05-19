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
    }


    private createWalls(): void {

      const topWall = Bodies.rectangle(
        this.canvas.width / 2,
        0,
        this.canvas.width,
        10,
        { isStatic: true, render: { fillStyle: '#949494'}}
      )

      const bottomWall = Bodies.rectangle(
        this.canvas.width / 2,
        this.canvas.height,
        this.canvas.width,
        10,
        { isStatic: true, render: { fillStyle: '#949494'}}
      )

      // Add to world
      World.add(this.engine.world, [topWall, bottomWall]);
    }

    private addShapeAt(x: number, y: number): void {

      const randomColors = ['#f28c28', '#28f2c8', '#f228f2', '#28f228', '#2828f2'];
      const randomColor = randomColors[Math.floor(Math.random() * randomColors.length)];

      const shapeOptions = {
        render: {
          fillStyle: randomColor,
        }
      };
      const shape = Bodies.circle(x, y, 20, shapeOptions);

      // Add some initial velocity
      Body.setVelocity(shape, {
        x: (Math.random() - 0.5) * 5,
        y: (Math.random() - 0.5) * 5,
      });

      Body.setAngularVelocity(shape, (Math.random() - 0.5) * 0.2);

      World.add(this.engine.world, shape);
    }

    private addRandomShapes(): void {
      const numShapes = 10;
      for (let i = 0; i < numShapes; i++) {
        const x = Math.random() * this.canvas.width;
        const y = Math.random() * (this.canvas.height - 100) + 50; // Avoid the ground
        this.addShapeAt(x, y);
      }
    }

    public start(): void {
      // Run the renderer
      Render.run(this.render);
      // Run the engine
      Runner.run(this.runner, this.engine);
      console.log("Phycochet demo started!")
    }
  }
