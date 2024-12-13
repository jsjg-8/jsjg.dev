<script lang="ts">
	import { Code, Monitor, Terminal, CheckIcon, ArrowUpRight, ScanFace } from 'lucide-svelte';
	import * as Card from '$lib/components/ui/card/';
	import Button from '$lib/components/ui/button/button.svelte';
	import { Canvas, CanvasItem } from '$lib/components/blocks/cancard';

	import Footer from '$lib/components/blocks/Footer.svelte';
	import Hero from '$lib/components/blocks/hero/hero.svelte';

	export let projects = [
		{
			title: 'LexiLearn',
			description: 'Language learning, Vocabulary, Spaced Repetition, FastAPI, SQLModel',
			logo: 'https://via.placeholder.com/100x100',
			image: 'https://via.placeholder.com/400x200',
			style: 'bg-gradient-to-br from-[#6B2DBD] via-[#6F46CC] to-[#000000] text-white',
			content:
				'LexiLearn is an innovative language learning app that helps users expand their vocabulary through contextual examples and a spaced repetition system. Built using FastAPI and SQLModel, it ensures maximum retention with minimal repetitions, focusing on efficiency and engagement.'
		},
		{
			title: 'Financial Dashboard for Traders',
			description: 'Finance, Trading, Data Visualization, Svelte, AWS, FastAPI',
			logo: 'https://via.placeholder.com/100x100',
			image: 'https://via.placeholder.com/400x200',
			style: 'bg-gradient-to-bl from-[#583A84] via-[#211D3E] to-[#7091B6] text-gray-100',
			content:
				'A powerful dashboard built for traders, offering real-time data visualization and analytics. The dashboard integrates AWS for cloud services and FastAPI for backend data handling, providing traders with insights into stock performance, market trends, and trading volumes all in one place.'
		},
		{
			title: 'Portfolio Generator',
			description:
				'Portfolio Website, SvelteKit, TailwindCSS, AI, Material Design, Scandinavian Minimalism',
			logo: 'https://via.placeholder.com/100x100',
			image: 'https://via.placeholder.com/400x200',
			style: 'bg-gradient-to-tl from-[#6A599D] via-[#422C6B] to-[#8872B7] text-white',
			content:
				'A modern portfolio generator that creates personalized websites for professionals and creatives. Using AI and built with SvelteKit and TailwindCSS, it allows users to quickly generate aesthetically pleasing, fully responsive portfolios inspired by Material Design and Scandinavian minimalism.'
		}
	];
	const cards = [
		{
			class:
				'h-32 w-32 text-primary-foreground grayscale hover:grayscale-0 transition duration-300 hover:border-yellow-100 text-yellow-300',
			canvas: { gap: 6, speed: 35, noFocus: true, reducedMotion: false },
			colors: '#2F5D81, #fde047, #eab308',
			svg: `
        <svg xmlns="http://www.w3.org/2000/svg" width="3.68em" height="3.68em" viewBox="0 0 256 255" class="pointer-events-none absolute"><defs><linearGradient id="logosPython0" x1="12.959%" x2="79.639%" y1="12.039%" y2="78.201%"><stop offset="0%" stop-color="#387eb8"/><stop offset="100%" stop-color="#366994"/></linearGradient><linearGradient id="logosPython1" x1="19.128%" x2="90.742%" y1="20.579%" y2="88.429%"><stop offset="0%" stop-color="#ffe052"/><stop offset="100%" stop-color="#ffc331"/></linearGradient></defs><path fill="url(#logosPython0)" d="M126.916.072c-64.832 0-60.784 28.115-60.784 28.115l.072 29.128h61.868v8.745H41.631S.145 61.355.145 126.77c0 65.417 36.21 63.097 36.21 63.097h21.61v-30.356s-1.165-36.21 35.632-36.21h61.362s34.475.557 34.475-33.319V33.97S194.67.072 126.916.072M92.802 19.66a11.12 11.12 0 0 1 11.13 11.13a11.12 11.12 0 0 1-11.13 11.13a11.12 11.12 0 0 1-11.13-11.13a11.12 11.12 0 0 1 11.13-11.13"/><path fill="url(#logosPython1)" d="M128.757 254.126c64.832 0 60.784-28.115 60.784-28.115l-.072-29.127H127.6v-8.745h86.441s41.486 4.705 41.486-60.712c0-65.416-36.21-63.096-36.21-63.096h-21.61v30.355s1.165 36.21-35.632 36.21h-61.362s-34.475-.557-34.475 33.32v56.013s-5.235 33.897 62.518 33.897m34.114-19.586a11.12 11.12 0 0 1-11.13-11.13a11.12 11.12 0 0 1 11.13-11.131a11.12 11.12 0 0 1 11.13 11.13a11.12 11.12 0 0 1-11.13 11.13"/></svg>
      `
		},
		{
			class:
				'h-32 w-32 text-primary-foreground grayscale hover:grayscale-0 transition duration-300 hover:border-sky-400 hover:text-blue-600',
			canvas: { gap: 12, speed: 15, noFocus: true, reducedMotion: false },
			colors: '#e0f2fe,#7dd3fc,#0ea5e9',
			svg: `
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50" slot="icon" class="pointer-events-none absolute" fill="currentcolor" width="50px" height="50px">
          <path d="M 5 4 A 1.0001 1.0001 0 0 0 4 5 L 4 45 A 1.0001 1.0001 0 0 0 5 46 L 45 46 A 1.0001 1.0001 0 0 0 46 45 L 46 5 A 1.0001 1.0001 0 0 0 45 4 L 5 4 z M 6 6 L 44 6 L 44 44 L 6 44 L 6 6 z M 15 23 L 15 26.445312 L 20 26.445312 L 20 42 L 24 42 L 24 26.445312 L 29 26.445312 L 29 23 L 15 23 z M 36.691406 23.009766 C 33.576782 22.997369 30.017578 23.941219 30.017578 28.324219 C 30.017578 34.054219 37.738281 34.055625 37.738281 36.640625 C 37.738281 36.885625 37.842187 38.666016 35.117188 38.666016 C 32.392187 38.666016 30.121094 36.953125 30.121094 36.953125 L 30.121094 41.111328 C 30.121094 41.111328 42.001953 44.954062 42.001953 36.289062 C 42.000953 30.664063 34.208984 30.945391 34.208984 28.150391 C 34.208984 27.067391 34.978375 26.054687 37.109375 26.054688 C 39.240375 26.054688 41.126953 27.3125 41.126953 27.3125 L 41.267578 23.607422 C 41.267578 23.607422 39.113892 23.019408 36.691406 23.009766 z" />
        </svg>
      `
		},
		{
			name: 'Rust',
			class:
				'h-32 w-32 text-black transition grayscale hover:grayscale-0 duration-300 hover:border-orange-300 hover:text-gray-900',
			canvas: { gap: 6, speed: 25, noFocus: true, reducedMotion: false },
			colors: '#fff,#aaa,#ff3e00',
			svg: `<svg xmlns="http://www.w3.org/2000/svg" width="3.68em" height="3.68em" viewBox="0 0 32 32" class="pointer-events-none absolute"><defs><radialGradient id="vscodeIconsFileTypeRust0" cx="-492.035" cy="-883.37" r="13.998" gradientTransform="matrix(.866 -.5 -.3 -.52 177.106 -689.033)" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#7d7d7d"/><stop offset=".267" stop-color="#7e7c7a"/><stop offset=".45" stop-color="#817871"/><stop offset=".608" stop-color="#867162"/><stop offset=".753" stop-color="#8d684c"/><stop offset=".886" stop-color="#965c30"/><stop offset="1" stop-color="#a04f12"/></radialGradient></defs><path fill="url(#vscodeIconsFileTypeRust0)" d="M15.124 5.3a.832.832 0 1 1 .832.832a.83.83 0 0 1-.832-.832M5.2 12.834a.832.832 0 1 1 .832.832a.83.83 0 0 1-.832-.832m19.856.039a.832.832 0 1 1 .832.832a.83.83 0 0 1-.832-.832m-17.451 1.14a.76.76 0 0 0 .386-1l-.369-.835h1.452v6.545h-2.93a10.3 10.3 0 0 1-.332-3.911Zm6.074.161v-1.929h3.458c.179 0 1.261.206 1.261 1.016c0 .672-.83.913-1.513.913ZM8.958 24.561a.832.832 0 1 1 .832.832a.83.83 0 0 1-.832-.832m12.331.039a.832.832 0 1 1 .832.832a.83.83 0 0 1-.832-.832m.257-1.887a.76.76 0 0 0-.9.584l-.418 1.949a10.25 10.25 0 0 1-8.545-.041l-.417-1.949a.76.76 0 0 0-.9-.583l-1.721.37a10 10 0 0 1-.89-1.049h8.374c.095 0 .158-.017.158-.1v-2.966c0-.086-.063-.1-.158-.1h-2.45v-1.881h2.649a1.665 1.665 0 0 1 1.629 1.412c.105.413.336 1.757.494 2.187c.157.483.8 1.447 1.482 1.447h4.323a10 10 0 0 1-.949 1.1Zm4.65-7.821a10.3 10.3 0 0 1 .022 1.779h-1.051c-.105 0-.148.069-.148.172v.483c0 1.136-.641 1.384-1.2 1.447c-.535.06-1.128-.224-1.2-.551a3.62 3.62 0 0 0-1.671-2.808c1.03-.654 2.1-1.619 2.1-2.911A3.29 3.29 0 0 0 21.44 9.8a4.56 4.56 0 0 0-2.2-.724H8.367A10.25 10.25 0 0 1 14.1 5.84l1.282 1.344a.76.76 0 0 0 1.072.026l1.434-1.372a10.25 10.25 0 0 1 7.015 5l-.982 2.217a.76.76 0 0 0 .386 1Zm2.448.036l-.033-.343l1.011-.943a.42.42 0 0 0-.013-.595a.4.4 0 0 0-.121-.081l-1.288-.483l-.1-.334l.806-1.12a.42.42 0 0 0-.13-.581a.4.4 0 0 0-.133-.055l-1.363-.222l-.164-.306l.573-1.257a.42.42 0 0 0-.236-.544a.4.4 0 0 0-.146-.029l-1.383.048l-.224-.264l.318-1.347a.42.42 0 0 0-.343-.487a.4.4 0 0 0-.144 0l-1.348.315l-.266-.219l.049-1.381a.42.42 0 0 0-.431-.411a.4.4 0 0 0-.141.028l-1.257.573l-.306-.164l-.222-1.363a.42.42 0 0 0-.5-.318a.4.4 0 0 0-.133.055l-1.121.806l-.333-.1l-.483-1.293a.42.42 0 0 0-.555-.215a.4.4 0 0 0-.12.08l-.946 1.012l-.343-.033l-.728-1.177a.42.42 0 0 0-.688 0l-.728 1.177l-.343.033l-.943-1.012a.42.42 0 0 0-.595.015a.4.4 0 0 0-.08.12L12.483 3.8l-.333.1l-1.12-.8a.42.42 0 0 0-.581.13a.4.4 0 0 0-.055.133l-.222 1.363l-.306.164l-1.258-.573a.42.42 0 0 0-.544.239a.4.4 0 0 0-.028.144l.048 1.383l-.266.217l-1.347-.316a.42.42 0 0 0-.487.343a.4.4 0 0 0 0 .144L6.3 7.819l-.218.265L4.7 8.036a.422.422 0 0 0-.383.573l.573 1.257l-.164.306l-1.363.222a.42.42 0 0 0-.318.5a.4.4 0 0 0 .055.133l.806 1.12l-.1.334l-1.293.483a.42.42 0 0 0-.215.555a.4.4 0 0 0 .081.121l1.011.943l-.033.343l-1.177.728a.42.42 0 0 0 0 .688l1.177.728l.033.343l-1.011.943a.42.42 0 0 0 .015.595a.4.4 0 0 0 .119.08l1.293.483l.1.334l-.806 1.124a.42.42 0 0 0 .131.581a.4.4 0 0 0 .133.055l1.363.222l.164.307l-.573 1.257a.42.42 0 0 0 .24.545a.4.4 0 0 0 .143.028l1.383-.048l.219.266l-.317 1.348a.42.42 0 0 0 .341.486a.4.4 0 0 0 .146 0l1.345-.319l.266.218l-.049 1.382a.42.42 0 0 0 .429.41a.4.4 0 0 0 .143-.028l1.257-.573l.306.164l.222 1.362a.42.42 0 0 0 .5.319a.4.4 0 0 0 .133-.055l1.12-.807l.334.1l.483 1.292a.42.42 0 0 0 .556.214a.4.4 0 0 0 .119-.08l.943-1.011l.343.034l.728 1.177a.42.42 0 0 0 .588.1a.4.4 0 0 0 .1-.1l.728-1.177l.343-.034l.943 1.011a.42.42 0 0 0 .595-.015a.4.4 0 0 0 .08-.119l.483-1.292l.334-.1l1.12.807a.42.42 0 0 0 .581-.131a.4.4 0 0 0 .055-.133l.222-1.362l.306-.164l1.257.573a.42.42 0 0 0 .544-.239a.4.4 0 0 0 .028-.143l-.048-1.384l.265-.218l1.347.317a.42.42 0 0 0 .487-.34a.5.5 0 0 0 0-.146l-.309-1.346l.218-.266l1.383.048a.42.42 0 0 0 .41-.431a.4.4 0 0 0-.028-.142l-.573-1.257l.164-.307l1.363-.222a.42.42 0 0 0 .319-.5a.4.4 0 0 0-.056-.135l-.806-1.12l.1-.334l1.293-.483a.42.42 0 0 0 .215-.554a.4.4 0 0 0-.081-.121l-1.011-.943l.033-.343l1.177-.728a.42.42 0 0 0 0-.688Z"/></svg>`
		},
		{
			name: 'SvelteKit',
			class:
				'h-32 w-32 text-orange-500 transition grayscale hover:grayscale-0 duration-300 hover:border-orange-300 hover:text-orange-600',
			canvas: { gap: 6, speed: 25, noFocus: true, reducedMotion: false },
			colors: '#fff,#af0f00,#ff3e00',
			svg: `
        <svg xmlns="http://www.w3.org/2000/svg" width="3.68em" height="3.68em" viewBox="-26 0 308 308" class="pointer-events-none absolute">
									<path fill="#ff3e00"
										d="M239.682 40.707C211.113-.182 154.69-12.301 113.895 13.69L42.247 59.356a82.2 82.2 0 0 0-37.135 55.056a86.57 86.57 0 0 0 8.536 55.576a82.4 82.4 0 0 0-12.296 30.719a87.6 87.6 0 0 0 14.964 66.244c28.574 40.893 84.997 53.007 125.787 27.016l71.648-45.664a82.18 82.18 0 0 0 37.135-55.057a86.6 86.6 0 0 0-8.53-55.577a82.4 82.4 0 0 0 12.29-30.718a87.57 87.57 0 0 0-14.963-66.244"
									/>
									<path fill="#fff"
										d="M106.889 270.841c-23.102 6.007-47.497-3.036-61.103-22.648a52.7 52.7 0 0 1-9.003-39.85a50 50 0 0 1 1.713-6.693l1.35-4.115l3.671 2.697a92.5 92.5 0 0 0 28.036 14.007l2.663.808l-.245 2.659a16.07 16.07 0 0 0 2.89 10.656a17.14 17.14 0 0 0 18.397 6.828a15.8 15.8 0 0 0 4.403-1.935l71.67-45.672a14.92 14.92 0 0 0 6.734-9.977a15.92 15.92 0 0 0-2.713-12.011a17.16 17.16 0 0 0-18.404-6.832a15.8 15.8 0 0 0-4.396 1.933l-27.35 17.434a52.3 52.3 0 0 1-14.553 6.391c-23.101 6.007-47.497-3.036-61.101-22.649a52.68 52.68 0 0 1-9.004-39.849a49.43 49.43 0 0 1 22.34-33.114l71.664-45.677a52.2 52.2 0 0 1 14.563-6.398c23.101-6.007 47.497 3.036 61.101 22.648a52.7 52.7 0 0 1 9.004 39.85a51 51 0 0 1-1.713 6.692l-1.35 4.116l-3.67-2.693a92.4 92.4 0 0 0-28.037-14.013l-2.664-.809l.246-2.658a16.1 16.1 0 0 0-2.89-10.656a17.14 17.14 0 0 0-18.398-6.828a15.8 15.8 0 0 0-4.402 1.935l-71.67 45.674a14.9 14.9 0 0 0-6.73 9.975a15.9 15.9 0 0 0 2.709 12.012a17.16 17.16 0 0 0 18.404 6.832a15.8 15.8 0 0 0 4.402-1.935l27.345-17.427a52.2 52.2 0 0 1 14.552-6.397c23.101-6.006 47.497 3.037 61.102 22.65a52.68 52.68 0 0 1 9.003 39.848a49.45 49.45 0 0 1-22.34 33.12l-71.664 45.673a52.2 52.2 0 0 1-14.563 6.398"
									/>
								</svg>
      `
		},
		{
			name: 'TailwindCSS',
			class:
				'h-32 w-32 text-teal-500 transition grayscale hover:grayscale-0 duration-300 hover:border-teal-300 hover:text-teal-600',
			canvas: { gap: 8, speed: 30, noFocus: true, reducedMotion: false },
			colors: '#38B2AC,#319795,#2C7A7B',
			svg: `
        <svg xmlns="http://www.w3.org/2000/svg" width="3.33em" height="2em" viewBox="0 0 256 154" class="pointer-events-none absolute hover:scale-110">
	<defs>
		<linearGradient id="logosTailwindcssIcon0" x1="-2.778%" x2="100%" y1="32%" y2="67.556%">
			<stop offset="0%" stop-color="#2298bd" />
			<stop offset="100%" stop-color="#0ed7b5" />
		</linearGradient>
	</defs>
	<path fill="url(#logosTailwindcssIcon0)" d="M128 0Q76.8 0 64 51.2Q83.2 25.6 108.8 32c9.737 2.434 16.697 9.499 24.401 17.318C145.751 62.057 160.275 76.8 192 76.8q51.2 0 64-51.2q-19.2 25.6-44.8 19.2c-9.737-2.434-16.697-9.499-24.401-17.318C174.249 14.743 159.725 0 128 0M64 76.8q-51.2 0-64 51.2q19.2-25.6 44.8-19.2c9.737 2.434 16.697 9.499 24.401 17.318C81.751 138.857 96.275 153.6 128 153.6q51.2 0 64-51.2q-19.2 25.6-44.8 19.2c-9.737-2.434-16.697-9.499-24.401-17.318C110.249 91.543 95.725 76.8 64 76.8" />
</svg>
      `
		},
		{
			name: 'Shadcn-UI',
			class:
				'h-32 w-32 text-gray-700 transition grayscale hover:grayscale-0 duration-300 hover:border-gray-500 hover:text-gray-800 ',
			canvas: { gap: 6, speed: 25, noFocus: true, reducedMotion: false },
			colors: '#A8A8A8,#8C8C8C,#707070',
			svg: `<svg xmlns="http://www.w3.org/2000/svg" width="3.68em" height="3.68em" viewBox="0 0 24 24" class="pointer-events-none absolute"><path fill="#fff" d="M22.219 11.784L11.784 22.219a1.045 1.045 0 0 0 1.476 1.476L23.695 13.26a1.045 1.045 0 0 0-1.476-1.476M20.132.305L.305 20.132a1.045 1.045 0 0 0 1.476 1.476L21.608 1.781A1.045 1.045 0 0 0 20.132.305"/></svg>`
		},
		{
			name: 'PostgreSQL',
			class:
				'h-32 w-32 text-blue-900 transition grayscale hover:grayscale-0 duration-300 hover:border-blue-500 hover:text-blue-800',
			canvas: { gap: 6, speed: 25, noFocus: true, reducedMotion: false },
			colors: '#336791,#2F5D8A,#fff',
			svg: `
        <svg xmlns="http://www.w3.org/2000/svg" width="3.68em" height="3.68em" viewBox="0 0 128 128" class="pointer-events-none absolute"><path d="M93.809 92.112c.785-6.533.55-7.492 5.416-6.433l1.235.108c3.742.17 8.637-.602 11.513-1.938c6.191-2.873 9.861-7.668 3.758-6.409c-13.924 2.873-14.881-1.842-14.881-1.842c14.703-21.815 20.849-49.508 15.543-56.287c-14.47-18.489-39.517-9.746-39.936-9.52l-.134.025c-2.751-.571-5.83-.912-9.289-.968c-6.301-.104-11.082 1.652-14.709 4.402c0 0-44.683-18.409-42.604 23.151c.442 8.841 12.672 66.898 27.26 49.362c5.332-6.412 10.484-11.834 10.484-11.834c2.558 1.699 5.622 2.567 8.834 2.255l.249-.212c-.078.796-.044 1.575.099 2.497c-3.757 4.199-2.653 4.936-10.166 6.482c-7.602 1.566-3.136 4.355-.221 5.084c3.535.884 11.712 2.136 17.238-5.598l-.22.882c1.474 1.18 1.375 8.477 1.583 13.69c.209 5.214.558 10.079 1.621 12.948s2.317 10.256 12.191 8.14c8.252-1.764 14.561-4.309 15.136-27.985"/><path d="M75.458 125.256c-4.367 0-7.211-1.689-8.938-3.32c-2.607-2.46-3.641-5.629-4.259-7.522l-.267-.79c-1.244-3.358-1.666-8.193-1.916-14.419c-.038-.935-.064-1.898-.093-2.919c-.021-.747-.047-1.684-.085-2.664a18.8 18.8 0 0 1-4.962 1.568c-3.079.526-6.389.356-9.84-.507c-2.435-.609-4.965-1.871-6.407-3.82c-4.203 3.681-8.212 3.182-10.396 2.453c-3.853-1.285-7.301-4.896-10.542-11.037c-2.309-4.375-4.542-10.075-6.638-16.943c-3.65-11.96-5.969-24.557-6.175-28.693C4.292 23.698 7.777 14.44 15.296 9.129C27.157.751 45.128 5.678 51.68 7.915c4.402-2.653 9.581-3.944 15.433-3.851c3.143.051 6.136.327 8.916.823c2.9-.912 8.628-2.221 15.185-2.139c12.081.144 22.092 4.852 28.949 13.615c4.894 6.252 2.474 19.381.597 26.651c-2.642 10.226-7.271 21.102-12.957 30.57c1.544.011 3.781-.174 6.961-.831c6.274-1.295 8.109 2.069 8.607 3.575c1.995 6.042-6.677 10.608-9.382 11.864c-3.466 1.609-9.117 2.589-13.745 2.377l-.202-.013l-1.216-.107l-.12 1.014l-.116.991c-.311 11.999-2.025 19.598-5.552 24.619c-3.697 5.264-8.835 6.739-13.361 7.709c-1.544.33-2.947.474-4.219.474m-9.19-43.671c2.819 2.256 3.066 6.501 3.287 14.434c.028.99.054 1.927.089 2.802c.106 2.65.355 8.855 1.327 11.477c.137.371.26.747.39 1.146c1.083 3.316 1.626 4.979 6.309 3.978c3.931-.843 5.952-1.599 7.534-3.851c2.299-3.274 3.585-9.86 3.821-19.575l4.783.116l-4.75-.57l.14-1.186c.455-3.91.783-6.734 3.396-8.602c2.097-1.498 4.486-1.353 6.389-1.01c-2.091-1.58-2.669-3.433-2.823-4.193l-.399-1.965l1.121-1.663c6.457-9.58 11.781-21.354 14.609-32.304c2.906-11.251 2.02-17.226 1.134-18.356c-11.729-14.987-32.068-8.799-34.192-8.097l-.359.194l-1.8.335l-.922-.191c-2.542-.528-5.366-.82-8.393-.869c-4.756-.08-8.593 1.044-11.739 3.431l-2.183 1.655l-2.533-1.043c-5.412-2.213-21.308-6.662-29.696-.721c-4.656 3.298-6.777 9.76-6.305 19.207c.156 3.119 2.275 14.926 5.771 26.377c4.831 15.825 9.221 21.082 11.054 21.693c.32.108 1.15-.537 1.976-1.529a271 271 0 0 1 10.694-12.07l2.77-2.915l3.349 2.225c1.35.897 2.839 1.406 4.368 1.502l7.987-6.812l-1.157 11.808c-.026.265-.039.626.065 1.296l.348 2.238l-1.51 1.688l-.174.196l4.388 2.025z"/><path fill="#336791" d="M115.731 77.44c-13.925 2.873-14.882-1.842-14.882-1.842c14.703-21.816 20.849-49.51 15.545-56.287C101.924.823 76.875 9.566 76.457 9.793l-.135.024c-2.751-.571-5.83-.911-9.291-.967c-6.301-.103-11.08 1.652-14.707 4.402c0 0-44.684-18.408-42.606 23.151c.442 8.842 12.672 66.899 27.26 49.363c5.332-6.412 10.483-11.834 10.483-11.834c2.559 1.699 5.622 2.567 8.833 2.255l.25-.212c-.078.796-.042 1.575.1 2.497c-3.758 4.199-2.654 4.936-10.167 6.482c-7.602 1.566-3.136 4.355-.22 5.084c3.534.884 11.712 2.136 17.237-5.598l-.221.882c1.473 1.18 2.507 7.672 2.334 13.557s-.29 9.926.871 13.082c1.16 3.156 2.316 10.256 12.192 8.14c8.252-1.768 12.528-6.351 13.124-13.995c.422-5.435 1.377-4.631 1.438-9.49l.767-2.3c.884-7.367.14-9.743 5.225-8.638l1.235.108c3.742.17 8.639-.602 11.514-1.938c6.19-2.871 9.861-7.667 3.758-6.408"/><path fill="#fff" d="M75.957 122.307c-8.232 0-10.84-6.519-11.907-9.185c-1.562-3.907-1.899-19.069-1.551-31.503a1.59 1.59 0 0 1 1.64-1.55a1.594 1.594 0 0 1 1.55 1.639c-.401 14.341.168 27.337 1.324 30.229c1.804 4.509 4.54 8.453 12.275 6.796c7.343-1.575 10.093-4.359 11.318-11.46c.94-5.449 2.799-20.951 3.028-24.01a1.593 1.593 0 0 1 1.71-1.472a1.597 1.597 0 0 1 1.472 1.71c-.239 3.185-2.089 18.657-3.065 24.315c-1.446 8.387-5.185 12.191-13.794 14.037c-1.463.313-2.792.453-4 .454M31.321 90.466a6.7 6.7 0 0 1-2.116-.35c-5.347-1.784-10.44-10.492-15.138-25.885c-3.576-11.717-5.842-23.947-6.041-27.922c-.589-11.784 2.445-20.121 9.02-24.778c13.007-9.216 34.888-.44 35.813-.062a1.596 1.596 0 0 1-1.207 2.955c-.211-.086-21.193-8.492-32.768-.285c-5.622 3.986-8.203 11.392-7.672 22.011c.167 3.349 2.284 15.285 5.906 27.149c4.194 13.742 8.967 22.413 13.096 23.79c.648.216 2.62.873 5.439-2.517A245 245 0 0 1 45.88 73.046a1.596 1.596 0 0 1 2.304 2.208c-.048.05-4.847 5.067-10.077 11.359c-2.477 2.979-4.851 3.853-6.786 3.853m69.429-13.445a1.596 1.596 0 0 1-1.322-2.487c14.863-22.055 20.08-48.704 15.612-54.414c-5.624-7.186-13.565-10.939-23.604-11.156c-7.433-.16-13.341 1.738-14.307 2.069l-.243.099c-.971.305-1.716-.227-1.997-.849a1.6 1.6 0 0 1 .631-2.025c.046-.027.192-.089.429-.176l-.021.006l.021-.007c1.641-.601 7.639-2.4 15.068-2.315c11.108.118 20.284 4.401 26.534 12.388c2.957 3.779 2.964 12.485.019 23.887c-3.002 11.625-8.651 24.118-15.497 34.277c-.306.457-.81.703-1.323.703m.76 10.21c-2.538 0-4.813-.358-6.175-1.174c-1.4-.839-1.667-1.979-1.702-2.584c-.382-6.71 3.32-7.878 5.208-8.411c-.263-.398-.637-.866-1.024-1.349c-1.101-1.376-2.609-3.26-3.771-6.078c-.182-.44-.752-1.463-1.412-2.648c-3.579-6.418-11.026-19.773-6.242-26.612c2.214-3.165 6.623-4.411 13.119-3.716C97.6 28.837 88.5 10.625 66.907 10.271c-6.494-.108-11.82 1.889-15.822 5.93c-8.96 9.049-8.636 25.422-8.631 25.586a1.595 1.595 0 1 1-3.19.084c-.02-.727-.354-17.909 9.554-27.916C53.455 9.272 59.559 6.96 66.96 7.081c13.814.227 22.706 7.25 27.732 13.101c5.479 6.377 8.165 13.411 8.386 15.759c.165 1.746-1.088 2.095-1.341 2.147l-.576.013c-6.375-1.021-10.465-.312-12.156 2.104c-3.639 5.201 3.406 17.834 6.414 23.229c.768 1.376 1.322 2.371 1.576 2.985c.988 2.396 2.277 4.006 3.312 5.3c.911 1.138 1.7 2.125 1.982 3.283c.131.23 1.99 2.98 13.021.703c2.765-.57 4.423-.083 4.93 1.45c.997 3.015-4.597 6.532-7.694 7.97c-2.775 1.29-7.204 2.106-11.036 2.106m-4.696-4.021c.35.353 2.101.962 5.727.806c3.224-.138 6.624-.839 8.664-1.786c2.609-1.212 4.351-2.567 5.253-3.492l-.5.092c-7.053 1.456-12.042 1.262-14.828-.577a6 6 0 0 1-.54-.401c-.302.119-.581.197-.78.253c-1.58.443-3.214.902-2.996 5.105m-45.562 8.915c-1.752 0-3.596-.239-5.479-.71c-1.951-.488-5.24-1.957-5.19-4.37c.057-2.707 3.994-3.519 5.476-3.824c5.354-1.103 5.703-1.545 7.376-3.67c.488-.619 1.095-1.39 1.923-2.314c1.229-1.376 2.572-2.073 3.992-2.073c.989 0 1.8.335 2.336.558c1.708.708 3.133 2.42 3.719 4.467c.529 1.847.276 3.625-.71 5.006c-3.237 4.533-7.886 6.93-13.443 6.93m-7.222-4.943c.481.372 1.445.869 2.518 1.137c1.631.408 3.213.615 4.705.615c4.546 0 8.196-1.882 10.847-5.594c.553-.774.387-1.757.239-2.274c-.31-1.083-1.08-2.068-1.873-2.397c-.43-.178-.787-.314-1.115-.314c-.176 0-.712 0-1.614 1.009a41 41 0 0 0-1.794 2.162c-2.084 2.646-3.039 3.544-9.239 4.821c-1.513.31-2.289.626-2.674.835m12.269-7.36a1.596 1.596 0 0 1-1.575-1.354a8 8 0 0 1-.08-.799c-4.064-.076-7.985-1.82-10.962-4.926c-3.764-3.927-5.477-9.368-4.699-14.927c.845-6.037.529-11.366.359-14.229c-.047-.796-.081-1.371-.079-1.769c.003-.505.013-1.844 4.489-4.113c1.592-.807 4.784-2.215 8.271-2.576c5.777-.597 9.585 1.976 10.725 7.246c3.077 14.228.244 20.521-1.825 25.117c-.385.856-.749 1.664-1.04 2.447l-.257.69c-1.093 2.931-2.038 5.463-1.748 7.354a1.595 1.595 0 0 1-1.335 1.819zM42.464 42.26l.062 1.139c.176 2.974.504 8.508-.384 14.86c-.641 4.585.759 9.06 3.843 12.276c2.437 2.542 5.644 3.945 8.94 3.945h.068c.369-1.555.982-3.197 1.642-4.966l.255-.686c.329-.884.714-1.74 1.122-2.646c1.991-4.424 4.47-9.931 1.615-23.132c-.565-2.615-1.936-4.128-4.189-4.627c-4.628-1.022-11.525 2.459-12.974 3.837m9.63-.677c-.08.564 1.033 2.07 2.485 2.271c1.449.203 2.689-.975 2.768-1.539s-1.033-1.186-2.485-1.388s-2.691.092-2.768.656m2.818 2.826l-.407-.028c-.9-.125-1.81-.692-2.433-1.518c-.219-.29-.576-.852-.505-1.354c.101-.736.999-1.177 2.4-1.177c.313 0 .639.023.967.069c.766.106 1.477.327 2.002.62c.91.508.977 1.075.936 1.368c-.112.813-1.405 2.02-2.96 2.02m-2.289-2.732c.045.348.907 1.496 2.029 1.651l.261.018c1.036 0 1.81-.815 1.901-1.082c-.096-.182-.762-.634-2.025-.81a6 6 0 0 0-.821-.059c-.812 0-1.243.183-1.345.282m43.605-1.245c.079.564-1.033 2.07-2.484 2.272c-1.45.202-2.691-.975-2.771-1.539c-.076-.564 1.036-1.187 2.486-1.388c1.45-.203 2.689.092 2.769.655m-2.819 2.56c-1.396 0-2.601-1.086-2.7-1.791c-.115-.846 1.278-1.489 2.712-1.688c.316-.044.629-.066.93-.066c1.238 0 2.058.363 2.14.949c.053.379-.238.964-.739 1.492c-.331.347-1.026.948-1.973 1.079zm.943-3.013q-.416 0-.856.061c-1.441.201-2.301.779-2.259 1.089c.048.341.968 1.332 2.173 1.332l.297-.021c.787-.109 1.378-.623 1.66-.919c.443-.465.619-.903.598-1.052c-.028-.198-.56-.49-1.613-.49m3.965 32.843a1.594 1.594 0 0 1-1.324-2.483c3.398-5.075 2.776-10.25 2.175-15.255c-.257-2.132-.521-4.337-.453-6.453c.07-2.177.347-3.973.614-5.71c.317-2.058.617-4.002.493-6.31a1.595 1.595 0 1 1 3.186-.172c.142 2.638-.197 4.838-.525 6.967c-.253 1.643-.515 3.342-.578 5.327c-.061 1.874.178 3.864.431 5.97c.64 5.322 1.365 11.354-2.691 17.411a1.6 1.6 0 0 1-1.328.708"/></svg>
      `
		},
		{
			name: 'MongoDB',
			class:
				'h-32 w-32 text-green-500 transition grayscale hover:grayscale-0 duration-300 hover:border-green-300 hover:text-green-600',
			canvas: { gap: 6, speed: 25, noFocus: true, reducedMotion: false },
			colors: '#47A248,#40943E,#36802C',
			svg: `<svg xmlns="http://www.w3.org/2000/svg" width="3.68em" height="3.68em" viewBox="0 0 24 24" class="pointer-events-none absolute"><path fill="#089015" d="M17.193 9.555c-1.264-5.58-4.252-7.414-4.573-8.115c-.28-.394-.53-.954-.735-1.44c-.036.495-.055.685-.523 1.184c-.723.566-4.438 3.682-4.74 10.02c-.282 5.912 4.27 9.435 4.888 9.884l.07.05A74 74 0 0 1 11.91 24h.481a29 29 0 0 1 .51-3.07c.417-.296.604-.463.85-.693a11.34 11.34 0 0 0 3.639-8.464c.01-.814-.103-1.662-.197-2.218m-5.336 8.195s0-8.291.275-8.29c.213 0 .49 10.695.49 10.695c-.381-.045-.765-1.76-.765-2.405"/></svg>`
		},
		{
			name: 'Redis',
			class:
				'h-32 w-32 text-red-600 transition grayscale hover:grayscale-0 duration-300 hover:border-red-400 hover:text-red-700',
			canvas: { gap: 6, speed: 25, noFocus: true, reducedMotion: false },
			colors: '#DC382D,#C72E27,#AD2620',
			svg: `<svg xmlns="http://www.w3.org/2000/svg" width="3.68em" height="3.68em" viewBox="0 0 128 128" class="pointer-events-none absolute"><path fill="#a41e11" d="M121.8 93.1c-6.7 3.5-41.4 17.7-48.8 21.6s-11.5 3.8-17.3 1S13 98.1 6.3 94.9c-3.3-1.6-5-2.9-5-4.2V78s48-10.5 55.8-13.2c7.8-2.8 10.4-2.9 17-.5s46.1 9.5 52.6 11.9v12.5c0 1.3-1.5 2.7-4.9 4.4"/><path fill="#d82c20" d="M121.8 80.5C115.1 84 80.4 98.2 73 102.1s-11.5 3.8-17.3 1S13 85.4 6.3 82.2C-.3 79-.5 76.8 6 74.3c6.5-2.6 43.2-17 51-19.7c7.8-2.8 10.4-2.9 17-.5s41.1 16.1 47.6 18.5c6.7 2.4 6.9 4.4.2 7.9"/><path fill="#a41e11" d="M121.8 72.5C115.1 76 80.4 90.2 73 94.1c-7.4 3.8-11.5 3.8-17.3 1S13 77.4 6.3 74.2c-3.3-1.6-5-2.9-5-4.2V57.3s48-10.5 55.8-13.2c7.8-2.8 10.4-2.9 17-.5s46.1 9.5 52.6 11.9V68c0 1.3-1.5 2.7-4.9 4.5"/><path fill="#d82c20" d="M121.8 59.8c-6.7 3.5-41.4 17.7-48.8 21.6c-7.4 3.8-11.5 3.8-17.3 1S13 64.7 6.3 61.5s-6.8-5.4-.3-7.9c6.5-2.6 43.2-17 51-19.7c7.8-2.8 10.4-2.9 17-.5s41.1 16.1 47.6 18.5c6.7 2.4 6.9 4.4.2 7.9"/><path fill="#a41e11" d="M121.8 51c-6.7 3.5-41.4 17.7-48.8 21.6c-7.4 3.8-11.5 3.8-17.3 1C49.9 70.9 13 56 6.3 52.8c-3.3-1.6-5.1-2.9-5.1-4.2V35.9s48-10.5 55.8-13.2c7.8-2.8 10.4-2.9 17-.5s46.1 9.5 52.6 11.9v12.5c.1 1.3-1.4 2.6-4.8 4.4"/><path fill="#d82c20" d="M121.8 38.3C115.1 41.8 80.4 56 73 59.9c-7.4 3.8-11.5 3.8-17.3 1S13 43.3 6.3 40.1s-6.8-5.4-.3-7.9c6.5-2.6 43.2-17 51-19.7c7.8-2.8 10.4-2.9 17-.5s41.1 16.1 47.6 18.5c6.7 2.4 6.9 4.4.2 7.8"/><path fill="#fff" d="m80.4 26.1l-10.8 1.2l-2.5 5.8l-3.9-6.5l-12.5-1.1l9.3-3.4l-2.8-5.2l8.8 3.4l8.2-2.7L72 23zM66.5 54.5l-20.3-8.4l29.1-4.4z"/><ellipse cx="38.4" cy="35.4" fill="#fff" rx="15.5" ry="6"/><path fill="#7a0c00" d="m93.3 27.7l17.2 6.8l-17.2 6.8z"/><path fill="#ad2115" d="m74.3 35.3l19-7.6v13.6l-1.9.8z"/></svg>`
		},
		{
			name: 'Git',
			class:
				'h-32 w-32 text-orange-600 transition grayscale hover:grayscale-0 duration-300 hover:border-orange-400 hover:text-orange-700',
			canvas: { gap: 6, speed: 25, noFocus: true, reducedMotion: false },
			colors: '#F34F29,#E04425,#CB3D20',
			svg: `<svg xmlns="http://www.w3.org/2000/svg" width="3.68em" height="3.68em" viewBox="0 0 128 128" class="pointer-events-none absolute"><path fill="#f34f29" d="M124.737 58.378L69.621 3.264c-3.172-3.174-8.32-3.174-11.497 0L46.68 14.71l14.518 14.518c3.375-1.139 7.243-.375 9.932 2.314c2.703 2.706 3.461 6.607 2.294 9.993l13.992 13.993c3.385-1.167 7.292-.413 9.994 2.295c3.78 3.777 3.78 9.9 0 13.679a9.673 9.673 0 0 1-13.683 0a9.68 9.68 0 0 1-2.105-10.521L68.574 47.933l-.002 34.341a9.7 9.7 0 0 1 2.559 1.828c3.778 3.777 3.778 9.898 0 13.683c-3.779 3.777-9.904 3.777-13.679 0c-3.778-3.784-3.778-9.905 0-13.683a9.7 9.7 0 0 1 3.167-2.11V47.333a9.6 9.6 0 0 1-3.167-2.111c-2.862-2.86-3.551-7.06-2.083-10.576L41.056 20.333L3.264 58.123a8.133 8.133 0 0 0 0 11.5l55.117 55.114c3.174 3.174 8.32 3.174 11.499 0l54.858-54.858a8.135 8.135 0 0 0-.001-11.501"/></svg>`
		}
	];
