<script lang="ts">
	type Path = {
		label: string;
		path: string;
	};
	export let paths: Path[];
</script>

<nav aria-label="Main navigation">
	<ul class="flex w-max flex-wrap space-x-4 -translate-y-0.5 sm:space-x-2 md:space-x-4 lg:space-x-6 ">
		{#each paths as path}
			<li>
				<a
					href={path.path}
					class="relative overflow-hidden text-foreground focus:outline-none focus:bg-gray-300 focus:bg-opacity-10 focus:text-primary focus:ring-offset-2 focus:underline focus:underline-offset-2"
					aria-label={path.label}
					tabindex="0"
				>
					<span class="word ">
						{#each path.label as letter, i}
							<span class="letter font-bold" style="--index: {i}; --total: {path.label.length}">
								{letter}
							</span>
						{/each}
					</span>
				</a>
			</li>
		{/each}
	</ul>
</nav>

<style>
	.word {
		display: inline-block;
		overflow: hidden;
		font-size: 0;
		letter-spacing: 1px;
	}

	.letter {
		/* the color  */
		--c: #1095c1;
		/* the height */
		--h: 2em;
		/* the delay */
		--d: 10ms;
		/* right padding */
		--p: 0.1em;

		display: inline-block;
		font-size: 1.125rem; /* Reset font size */
		line-height: var(--h);
		color: #0000;
		text-transform: uppercase;
		overflow: hidden;
		text-shadow:
			0 calc(-1 * var(--h) * var(--_i, 0)) var(--c),
			0 calc(var(--h) * (1 - var(--_i, 0))) #fff;
		transition:
			0.3s ease-in-out,
			background-size 0.3s 0.3s ease-in-out;
	}

	.word:hover .letter {
		--_i: 1;
		transition-delay: calc(var(--d) * var(--index));
	}
</style>
