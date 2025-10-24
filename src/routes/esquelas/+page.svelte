<script>
  let searchQuery = '';
  
  const esquelas = [
    {
      id: 1,
      tipo: 'Académica',
      icono: '🏆',
      titulo: 'Excelencia Académica',
      estudiante: 'Diego Torres',
      curso: '3ro B',
      descripcion: 'Primer puesto en concurso de matemáticas regional',
      emitidoPor: 'Prof. Carlos Mendoza',
      fecha: '20 de octubre',
      color: 'cyan'
    },
    {
      id: 2,
      tipo: 'Comportamiento',
      icono: '❤️',
      titulo: 'Comportamiento Ejemplar',
      estudiante: 'Valentina Paz',
      curso: '4to B',
      descripcion: 'Demostró solidaridad y ayuda constante a sus compañeros durante todo el trimestre',
      emitidoPor: 'Prof. Ana López',
      fecha: '19 de octubre',
      color: 'gray'
    },
    {
      id: 3,
      tipo: 'Participación',
      icono: '⭐',
      titulo: 'Participación Destacada',
      estudiante: 'Sofía Martínez',
      curso: '5to A',
      descripcion: 'Liderazgo sobresaliente en proyecto de ciencias',
      emitidoPor: 'Prof. Roberto Silva',
      fecha: '18 de octubre',
      color: 'cyan'
    },
    {
      id: 4,
      tipo: 'Deportiva',
      icono: '🥇',
      titulo: 'Excelencia Deportiva',
      estudiante: 'Lucas Ramírez',
      curso: '2do A',
      descripcion: 'Medalla de oro en competencia atlética departamental',
      emitidoPor: 'Prof. María Gutiérrez',
      fecha: '17 de octubre',
      color: 'gray'
    },
    {
      id: 5,
      tipo: 'Especial',
      icono: '🎖️',
      titulo: 'Reconocimiento Especial',
      estudiante: 'Camila Flores',
      curso: '6to C',
      descripcion: 'Iniciativa comunitaria excepcional',
      emitidoPor: 'Directora General',
      fecha: '16 de octubre',
      color: 'gray'
    },
    {
      id: 6,
      tipo: 'Participación',
      icono: '⭐',
      titulo: 'Excelencia Académica',
      estudiante: 'Andrés Vega',
      curso: '1ro B',
      descripcion: 'Destacado en feria de ciencias nacional',
      emitidoPor: 'Prof. Luis Morales',
      fecha: '15 de octubre',
      color: 'cyan'
    }
  ];

  const categorias = [
    { nombre: 'Académica', cantidad: 2, icono: '🏆' },
    { nombre: 'Comportamiento', cantidad: 1, icono: '❤️' },
    { nombre: 'Participación', cantidad: 1, icono: '⭐' },
    { nombre: 'Deportiva', cantidad: 1, icono: '🥇' },
    { nombre: 'Especial', cantidad: 1, icono: '🎖️' }
  ];

  let categoriaSeleccionada = null;

  function filtrarEsquelas() {
    let filtradas = esquelas;
    
    if (categoriaSeleccionada) {
      filtradas = filtradas.filter(e => e.tipo === categoriaSeleccionada);
    }
    
    if (searchQuery) {
      filtradas = filtradas.filter(e => 
        e.estudiante.toLowerCase().includes(searchQuery.toLowerCase()) ||
        e.titulo.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    return filtradas;
  }

  function seleccionarCategoria(categoria) {
    categoriaSeleccionada = categoriaSeleccionada === categoria ? null : categoria;
  }
</script>

<div class="esquelas-container">
  <!-- Header -->
  <div class="header">
    <div>
      <h1 class="titulo">Esquelas y Reconocimientos</h1>
      <p class="subtitulo">Registra reconocimientos y felicitaciones estudiantiles</p>
    </div>
    <button class="btn-nueva">
      <span class="plus">+</span>
      Nueva Esquela
    </button>
  </div>

  <!-- Categorías -->
  <div class="categorias">
    {#each categorias as categoria}
      <button 
        class="categoria-card"
        class:active={categoriaSeleccionada === categoria.nombre}
        on:click={() => seleccionarCategoria(categoria.nombre)}
      >
        <div class="categoria-header">
          <span class="categoria-titulo">{categoria.nombre}</span>
          <span class="categoria-icono">{categoria.icono}</span>
        </div>
        <span class="categoria-cantidad">{categoria.cantidad}</span>
      </button>
    {/each}
  </div>

  <!-- Buscador -->
  <div class="buscador">
    <span class="icono-buscar">🔍</span>
    <input 
      type="text" 
      placeholder="Buscar por estudiante o tipo de reconocimiento..."
      bind:value={searchQuery}
    />
  </div>

  <!-- Grid de Esquelas -->
  <div class="esquelas-grid">
    {#each filtrarEsquelas() as esquela}
      <div class="esquela-card" class:cyan={esquela.color === 'cyan'}>
        <div class="esquela-header">
          <span class="esquela-icono">{esquela.icono}</span>
          <span class="esquela-fecha">{esquela.fecha}</span>
        </div>
        
        <h3 class="esquela-titulo">{esquela.titulo}</h3>
        
        <div class="esquela-info">
          <div class="info-item">
            <span class="info-label">Estudiante:</span>
            <span class="info-valor">{esquela.estudiante}</span>
          </div>
          <div class="info-item">
            <span class="info-label">Curso:</span>
            <span class="info-valor">{esquela.curso}</span>
          </div>
        </div>
        
        <p class="esquela-descripcion">{esquela.descripcion}</p>
        
        <div class="esquela-footer">
          <span class="emitido">Emitido por: <strong>{esquela.emitidoPor}</strong></span>
        </div>
      </div>
    {/each}
  </div>
</div>

<style>
  .esquelas-container {
    padding: 2rem;
    background-color: #f5f7fa;
    min-height: 100vh;
  }

  .header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 2rem;
  }

  .titulo {
    font-size: 1.875rem;
    font-weight: 600;
    color: #1e293b;
    margin: 0 0 0.5rem 0;
  }

  .subtitulo {
    color: #64748b;
    font-size: 0.95rem;
    margin: 0;
  }

  .btn-nueva {
    background: linear-gradient(135deg, #22d3ee 0%, #06b6d4 100%);
    color: white;
    border: none;
    padding: 0.75rem 1.5rem;
    border-radius: 8px;
    font-weight: 500;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 0.95rem;
    transition: transform 0.2s, box-shadow 0.2s;
    box-shadow: 0 4px 12px rgba(34, 211, 238, 0.3);
  }

  .btn-nueva:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 16px rgba(34, 211, 238, 0.4);
  }

  .plus {
    font-size: 1.25rem;
    font-weight: 300;
  }

  .categorias {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 1rem;
    margin-bottom: 2rem;
  }

  .categoria-card {
    background: white;
    border: 2px solid #e2e8f0;
    border-radius: 12px;
    padding: 1.25rem;
    cursor: pointer;
    transition: all 0.3s;
  }

  .categoria-card:hover {
    border-color: #22d3ee;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(34, 211, 238, 0.15);
  }

  .categoria-card.active {
    border-color: #22d3ee;
    background: linear-gradient(135deg, rgba(34, 211, 238, 0.1) 0%, rgba(6, 182, 212, 0.05) 100%);
  }

  .categoria-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 0.75rem;
  }

  .categoria-titulo {
    color: #64748b;
    font-size: 0.9rem;
    font-weight: 500;
  }

  .categoria-icono {
    font-size: 1.5rem;
    opacity: 0.7;
  }

  .categoria-cantidad {
    font-size: 2rem;
    font-weight: 600;
    color: #22d3ee;
  }

  .buscador {
    background: white;
    border: 2px solid #e2e8f0;
    border-radius: 12px;
    padding: 0.875rem 1.25rem;
    display: flex;
    align-items: center;
    gap: 0.75rem;
    margin-bottom: 2rem;
  }

  .icono-buscar {
    font-size: 1.25rem;
    color: #94a3b8;
  }

  .buscador input {
    border: none;
    outline: none;
    flex: 1;
    font-size: 0.95rem;
    color: #1e293b;
  }

  .buscador input::placeholder {
    color: #94a3b8;
  }

  .esquelas-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(380px, 1fr));
    gap: 1.5rem;
  }

  .esquela-card {
    background: white;
    border: 2px solid #e2e8f0;
    border-radius: 12px;
    padding: 1.5rem;
    transition: all 0.3s;
  }

  .esquela-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
  }

  .esquela-card.cyan {
    border-color: #22d3ee;
    background: linear-gradient(135deg, rgba(34, 211, 238, 0.05) 0%, white 100%);
  }

  .esquela-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;
  }

  .esquela-icono {
    font-size: 2rem;
    background: linear-gradient(135deg, #f0fdfa 0%, #ccfbf1 100%);
    width: 50px;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 10px;
  }

  .esquela-fecha {
    background: #22d3ee;
    color: white;
    padding: 0.375rem 0.875rem;
    border-radius: 20px;
    font-size: 0.8rem;
    font-weight: 500;
  }

  .esquela-titulo {
    font-size: 1.25rem;
    font-weight: 600;
    color: #1e293b;
    margin: 0 0 1rem 0;
  }

  .esquela-info {
    display: flex;
    gap: 1.5rem;
    margin-bottom: 1rem;
  }

  .info-item {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
  }

  .info-label {
    font-size: 0.8rem;
    color: #64748b;
  }

  .info-valor {
    font-weight: 600;
    color: #1e293b;
  }

  .esquela-descripcion {
    color: #475569;
    font-size: 0.9rem;
    line-height: 1.5;
    margin: 0 0 1rem 0;
  }

  .esquela-footer {
    padding-top: 1rem;
    border-top: 1px solid #e2e8f0;
  }

  .emitido {
    font-size: 0.85rem;
    color: #64748b;
  }

  .emitido strong {
    color: #1e293b;
  }
</style>