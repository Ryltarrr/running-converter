<script lang="ts">
	import { Pace, possibleSeconds } from '$lib/pace';
	import { Speed } from '$lib/speed';
	import { DEFAULT_DISTANCES, timeToDoDistance, translateDistanceName } from '$lib/distance';

	let speedInput = $state(0);
	let paceMinutesInput = $state(0);
	let paceSecondsInput = $state(0);
	let customDistance = $state<number | null>(null);

	let raceTimes = $derived.by(() => {
		if (speedInput <= 0) return {};
		return timeToDoDistance(new Speed(speedInput), customDistance);
	});

	function handleSpeedInput(event: Event & { currentTarget: EventTarget & HTMLInputElement }) {
		if (!event.target) return;
		const { value } = event.target as HTMLInputElement;
		speedInput = Number(value);
		const pace = new Speed(speedInput).convertTo('pace') as Pace;
		const { minutes, seconds } = pace.asMinutesAndSeconds();
		paceMinutesInput = minutes;
		paceSecondsInput = seconds;
	}

	function handlePaceInput(
		event: Event & { currentTarget: EventTarget & (HTMLInputElement | HTMLSelectElement) }
	) {
		if (!event.target) return;
		const { value, id } = event.target as HTMLInputElement;
		if (id === 'pace-minutes') {
			paceMinutesInput = Number(value);
		} else {
			paceSecondsInput = Number(value);
		}
		const speed = Pace.fromMinutesAndSeconds(paceMinutesInput, paceSecondsInput).convertTo(
			'speed'
		) as Speed;
		speedInput = Math.round(speed.value * 10) / 10;
	}
</script>

<main>
	<h1 class="my-5 text-3xl">Convertisseur</h1>
	<div class="mb-5">
		<label for="speed" class="block text-xl font-semibold">Vitesse (km/h)</label>
		<input
			id="speed"
			type="number"
			class="block w-full"
			value={speedInput}
			oninput={handleSpeedInput}
		/>
	</div>

	<span class="text-xl font-semibold">Allure (min/km)</span>
	<div class="mb-5 grid grid-cols-2 gap-4">
		<div class="block">
			<label for="pace-minutes" class="block">Minutes</label>
			<input
				id="pace-minutes"
				type="number"
				class="block w-full"
				value={paceMinutesInput}
				oninput={handlePaceInput}
			/>
		</div>
		<div>
			<label for="pace-seconds">Secondes</label>
			<select
				value={paceSecondsInput}
				oninput={handlePaceInput}
				class="block w-full"
				id="pace-seconds"
			>
				{#each possibleSeconds as second}
					<option>{second}</option>
				{/each}
			</select>
		</div>
	</div>

	<h2 class="mb-3 text-xl font-semibold">Temps de course</h2>
	<div class="mb-5">
		<label for="custom-distance" class="block">Distance personnalisée (km)</label>
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
			{#each Object.entries(raceTimes) as [distance, time]}
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
