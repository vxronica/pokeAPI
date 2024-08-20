document.addEventListener('DOMContentLoaded', function () {
    const searchBtn = document.getElementById('searchBtn');
    const resultDiv = document.getElementById('result');

    searchBtn.addEventListener('click', function () {
        const pokemonName = document.getElementById('pokemonName').value.toLowerCase().trim();
        if (pokemonName) {
            fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
                .then(response => {
                    if (!response.ok) throw new Error('Pokémon not found');
                    return response.json();
                })
                .then(pokemon => {
                    resultDiv.innerHTML = `
                        <div class="card">
                            <img src="${pokemon.sprites.front_default}" class="card-img-top" alt="${pokemon.name}">
                            <div class="card-body">
                                <h5 class="card-title">${pokemon.name}</h5>
                                <p class="card-text">Type: ${pokemon.types.map(type => type.type.name).join(', ')}</p>
                                <a href="details.html?id=${pokemon.id}" class="btn btn-primary">View Details</a>
                            </div>
                        </div>
                    `;
                })
                .catch(error => {
                    resultDiv.innerHTML = `<p class="text-danger">${error.message}</p>`;
                });
        }
    });
});