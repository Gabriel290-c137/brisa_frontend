<script lang="ts">
    import './contactos.css'
	import { onMount } from 'svelte';
	import { apiClient } from '$lib/services/api';
	import type { ContactosApoderadosResponseDTO } from '$lib/types/api';
	import { getIconSvg } from '$lib/components/svg';

	let loading = false;
	let error: string | null = null;
	let reporte: ContactosApoderadosResponseDTO | null = null;

	// Filtros
	let cursoId: number | undefined = undefined;
	let nivel: 'inicial' | 'primaria' | 'secundaria' | '' = '';
	let gestion: string = '';

	async function cargarReporte() {
		loading = true;
		error = null;
		
		try {
			const params: any = {};
			if (cursoId) params.curso_id = cursoId;
			if (nivel) params.nivel = nivel;
			if (gestion) params.gestion = gestion;

			reporte = await apiClient.getReporteContactosApoderados(params);
		} catch (err: any) {
			error = err.message || 'Error al cargar el reporte';
			console.error('Error:', err);
		} finally {
			loading = false;
		}
	}

	function limpiarFiltros() {
		cursoId = undefined;
		nivel = '';
		gestion = '';
		cargarReporte();
	}

	function exportarCSV() {
		if (!reporte) return;

		const headers = ['Estudiante ID', 'CI Estudiante', 'Estudiante', 'Tipo Apoderado', 'Nombre Apoderado', 'Teléfono'];
		const rows = reporte.contactos.map(contacto => [
			contacto.id_estudiante,
			contacto.estudiante_ci,
			contacto.estudiante_nombre,
			contacto.tipo_apoderado === 'padre' ? 'Padre' : 'Madre',
			contacto.apoderado_nombre,
			contacto.telefono
		]);

		const csvContent = [
			headers.join(','),
			...rows.map(row => row.map(cell => `"${cell}"`).join(','))
		].join('\n');

		const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
		const link = document.createElement('a');
		const url = URL.createObjectURL(blob);
		link.setAttribute('href', url);
		link.setAttribute('download', `contactos_apoderados_${new Date().toISOString().split('T')[0]}.csv`);
		link.style.visibility = 'hidden';
		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link);
	}

	onMount(() => {
		cargarReporte();
	});
</script>

<div class="reporte-container">
	<div class="reporte-header">
		<h2><span class="icon">{@html getIconSvg('phone')}</span> Contactos de Apoderados</h2>
		<p>Información de contacto de padres y madres registrados</p>
	</div>

	<div class="filtros-section">
		<div class="filtros-grid">
			<div class="form-group">
				<label for="curso">Curso (ID)</label>
				<input 
					type="number" 
					id="curso"
					bind:value={cursoId}
					placeholder="Ej: 5"
				/>
			</div>

			<div class="form-group">
				<label for="nivel">Nivel Educativo</label>
				<select id="nivel" bind:value={nivel}>
					<option value="">Todos los niveles</option>
					<option value="inicial">Inicial</option>
					<option value="primaria">Primaria</option>
					<option value="secundaria">Secundaria</option>
				</select>
			</div>

			<div class="form-group">
				<label for="gestion">Gestión (Año)</label>
				<input 
					type="text" 
					id="gestion"
					bind:value={gestion}
					placeholder="Ej: 2024"
				/>
			</div>
		</div>

		<div class="filtros-actions">
			<button class="btn btn-primary" on:click={cargarReporte} disabled={loading}>
				{#if loading}
					<span class="icon">{@html getIconSvg('clock')}</span> Cargando...
				{:else}
					<span class="icon">{@html getIconSvg('search')}</span> Buscar
				{/if}
			</button>
			<button class="btn btn-secondary" on:click={limpiarFiltros} disabled={loading}>
				<span class="icon">{@html getIconSvg('refresh')}</span> Limpiar Filtros
			</button>
		</div>
	</div>

	{#if error}
		<div class="error-message">
			<span class="icon">{@html getIconSvg('alert-triangle')}</span> {error}
		</div>
	{/if}

	{#if loading}
		<div class="loading-spinner">
			<div class="spinner"></div>
			<p>Cargando reporte...</p>
		</div>
	{:else if reporte}
		<div class="resultados-section">
			<div class="resultados-header">
				<div class="resultados-info">
					<h3>Total Contactos: {reporte.total}</h3>
				</div>

				<button 
					class="btn btn-export" 
					on:click={exportarCSV}
					disabled={!reporte.contactos.length}
				>
					<span class="icon">{@html getIconSvg('download')}</span> Exportar CSV
				</button>
			</div>

			{#if reporte.contactos.length === 0}
				<div class="empty-state">
					<p>No se encontraron contactos con los filtros aplicados</p>
				</div>
			{:else}
				<div class="table-container">
					<table class="contactos-table">
						<thead>
							<tr>
								<th>Estudiante</th>
								<th>CI Estudiante</th>
								<th>Tipo</th>
								<th>Nombre Apoderado</th>
								<th>Teléfono</th>
							</tr>
						</thead>
						<tbody>
							{#each reporte.contactos as contacto}
								<tr>
									<td class="nombre-estudiante">
										{contacto.estudiante_nombre}
										<span class="estudiante-id">ID: {contacto.id_estudiante}</span>
									</td>
									<td>{contacto.estudiante_ci}</td>
									<td>
										<span class="tipo-badge tipo-{contacto.tipo_apoderado}">
											{contacto.tipo_apoderado === 'padre' ? 'Padre' : 'Madre'}
										</span>
									</td>
									<td class="nombre-apoderado">{contacto.apoderado_nombre}</td>
									<td class="telefono">
										<a href="tel:{contacto.telefono}" class="telefono-link">
											<span class="icon">{@html getIconSvg('smartphone')}</span> {contacto.telefono}
										</a>
									</td>
								</tr>
							{/each}
						</tbody>
					</table>
				</div>
			{/if}
		</div>
	{/if}
</div>

