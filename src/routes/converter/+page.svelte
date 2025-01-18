<script lang="ts">
	import { Pace, possibleSeconds } from '$lib/pace';
	import { Speed } from '$lib/speed';

	let speedInput = $state(0);
	let paceMinutesInput = $state(0);
	let paceSecondsInput = $state(0);

	function handleSpeedInput(event: Event & { currentTarget: EventTarget & HTMLInputElement }) {
		if (!event.target) return;
		const { value } = event.target as HTMLInputElement;
		const pace = new Speed(Number(value)).convertTo('pace') as Pace;
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
</main>
