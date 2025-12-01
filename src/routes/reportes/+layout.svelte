<script lang="ts">
	import { page } from '$app/stores';
	import { getIconSvg } from '$lib/components/svg';
	
	const reportRoutes = [
		{ 
			path: '/reportes', 
			label: 'Listado General',
			icon: 'clipboard-list',
			description: 'Estudiantes por curso/nivel/gestión'
		},
		{ 
			path: '/reportes/apoderados', 
			label: 'Apoderados',
			icon: 'users',
			description: 'Con/sin apoderados registrados'
		},
		{ 
			path: '/reportes/contactos', 
			label: 'Contactos',
			icon: 'phone',
			description: 'Datos de contacto de apoderados'
		},
		{ 
			path: '/reportes/edades', 
			label: 'Distribución Etaria',
			icon: 'bar-chart',
			description: 'Estudiantes por rango de edad'
		},
		{ 
			path: '/reportes/historial', 
			label: 'Historial',
			icon: 'book',
			description: 'Historial de cursos por estudiante'
		}
	];

	$: currentPath = $page.url.pathname;
</script>

<div class="reportes-layout">
	<div class="reportes-header">
		<h1><span class="icon">{@html getIconSvg('trending-up')}</span> Reportes de Estudiantes</h1>
		<p class="subtitle">Generación y análisis de datos académicos</p>
	</div>

	<nav class="reportes-nav">
		{#each reportRoutes as route}
			<a 
				href={route.path} 
				class:active={currentPath === route.path}
				class="nav-card"
			>
				<span class="nav-icon">{@html getIconSvg(route.icon)}</span>
				<div class="nav-content">
					<span class="nav-label">{route.label}</span>
					<span class="nav-description">{route.description}</span>
				</div>
			</a>
		{/each}
	</nav>

	<main class="reportes-content">
		<slot />
	</main>
</div>

<style>
	.reportes-layout {
		max-width: 1400px;
		margin: 0 auto;
		padding: 2rem;
	}

	.reportes-header {
		margin-bottom: 2rem;
		text-align: center;
	}

	.reportes-header h1 {
		font-size: 2.5rem;
		color: #1a1a1a;
		margin-bottom: 0.5rem;
		font-weight: 700;
	}

	.subtitle {
		font-size: 1.1rem;
		color: #666;
		margin: 0;
	}

	.reportes-nav {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
		gap: 1rem;
		margin-bottom: 2.5rem;
	}

	.nav-card {
		display: flex;
		align-items: center;
		gap: 1rem;
		padding: 1rem 1.25rem;
		background: white;
		border: 2px solid #e5e7eb;
		border-radius: 12px;
		text-decoration: none;
		color: #374151;
		transition: all 0.2s ease;
		cursor: pointer;
	}

	.nav-card:hover {
		border-color: #3b82f6;
		background: #f9fafb;
		transform: translateY(-2px);
		box-shadow: 0 4px 12px rgba(59, 130, 246, 0.15);
	}

	.nav-card.active {
		border-color: #3b82f6;
		background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
		color: white;
		box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
	}

	.nav-icon {
		font-size: 2rem;
		flex-shrink: 0;
	}

	.nav-content {
		display: flex;
		flex-direction: column;
		gap: 0.25rem;
	}

	.nav-label {
		font-weight: 600;
		font-size: 1rem;
	}

	.nav-description {
		font-size: 0.875rem;
		opacity: 0.8;
	}

	.nav-card.active .nav-description {
		opacity: 0.9;
	}

	.reportes-content {
		background: white;
		border-radius: 16px;
		padding: 2rem;
		box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
		min-height: 400px;
	}

	@media (max-width: 768px) {
		.reportes-layout {
			padding: 1rem;
		}

		.reportes-header h1 {
			font-size: 1.875rem;
		}

		.reportes-nav {
			grid-template-columns: 1fr;
		}

		.reportes-content {
			padding: 1.5rem;
		}
	}
</style>
