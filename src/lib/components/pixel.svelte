<script lang="ts">
	class Pixel {
		width: number;
		height: number;
		ctx: CanvasRenderingContext2D;
		x: number;
		y: number;
		color: string;
		speed: number;
		size: number;
		sizeStep: number;
		minSize: number;
		maxSizeInteger: number = 2;
		maxSize: number;
		delay: number;
		counter: number = 0;
		counterStep: number;
		isIdle: boolean = false;
		isReverse: boolean = false;
		isShimmer: boolean = false;

		constructor(
			canvas: HTMLCanvasElement,
			context: CanvasRenderingContext2D,
			x: number,
			y: number,
			color: string,
			speed: number,
			delay: number
		) {
			this.width = canvas.width;
			this.height = canvas.height;
			this.ctx = context;
			this.x = x;
			this.y = y;
			this.color = color;
			this.speed = this.getRandomValue(0.1, 0.9) * speed;
			this.size = 0;
			this.sizeStep = Math.random() * 0.4;
			this.minSize = 0.5;
			this.maxSize = this.getRandomValue(this.minSize, this.maxSizeInteger);
			this.delay = delay;
			this.counterStep = Math.random() * 4 + (this.width + this.height) * 0.01;
		}

		private getRandomValue(min: number, max: number): number {
			return Math.random() * (max - min) + min;
		}

		draw(): void {
			const centerOffset = this.maxSizeInteger * 0.5 - this.size * 0.5;
			this.ctx.fillStyle = this.color;
			this.ctx.fillRect(this.x + centerOffset, this.y + centerOffset, this.size, this.size);
		}

		appear(): void {
			this.isIdle = false;

			if (this.counter <= this.delay) {
				this.counter += this.counterStep;
				return;
			}

			if (this.size >= this.maxSize) {
				this.isShimmer = true;
			}

			if (this.isShimmer) {
				this.shimmer();
			} else {
				this.size += this.sizeStep;
			}

			this.draw();
		}

		disappear(): void {
			this.isShimmer = false;
			this.counter = 0;

			if (this.size <= 0) {
				this.isIdle = true;
				return;
			} else {
				this.size -= 0.1;
			}

			this.draw();
		}

		shimmer(): void {
			if (this.size >= this.maxSize) {
				this.isReverse = true;
			} else if (this.size <= this.minSize) {
				this.isReverse = false;
			}

			this.size += (this.isReverse ? -1 : 1) * this.speed;
		}
	}

	class PixelCanvas extends HTMLElement {
		static readonly defaultColors = ['#f8fafc', '#f1f5f9', '#cbd5e1'];
		static readonly css = `:host {display: grid;inline-size: 100%;block-size: 100%;overflow: hidden;}`;
		private _parent: HTMLElement | null = null;
		shadowroot: ShadowRoot | null = null;
		canvas: HTMLCanvasElement | null = null;
		ctx: CanvasRenderingContext2D | null = null;
		pixels: Pixel[] = [];
		animation: number | undefined;
		timeInterval: number = 1000 / 60;
		timePrevious: number = 0;
		reducedMotion: boolean;
		resizeObserver: ResizeObserver;

		static register(tag = 'pixel-canvas'): void {
			if ('customElements' in window) {
				customElements.define(tag, this);
			}
		}

		get colors(): string[] {
			return (this.dataset.colors?.split(',') || PixelCanvas.defaultColors) as string[];
		}

		get gap(): number {
			const value = parseInt(this.dataset.gap || '5');
			return Math.min(Math.max(value, 4), 50);
		}

		get speed(): number {
			const value = parseInt(this.dataset.speed || '35');
			const throttle = 0.001;
			return (this.reducedMotion ? 0 : Math.min(value, 100)) * throttle;
		}

		get noFocus(): boolean {
			return this.hasAttribute('data-no-focus');
		}

		connectedCallback(): void {
			const canvas = document.createElement('canvas');
			const sheet = new CSSStyleSheet();
			this._parent = this.parentNode as HTMLElement;
			this.shadowroot = this.attachShadow({ mode: 'open' });

			sheet.replaceSync(PixelCanvas.css);
			this.shadowroot.adoptedStyleSheets = [sheet];
			this.shadowroot.append(canvas);

			this.canvas = this.shadowroot.querySelector('canvas')!;
			this.ctx = this.canvas.getContext('2d')!;

			this.timePrevious = performance.now();
			this.reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

			this.init();

			this.resizeObserver = new ResizeObserver(() => this.init());
			this.resizeObserver.observe(this);

			this._parent.addEventListener('mouseenter', this);
			this._parent.addEventListener('mouseleave', this);

			if (!this.noFocus) {
				this._parent.addEventListener('focusin', this);
				this._parent.addEventListener('focusout', this);
			}
		}

		disconnectedCallback(): void {
			this.resizeObserver.disconnect();

			if (this._parent) {
				this._parent.removeEventListener('mouseenter', this);
				this._parent.removeEventListener('mouseleave', this);

				if (!this.noFocus) {
					this._parent.removeEventListener('focusin', this);
					this._parent.removeEventListener('focusout', this);
				}
			}
			this._parent = null; // avoid memory leaks
			this.shadowroot = null;
			this.canvas = null;
			this.ctx = null;
		}

		handleEvent(event: Event): void {
			const handlerName = `on${event.type}` as keyof this;
			if (handlerName in this && typeof this[handlerName] === 'function') {
				(this[handlerName] as any)(event);
			}
		}

		onmouseenter(): void {
			this.handleAnimation('appear');
		}
		onmouseleave(): void {
			this.handleAnimation('disappear');
		}
		onfocusin(e: FocusEvent): void {
			if (e.currentTarget!.contains(e.relatedTarget)) return;
			this.handleAnimation('appear');
		}
		onfocusout(e: FocusEvent): void {
			if (e.currentTarget!.contains(e.relatedTarget)) return;
			this.handleAnimation('disappear');
		}

		handleAnimation(name: 'appear' | 'disappear'): void {
			cancelAnimationFrame(this.animation!);
			this.animation = this.animate(name);
		}

		init(): void {
			const rect = this.getBoundingClientRect();
			const width = Math.floor(rect.width);
			const height = Math.floor(rect.height);

			this.pixels = [];
			if (this.canvas) {
				this.canvas.width = width;
				this.canvas.height = height;
				this.canvas.style.width = `${width}px`;
				this.canvas.style.height = `${height}px`;
			}
			this.createPixels();
		}

		private getDistanceToCanvasCenter(x: number, y: number): number {
			if (!this.canvas) return 0; // Handle case where canvas is null
			const dx = x - this.canvas.width / 2;
			const dy = y - this.canvas.height / 2;
			return Math.sqrt(dx * dx + dy * dy);
		}

		createPixels(): void {
			if (!this.canvas || !this.ctx) return; // Guard against null values

			for (let x = 0; x < this.canvas.width; x += this.gap) {
				for (let y = 0; y < this.canvas.height; y += this.gap) {
					const color = this.colors[Math.floor(Math.random() * this.colors.length)];
					const delay = this.reducedMotion ? 0 : this.getDistanceToCanvasCenter(x, y);
					this.pixels.push(new Pixel(this.canvas, this.ctx, x, y, color, this.speed, delay));
				}
			}
		}

		animate(fnName: 'appear' | 'disappear'): number {
			this.animation = requestAnimationFrame(() => this.animate(fnName));

			const timeNow = performance.now();
			const timePassed = timeNow - this.timePrevious;

			if (timePassed < this.timeInterval) return this.animation!;

			this.timePrevious = timeNow - (timePassed % this.timeInterval);

			if (this.ctx && this.canvas) {
				this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
				for (const pixel of this.pixels) {
					pixel[fnName]();
				}
			}

			if (this.pixels.every((pixel) => pixel.isIdle)) {
				cancelAnimationFrame(this.animation!);
			}
			return this.animation!;
		}
	}

	PixelCanvas.register();
