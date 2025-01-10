<script>
	import { getPaceFromSpeed } from '$lib/helpers';

	let speed = $state(10);
	let outputPace = $derived(getPaceFromSpeed(speed));
</script>

<main>
	<h1 class="my-5 text-3xl">Calcul de la vitesse</h1>
	<div class="mb-5">
		<label for="speed" class="block">Vitesse</label>
		<input id="speed" type="number" class="block w-full" bind:value={speed} />
	</div>

	<div class="text-xl font-bold text-red-500">Allure : {outputPace} min/km</div>

	<p class="mt-5">
		L'allure et la vitesse sont étroitement liées mais ne cherchent pas à exprimer la même chose. La
		vitesse est idéale pour déterminer le nombre de kilomètres que l'on peut parcourir en un temps
		donné tandis que l'allure permet de déterminer le nombre de minutes qu'il faut pour parcourir
		une distance donnée. (<a
			class="text-blue-800 underline"
			target="_blank"
			href="https://fr.wikipedia.org/wiki/Allure_(course_%C3%A0_pied)">Source</a
		>)
	</p>
</main>
