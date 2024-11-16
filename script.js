

let map;
let geocoder;
let markers = [];

// Lista de endereços (exemplo)
const addresses = [
"Rua José Gabriotti, 41 - Vila Nova Sorocaba, SP, 18070700",
"Rua José Calixto, 71 - Jardim Itapuã, SP, 18071275",
"Rua Pedro Álvares Cabral, 522 - Vila Progresso, SP, 18090505",
"Rua Heraclito Oliveira de Jesus, 30 - Jardim São Guilherme, SP, 18074666",
"Rua Goiacoz, 63 - Vila Progresso, SP, 18090590",
"Rua Arlindo Previtali, 450 - CASA 36 - Central Parque Sorocaba, SP, 18051280",
"Rua Manlio Ângelo Kain, 144 - Cond. Royal Park - Ibiti Royal Park, SP, 18087005",
"Rua Ernesto Testa, 190 - CASA 09 - Ipanema Ville, SP, 18071054",
"Alameda das Sibipirunas, 331 - Condomínio Portal de Itu, SP, 13301625",
"Avenida Hollingsworth, 565 - Iporanga, SP, 18087105",
"Rua Capitão David Joaquim Augusto, 270 - Vila da Fonte, SP, 18070145",
"Rua José Brides, 86 - Jardim São Camilo, SP, 18078160",
"Rua Neide Aparecida Stancatti Marques, 189 - Jardim Siriema, SP, 18075775",
"Rua Professora Maria Luiza Gonçalves, 112 - Jardim Portal do Itavuvu, SP, 18079001",
"Rua Azel de Arruda, 916 - Parque São Bento, SP, 18072050",
"Rua João Ribeiro de Barros, 1850 - CASA 137 - Vila Odim Antão, SP, 18090602",
"Rua Azel de Arruda, 137 - Parque São Bento, SP, 18072050",
"Avenida Hollingsworth, 565 - Iporanga, SP, 18087105",
"Avenida Hollingsworth, 565 - Iporanga, SP, 18087105",
"Avenida Hollingsworth, 565 - Iporanga, SP, 18087105",
"Rua Alice Ayres de Moraes, 252 - Jardim Josane, SP, 18087292",
"Rua Demercindo Alves da Silva, 42 - Torre Cancun apto 4 - Jardim Piratininga, SP, 18016085",
"Avenida Pereira da Silva, 1400 - Jardim Santa Rosália, SP, 18095340",
"Rua Marcos Leão Mendes, 299 - Jardim Santa Catarina, SP, 18079460",
"Avenida Hollingsworth, 565 - Iporanga, SP, 18087105",
"Avenida Hollingsworth, 565 - Iporanga, SP, 18087105",
"Avenida Elias Maluf, 2695 - Casa 663 - Wanel Ville, SP, 18055215",
"Avenida General Carneiro, 803 - Vila Lucy, SP, 18043003",
"Rua Doutor Achiles de Almeida, 164 - Vila Santa Rita, SP, 18080080",
"Rua Treze de Maio, 71 - Centro, SP, 18035150",
"Rua Gérson Vieira Neves, 277 - Jardim Dois Corações, SP, 18085771"
];

// Inicializar o mapa
function initMap() {
    map = new google.maps.Map(document.getElementById("map"), {
        center: { lat: -23.55052, lng: -46.633308 }, // Coordenadas iniciais (Sorocaba)
        zoom: 12
    });

    geocoder = new google.maps.Geocoder();
    loadAddresses();
}

// Carregar endereços no mapa
function loadAddresses() {
    addresses.forEach((address) => {
        geocoder.geocode({ address: address }, (results, status) => {
            if (status === "OK") {
                const marker = new google.maps.Marker({
                    map: map,
                    position: results[0].geometry.location,
                    title: address,
icon: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRmnCdi8j__zVP_-OcLGqDfRiiAes65LgKHRA&s"	             });
                markers.push(marker);
            } else {
                console.error("Geocode não foi bem-sucedido: " + status);
            }
        });
    });
}

// Pesquisar endereço no mapa
function searchAddress() {
    const addressInput = document.getElementById("address-input").value;
    geocoder.geocode({ address: addressInput }, (results, status) => {
        if (status === "OK") {
            map.setCenter(results[0].geometry.location);
            map.setZoom(15);

            // Adicionar marcador para o endereço pesquisado
            const marker = new google.maps.Marker({
                map: map,
                position: results[0].geometry.location,
                title: addressInput
		 // Substitua pela URL do ícone
            });
            markers.push(marker);
        } else {
            alert("Endereço não encontrado: " + status);
        }
    });
}
