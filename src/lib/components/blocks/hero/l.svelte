<script lang="ts">
	import { onMount } from 'svelte';
	import { writable } from 'svelte/store';
	import * as THREE from 'three';

	export let scene: THREE.Scene;
	export let font: any;
	export let particleImg: THREE.Texture;
	export let camera: THREE.PerspectiveCamera;

	// Stores for reactive values
	const mouse = writable({ x: -200, y: 200 });
	const isMouseDown = writable(false);
	const ease = writable(0.05);

	// Particle system data
	const data = {
		text: "> I'm STEVE J.\n> A developer|",
		amount: 2500,
		particleSize: 1,
		particleColor: 0x7FFFD4,
		textSize: 16,
		area: 250
	};

	let particles: THREE.Points;
	let geometryCopy: THREE.BufferGeometry;
	let planeArea: THREE.Mesh;
	let raycaster: THREE.Raycaster;

	const colorChange = new THREE.Color(data.particleColor);

	onMount(() => {
		setup();
		bindEvents();
	});

	function setup() {
		raycaster = new THREE.Raycaster();

		const geometry = new THREE.PlaneGeometry(
			visibleWidthAtZDepth(100, camera),
			visibleHeightAtZDepth(100, camera)
		);
		const material = new THREE.MeshBasicMaterial({ color: 0x000000, transparent: true });
		planeArea = new THREE.Mesh(geometry, material);
		planeArea.visible = false;
		scene.add(planeArea);

		createText();
	}

	function bindEvents() {
		window.addEventListener('mousedown', handleMouseDown);
		window.addEventListener('mousemove', handleMouseMove);
		window.addEventListener('mouseup', handleMouseUp);
	}

	function handleMouseDown() {
		isMouseDown.set(true);
		ease.set(0.01);
	}

	function handleMouseUp() {
		isMouseDown.set(false);
		ease.set(0.05);
	}

	function handleMouseMove(event: MouseEvent) {
		mouse.set({
			x: (event.clientX / window.innerWidth) * 2 - 1,
			y: -(event.clientY / window.innerHeight) * 2 + 1
		});
	}

	function createText() {
		const shapes = font.generateShapes(data.text, data.textSize);
		const geometry = new THREE.ShapeGeometry(shapes);
		geometry.computeBoundingBox();

		const xMid = -0.5 * (geometry.boundingBox!.max.x - geometry.boundingBox!.min.x);
		const yMid = (geometry.boundingBox!.max.y - geometry.boundingBox!.min.y) / 2.85;

		geometry.center();

		const holeShapes = shapes.flatMap((shape) => shape.holes || []);
		shapes.push(...holeShapes);

		const points = shapes.flatMap((shape) =>
			shape.getSpacedPoints(shape.type === 'Path' ? data.amount / 2 : data.amount)
		);

		const positions = new Float32Array(points.length * 3);
		const colors = new Float32Array(points.length * 3);
		const sizes = new Float32Array(points.length);

		points.forEach((point, i) => {
			positions[i * 3] = point.x + xMid;
			positions[i * 3 + 1] = point.y + yMid;
			positions[i * 3 + 2] = 0;

			colors[i * 3] = colors[i * 3 + 1] = colors[i * 3 + 2] = 1;
			sizes[i] = 1;
		});

		const geoParticles = new THREE.BufferGeometry();
		geoParticles.setAttribute('position', new THREE.BufferAttribute(positions, 3));
		geoParticles.setAttribute('customColor', new THREE.BufferAttribute(colors, 3));
		geoParticles.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

		const material = new THREE.ShaderMaterial({
			uniforms: {
				color: { value: new THREE.Color(0x7FFFD4) },
				pointTexture: { value: particleImg }
			},
			vertexShader: `
                attribute float size;
                attribute vec3 customColor;
                varying vec3 vColor;
                void main() {
                    vColor = customColor;
                    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
                    gl_PointSize = size * (300.0 / -mvPosition.z);
                    gl_Position = projectionMatrix * mvPosition;
                }
            `,
			fragmentShader: `
                uniform vec3 color;
                uniform sampler2D pointTexture;
                varying vec3 vColor;
                void main() {
                    gl_FragColor = vec4(color * vColor, 1.0);
                    gl_FragColor = gl_FragColor * texture2D(pointTexture, gl_PointCoord);
                }
            `,
			blending: THREE.AdditiveBlending,
			depthTest: false,
			transparent: true
		});

		particles = new THREE.Points(geoParticles, material);
		scene.add(particles);

		geometryCopy = geoParticles.clone();
	}

	function visibleHeightAtZDepth(depth: number, camera: THREE.PerspectiveCamera): number {
		const cameraOffset = camera.position.z;
		if (depth < cameraOffset) depth -= cameraOffset;
		else depth += cameraOffset;

		const vFOV = (camera.fov * Math.PI) / 180;
		return 2 * Math.tan(vFOV / 2) * Math.abs(depth);
	}

	function visibleWidthAtZDepth(depth: number, camera: THREE.PerspectiveCamera): number {
		const height = visibleHeightAtZDepth(depth, camera);
		return height * camera.aspect;
	}

	function distance(x1: number, y1: number, x2: number, y2: number): number {
		return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
	}
	let animationId;

	// Reactive render function
	$: {
		if (particles && geometryCopy) {
			updateParticles();
		}
	}
	function updateParticles() {
		const time = ((0.001 * performance.now()) % 12) / 12;
		const zigzagTime = (1 + Math.sin(time * 2 * Math.PI)) / 6;

		raycaster.setFromCamera(new THREE.Vector2($mouse.x, $mouse.y), camera);
		const intersects = raycaster.intersectObject(planeArea);

		if (intersects.length > 0) {
			const pos = particles.geometry.attributes.position;
			const copy = geometryCopy.attributes.position;
			const colors = particles.geometry.attributes.customColor;
			const sizes = particles.geometry.attributes.size;

			const mx = intersects[0].point.x;
			const my = intersects[0].point.y;
			const mz = intersects[0].point.z;

			for (let i = 0, l = pos.count; i < l; i++) {
				const initX = copy.getX(i);
				const initY = copy.getY(i);
				const initZ = copy.getZ(i);
				let px = pos.getX(i);
				let py = pos.getY(i);
				let pz = pos.getZ(i);

				colorChange.setHSL(0.5, 1, 1);
				colors.setXYZ(i, colorChange.r, colorChange.g, colorChange.b);
				colors.needsUpdate = true;

				sizes.array[i] = data.particleSize;
				sizes.needsUpdate = true;

				let dx = mx - px + 3;
				let dy = my - py;
				const mouseDistance = distance(mx, my, px, py);
				const d = dx * dx + dy * dy;
				const f = -data.area / d;

				if ($isMouseDown) {
					const t = Math.atan2(dy, dx);
					px -= f * Math.cos(t);
					py -= f * Math.sin(t);

					colorChange.setHSL(0.5 + zigzagTime, 1.0, 0.5);
					colors.setXYZ(i, colorChange.r, colorChange.g, colorChange.b);
					colors.needsUpdate = true;

					if (px > initX + 70 || px < initX - 70 || py > initY + 70 || py < initY - 70) {
						colorChange.setHSL(0.15, 1.0, 0.5);
						colors.setXYZ(i, colorChange.r, colorChange.g, colorChange.b);
						colors.needsUpdate = true;
					}
				} else {
					if (mouseDistance < data.area) {
						if (i % 5 === 0) {
							const t = Math.atan2(dy, dx);
							px -= 0.03 * Math.cos(t);
							py -= 0.03 * Math.sin(t);

							colorChange.setHSL(0.15, 1.0, 0.5);
							colors.setXYZ(i, colorChange.r, colorChange.g, colorChange.b);
							colors.needsUpdate = true;

							sizes.array[i] = data.particleSize / 1.2;
							sizes.needsUpdate = true;
						} else {
							const t = Math.atan2(dy, dx);
							px += f * Math.cos(t);
							py += f * Math.sin(t);

							pos.setXYZ(i, px, py, pz);
							pos.needsUpdate = true;

							sizes.array[i] = data.particleSize * 1.3;
							sizes.needsUpdate = true;
						}

						if (px > initX + 10 || px < initX - 10 || py > initY + 10 || py < initY - 10) {
							colorChange.setHSL(0.15, 1.0, 0.5);
							colors.setXYZ(i, colorChange.r, colorChange.g, colorChange.b);
							colors.needsUpdate = true;

							sizes.array[i] = data.particleSize / 1.8;
							sizes.needsUpdate = true;
						}
					}
				}

				px += (initX - px) * $ease;
				py += (initY - py) * $ease;
				pz += (initZ - pz) * $ease;

				pos.setXYZ(i, px, py, pz);
				pos.needsUpdate = true;
			}
		}
	}
	function animate() {
		animationId = requestAnimationFrame(animate);
		updateParticles();
	}
	onMount(() => {
		// Start the animation loop
		animate();

		return () => {
			cancelAnimationFrame(animationId);
		};
	});
</script>
