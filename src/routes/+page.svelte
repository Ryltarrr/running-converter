<script>
	let paceMinutes = $state(6);
	let paceSeconds = $state(0);

	let outputSpeed = $derived((1 * 60) / (paceMinutes + paceSeconds / 60));
</script>

<main class="mx-2">
	<h1 class="my-5 text-3xl">Calcul de l'allure</h1>
	<div class="mb-5">
		<label for="pace-minutes" class="block">Minutes</label>
		<input id="pace-minutes" type="number" class="block w-full" bind:value={paceMinutes} />
	</div>

	<div class="mb-5">
		<label for="pace-seconds">Secondes</label>
		<input
			id="pace-seconds"
			type="number"
			min="0"
			max="59"
			class="block w-full"
			bind:value={paceSeconds}
		/>
	</div>

	<div class="text-xl font-bold text-red-500">Vitesse : {outputSpeed} km/h</div>

	<p class="mt-5">
		L'allure et la vitesse sont étroitement liées mais ne cherchent pas à exprimer la même chose. La
		vitesse est idéale pour déterminer le nombre de kilomètres que l'on peut parcourir en un temps
		donné tandis que l'allure permet de déterminer le nombre de minutes qu'il faut pour parcourir
		une distance donnée.
	</p>
</main>
