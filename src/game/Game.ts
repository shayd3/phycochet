import * as Matter from 'matter-js';

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

      // Set up the World
      this.setupWorld();

    }

    private setupWorld() {
      const world = this.engine.world;

      // Create a ground
      const groundX = this.canvas.width / 2;
      const groundY = this.canvas.height - 10;
      const groundWidth = this.canvas.width;
      const groundHeight = 40;
      const groundOptions = {
        isStatic: true,
        render: {
          fillStyle: '#2e8555',
        }
      }
      const ground = Bodies.rectangle( groundX, groundY, groundWidth, groundHeight, groundOptions);

      // Create walls
      const wallOptions = {
        isStatic: true,
        render: {
          fillStyle: '#2e8555'
        }
      }
      const wallY = this.canvas.height / 2;
      const wallWidth = 40
      const wallHeight = this.canvas.height;

      const leftWallX = 0;
      const rightWallX = this.canvas.width

      const leftWall = Bodies.rectangle(leftWallX, wallY, wallWidth, wallHeight, wallOptions);
      const rightWall = Bodies.rectangle(rightWallX, wallY, wallWidth, wallHeight, wallOptions);


      // Add bodies to the world
      World.add(world, [ground, leftWall, rightWall]);

    }

    public start(): void {
      // Run the renderer
      Render.run(this.render);
      // Run the engine
      Runner.run(this.runner, this.engine);
      console.log("Phycochet demo started!")
    }
  }
