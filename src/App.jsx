import { useState, useEffect } from "react";
import "./App.css";

function App () {
  const [ searchTerm, setSearchTerm ] = useState('')
  const [ pokemon, setPokemon ] = useState(null);
  const [ loading, setLoading ] = useState(false);
  const [error, setError ] = useState(null);

useEffect (() => {
  if(!searchTerm) {
    setPokemon(null);
    setError(null);
    return;
  }
  const fetchPokemon = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${searchTerm.toLowerCase()}`
      )
      if (!response.ok) {
        throw new Error ("pokemon no encontrado");
      }
      const data = await response.json();
      setPokemon(data);
    } catch (error) {
      setPokemon(null);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };
  fetchPokemon();
}, [searchTerm]);
return (
  <div className="container">
    <h1> Buscador de pokemon </h1>
    <form onSubmit={(e) => e.preventDefault()}>
      <input
      type="text"
      placeholder="Escribe el nombre de tu pokemon"
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      />
    </form>
    { loading && <p>Cargando...</p>}
    { error && <p className="error">{error}</p>}

    {pokemon && (
      <div className="card">
        <h2>{pokemon.name.toUpperCase()}</h2>
        <img src={pokemon.sprites.front_default} alt={pokemon.name} />
        <p>Peso: {pokemon.weight}</p>
        <p>Altura: {pokemon.height}</p>

      </div>
    )}
  </div>
)
};

export default App;
