<!-- Header.svelte -->
<script lang="ts">
	import type { HTMLAttributes } from "svelte/elements";
	import { cn } from "$lib/utils.js";  // Utility for class merging

	type $$Props = HTMLAttributes<HTMLElement>;  // Type for HTML props

	// Props
	export let className: $$Props["class"] = undefined;

	export { className as class };
</script>

<!-- Header Component Layout -->
<header class={cn("border-y bg-background", className)} {...$$restProps}>
	<div class="container mx-auto px-4 py-4">
		<div class="flex justify-between items-center">

			<!-- Left Slot for custom content like nav or logo -->
			<div class="flex-1">
				<slot name="left" />
			</div>

			<!-- Middle Slot for centered content like a logo -->
			<div class="text-center flex-1">
				<slot name="middle"></slot>
			</div>

			<!-- Right Slot for custom content like CTA buttons -->
			<div class="flex-1 text-right">
				<slot name="right" />
			</div>
		</div>

		<!-- Mobile Navigation Section -->
		<div class="md:hidden mt-4">
			<ul class="space-y-2">
				<slot name="nav"></slot>
			</ul>
		</div>
	</div>
</header>
