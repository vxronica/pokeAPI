document.addEventListener('DOMContentLoaded', function () {
    const urlParams = new URLSearchParams(window.location.search);
    const pokemonId = urlParams.get('id');
    const pokemonDetailsDiv = document.getElementById('pokemonDetails');

    if (pokemonId) {
        fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`)
            .then(response => response.json())
            .then(pokemon => {
                pokemonDetailsDiv.innerHTML = `
                    <div class="row">
                        <div class="col-md-4">
                            <img src="${pokemon.sprites.front_default}" class="img-fluid" alt="${pokemon.name}">
                        </div>
                        <div class="col-md-8">
                            <h2>${pokemon.name}</h2>
                            <p><strong>Type:</strong> ${pokemon.types.map(type => type.type.name).join(', ')}</p>
                            <p><strong>Abilities:</strong> ${pokemon.abilities.map(ability => ability.ability.name).join(', ')}</p>
                            <h5>Stats:</h5>
                            <ul>
                                ${pokemon.stats.map(stat => `<li>${stat.stat.name}: ${stat.base_stat}</li>`).join('')}
                            </ul>
                        </div>
                    </div>
                `;
            })
            .catch(error => {
                pokemonDetailsDiv.innerHTML = `<p class="text-danger">Error loading Pokémon details.</p>`;
            });
    } else {
        pokemonDetailsDiv.innerHTML = `<p class="text-danger">No Pokémon ID provided.</p>`;
    }
});