<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import * as THREE from 'three';
	import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js';
	import { TextureLoader } from 'three';
    import ParticleSystem from './l.svelte';

	let particle: THREE.Texture,
		typo: any = null;

	export class Environment {
		private container: HTMLElement;
		private font: any;
		private particle: THREE.Texture;
		private scene: THREE.Scene;
		private camera: THREE.PerspectiveCamera;
		private renderer: THREE.WebGLRenderer;
		private particleSystem: any;

		constructor(container: HTMLElement, font: any, particle: THREE.Texture) {
			this.container = container;
			this.font = font;
			this.particle = particle;
			this.scene = new THREE.Scene();
			this.init();
		}

		private init(): void {
			this.createCamera();
			this.createRenderer();
			this.createParticleSystem();
			this.bindEvents();
			this.renderer.setAnimationLoop(() => this.render());
		}

		private createCamera(): void {
			const aspect = this.container.clientWidth / this.container.clientHeight;
			this.camera = new THREE.PerspectiveCamera(65, aspect, 1, 10000);
			this.camera.position.set(0, 0, 100);
		}

		private createRenderer(): void {
			this.renderer = new THREE.WebGLRenderer();
			this.renderer.setSize(this.container.clientWidth, this.container.clientHeight);
			this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
			this.renderer.outputColorSpace = THREE.SRGBColorSpace;
			this.container.appendChild(this.renderer.domElement);
		}

		private createParticleSystem(): void {
			this.particleSystem = new ParticleSystem({
				target: this.container,
				props: {
					scene: this.scene,
					font: this.font,
					particleImg: this.particle,
					camera: this.camera,
				}
			});
		}

		private render(): void {
			this.renderer.render(this.scene, this.camera);
		}

		private onWindowResize = (): void => {
			this.camera.aspect = this.container.clientWidth / this.container.clientHeight;
			this.camera.updateProjectionMatrix();
			this.renderer.setSize(this.container.clientWidth, this.container.clientHeight);
		};

		private bindEvents(): void {
			window.addEventListener('resize', this.onWindowResize);
		}
	}

	// Function to load fonts and textures
	const preloadAssets = () => {
		const container = document.querySelector('.magic') as HTMLElement;
		const manager = new THREE.LoadingManager();
		manager.onLoad = () => new Environment(container, typo, particle);

		const fontLoader = new FontLoader(manager);
		fontLoader.load(
			'https://res.cloudinary.com/dydre7amr/raw/upload/v1612950355/font_zsd4dr.json',
			(font) => {
				typo = font;
			}
		);

		const textureLoader = new TextureLoader(manager);
		particle = textureLoader.load(
			'https://res.cloudinary.com/dfvtkoboz/image/upload/v1605013866/particle_a64uzf.png'
		);
	};

	// Svelte's onMount lifecycle to ensure DOM is available
	onMount(() => {
		preloadAssets();
	});
</script>

<div class="magic absolute z-10 min-h-64 -translate-x-[10.5rem] hidden lg:block" />

<style>
	.magic {
		width: 100%;
		height: 100%;
		cursor: pointer;
	}
</style>
