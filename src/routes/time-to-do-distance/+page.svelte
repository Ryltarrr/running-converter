<script lang="ts">
	import {
		getSpeedFromPace,
		possibleSeconds,
		timeToDoDistance,
		translateDistanceName
	} from '$lib/helpers';

	let selected = $state<'speed' | 'pace'>('speed');
	let speed = $state(10);
	let paceMinutes = $state(6);
	let paceSeconds = $state(0);
	let customDistance = $state<number | null>(null);
	let times = $derived.by(() => {
		if (selected !== 'speed') {
			return timeToDoDistance(getSpeedFromPace(paceMinutes, paceSeconds), customDistance);
		} else {
			return timeToDoDistance(speed, customDistance);
		}
	});
</script>

<main>
	<h1 class="my-5 text-3xl">Temps pour faire une distance</h1>
	<div class="mb-5">
		<div>
			<input type="radio" id="red" value="speed" bind:group={selected} />
			<label for="red">Vitesse</label>
		</div>
		<div>
			<input type="radio" id="blue" value="pace" bind:group={selected} />
			<label for="blue">Allure</label>
		</div>
	</div>

	{#if selected === 'speed'}
		<div class="mb-5">
			<label for="speed" class="block">Vitesse</label>
			<input id="speed" type="number" class="block w-full" bind:value={speed} />
		</div>
	{:else}
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
	{/if}

	<div class="mb-5">
		<label for="custom-distance" class="block">Distance en km</label>
		<input id="custom-distance" type="number" class="block w-full" bind:value={customDistance} />
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
					<td>{translateDistanceName(distance)}</td>
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
