<script lang="ts">
	import { calculateInterval, formatSeconds } from '$lib/interval';
	import { possibleSeconds } from '$lib/pace';
	import { saveState } from '$lib/storage';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	let vma = $state<number | null>(data.speed);
	let intervalDistance = $state<number>(400);
	let repetitions = $state<number>(10);
	let vmaPercent = $state<number>(100);
	let restMinutes = $state<number>(1);
	let restSeconds = $state<number>(30);

	const distancePresets = [200, 400, 800, 1000, 1600];
	const repetitionPresets = [4, 6, 8, 10, 12];
	const percentPresets = [90, 95, 100, 105, 110];

	let result = $derived.by(() => {
		return calculateInterval({
			vmaSpeed: vma ?? 0,
			intervalDistance,
			repetitions,
			vmaPercent,
			restMinutes,
			restSeconds
		});
	});

	function handleVmaInput(event: Event & { currentTarget: EventTarget & HTMLInputElement }) {
		if (!event.target) return;
		const { value } = event.target as HTMLInputElement;
		saveState({ speed: Number(value) });
		vma = Number(value);
	}
</script>

<main>
	<h1 class="my-5 text-3xl">Calculateur d'intervalles</h1>

	<div class="mb-5">
		<label for="vma" class="block">VMA (km/h)</label>
		<input id="vma" type="number" class="block w-full" value={vma} oninput={handleVmaInput} />
	</div>

	<div class="mb-5">
		<label for="distance" class="block">Distance d'intervalle (m)</label>
		<input id="distance" type="number" class="block w-full" bind:value={intervalDistance} />
		<div class="mt-1 flex flex-wrap gap-2 text-sm font-medium">
			{#each distancePresets as preset}
				<button
					class="rounded bg-gray-200 px-2 py-1 hover:bg-gray-300"
					onclick={() => (intervalDistance = preset)}
				>
					{preset}m
				</button>
			{/each}
		</div>
	</div>

	<div class="mb-5">
		<label for="reps" class="block">Nombre de répétitions</label>
		<input id="reps" type="number" class="block w-full" bind:value={repetitions} />
		<div class="mt-1 flex flex-wrap gap-2 text-sm font-medium">
			{#each repetitionPresets as preset}
				<button
					class="rounded bg-gray-200 px-2 py-1 hover:bg-gray-300"
					onclick={() => (repetitions = preset)}
				>
					{preset}
				</button>
			{/each}
		</div>
	</div>

	<div class="mb-5">
		<label for="percent" class="block">Pourcentage VMA</label>
		<input id="percent" type="number" class="block w-full" bind:value={vmaPercent} />
		<div class="mt-1 flex flex-wrap gap-2 text-sm font-medium">
			{#each percentPresets as preset}
				<button
					class="rounded bg-gray-200 px-2 py-1 hover:bg-gray-300"
					onclick={() => (vmaPercent = preset)}
				>
					{preset}%
				</button>
			{/each}
		</div>
	</div>

	<div class="mb-5">
		<label class="block">Temps de récupération</label>
		<div class="flex gap-2">
			<div class="flex-1">
				<label for="restMin" class="block text-sm text-gray-600">Minutes</label>
				<input id="restMin" type="number" class="block w-full" bind:value={restMinutes} min="0" />
			</div>
			<div class="flex-1">
				<label for="restSec" class="block text-sm text-gray-600">Secondes</label>
				<select id="restSec" class="block w-full" bind:value={restSeconds}>
					{#each possibleSeconds as sec}
						<option value={sec}>{sec}</option>
					{/each}
				</select>
			</div>
		</div>
	</div>

	<h2 class="mb-3 text-xl font-semibold">Résultats</h2>
	<table class="w-full table-auto">
		<tbody>
			<tr>
				<td class="py-1 font-medium">Vitesse cible</td>
				<td class="py-1">{result.targetSpeed.formatted()}</td>
			</tr>
			<tr>
				<td class="py-1 font-medium">Allure cible</td>
				<td class="py-1">{result.targetPace}</td>
			</tr>
			<tr>
				<td class="py-1 font-medium">Temps par intervalle</td>
				<td class="py-1">{formatSeconds(result.intervalTime)}</td>
			</tr>
			<tr>
				<td class="py-1 font-medium">Temps de travail total</td>
				<td class="py-1">{formatSeconds(result.totalWorkTime)}</td>
			</tr>
			<tr>
				<td class="py-1 font-medium">Temps de récupération total</td>
				<td class="py-1">{formatSeconds(result.totalRestTime)}</td>
			</tr>
			<tr>
				<td class="py-1 font-medium">Durée totale</td>
				<td class="py-1">{formatSeconds(result.totalWorkoutTime)}</td>
			</tr>
			<tr>
				<td class="py-1 font-medium">Distance totale</td>
				<td class="py-1">{result.totalDistance} m ({(result.totalDistance / 1000).toFixed(1)} km)</td
				>
			</tr>
		</tbody>
	</table>
</main>
