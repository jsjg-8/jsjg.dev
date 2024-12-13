<script lang="ts">
	import { getCanvasOptions } from './context';
	import Pixel from './pixel';
	import type { PixelData, CanvasOptions } from './types';

	export let colors: string = '#f8fafc,#f1f5f9,#cbd5e1';
	let canvas: HTMLCanvasElement;
	let ctx: CanvasRenderingContext2D;
	let pixels: Pixel[] = [];
	let animationFrame: number | undefined;
	let animationState: 'appear' | 'disappear' | undefined;

	// Get the writable store from context
	const canvasOptions: any= getCanvasOptions();

	const handleAnimation = (state: 'appear' | 'disappear' | undefined) => {
		animationState = state;
		if (state && pixels && pixels.length > 0) {
			pixels.forEach((pixel) => pixel.animate(state));
		}
	};

	const handleMouseEnter = () => handleAnimation('appear');
	const handleMouseLeave = () => handleAnimation('disappear');

	$: if ($canvasOptions && canvas && ctx) {
        const { gap, speed, reducedMotion } = $canvasOptions;
        pixels = [];
        createPixels(gap, speed, reducedMotion, colors);

        if (animationState) {
            startAnimation(); // Call startAnimation to begin/resume animation
        }
    }

	const createPixels = (gap: number, speed: number, reducedMotion: boolean, colors: string) => {
		if (!canvas || !ctx) return;

		const colorArray = colors.split(',');

		for (let x = 0; x < canvas.width; x += gap) {
			for (let y = 0; y < canvas.height; y += gap) {
				const color = colorArray[Math.floor(Math.random() * colorArray.length)];
				const delay = reducedMotion ? 0 : getDistanceToCanvasCenter(x, y);
				const pixelData: PixelData = { x, y, color, delay };
				pixels.push(new Pixel(canvas, ctx, pixelData, speed));
			}
		}
	};

	const getDistanceToCanvasCenter = (x: number, y: number): number => {
		const dx = x - canvas.width / 2;
		const dy = y - canvas.height / 2;
		return Math.sqrt(dx * dx + dy * dy);
	};

	const animate = () => {
        if (!ctx || !canvas) return;

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        pixels.forEach(pixel => pixel.animate(animationState)); // Pass animationState

        animationFrame = requestAnimationFrame(animate); // Schedule next frame
    };

    const startAnimation = () => {
        if (animationFrame) {
            cancelAnimationFrame(animationFrame);
        }
        animationFrame = requestAnimationFrame(animate); // Start a new animation loop
    };

	$: if (canvas && !ctx) {
        ctx = canvas.getContext('2d')!;
        if (ctx && $canvasOptions) {
            const { gap, speed, reducedMotion } = $canvasOptions;
            createPixels(gap, speed, reducedMotion, colors);
            if (animationState) {
                startAnimation(); // Start animation after context and canvas are ready
            }
        }
    }
</script>

<canvas
	bind:this={canvas}
	class="pixel-canvas"
	on:mouseenter={handleMouseEnter}
	on:mouseleave={handleMouseLeave}
></canvas>
<slot class="relative z-20 items-center justify-center hover:scale-110 transition-all duration-300 ease-in" />


<style>
	.pixel-canvas {
		width: 100%;
		height: 100%;
	}
</style>