</script>

<!-- TailwindCSS container for layout control -->
<div class="mx-auto flex flex-col justify-center opacity-90">
	<section class="justify-left relative h-screen items-center font-serif text-primary">
		<div
			class=" items-left m-auto ml-36 flex h-screen w-fit flex-col justify-center px-6 pt-16 text-left"
		>
			<Hero />
			<div class="mb-4">
				<h1 class=" font-sans text-8xl font-bold tracking-wider lg:text-7xl">Hi, I'm Steve J.</h1>
			</div>

			<!-- Tagline -->
			<p class="font-oswald mb-6 text-3xl lg:text-4xl">
				The developer for your <span>Data</span> projects.
			</p>

			<!-- Introduction -->
			<p class="mb-8 max-w-2xl font-sans text-lg text-secondary-foreground lg:text-xl">
				A developer who believes in blending functionality with form, elegance with efficiency.
			</p>

			<!-- Call-to-Action Button -->
			<Button variant="outline" class="w-32 rounded-md">View my work</Button>
		</div>
	</section>

	<!-- About and Skills Section -->
	<section
		class="mx-auto flex min-h-screen max-w-screen-lg items-center backdrop-blur-md bg-transparent justify-center backdrop:saturate-50"
	>
		<div class="mx-auto flex w-screen gap-16 backdrop:blur-md sm:flex-col lg:h-4/5 lg:flex-row">
			<Card.Root class="mb-16 max-w-lg overflow-hidden lg:w-1/2 ">
				<Card.Header>
					<Card.Title class=" text-4xl text-primary">>About Me</Card.Title>
					<Card.Description>Full-stack developer | 3D Artist</Card.Description>
				</Card.Header>
				<Card.Content>
					<section class="mb-12 leading-relaxed text-gray-200">
						<p>
							<span class="items-center font-semibold text-primary"
								><ScanFace class="inline-block h-6 w-6" /> Records:</span
							>
							Steve<br />
							<span class="font-semibold text-primary">Nationality:</span> Haitian<br />
							<span class="font-semibold text-primary">Languages:</span> English, French<br />
							<span class="font-semibold text-primary">Timezone:</span> Caribbean (GMT-5)<br />
							<span class="font-semibold text-primary">Role:</span> Freelancer, Software Engineer
						</p>
						<hr class="my-4 border-gray-600" />
						<h2 class="mb-4 text-xl font-bold">Background</h2>
						<p>
							Steve's journey began in a resource-constrained environment where a fascination with
							an old laptop evolved into a drive to create impactful digital solutions. Key skills
							developed include:
						</p>
						<ul class="ml-6 mt-2 list-disc">
							<li>Maximizing efficiency</li>
							<li>Developing creative workarounds</li>
						</ul>
						<p class="mt-2">
							These foundational skills are now applied to innovative software development projects.
						</p>
					</section>
				</Card.Content>

			</Card.Root>

			<div class="flex flex-col">
				<h2 class="text-2xl">-|TECHNOLOGIES USED|-</h2>
				<div class="m-2 grid grid-cols-3 justify-center grid-rows-3 gap-4">
					{#each cards as card}
						<Card.Root class={card.class}>
							<Canvas gap={card.canvas.gap} speed={card.canvas.speed} noFocus reducedMotion={false}>
								<!-- svelte-ignore a11y-no-static-element-interactions -->
								<CanvasItem colors={card.colors}>
									{@html card.svg}
								</CanvasItem>
							</Canvas>
						</Card.Root>
					{/each}
				</div>
			</div>
		</div>
	</section>

	<div class="w-full flex flex-col bg-black h-2/3  mx-auto justify-center items-center">
		<h3 class="mb-6 mt-4 text-2xl font-semibold text-teal-200">Services</h3>
		<div>
			<div class="flex flex-row gap-4 mb-16">
				<div class="flex flex-row">
					<div class="rounded-lg bg-card p-4 shadow-md">
						<h2 class="mb-2 text-lg font-bold text-card-foreground">Web Development</h2>
						<p class="mb-4 text-muted-foreground">Build custom web applications</p>
						<ul class="flex flex-wrap gap-2">
							<li class="rounded-full bg-accent px-2 py-1 text-sm text-accent-foreground">React</li>
							<li class="rounded-full bg-accent px-2 py-1 text-sm text-accent-foreground">
								Tailwindcss
							</li>
							<li class="rounded-full bg-accent px-2 py-1 text-sm text-accent-foreground">
								Node.js
							</li>
							<li class="rounded-full bg-accent px-2 py-1 text-sm text-accent-foreground">
								Express
							</li>
							<li class="rounded-full bg-accent px-2 py-1 text-sm text-accent-foreground">
								Sveltekit
							</li>
						</ul>
					</div>
					<div class="mb-4 flex justify-center">
						<img
							src="https://cdn.jsdelivr.net/npm/simple-icons@3.0.1/icons/react.svg"
							alt="Web Development"
							class="h-16 w-16 text-primary"
						/>
					</div>
				</div>
				<div class="flex flex-row">
					<div class="rounded-lg bg-card p-4 shadow-md">
						<h2 class="mb-2 text-lg font-bold text-card-foreground">SAAS Development</h2>
						<p class="mb-4 text-muted-foreground">Build robust backend APIs</p>
						<ul class="flex flex-wrap gap-2">
							<li class="rounded-full bg-accent px-2 py-1 text-sm text-accent-foreground">
								Python
							</li>
							<li class="rounded-full bg-accent px-2 py-1 text-sm text-accent-foreground">
								Django
							</li>
							<li class="rounded-full bg-accent px-2 py-1 text-sm text-accent-foreground">
								FastAPI
							</li>
							<li class="rounded-full bg-accent px-2 py-1 text-sm text-accent-foreground">
								Mongodb
							</li>
							<li class="rounded-full bg-accent px-2 py-1 text-sm text-accent-foreground">
								SQL databases
							</li>
						</ul>
					</div>
					<div class="mb-4 flex justify-center">
						<img
							src="https://cdn.jsdelivr.net/npm/simple-icons@3.0.1/icons/python.svg"
							alt="Backend Development"
							class="h-16 w-16"
						/>
					</div>
				</div>
				<div class="flex flex-row">
					<div class="rounded-lg bg-card p-4 shadow-md">
						<h2 class="mb-2 text-lg font-bold text-card-foreground">AI Agents</h2>
						<p class="mb-4 text-muted-foreground">Build conversational AI agents</p>
						<ul class="flex flex-wrap gap-2">
							<li class="rounded-full bg-accent px-2 py-1 text-sm text-accent-foreground">
								Pytorch
							</li>
							<li class="rounded-full bg-accent px-2 py-1 text-sm text-accent-foreground">
								Langchain
							</li>
							<li class="rounded-full bg-accent px-2 py-1 text-sm text-accent-foreground">
								LlamaIndex
							</li>
							<li class="rounded-full bg-accent px-2 py-1 text-sm text-accent-foreground">
								CrewAI
							</li>
							<li class="rounded-full bg-accent px-2 py-1 text-sm text-accent-foreground">
								Pandas
							</li>
						</ul>
					</div>
					<div class="mb-4 flex justify-center">
						<img
							src="https://cdn.jsdelivr.net/npm/simple-icons@3.0.1/icons/pytorch.svg"
							alt="AI Agents"
							class="h-16 w-16"
						/>
					</div>
				</div>
			</div>
		</div>
	</div>

	<!-- Experiences Section -->
	<section class="bg-zinc-950 py-12">
		<div class="mx-auto px-4">
			<div class="container py-4">
				{#each projects as project, i}
					{#if i == 0}
						<div class="sticky top-0 z-0 flex w-full flex-col items-center gap-2">
							<h2
								class="m-auto mt-20 w-full max-w-screen-lg text-5xl font-bold text-primary-foreground"
							>
								Projects
							</h2>
							<Card.Root
								class="card sticky top-0 mb-32 flex h-[520px] w-full flex-col rounded-2xl {project.style} shadow-xl transition-transform duration-300 ease-out"
							>
								<Card.Header class="ml-20 mr-10 mt-10 w-1/2">
									<Card.Title><Terminal class="h-24 w-24 " /> {project.title}</Card.Title>
									<Card.Description>{project.description}</Card.Description>
								</Card.Header>
								<Card.Content class="mb-10 ml-20 mr-10 w-1/2">
									<p>{project.content}</p>
								</Card.Content>
							</Card.Root>
						</div>
					{:else}
						<Card.Root
							class="card sticky top-[150px] flex h-[520px] z-[{i}] mb-32 w-full flex-col rounded-2xl {project.style} shadow-xl transition-transform duration-300 ease-out"
						>
							<Card.Header class="ml-20 mr-10 mt-10 w-1/2">
								<Card.Title
									><i class="h-20 w-20">
										<img src={project.logo} alt={project.description} />
									</i>
									<h2 class="my-5">{project.title}</h2></Card.Title
								>
								<Card.Description class="my-5">{project.description}</Card.Description>
							</Card.Header>
							<Card.Content class="mb-10 ml-20 mr-10 w-1/2">
								<p>{project.content}</p>
							</Card.Content>
						</Card.Root>
					{/if}
				{/each}
			</div>
		</div>
	</section>

	<!-- Subscribe to Newsletter Section -->
	<section class="flex h-screen flex-col justify-center bg-background text-center">
		<h2 class="mb-8 text-4xl font-bold text-teal-200">Stay Updated</h2>
		<p class="mb-6 text-lg text-gray-600">
			Subscribe to my newsletter to get updates on my latest projects and blog posts.
		</p>

		<form class="mx-auto max-w-lg">
			<div class="flex flex-col gap-4 md:flex-row">
				<input
					type="email"
					placeholder="Enter your email"
					class="w-full rounded-md border px-4 py-3 focus:outline-none focus:ring focus:ring-blue-300"
				/>
				<button
					type="submit"
					class="rounded-md bg-blue-500 px-6 py-3 font-semibold text-white transition hover:bg-blue-600"
				>
					Subscribe
				</button>
			</div>
		</form>
	</section>
</div>

<Footer />
