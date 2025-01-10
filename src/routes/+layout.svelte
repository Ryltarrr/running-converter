<script lang="ts">
	import '../app.css';
	let { children } = $props();
</script>

<div class="mx-2">
	<nav class="grid">
		<div class="grid grid-cols-4 gap-4 text-center">
			<a class="text-xl text-blue-800 underline" href="/">Vitesse en Allure</a>
			<a class="text-xl text-blue-800 underline" href="/speed-to-pace">Allure en Vitesse</a>
			<a class="text-xl text-blue-800 underline" href="/vma">VMA</a>
			<a class="text-xl text-blue-800 underline" href="/time-to-do-distance">
				Temps pour faire une distance
			</a>
		</div>
	</nav>
	<div>
		{@render children()}
	</div>
</div>
