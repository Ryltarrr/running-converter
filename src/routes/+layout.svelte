<script lang="ts">
	import { onMount } from 'svelte';
	import '../app.css';
	let { children } = $props();

	async function detectSWUpdate() {
		const registration = await navigator.serviceWorker.ready;

		registration.addEventListener('updatefound', () => {
			const newSW = registration.installing;
			newSW?.addEventListener('statechange', () => {
				if (newSW.state === 'installed') {
					if (confirm("Mise à jour disponible, voulez vous l'installer ?")) {
						newSW.postMessage({ type: 'SKIP_WAITING' });
						window.location.reload();
					}
				}
			});
		});
	}

	onMount(() => {
		detectSWUpdate();
	});
</script>

<div class="mx-2">
	<nav class="grid">
		<div class="grid grid-cols-4 gap-4 text-center">
			<a class="text-xl text-blue-800 underline" href="/">Vitesse en Allure</a>
			<a class="text-xl text-blue-800 underline" href="/speed-to-pace">Allure en Vitesse</a>
			<a class="text-xl text-blue-800 underline" href="/mas">VMA</a>
			<a class="text-xl text-blue-800 underline" href="/time-to-do-distance">
				Temps pour faire une distance
			</a>
		</div>
	</nav>
	<div>
		{@render children()}
	</div>
</div>
