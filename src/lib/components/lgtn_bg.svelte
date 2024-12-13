<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { writable, type Writable } from 'svelte/store';

	interface Particle {
		x: number;
		y: number;
		vx: number;
		vy: number;
		radius: number;
		mass: number;
		lifespan: number;
		color: string;
	}

	// Variables
	let canvas: HTMLCanvasElement;
	let ctx: CanvasRenderingContext2D;
	let animationId: number;
	let width: number;
	let height: number;

	// Stores and constants
	const particles: Writable<Particle[]> = writable([]);
	const maxParticles = 26
	const lightningChance = 0.005;
	const branchChance = 0.3;

	// Physics constants
	const G = 0.0001; // Gravitational constant
	const elasticity = 0.8;
	const minDistance = 5; // Minimum distance to prevent extreme forces

	// Utility functions
	const randomInt = (min: number, max: number): number =>
		Math.floor(Math.random() * (max - min + 1)) + min;
	const random = (min: number, max: number): number => Math.random() * (max - min) + min;

	const createParticle = (x = randomInt(1, width), y = randomInt(1, height)): Particle => ({
		x,
		y,
		vx: random(-0.2, 0.2),
		vy: random(-0.2, 1),
		radius: random(0.5, 2),
		mass: random(50, 500),
		lifespan: random(1000, 2000),
		color: `hsl(${random(180, 200)}, 100%, 50%)`
	});

	const initParticles = () => particles.set([...Array(maxParticles)].map(() => createParticle()));

	// Physics engine functions
	const applyGravity = (p1: Particle, p2: Particle) => {
		const dx = p2.x - p1.x;
		const dy = p2.y - p1.y;
		const distanceSquared = dx * dx + dy * dy;
		const distance = Math.sqrt(distanceSquared);

		if (distance > minDistance) {
			const force = (G * p1.mass * p2.mass) / distanceSquared;
			const ax = (force * dx) / distance / p1.mass;
			const ay = (force * dy) / distance / p1.mass;

			p1.vx += ax;
			p1.vy += ay;
		}
	};

	const handleEdgeWrapping = (p: Particle) => {
		if (p.x < 0) p.x = width;
		if (p.x > width) p.x = 0;
		if (p.y < 0) p.y = height;
		if (p.y > height) p.y = 0;
	};

	const handleParticleCollision = (p1: Particle, p2: Particle) => {
		const dx = p2.x - p1.x;
		const dy = p2.y - p1.y;
		const distance = Math.sqrt(dx * dx + dy * dy);

		if (distance < p1.radius + p2.radius) {
			const angle = Math.atan2(dy, dx);
			const sin = Math.sin(angle);
			const cos = Math.cos(angle);

			// Rotate particle velocities
			const vx1 = p1.vx * cos + p1.vy * sin;
			const vy1 = p1.vy * cos - p1.vx * sin;
			const vx2 = p2.vx * cos + p2.vy * sin;
			const vy2 = p2.vy * cos - p2.vx * sin;

			// Collision reaction
			const v1 = ((p1.mass - p2.mass) * vx1 + 2 * p2.mass * vx2) / (p1.mass + p2.mass);
			const v2 = ((p2.mass - p1.mass) * vx2 + 2 * p1.mass * vx1) / (p1.mass + p2.mass);

			// Update velocities
			p1.vx = v1 * cos - vy1 * sin;
			p1.vy = vy1 * cos + v1 * sin;
			p2.vx = v2 * cos - vy2 * sin;
			p2.vy = vy2 * cos + v2 * sin;

			// Apply elasticity
			p1.vx *= elasticity;
			p1.vy *= elasticity;
			p2.vx *= elasticity;
			p2.vy *= elasticity;

			// Separate particles
			const overlap = (p1.radius + p2.radius - distance) / 2;
			p1.x -= overlap * cos;
			p1.y -= overlap * sin;
			p2.x += overlap * cos;
			p2.y += overlap * sin;
		}
	};

	// Particle update and drawing
	const updateParticle = (p: Particle, particles: Particle[]) => {
		for (let other of particles) {
			if (p !== other) {
				applyGravity(p, other);
				handleParticleCollision(p, other);
			}
		}

		p.x += p.vx;
		p.y += p.vy;
		handleEdgeWrapping(p);
		p.lifespan--;
	};

	const drawParticle = (p: Particle) => {
		if (!ctx) return;

		ctx.beginPath();
		ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
		ctx.fillStyle = p.color;
		ctx.fill();

		// Glow effect
		const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.radius * 2);
		gradient.addColorStop(0, p.color);
		gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
		ctx.beginPath();
		ctx.arc(p.x, p.y, p.radius * 2, 0, Math.PI * 2);
		ctx.fillStyle = gradient;
		ctx.fill();
	};

	// Lightning logic
	const createLightning = () => {
		if (Math.random() < lightningChance) {
			const particlesArray = $particles;
			const start = particlesArray[randomInt(0, particlesArray.length - 1)];
			const end = particlesArray[randomInt(0, particlesArray.length - 1)];
			if (start !== end) drawLightningBranch(start, end, 4);
		}
	};

	const drawLightningBranch = (start: Particle, end: Particle, depth: number) => {
		if (depth <= 0 || !ctx) return;

		const midX = (start.x + end.x) / 2;
		const midY = (start.y + end.y) / 2;
		const offsetX = random(-15, 15);
		const offsetY = random(-15, 15);

		ctx.beginPath();
		ctx.moveTo(start.x, start.y);
		ctx.lineTo(midX + offsetX, midY + offsetY);
		ctx.lineTo(end.x, end.y);
		ctx.strokeStyle = `rgba(55, 55, 100, ${0.7 + depth * 0.05})`;
		ctx.lineWidth = depth * 0.5;
		ctx.stroke();

		if (Math.random() < branchChance) {
			drawLightningBranch(
				{ x: midX + offsetX, y: midY + offsetY, ...start },
				$particles[randomInt(0, $particles.length - 1)],
				depth - 1
			);
		}
	};

	// Animation loop
	const animate = () => {
		if (!ctx) return;

		// Clear canvas
		ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
		ctx.fillRect(0, 0, width, height);

		particles.update((currentParticles) => {
			return currentParticles
				.map((particle) => {
					updateParticle(particle, currentParticles);
					drawParticle(particle);
					return particle;
				})
				.filter((p) => p.lifespan > 0);
		});

		// Add particles if needed
		particles.update((currentParticles) => {
			if (currentParticles.length < maxParticles) {
				const additionalParticles = [...Array(maxParticles - currentParticles.length)].map(() =>
					createParticle()
				);
				return [...currentParticles, ...additionalParticles];
			}
			return currentParticles;
		});

		createLightning();
		animationId = requestAnimationFrame(animate);
	};

	// Handle resize
	const handleResize = () => {
		width = window.innerWidth;
		height = window.innerHeight;
		canvas.width = width;
		canvas.height = height;
	};

	onMount(() => {
		ctx = canvas.getContext('2d')!;
		handleResize();
		initParticles();
		animate();
		window.addEventListener('resize', handleResize);
	});
</script>

<svelte:window bind:innerWidth={width} bind:innerHeight={height} />
<canvas bind:this={canvas} class="pointer-events-none fixed left-0 top-0 h-full w-full opacity-50" />
