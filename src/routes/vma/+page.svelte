<script>
	import { getPaceFromSpeed, getPercentOfVMA } from '$lib/helpers';

	let vma = $state(0);
	let percent = $state(100);
	let outputSpeed = $derived(getPercentOfVMA(vma, percent));
	let outputPace = $derived(getPaceFromSpeed(outputSpeed));
	let percentSteps = [
		5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80, 85, 90, 95, 100, 105, 110, 115,
		120
	];
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

	<h1 class="my-5 text-2xl">Tableau VMA</h1>

	<table class="w-full table-auto">
		<thead>
			<tr>
				<th class="text-left">Pourcentage</th>
				<th class="text-left">Allure</th>
				<th class="text-left">Vitesse</th>
			</tr>
		</thead>
		<tbody>
			{#each percentSteps as percentStep}
				<tr>
					<td>{percentStep}%</td>
					<td>{getPaceFromSpeed(getPercentOfVMA(vma, percentStep))} min/km</td>
					<td>{getPercentOfVMA(vma, percentStep).toFixed(2)} km/h</td>
				</tr>
			{/each}
		</tbody>
	</table>
</main>
