<script lang="ts">
	import { onMount } from 'svelte';
	import '../app.css';
	import NavBar from '$lib/components/NavBar.svelte';
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

<div class="container mx-auto mb-12 px-2">
	<div>
		{@render children()}
	</div>
</div>
<NavBar />
