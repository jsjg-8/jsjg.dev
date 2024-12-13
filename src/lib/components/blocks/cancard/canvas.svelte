<script lang="ts">
    import { setCanvasOptions } from './context';
    import type { CanvasOptions } from './types';

    export let gap: number = 5;
    export let speed: number = 35;
    export let noFocus: boolean = false;
    export let reducedMotion: boolean = false;

    const options: CanvasOptions = { gap, speed, noFocus, reducedMotion };
    setCanvasOptions(options);

</script>

<div class="canvas-container">
    <slot />
</div>

<style>
    .canvas-container {
        position: relative;
        overflow: hidden;
        background: radial-gradient(circle, var(--bg, #09090b), transparent 45%);
        display: grid;
        place-items: center;
        width: 100%;
        height: 100%;
    }
</style>