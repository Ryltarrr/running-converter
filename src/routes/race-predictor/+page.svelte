<script lang="ts">
	import { DEFAULT_DISTANCES, riegelTimes, translateDistanceName } from '$lib/distance';

	let time = $state<null | string>(null);
	let knownDistance = $state<null | number>(null);
	let targetDistance = $state<null | number>(null);

	let times = $derived.by(() => {
		return riegelTimes(knownDistance, time, targetDistance);
	});
</script>

<main>
	<h1 class="my-5 text-3xl">Estimation de course</h1>
	<details class="mb-5">
		<summary class="font-semibold">Explications</summary>
		<p class="border-l-2 border-l-gray-900 pl-2">
			Saisissez votre temps sur une distance connue pour estimer vos temps sur des distances de
			course ou bien une distance personnalisée. Ces estimations utilisent la <a
				href="https://en.wikipedia.org/wiki/Peter_Riegel#Race_time_prediction"
				target="_blank"
				class="text-blue-800 underline">formule de Riegel</a
			>.
		</p>
	</details>

	<div class="mb-5">
		<label for="time" class="block">Temps</label>
		<input id="time" type="time" class="block w-full" bind:value={time} />
	</div>

	<div class="mb-5">
		<label for="distance" class="block">Distance (km)</label>
		<input id="distance" type="number" class="block w-full" bind:value={knownDistance} />
		<div class="mt-1 flex gap-x-3 text-sm font-medium">
			{#each Object.entries(DEFAULT_DISTANCES) as [distanceName, distanceValue]}
				<button onclick={() => (knownDistance = distanceValue)}>
					{translateDistanceName(distanceName)}
				</button>
			{/each}
		</div>
	</div>

	<div class="mb-5">
		<label for="distance" class="block">Distance cible (km)</label>
		<input id="distance" type="number" class="block w-full" bind:value={targetDistance} />
		<div class="mt-1 flex gap-x-3 text-sm font-medium">
			{#each Object.entries(DEFAULT_DISTANCES) as [distanceName, distanceValue]}
				<button onclick={() => (targetDistance = distanceValue)}>
					{translateDistanceName(distanceName)}
				</button>
			{/each}
		</div>
	</div>

	<table class="w-full table-auto">
		<thead>
			<tr>
				<th class="text-left">Distance</th>
				<th class="text-left">Temps</th>
			</tr>
		</thead>
		<tbody>
			{#each Object.entries(times) as [distance, time]}
				<tr>
					<td>{distance}</td>
					<td>{time}</td>
				</tr>
			{:else}
				<tr>
					<td>-</td>
					<td>-</td>
				</tr>
			{/each}
		</tbody>
	</table>
</main>
