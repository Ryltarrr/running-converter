<script lang="ts">
	import { DEFAULT_DISTANCES, translateDistanceName } from '$lib/distance';
	import { Pace } from '$lib/pace';

	let time = $state<null | string>(null);
	let targetDistance = $state<null | number>(null);

	let paceOutput = $derived.by(() => {
		return Pace.fromDistanceAndTime(targetDistance, time);
	});

	let speedOutput = $derived(paceOutput.convertTo('speed'));
</script>

<main>
	<h1 class="my-5 text-3xl">Estimation de vitesse/rythme</h1>

	<p class="mb-5">
		À quelle vitesse ou rythme faut-il courir pour parcourir une distance donnée en un temps donné ?
	</p>

	<div class="mb-5">
		<label for="distance" class="block">Distance (km)</label>
		<input id="distance" type="number" class="block w-full" bind:value={targetDistance} />
		<div class="mt-1 flex gap-x-3 text-sm font-medium">
			{#each Object.entries(DEFAULT_DISTANCES) as [distanceName, distanceValue]}
				<button onclick={() => (targetDistance = distanceValue)}>
					{translateDistanceName(distanceName)}
				</button>
			{/each}
		</div>
	</div>

	<div class="mb-5">
		<label for="time" class="block">Temps (hh:mm)</label>
		<input id="time" type="time" class="block w-full" bind:value={time} />
	</div>

	<table class="w-full table-auto">
		<thead>
			<tr>
				<th class="text-left">Rythme</th>
				<th class="text-left">Vitesse</th>
			</tr>
		</thead>
		<tbody>
			<tr>
				<td>
					{paceOutput.formatted()}
				</td>
				<td>
					{speedOutput.formatted()}
				</td>
			</tr>
		</tbody>
	</table>
</main>
