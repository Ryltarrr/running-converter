<script>
	let paceMinutes = $state(6);
	let paceSeconds = $state(0);

	let outputSpeed = $derived(((1 * 60) / (paceMinutes + paceSeconds / 60)).toFixed(2));
	let possibleSeconds = [
		0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25,
		26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49,
		50, 51, 52, 53, 54, 55, 56, 57, 58, 59
	];
</script>

<main class="mx-2">
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
