import React, { useState, useEffect } from 'react';

const Home = () => {
  const [versiculos, setVersiculos] = useState([]);
  const [busqueda, setBusqueda] = useState("");
  const [favs, setFavs] = useState([]);
  const [soloImportantes, setSoloImportantes] = useState(false);
  const idsImportantes = [1, 5, 8, 12, 17];

  useEffect(() => {
    fetch("https://bible-api.com/daniel%201")
      .then(res => res.json())
      .then(data => setVersiculos(data.verses));

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

  const filtrados = versiculos.filter(v => {
    const cumpleBusqueda = v.text.toLowerCase().includes(busqueda.toLowerCase());
    const esImportante = soloImportantes ? idsImportantes.includes(v.verse) : true;
    return cumpleBusqueda && esImportante;
  });

  return (
    <div className="main-app">
      <h1 className="titulo-pagina">Libro de Daniel 1</h1>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px', maxWidth: '800px', margin: '0 auto' }}>
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
            padding: '10px 20px',
            cursor: 'pointer',
            fontWeight: 'bold',
            whiteSpace: 'nowrap',
            transition: '0.3s'
          }}
        >
          {soloImportantes ? '✨ Ver Todos' : '🏆 Importantes'}
        </button>
      </div>

      <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
        <p style={{ textAlign: 'center', color: '#b8860b', fontWeight: 'bold' }}>
          {soloImportantes ? 'Mostrando los 5 versículos clave' : `Mostrando ${filtrados.length} versículos`}
        </p>

        {filtrados.map(v => {
          const esFavorito = favs.some(item => item.verse === v.verse);
          return (
            <div key={v.verse} className="verse-card">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #eee', marginBottom: '15px' }}>
                <h3 style={{ border: 'none', margin: 0 }}>Versículo {v.verse}</h3>
                {idsImportantes.includes(v.verse) && <span style={{ color: '#b8860b', fontSize: '0.8rem' }}>⭐ DESTACADO</span>}
              </div>
              <p>{v.text}</p>
              <button 
                className="btn-gold" 
                onClick={() => alternarFavorito(v)}
                style={{
                  backgroundColor: esFavorito ? '#b8860b' : 'transparent',
                  color: esFavorito ? '#ffffff' : '#b8860b'
                }}
              >
                {esFavorito ? '⭐ GUARDADO' : '☆ GUARDAR'}
              </button>
              <div style={{ clear: 'both' }}></div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Home;