let map;
let geocoder;
let markers = [];

// Lista de endere�os com nomes e n�meros
const addresses = [
{ address: "Rua Jos� Gabriotti, 41 - Vila Nova Sorocaba, SP, 18070700",	name: "C01-GF NOVA SOROCABA - Darlete Moura dos Santos", number: "+5515997917547" },
{ address: "Rua Jos� Calixto, 71 - Jardim Itapu�, SP, 18071275", name: "C02-GF ITAPU� - Christian Diego Santos Costa", number: "+5515997733234" },
{ address: "Rua Jos� Gabriotti, 41 - Vila Nova Sorocaba, SP, 18070700	", name: "C01-GF NOVA SOROCABA	Darlete Moura dos Santos	", number: "+5515997917547"},
{ address: "Rua Jos� Calixto, 71 - Jardim Itapu�, SP, 18071275	", name: "C02-GF ITAPU�	Christian Diego Santos Costa	", number: "+5515997733234"},
{ address: "Rua Pedro �lvares Cabral, 522 - Vila Progresso, SP, 18090505	", name: "C03-GF VILA PROGRESSO	Maria do Socorro Rodrigues Oliveira Silva", number: "+5515991068078"},
{ address: "Rua Heraclito Oliveira de Jesus, 30 - Jardim S�o Guilherme, SP, 18074666	", name: "C04-GF S�O GUILHERME	Diana Alzate Vel�squez	", number: "+5515981292325"},
{ address: "Rua Goiacoz, 63 - Vila Progresso, SP, 18090590	", name: "C05-GF VILA SANTANA	Fabio Bueno Ribeiro	", number: "+5515991217852"},
{ address: "Rua Arlindo Previtali, 450 - CASA 36 - Central Parque Sorocaba, SP, 18051280	", name: "C06-GF CENTRAL PARQUE	Ivania Rodrigues", number: "+5521999614118"},
{ address: "Rua Manlio �ngelo Kain, 144 - Cond. Royal Park - Ibiti Royal Park, SP, 18087005	", name: "C07-GF IBITI ROYAL	Fernanda Brides Rampim	", number: "+5515981224675"},
{ address: "Rua Ernesto Testa, 190 - CASA 09 - Ipanema Ville, SP, 18071054	", name: "C08-GF IPANEMA VILLE	Gerson Alves da Silva", number: "+5515988215728"},
{ address: "Alameda das Sibipirunas, 331 - Condom�nio Portal de Itu, SP, 13301625	", name: "C09-GF PORTAL DE ITU	Rubian Costa Figueiredo", number: "+5541984039331"},
{ address: "Avenida Hollingsworth, 565 - Iporanga, SP, 18087105	", name: "C10-GF NOITE COM JESUS (online)	marcos antonio jorge de jesus", number: "+5515991046075"},
{ address: "Rua Capit�o David Joaquim Augusto, 270 - Vila da Fonte, SP, 18070145	", name: "C11-GF VILA ANG�LICA	Afonso Danin, Jaqueline Correa Araujo, Priscila Danin", number: "+5511956470759"},
{ address: "Rua Jos� Brides, 86 - Jardim S�o Camilo, SP, 18078160	", name: "C12-GF S�O CAMILO	Jaqueline Correa Araujo	", number: "+5515996402094"},
{ address: "Rua Neide Aparecida Stancatti Marques, 189 - Jardim Siriema, SP, 18075775	", name: "C13-GF SIRIEMA	Diogo Gon�alves da Silva", number: "+5511962442493"},
{ address: "Rua Professora Maria Luiza Gon�alves, 112 - Jardim Portal do Itavuvu, SP, 18079001	", name: "C14-GF PORTAL DO ITAVUVU	Anderson Jos� Silva de Aguiar, michele da silva bezerra aguiar", number: "+5515997788410"},
{ address: "Rua Azel de Arruda, 916 - Parque S�o Bento, SP, 18072050	", name: "C15-GF S�O BENTO	Rubens Santos", number: "+5515981598257"},
{ address: "Rua Jo�o Ribeiro de Barros, 1850 - CASA 137 - Vila Odim Ant�o, SP, 18090602	", name: "C16-GF COND JARDIM PORTUGAL	Jaqueline Correa Araujo	", number: "+5515996402094"},
{ address: "Rua Azel de Arruda, 137 - Parque S�o Bento, SP, 18072050	", name: "C17-GF S�O BENTO II	Dangermam Silva	", number: "+5515998518853"},
{ address: "Avenida Hollingsworth, 565 - Iporanga, SP, 18087105	", name: "C18-GF MULHERES (online)	marcos antonio jorge de jesus", number: "+5515991046075"},
{ address: "Avenida Hollingsworth, 565 - Iporanga, SP, 18087105	", name: "C19-GF NEW BEGINNING (online)	marcos antonio jorge de jesus", number: "+5515991046075"},
{ address: "Avenida Hollingsworth, 565 - Iporanga, SP, 18087105	", name: "C20-GF APARECIDINHA (online)	Nadir Cristina da Silva	", number: "+5515997491207"},
{ address: "Rua Alice Ayres de Moraes, 252 - Jardim Josane, SP, 18087292	", name: "C21-GF JARDIM JOSANE	Augusto Aparecido de Oliveira, Jeniffer Ferreira Bueno Oliveira", number: "+5515996190559"},
{ address: "Rua Demercindo Alves da Silva, 42 - Torre Cancun apto 4 - Jardim Piratininga, SP, 18016085	", name: "C22-GF JARDIM IGUATEMI	marcos antonio jorge de jesus", number: "+5515991046075"},
{ address: "Avenida Pereira da Silva, 1400 - Jardim Santa Ros�lia, SP, 18095340	", name: "C23-GF PROMISSUM	Jaqueline Correa Araujo	", number: "+5515996402094"},
{ address: "Rua Marcos Le�o Mendes, 299 - Jardim Santa Catarina, SP, 18079460	", name: "C24-GF JARDIM SANTA CATARINA	Jaqueline Correa Araujo	", number: "+5515996402094"},
{ address: "Avenida Hollingsworth, 565 - Iporanga, SP, 18087105	", name: "F02 - GF Base Ter�a Online	Jesiel Rocha de Ara�jo, Matheus Nakanishi	", number: "+5511969823929"},
{ address: "Avenida Hollingsworth, 565 - Iporanga, SP, 18087105	", name: "F03 - GF Base Quinta Online	Douglas Moreira, Jesiel Rocha de Ara�jo, Sergio Luis Dias Salinas Junior", number: "+5515991833130"},
{ address: "Avenida Elias Maluf, 2695 - Casa 663 - Wanel Ville, SP, 18055215	", name: "F04 - GF Base Delas 1 	Isabela Manoel, Mariana Paix�o de Macedo, Priscila Beatriz de Oliveira Bastos", number: "+5515998063672"},
{ address: "Avenida General Carneiro, 803 - Vila Lucy, SP, 18043003	", name: "F05 - GF Base Jovens Casais 1	Jesiel Rocha de Ara�jo, Marco Miguel", number: "+5511969823929"},
{ address: "Rua Doutor Achiles de Almeida, 164 - Vila Santa Rita, SP, 18080080	", name: "F06 - GF Base Criativo	Ana Gentil, Jesiel Rocha de Ara�jo", number: "+5515996416131"},
{ address: "Rua Treze de Maio, 71 - Centro, Sorocaba, SP, 18035150", name: "F07 - GF Base Centro - ester bortolossi, Giovanna Bomfim, Jesiel Rocha de Ara�jo", number: "+5515996444708"},
{ address: "Rua G�rson Vieira Neves, 277 - Jardim Dois Cora��es, SP, 18085771	", name: "F09 - GF Base Jardim 2 Cora��es	Alvaro de Oliveira Junior, Denis Willian de Oliveira Bastos, Jesiel Rocha de Ara�jo, Rebeca Kusmitsch Luz De Oliveira", number: "+5515988034103"},
{ address: "Rua Ant�nio Scarpa Pacheco Leite, 86 - Jardim S�o Lu�s, SP, 18112750	", name: "F10 - GF Base Votorantim	Camilly Milena, Pedro Oliveira Silva	", number: "+5515997498203"},
{ address: "Avenida Hollingsworth, 565 - Iporanga, SP, 18087105	", name: "F11 - GF Base Delas 2	Isabela Manoel, Mariana Paix�o de Macedo, Priscila Beatriz de Oliveira Bastos	", number: "+5515998063672"},
{ address: "Avenida Hollingsworth, 565 - Iporanga, SP, 18087105	", name: "F12 - GF Base Refer�ncia	Denis Willian de Oliveira Bastos, Gabriel Alves da Silva Aroucha, Sergio Luis Dias Salinas Junior", number: "+5515998291804"},
{ address: "Rua Roseli Zalla, 98 - Jardim Portal do Itavuvu, SP, 18079007	", name: "F14 - GF Base Zona Norte	Denis Willian de Oliveira Bastos", number: "+5515998291804"},
{ address: "Rua Jos� de Oliveira, 315 - Jardim do Sol, SP, 18017029	", name: "F16 - GF Base Jardim do Sol	Denis Willian de Oliveira Bastos, Gabriel Alves da Silva Aroucha, Sergio Luis Dias Salinas Junior", number: "+5515998291804"},
{ address: "Rua A�an�, 333 - P�rola do Mar - Nossa Senhora da Vit�ria, BA, 45655718	", name: "GF  Clubinho 	??Bianca Soares??	", number: "+5573991227797"},
{ address: "Avenida Tancredo Neves, 5 - Aldeia Atl�ntida - Nossa Senhora da Vit�ria, BA, 45655901	", name: "GF Aldeia Atl�ntida	cleriston da Silva S�rgio", number: "+5573999211737"},
{ address: "Rua Aracu�, 250 - casa 01 Loteamento P�rola do mar - Nossa Senhora da Vit�ria, BA, 45655712	", name: "GF base	Leticia Maselli Magalhaes Lopes	", number: "+5573991063854"},
{ address: "Avenida Tancredo Neves, 5 - Cidadelle praia A53 - Nossa Senhora da Vit�ria, BA, 45655650	", name: "GF Cidadelle	Graziela Bortolossi de Ara�jo, william de araujo", number: "+5573999590789"},
{ address: "Avenida Tancredo Neves, 5 - Cidadelle A53 - Nossa Senhora da Vit�ria, BA, 45655650	", name: "GF Force	Luana Cruz", number: "+5573999587896"},
{ address: "Rua Lauro Farani de Freitas, 101 - Cidade Nova, BA, 45652160	", name: "GF Lumiere 	Ana Queiroz de Souza", number: "+5515981312688"},
{ address: "Avenida Osvaldo Cruz, 616 - Edif�cio Massimo apt 1103 - Cidade Nova, BA, 45652130	", name: "GF Massimo	Danielle Alves de Carvalho Basilio, Jonatas Correia Bas�lio", number: "+5515981214353"},
{ address: "Rua A�an�, 333 - Nossa Senhora da Vit�ria, BA, 45655718	", name: "GF P�rola do Mar	Rafaele Comin, Silvio Comin", number: "+5573991248356"},
{ address: "Avenida Lomanto J�nior, 1160 - apt 501 - Pontal, BA, 45654000	", name: "GF Pontal	Leandro Magalh�es Lopes, Mayra Amado Maselli Magalh�es Lopes", number: "+5573991543858"},
{ address: "Rua Vic�ncia Faria Verssagi, 399 - 101 B - Jardim Em�lia, SP, 18031080	", name: "K1 - CAMPOLIM + GF KIDS - SAINT GERMAIN	Anderson Silva Motta", number: "+5531997097039"},
{ address: "Avenida Hollingsworth, 565 - SALA DE APOIO PR�XIMA � CAFETERIA - Iporanga, SP, 18087105	", name: "K10 - GF BASE - �DEN	Bruna Dantas Motta", number: "+5515991456945"},
{ address: "Rua Rog�rio Arcury, 135 - ONLINE - Jardim Faculdade, SP, 18030165	", name: "K11 - GF CAMPOLIM - ONLINE	Eduardo Maldonado, Martha Delgado da Silva Maldonado", number: "+5515996842724"},
{ address: "Rua Doutor Lauro Sodr�, 62 - ONLINE - Vila Carvalho, SP, 18060090	", name: "K12 - GF ZONA OESTE - ONLINE	Adriano Godinho, Thais Caroline da Silva", number: "+5515991880394"},
{ address: "Rua Dinamarca, 384 - Jardim Europa, Sorocaba, SP, 18045400	", name: "K13 - GF ZONA SUL - JARDIM EUROPA	Carlos Silva", number: "+5515997076010"},
{ address: "Rua Oswaldo Martins, 146 - Jardim Ref�gio, SP, 18045490	", name: "K14 - GF ZONA SUL - JARDIM DOS ESTADOS	Adriana Cristina Pereira Gomes, Natanaell Rodrigo Gomes	", number: "+5515997918448"},
{ address: "Rua Nelson Jacks Rosenberg, 367 - Jardim Wanel Ville IV, SP, 18055855	", name: "K15 - GF ZONA OESTE - WANEL VILLE 4	Adriano Godinho, Thais Caroline da Silva	", number: "+5515991880394"},
{ address: "Rua Augusto Lippel, 1700 - Parque Campolim, SP, 18048130	", name: "K16 - GF CAMPOLIM + GF KIDS - SAN MARCO	Danilo de Almeida Lazaro, Jana�na Cruz Lima de Almeida L�zaro", number: "+5511997007098"},
{ address: "Rua Augusto Lippel, 1700 - Parque Campolim, SP, 18048130	", name: "K17 - GRUPINHO KIDS - SAN MARCO	Danilo de Almeida Lazaro, Jana�na Cruz Lima de Almeida L�zaro", number: "+5511997007098"},
{ address: "Rua Fernando Affonso, 111 - CASA 47 - Jardim Am�rica, SP, 18046703	", name: "K18 - GF CAMPOLIM + GF KIDS - VILLA MAGGIORI	Dennis Martins Guimar�es, TATIANE SOARES MOREIRA", number: "+5512996420979"},
{ address: "Rua Fernando Affonso, 111 - CASA 47 - Jardim Am�rica, SP, 18046703	", name: "K19 - GRUPINHO KIDS - VILLA MAGGIORI	Dennis Martins Guimar�es, TATIANE SOARES MOREIRA", number: "+5512996420979"},
{ address: "Rua Vic�ncia Faria Verssagi, 399 - 101 B - Jardim Em�lia, SP, 18031080	", name: "K2 - GRUPINHO KIDS - SAINT GERMAIN	Anderson Silva Motta	", number: "+5531997097039"},
{ address: "Rua Jo�o Batista Correa de Oliveira, 105 - QUADRA E LOTE 1 - Parque Esplanada, Votorantim, SP, 18110702	", name: "K20 - GF VOTORANTIM + GF KIDS - PARQUE ESPLANADA	Kelly F Luz, Leonardo Goline	", number: "+5511982877693"},
{ address: "Rua Jo�o Batista Correa de Oliveira, 105 - QUADRA E LOTE 1 - Parque Esplanada, Votorantim, SP, 18110702	", name: "K21 - GRUPINHO KIDS - PARQUE ESPLANADA	Kelly F Luz, Leonardo Goline	", number: "+5511982877693"},
{ address: "Alameda Bau�nia, 146 - QUADRA P, LOTE 29 - Cyrela Landscape Esplanada, Votorantim, SP, 18119425", name: "K22 - GF VOTORANTIM - CYRELA ESPLANADA	Adriana Gomes da Silva Ramos, ENEAS RAMOS", number: "+5515991580500"},
{ address: "Rua Heitor de Morais, 940 - Pacaembu, SP, 01237000	", name: "K23 - GF PACAEMBU	Kelly F Luz, Leonardo Goline", number: "+5511982877693"},
{ address: "Avenida S�o Paulo, 5235 - Casa 17 - Condom�nio Village D'Avignon - Al�m Ponte, SP, 18013004	", name: "K24 - GF VILLAGE D'AVIGNON	Kelly F Luz, Leonardo Goline", number: "+5511982877693"},
{ address: "Avenida S�o Paulo, 5235 - Casa 17 - Condom�nio Village D'Avignon - Al�m Ponte, SP, 18013004	", name: "K25 - GRUPINHO KIDS - VILLAGE D'AVIGNON	Kelly F Luz, Leonardo Goline", number: "+5511982877693"},
{ address: "Rua Bruno Biagioni, 860 - QUADRA A7 LOTE 24 - Parque Residencial Villa dos Inglezes, SP, 18051870	", name: "K26 - GF VILA DOS INGLEZES	FRANCISCO FALOCI NETO, Grasiela Antunes de Campos Faloci", number: "+15988119468"},
{ address: "Rua Bruno Biagioni, 860 - QUADRA A7 LOTE 24 - Parque Residencial Villa dos Inglezes, SP, 18051870	", name: "K27 - GRUPINHO KIDS - VILA DOS INGLEZES	FRANCISCO FALOCI NETO, Grasiela Antunes de Campos Faloci", number: "+15988119468"},
{ address: "Rua Clelia Carrara, 1215 - CONDOM�NIO SUNLAKE (QUADRA N LOTE 05) - Loteamento Sunlake SPA Residencial, Sorocaba, SP, 18113120	", name: "K28 - GF SUNLAKE SPA RESIDENCIAL	Marcelo Rolim, SIMONE RUFINO ROLIM", number: "+5515981666888"},
{ address: "Rua Doutor Francisco Prestes Maia, 495 - Jardim Paulistano, SP, 18040650", name: "K29 - GF JARDIM PAULISTANO	Eli�zer Vieira de Sousa, Patricia Sousa	", number: "+5527997083165"},
{ address: "Rua Ant�nio Joaquim Santana, S/N - Parque das �guas - Jardim Abaet�, SP, 18081295", name: "K3 - GF RUNNING	Alexandre Stefani	", number: "+5515998194282"},
{ address: "Rua Leroy Gabriele, 125 - CONDOM�NIO COLINAS DO SOL - QUADRA F LOTE 5  - Jardim Residencial Colinas do Sol, SP, 18087056	", name: "K30 - GF BOA VISTA	Claudio Jose Issao Yokogawa", number: "+5512997284036"},
{ address: "Rua Raphael Jafet, 250 - QUADRA I LOTE 5 - Jardim Portobello, SP, 18103758", name: "K31 - GF EDEN - RESIDENCIAL PORTOBELLO	Leandro Marcelo	", number: "+5519988787777"},
{ address: "Avenida Paran�, 2790 - COND. TERRAS DE S�O FRANCISCO - QUADRA R LOTE 36 - Cajuru do Sul, SP, 18105000", name: "K32 - GF CAJURU - COND. TERRAS DE S�O FRANCISCO	Evelyn de Morais Onofre	", number: "+5519988497777"},
{ address: "Rua Azel de Arruda, 137 - Parque S�o Bento, SP, 18072050	", name: "K33 - GF FORCE - S�O BENTO	Carlos Amorim	", number: "+5515981797376"},
{ address: "Avenida Elias Maluf, 3305 - CONDOM�NIO RESIDENCIAL VILLAGIO MILANO (QUADRA N LOTE 17) - Wanel Ville, SP, 18055215	", name: "K34 - GF FORCE - VILLAGIO MILANO	Carlos Amorim", number: "+5515981797376"},
{ address: "Avenida Dom Aguirre, 714 - GF ONLINE - Jardim Santa Ros�lia, SP, 18090001", name: "K35 - GF FORCE - HUB ONLINE	Carlos Amorim	", number: "+5515981797376"},
{ address: "Rua Waldemar Jos� Soave, 61 - Condom�nio Granja Olga - Granja Olga II, SP, 18017226", name: "K36 - GF FORCE - GRANJA OLGA 2	Betiana Miwszuk Azevedo", number: "+5515991447441"},
{ address: "Rua Doutor Francisco Prestes Maia, 495 - Jardim Paulistano, SP, 18040650", name: "K37 - GF FORCE - JARDIM PAULISTANO	Eli�zer Vieira de Sousa, Patricia Sousa", number: "+5527997083165"},
{ address: "Rua Jo�o Batista Correa de Oliveira, 105 - Parque Esplanada, Votorantim, SP, 18110702", name: "K38 - GF FORCE - PARQUE ESPLANADA	Anderson Silva Motta", number: "+5531997097039"},
{ address: "Rua Bruno Biagioni, 860 - QUADRA A7 LOTE 24 - Parque Residencial Villa dos Inglezes, SP, 18051870", name: "K39 - GF FORCE - VILA DOS INGLEZES	Bruna Dantas Motta", number: "+5515991456945"},
{ address: "Rua Perfeito Asseituno, 127 - Ipiranga, SP, 18055013", name: "K4 - GF Z. OESTE + KIDS - J�LIO DE MESQUITA FILHO	Anderson Silva Motta", number: "+5531997097039"},
{ address: "Rua Perfeito Asseituno, 127 - Ipiranga, SP, 18055013", name: "K5 - GRUPINHO KIDS - JULIO DE MESQUITA FILHO	Anderson Silva Motta", number: "+5531997097039"},
{ address: "Rua Eronita Pedro de Souza, 10 - Casa da Tha�s - Jardim Novo Mundo,Sorocaba, SP, 18119125	", name: "K6 - GF PARTILHAR - COMUNIDADE DANDARA	Roberto D�avila ouaoui, Rosana D'avila", number: "+5515991281985"},
{ address: "Rua Esperan�a, 10 - CASA DA THA�S - Jardim Novo Mundo, Sorocaba, SP, 18119125	", name: "K7 - GRUPINHO KIDS PARTILHAR - ASSENTAMENTO DANDARA	Roberto D�avila ouaoui, Rosana D'avila", number: "+5515991281985"},
{ address: "Rua Monsenhor Benedito M�rio Calazans,  Jardim Nova Esperan�a, Sorocaba, SP, 18061441", name: "K8 - GF PARTILHAR - NOVA ESPERAN�A	Roberto D�avila ouaoui, Rosana D'avila", number: "+5515991281985"},
{ address: "Rua Monsenhor Benedito M�rio Calazans,  Jardim Nova Esperan�a, Sorocaba, SP, 18061441", name: "K9 - GRUPINHO KIDS PARTILHAR - NOVA ESPERAN�A	Roberto D�avila ouaoui, Rosana D'avila", number: "+5515991281985"},
{ address: "Avenida Brasil, 376 - DENTRO DO CARREFOUR SONIA MARIA, NA PISTA DE CAMINHADA - Vila Carvalho, SP, 18060105	", name: "S01 - GF SINGLES - SINGLES UP - CARREFOUR SM	Marcineia Maria Andrade	", number: "+5515988318753"},
{ address: "Rua Oswaldo Nardi, 29 - casa - Jardim Residencial Villa Amato, SP, 18087679	", name: "S01 - Vila Amato	Robson Braga Pereira, Talita Mello Garcino Braga", number: "+5515996605522"},
{ address: "Avenida Hollingsworth, 565 - Igreja Fam�lia - Iporanga, SP, 18087105", name: "S02 - GF SINGLES - CN HOMENS - SALA CONEX�O   	Cristiano Almeida Candido	", number: "+5515981032447"},
{ address: "Rua Virginia Bompani Salvestrini, 287 - Jardim Guaruj�, SP, 18050614", name: "S03 - GF SINGLES - CN MULHERES - JARDIM GUARUJ	Enyd Moreira dos Santos Candido	", number: "+5515981146036"},
{ address: "Rua Carmem Ruiz Moncayo, 110 - Jardim Gon�alves, SP, 18016580", name: "S04 - GF SINGLES - CN MULHERES - JD MONCAYO   	Enyd Moreira dos Santos Candido	", number: "+5515981146036"},
{ address: "Avenida Hollingsworth, 565 - Igreja Familia - Iporanga, SP, 18087105", name: "S05 - GF SINGLES - CN MULHERES - SALA CONEX�O 	Enyd Moreira dos Santos Candido	", number: "+5515981146036"},
{ address: "Rua Ministro Salgado Filho, 137 - Vila Fiori, SP, 18075605	", name: "S06 - GF SINGLES - CN MULHERES - VILA FIORI   	Enyd Moreira dos Santos Candido	", number: "+5515981146036"},
{ address: "Avenida Hollingsworth, 565 - Igreja Fam�lia - Iporanga, SP, 18087105", name: "S07 - GF SINGLES - CONEXAO SINGLES UP         	Enyd Moreira dos Santos Candido", number: "+5515981146036"},
{ address: "Rua Ant�nio Jos� Mattos Corr�a, 603 - Jardim Ibiti do Pa�o, SP, 18086330", name: "S08 - GF SINGLES - NOVO RUMO -  IBITI DO PA�O 	Cristiano Almeida Candido", number: "+5515981032447"},
{ address: "Avenida Hollingsworth, 565 - Iporanga, SP, 18087105	", name: "S09 - GF INSPIRA & A��O                       	Robson Braga Pereira, Talita Mello Garcino Braga", number: "+5515996605522"},
{ address: "Rua Flor�ncio Vieira da Rocha, 68 - Jardim Astro, SP, 18017149", name: "S10 - GF LACUS - INSPIRA & A��O               	Robson Braga Pereira, Talita Mello Garcino Braga	", number: "+5515996605522"},
{ address: "Avenida Hollingsworth, 565 - Iporanga, SP, 18087105	", name: "S11 - GF LIBRAS - ON LINE                     	Robson Braga Pereira, Talita Mello Garcino Braga", number: "+5515996605522"},
{ address: "Avenida Hollingsworth, 565 - Iporanga, SP, 18087105	", name: "S12 - LIVRO O DESAFIO DE AMAR 1 - ON LINE	Robson Braga Pereira, Talita Mello Garcino Braga", number: "+5515996605522"},
{ address: "Avenida Hollingsworth, 565 - Iporanga, SP, 18087105	", name: "S13 - LIVRO O DESAFIO DE AMAR 2             	Robson Braga Pereira, Talita Mello Garcino Braga", number: "+5515996605522"},
{ address: "Avenida Hollingsworth, 565 - Iporanga, SP, 18087105	", name: "S14 - LIVRO O PODER DA ESPOSA QUE ORA - ON LINE	Robson Braga Pereira, Talita Mello Garcino Braga", number: "+5515996605522"},
{ address: "Avenida Hollingsworth, 565 - Iporanga, SP, 18087105	", name: "S15 - LIVRO OUSE SER FILHO - ON LINE          	Robson Braga Pereira, Talita Mello Garcino Braga", number: "+5515996605522"},
{ address: "Avenida Hollingsworth, 565 - Iporanga, SP, 18087105	", name: "S16 - LIVRO UMA MULHER 2� CORAC�O DE DEUS -  ON LINE	Robson Braga Pereira, Talita Mello Garcino Braga", number: "+5515996605522"},
{ address: "Avenida Hollingsworth, 565 - Iporanga, SP, 18087105	", name: "S17 - GF ESPOSA REAL - ONLINE	Val�ria Diab de G�es	", number: "+5515981134229"},
{ address: "Avenida Hollingsworth, 565 - Iporanga, SP, 18087105	", name: "S18 - A EXPERIENCIA DA MESA - ON LINE	Robson Braga Pereira, Talita Mello Garcino Braga", number: "+5515996605522"},
{ address: "Rua os Imigrantes, 19 - Gabriela, BA, 44028240", name: "S19 - GF FEIRA DE SANTANA - GABRIELA 01       	Robson Braga Pereira, Talita Mello Garcino Braga	", number: "+5515996605522"},
{ address: "Caminho 3, 02a - Gabriela, BA, 44028427", name: "S20 - GF FEIRA DE SANTANA - GABRIELA 02       	Robson Braga Pereira, Talita Mello Garcino Braga", number: "+5515996605522"},
{ address: "Rua Irm�os Coragem, 126 - Gabriela, BA, 44028310", name: "S21 - GF FEIRA DE SANTANA - GABRIELA 03       	Robson Braga Pereira, Talita Mello Garcino Braga", number: "+5515996605522"},
{ address: "Rua Da Liberdade, 290 - Bairro Sucupira, BA, 44020180", name: "S22 - GF FEIRA DE SANTANA - JD SUCUPIRA       	Robson Braga Pereira, Talita Mello Garcino Braga", number: "+5515996605522"},
{ address: "1� Travessa Guilherme Azevedo, 0 - Tomba, BA, 44090280", name: "S23 - GF FEIRA DE SANTANA - TOMBA 01          	Robson Braga Pereira, Talita Mello Garcino Braga", number: "+5515996605522"},
{ address: "Rua Almirante Tamandar�, 1124 - Cidade Nova II, SP, 13334200", name: "S24 - GF INDAIATUBA - BASE JOVENS             	Robson Braga Pereira, Talita Mello Garcino Braga", number: "+5515996605522"},
{ address: "Rua Pedro Gon�alves, 1427 - Centro, SP, 13330210", name: "S25 - GF INDAIATUBA - CENTRO                  	Robson Braga Pereira, Talita Mello Garcino Braga", number: "+5515996605522"},
{ address: "Rua Tr�s Marias, 0 - Cidade Nova II, SP, 13334381", name: "S26 - GF INDAIATUBA - CIDADE NOVA II          	Robson Braga Pereira, Talita Mello Garcino Braga", number: "+5515996605522"},
{ address: "Estrada do Badim, 0 - Jardim Eldorado, SP, 13343815	", name: "S27 - GF INDAIATUBA - JD ELDORADO             	Robson Braga Pereira, Talita Mello Garcino Braga", number: "+5515996605522"},
{ address: "Rua Carlos Alberto Bull, 526 - Residencial Monte Verde, SP, 13348873	", name: "S28 - GF INDAIATUBA - JD MONTE VERDE          	Robson Braga Pereira, Talita Mello Garcino Braga	", number: "+5515996605522"},
{ address: "Rua Tieko Ueda, 15 - Jardim Morumbi, SP, 13332490	", name: "S29 - GF INDAIATUBA - JD MORUMBI              	Robson Braga Pereira, Talita Mello Garcino Braga	", number: "+5515996605522"},
{ address: "Rua Francisco Bueno de Oliveira, 90 - Vila Rubens, SP, 13335150", name: "S30 - GF INDAIATUBA - VILA RUBENS             	Robson Braga Pereira, Talita Mello Garcino Braga	", number: "+5515996605522"},
{ address: "Rua Terezinha da Concei��o Alves, 27 - Jardim Penha de Fran�a, SP, 13308491", name: "S31 - GF ITU - JD PENHA DE FRAN�A             	Douglas Rocha dos Santos, Leticia Fernanda de Oliveira Francisco	", number: "+5511995243388"},
{ address: "Alameda das Sibipirunas, 331 - Condom�nio Portal de Itu, SP, 13301625", name: "S32 - GF ITU - 	Rubian Costa Figueiredo	", number: "+5541984039331"},
{ address: "Avenida Hollingsworth, 565 - Iporanga, SP, 18087105", name: "S33 - GF JAP�O                               Robson Braga Pereira", number: "+5515996605522"},
{ address: "Avenida Hollingsworth, 565 - Iporanga, SP, 18087105", name: "S34 - GF EUROPA ON LINE	Robson Braga Pereira", number: "+5515996605522"},
{ address: "Estrada Do Briquituba, 550 - Briquituba, SP, 18125000", name: "S35 GF ALUM�NIO - CONDOVILLE                	Robson Braga Pereira", number: "+5515996605522"}

];

