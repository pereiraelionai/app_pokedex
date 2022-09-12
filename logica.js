function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function getDados(pokemon) {
    let url = 'https://pokeapi.co/api/v2/pokemon/' + pokemon

    let xmlHttp = new XMLHttpRequest();
    xmlHttp.open('GET', url)

    xmlHttp.onreadystatechange = () => {
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
            let dadosJson = xmlHttp.responseText
            let pokemonJson = JSON.parse(dadosJson)
            console.log(pokemonJson)

            let tipo = ''
            for (let i in pokemonJson.types) {
                tipo = pokemonJson.types[i].type.name
            }

            if (document.getElementById('infoPokemon')) {
                document.getElementById('infoPokemon').remove()
            }
            //alterando a imagem
            let imagem = document.getElementById('imagem')
            imagem.src = "imagem/" + pokemonJson.name + ".png"

            //criando elementos HTML
            let divRow = document.createElement('div')
            divRow.id = 'infoPokemon'
            divRow.className = 'row'

            let divCol = document.createElement('div')
            divCol.id = 'divInfoPokemon'
            divCol.className = 'col-4 offset-md-4 mb-5 bg-light borda'

            let h3 = document.createElement('h3')
            h3.className = 'display-4 text-center'
            h3.id = 'nomePokemon'
            h3.innerHTML = capitalizeFirstLetter(pokemonJson.name)

            let h5 = document.createElement('h5')
            h5.className = 'text-center'
            h5.id = 'tipoPokemon'
            h5.innerHTML = 'Tipo: ' + capitalizeFirstLetter(tipo)

            divRow.appendChild(divCol)
            divCol.appendChild(h3)
            divCol.appendChild(h5)

            document.getElementById('exibir').appendChild(divRow)
        }
    }

    xmlHttp.send()
}