</script>



<main>
    <div class="card">
        <pixel-canvas></pixel-canvas>
        <slot class="obj"/>
        <button>Layout</button>
    </div>
</main>

<style>
	:root {
		--space: 1rem;
		--bg: #09090b;
		--fg: #e3e3e3;
		--surface-1: #101012;
		--surface-2: #27272a;
		--surface-3: #52525b;
		--ease-out: cubic-bezier(0.5, 1, 0.89, 1);
		--ease-in-out: cubic-bezier(0.45, 0, 0.55, 1);
	}

	* {
		box-sizing: border-box;
	}

	:global(html),
	:global(body) {
		/* Use :global() to target the HTML and body tags */
		height: 100%;
	}

	:global(body) {
		/* Use :global() to target the body tag */
		display: grid;
		color: var(--fg);
		background: var(--bg);
		padding: var(--space);
		min-height: 100vh;
	}

	main {
		/* This now styles the <main> tag within the component */
		display: grid;
		grid-template-columns: repeat(var(--count, 1), 1fr);
		gap: var(--space);
		margin: auto;
		inline-size: min(var(--max, 15rem), 100%);
	}

	@media (min-width: 25rem) {
		main {
			--count: 2;
			--max: 30rem;
		}
	}

	@media (min-width: 45rem) {
		main {
			--count: 4;
			--max: 60rem;
		}
	}

	.card {
		position: relative;
		overflow: hidden;
		display: grid;
		grid-template-areas: 'card';
		place-items: center;
		aspect-ratio: 4 / 5;
		border: 1px solid var(--surface-2);
		isolation: isolate;
		transition: border-color 200ms var(--ease-out);
		user-select: none;
	}

	.card::before {
		content: '';
		position: absolute;
		inset: 0;
		background: radial-gradient(circle at bottom left, transparent 55%, var(--surface-1));
		pointer-events: none;
		box-shadow: var(--bg) -0.5cqi 0.5cqi 2.5cqi inset;
		transition: opacity 900ms var(--ease-out);
	}

	.card::after {
		content: '';
		position: absolute;
		inset: 0;
		margin: auto;
		aspect-ratio: 1;
		background: radial-gradient(circle, var(--bg), transparent 65%);
		opacity: 0;
		transition: opacity 800ms var(--ease-out);
	}

	.card > * {
		grid-area: card;
	}

	.card .obj {
		position: relative;
		z-index: 1;
		width: 30%;
		height: auto;
		color: var(--surface-3);
		transition: 300ms var(--ease-out);
		transition-property: color, scale;
	}

	.card button {
		opacity: 0;
	}

	.card:focus-within {
		outline: 5px auto Highlight;
		outline: 5px auto -webkit-focus-ring-color;
	}

	.card:where(:hover, :focus-within) {
		border-color: var(--active-color, var(--fg));
		transition: border-color 800ms var(--ease-in-out);
	}

	.card:where(:hover, :focus-within) .obj {
		color: var(--active-color, var(--fg));
		scale: 1.1;
		transition: 300ms var(--ease-in-out);
	}

	.card:where(:hover, :focus-within)::before {
		opacity: 0;
	}

	.card:where(:hover, :focus-within)::after {
		opacity: 1;
	}
</style>
