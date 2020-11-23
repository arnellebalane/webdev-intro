const pokemonTemplate = Handlebars.compile(`
  <li>
    <img
      src="{{ sprites.other.official-artwork.front_default }}"
      alt="{{ name }}"
      width="475"
      height="475"
      loading="lazy"
    />
    <h1>{{ name }}</h1>
  </li>
`);

fetchPokemons('https://pokeapi.co/api/v2/pokemon');

async function fetchPokemons(url) {
  const response = await fetch(url);
  const data = await response.json();

  for (const pokemon of data.results) {
    const pokemonData = await fetchPokemon(pokemon.url);
    renderPokemon(pokemonData);
  }

  if (data.next) {
    fetchPokemons(data.next);
  }
}

async function fetchPokemon(url) {
  const response = await fetch(url);
  return response.json();
}

function renderPokemon(pokemon) {
  const pokemonRendered = pokemonTemplate(pokemon);
  $('ol').append(pokemonRendered);
}
