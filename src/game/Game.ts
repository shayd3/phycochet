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

      this.addRandomShapes();

      this.canvas.addEventListener('click', (event) => {
        const rect = this.canvas.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        this.addShapeAt(x, y);
      });

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
