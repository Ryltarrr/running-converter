<script lang="ts">
	import { getPercentOfMAS } from '$lib/mas';
	import { getPaceFromSpeed } from '$lib/pace';
	import { saveState } from '$lib/storage';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	let mas = $state<number | null>(data.speed);
	let percent = $state(100);
	let outputSpeed = $derived(getPercentOfMAS(mas, percent));
	let outputPace = $derived(getPaceFromSpeed(outputSpeed));
	let percentSteps = [
		5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80, 85, 90, 95, 100, 105, 110, 115,
		120
	];

	function getBackgroundColor(percentStep: number) {
		if (percentStep <= 25) {
			return 'bg-blue-300';
		} else if (percentStep <= 50) {
			return 'bg-green-300';
		} else if (percentStep <= 75) {
			return 'bg-yellow-300';
		} else if (percentStep <= 100) {
			return 'bg-orange-300';
		} else {
			return 'bg-red-300';
		}
	}

	function handleInput(event: Event & { currentTarget: EventTarget & HTMLInputElement }) {
		if (!event.target) return;
		const { value } = event.target as HTMLInputElement;
		saveState({ speed: Number(value) });
		mas = Number(value);
	}
</script>

<main>
	<h1 class="my-5 text-3xl">Calcul à partir de la VMA</h1>
	<div class="mb-5">
		<label for="mas" class="block">VMA</label>
		<input id="mas" type="number" class="block w-full" value={mas} oninput={handleInput} />
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
				<tr class={getBackgroundColor(percentStep)}>
					<td>{percentStep}%</td>
					<td>{getPaceFromSpeed(getPercentOfMAS(mas, percentStep))} min/km</td>
					<td>{getPercentOfMAS(mas, percentStep).toFixed(2)} km/h</td>
				</tr>
			{/each}
		</tbody>
	</table>
</main>
