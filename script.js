
const statesSelect = document.getElementById('states');
const citiesTable = document.querySelector('#citiesTable tbody');

document.addEventListener('DOMContentLoaded', function () {

    const urlIBGEStates = 'http://servicodados.ibge.gov.br/api/v1/localidades/estados?orderBy=nome';

    fetch(urlIBGEStates)
        .then(response => response.json())
        .then(data => {
            data.forEach(state => {
                const option = document.createElement('option');
                option.value = state.sigla;
                option.textContent = state.nome;
                statesSelect.appendChild(option);
            });
        });
});

/*statesSelect.addEventListener('change', function () {
    const selectedState = statesSelect.value;

    citiesTable.innerHTML = '';

    const loadingDiv = document.getElementById('loading');
    loadingDiv.classList.remove('hidden');

    const urlIBGECities = `http://servicodados.ibge.gov.br/api/v1/localidades/estados/${selectedState}/municipios?orderBy=nome`;
    fetch(urlIBGECities)
        .then(response => response.json())
        .then(data => {
            data.forEach(city => {

                const row = document.createElement('tr');
                row.innerHTML = `
                        <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">${city.nome}</td>
                        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${city.microrregiao?.nome}</td>
                        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${city.microrregiao?.mesorregiao?.nome}</td>
                        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${city.microrregiao?.mesorregiao?.UF?.regiao?.nome}</td>
                    `;
                citiesTable.appendChild(row);
            })
        })
        .finally(() => {
            loadingDiv.classList.add('hidden');
        });
});*/

statesSelect.addEventListener('change', function () {
    const selectedState = statesSelect.value;

    citiesTable.innerHTML = '';

    const loadingDiv = document.getElementById('loading');
    loadingDiv.classList.remove('hidden');

    const urlIBGECities = `http://servicodados.ibge.gov.br/api/v1/localidades/estados/${selectedState}/municipios?orderBy=nome`;
    
    const xhr = new XMLHttpRequest();
    xhr.open('GET', urlIBGECities);
    xhr.onload = function () {
        if (xhr.status === 200) {
            const data = JSON.parse(xhr.responseText);
            data.forEach(city => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">${city.nome}</td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${city.microrregiao?.nome}</td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${city.microrregiao?.mesorregiao?.nome}</td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${city.microrregiao?.mesorregiao?.UF?.regiao?.nome}</td>
                `;
                citiesTable.appendChild(row);
            });
        } else {
            console.error('Error fetching cities:', xhr.statusText);
        }
        loadingDiv.classList.add('hidden');
    };
    xhr.onerror = function () {
        console.error('Network error while fetching cities');
        loadingDiv.classList.add('hidden');
    };
    xhr.send();
});
