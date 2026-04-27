import React, { useState, useEffect } from 'react';

const Favoritos = () => {
  const [favs, setFavs] = useState([]);

  useEffect(() => {
    const datos = JSON.parse(localStorage.getItem("favs_daniel")) || [];
    setFavs(datos);
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      <h1 style={{ color: '#b8860b', textAlign: 'center' }}>Mis Favoritos</h1>
      {favs.map(v => (
        <div key={v.verse} className="verse-card">
          <h3>Daniel 1:{v.verse}</h3>
          <p>{v.text}</p>
        </div>
      ))}
    </div>
  );
};
export default Favoritos;