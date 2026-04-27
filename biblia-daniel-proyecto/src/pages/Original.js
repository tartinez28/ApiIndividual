import React, { useState, useEffect } from 'react';

const Original = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("https://bible-api.com/daniel%201")
      .then(res => res.json())
      .then(res => setData(res.verses));
  }, []);

  const palabrasClave = [
    { 
      termino: "Legumbres (Pulse)", 
      frecuencia: "Versículo 12", 
      significado: "Representa la fidelidad de Daniel a las leyes dietéticas judías frente a los manjares del rey." 
    },
    { 
      termino: "Sabiduría (Wisdom)", 
      frecuencia: "Versículo 17, 20", 
      significado: "Atribuida como un regalo directo de Dios, superando diez veces a los magos de Babilonia." 
    },
    { 
      termino: "Babilonia", 
      frecuencia: "Versículo 1", 
      significado: "El escenario del exilio, representando el mundo secular y el desafío a la fe de los jóvenes hebreos." 
    },
    { 
      termino: "Diez días (Ten days)", 
      frecuencia: "Versículo 12, 14", 
      significado: "El periodo de prueba para demostrar que la bendición divina es superior a la nutrición real." 
    }
  ];

  return (
    <div className="main-app" style={{ padding: '40px 20px' }}>
      <h1 className="titulo-pagina">Análisis Original</h1>
      
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>
        <p style={{ textAlign: 'center', color: '#b8860b', fontSize: '1.2rem', marginBottom: '40px' }}>
          Conceptos teológicos y lingüísticos destacados en Daniel 1
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
          {palabrasClave.map((item, index) => (
            <div key={index} className="verse-card" style={{ margin: '0' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #d4af37', marginBottom: '15px' }}>
                <h3 style={{ border: 'none', margin: 0 }}>{item.termino}</h3>
                <span style={{ color: '#b8860b', fontWeight: 'bold' }}>{item.frecuencia}</span>
              </div>
              <p style={{ fontStyle: 'italic', color: '#444' }}>
                {item.significado}
              </p>
            </div>
          ))}
        </div>

        <div className="verse-card" style={{ marginTop: '40px', textAlign: 'center', borderStyle: 'double', borderWidth: '3px' }}>
          <h2 style={{ color: '#b8860b' }}>Conclusión del Análisis</h2>
          <p>
            El capítulo 1 no es solo un relato histórico; es un estudio sobre la 
            <strong> integridad académica y espiritual</strong> en un entorno hostil.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Original;