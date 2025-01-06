<script lang="ts">
	import '../app.css';
	let { children } = $props();
</script>

<div class="mx-2">
	<nav>
		<ul>
			<li><a class="text-blue-800 underline" href="/">Vitesse en Allure</a></li>
			<li><a class="text-blue-800 underline" href="/speed-to-pace">Allure en Vitesse</a></li>
		</ul>
	</nav>
	<div>
		{@render children()}
	</div>
</div>