// Inicializar o mapa
function initMap() {
    map = new google.maps.Map(document.getElementById("map"), {
        center: { lat: -23.480058, lng: -47.438860 }, // Coordenadas iniciais (Sorocaba)
        zoom: 12
    });

    geocoder = new google.maps.Geocoder();
    loadAddresses();
}

// Carregar endere�os no mapa
function loadAddresses() {
    addresses.forEach((location) => {
        geocoder.geocode({ address: location.address }, (results, status) => {
            if (status === "OK") {
                // Definir �cone SVG personalizado
                const customIcon = {
                    path: google.maps.SymbolPath.CIRCLE, // Forma circular
                    fillColor: "#FBBC04", // Fundo laranja
                    fillOpacity: 1, // Opacidade total
                    scale: 10, // Tamanho
                    strokeColor: "#000000", // Borda preta
                    strokeWeight: 2, // Largura da borda
                };

                // Criar marcador
                const marker = new google.maps.Marker({
                    map: map,
                    position: results[0].geometry.location,
                    title: location.name, // Nome do local (aparece ao passar o mouse)
                    icon: customIcon, // Aplicar o �cone SVG
                });

                // Criar InfoWindow
                const infoWindow = new google.maps.InfoWindow({
                    content: `<div>
                                <strong>${location.name}</strong><br>
                                N�mero: ${location.number}<br>
                                Endere�o: ${location.address}
                              </div>`,
                });

                // Mostrar InfoWindow ao passar o mouse
                marker.addListener("mouseover", () => {
                    infoWindow.open(map, marker);
                });

                // Fechar InfoWindow ao tirar o mouse
                marker.addListener("mouseout", () => {
                    infoWindow.close();
                });

                // Adicionar marcador � lista
                markers.push(marker);
            } else {
                console.error("Geocode n�o foi bem-sucedido: " + status);
            }
        });
    });
}

// Pesquisar endere�o no mapa
function searchAddress() {
    const addressInput = document.getElementById("address-input").value;
    geocoder.geocode({ address: addressInput }, (results, status) => {
        if (status === "OK") {
            map.setCenter(results[0].geometry.location);
            map.setZoom(15);

            // Adicionar marcador para o endere�o pesquisado
            const marker = new google.maps.Marker({
                map: map,
                position: results[0].geometry.location,
                title: addressInput
            });
            markers.push(marker);
        } else {
            alert("Endere�o n�o encontrado: " + status);
        }
    });
}

