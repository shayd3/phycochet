export class Game {
    private canvas: HTMLCanvasElement;
    private ctx: CanvasRenderingContext2D;

    constructor(canvasId: string) {
      this.canvas = document.getElementById(canvasId) as HTMLCanvasElement;

      if (!this.canvas) {
        throw new Error(`Canvas with id ${canvasId} not found`);
      }

      const context = this.canvas.getContext('2d');

      if (!context) {
        throw new Error('Could not get 2D context from canvas');
      }

      this.ctx = context;
    }

    public init(): void {
      this.drawHelloWorld();
    }

    private drawHelloWorld(): void {
      // Clear canvas
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

      // Set text properties
      this.ctx.fillStyle = 'white';
      this.ctx.font = '30px Arial';
      this.ctx.textAlign = 'center';

      // Draw text
      this.ctx.fillText(
        'Hello World! Physics Pong Coming Soon',
        this.canvas.width / 2,
        this.canvas.height / 2
      );
    }
  }
