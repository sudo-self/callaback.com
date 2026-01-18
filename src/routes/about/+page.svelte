<script>
    import { quintOut } from 'svelte/easing';
    import { fade, draw, fly } from 'svelte/transition';
    import { expand } from './custom-transitions.js';
    import { inner, outer } from './shape.js';

    let visible = $state(true);
</script>

{#if visible}
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 103 124">
        <g out:fade={{ duration: 200 }} opacity="0.2">
            <path
                in:expand={{ duration: 400, delay: 1000, easing: quintOut }}
                style="stroke: #ff3e00; fill: #ff3e00; stroke-width: 50;"
                d={outer}
            />
            <path in:draw={{ duration: 1000 }} style="stroke:#ff3e00; stroke-width: 1.5" d={inner} />
        </g>
    </svg>

    <div class="centered" out:fly={{ y: -20, duration: 800 }}>
        {#each 'callaback.com' as char, i}
            <span 
                class="letter"
                in:fade|global={{ delay: 1000 + i * 150, duration: 800 }}
            >
                {char}
            </span>
        {/each}
    </div>
{/if}

<link href="https://fonts.googleapis.com/css?family=Overpass:100,400" rel="stylesheet" />

<style>
    svg {
        width: 100%;
        height: 100%;
    }

    path {
        fill: white;
        opacity: 1;
    }

    label {
        position: absolute;
        top: 1em;
        left: 1em;
    }

    .centered {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        font-family: 'Overpass';
        color: #676778;
        font-weight: 400;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        padding: 0 2rem;
        box-sizing: border-box;
    }

    .letter {
        font-size: clamp(2rem, 6vw, 4rem);
        margin: 0 0.08rem;
        letter-spacing: -0.02em;
        display: inline-block;
        will-change: filter;
    }

    /* Ensure first and last letters are fully visible */
    .centered {
        left: calc(50% + 0.1rem);
    }

    @media (max-width: 768px) {
        .letter {
            font-size: clamp(1.6rem, 5vw, 3rem);
            margin: 0 0.05rem;
            letter-spacing: -0.03em;
        }
        
        .centered {
            padding: 0 1.5rem;
            left: calc(50% + 0.05rem);
        }
    }

    @media (max-width: 480px) {
        .letter {
            font-size: clamp(1.2rem, 4vw, 2.2rem);
            margin: 0 0.03rem;
            letter-spacing: -0.04em;
        }
        
        .centered {
            padding: 0 1rem;
            left: calc(50% + 0.03rem);
        }
    }
</style>
