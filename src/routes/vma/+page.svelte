<script>
	import { getPaceFromSpeed } from '$lib/helpers';

	let vma = $state(0);
	let percent = $state(100);
	let outputSpeed = $derived(vma * (percent / 100));
	let outputPace = $derived(getPaceFromSpeed(outputSpeed));
</script>

<main>
	<h1 class="my-5 text-3xl">Calcul à partir de la VMA</h1>
	<div class="mb-5">
		<label for="pace-minutes" class="block">VMA</label>
		<input id="pace-minutes" type="number" class="block w-full" bind:value={vma} />
	</div>

	<div class="mb-5">
		<label for="pace-minutes" class="block">Pourcentage</label>
		<input
			id="pace-minutes"
			type="number"
			min="5"
			max="120"
			step="5"
			class="block w-full"
			bind:value={percent}
		/>
	</div>

	<div class="text-xl font-bold text-red-500">Vitesse : {outputSpeed.toFixed(1)} km/h</div>
	<div class="text-xl font-bold text-red-500">Allure : {outputPace} min/km</div>
</main>
