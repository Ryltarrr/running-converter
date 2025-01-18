<script lang="ts">
	import { Menu, X } from 'lucide-svelte';
	let isOpen = $state(false);

	const menuItems = [
		{ label: 'Convertisseur', link: '/' },
		{ label: 'VMA', link: '/mas' },
		{ label: 'Temps pour faire une distance', link: '/time-to-do-distance' }
	];
</script>

<button
	onclick={() => (isOpen = !isOpen)}
	class="p-2 text-gray-600 hover:text-gray-800 focus:outline-none {isOpen && 'invisible'}"
>
	<Menu size={32} />
</button>

<nav
	class="absolute left-0 top-0 h-full w-full transform transition-all duration-200 ease-in-out {isOpen
		? 'translate-x-0 opacity-100'
		: 'pointer-events-none -translate-x-8 opacity-0'}"
>
	<div class="grid h-full grid-cols-3 opacity-100">
		<div class="col-span-2 h-full bg-white px-2 shadow-lg md:col-span-1">
			<button
				onclick={() => (isOpen = !isOpen)}
				class="py-2 text-gray-600 hover:text-gray-800 focus:outline-none"
			>
				<X size={32} />
			</button>
			<ul class="grid grid-cols-1 gap-3">
				{#each menuItems as menuItem}
					<li>
						<a
							class="text-xl text-blue-800 underline"
							onclick={() => (isOpen = false)}
							href={menuItem.link}
						>
							{menuItem.label}
						</a>
					</li>
				{/each}
			</ul>
		</div>
		<div
			class="md:col-span-2"
			role="button"
			tabindex="0"
			onclick={() => (isOpen = false)}
			onkeyup={(event) => {
				if (event.key === 'Escape') {
					isOpen = false;
				}
			}}
		></div>
	</div>
</nav>
