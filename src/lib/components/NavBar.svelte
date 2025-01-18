<script lang="ts">
	import { Menu, X } from 'lucide-svelte';
	let isOpen = $state(false);

	const menuItems = [
		{ label: 'Convertisseur', link: '/' },
		{ label: 'VMA', link: '/mas' },
		{ label: 'Estimation de course', link: '/race-predictor' }
	];
</script>

<div class="fixed bottom-0 left-0 right-0 h-fit bg-white shadow-lg shadow-gray-500">
	<nav class="p-2 {isOpen ? '' : 'hidden'}">
		<div class="px-2">
			<ul class="grid grid-cols-1 gap-2">
				{#each menuItems as menuItem}
					<li>
						<a
							class="block text-xl text-gray-900 hover:underline"
							onclick={() => (isOpen = false)}
							href={menuItem.link}
						>
							{menuItem.label}
						</a>
					</li>
				{/each}
			</ul>
		</div>
	</nav>
	<div class="flex justify-end border-t">
		<button onclick={() => (isOpen = !isOpen)} class="p-2 text-gray-900 focus:outline-none">
			{#if isOpen}
				<X size={32} />
			{:else}
				<Menu size={32} />
			{/if}
		</button>
	</div>
</div>
