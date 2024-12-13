<script>
	import '../app.css';
	import * as Header from '$lib/components/blocks/header/';
	import LgtnBg from '$lib/components/lgtn_bg.svelte';
	import { ArrowUpRight } from 'lucide-svelte';
	import Button from '$lib/components/ui/button/button.svelte';

	let paths = [
		{ label: 'About', path: '#about' },
		{ label: 'Explorations', path: '#explos' },
		{ label: 'Thoughts', path: '/blog' },
		{ label: 'Contact', path: '/contact' }
	];
</script>


<Header.Root
	class="fixed z-10 w-full items-center bg-teal-950 bg-opacity-60 font-sans backdrop-blur-sm"
>
	<!-- Left Slot: Logo -->
	<a href="/" slot="left" class="text-4xl font-bold text-foreground">jsjg</a>

	<!-- Middle Slot: Navigation -->
	<Header.Navigation slot="middle" {paths} />

	<!-- Right Slot: Multiple CTA buttons -->
	<Header.CTA class="flex items-center justify-end" slot="right">
		<div class="effect egeon buttons">
			<a href="https://x.com/JSJG_ht" class="tw" title="Join us on X"
				><i>
					<svg
						class="h-4"
						fill="#fff"
						role="img"
						viewBox="0 0 24 24"
						xmlns="http://www.w3.org/2000/svg"
						><title>X</title><path
							d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z"
						/></svg
					></i
				></a
			>
			<a href="#" class="in" title="Join us on Linked In"
				><i><img src="linkedin-big-logo-svgrepo-com.svg" alt="LinkedIn" /></i>
			</a>
			<a href="https://github.com/jsjg-8/" class="gh" title="See our codebase on Github"
				><i
					><svg
						class="h-4"
						fill="#fff"
						role="img"
						viewBox="0 0 24 24"
						xmlns="http://www.w3.org/2000/svg"
						><title>GitHub</title><path
							d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"
						/></svg
					></i
				></a
			>
		</div>
		<Button variant="outline" class="bg-inherit text-primary"
			><ArrowUpRight class="h-4 w-4 " /> Resume</Button
		>
	</Header.CTA>
</Header.Root>

<div class=" -z-10"><LgtnBg/></div>
<div class="bg"><slot/></div>



<style lang="scss">
	$basic-dark-color: #212121;
	$basic-light-color: #fff;
	$border-radius: 10px;
	$font-size: 25px;
	/* Style for the container that holds all the cards */

	.bg{
		background-image: url(./upsampler.png);
		backdrop-filter: blur(32px);
		background-blend-mode:exclusion;
	}
	.container {
		display: flex;
		flex-direction: column;
		align-items: center;
		margin: 100px auto;
		padding: 0 20px;
		max-width: 1280px;
		width: 100%;
	}

	.effect {
		display: flex;

		a {
			text-decoration: none !important;
			color: $basic-light-color;
			width: 32px;
			height: 32px;
			display: flex;
			align-items: center;
			justify-content: center;
			border-radius: $border-radius;
			margin-right: 10px;
			font-size: $font-size;
			overflow: hidden;
			position: relative;

			i {
				position: relative;
				z-index: 3;
			}
		}
	}
	/* egeon effect */
	.effect.egeon {
		a {
			transition:
				transform 0.2s linear 0s,
				border-radius 0.2s linear 0.2s;

			i {
				transition: transform 0.2s linear 0s;
			}

			&.tw {
				background-color: rgb(0, 162, 255);
			}
			&.gh {
				background-color: #191821;
			}
			&.in {
				background-color: #1f0e5e;
			}

			&:hover {
				transform: rotate(-90deg);
				border-top-left-radius: 50%;
				border-top-right-radius: 50%;
				border-bottom-left-radius: 50%;

				i {
					transform: rotate(90deg);
				}
			}
		}
	}
</style>
