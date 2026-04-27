import React, { useState, useEffect } from 'react';

const Home = () => {
  const [versiculos, setVersiculos] = useState([]);
  const [busqueda, setBusqueda] = useState("");
  const [favs, setFavs] = useState([]);
  const [soloImportantes, setSoloImportantes] = useState(false);
  // Estado para controlar qué versículo muestra el detalle extra
  const [detalleActivo, setDetalleActivo] = useState(null);

  const idsImportantes = [1, 5, 8, 12, 17];

  useEffect(() => {
    fetch("https://bible-api.com/daniel%201")
      .then(res => res.json())
      .then(data => setVersiculos(data.verses))
      .catch(err => console.error("Error:", err));

    const guardados = JSON.parse(localStorage.getItem("favs_daniel")) || [];
    setFavs(guardados);
  }, []);

  const alternarFavorito = (v) => {
    let nuevosFavs;
    const existe = favs.find(item => item.verse === v.verse);
    if (existe) {
      nuevosFavs = favs.filter(item => item.verse !== v.verse);
    } else {
      nuevosFavs = [...favs, v];
    }
    setFavs(nuevosFavs);
    localStorage.setItem("favs_daniel", JSON.stringify(nuevosFavs));
  };

  // Función para abrir/cerrar la información extra
  const toggleDetalle = (id) => {
    setDetalleActivo(detalleActivo === id ? null : id);
  };

  const filtrados = versiculos.filter(v => {
    const cumpleBusqueda = v.text.toLowerCase().includes(busqueda.toLowerCase());
    const esImportante = soloImportantes ? idsImportantes.includes(v.verse) : true;
    return cumpleBusqueda && esImportante;
  });

  return (
    <div className="main-app">
      <h1 className="titulo-pagina">Libro de Daniel 1</h1>

      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        gap: '10px', 
        maxWidth: '800px', 
        margin: '0 auto 40px auto',
        padding: '0 20px'
      }}>
        <input 
          className="search-input"
          style={{ margin: '0', flex: 1 }}
          type="text" 
          placeholder="Buscar palabra sagrada..." 
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
        />
        
        <button 
          onClick={() => setSoloImportantes(!soloImportantes)}
          style={{
            backgroundColor: soloImportantes ? '#b8860b' : 'white',
            color: soloImportantes ? 'white' : '#b8860b',
            border: '2px solid #b8860b',
            borderRadius: '25px',
            padding: '12px 25px',
            cursor: 'pointer',
            fontWeight: 'bold',
            transition: '0.3s'
          }}
        >
          {soloImportantes ? '✨ Ver Todos' : '🏆 Importantes'}
        </button>
      </div>

      <div style={{ padding: '0 20px', maxWidth: '800px', margin: '0 auto' }}>
        {filtrados.map(v => {
          const esFavorito = favs.some(item => item.verse === v.verse);
          const mostrandoDetalle = detalleActivo === v.verse;
          
          return (
            <div key={v.verse} className="verse-card" style={{ transition: 'all 0.5s ease' }}>
              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center', 
                borderBottom: '1px solid rgba(184, 134, 11, 0.1)', 
                marginBottom: '15px',
                paddingBottom: '10px'
              }}>
                <h3 style={{ margin: 0 }}>Versículo {v.verse}</h3>
                <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                  {idsImportantes.includes(v.verse) && (
                    <span style={{ color: '#b8860b', fontSize: '0.75rem', fontWeight: 'bold' }}>⭐ DESTACADO</span>
                  )}
                  {/* BOTÓN DE DETALLE (LUPA) */}
                  <button 
                    onClick={() => toggleDetalle(v.verse)}
                    style={{
                      background: 'none',
                      border: 'none',
                      fontSize: '1.2rem',
                      cursor: 'pointer',
                      color: mostrandoDetalle ? '#b8860b' : '#333'
                    }}
                  >
                    {mostrandoDetalle ? '➖' : '🔍'}
                  </button>
                </div>
              </div>

              <p className="verse-text" style={{ fontSize: '1.1rem', lineHeight: '1.7', textAlign: 'justify' }}>
                {v.text}
              </p>

              {/* SECCIÓN DE INFORMACIÓN EXTRA DESPLEGABLE */}
              {mostrandoDetalle && (
                <div style={{ 
                  marginTop: '15px', 
                  padding: '15px', 
                  backgroundColor: '#fdfaf5', 
                  borderLeft: '4px solid #b8860b',
                  borderRadius: '4px',
                  animation: 'fadeIn 0.4s ease-out'
                }}>
                  <strong style={{ color: '#b8860b', display: 'block', marginBottom: '5px' }}>Comentario Teológico:</strong>
                  <p style={{ margin: 0, fontSize: '0.95rem', fontStyle: 'italic', color: '#444' }}>
                    Este pasaje subraya la resolución de Daniel de no contaminarse. 
                    En el contexto original, demuestra que la sabiduría proviene de la obediencia a principios divinos por encima de las presiones culturales de Babilonia.
                  </p>
                </div>
              )}

              <div style={{ 
                display: 'flex', 
                justifyContent: 'center', 
                marginTop: '20px' 
              }}>
                <button 
                  className="btn-gold" 
                  onClick={() => alternarFavorito(v)}
                  style={{
                    backgroundColor: esFavorito ? '#b8860b' : 'transparent',
                    color: esFavorito ? '#ffffff' : '#b8860b',
                    padding: '10px 40px',
                    float: 'none'
                  }}
                >
                  {esFavorito ? '⭐ GUARDADO' : '☆ GUARDAR'}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Home;