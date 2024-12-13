class Pixel {
	/**
	 * @param {any} canvas
	 * @param {any} ctx
	 * @param {import("./types").PixelData} data
	 * @param {number} speed
	 */
	constructor(canvas, ctx, { x, y, color, delay }, speed) {
		this.canvas = canvas;
		this.ctx = ctx;
		this.x = x;
		this.y = y;
		this.color = color;
		this.speed = this.getRandomValue(0.1, 0.9) * speed * 0.001;
		this.size = 0;
		this.sizeStep = Math.random() * 0.4;
		this.minSize = 0.5;
		this.maxSize = this.getRandomValue(this.minSize, 2);
		this.delay = delay;
		this.counter = 0;
		this.counterStep = Math.random() * 4 + (this.canvas.width + this.canvas.height) * 0.01;
		this.isIdle = false;
		this.isReverse = false;
		this.isShimmer = false;
	}

	/**
	 * @param {number} min
	 * @param {number} max
	 */
	getRandomValue(min, max) {
		return Math.random() * (max - min) + min;
	}

	draw() {
		const centerOffset = 1 - this.size * 0.5;

		this.ctx.fillStyle = this.color;
		this.ctx.fillRect(this.x + centerOffset, this.y + centerOffset, this.size, this.size);
	}

	/**
	 * @param {string | undefined} [state]
	 */
	animate(state) {
		if (state === 'disappear') {
			this.isShimmer = false;
			this.counter = 0;
			if (this.size <= 0) {  // Check if already disappeared
				this.isIdle = true;
				return;
			}
			this.size -= this.sizeStep;
		} else if (state === 'appear') {
			this.isIdle = false;
			if (this.counter <= this.delay) {
				this.counter += this.counterStep;
				return;
			}

			if (!this.isShimmer && this.size >= this.maxSize) {
				this.isShimmer = true;
			}

			if (this.isShimmer) {
				this.size += (this.isReverse ? -1 : 1) * this.speed;
				if (this.size >= this.maxSize) {
					this.isReverse = true;
				} else if (this.size <= this.minSize) {
					this.isReverse = false;
				}
			} else {
				this.size += this.sizeStep;
			}
			if (this.size < 0) { // Ensure size doesn't go below zero
				this.size = 0;
			}

		}
		this.draw();
	}
}

export default Pixel;
