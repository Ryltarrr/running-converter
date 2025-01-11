<script>
	import { possibleSeconds } from '$lib/pace';
	import { getFormattedSpeedFromPace } from '$lib/speed';

	let paceMinutes = $state(6);
	let paceSeconds = $state(0);

	let outputSpeed = $derived(getFormattedSpeedFromPace(paceMinutes, paceSeconds));
</script>

<main>
	<h1 class="my-5 text-3xl">Calcul de l'allure</h1>
	<div class="mb-5">
		<label for="pace-minutes" class="block">Minutes</label>
		<input id="pace-minutes" type="number" class="block w-full" bind:value={paceMinutes} />
	</div>

	<div class="mb-5">
		<label for="pace-seconds">Secondes</label>
		<select bind:value={paceSeconds} class="block w-full" id="pace-seconds">
			{#each possibleSeconds as second}
				<option>{second}</option>
			{/each}
		</select>
	</div>

	<div class="text-xl font-bold text-red-500">Vitesse : {outputSpeed} km/h</div>

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
