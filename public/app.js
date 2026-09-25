'use strict';
let isUserLoggedIn = false;

if (typeof ChartDataLabels !== 'undefined') {
  Chart.register(ChartDataLabels);
}

const LOJAS_KA_MASTER = [
  {
    "uf": "AL",
    "regional": "SPAL",
    "nome": "SPAL - PARQUE SHOPPING MACEIO",
    "nomeBi": "Maceió Parque Shopping"
  },
  {
    "uf": "AM",
    "regional": "SPAM",
    "nome": "SPAM - PONTA NEGRA",
    "nomeBi": "Ponta Negra"
  },
  {
    "uf": "AM",
    "regional": "SPAM",
    "nome": "SPAM - VIEIRALVES",
    "nomeBi": "Vieiralves"
  },
  {
    "uf": "BA",
    "regional": "SPBA",
    "nome": "SPBA - AEROPORTO LOJA",
    "nomeBi": "Aeroporto Salvador"
  },
  {
    "uf": "BA",
    "regional": "SPBA",
    "nome": "SPBA - AEROPORTO QUIOSQUE",
    "nomeBi": "Aeroporto Salvador Q"
  },
  {
    "uf": "BA",
    "regional": "SPBA",
    "nome": "SPBA - HORTO FLORESTAL",
    "nomeBi": "Horto Florestal"
  },
  {
    "uf": "BA",
    "regional": "SPBA",
    "nome": "SPBA - PITUBA",
    "nomeBi": "Pituba"
  },
  {
    "uf": "BA",
    "regional": "SPBA",
    "nome": "SPBA - PRAIA DO FORTE",
    "nomeBi": "Praia Forte"
  },
  {
    "uf": "BA",
    "regional": "SPBA",
    "nome": "SPBA - SHOPPING SALVADOR",
    "nomeBi": "Salvador Shopping"
  },
  {
    "uf": "BA",
    "regional": "SPBA",
    "nome": "SPBA - SHOPPING DA BAHIA",
    "nomeBi": "Shopping da Bahia"
  },
  {
    "uf": "BA",
    "regional": "SPBA",
    "nome": "SPBA - SHOPPING PARALELA",
    "nomeBi": "Shopping Paralela"
  },
  {
    "uf": "BA",
    "regional": "SPBA",
    "nome": "SPBA - VILLAS",
    "nomeBi": "Vilas do Atlântico"
  },
  {
    "uf": "CE",
    "regional": "SPCE",
    "nome": "SPCE - AEROPORTO LOJA",
    "nomeBi": "Aeroporto Fortaleza"
  },
  {
    "uf": "CE",
    "regional": "SPCE",
    "nome": "SPCE - AEROPORTO QUIOSQUE",
    "nomeBi": "Aeroporto Fortaleza Q"
  },
  {
    "uf": "CE",
    "regional": "SPCE",
    "nome": "SPCE - AQUIRAZ",
    "nomeBi": "Arvorar"
  },
  {
    "uf": "CE",
    "regional": "SPCE",
    "nome": "SPCE - BEIRA MAR LOJA",
    "nomeBi": "Beira Mar"
  },
  {
    "uf": "CE",
    "regional": "SPCE",
    "nome": "SPCE - BEIRA MAR QUIOSQUE",
    "nomeBi": "Beira Mar Q"
  },
  {
    "uf": "CE",
    "regional": "SPCE",
    "nome": "SPCE - LOJA EUSEBIO",
    "nomeBi": "Eusébio"
  },
  {
    "uf": "CE",
    "regional": "SPCE",
    "nome": "SPCE - FATIMA",
    "nomeBi": "Fátima"
  },
  {
    "uf": "CE",
    "regional": "SPCE",
    "nome": "SPCE - FLORES",
    "nomeBi": "Flores"
  },
  {
    "uf": "CE",
    "regional": "SPCE",
    "nome": "SPCE - DESEMBARGADOR MOREIRA",
    "nomeBi": "Meireles"
  },
  {
    "uf": "CE",
    "regional": "SPCE",
    "nome": "SPCE - OUTLET FORTALEZA",
    "nomeBi": "Outlet Fortaleza"
  },
  {
    "uf": "CE",
    "regional": "SPCE",
    "nome": "SPCE - PARANGABA",
    "nomeBi": "Parangaba"
  },
  {
    "uf": "CE",
    "regional": "SPCE",
    "nome": "SPCE - RIO MAR FORTALEZA",
    "nomeBi": "Riomar Fortaleza"
  },
  {
    "uf": "CE",
    "regional": "SPCE",
    "nome": "SPCE - RIO MAR KENNEDY",
    "nomeBi": "Riomar Kennedy"
  },
  {
    "uf": "CE",
    "regional": "SPCE",
    "nome": "SPCE - SHOPPING IGUATEMI",
    "nomeBi": "Shopping Iguatemi"
  },
  {
    "uf": "CE",
    "regional": "SPCE",
    "nome": "SPCE - LOJA SUL",
    "nomeBi": "Sul"
  },
  {
    "uf": "CE",
    "regional": "SPCE",
    "nome": "SPCE - ANA BILHAR",
    "nomeBi": "Varjota"
  },
  {
    "uf": "CE",
    "regional": "SPCE",
    "nome": "SPCE - WORK CAFE",
    "nomeBi": "Work Café"
  },
  {
    "uf": "CE2",
    "regional": "SPCE 2",
    "nome": "SPCE 2 - ICARAI DE AMONTADA",
    "nomeBi": "Icaraí de Amontada"
  },
  {
    "uf": "CE2",
    "regional": "SPCE 2",
    "nome": "SPCE 2 - JERICOACOARA",
    "nomeBi": "Jericoacoara"
  },
  {
    "uf": "CE2",
    "regional": "SPCE 2",
    "nome": "SPCE 2 - PREA",
    "nomeBi": "Preá"
  },
  {
    "uf": "CE2",
    "regional": "SPCE 2",
    "nome": "SPCE 2 - SOBRAL",
    "nomeBi": "Sobral"
  },
  {
    "uf": "CE3",
    "regional": "SPCE 3",
    "nome": "SPCE 3 - JUAZEIRO DO NORTE",
    "nomeBi": "Juazeiro do Norte"
  },
  {
    "uf": "CE3",
    "regional": "SPCE 3",
    "nome": "SPCE 3 - DABLIO MALL",
    "nomeBi": "Dablio Mall"
  },
  {
    "uf": "MA",
    "regional": "SPMA",
    "nome": "SPMA - SHOPPING DA ILHA",
    "nomeBi": "Cohama"
  },
  {
    "uf": "MA",
    "regional": "SPMA",
    "nome": "SPMA - SHOPPING SAO LUIS",
    "nomeBi": "São Luís Shopping"
  },
  {
    "uf": "MT",
    "regional": "SPMT",
    "nome": "SPMT - SHOPPING PANTANAL",
    "nomeBi": "Shopping Pantanal"
  },
  {
    "uf": "MT",
    "regional": "SPMT",
    "nome": "SPMT - ESTACAO CUIABA",
    "nomeBi": "Shopping Estação Cuiabá"
  },
  {
    "uf": "PA",
    "regional": "SPPA",
    "nome": "SPPA - SHOPPING BOULEVARD",
    "nomeBi": "Boulevard Shopping"
  },
  {
    "uf": "PA",
    "regional": "SPPA",
    "nome": "SPPA - PARQUE SHOPPING",
    "nomeBi": "Belém Parque Shopping"
  },
  {
    "uf": "PA",
    "regional": "SPPA",
    "nome": "SPPA - SHOPPING GRAO PARA",
    "nomeBi": "Shopping Grão Pará"
  },
  {
    "uf": "PA",
    "regional": "SPPA",
    "nome": "SPPA - UMARIZAL",
    "nomeBi": "Umarizal"
  },
  {
    "uf": "PB",
    "regional": "SPPB",
    "nome": "SPPB - CAMPINA GRANDE",
    "nomeBi": "Campina Grande"
  },
  {
    "uf": "PB",
    "regional": "SPPB",
    "nome": "SPPB - SHOPPING MANAIRA",
    "nomeBi": "Manaíra Shopping"
  },
  {
    "uf": "PB",
    "regional": "SPPB",
    "nome": "SPPB - ORIGENS",
    "nomeBi": "Origens Paraíba"
  },
  {
    "uf": "PB",
    "regional": "SPPB",
    "nome": "SPPB - PARTAGE CAMPINA GRANDE",
    "nomeBi": "Partage"
  },
  {
    "uf": "PE",
    "regional": "SPPE",
    "nome": "SPPE - RUA AMELIA",
    "nomeBi": "Amélia"
  },
  {
    "uf": "PE",
    "regional": "SPPE",
    "nome": "SPPE - BOA VIAGEM",
    "nomeBi": "Boa Viagem"
  },
  {
    "uf": "PE",
    "regional": "SPPE",
    "nome": "SPPE - CARUARU SHOPPING",
    "nomeBi": "Caruaru Shopping"
  },
  {
    "uf": "PE",
    "regional": "SPPE",
    "nome": "SPPE - MAURICIO DE NASSAU",
    "nomeBi": "Maurício de Nassau"
  },
  {
    "uf": "PE",
    "regional": "SPPE",
    "nome": "SPPE - ORIGENS",
    "nomeBi": "Origens PE"
  },
  {
    "uf": "PE",
    "regional": "SPPE",
    "nome": "SPPE - SHOPPING PATTEO OLINDA",
    "nomeBi": "Shopping Patteo Olinda"
  },
  {
    "uf": "PE",
    "regional": "SPPE",
    "nome": "SPPE - SHOPPING GUARARAPES",
    "nomeBi": "Shopping Guararapes"
  },
  {
    "uf": "PE",
    "regional": "SPPE",
    "nome": "SPPE - SHOPPING RECIFE",
    "nomeBi": "Shopping Recife"
  },
  {
    "uf": "PE",
    "regional": "SPPE",
    "nome": "SPPE - RIO MAR RECIFE",
    "nomeBi": "Shopping Riomar Recife"
  },
  {
    "uf": "PE",
    "regional": "SPPE",
    "nome": "SPPE - SHOPPING TACARUNA",
    "nomeBi": "Shopping Tacaruna"
  },
  {
    "uf": "PI",
    "regional": "SPPI",
    "nome": "SPPI - DIRCEU",
    "nomeBi": "Dirceu"
  },
  {
    "uf": "PI",
    "regional": "SPPI",
    "nome": "SPPI - DOM SEVERINO",
    "nomeBi": "Dom Severino"
  },
  {
    "uf": "PI",
    "regional": "SPPI",
    "nome": "SPPI - SHOPPING RIVERSIDE",
    "nomeBi": "Riverside"
  },
  {
    "uf": "PI",
    "regional": "SPPI",
    "nome": "SPPI - SHOPPING RIO POTY",
    "nomeBi": "Shopping Rio Poty"
  },
  {
    "uf": "RN",
    "regional": "SPRN",
    "nome": "SPRN - LAGOA MALL",
    "nomeBi": "Lagoa Mall"
  },
  {
    "uf": "RN",
    "regional": "SPRN",
    "nome": "SPRN - MIDWAY",
    "nomeBi": "Midway Mall"
  },
  {
    "uf": "RN",
    "regional": "SPRN",
    "nome": "SPRN - MOSSORO",
    "nomeBi": "Mossoró"
  },
  {
    "uf": "RN",
    "regional": "SPRN",
    "nome": "SPRN - NATAL SHOPPING",
    "nomeBi": "Natal Shopping"
  },
  {
    "uf": "RN",
    "regional": "SPRN",
    "nome": "SPRN - NOVA PARNAMIRIM",
    "nomeBi": "Parnamirim"
  },
  {
    "uf": "SE",
    "regional": "SPSE",
    "nome": "SPSE - JARDINS",
    "nomeBi": "Shopping Jardins"
  },
  {
    "uf": "SE",
    "regional": "SPSE",
    "nome": "SPSE - ARACAJU",
    "nomeBi": "Riomar Aracaju"
  },
  {
    "uf": "SP",
    "regional": "SPSP",
    "nome": "SPSP - SHOPPING CIDADE SAO PAULO",
    "nomeBi": "Cidade São Paulo"
  },
  {
    "uf": "SP",
    "regional": "SPSP",
    "nome": "SPSP - MORUMBI SHOPPING",
    "nomeBi": "Morumbi Shopping"
  },
  {
    "uf": "SP",
    "regional": "SPSP",
    "nome": "SPSP - SHOPPING PATIO PAULISTA",
    "nomeBi": "Pátio Paulista"
  },
  {
    "uf": "SP",
    "regional": "SPSP",
    "nome": "SPSP - SHOPPING ELDORADO",
    "nomeBi": "Shopping Eldorado"
  }
];
const REGIONAIS_OFICIAIS = [...new Set(LOJAS_KA_MASTER.map(l => l.regional))].sort();

const REAL_BACKUP_PLANEJAMENTO = [
  {
    "id": "PLAN_1",
    "lojaId": "1",
    "lojaNome": "SPAL - PARQUE SHOPPING MACEIO",
    "nomeBi": "Maceió Parque Shopping",
    "regional": "SPAL",
    "uf": "AL",
    "ultimaData": "2026-08-17",
    "proximaPrevista": "2026-09-09",
    "auditor": "Ana Raquel",
    "status": "ATRASADA"
  },
  {
    "id": "PLAN_2",
    "lojaId": "2",
    "lojaNome": "SPAM - PONTA NEGRA",
    "nomeBi": "Ponta Negra",
    "regional": "SPAM",
    "uf": "AM",
    "ultimaData": "2026-08-24",
    "proximaPrevista": "2026-09-10",
    "auditor": "Ana Raquel",
    "status": "CONCLUIDA"
  },
  {
    "id": "PLAN_3",
    "lojaId": "3",
    "lojaNome": "SPAM - VIEIRALVES",
    "nomeBi": "Vieiralves",
    "regional": "SPAM",
    "uf": "AM",
    "ultimaData": "2026-08-21",
    "proximaPrevista": "2026-09-18",
    "auditor": "Ana Raquel",
    "status": "PENDENTE"
  },
  {
    "id": "PLAN_4",
    "lojaId": "4",
    "lojaNome": "SPBA - AEROPORTO LOJA",
    "nomeBi": "Aeroporto Salvador",
    "regional": "SPBA",
    "uf": "BA",
    "ultimaData": "2026-08-17",
    "proximaPrevista": "2026-08-10",
    "auditor": "Bruna Costa",
    "status": "CONCLUIDA"
  },
  {
    "id": "PLAN_5",
    "lojaId": "5",
    "lojaNome": "SPBA - AEROPORTO QUIOSQUE",
    "nomeBi": "Aeroporto Salvador Q",
    "regional": "SPBA",
    "uf": "BA",
    "ultimaData": "2026-08-14",
    "proximaPrevista": "2026-08-14",
    "auditor": "Bruna Costa",
    "status": "CONCLUIDA"
  },
  {
    "id": "PLAN_6",
    "lojaId": "6",
    "lojaNome": "SPBA - HORTO FLORESTAL",
    "nomeBi": "Horto Florestal",
    "regional": "SPBA",
    "uf": "BA",
    "ultimaData": "2026-08-21",
    "proximaPrevista": "2026-08-19",
    "auditor": "Matheus Cosme",
    "status": "CONCLUIDA"
  },
  {
    "id": "PLAN_7",
    "lojaId": "7",
    "lojaNome": "SPBA - PITUBA",
    "nomeBi": "Pituba",
    "regional": "SPBA",
    "uf": "BA",
    "ultimaData": "2026-08-25",
    "proximaPrevista": "2026-08-18",
    "auditor": "Bruna Costa",
    "status": "CONCLUIDA"
  },
  {
    "id": "PLAN_8",
    "lojaId": "8",
    "lojaNome": "SPBA - PRAIA DO FORTE",
    "nomeBi": "Praia Forte",
    "regional": "SPBA",
    "uf": "BA",
    "ultimaData": "2026-08-27",
    "proximaPrevista": "2026-08-19",
    "auditor": "Matheus Cosme",
    "status": "CONCLUIDA"
  },
  {
    "id": "PLAN_9",
    "lojaId": "9",
    "lojaNome": "SPBA - SHOPPING SALVADOR",
    "nomeBi": "Salvador Shopping",
    "regional": "SPBA",
    "uf": "BA",
    "ultimaData": "2026-08-20",
    "proximaPrevista": "2026-08-19",
    "auditor": "Matheus Cosme",
    "status": "CONCLUIDA"
  },
  {
    "id": "PLAN_10",
    "lojaId": "10",
    "lojaNome": "SPBA - SHOPPING DA BAHIA",
    "nomeBi": "Shopping da Bahia",
    "regional": "SPBA",
    "uf": "BA",
    "ultimaData": "2026-08-28",
    "proximaPrevista": "2026-08-26",
    "auditor": "Bruna Costa",
    "status": "CONCLUIDA"
  },
  {
    "id": "PLAN_11",
    "lojaId": "11",
    "lojaNome": "SPBA - SHOPPING PARALELA",
    "nomeBi": "Shopping Paralela",
    "regional": "SPBA",
    "uf": "BA",
    "ultimaData": "2026-08-12",
    "proximaPrevista": "2026-08-12",
    "auditor": "Bruna Costa",
    "status": "CONCLUIDA"
  },
  {
    "id": "PLAN_12",
    "lojaId": "12",
    "lojaNome": "SPBA - VILLAS",
    "nomeBi": "Vilas do Atlântico",
    "regional": "SPBA",
    "uf": "BA",
    "ultimaData": "2026-08-28",
    "proximaPrevista": "2026-08-19",
    "auditor": "Matheus Cosme",
    "status": "CONCLUIDA"
  },
  {
    "id": "PLAN_13",
    "lojaId": "13",
    "lojaNome": "SPCE - AEROPORTO LOJA",
    "nomeBi": "Aeroporto Fortaleza",
    "regional": "SPCE",
    "uf": "CE",
    "ultimaData": "2026-08-24",
    "proximaPrevista": "2026-08-17",
    "auditor": "Bruna Costa",
    "status": "CONCLUIDA"
  },
  {
    "id": "PLAN_14",
    "lojaId": "14",
    "lojaNome": "SPCE - AEROPORTO QUIOSQUE",
    "nomeBi": "Aeroporto Fortaleza Q",
    "regional": "SPCE",
    "uf": "CE",
    "ultimaData": "2026-07-30",
    "proximaPrevista": "2026-08-31",
    "auditor": "Bruna Costa",
    "status": "AGENDADA"
  },
  {
    "id": "PLAN_15",
    "lojaId": "15",
    "lojaNome": "SPCE - AQUIRAZ",
    "nomeBi": "Arvorar",
    "regional": "SPCE",
    "uf": "CE",
    "ultimaData": "2026-08-27",
    "proximaPrevista": "2026-08-27",
    "auditor": "Matheus Cosme",
    "status": "CONCLUIDA"
  },
  {
    "id": "PLAN_16",
    "lojaId": "16",
    "lojaNome": "SPCE - BEIRA MAR LOJA",
    "nomeBi": "Beira Mar",
    "regional": "SPCE",
    "uf": "CE",
    "ultimaData": "2026-08-24",
    "proximaPrevista": "2026-09-11",
    "auditor": "Ana Raquel",
    "status": "PENDENTE"
  },
  {
    "id": "PLAN_17",
    "lojaId": "17",
    "lojaNome": "SPCE - BEIRA MAR QUIOSQUE",
    "nomeBi": "Beira Mar Q",
    "regional": "SPCE",
    "uf": "CE",
    "ultimaData": "2026-07-29",
    "proximaPrevista": "2026-08-31",
    "auditor": "Matheus Cosme",
    "status": "AGENDADA"
  },
  {
    "id": "PLAN_18",
    "lojaId": "18",
    "lojaNome": "SPCE - LOJA EUSEBIO",
    "nomeBi": "Eusébio",
    "regional": "SPCE",
    "uf": "CE",
    "ultimaData": "2026-08-27",
    "proximaPrevista": "2026-08-27",
    "auditor": "Matheus Cosme",
    "status": "CONCLUIDA"
  },
  {
    "id": "PLAN_19",
    "lojaId": "19",
    "lojaNome": "SPCE - FATIMA",
    "nomeBi": "Fátima",
    "regional": "SPCE",
    "uf": "CE",
    "ultimaData": "2026-07-30",
    "proximaPrevista": "2026-08-31",
    "auditor": "Bruna Costa",
    "status": "AGENDADA"
  },
  {
    "id": "PLAN_20",
    "lojaId": "20",
    "lojaNome": "SPCE - FLORES",
    "nomeBi": "Flores",
    "regional": "SPCE",
    "uf": "CE",
    "ultimaData": "2026-08-20",
    "proximaPrevista": "2026-09-18",
    "auditor": "Ana Raquel",
    "status": "PENDENTE"
  },
  {
    "id": "PLAN_21",
    "lojaId": "21",
    "lojaNome": "SPCE - DESEMBARGADOR MOREIRA",
    "nomeBi": "Meireles",
    "regional": "SPCE",
    "uf": "CE",
    "ultimaData": "2026-07-29",
    "proximaPrevista": "2026-09-21",
    "auditor": "Ana Raquel",
    "status": "PENDENTE"
  },
  {
    "id": "PLAN_22",
    "lojaId": "22",
    "lojaNome": "SPCE - OUTLET FORTALEZA",
    "nomeBi": "Outlet Fortaleza",
    "regional": "SPCE",
    "uf": "CE",
    "ultimaData": "2026-08-18",
    "proximaPrevista": "2026-08-18",
    "auditor": "Bruna Costa",
    "status": "CONCLUIDA"
  },
  {
    "id": "PLAN_23",
    "lojaId": "23",
    "lojaNome": "SPCE - PARANGABA",
    "nomeBi": "Parangaba",
    "regional": "SPCE",
    "uf": "CE",
    "ultimaData": "2026-07-30",
    "proximaPrevista": "2026-08-31",
    "auditor": "Bruna Costa",
    "status": "AGENDADA"
  },
  {
    "id": "PLAN_24",
    "lojaId": "24",
    "lojaNome": "SPCE - RIO MAR FORTALEZA",
    "nomeBi": "Riomar Fortaleza",
    "regional": "SPCE",
    "uf": "CE",
    "ultimaData": "2026-08-27",
    "proximaPrevista": "2026-09-16",
    "auditor": "Ana Raquel",
    "status": "PENDENTE"
  },
  {
    "id": "PLAN_25",
    "lojaId": "25",
    "lojaNome": "SPCE - RIO MAR KENNEDY",
    "nomeBi": "Riomar Kennedy",
    "regional": "SPCE",
    "uf": "CE",
    "ultimaData": "2026-08-25",
    "proximaPrevista": "2026-08-28",
    "auditor": "Bruna Costa",
    "status": "CONCLUIDA"
  },
  {
    "id": "PLAN_26",
    "lojaId": "26",
    "lojaNome": "SPCE - SHOPPING IGUATEMI",
    "nomeBi": "Shopping Iguatemi",
    "regional": "SPCE",
    "uf": "CE",
    "ultimaData": "2026-08-27",
    "proximaPrevista": "2026-09-30",
    "auditor": "Ana Raquel",
    "status": "PENDENTE"
  },
  {
    "id": "PLAN_27",
    "lojaId": "27",
    "lojaNome": "SPCE - LOJA SUL",
    "nomeBi": "Sul",
    "regional": "SPCE",
    "uf": "CE",
    "ultimaData": "2026-08-27",
    "proximaPrevista": "2026-09-14",
    "auditor": "Ana Raquel",
    "status": "PENDENTE"
  },
  {
    "id": "PLAN_28",
    "lojaId": "28",
    "lojaNome": "SPCE - ANA BILHAR",
    "nomeBi": "Varjota",
    "regional": "SPCE",
    "uf": "CE",
    "ultimaData": "2026-07-29",
    "proximaPrevista": "2026-09-17",
    "auditor": "Ana Raquel",
    "status": "PENDENTE"
  },
  {
    "id": "PLAN_29",
    "lojaId": "29",
    "lojaNome": "SPCE - WORK CAFE",
    "nomeBi": "Work Café",
    "regional": "SPCE",
    "uf": "CE",
    "ultimaData": "2026-08-26",
    "proximaPrevista": "2026-08-26",
    "auditor": "Bruna Costa",
    "status": "CONCLUIDA"
  },
  {
    "id": "PLAN_30",
    "lojaId": "30",
    "lojaNome": "SPCE 2 - ICARAI DE AMONTADA",
    "nomeBi": "Icaraí de Amontada",
    "regional": "SPCE 2",
    "uf": "CE2",
    "ultimaData": "2026-08-28",
    "proximaPrevista": "2026-08-14",
    "auditor": "Bruna Costa",
    "status": "CONCLUIDA"
  },
  {
    "id": "PLAN_31",
    "lojaId": "31",
    "lojaNome": "SPCE 2 - JERICOACOARA",
    "nomeBi": "Jericoacoara",
    "regional": "SPCE 2",
    "uf": "CE2",
    "ultimaData": "2026-08-27",
    "proximaPrevista": "2026-09-14",
    "auditor": "Ana Raquel",
    "status": "PENDENTE"
  },
  {
    "id": "PLAN_32",
    "lojaId": "32",
    "lojaNome": "SPCE 2 - PREA",
    "nomeBi": "Preá",
    "regional": "SPCE 2",
    "uf": "CE2",
    "ultimaData": "2026-08-26",
    "proximaPrevista": "2026-09-15",
    "auditor": "Ana Raquel",
    "status": "PENDENTE"
  },
  {
    "id": "PLAN_33",
    "lojaId": "33",
    "lojaNome": "SPCE 2 - SOBRAL",
    "nomeBi": "Sobral",
    "regional": "SPCE 2",
    "uf": "CE2",
    "ultimaData": "2026-08-25",
    "proximaPrevista": "2026-09-21",
    "auditor": "Ana Raquel",
    "status": "PENDENTE"
  },
  {
    "id": "PLAN_34",
    "lojaId": "34",
    "lojaNome": "SPCE 3 - JUAZEIRO DO NORTE",
    "nomeBi": "Juazeiro do Norte",
    "regional": "SPCE 3",
    "uf": "CE3",
    "ultimaData": "2026-08-17",
    "proximaPrevista": "2026-08-10",
    "auditor": "Bruna Costa",
    "status": "CONCLUIDA"
  },
  {
    "id": "PLAN_35",
    "lojaId": "35",
    "lojaNome": "SPCE 3 - DABLIO MALL",
    "nomeBi": "Dablio Mall",
    "regional": "SPCE 3",
    "uf": "CE3",
    "ultimaData": "2026-08-18",
    "proximaPrevista": "2026-09-22",
    "auditor": "Ana Raquel",
    "status": "PENDENTE"
  },
  {
    "id": "PLAN_36",
    "lojaId": "36",
    "lojaNome": "SPMA - SHOPPING DA ILHA",
    "nomeBi": "Cohama",
    "regional": "SPMA",
    "uf": "MA",
    "ultimaData": "2026-08-19",
    "proximaPrevista": "2026-08-19",
    "auditor": "Bruna Costa",
    "status": "CONCLUIDA"
  },
  {
    "id": "PLAN_37",
    "lojaId": "37",
    "lojaNome": "SPMA - SHOPPING SAO LUIS",
    "nomeBi": "São Luís Shopping",
    "regional": "SPMA",
    "uf": "MA",
    "ultimaData": "2026-08-25",
    "proximaPrevista": "2026-09-11",
    "auditor": "Ana Raquel",
    "status": "PENDENTE"
  },
  {
    "id": "PLAN_38",
    "lojaId": "38",
    "lojaNome": "SPMT - SHOPPING PANTANAL",
    "nomeBi": "Shopping Pantanal",
    "regional": "SPMT",
    "uf": "MT",
    "ultimaData": "2026-08-27",
    "proximaPrevista": "2026-09-15",
    "auditor": "Ana Raquel",
    "status": "PENDENTE"
  },
  {
    "id": "PLAN_39",
    "lojaId": "39",
    "lojaNome": "SPMT - ESTACAO CUIABA",
    "nomeBi": "Shopping Estação Cuiabá",
    "regional": "SPMT",
    "uf": "MT",
    "ultimaData": "2026-07-20",
    "proximaPrevista": "2026-09-22",
    "auditor": "Ana Raquel",
    "status": "PENDENTE"
  },
  {
    "id": "PLAN_40",
    "lojaId": "40",
    "lojaNome": "SPPA - SHOPPING BOULEVARD",
    "nomeBi": "Boulevard Shopping",
    "regional": "SPPA",
    "uf": "PA",
    "ultimaData": "2026-08-21",
    "proximaPrevista": "2026-08-11",
    "auditor": "Bruna Costa",
    "status": "CONCLUIDA"
  },
  {
    "id": "PLAN_41",
    "lojaId": "41",
    "lojaNome": "SPPA - PARQUE SHOPPING",
    "nomeBi": "Belém Parque Shopping",
    "regional": "SPPA",
    "uf": "PA",
    "ultimaData": "2026-08-28",
    "proximaPrevista": "2026-09-16",
    "auditor": "Ana Raquel",
    "status": "PENDENTE"
  },
  {
    "id": "PLAN_42",
    "lojaId": "42",
    "lojaNome": "SPPA - SHOPPING GRAO PARA",
    "nomeBi": "Shopping Grão Pará",
    "regional": "SPPA",
    "uf": "PA",
    "ultimaData": "2026-08-25",
    "proximaPrevista": "2026-09-10",
    "auditor": "Ana Raquel",
    "status": "CONCLUIDA"
  },
  {
    "id": "PLAN_43",
    "lojaId": "43",
    "lojaNome": "SPPA - UMARIZAL",
    "nomeBi": "Umarizal",
    "regional": "SPPA",
    "uf": "PA",
    "ultimaData": "2026-08-28",
    "proximaPrevista": "2026-08-21",
    "auditor": "Bruna Costa",
    "status": "CONCLUIDA"
  },
  {
    "id": "PLAN_44",
    "lojaId": "44",
    "lojaNome": "SPPB - CAMPINA GRANDE",
    "nomeBi": "Campina Grande",
    "regional": "SPPB",
    "uf": "PB",
    "ultimaData": "2026-08-26",
    "proximaPrevista": "2026-09-17",
    "auditor": "Ana Raquel",
    "status": "PENDENTE"
  },
  {
    "id": "PLAN_45",
    "lojaId": "45",
    "lojaNome": "SPPB - SHOPPING MANAIRA",
    "nomeBi": "Manaíra Shopping",
    "regional": "SPPB",
    "uf": "PB",
    "ultimaData": "2026-08-13",
    "proximaPrevista": "2026-08-07",
    "auditor": "Bruna Costa",
    "status": "CONCLUIDA"
  },
  {
    "id": "PLAN_46",
    "lojaId": "46",
    "lojaNome": "SPPB - ORIGENS",
    "nomeBi": "Origens Paraíba",
    "regional": "SPPB",
    "uf": "PB",
    "ultimaData": "",
    "proximaPrevista": "2026-09-23",
    "auditor": "Ana Raquel",
    "status": "PENDENTE"
  },
  {
    "id": "PLAN_47",
    "lojaId": "47",
    "lojaNome": "SPPB - PARTAGE CAMPINA GRANDE",
    "nomeBi": "Partage",
    "regional": "SPPB",
    "uf": "PB",
    "ultimaData": "2026-08-21",
    "proximaPrevista": "2026-09-28",
    "auditor": "Ana Raquel",
    "status": "PENDENTE"
  },
  {
    "id": "PLAN_48",
    "lojaId": "48",
    "lojaNome": "SPPE - RUA AMELIA",
    "nomeBi": "Amélia",
    "regional": "SPPE",
    "uf": "PE",
    "ultimaData": "2026-08-10",
    "proximaPrevista": "2026-08-10",
    "auditor": "Bruna Costa",
    "status": "CONCLUIDA"
  },
  {
    "id": "PLAN_49",
    "lojaId": "49",
    "lojaNome": "SPPE - BOA VIAGEM",
    "nomeBi": "Boa Viagem",
    "regional": "SPPE",
    "uf": "PE",
    "ultimaData": "2026-08-12",
    "proximaPrevista": "2026-08-12",
    "auditor": "Bruna Costa",
    "status": "CONCLUIDA"
  },
  {
    "id": "PLAN_50",
    "lojaId": "50",
    "lojaNome": "SPPE - CARUARU SHOPPING",
    "nomeBi": "Caruaru Shopping",
    "regional": "SPPE",
    "uf": "PE",
    "ultimaData": "2026-08-24",
    "proximaPrevista": "2026-08-14",
    "auditor": "Bruna Costa",
    "status": "CONCLUIDA"
  },
  {
    "id": "PLAN_51",
    "lojaId": "51",
    "lojaNome": "SPPE - MAURICIO DE NASSAU",
    "nomeBi": "Maurício de Nassau",
    "regional": "SPPE",
    "uf": "PE",
    "ultimaData": "2026-08-28",
    "proximaPrevista": "2026-09-28",
    "auditor": "Ana Raquel",
    "status": "PENDENTE"
  },
  {
    "id": "PLAN_52",
    "lojaId": "52",
    "lojaNome": "SPPE - ORIGENS",
    "nomeBi": "Origens PE",
    "regional": "SPPE",
    "uf": "PE",
    "ultimaData": "2026-08-28",
    "proximaPrevista": "2026-09-23",
    "auditor": "Ana Raquel",
    "status": "PENDENTE"
  },
  {
    "id": "PLAN_53",
    "lojaId": "53",
    "lojaNome": "SPPE - SHOPPING PATTEO OLINDA",
    "nomeBi": "Shopping Patteo Olinda",
    "regional": "SPPE",
    "uf": "PE",
    "ultimaData": "2026-08-21",
    "proximaPrevista": "2026-08-21",
    "auditor": "Bruna Costa",
    "status": "CONCLUIDA"
  },
  {
    "id": "PLAN_54",
    "lojaId": "54",
    "lojaNome": "SPPE - SHOPPING GUARARAPES",
    "nomeBi": "Shopping Guararapes",
    "regional": "SPPE",
    "uf": "PE",
    "ultimaData": "2026-08-26",
    "proximaPrevista": "2026-09-30",
    "auditor": "Ana Raquel",
    "status": "PENDENTE"
  },
  {
    "id": "PLAN_55",
    "lojaId": "55",
    "lojaNome": "SPPE - SHOPPING RECIFE",
    "nomeBi": "Shopping Recife",
    "regional": "SPPE",
    "uf": "PE",
    "ultimaData": "2026-08-24",
    "proximaPrevista": "2026-08-24",
    "auditor": "Bruna Costa",
    "status": "CONCLUIDA"
  },
  {
    "id": "PLAN_56",
    "lojaId": "56",
    "lojaNome": "SPPE - RIO MAR RECIFE",
    "nomeBi": "Shopping Riomar Recife",
    "regional": "SPPE",
    "uf": "PE",
    "ultimaData": "2026-08-26",
    "proximaPrevista": "2026-09-29",
    "auditor": "Ana Raquel",
    "status": "PENDENTE"
  },
  {
    "id": "PLAN_57",
    "lojaId": "57",
    "lojaNome": "SPPE - SHOPPING TACARUNA",
    "nomeBi": "Shopping Tacaruna",
    "regional": "SPPE",
    "uf": "PE",
    "ultimaData": "2026-08-28",
    "proximaPrevista": "2026-09-11",
    "auditor": "Ana Raquel",
    "status": "PENDENTE"
  },
  {
    "id": "PLAN_58",
    "lojaId": "58",
    "lojaNome": "SPPI - DIRCEU",
    "nomeBi": "Dirceu",
    "regional": "SPPI",
    "uf": "PI",
    "ultimaData": "2026-08-17",
    "proximaPrevista": "2026-09-29",
    "auditor": "Ana Raquel",
    "status": "PENDENTE"
  },
  {
    "id": "PLAN_59",
    "lojaId": "59",
    "lojaNome": "SPPI - DOM SEVERINO",
    "nomeBi": "Dom Severino",
    "regional": "SPPI",
    "uf": "PI",
    "ultimaData": "2026-08-10",
    "proximaPrevista": "2026-08-10",
    "auditor": "Bruna Costa",
    "status": "CONCLUIDA"
  },
  {
    "id": "PLAN_60",
    "lojaId": "60",
    "lojaNome": "SPPI - SHOPPING RIVERSIDE",
    "nomeBi": "Riverside",
    "regional": "SPPI",
    "uf": "PI",
    "ultimaData": "2026-08-17",
    "proximaPrevista": "2026-09-18",
    "auditor": "Ana Raquel",
    "status": "PENDENTE"
  },
  {
    "id": "PLAN_61",
    "lojaId": "61",
    "lojaNome": "SPPI - SHOPPING RIO POTY",
    "nomeBi": "Shopping Rio Poty",
    "regional": "SPPI",
    "uf": "PI",
    "ultimaData": "2026-08-21",
    "proximaPrevista": "2026-08-11",
    "auditor": "Bruna Costa",
    "status": "CONCLUIDA"
  },
  {
    "id": "PLAN_62",
    "lojaId": "62",
    "lojaNome": "SPRN - LAGOA MALL",
    "nomeBi": "Lagoa Mall",
    "regional": "SPRN",
    "uf": "RN",
    "ultimaData": "2026-08-27",
    "proximaPrevista": "2026-08-22",
    "auditor": "Bruna Costa",
    "status": "CONCLUIDA"
  },
  {
    "id": "PLAN_63",
    "lojaId": "63",
    "lojaNome": "SPRN - MIDWAY",
    "nomeBi": "Midway Mall",
    "regional": "SPRN",
    "uf": "RN",
    "ultimaData": "2026-08-28",
    "proximaPrevista": "2026-09-14",
    "auditor": "Ana Raquel",
    "status": "PENDENTE"
  },
  {
    "id": "PLAN_64",
    "lojaId": "64",
    "lojaNome": "SPRN - MOSSORO",
    "nomeBi": "Mossoró",
    "regional": "SPRN",
    "uf": "RN",
    "ultimaData": "2026-08-26",
    "proximaPrevista": "2026-08-14",
    "auditor": "Bruna Costa",
    "status": "CONCLUIDA"
  },
  {
    "id": "PLAN_65",
    "lojaId": "65",
    "lojaNome": "SPRN - NATAL SHOPPING",
    "nomeBi": "Natal Shopping",
    "regional": "SPRN",
    "uf": "RN",
    "ultimaData": "2026-08-13",
    "proximaPrevista": "2026-08-13",
    "auditor": "Bruna Costa",
    "status": "CONCLUIDA"
  },
  {
    "id": "PLAN_66",
    "lojaId": "66",
    "lojaNome": "SPRN - NOVA PARNAMIRIM",
    "nomeBi": "Parnamirim",
    "regional": "SPRN",
    "uf": "RN",
    "ultimaData": "2026-08-25",
    "proximaPrevista": "2026-08-17",
    "auditor": "Bruna Costa",
    "status": "CONCLUIDA"
  },
  {
    "id": "PLAN_67",
    "lojaId": "67",
    "lojaNome": "SPSE - JARDINS",
    "nomeBi": "Shopping Jardins",
    "regional": "SPSE",
    "uf": "SE",
    "ultimaData": "2026-08-11",
    "proximaPrevista": "2026-08-11",
    "auditor": "Bruna Costa",
    "status": "CONCLUIDA"
  },
  {
    "id": "PLAN_68",
    "lojaId": "68",
    "lojaNome": "SPSE - ARACAJU",
    "nomeBi": "Riomar Aracaju",
    "regional": "SPSE",
    "uf": "SE",
    "ultimaData": "2026-08-21",
    "proximaPrevista": "2026-08-21",
    "auditor": "Matheus Cosme",
    "status": "CONCLUIDA"
  },
  {
    "id": "PLAN_69",
    "lojaId": "69",
    "lojaNome": "SPSP - SHOPPING CIDADE SAO PAULO",
    "nomeBi": "Cidade São Paulo",
    "regional": "SPSP",
    "uf": "SP",
    "ultimaData": "2026-08-21",
    "proximaPrevista": "2026-08-17",
    "auditor": "Bruna Costa",
    "status": "CONCLUIDA"
  },
  {
    "id": "PLAN_70",
    "lojaId": "70",
    "lojaNome": "SPSP - MORUMBI SHOPPING",
    "nomeBi": "Morumbi Shopping",
    "regional": "SPSP",
    "uf": "SP",
    "ultimaData": "",
    "proximaPrevista": "",
    "auditor": "",
    "status": "PENDENTE"
  },
  {
    "id": "PLAN_71",
    "lojaId": "71",
    "lojaNome": "SPSP - SHOPPING PATIO PAULISTA",
    "nomeBi": "Pátio Paulista",
    "regional": "SPSP",
    "uf": "SP",
    "ultimaData": "2026-08-07",
    "proximaPrevista": "2026-08-07",
    "auditor": "Bruna Costa",
    "status": "CONCLUIDA"
  },
  {
    "id": "PLAN_72",
    "lojaId": "72",
    "lojaNome": "SPSP - SHOPPING ELDORADO",
    "nomeBi": "Shopping Eldorado",
    "regional": "SPSP",
    "uf": "SP",
    "ultimaData": "2026-08-22",
    "proximaPrevista": "2026-08-10",
    "auditor": "Bruna Costa",
    "status": "CONCLUIDA"
  }
];

const REAL_BACKUP_MAPEAMENTO = [
  {
    "id": "xgRmEV12vbLGs5KKY2Sx",
    "lojaNome": "SPRN - MIDWAY",
    "data": "2026-08-28",
    "realizada": "SIM",
    "motivo": "Auditoria Concluída",
    "auditor": "Ana Raquel",
    "nTentativa": 1,
    "semana": "Semana 4"
  },
  {
    "id": "o1m4j4jyMGwiAtdyJfs2",
    "lojaNome": "SPCE 2 - ICARAI DE AMONTADA",
    "data": "2026-08-28",
    "realizada": "SIM",
    "motivo": "Auditoria Concluída",
    "auditor": "Bruna Costa",
    "nTentativa": 3,
    "semana": "Semana 4"
  },
  {
    "id": "ikUARLC9NCQtsU4JaTeo",
    "lojaNome": "SPPA - UMARIZAL",
    "data": "2026-08-28",
    "realizada": "SIM",
    "motivo": "Auditoria Concluída",
    "auditor": "Bruna Costa",
    "nTentativa": 3,
    "semana": "Semana 4"
  },
  {
    "id": "f1skwUMOfwfqpxzTVhuu",
    "lojaNome": "SPRN - MIDWAY",
    "data": "2026-08-28",
    "realizada": "SIM",
    "motivo": "Auditoria Concluída",
    "auditor": "Ana Raquel",
    "nTentativa": 2,
    "semana": "Semana 4"
  },
  {
    "id": "YcdZEoQDLxC3gYBlUEKs",
    "lojaNome": "SPPE - SHOPPING TACARUNA",
    "data": "2026-08-28",
    "realizada": "SIM",
    "motivo": "Auditoria Concluída",
    "auditor": "Matheus Cosme",
    "nTentativa": 1,
    "semana": "Semana 4"
  },
  {
    "id": "Ry6fKrwxrUgKxCw2Z8wS",
    "lojaNome": "SPBA - VILLAS",
    "data": "2026-08-28",
    "realizada": "SIM",
    "motivo": "Auditoria Concluída",
    "auditor": "Matheus Cosme",
    "nTentativa": 2,
    "semana": "Semana 4"
  },
  {
    "id": "MOTSSjuaZds8bSUtNgyF",
    "lojaNome": "SPPE - MAURICIO DE NASSAU",
    "data": "2026-08-28",
    "realizada": "SIM",
    "motivo": "Auditoria Concluída",
    "auditor": "Matheus Cosme",
    "nTentativa": 2,
    "semana": "Semana 4"
  },
  {
    "id": "JQiqRVQ3Eh5aCbuaSmWh",
    "lojaNome": "SPBA - SHOPPING DA BAHIA",
    "data": "2026-08-28",
    "realizada": "NÃO",
    "motivo": "LOJA NÃO ATENDEU A LIGAÇÃO",
    "auditor": "Bruna Costa",
    "nTentativa": 1,
    "semana": "Semana 4"
  },
  {
    "id": "GnZ20kC6TMHtpl73h4mz",
    "lojaNome": "SPPE - ORIGENS",
    "data": "2026-08-28",
    "realizada": "SIM",
    "motivo": "Auditoria Concluída",
    "auditor": "Bruna Costa",
    "nTentativa": 1,
    "semana": "Semana 4"
  },
  {
    "id": "E3wzHYX5SNaZs0x9MP1z",
    "lojaNome": "SPBA - SHOPPING DA BAHIA",
    "data": "2026-08-28",
    "realizada": "SIM",
    "motivo": "Auditoria Concluída",
    "auditor": "Bruna Costa",
    "nTentativa": 2,
    "semana": "Semana 4"
  },
  {
    "id": "C5LnXqsbAOllo8FivxtT",
    "lojaNome": "SPPA - PARQUE SHOPPING",
    "data": "2026-08-28",
    "realizada": "SIM",
    "motivo": "Auditoria Concluída",
    "auditor": "Matheus Cosme",
    "nTentativa": 2,
    "semana": "Semana 4"
  },
  {
    "id": "rcCri1wdzxO1HEELalGp",
    "lojaNome": "SPCE 2 - JERICOACOARA",
    "data": "2026-08-27",
    "realizada": "SIM",
    "motivo": "Auditoria Concluída",
    "auditor": "Ana Raquel",
    "nTentativa": 3,
    "semana": "Semana 4"
  },
  {
    "id": "mddpL1AB6hhWM4mYqeoP",
    "lojaNome": "SPCE - RIO MAR FORTALEZA",
    "data": "2026-08-27",
    "realizada": "SIM",
    "motivo": "Auditoria Concluída",
    "auditor": "Matheus Cosme",
    "nTentativa": 1,
    "semana": "Semana 4"
  },
  {
    "id": "lCGTFt9gRzvOLkd8369M",
    "lojaNome": "SPRN - LAGOA MALL",
    "data": "2026-08-27",
    "realizada": "NÃO",
    "motivo": "LOJA NÃO ATENDEU A LIGAÇÃO",
    "auditor": "Bruna Costa",
    "nTentativa": 1,
    "semana": "Semana 4"
  },
  {
    "id": "f0kCVYUuhzRMroI6zHMT",
    "lojaNome": "SPRN - LAGOA MALL",
    "data": "2026-08-27",
    "realizada": "SIM",
    "motivo": "Auditoria Concluída",
    "auditor": "Bruna Costa",
    "nTentativa": 2,
    "semana": "Semana 4"
  },
  {
    "id": "VwXOvYFYZ3gkeDjgrzpn",
    "lojaNome": "SPBA - PRAIA DO FORTE",
    "data": "2026-08-27",
    "realizada": "SIM",
    "motivo": "Auditoria Concluída",
    "auditor": "Ana Raquel",
    "nTentativa": 2,
    "semana": "Semana 4"
  },
  {
    "id": "V7dYuDrLKeit72HRmwKR",
    "lojaNome": "SPCE - AQUIRAZ",
    "data": "2026-08-27",
    "realizada": "SIM",
    "motivo": "Auditoria Concluída",
    "auditor": "Matheus Cosme",
    "nTentativa": 1,
    "semana": "Semana 4"
  },
  {
    "id": "SPC3QD6l1ufdiPHtl7q6",
    "lojaNome": "SPCE - LOJA EUSEBIO",
    "data": "2026-08-27",
    "realizada": "SIM",
    "motivo": "Auditoria Concluída",
    "auditor": "Matheus Cosme",
    "nTentativa": 1,
    "semana": "Semana 4"
  },
  {
    "id": "QzMgcN8wbFJSVtt9PeAR",
    "lojaNome": "SPMT - SHOPPING PANTANAL",
    "data": "2026-08-27",
    "realizada": "SIM",
    "motivo": "Auditoria Concluída",
    "auditor": "Ana Raquel",
    "nTentativa": 2,
    "semana": "Semana 4"
  },
  {
    "id": "M2DjvFXBqCw9qrYjaCpR",
    "lojaNome": "SPPA - UMARIZAL",
    "data": "2026-08-27",
    "realizada": "NÃO",
    "motivo": "LOJA NÃO ATENDEU A LIGAÇÃO",
    "auditor": "Bruna Costa",
    "nTentativa": 2,
    "semana": "Semana 4"
  },
  {
    "id": "HsvJCjQt0IYxniCRvTDN",
    "lojaNome": "SPCE - LOJA SUL",
    "data": "2026-08-27",
    "realizada": "SIM",
    "motivo": "Auditoria Concluída",
    "auditor": "Matheus Cosme",
    "nTentativa": 1,
    "semana": "Semana 4"
  },
  {
    "id": "EBR3V9I4l2i1hChxrfj2",
    "lojaNome": "SPCE - SHOPPING IGUATEMI",
    "data": "2026-08-27",
    "realizada": "SIM",
    "motivo": "Auditoria Concluída",
    "auditor": "Matheus Cosme",
    "nTentativa": 1,
    "semana": "Semana 4"
  },
  {
    "id": "vh6b6GenVN6hbn7rv411",
    "lojaNome": "SPCE - WORK CAFE",
    "data": "2026-08-26",
    "realizada": "SIM",
    "motivo": "Auditoria Concluída",
    "auditor": "Bruna Costa",
    "nTentativa": 1,
    "semana": "Semana 4"
  },
  {
    "id": "rckUCOc9vNx8jTJM6mzQ",
    "lojaNome": "SPRN - MIDWAY",
    "data": "2026-08-26",
    "realizada": "NÃO",
    "motivo": "ENCARREGADO NÃO ESTAVA EM LOJA",
    "auditor": "Ana Raquel",
    "nTentativa": 1,
    "semana": "Semana 4"
  },
  {
    "id": "pZq2qZypkZ4WqLBc4MKi",
    "lojaNome": "SPBA - PRAIA DO FORTE",
    "data": "2026-08-26",
    "realizada": "NÃO",
    "motivo": "ENCARREGADO NÃO ESTAVA EM LOJA",
    "auditor": "Ana Raquel",
    "nTentativa": 1,
    "semana": "Semana 4"
  },
  {
    "id": "oUsz7g0ZPapmL2zOBVRY",
    "lojaNome": "SPRN - MOSSORO",
    "data": "2026-08-26",
    "realizada": "SIM",
    "motivo": "Auditoria Concluída",
    "auditor": "Bruna Costa",
    "nTentativa": 1,
    "semana": "Semana 4"
  },
  {
    "id": "mdbiOjNizRFd8Sn6gK9r",
    "lojaNome": "SPBA - VILLAS",
    "data": "2026-08-26",
    "realizada": "NÃO",
    "motivo": "ENCARREGADO NÃO ESTAVA EM LOJA",
    "auditor": "Ana Raquel",
    "nTentativa": 1,
    "semana": "Semana 4"
  },
  {
    "id": "l7LDd6AJfHe8c0dniUIC",
    "lojaNome": "SPPB - CAMPINA GRANDE",
    "data": "2026-08-26",
    "realizada": "SIM",
    "motivo": "Auditoria Concluída",
    "auditor": "Matheus Cosme",
    "nTentativa": 1,
    "semana": "Semana 4"
  },
  {
    "id": "ke5NlPTELpLg79YAMTsa",
    "lojaNome": "SPRN - MOSSORO",
    "data": "2026-08-26",
    "realizada": "SIM",
    "motivo": "Auditoria Concluída",
    "auditor": "Ana Raquel",
    "nTentativa": 3,
    "semana": "Semana 4"
  },
  {
    "id": "hwJb0wcaOtPIOCz1ByMW",
    "lojaNome": "SPPE - RIO MAR RECIFE",
    "data": "2026-08-26",
    "realizada": "SIM",
    "motivo": "Auditoria Concluída",
    "auditor": "Matheus Cosme",
    "nTentativa": 1,
    "semana": "Semana 4"
  },
  {
    "id": "cv23pySP2XAIONXWwqfM",
    "lojaNome": "SPCE 2 - PREA",
    "data": "2026-08-26",
    "realizada": "SIM",
    "motivo": "Auditoria Concluída",
    "auditor": "Ana Raquel",
    "nTentativa": 2,
    "semana": "Semana 4"
  },
  {
    "id": "UqGQ49IgBkRbgMZEZMMX",
    "lojaNome": "SPPA - PARQUE SHOPPING",
    "data": "2026-08-26",
    "realizada": "NÃO",
    "motivo": "LOJA NÃO ATENDEU A LIGAÇÃO",
    "auditor": "Ana Raquel",
    "nTentativa": 1,
    "semana": "Semana 4"
  },
  {
    "id": "UNixHeUqX1NR3ppDgx4Y",
    "lojaNome": "SPCE 2 - JERICOACOARA",
    "data": "2026-08-26",
    "realizada": "NÃO",
    "motivo": "Outro (Descrever nas notas)",
    "auditor": "Ana Raquel",
    "nTentativa": 2,
    "semana": "Semana 4"
  },
  {
    "id": "2tCxJSqRe0E3fPpHrPzg",
    "lojaNome": "SPPE - SHOPPING GUARARAPES",
    "data": "2026-08-26",
    "realizada": "SIM",
    "motivo": "Auditoria Concluída",
    "auditor": "Matheus Cosme",
    "nTentativa": 1,
    "semana": "Semana 4"
  },
  {
    "id": "wxAZZZksq6eJfqc96wja",
    "lojaNome": "SPMT - SHOPPING PANTANAL",
    "data": "2026-08-25",
    "realizada": "NÃO",
    "motivo": "ENCARREGADO NÃO ESTAVA EM LOJA",
    "auditor": "Ana Raquel",
    "nTentativa": 1,
    "semana": "Semana 4"
  },
  {
    "id": "o55XlKSW4tkkqMGxV4Tx",
    "lojaNome": "SPPE - ORIGENS",
    "data": "2026-08-25",
    "realizada": "SIM",
    "motivo": "Auditoria Concluída",
    "auditor": "Matheus Cosme",
    "nTentativa": 1,
    "semana": "Semana 4"
  },
  {
    "id": "ngMYAcgNptC8ijMnZLm3",
    "lojaNome": "SPCE - RIO MAR KENNEDY",
    "data": "2026-08-25",
    "realizada": "SIM",
    "motivo": "Auditoria Concluída",
    "auditor": "Bruna Costa",
    "nTentativa": 1,
    "semana": "Semana 4"
  },
  {
    "id": "gW9ac0YfEiqoP2kYhsR9",
    "lojaNome": "SPPA - SHOPPING GRAO PARA",
    "data": "2026-08-25",
    "realizada": "SIM",
    "motivo": "Auditoria Concluída",
    "auditor": "Matheus Cosme",
    "nTentativa": 2,
    "semana": "Semana 4"
  },
  {
    "id": "Pyy3N7Qb2aY8cd61PFTK",
    "lojaNome": "SPMA - SHOPPING SAO LUIS",
    "data": "2026-08-25",
    "realizada": "SIM",
    "motivo": "Auditoria Concluída",
    "auditor": "Ana Raquel",
    "nTentativa": 2,
    "semana": "Semana 4"
  },
  {
    "id": "OTfGl6ChrtL8gCn6SpeO",
    "lojaNome": "SPCE 2 - PREA",
    "data": "2026-08-25",
    "realizada": "NÃO",
    "motivo": "ENCARREGADO NÃO ESTAVA EM LOJA",
    "auditor": "Ana Raquel",
    "nTentativa": 1,
    "semana": "Semana 4"
  },
  {
    "id": "NtqVwjr5xvXXXXWB9qbq",
    "lojaNome": "SPCE 2 - SOBRAL",
    "data": "2026-08-25",
    "realizada": "SIM",
    "motivo": "Auditoria Concluída",
    "auditor": "Matheus Cosme",
    "nTentativa": 2,
    "semana": "Semana 4"
  },
  {
    "id": "6EsbQBFUlRoowXT2D44X",
    "lojaNome": "SPBA - PITUBA",
    "data": "2026-08-25",
    "realizada": "SIM",
    "motivo": "Auditoria Concluída",
    "auditor": "Bruna Costa",
    "nTentativa": 2,
    "semana": "Semana 4"
  },
  {
    "id": "3o4MPTFXPLIt70F5DKrt",
    "lojaNome": "SPRN - NOVA PARNAMIRIM",
    "data": "2026-08-25",
    "realizada": "SIM",
    "motivo": "Auditoria Concluída",
    "auditor": "Bruna Costa",
    "nTentativa": 2,
    "semana": "Semana 4"
  },
  {
    "id": "yWCTMvLlgKNamQ4taXtn",
    "lojaNome": "SPCE - BEIRA MAR LOJA",
    "data": "2026-08-24",
    "realizada": "SIM",
    "motivo": "Auditoria Concluída",
    "auditor": "Ana Raquel",
    "nTentativa": 1,
    "semana": "Semana 4"
  },
  {
    "id": "wP8wAwzkI8Hfn8K2GhbM",
    "lojaNome": "SPAM - PONTA NEGRA",
    "data": "2026-08-24",
    "realizada": "SIM",
    "motivo": "Auditoria Concluída",
    "auditor": "Matheus Cosme",
    "nTentativa": 1,
    "semana": "Semana 4"
  },
  {
    "id": "iw0SoT7tQiSsMssKwZIJ",
    "lojaNome": "SPRN - MOSSORO",
    "data": "2026-08-24",
    "realizada": "NÃO",
    "motivo": "LOJA NÃO ATENDEU A LIGAÇÃO",
    "auditor": "Bruna Costa",
    "nTentativa": 2,
    "semana": "Semana 4"
  },
  {
    "id": "RNs1bxEnici9WpWSXsT6",
    "lojaNome": "SPCE - AEROPORTO LOJA",
    "data": "2026-08-24",
    "realizada": "SIM",
    "motivo": "Auditoria Concluída",
    "auditor": "Bruna Costa",
    "nTentativa": 2,
    "semana": "Semana 4"
  },
  {
    "id": "RJv6ybPAdveejubxKG6N",
    "lojaNome": "SPPE - SHOPPING RECIFE",
    "data": "2026-08-24",
    "realizada": "SIM",
    "motivo": "Auditoria Concluída",
    "auditor": "Bruna Costa",
    "nTentativa": 1,
    "semana": "Semana 4"
  },
  {
    "id": "F24mhjc80cso8N0y7Gy1",
    "lojaNome": "SPCE 2 - ICARAI DE AMONTADA",
    "data": "2026-08-24",
    "realizada": "NÃO",
    "motivo": "LOJA NÃO ATENDEU A LIGAÇÃO",
    "auditor": "Bruna Costa",
    "nTentativa": 2,
    "semana": "Semana 4"
  },
  {
    "id": "9M7JqdLbdVMLeF83giJR",
    "lojaNome": "SPPE - CARUARU SHOPPING",
    "data": "2026-08-24",
    "realizada": "SIM",
    "motivo": "Auditoria Concluída",
    "auditor": "Bruna Costa",
    "nTentativa": 3,
    "semana": "Semana 4"
  },
  {
    "id": "0VnNj3PonPGWn8Z0iude",
    "lojaNome": "SPPE - MAURICIO DE NASSAU",
    "data": "2026-08-24",
    "realizada": "NÃO",
    "motivo": "ENCARREGADO NÃO ATENDEU",
    "auditor": "Matheus Cosme",
    "nTentativa": 1,
    "semana": "Semana 4"
  },
  {
    "id": "OfJpU6QPh7cOTRUiPXbv",
    "lojaNome": "SPSP - SHOPPING ELDORADO",
    "data": "2026-08-22",
    "realizada": "SIM",
    "motivo": "Auditoria Concluída",
    "auditor": "Bruna Costa",
    "nTentativa": 2,
    "semana": "Semana 4"
  },
  {
    "id": "wLhATotuQ0YmI83YNmRI",
    "lojaNome": "SPSP - SHOPPING CIDADE SAO PAULO",
    "data": "2026-08-21",
    "realizada": "SIM",
    "motivo": "Auditoria Concluída",
    "auditor": "Bruna Costa",
    "nTentativa": 1,
    "semana": "Semana 3"
  },
  {
    "id": "trxASSAvh6oM20BSV2jn",
    "lojaNome": "SPBA - HORTO FLORESTAL",
    "data": "2026-08-21",
    "realizada": "SIM",
    "motivo": "Auditoria Concluída",
    "auditor": "Matheus Cosme",
    "nTentativa": 1,
    "semana": "Semana 3"
  },
  {
    "id": "fXQv3hbERwQZgfsA69KC",
    "lojaNome": "SPPE - SHOPPING PATTEO OLINDA",
    "data": "2026-08-21",
    "realizada": "SIM",
    "motivo": "Auditoria Concluída",
    "auditor": "Bruna Costa",
    "nTentativa": 1,
    "semana": "Semana 3"
  },
  {
    "id": "bpvS23ar6DJlZ6cO6BYH",
    "lojaNome": "SPSE - ARACAJU",
    "data": "2026-08-21",
    "realizada": "SIM",
    "motivo": "Auditoria Concluída",
    "auditor": "Matheus Cosme",
    "nTentativa": 1,
    "semana": "Semana 3"
  },
  {
    "id": "Sir9JuI8p2mOej23PVpE",
    "lojaNome": "SPPA - SHOPPING BOULEVARD",
    "data": "2026-08-21",
    "realizada": "NÃO",
    "motivo": "LOJA NÃO ATENDEU A LIGAÇÃO",
    "auditor": "Bruna Costa",
    "nTentativa": 2,
    "semana": "Semana 3"
  },
  {
    "id": "HxV0PeInPCKKItJdfsPi",
    "lojaNome": "SPPB - PARTAGE CAMPINA GRANDE",
    "data": "2026-08-21",
    "realizada": "SIM",
    "motivo": "Auditoria Concluída",
    "auditor": "Matheus Cosme",
    "nTentativa": 1,
    "semana": "Semana 3"
  },
  {
    "id": "GXj78Qyz5SDZ1LJa2Gro",
    "lojaNome": "SPPI - SHOPPING RIO POTY",
    "data": "2026-08-21",
    "realizada": "SIM",
    "motivo": "Auditoria Concluída",
    "auditor": "Bruna Costa",
    "nTentativa": 3,
    "semana": "Semana 3"
  },
  {
    "id": "DF4dWXGQ7Yu4VxS7H3s5",
    "lojaNome": "SPPA - SHOPPING BOULEVARD",
    "data": "2026-08-21",
    "realizada": "SIM",
    "motivo": "Auditoria Concluída",
    "auditor": "Bruna Costa",
    "nTentativa": 3,
    "semana": "Semana 3"
  },
  {
    "id": "AV64sNmOOCgEvcaLXbYi",
    "lojaNome": "SPAM - VIEIRALVES",
    "data": "2026-08-21",
    "realizada": "SIM",
    "motivo": "Auditoria Concluída",
    "auditor": "Matheus Cosme",
    "nTentativa": 1,
    "semana": "Semana 3"
  },
  {
    "id": "3aDKbyq5AHWjJ7MdbhtV",
    "lojaNome": "SPPI - SHOPPING RIO POTY",
    "data": "2026-08-21",
    "realizada": "NÃO",
    "motivo": "LOJA NÃO ATENDEU A LIGAÇÃO",
    "auditor": "Bruna Costa",
    "nTentativa": 2,
    "semana": "Semana 3"
  },
  {
    "id": "3WIRMGYZo0gceL501qlS",
    "lojaNome": "SPMA - SHOPPING SAO LUIS",
    "data": "2026-08-21",
    "realizada": "NÃO",
    "motivo": "ENCARREGADO NÃO ATENDEU",
    "auditor": "Matheus Cosme",
    "nTentativa": 1,
    "semana": "Semana 3"
  },
  {
    "id": "mYqp4VMvhKRG6ZrK34eZ",
    "lojaNome": "SPBA - SHOPPING SALVADOR",
    "data": "2026-08-20",
    "realizada": "SIM",
    "motivo": "Auditoria Concluída",
    "auditor": "Matheus Cosme",
    "nTentativa": 1,
    "semana": "Semana 3"
  },
  {
    "id": "7Sjpi5dVfjDWF40ZVpTh",
    "lojaNome": "SPCE - FLORES",
    "data": "2026-08-20",
    "realizada": "SIM",
    "motivo": "Auditoria Concluída",
    "auditor": "Matheus Cosme",
    "nTentativa": 1,
    "semana": "Semana 3"
  },
  {
    "id": "4sVcgOCtm4bKGDZLYQAO",
    "lojaNome": "SPMA - SHOPPING DA ILHA",
    "data": "2026-08-19",
    "realizada": "SIM",
    "motivo": "Auditoria Concluída",
    "auditor": "Bruna Costa",
    "nTentativa": 1,
    "semana": "Semana 3"
  },
  {
    "id": "xgiTsrxWtKN9TenQiyYo",
    "lojaNome": "SPCE - OUTLET FORTALEZA",
    "data": "2026-08-18",
    "realizada": "NÃO",
    "motivo": "LOJA NÃO ATENDEU A LIGAÇÃO",
    "auditor": "Bruna Costa",
    "nTentativa": 1,
    "semana": "Semana 3"
  },
  {
    "id": "rGu8Fq3AKjKRvKFqB6yg",
    "lojaNome": "SPPA - SHOPPING GRAO PARA",
    "data": "2026-08-18",
    "realizada": "NÃO",
    "motivo": "COLABORADOR SOZINHO EM LOJA",
    "auditor": "Matheus Cosme",
    "nTentativa": 1,
    "semana": "Semana 3"
  },
  {
    "id": "kri8PyELjw6rjGIZ7I7Y",
    "lojaNome": "SPBA - PITUBA",
    "data": "2026-08-18",
    "realizada": "NÃO",
    "motivo": "LOJA NÃO ATENDEU A LIGAÇÃO",
    "auditor": "Bruna Costa",
    "nTentativa": 1,
    "semana": "Semana 3"
  },
  {
    "id": "aAzJZRLzmpZ0cOfgdGHd",
    "lojaNome": "SPCE 2 - JERICOACOARA",
    "data": "2026-08-18",
    "realizada": "NÃO",
    "motivo": "ENCARREGADO NÃO ESTAVA EM LOJA",
    "auditor": "Matheus Cosme",
    "nTentativa": 1,
    "semana": "Semana 3"
  },
  {
    "id": "YSQSQksIuZ19Xobaqjpb",
    "lojaNome": "SPCE 2 - SOBRAL",
    "data": "2026-08-18",
    "realizada": "NÃO",
    "motivo": "ENCARREGADO NÃO ESTAVA EM LOJA",
    "auditor": "Matheus Cosme",
    "nTentativa": 1,
    "semana": "Semana 3"
  },
  {
    "id": "RfKqgvfJ5s1dU79A4iJn",
    "lojaNome": "SPCE 3 - DABLIO MALL",
    "data": "2026-08-18",
    "realizada": "SIM",
    "motivo": "Auditoria Concluída",
    "auditor": "Matheus Cosme",
    "nTentativa": 1,
    "semana": "Semana 3"
  },
  {
    "id": "ItD963BWiIVwG6seKCeS",
    "lojaNome": "SPCE - OUTLET FORTALEZA",
    "data": "2026-08-18",
    "realizada": "SIM",
    "motivo": "Auditoria Concluída",
    "auditor": "Bruna Costa",
    "nTentativa": 2,
    "semana": "Semana 3"
  },
  {
    "id": "zEzbpqMP7tR1uz5H8Cc3",
    "lojaNome": "SPAL - PARQUE SHOPPING MACEIO",
    "data": "2026-08-17",
    "realizada": "SIM",
    "motivo": "Auditoria Concluída",
    "auditor": "Matheus Cosme",
    "nTentativa": 1,
    "semana": "Semana 3"
  },
  {
    "id": "yIaIBZpZMTKlSkUBycdc",
    "lojaNome": "SPCE 3 - JUAZEIRO DO NORTE",
    "data": "2026-08-17",
    "realizada": "SIM",
    "motivo": "Auditoria Concluída",
    "auditor": "Bruna Costa",
    "nTentativa": 2,
    "semana": "Semana 3"
  },
  {
    "id": "keDnEcaRGQ3EUn7P2zVj",
    "lojaNome": "SPCE 3 - JUAZEIRO DO NORTE",
    "data": "2026-08-17",
    "realizada": "NÃO",
    "motivo": "LOJA NÃO ATENDEU A LIGAÇÃO",
    "auditor": "Bruna Costa",
    "nTentativa": 1,
    "semana": "Semana 3"
  },
  {
    "id": "Z3JO2rGo5BkgfABX8bUf",
    "lojaNome": "SPPI - SHOPPING RIVERSIDE",
    "data": "2026-08-17",
    "realizada": "SIM",
    "motivo": "Auditoria Concluída",
    "auditor": "Matheus Cosme",
    "nTentativa": 1,
    "semana": "Semana 3"
  },
  {
    "id": "TwDLB0tP4hLxStlnt50J",
    "lojaNome": "SPPI - DIRCEU",
    "data": "2026-08-17",
    "realizada": "SIM",
    "motivo": "Auditoria Concluída",
    "auditor": "Matheus Cosme",
    "nTentativa": 1,
    "semana": "Semana 3"
  },
  {
    "id": "KLl5rzEyKCmyFXDEaPGd",
    "lojaNome": "SPBA - AEROPORTO LOJA",
    "data": "2026-08-17",
    "realizada": "SIM",
    "motivo": "Auditoria Concluída",
    "auditor": "Bruna Costa",
    "nTentativa": 1,
    "semana": "Semana 3"
  },
  {
    "id": "A8gum63oeIDbe3veOV1k",
    "lojaNome": "SPCE - AEROPORTO LOJA",
    "data": "2026-08-17",
    "realizada": "NÃO",
    "motivo": "LOJA NÃO ATENDEU A LIGAÇÃO",
    "auditor": "Bruna Costa",
    "nTentativa": 1,
    "semana": "Semana 3"
  },
  {
    "id": "0NnuTlsZSBiwAAjFntmL",
    "lojaNome": "SPRN - NOVA PARNAMIRIM",
    "data": "2026-08-17",
    "realizada": "NÃO",
    "motivo": "LOJA NÃO ATENDEU A LIGAÇÃO",
    "auditor": "Bruna Costa",
    "nTentativa": 1,
    "semana": "Semana 3"
  },
  {
    "id": "ouTejj9025MDWNNS5rM4",
    "lojaNome": "SPRN - MOSSORO",
    "data": "2026-08-14",
    "realizada": "NÃO",
    "motivo": "LOJA NÃO ATENDEU A LIGAÇÃO",
    "auditor": "Bruna Costa",
    "nTentativa": 1,
    "semana": "Semana 2"
  },
  {
    "id": "WSWrMYG6l4j0pdCSa9tb",
    "lojaNome": "SPCE 2 - ICARAI DE AMONTADA",
    "data": "2026-08-14",
    "realizada": "NÃO",
    "motivo": "LOJA NÃO ATENDEU A LIGAÇÃO",
    "auditor": "Bruna Costa",
    "nTentativa": 1,
    "semana": "Semana 2"
  },
  {
    "id": "RYb9cdSn0HHwOKnzvuRz",
    "lojaNome": "SPPE - CARUARU SHOPPING",
    "data": "2026-08-14",
    "realizada": "NÃO",
    "motivo": "LOJA NÃO ATENDEU A LIGAÇÃO",
    "auditor": "Bruna Costa",
    "nTentativa": 2,
    "semana": "Semana 2"
  },
  {
    "id": "QL16XEZHl4XlMJRlwaKX",
    "lojaNome": "SPBA - AEROPORTO QUIOSQUE",
    "data": "2026-08-14",
    "realizada": "SIM",
    "motivo": "Auditoria Concluída",
    "auditor": "Bruna Costa",
    "nTentativa": 1,
    "semana": "Semana 2"
  },
  {
    "id": "lEYIR5SRYGVKmzhQfHIa",
    "lojaNome": "SPPB - SHOPPING MANAIRA",
    "data": "2026-08-13",
    "realizada": "SIM",
    "motivo": "Auditoria Concluída",
    "auditor": "Bruna Costa",
    "nTentativa": 2,
    "semana": "Semana 2"
  },
  {
    "id": "HiPtOwBKr8CEjisReQya",
    "lojaNome": "SPRN - NATAL SHOPPING",
    "data": "2026-08-13",
    "realizada": "SIM",
    "motivo": "Auditoria Concluída",
    "auditor": "Bruna Costa",
    "nTentativa": 1,
    "semana": "Semana 2"
  },
  {
    "id": "zehQNiae4spMhECrYqjZ",
    "lojaNome": "SPBA - SHOPPING PARALELA",
    "data": "2026-08-12",
    "realizada": "SIM",
    "motivo": "Auditoria Concluída",
    "auditor": "Bruna Costa",
    "nTentativa": 1,
    "semana": "Semana 2"
  },
  {
    "id": "E8zmRa5IrOYoOSYLrYco",
    "lojaNome": "SPPE - BOA VIAGEM",
    "data": "2026-08-12",
    "realizada": "SIM",
    "motivo": "Auditoria Concluída",
    "auditor": "Bruna Costa",
    "nTentativa": 1,
    "semana": "Semana 2"
  },
  {
    "id": "kkymBCcteNPIiMpYRDK9",
    "lojaNome": "SPPI - SHOPPING RIO POTY",
    "data": "2026-08-11",
    "realizada": "NÃO",
    "motivo": "ENCARREGADO NÃO ESTAVA EM LOJA",
    "auditor": "Bruna Costa",
    "nTentativa": 1,
    "semana": "Semana 2"
  },
  {
    "id": "Uxk0raWgCiDp9QprJMFK",
    "lojaNome": "SPPA - SHOPPING BOULEVARD",
    "data": "2026-08-11",
    "realizada": "NÃO",
    "motivo": "LOJA NÃO ATENDEU A LIGAÇÃO",
    "auditor": "Bruna Costa",
    "nTentativa": 1,
    "semana": "Semana 2"
  },
  {
    "id": "3VI7k7DJWZVXjrj6TALK",
    "lojaNome": "SPSE - JARDINS",
    "data": "2026-08-11",
    "realizada": "SIM",
    "motivo": "Auditoria Concluída",
    "auditor": "Bruna Costa",
    "nTentativa": 1,
    "semana": "Semana 2"
  },
  {
    "id": "tfpmc3NMqWpdkA8tkJdq",
    "lojaNome": "SPPI - DOM SEVERINO",
    "data": "2026-08-10",
    "realizada": "NÃO",
    "motivo": "LOJA NÃO ATENDEU A LIGAÇÃO",
    "auditor": "Bruna Costa",
    "nTentativa": 1,
    "semana": "Semana 2"
  },
  {
    "id": "OmPIq6d6DVHLByi6V0NI",
    "lojaNome": "SPPI - DOM SEVERINO",
    "data": "2026-08-10",
    "realizada": "SIM",
    "motivo": "Auditoria Concluída",
    "auditor": "Bruna Costa",
    "nTentativa": 2,
    "semana": "Semana 2"
  },
  {
    "id": "Kgh0PrV07SbdKYMsoG6E",
    "lojaNome": "SPPE - RUA AMELIA",
    "data": "2026-08-10",
    "realizada": "SIM",
    "motivo": "Auditoria Concluída",
    "auditor": "Bruna Costa",
    "nTentativa": 1,
    "semana": "Semana 2"
  },
  {
    "id": "HPEJP8Pe17sZBapdpCTD",
    "lojaNome": "SPSP - SHOPPING ELDORADO",
    "data": "2026-08-10",
    "realizada": "NÃO",
    "motivo": "COLABORADOR NA REUNIÃO DE ENCARREGADOS",
    "auditor": "Bruna Costa",
    "nTentativa": 1,
    "semana": "Semana 2"
  },
  {
    "id": "yZoZ60orguPXqmKrgn15",
    "lojaNome": "SPSP - SHOPPING PATIO PAULISTA",
    "data": "2026-08-07",
    "realizada": "SIM",
    "motivo": "Auditoria Concluída",
    "auditor": "Bruna Costa",
    "nTentativa": 1,
    "semana": "Semana 1"
  },
  {
    "id": "rE1WyVv6iSGIWdSDMnCs",
    "lojaNome": "SPPA - UMARIZAL",
    "data": "2026-08-07",
    "realizada": "NÃO",
    "motivo": "COLABORADOR NO INTERVALO",
    "auditor": "Bruna Costa",
    "nTentativa": 1,
    "semana": "Semana 1"
  },
  {
    "id": "EzsO8f4YKM7Bxk1CfF4T",
    "lojaNome": "SPPB - SHOPPING MANAIRA",
    "data": "2026-08-07",
    "realizada": "NÃO",
    "motivo": "LOJA NÃO ATENDEU A LIGAÇÃO",
    "auditor": "Bruna Costa",
    "nTentativa": 1,
    "semana": "Semana 1"
  },
  {
    "id": "8h2ylk01lUvdVzyOXkOO",
    "lojaNome": "SPPE - CARUARU SHOPPING",
    "data": "2026-08-07",
    "realizada": "NÃO",
    "motivo": "LOJA NÃO ATENDEU A LIGAÇÃO",
    "auditor": "Bruna Costa",
    "nTentativa": 1,
    "semana": "Semana 1"
  },
  {
    "id": "YlZJbHle1ip962KQhhp5",
    "lojaNome": "SPCE - AEROPORTO LOJA",
    "data": "2026-07-31",
    "realizada": "SIM",
    "motivo": "Auditoria Concluída",
    "auditor": "Matheus Cosme",
    "nTentativa": 2,
    "semana": "Semana 4"
  },
  {
    "id": "R4Di8t3TADDdwMzrhNtQ",
    "lojaNome": "SPCE 2 - ICARAI DE AMONTADA",
    "data": "2026-07-31",
    "realizada": "NÃO",
    "motivo": "ENCARREGADO NÃO ATENDEU",
    "auditor": "Matheus Cosme",
    "nTentativa": 2,
    "semana": "Semana 4"
  },
  {
    "id": "B5qFXvgt7FTnUonPOVRt",
    "lojaNome": "SPPE - ORIGENS",
    "data": "2026-07-31",
    "realizada": "SIM",
    "motivo": "Auditoria Concluída",
    "auditor": "Matheus Cosme",
    "nTentativa": 1,
    "semana": "Semana 4"
  },
  {
    "id": "5de7LV0aQSTpdcYuqyM0",
    "lojaNome": "SPCE 3 - DABLIO MALL",
    "data": "2026-07-31",
    "realizada": "SIM",
    "motivo": "Auditoria Concluída",
    "auditor": "Matheus Cosme",
    "nTentativa": 2,
    "semana": "Semana 4"
  },
  {
    "id": "mhhFEKOR4gncHF97Kv5w",
    "lojaNome": "SPCE - WORK CAFE",
    "data": "2026-07-30",
    "realizada": "SIM",
    "motivo": "Auditoria Concluída",
    "auditor": "Matheus Cosme",
    "nTentativa": 1,
    "semana": "Semana 4"
  },
  {
    "id": "cEnrrUMDJD7iXWyHbT1l",
    "lojaNome": "SPCE - AEROPORTO QUIOSQUE",
    "data": "2026-07-30",
    "realizada": "SIM",
    "motivo": "Auditoria Concluída",
    "auditor": "Matheus Cosme",
    "nTentativa": 1,
    "semana": "Semana 4"
  },
  {
    "id": "SKxELL3xTn7jYnk6qdZr",
    "lojaNome": "SPCE - AQUIRAZ",
    "data": "2026-07-30",
    "realizada": "SIM",
    "motivo": "Auditoria Concluída",
    "auditor": "Matheus Cosme",
    "nTentativa": 1,
    "semana": "Semana 4"
  },
  {
    "id": "GRzunaMxwQ0B1EXARCdp",
    "lojaNome": "SPCE - PARANGABA",
    "data": "2026-07-30",
    "realizada": "SIM",
    "motivo": "Auditoria Concluída",
    "auditor": "Matheus Cosme",
    "nTentativa": 1,
    "semana": "Semana 4"
  },
  {
    "id": "FT8iitizgidjsL3MPMUH",
    "lojaNome": "SPCE - RIO MAR KENNEDY",
    "data": "2026-07-30",
    "realizada": "SIM",
    "motivo": "Auditoria Concluída",
    "auditor": "Matheus Cosme",
    "nTentativa": 1,
    "semana": "Semana 4"
  },
  {
    "id": "E9KkpPfaNKU7Z7ZGD7TX",
    "lojaNome": "SPCE - LOJA EUSEBIO",
    "data": "2026-07-30",
    "realizada": "SIM",
    "motivo": "Auditoria Concluída",
    "auditor": "Matheus Cosme",
    "nTentativa": 1,
    "semana": "Semana 4"
  },
  {
    "id": "9zTVtYAnnJRka62xIiMS",
    "lojaNome": "SPCE - FATIMA",
    "data": "2026-07-30",
    "realizada": "SIM",
    "motivo": "Auditoria Concluída",
    "auditor": "Matheus Cosme",
    "nTentativa": 1,
    "semana": "Semana 4"
  },
  {
    "id": "yf8D3qErqyv1FtyF726b",
    "lojaNome": "SPPE - SHOPPING RECIFE",
    "data": "2026-07-29",
    "realizada": "SIM",
    "motivo": "Auditoria Concluída",
    "auditor": "Matheus Cosme",
    "nTentativa": 3,
    "semana": "Semana 4"
  },
  {
    "id": "shkGyrIGSWJ40lG8rDUh",
    "lojaNome": "SPCE - BEIRA MAR LOJA",
    "data": "2026-07-29",
    "realizada": "SIM",
    "motivo": "Auditoria Concluída",
    "auditor": "Bruna Costa",
    "nTentativa": 1,
    "semana": "Semana 4"
  },
  {
    "id": "jsIkxedlfrD9whFH0reU",
    "lojaNome": "SPPE - SHOPPING PATTEO OLINDA",
    "data": "2026-07-29",
    "realizada": "SIM",
    "motivo": "Auditoria Concluída",
    "auditor": "Matheus Cosme",
    "nTentativa": 1,
    "semana": "Semana 4"
  },
  {
    "id": "i97m3N1IziIFQMggbBKe",
    "lojaNome": "SPCE - DESEMBARGADOR MOREIRA",
    "data": "2026-07-29",
    "realizada": "SIM",
    "motivo": "Auditoria Concluída",
    "auditor": "Bruna Costa",
    "nTentativa": 1,
    "semana": "Semana 4"
  },
  {
    "id": "efDLiHWr6vIEaSEU79jw",
    "lojaNome": "SPCE - ANA BILHAR",
    "data": "2026-07-29",
    "realizada": "SIM",
    "motivo": "Auditoria Concluída",
    "auditor": "Bruna Costa",
    "nTentativa": 1,
    "semana": "Semana 4"
  },
  {
    "id": "QSHJdLJOahEA613VIqWF",
    "lojaNome": "SPSP - SHOPPING CIDADE SAO PAULO",
    "data": "2026-07-29",
    "realizada": "SIM",
    "motivo": "Auditoria Concluída",
    "auditor": "Matheus Cosme",
    "nTentativa": 2,
    "semana": "Semana 4"
  },
  {
    "id": "FFe2Q7NmH5cap6AkNgqf",
    "lojaNome": "SPCE - BEIRA MAR QUIOSQUE",
    "data": "2026-07-29",
    "realizada": "SIM",
    "motivo": "Auditoria Concluída",
    "auditor": "Bruna Costa",
    "nTentativa": 1,
    "semana": "Semana 4"
  },
  {
    "id": "Bt4IS1a1KwJLEcvo3sy4",
    "lojaNome": "SPMA - SHOPPING DA ILHA",
    "data": "2026-07-29",
    "realizada": "SIM",
    "motivo": "Auditoria Concluída",
    "auditor": "Matheus Cosme",
    "nTentativa": 1,
    "semana": "Semana 4"
  },
  {
    "id": "2LqQDiJMS91OcHf01yCg",
    "lojaNome": "SPCE - FLORES",
    "data": "2026-07-29",
    "realizada": "SIM",
    "motivo": "Auditoria Concluída",
    "auditor": "Bruna Costa",
    "nTentativa": 1,
    "semana": "Semana 4"
  },
  {
    "id": "omQl9twSzaB59tQUXnvD",
    "lojaNome": "SPCE - AEROPORTO LOJA",
    "data": "2026-07-28",
    "realizada": "NÃO",
    "motivo": "LOJA NÃO ATENDEU A LIGAÇÃO",
    "auditor": "Matheus Cosme",
    "nTentativa": 1,
    "semana": "Semana 4"
  },
  {
    "id": "hb5t43EEjCc3u1hummPi",
    "lojaNome": "SPCE - LOJA SUL",
    "data": "2026-07-28",
    "realizada": "SIM",
    "motivo": "Auditoria Concluída",
    "auditor": "Bruna Costa",
    "nTentativa": 1,
    "semana": "Semana 4"
  },
  {
    "id": "djdAEwZGQ0cnrbOWHYGS",
    "lojaNome": "SPCE - RIO MAR FORTALEZA",
    "data": "2026-07-28",
    "realizada": "SIM",
    "motivo": "Auditoria Concluída",
    "auditor": "Bruna Costa",
    "nTentativa": 1,
    "semana": "Semana 4"
  },
  {
    "id": "4XnAHTtXxRGz9Vb8SHgK",
    "lojaNome": "SPCE - SHOPPING IGUATEMI",
    "data": "2026-07-28",
    "realizada": "SIM",
    "motivo": "Auditoria Concluída",
    "auditor": "Bruna Costa",
    "nTentativa": 1,
    "semana": "Semana 4"
  },
  {
    "id": "xUF5RIL25UOJ3jC4Zx2o",
    "lojaNome": "SPBA - PITUBA",
    "data": "2026-07-27",
    "realizada": "SIM",
    "motivo": "Auditoria Concluída",
    "auditor": "Matheus Cosme",
    "nTentativa": 3,
    "semana": "Semana 4"
  },
  {
    "id": "tcBk9lQkD3S2tUE7Wk5R",
    "lojaNome": "SPRN - LAGOA MALL",
    "data": "2026-07-27",
    "realizada": "SIM",
    "motivo": "Auditoria Concluída",
    "auditor": "Matheus Cosme",
    "nTentativa": 3,
    "semana": "Semana 4"
  },
  {
    "id": "SC47NXTHdiywuvjSrXqV",
    "lojaNome": "SPCE - OUTLET FORTALEZA",
    "data": "2026-07-27",
    "realizada": "SIM",
    "motivo": "Auditoria Concluída",
    "auditor": "Matheus Cosme",
    "nTentativa": 1,
    "semana": "Semana 4"
  },
  {
    "id": "PWmOjSsO4kUMAN4u0Ebk",
    "lojaNome": "SPPE - RIO MAR RECIFE",
    "data": "2026-07-27",
    "realizada": "SIM",
    "motivo": "Auditoria Concluída",
    "auditor": "Bruna Costa",
    "nTentativa": 1,
    "semana": "Semana 4"
  },
  {
    "id": "G1LVQTJKRXOYGBWYNHOY",
    "lojaNome": "SPPA - SHOPPING BOULEVARD",
    "data": "2026-07-27",
    "realizada": "SIM",
    "motivo": "Auditoria Concluída",
    "auditor": "Matheus Cosme",
    "nTentativa": 1,
    "semana": "Semana 4"
  },
  {
    "id": "5IOttLrK5EAHxH6wivme",
    "lojaNome": "SPCE 2 - ICARAI DE AMONTADA",
    "data": "2026-07-27",
    "realizada": "NÃO",
    "motivo": "COLABORADOR SOZINHO EM LOJA",
    "auditor": "Matheus Cosme",
    "nTentativa": 3,
    "semana": "Semana 4"
  },
  {
    "id": "7szPH6p5VwkOGvwEJ04p",
    "lojaNome": "SPPB - CAMPINA GRANDE",
    "data": "2026-07-24",
    "realizada": "SIM",
    "motivo": "Auditoria Concluída",
    "auditor": "Bruna Costa",
    "nTentativa": 1,
    "semana": "Semana 4"
  },
  {
    "id": "xlmhhGqP6ZtTEDD7Z9Fl",
    "lojaNome": "SPBA - SHOPPING DA BAHIA",
    "data": "2026-07-23",
    "realizada": "SIM",
    "motivo": "Auditoria Concluída",
    "auditor": "Matheus Cosme",
    "nTentativa": 2,
    "semana": "Semana 4"
  },
  {
    "id": "vbs3R3S0E9eW0J0wtq1F",
    "lojaNome": "SPRN - LAGOA MALL",
    "data": "2026-07-23",
    "realizada": "NÃO",
    "motivo": "ENCARREGADO NÃO ATENDEU",
    "auditor": "Matheus Cosme",
    "nTentativa": 2,
    "semana": "Semana 4"
  },
  {
    "id": "ued2t3yrpfZHXUakw4vF",
    "lojaNome": "SPRN - MOSSORO",
    "data": "2026-07-23",
    "realizada": "SIM",
    "motivo": "Auditoria Concluída",
    "auditor": "Matheus Cosme",
    "nTentativa": 3,
    "semana": "Semana 4"
  },
  {
    "id": "ihvEGEHOKmdGdmD5Z2I7",
    "lojaNome": "SPBA - AEROPORTO QUIOSQUE",
    "data": "2026-07-23",
    "realizada": "NÃO",
    "motivo": "LOJA NÃO ATENDEU A LIGAÇÃO",
    "auditor": "Matheus Cosme",
    "nTentativa": 2,
    "semana": "Semana 4"
  },
  {
    "id": "aikeXyFJH2R6CxmNdwdA",
    "lojaNome": "SPRN - MIDWAY",
    "data": "2026-07-23",
    "realizada": "SIM",
    "motivo": "Auditoria Concluída",
    "auditor": "Bruna Costa",
    "nTentativa": 3,
    "semana": "Semana 4"
  },
  {
    "id": "GgnkJtVbdkDsv5bd5mgE",
    "lojaNome": "SPBA - AEROPORTO QUIOSQUE",
    "data": "2026-07-23",
    "realizada": "SIM",
    "motivo": "Auditoria Concluída",
    "auditor": "Matheus Cosme",
    "nTentativa": 3,
    "semana": "Semana 4"
  },
  {
    "id": "j3NXNxLhQjvT6N2woD2C",
    "lojaNome": "SPPE - BOA VIAGEM",
    "data": "2026-07-22",
    "realizada": "SIM",
    "motivo": "Auditoria Concluída",
    "auditor": "Matheus Cosme",
    "nTentativa": 2,
    "semana": "Semana 4"
  },
  {
    "id": "XhiP9M9rrxN0CarzZQaZ",
    "lojaNome": "SPPE - SHOPPING GUARARAPES",
    "data": "2026-07-22",
    "realizada": "SIM",
    "motivo": "Auditoria Concluída",
    "auditor": "Bruna Costa",
    "nTentativa": 3,
    "semana": "Semana 4"
  },
  {
    "id": "O1j1o6ecKGuJUqMbJgP3",
    "lojaNome": "SPPE - CARUARU SHOPPING",
    "data": "2026-07-22",
    "realizada": "SIM",
    "motivo": "Auditoria Concluída",
    "auditor": "Matheus Cosme",
    "nTentativa": 1,
    "semana": "Semana 4"
  },
  {
    "id": "q25jUlOicKyBvtfCaU28",
    "lojaNome": "SPRN - NOVA PARNAMIRIM",
    "data": "2026-07-21",
    "realizada": "SIM",
    "motivo": "Auditoria Concluída",
    "auditor": "Matheus Cosme",
    "nTentativa": 2,
    "semana": "Semana 3"
  },
  {
    "id": "eHPO7ExOr0B3r7cV1Mqc",
    "lojaNome": "SPBA - PITUBA",
    "data": "2026-07-21",
    "realizada": "NÃO",
    "motivo": "COLABORADOR EM ATENDIMENTO",
    "auditor": "Matheus Cosme",
    "nTentativa": 2,
    "semana": "Semana 3"
  },
  {
    "id": "SBg6VV0AkOTS4auJm6Ws",
    "lojaNome": "SPRN - LAGOA MALL",
    "data": "2026-07-21",
    "realizada": "NÃO",
    "motivo": "LOJA NÃO ATENDEU A LIGAÇÃO",
    "auditor": "Matheus Cosme",
    "nTentativa": 1,
    "semana": "Semana 3"
  },
  {
    "id": "OVSu5ruUAi0oOhWWsenm",
    "lojaNome": "SPCE 2 - JERICOACOARA",
    "data": "2026-07-21",
    "realizada": "SIM",
    "motivo": "Auditoria Concluída",
    "auditor": "Bruna Costa",
    "nTentativa": 2,
    "semana": "Semana 3"
  },
  {
    "id": "NCyFp0KzmmteQpXfpyuH",
    "lojaNome": "SPPA - UMARIZAL",
    "data": "2026-07-21",
    "realizada": "SIM",
    "motivo": "Auditoria Concluída",
    "auditor": "Matheus Cosme",
    "nTentativa": 1,
    "semana": "Semana 3"
  },
  {
    "id": "5laqkVuEivpYkSfrDRH1",
    "lojaNome": "SPCE 3 - DABLIO MALL",
    "data": "2026-07-21",
    "realizada": "NÃO",
    "motivo": "ENCARREGADO NÃO ESTAVA EM LOJA",
    "auditor": "Matheus Cosme",
    "nTentativa": 1,
    "semana": "Semana 3"
  },
  {
    "id": "oX8E8urs70yUr0mu0Dy3",
    "lojaNome": "SPPE - SHOPPING GUARARAPES",
    "data": "2026-07-20",
    "realizada": "NÃO",
    "motivo": "LOJA NÃO ATENDEU A LIGAÇÃO",
    "auditor": "Bruna Costa",
    "nTentativa": 2,
    "semana": "Semana 3"
  },
  {
    "id": "HwQUGHI4dCAN75YQWl6q",
    "lojaNome": "SPMT - ESTACAO CUIABA",
    "data": "2026-07-20",
    "realizada": "SIM",
    "motivo": "Auditoria Concluída",
    "auditor": "Bruna Costa",
    "nTentativa": 2,
    "semana": "Semana 3"
  },
  {
    "id": "Cqlw1ZmhWKt6mTa8h0bG",
    "lojaNome": "SPCE 2 - SOBRAL",
    "data": "2026-07-20",
    "realizada": "SIM",
    "motivo": "Auditoria Concluída",
    "auditor": "Bruna Costa",
    "nTentativa": 2,
    "semana": "Semana 3"
  },
  {
    "id": "AbIexAIx4X6R0RLJOAlO",
    "lojaNome": "SPBA - SHOPPING DA BAHIA",
    "data": "2026-07-20",
    "realizada": "NÃO",
    "motivo": "ENCARREGADO NÃO ESTAVA EM LOJA",
    "auditor": "Matheus Cosme",
    "nTentativa": 1,
    "semana": "Semana 3"
  },
  {
    "id": "AWHu1czwh0hoxOmqWJgA",
    "lojaNome": "SPBA - AEROPORTO LOJA",
    "data": "2026-07-17",
    "realizada": "SIM",
    "motivo": "Auditoria Concluída",
    "auditor": "Matheus Cosme",
    "nTentativa": 1,
    "semana": "Semana 3"
  },
  {
    "id": "8ZOHkbhJH57x4rz8wk4f",
    "lojaNome": "SPCE 3 - JUAZEIRO DO NORTE",
    "data": "2026-07-17",
    "realizada": "SIM",
    "motivo": "Auditoria Concluída",
    "auditor": "Matheus Cosme",
    "nTentativa": 1,
    "semana": "Semana 3"
  },
  {
    "id": "uq4OK5uSRmVc8IKnnXDa",
    "lojaNome": "SPSP - SHOPPING ELDORADO",
    "data": "2026-07-16",
    "realizada": "SIM",
    "motivo": "Auditoria Concluída",
    "auditor": "Matheus Cosme",
    "nTentativa": 2,
    "semana": "Semana 3"
  },
  {
    "id": "tyTl4N2aHatT5CCHc1S1",
    "lojaNome": "SPBA - SHOPPING SALVADOR",
    "data": "2026-07-16",
    "realizada": "SIM",
    "motivo": "Auditoria Concluída",
    "auditor": "Bruna Costa",
    "nTentativa": 2,
    "semana": "Semana 3"
  },
  {
    "id": "inXCsJ9pS844LhnYIQeA",
    "lojaNome": "SPBA - VILLAS",
    "data": "2026-07-16",
    "realizada": "SIM",
    "motivo": "Auditoria Concluída",
    "auditor": "Bruna Costa",
    "nTentativa": 2,
    "semana": "Semana 3"
  },
  {
    "id": "Xz9wmEQGigNhclB2m6uj",
    "lojaNome": "SPBA - AEROPORTO QUIOSQUE",
    "data": "2026-07-16",
    "realizada": "NÃO",
    "motivo": "ENCARREGADO NÃO ATENDEU",
    "auditor": "Matheus Cosme",
    "nTentativa": 1,
    "semana": "Semana 3"
  },
  {
    "id": "KgV7jHga9ndP2ZIBgRWa",
    "lojaNome": "SPCE 2 - ICARAI DE AMONTADA",
    "data": "2026-07-16",
    "realizada": "NÃO",
    "motivo": "ENCARREGADO NÃO ATENDEU",
    "auditor": "Matheus Cosme",
    "nTentativa": 1,
    "semana": "Semana 3"
  },
  {
    "id": "3mL29VSXSf5oFnXXz9j2",
    "lojaNome": "SPSP - SHOPPING PATIO PAULISTA",
    "data": "2026-07-16",
    "realizada": "SIM",
    "motivo": "Auditoria Concluída",
    "auditor": "Matheus Cosme",
    "nTentativa": 1,
    "semana": "Semana 3"
  },
  {
    "id": "0K3Kxnj9F4g6gKYmEnVd",
    "lojaNome": "SPPE - BOA VIAGEM",
    "data": "2026-07-16",
    "realizada": "NÃO",
    "motivo": "LOJA NÃO ATENDEU A LIGAÇÃO",
    "auditor": "Matheus Cosme",
    "nTentativa": 1,
    "semana": "Semana 3"
  },
  {
    "id": "uM33CF0MOJOntjfxWroM",
    "lojaNome": "SPPE - RUA AMELIA",
    "data": "2026-07-15",
    "realizada": "SIM",
    "motivo": "Auditoria Concluída",
    "auditor": "Matheus Cosme",
    "nTentativa": 1,
    "semana": "Semana 3"
  },
  {
    "id": "mgvvN22weY6QVu7EVtWt",
    "lojaNome": "SPBA - PRAIA DO FORTE",
    "data": "2026-07-15",
    "realizada": "SIM",
    "motivo": "Auditoria Concluída",
    "auditor": "Bruna Costa",
    "nTentativa": 1,
    "semana": "Semana 3"
  },
  {
    "id": "c8JkBunRQb4NXaKeTOf3",
    "lojaNome": "SPBA - SHOPPING PARALELA",
    "data": "2026-07-15",
    "realizada": "SIM",
    "motivo": "Auditoria Concluída",
    "auditor": "Matheus Cosme",
    "nTentativa": 2,
    "semana": "Semana 3"
  },
  {
    "id": "Z5bnC8uA349ZSLuDufDH",
    "lojaNome": "SPBA - PITUBA",
    "data": "2026-07-15",
    "realizada": "NÃO",
    "motivo": "ENCARREGADO NÃO ESTAVA EM LOJA",
    "auditor": "Matheus Cosme",
    "nTentativa": 1,
    "semana": "Semana 3"
  },
  {
    "id": "NGHBA46DLYEUSz7Hn20O",
    "lojaNome": "SPPE - SHOPPING RECIFE",
    "data": "2026-07-15",
    "realizada": "NÃO",
    "motivo": "ENCARREGADO NÃO ESTAVA EM LOJA",
    "auditor": "Matheus Cosme",
    "nTentativa": 2,
    "semana": "Semana 3"
  },
  {
    "id": "FwqWVJJAMXj6FWbX9vPt",
    "lojaNome": "SPRN - MIDWAY",
    "data": "2026-07-15",
    "realizada": "NÃO",
    "motivo": "LOJA NÃO ATENDEU A LIGAÇÃO",
    "auditor": "Bruna Costa",
    "nTentativa": 2,
    "semana": "Semana 3"
  },
  {
    "id": "FFHgjWhFWuV1JXAi1oeG",
    "lojaNome": "SPRN - MOSSORO",
    "data": "2026-07-15",
    "realizada": "NÃO",
    "motivo": "ENCARREGADO NÃO ATENDEU",
    "auditor": "Matheus Cosme",
    "nTentativa": 2,
    "semana": "Semana 3"
  },
  {
    "id": "ECRQpAwgTWkeTrjTeP0R",
    "lojaNome": "SPPI - DIRCEU",
    "data": "2026-07-15",
    "realizada": "SIM",
    "motivo": "Auditoria Concluída",
    "auditor": "Bruna Costa",
    "nTentativa": 1,
    "semana": "Semana 3"
  },
  {
    "id": "5klAhZuWoKbvmFDLQ6Vp",
    "lojaNome": "SPPB - PARTAGE CAMPINA GRANDE",
    "data": "2026-07-15",
    "realizada": "SIM",
    "motivo": "Auditoria Concluída",
    "auditor": "Bruna Costa",
    "nTentativa": 1,
    "semana": "Semana 3"
  },
  {
    "id": "3vocHejT6t3HtI8nkfa1",
    "lojaNome": "SPPB - SHOPPING MANAIRA",
    "data": "2026-07-15",
    "realizada": "SIM",
    "motivo": "Auditoria Concluída",
    "auditor": "Bruna Costa",
    "nTentativa": 2,
    "semana": "Semana 3"
  },
  {
    "id": "0uYsYCLfnOvQpiafQ5Qb",
    "lojaNome": "SPMT - SHOPPING PANTANAL",
    "data": "2026-07-15",
    "realizada": "SIM",
    "motivo": "Auditoria Concluída",
    "auditor": "Bruna Costa",
    "nTentativa": 2,
    "semana": "Semana 3"
  },
  {
    "id": "txXho5KtlOTsruhAdiGA",
    "lojaNome": "SPAL - PARQUE SHOPPING MACEIO",
    "data": "2026-07-14",
    "realizada": "SIM",
    "motivo": "Auditoria Concluída",
    "auditor": "Bruna Costa",
    "nTentativa": 1,
    "semana": "Semana 2"
  },
  {
    "id": "IuUuF70szqu1o3xcOrnB",
    "lojaNome": "SPMT - SHOPPING PANTANAL",
    "data": "2026-07-14",
    "realizada": "NÃO",
    "motivo": "ENCARREGADO NÃO ESTAVA EM LOJA",
    "auditor": "Bruna Costa",
    "nTentativa": 1,
    "semana": "Semana 2"
  },
  {
    "id": "E97RGaMwcLeT0vjbMIb7",
    "lojaNome": "SPPE - MAURICIO DE NASSAU",
    "data": "2026-07-14",
    "realizada": "SIM",
    "motivo": "Auditoria Concluída",
    "auditor": "Bruna Costa",
    "nTentativa": 2,
    "semana": "Semana 2"
  },
  {
    "id": "17IFeqtXdkLErqirFd2t",
    "lojaNome": "SPMT - ESTACAO CUIABA",
    "data": "2026-07-14",
    "realizada": "NÃO",
    "motivo": "COLABORADOR NO INTERVALO",
    "auditor": "Bruna Costa",
    "nTentativa": 1,
    "semana": "Semana 2"
  },
  {
    "id": "7eBjLBFQ6gL8YJ3VlAeO",
    "lojaNome": "SPAM - VIEIRALVES",
    "data": "2026-07-13",
    "realizada": "SIM",
    "motivo": "Auditoria Concluída",
    "auditor": "Bruna Costa",
    "nTentativa": 1,
    "semana": "Semana 2"
  },
  {
    "id": "m9Cj286wnX9ci2pgo7qv",
    "lojaNome": "SPCE 2 - PREA",
    "data": "2026-07-11",
    "realizada": "SIM",
    "motivo": "Auditoria Concluída",
    "auditor": "Bruna Costa",
    "nTentativa": 1,
    "semana": "Semana 2"
  },
  {
    "id": "al7MCqiZtX2Y7OpDob5S",
    "lojaNome": "SPMA - SHOPPING SAO LUIS",
    "data": "2026-07-11",
    "realizada": "SIM",
    "motivo": "Auditoria Concluída",
    "auditor": "Bruna Costa",
    "nTentativa": 2,
    "semana": "Semana 2"
  },
  {
    "id": "I1DgJzrSexiNMxI61mIK",
    "lojaNome": "SPPE - ORIGENS",
    "data": "2026-07-11",
    "realizada": "SIM",
    "motivo": "Auditoria Concluída",
    "auditor": "Bruna Costa",
    "nTentativa": 1,
    "semana": "Semana 2"
  },
  {
    "id": "D50OPa2abV3rFgwArYNt",
    "lojaNome": "SPCE 2 - SOBRAL",
    "data": "2026-07-11",
    "realizada": "NÃO",
    "motivo": "LOJA NÃO ATENDEU A LIGAÇÃO",
    "auditor": "Bruna Costa",
    "nTentativa": 1,
    "semana": "Semana 2"
  },
  {
    "id": "9wFyYx1WQvOf0ZtZ4Y9y",
    "lojaNome": "SPCE 2 - JERICOACOARA",
    "data": "2026-07-11",
    "realizada": "NÃO",
    "motivo": "LOJA NÃO ATENDEU A LIGAÇÃO",
    "auditor": "Bruna Costa",
    "nTentativa": 1,
    "semana": "Semana 2"
  },
  {
    "id": "ip4fDGfl60uixNJiVSPh",
    "lojaNome": "SPPA - PARQUE SHOPPING",
    "data": "2026-07-10",
    "realizada": "SIM",
    "motivo": "Auditoria Concluída",
    "auditor": "Bruna Costa",
    "nTentativa": 1,
    "semana": "Semana 2"
  },
  {
    "id": "fTm8cZbeb3m0ubRqU0ZC",
    "lojaNome": "SPAM - PONTA NEGRA",
    "data": "2026-07-10",
    "realizada": "SIM",
    "motivo": "Auditoria Concluída",
    "auditor": "Bruna Costa",
    "nTentativa": 1,
    "semana": "Semana 2"
  },
  {
    "id": "NxxYcB0bggnVeitEFH17",
    "lojaNome": "SPBA - SHOPPING SALVADOR",
    "data": "2026-07-09",
    "realizada": "NÃO",
    "motivo": "COLABORADOR NO INTERVALO",
    "auditor": "Bruna Costa",
    "nTentativa": 1,
    "semana": "Semana 2"
  },
  {
    "id": "A14oyQ6Sv97tcs5qLBxN",
    "lojaNome": "SPPI - SHOPPING RIVERSIDE",
    "data": "2026-07-09",
    "realizada": "SIM",
    "motivo": "Auditoria Concluída",
    "auditor": "Bruna Costa",
    "nTentativa": 1,
    "semana": "Semana 2"
  },
  {
    "id": "4T07Lz96vOxzPTUIcgwx",
    "lojaNome": "SPPI - SHOPPING RIVERSIDE",
    "data": "2026-07-09",
    "realizada": "SIM",
    "motivo": "Auditoria Concluída",
    "auditor": "Bruna Costa",
    "nTentativa": 1,
    "semana": "Semana 2"
  },
  {
    "id": "K1UuITm2vGE1yn2nkAy6",
    "lojaNome": "SPSP - SHOPPING CIDADE SAO PAULO",
    "data": "2026-07-08",
    "realizada": "NÃO",
    "motivo": "ENCARREGADO NÃO ESTAVA EM LOJA",
    "auditor": "Fernanda Teles",
    "nTentativa": 1,
    "semana": "Semana 2"
  },
  {
    "id": "3NjM8nkHeHuqNI37tAZG",
    "lojaNome": "SPPI - DOM SEVERINO",
    "data": "2026-07-08",
    "realizada": "SIM",
    "motivo": "Auditoria Concluída",
    "auditor": "Fernanda Teles",
    "nTentativa": 1,
    "semana": "Semana 2"
  },
  {
    "id": "uNtbRB7HAQoI4DDRbfBt",
    "lojaNome": "SPPA - SHOPPING GRAO PARA",
    "data": "2026-07-07",
    "realizada": "SIM",
    "motivo": "Auditoria Concluída",
    "auditor": "Bruna Costa",
    "nTentativa": 1,
    "semana": "Semana 1"
  },
  {
    "id": "4cWF6wXGiaornMTUZQNu",
    "lojaNome": "SPSE - ARACAJU",
    "data": "2026-07-07",
    "realizada": "SIM",
    "motivo": "Auditoria Concluída",
    "auditor": "Bruna Costa",
    "nTentativa": 1,
    "semana": "Semana 1"
  },
  {
    "id": "yWXIdvRUTrHLViPbo12Y",
    "lojaNome": "SPPE - SHOPPING GUARARAPES",
    "data": "2026-07-06",
    "realizada": "NÃO",
    "motivo": "LOJA NÃO ATENDEU A LIGAÇÃO",
    "auditor": "Bruna Costa",
    "nTentativa": 1,
    "semana": "Semana 1"
  },
  {
    "id": "o76hkKw3Ak3T3CQohChU",
    "lojaNome": "SPBA - SHOPPING PARALELA",
    "data": "2026-07-06",
    "realizada": "NÃO",
    "motivo": "LOJA NÃO ATENDEU A LIGAÇÃO",
    "auditor": "Fernanda Teles",
    "nTentativa": 1,
    "semana": "Semana 1"
  },
  {
    "id": "mRn3Sw088pEMSoQOPql6",
    "lojaNome": "SPSE - JARDINS",
    "data": "2026-07-06",
    "realizada": "SIM",
    "motivo": "Auditoria Concluída",
    "auditor": "Fernanda Teles",
    "nTentativa": 1,
    "semana": "Semana 1"
  },
  {
    "id": "knvXZOrQNnA25710dt3a",
    "lojaNome": "SPPB - SHOPPING MANAIRA",
    "data": "2026-07-06",
    "realizada": "NÃO",
    "motivo": "LOJA NÃO ATENDEU A LIGAÇÃO",
    "auditor": "Bruna Costa",
    "nTentativa": 1,
    "semana": "Semana 1"
  },
  {
    "id": "hSdQMepiURjYO1BOWgTj",
    "lojaNome": "SPPE - SHOPPING TACARUNA",
    "data": "2026-07-06",
    "realizada": "NÃO",
    "motivo": "LOJA NÃO ATENDEU A LIGAÇÃO",
    "auditor": "Bruna Costa",
    "nTentativa": 1,
    "semana": "Semana 1"
  },
  {
    "id": "XUSCGhAn7UlVrlFUJp89",
    "lojaNome": "SPRN - MOSSORO",
    "data": "2026-07-06",
    "realizada": "NÃO",
    "motivo": "LOJA NÃO ATENDEU A LIGAÇÃO",
    "auditor": "Fernanda Teles",
    "nTentativa": 1,
    "semana": "Semana 1"
  },
  {
    "id": "SpIDYiGJ4fxtOAtvkoKx",
    "lojaNome": "SPSP - SHOPPING ELDORADO",
    "data": "2026-07-06",
    "realizada": "NÃO",
    "motivo": "LOJA NÃO ATENDEU A LIGAÇÃO",
    "auditor": "Bruna Costa",
    "nTentativa": 1,
    "semana": "Semana 1"
  },
  {
    "id": "Qrvra3g3wuoKagLrDVR6",
    "lojaNome": "SPBA - VILLAS",
    "data": "2026-07-06",
    "realizada": "NÃO",
    "motivo": "LOJA NÃO ATENDEU A LIGAÇÃO",
    "auditor": "Bruna Costa",
    "nTentativa": 1,
    "semana": "Semana 1"
  },
  {
    "id": "Q28qZSpQBCaseMg99qXC",
    "lojaNome": "SPRN - NOVA PARNAMIRIM",
    "data": "2026-07-06",
    "realizada": "NÃO",
    "motivo": "ENCARREGADO NÃO ESTAVA EM LOJA",
    "auditor": "Fernanda Teles",
    "nTentativa": 1,
    "semana": "Semana 1"
  },
  {
    "id": "OfIZ037Rb4m04e0grcLz",
    "lojaNome": "SPRN - NATAL SHOPPING",
    "data": "2026-07-06",
    "realizada": "SIM",
    "motivo": "Auditoria Concluída",
    "auditor": "Fernanda Teles",
    "nTentativa": 1,
    "semana": "Semana 1"
  },
  {
    "id": "LnFYtXBLM2aimQuv23r9",
    "lojaNome": "SPMA - SHOPPING SAO LUIS",
    "data": "2026-07-06",
    "realizada": "NÃO",
    "motivo": "LOJA NÃO ATENDEU A LIGAÇÃO",
    "auditor": "Bruna Costa",
    "nTentativa": 1,
    "semana": "Semana 1"
  },
  {
    "id": "LQh8KBJOoQk6JzxFlp6j",
    "lojaNome": "SPBA - HORTO FLORESTAL",
    "data": "2026-07-06",
    "realizada": "SIM",
    "motivo": "Auditoria Concluída",
    "auditor": "Bruna Costa",
    "nTentativa": 1,
    "semana": "Semana 1"
  },
  {
    "id": "H4N5ejw32lbW63XfazPm",
    "lojaNome": "SPPE - SHOPPING RECIFE",
    "data": "2026-07-06",
    "realizada": "NÃO",
    "motivo": "ENCARREGADO NÃO ESTAVA EM LOJA",
    "auditor": "Fernanda Teles",
    "nTentativa": 1,
    "semana": "Semana 1"
  },
  {
    "id": "FKy3RtLt8W2UYx2ghQRq",
    "lojaNome": "SPPI - SHOPPING RIO POTY",
    "data": "2026-07-06",
    "realizada": "SIM",
    "motivo": "Auditoria Concluída",
    "auditor": "Fernanda Teles",
    "nTentativa": 1,
    "semana": "Semana 1"
  },
  {
    "id": "9myaed4CDLx1uTamSDjJ",
    "lojaNome": "SPPE - MAURICIO DE NASSAU",
    "data": "2026-07-06",
    "realizada": "NÃO",
    "motivo": "LOJA NÃO ATENDEU A LIGAÇÃO",
    "auditor": "Bruna Costa",
    "nTentativa": 1,
    "semana": "Semana 1"
  },
  {
    "id": "6dRH6QlXln8c16GDGTjW",
    "lojaNome": "SPPE - SHOPPING TACARUNA",
    "data": "2026-07-06",
    "realizada": "SIM",
    "motivo": "Auditoria Concluída",
    "auditor": "Bruna Costa",
    "nTentativa": 2,
    "semana": "Semana 1"
  },
  {
    "id": "4CmWDwUNvItGiDb94Amx",
    "lojaNome": "SPRN - MIDWAY",
    "data": "2026-07-06",
    "realizada": "NÃO",
    "motivo": "CONTATO ERRADO",
    "auditor": "Bruna Costa",
    "nTentativa": 1,
    "semana": "Semana 1"
  },
  {
    "id": "yoqXBMtK45saxRIjNQwT",
    "lojaNome": "SPCE - PARANGABA",
    "data": "2026-06-30",
    "realizada": "SIM",
    "motivo": "Auditoria Concluída",
    "auditor": "Matheus Cosme",
    "nTentativa": 1,
    "semana": "Semana 4"
  },
  {
    "id": "uaDjNos3H3fwLSHrAhrm",
    "lojaNome": "SPCE - FATIMA",
    "data": "2026-06-30",
    "realizada": "SIM",
    "motivo": "Auditoria Concluída",
    "auditor": "Matheus Cosme",
    "nTentativa": 1,
    "semana": "Semana 4"
  },
  {
    "id": "UbKAmecDkqylnHWTfweR",
    "lojaNome": "SPCE - FLORES",
    "data": "2026-06-30",
    "realizada": "SIM",
    "motivo": "Auditoria Concluída",
    "auditor": "Matheus Cosme",
    "nTentativa": 1,
    "semana": "Semana 4"
  },
  {
    "id": "F29m8470jyB9pQvCiyoV",
    "lojaNome": "SPPI - DIRCEU",
    "data": "2026-06-30",
    "realizada": "SIM",
    "motivo": "Auditoria Concluída",
    "auditor": "Fernanda Teles",
    "nTentativa": 3,
    "semana": "Semana 4"
  },
  {
    "id": "C9CwnnW5POtsHE0OaD8F",
    "lojaNome": "SPCE - WORK CAFE",
    "data": "2026-06-30",
    "realizada": "SIM",
    "motivo": "Auditoria Concluída",
    "auditor": "Matheus Cosme",
    "nTentativa": 1,
    "semana": "Semana 4"
  },
  {
    "id": "77fg9s9uOJVKUaEQzc4n",
    "lojaNome": "SPCE - RIO MAR KENNEDY",
    "data": "2026-06-30",
    "realizada": "SIM",
    "motivo": "Auditoria Concluída",
    "auditor": "Matheus Cosme",
    "nTentativa": 1,
    "semana": "Semana 4"
  },
  {
    "id": "5t3izM2301oMr0PM8z0T",
    "lojaNome": "SPBA - PITUBA",
    "data": "2026-06-30",
    "realizada": "SIM",
    "motivo": "Auditoria Concluída",
    "auditor": "Bruna Costa",
    "nTentativa": 3,
    "semana": "Semana 4"
  },
  {
    "id": "yV37DbxSOOWP3FJqFQPQ",
    "lojaNome": "SPRN - LAGOA MALL",
    "data": "2026-06-29",
    "realizada": "SIM",
    "motivo": "Auditoria Concluída",
    "auditor": "Bruna Costa",
    "nTentativa": 1,
    "semana": "Semana 4"
  },
  {
    "id": "rlRvjuakOIBDQHAwboTK",
    "lojaNome": "SPPA - SHOPPING BOULEVARD",
    "data": "2026-06-29",
    "realizada": "SIM",
    "motivo": "Auditoria Concluída",
    "auditor": "Bruna Costa",
    "nTentativa": 3,
    "semana": "Semana 4"
  },
  {
    "id": "RjG3OuzQN76QXbx1srde",
    "lojaNome": "SPPB - CAMPINA GRANDE",
    "data": "2026-06-29",
    "realizada": "SIM",
    "motivo": "Auditoria Concluída",
    "auditor": "Bruna Costa",
    "nTentativa": 3,
    "semana": "Semana 4"
  },
  {
    "id": "H88gEg4TfDWqzKmi2uzE",
    "lojaNome": "SPPA - UMARIZAL",
    "data": "2026-06-29",
    "realizada": "SIM",
    "motivo": "Auditoria Concluída",
    "auditor": "Bruna Costa",
    "nTentativa": 3,
    "semana": "Semana 4"
  },
  {
    "id": "cG1tlvi6GQW3lQHKfjcw",
    "lojaNome": "SPSP - SHOPPING PATIO PAULISTA",
    "data": "2026-06-27",
    "realizada": "SIM",
    "motivo": "Auditoria Concluída",
    "auditor": "Bruna Costa",
    "nTentativa": 3,
    "semana": "Semana 4"
  },
  {
    "id": "NWy4sw8CithS8pAxSpY0",
    "lojaNome": "SPAM - VIEIRALVES",
    "data": "2026-06-27",
    "realizada": "SIM",
    "motivo": "Auditoria Concluída",
    "auditor": "Fernanda Teles",
    "nTentativa": 2,
    "semana": "Semana 4"
  },
  {
    "id": "Mr6vGAOu4Ne3OIq8eBjY",
    "lojaNome": "SPCE 3 - JUAZEIRO DO NORTE",
    "data": "2026-06-27",
    "realizada": "SIM",
    "motivo": "Auditoria Concluída",
    "auditor": "Bruna Costa",
    "nTentativa": 1,
    "semana": "Semana 4"
  },
  {
    "id": "cFGDsBgNqVVSPbqcFEFm",
    "lojaNome": "SPSP - SHOPPING ELDORADO",
    "data": "2026-06-24",
    "realizada": "NÃO",
    "motivo": "LOJA NÃO ATENDEU A LIGAÇÃO",
    "auditor": "Fernanda Teles",
    "nTentativa": 2,
    "semana": "Semana 4"
  },
  {
    "id": "blTCcOOIOylZW0TOvl8d",
    "lojaNome": "SPCE - AQUIRAZ",
    "data": "2026-06-24",
    "realizada": "SIM",
    "motivo": "Auditoria Concluída",
    "auditor": "Matheus Cosme",
    "nTentativa": 1,
    "semana": "Semana 4"
  },
  {
    "id": "S0rC4KJwcX4bf6MDOeBN",
    "lojaNome": "SPBA - SHOPPING SALVADOR",
    "data": "2026-06-24",
    "realizada": "SIM",
    "motivo": "Auditoria Concluída",
    "auditor": "Fernanda Teles",
    "nTentativa": 3,
    "semana": "Semana 4"
  },
  {
    "id": "RB8PgynXgaQy2ebSqEHj",
    "lojaNome": "SPCE - AQUIRAZ",
    "data": "2026-06-24",
    "realizada": "SIM",
    "motivo": "Auditoria Concluída",
    "auditor": "Matheus Cosme",
    "nTentativa": 1,
    "semana": "Semana 4"
  },
  {
    "id": "PRUFGQwtBh6rHbVcWv7r",
    "lojaNome": "SPPI - DIRCEU",
    "data": "2026-06-24",
    "realizada": "NÃO",
    "motivo": "LOJA NÃO ATENDEU A LIGAÇÃO",
    "auditor": "Fernanda Teles",
    "nTentativa": 2,
    "semana": "Semana 4"
  },
  {
    "id": "Nz1EWZ6W8zZlWVca1cJL",
    "lojaNome": "SPPA - PARQUE SHOPPING",
    "data": "2026-06-24",
    "realizada": "SIM",
    "motivo": "Auditoria Concluída",
    "auditor": "Fernanda Teles",
    "nTentativa": 2,
    "semana": "Semana 4"
  },
  {
    "id": "Mwk2IZBuYA5ObKWKsdjd",
    "lojaNome": "SPCE - LOJA EUSEBIO",
    "data": "2026-06-24",
    "realizada": "SIM",
    "motivo": "Auditoria Concluída",
    "auditor": "Matheus Cosme",
    "nTentativa": 1,
    "semana": "Semana 4"
  },
  {
    "id": "F21f9vChMOswDzOXIWF7",
    "lojaNome": "SPCE - LOJA EUSEBIO",
    "data": "2026-06-24",
    "realizada": "SIM",
    "motivo": "Auditoria Concluída",
    "auditor": "Matheus Cosme",
    "nTentativa": 1,
    "semana": "Semana 4"
  },
  {
    "id": "04NiNzWkx6IRvnKHgQjq",
    "lojaNome": "SPAL - PARQUE SHOPPING MACEIO",
    "data": "2026-06-24",
    "realizada": "SIM",
    "motivo": "Auditoria Concluída",
    "auditor": "Fernanda Teles",
    "nTentativa": 3,
    "semana": "Semana 4"
  },
  {
    "id": "mw5mvPXytbV4lTMoAhMf",
    "lojaNome": "SPCE - BEIRA MAR QUIOSQUE",
    "data": "2026-06-23",
    "realizada": "SIM",
    "motivo": "Auditoria Concluída",
    "auditor": "Fernanda Teles",
    "nTentativa": 1,
    "semana": "Semana 4"
  },
  {
    "id": "iZJODNwTIirGyb6UkVFL",
    "lojaNome": "SPCE - BEIRA MAR LOJA",
    "data": "2026-06-23",
    "realizada": "SIM",
    "motivo": "Auditoria Concluída",
    "auditor": "Fernanda Teles",
    "nTentativa": 1,
    "semana": "Semana 4"
  },
  {
    "id": "KnesO6V9Cz8Uw1zv7nIf",
    "lojaNome": "SPCE - ANA BILHAR",
    "data": "2026-06-23",
    "realizada": "SIM",
    "motivo": "Auditoria Concluída",
    "auditor": "Fernanda Teles",
    "nTentativa": 1,
    "semana": "Semana 4"
  },
  {
    "id": "EvRuKw1x23wKTBZl4tbL",
    "lojaNome": "SPCE 2 - JERICOACOARA",
    "data": "2026-06-23",
    "realizada": "SIM",
    "motivo": "Auditoria Concluída",
    "auditor": "Matheus Cosme",
    "nTentativa": 1,
    "semana": "Semana 4"
  },
  {
    "id": "6wkJOjG7BVadXW6sHnnB",
    "lojaNome": "SPCE - DESEMBARGADOR MOREIRA",
    "data": "2026-06-23",
    "realizada": "SIM",
    "motivo": "Auditoria Concluída",
    "auditor": "Fernanda Teles",
    "nTentativa": 1,
    "semana": "Semana 4"
  },
  {
    "id": "p5eJ1j4RVUgzAC12YAWt",
    "lojaNome": "SPSP - SHOPPING ELDORADO",
    "data": "2026-06-22",
    "realizada": "NÃO",
    "motivo": "LOJA NÃO ATENDEU A LIGAÇÃO",
    "auditor": "Bruna Costa",
    "nTentativa": 1,
    "semana": "Semana 4"
  },
  {
    "id": "nmIfU74zpXJkiAa8Zdnb",
    "lojaNome": "SPCE - LOJA SUL",
    "data": "2026-06-22",
    "realizada": "SIM",
    "motivo": "Auditoria Concluída",
    "auditor": "Fernanda Teles",
    "nTentativa": 1,
    "semana": "Semana 4"
  },
  {
    "id": "dhRgGs6xutjbqRi9wbjN",
    "lojaNome": "SPCE 2 - ICARAI DE AMONTADA",
    "data": "2026-06-22",
    "realizada": "SIM",
    "motivo": "Auditoria Concluída",
    "auditor": "Matheus Cosme",
    "nTentativa": 1,
    "semana": "Semana 4"
  },
  {
    "id": "clEyR4eGGwRfNX1h3cdW",
    "lojaNome": "SPPE - BOA VIAGEM",
    "data": "2026-06-22",
    "realizada": "SIM",
    "motivo": "Auditoria Concluída",
    "auditor": "Bruna Costa",
    "nTentativa": 1,
    "semana": "Semana 4"
  },
  {
    "id": "WVRTNxhtdPmi50JpEnms",
    "lojaNome": "SPPA - UMARIZAL",
    "data": "2026-06-22",
    "realizada": "NÃO",
    "motivo": "LOJA NÃO ATENDEU A LIGAÇÃO",
    "auditor": "Bruna Costa",
    "nTentativa": 2,
    "semana": "Semana 4"
  },
  {
    "id": "U7xJ1xbQ9cJ8FTQkNWdD",
    "lojaNome": "SPPE - SHOPPING PATTEO OLINDA",
    "data": "2026-06-22",
    "realizada": "SIM",
    "motivo": "Auditoria Concluída",
    "auditor": "Bruna Costa",
    "nTentativa": 1,
    "semana": "Semana 4"
  },
  {
    "id": "PfUW4mAneE76AH582SCk",
    "lojaNome": "SPCE - RIO MAR FORTALEZA",
    "data": "2026-06-22",
    "realizada": "SIM",
    "motivo": "Auditoria Concluída",
    "auditor": "Fernanda Teles",
    "nTentativa": 1,
    "semana": "Semana 4"
  },
  {
    "id": "JJHxyxyVNviSzDjQ7Q8y",
    "lojaNome": "SPCE 2 - PREA",
    "data": "2026-06-22",
    "realizada": "SIM",
    "motivo": "Auditoria Concluída",
    "auditor": "Matheus Cosme",
    "nTentativa": 1,
    "semana": "Semana 4"
  },
  {
    "id": "4diQ0JpHjhqSroit9xdQ",
    "lojaNome": "SPCE - SHOPPING IGUATEMI",
    "data": "2026-06-22",
    "realizada": "SIM",
    "motivo": "Auditoria Concluída",
    "auditor": "Fernanda Teles",
    "nTentativa": 1,
    "semana": "Semana 4"
  },
  {
    "id": "j1eJkLAKRkxqjqjDppG9",
    "lojaNome": "SPBA - PITUBA",
    "data": "2026-06-17",
    "realizada": "NÃO",
    "motivo": "ESCALA ERRADA",
    "auditor": "Bruna Costa",
    "nTentativa": 2,
    "semana": "Semana 3"
  },
  {
    "id": "bSqNgi9ruJRkt1zAQDJ8",
    "lojaNome": "SPCE 2 - SOBRAL",
    "data": "2026-06-17",
    "realizada": "SIM",
    "motivo": "Auditoria Concluída",
    "auditor": "Matheus Cosme",
    "nTentativa": 1,
    "semana": "Semana 3"
  },
  {
    "id": "VSDn4LY5IzL79DCnZgwp",
    "lojaNome": "SPSE - ARACAJU",
    "data": "2026-06-17",
    "realizada": "SIM",
    "motivo": "Auditoria Concluída",
    "auditor": "Fernanda Teles",
    "nTentativa": 1,
    "semana": "Semana 3"
  },
  {
    "id": "LE6WIDzA2yhBfm1ITWpd",
    "lojaNome": "SPPE - RIO MAR RECIFE",
    "data": "2026-06-17",
    "realizada": "SIM",
    "motivo": "Auditoria Concluída",
    "auditor": "Bruna Costa",
    "nTentativa": 1,
    "semana": "Semana 3"
  },
  {
    "id": "KV5angZanhLCko6gTwdl",
    "lojaNome": "SPSP - SHOPPING CIDADE SAO PAULO",
    "data": "2026-06-17",
    "realizada": "SIM",
    "motivo": "Auditoria Concluída",
    "auditor": "Bruna Costa",
    "nTentativa": 1,
    "semana": "Semana 3"
  },
  {
    "id": "Ae4nPsucxKVnD4zeRwDj",
    "lojaNome": "SPPI - DOM SEVERINO",
    "data": "2026-06-17",
    "realizada": "SIM",
    "motivo": "Auditoria Concluída",
    "auditor": "Bruna Costa",
    "nTentativa": 1,
    "semana": "Semana 3"
  },
  {
    "id": "4eQmWpxdKfEERlmroRHe",
    "lojaNome": "SPBA - SHOPPING DA BAHIA",
    "data": "2026-06-17",
    "realizada": "SIM",
    "motivo": "Auditoria Concluída",
    "auditor": "Bruna Costa",
    "nTentativa": 2,
    "semana": "Semana 3"
  },
  {
    "id": "056cfSrhivxvSR6vl9rF",
    "lojaNome": "SPAM - VIEIRALVES",
    "data": "2026-06-17",
    "realizada": "NÃO",
    "motivo": "ENCARREGADO NÃO ESTAVA EM LOJA",
    "auditor": "Fernanda Teles",
    "nTentativa": 1,
    "semana": "Semana 3"
  },
  {
    "id": "yKdesKMJa7Pc2568bVqj",
    "lojaNome": "SPPE - MAURICIO DE NASSAU",
    "data": "2026-06-16",
    "realizada": "SIM",
    "motivo": "Auditoria Concluída",
    "auditor": "Fernanda Teles",
    "nTentativa": 1,
    "semana": "Semana 3"
  },
  {
    "id": "weVTOdpJcmgR2dkvCrGd",
    "lojaNome": "SPMT - ESTACAO CUIABA",
    "data": "2026-06-16",
    "realizada": "SIM",
    "motivo": "Auditoria Concluída",
    "auditor": "Fernanda Teles",
    "nTentativa": 1,
    "semana": "Semana 3"
  },
  {
    "id": "nQ9cike0RHcP68MYbLpD",
    "lojaNome": "SPPI - DIRCEU",
    "data": "2026-06-16",
    "realizada": "NÃO",
    "motivo": "LOJA NÃO ATENDEU A LIGAÇÃO",
    "auditor": "Fernanda Teles",
    "nTentativa": 1,
    "semana": "Semana 3"
  },
  {
    "id": "USjw7JUNyocJetRqTnVf",
    "lojaNome": "SPPA - PARQUE SHOPPING",
    "data": "2026-06-16",
    "realizada": "NÃO",
    "motivo": "ENCARREGADO NÃO ESTAVA EM LOJA",
    "auditor": "Fernanda Teles",
    "nTentativa": 1,
    "semana": "Semana 3"
  },
  {
    "id": "RzgCNDQO1TgQgZ5WA00q",
    "lojaNome": "SPMA - SHOPPING DA ILHA",
    "data": "2026-06-16",
    "realizada": "SIM",
    "motivo": "Auditoria Concluída",
    "auditor": "Bruna Costa",
    "nTentativa": 3,
    "semana": "Semana 3"
  },
  {
    "id": "vudIulxw6Tf0zV6zVZkX",
    "lojaNome": "SPAL - PARQUE SHOPPING MACEIO",
    "data": "2026-06-15",
    "realizada": "NÃO",
    "motivo": "ENCARREGADO NÃO ESTAVA EM LOJA",
    "auditor": "Fernanda Teles",
    "nTentativa": 2,
    "semana": "Semana 3"
  },
  {
    "id": "pj8OTVoSjOJ158qyp1b6",
    "lojaNome": "SPBA - AEROPORTO QUIOSQUE",
    "data": "2026-06-15",
    "realizada": "SIM",
    "motivo": "Auditoria Concluída",
    "auditor": "Bruna Costa",
    "nTentativa": 2,
    "semana": "Semana 3"
  },
  {
    "id": "mdfyJ8lRFHUF7LoopvqC",
    "lojaNome": "SPPB - SHOPPING MANAIRA",
    "data": "2026-06-15",
    "realizada": "SIM",
    "motivo": "Auditoria Concluída",
    "auditor": "Fernanda Teles",
    "nTentativa": 2,
    "semana": "Semana 3"
  },
  {
    "id": "hFxok5dNptPXRSkKWjEm",
    "lojaNome": "SPPI - SHOPPING RIO POTY",
    "data": "2026-06-15",
    "realizada": "NÃO",
    "motivo": "LOJA NÃO ATENDEU A LIGAÇÃO",
    "auditor": "Bruna Costa",
    "nTentativa": 2,
    "semana": "Semana 3"
  },
  {
    "id": "d5bDxJfbGyHn4AIHA1Mb",
    "lojaNome": "SPRN - MIDWAY",
    "data": "2026-06-15",
    "realizada": "SIM",
    "motivo": "Auditoria Concluída",
    "auditor": "Fernanda Teles",
    "nTentativa": 2,
    "semana": "Semana 3"
  },
  {
    "id": "cf43N7Nk0xDZlyszvCxy",
    "lojaNome": "SPCE - OUTLET FORTALEZA",
    "data": "2026-06-15",
    "realizada": "SIM",
    "motivo": "Auditoria Concluída",
    "auditor": "Bruna Costa",
    "nTentativa": 2,
    "semana": "Semana 3"
  },
  {
    "id": "U2F3LvQZoT9VNsrsX6u5",
    "lojaNome": "SPBA - SHOPPING SALVADOR",
    "data": "2026-06-15",
    "realizada": "NÃO",
    "motivo": "LOJA NÃO ATENDEU A LIGAÇÃO",
    "auditor": "Fernanda Teles",
    "nTentativa": 2,
    "semana": "Semana 3"
  },
  {
    "id": "LxShMvo7MbU99Mb1xDZR",
    "lojaNome": "SPPA - SHOPPING BOULEVARD",
    "data": "2026-06-15",
    "realizada": "NÃO",
    "motivo": "LOJA NÃO ATENDEU A LIGAÇÃO",
    "auditor": "Bruna Costa",
    "nTentativa": 2,
    "semana": "Semana 3"
  },
  {
    "id": "B4e3cgJHLhyMjX2E1RC4",
    "lojaNome": "SPPB - CAMPINA GRANDE",
    "data": "2026-06-15",
    "realizada": "NÃO",
    "motivo": "LOJA NÃO ATENDEU A LIGAÇÃO",
    "auditor": "Bruna Costa",
    "nTentativa": 2,
    "semana": "Semana 3"
  },
  {
    "id": "6CJJrAHx9zRxCzuthN6A",
    "lojaNome": "SPPA - SHOPPING GRAO PARA",
    "data": "2026-06-15",
    "realizada": "SIM",
    "motivo": "Auditoria Concluída",
    "auditor": "Fernanda Teles",
    "nTentativa": 2,
    "semana": "Semana 3"
  },
  {
    "id": "41BLiFucb4l0HI13yFTU",
    "lojaNome": "SPMT - SHOPPING PANTANAL",
    "data": "2026-06-15",
    "realizada": "SIM",
    "motivo": "Auditoria Concluída",
    "auditor": "Fernanda Teles",
    "nTentativa": 2,
    "semana": "Semana 3"
  },
  {
    "id": "yTcYAxvmiR4EMFIMYu4G",
    "lojaNome": "SPMA - SHOPPING DA ILHA",
    "data": "2026-06-12",
    "realizada": "NÃO",
    "motivo": "COLABORADOR EM ATENDIMENTO",
    "auditor": "Bruna Costa",
    "nTentativa": 2,
    "semana": "Semana 2"
  },
  {
    "id": "wmh4UrSY4o8kbTJl9ws9",
    "lojaNome": "SPCE 3 - DABLIO MALL",
    "data": "2026-06-12",
    "realizada": "NÃO",
    "motivo": "LOJA NÃO ATENDEU A LIGAÇÃO",
    "auditor": "Bruna Costa",
    "nTentativa": 2,
    "semana": "Semana 2"
  },
  {
    "id": "v9pwH2GPESotCTOKyJRO",
    "lojaNome": "SPBA - PITUBA",
    "data": "2026-06-12",
    "realizada": "NÃO",
    "motivo": "Outro (Descrever nas notas)",
    "auditor": "Bruna Costa",
    "nTentativa": 1,
    "semana": "Semana 2"
  },
  {
    "id": "iRbbNRUKuySauJhPy7wj",
    "lojaNome": "SPPE - SHOPPING RECIFE",
    "data": "2026-06-12",
    "realizada": "SIM",
    "motivo": "Auditoria Concluída",
    "auditor": "Bruna Costa",
    "nTentativa": 1,
    "semana": "Semana 2"
  },
  {
    "id": "hge2zYHjMg6G7RAVs9Kz",
    "lojaNome": "SPRN - NATAL SHOPPING",
    "data": "2026-06-12",
    "realizada": "SIM",
    "motivo": "Auditoria Concluída",
    "auditor": "Bruna Costa",
    "nTentativa": 1,
    "semana": "Semana 2"
  },
  {
    "id": "fgdAu2kJcJ4qCwR9uB4D",
    "lojaNome": "SPBA - SHOPPING DA BAHIA",
    "data": "2026-06-12",
    "realizada": "NÃO",
    "motivo": "ESCALA ERRADA",
    "auditor": "Bruna Costa",
    "nTentativa": 1,
    "semana": "Semana 2"
  },
  {
    "id": "a0DjoBrCSUx3jPHZubOV",
    "lojaNome": "SPPE - ORIGENS",
    "data": "2026-06-12",
    "realizada": "SIM",
    "motivo": "Auditoria Concluída",
    "auditor": "Fernanda Teles",
    "nTentativa": 1,
    "semana": "Semana 2"
  },
  {
    "id": "UcM9MmdYox6qpyBfPCZo",
    "lojaNome": "SPCE 3 - DABLIO MALL",
    "data": "2026-06-12",
    "realizada": "SIM",
    "motivo": "Auditoria Concluída",
    "auditor": "Bruna Costa",
    "nTentativa": 3,
    "semana": "Semana 2"
  },
  {
    "id": "UG36X0PGT4mvmYL5cG7s",
    "lojaNome": "SPCE 3 - DABLIO MALL",
    "data": "2026-06-12",
    "realizada": "NÃO",
    "motivo": "LOJA NÃO ATENDEU A LIGAÇÃO",
    "auditor": "Bruna Costa",
    "nTentativa": 1,
    "semana": "Semana 2"
  },
  {
    "id": "EnoCqN6cU6qfm0wdLgtc",
    "lojaNome": "SPPI - SHOPPING RIO POTY",
    "data": "2026-06-12",
    "realizada": "NÃO",
    "motivo": "LOJA NÃO ATENDEU A LIGAÇÃO",
    "auditor": "Bruna Costa",
    "nTentativa": 1,
    "semana": "Semana 2"
  },
  {
    "id": "BZOO1glFrjuCCy3ZgiID",
    "lojaNome": "SPPI - SHOPPING RIO POTY",
    "data": "2026-06-12",
    "realizada": "SIM",
    "motivo": "Auditoria Concluída",
    "auditor": "Bruna Costa",
    "nTentativa": 3,
    "semana": "Semana 2"
  },
  {
    "id": "5a3e9YPi7SWgEz4gRVlK",
    "lojaNome": "SPPA - UMARIZAL",
    "data": "2026-06-12",
    "realizada": "NÃO",
    "motivo": "LOJA NÃO ATENDEU A LIGAÇÃO",
    "auditor": "Bruna Costa",
    "nTentativa": 1,
    "semana": "Semana 2"
  },
  {
    "id": "fs4cIHzop3Mv8PpfNISX",
    "lojaNome": "SPPA - SHOPPING GRAO PARA",
    "data": "2026-06-11",
    "realizada": "NÃO",
    "motivo": "LOJA NÃO ATENDEU A LIGAÇÃO",
    "auditor": "Fernanda Teles",
    "nTentativa": 1,
    "semana": "Semana 2"
  },
  {
    "id": "o6eFpQSm46UaSZlCGgBA",
    "lojaNome": "SPRN - MOSSORO",
    "data": "2026-06-10",
    "realizada": "SIM",
    "motivo": "Auditoria Concluída",
    "auditor": "Matheus Cosme",
    "nTentativa": 1,
    "semana": "Semana 2"
  },
  {
    "id": "ekQzz6DE2CQ2OuomGu7l",
    "lojaNome": "SPBA - VILLAS",
    "data": "2026-06-10",
    "realizada": "SIM",
    "motivo": "Auditoria Concluída",
    "auditor": "Fernanda Teles",
    "nTentativa": 1,
    "semana": "Semana 2"
  },
  {
    "id": "cgk1b7JeroIiWWoTXV1e",
    "lojaNome": "SPRN - NOVA PARNAMIRIM",
    "data": "2026-06-10",
    "realizada": "SIM",
    "motivo": "Auditoria Concluída",
    "auditor": "Bruna Costa",
    "nTentativa": 1,
    "semana": "Semana 2"
  },
  {
    "id": "Ots3IhaCFdGjFv1ZlrlZ",
    "lojaNome": "SPSE - JARDINS",
    "data": "2026-06-10",
    "realizada": "SIM",
    "motivo": "Auditoria Concluída",
    "auditor": "Bruna Costa",
    "nTentativa": 1,
    "semana": "Semana 2"
  },
  {
    "id": "KBipm3R8Sck3JXAsFbFR",
    "lojaNome": "SPPE - SHOPPING TACARUNA",
    "data": "2026-06-10",
    "realizada": "SIM",
    "motivo": "Auditoria Concluída",
    "auditor": "Fernanda Teles",
    "nTentativa": 1,
    "semana": "Semana 2"
  },
  {
    "id": "4R00pqQpSi7QRHvRotEJ",
    "lojaNome": "SPBA - SHOPPING PARALELA",
    "data": "2026-06-10",
    "realizada": "SIM",
    "motivo": "Auditoria Concluída",
    "auditor": "Bruna Costa",
    "nTentativa": 2,
    "semana": "Semana 2"
  },
  {
    "id": "yJRpOtzD2vTF8YjRuCzG",
    "lojaNome": "SPBA - SHOPPING SALVADOR",
    "data": "2026-06-09",
    "realizada": "NÃO",
    "motivo": "ESCALA ERRADA",
    "auditor": "Fernanda Teles",
    "nTentativa": 1,
    "semana": "Semana 2"
  },
  {
    "id": "iOQcklhOATAe63ptKK4s",
    "lojaNome": "SPMA - SHOPPING SAO LUIS",
    "data": "2026-06-09",
    "realizada": "SIM",
    "motivo": "Auditoria Concluída",
    "auditor": "Fernanda Teles",
    "nTentativa": 1,
    "semana": "Semana 2"
  },
  {
    "id": "gaUpjICzhPQcqlXEiv9Q",
    "lojaNome": "SPPI - SHOPPING RIVERSIDE",
    "data": "2026-06-09",
    "realizada": "SIM",
    "motivo": "Auditoria Concluída",
    "auditor": "Fernanda Teles",
    "nTentativa": 1,
    "semana": "Semana 2"
  },
  {
    "id": "MYijIjFdrDIKYj0H0Ek2",
    "lojaNome": "SPCE - AEROPORTO LOJA",
    "data": "2026-06-09",
    "realizada": "SIM",
    "motivo": "Auditoria Concluída",
    "auditor": "Bruna Costa",
    "nTentativa": 2,
    "semana": "Semana 2"
  },
  {
    "id": "KLAnSGTooHQcVjVCP4tj",
    "lojaNome": "SPCE - AEROPORTO LOJA",
    "data": "2026-06-09",
    "realizada": "NÃO",
    "motivo": "LOJA NÃO ATENDEU A LIGAÇÃO",
    "auditor": "Bruna Costa",
    "nTentativa": 1,
    "semana": "Semana 2"
  },
  {
    "id": "Hn93EXKmO1WAK7jLW7qr",
    "lojaNome": "SPMT - SHOPPING PANTANAL",
    "data": "2026-06-09",
    "realizada": "NÃO",
    "motivo": "ENCARREGADO NÃO ESTAVA EM LOJA",
    "auditor": "Fernanda Teles",
    "nTentativa": 1,
    "semana": "Semana 2"
  },
  {
    "id": "2qQUKzQx1ywfS91SM42g",
    "lojaNome": "SPPE - SHOPPING GUARARAPES",
    "data": "2026-06-09",
    "realizada": "SIM",
    "motivo": "Auditoria Concluída",
    "auditor": "Fernanda Teles",
    "nTentativa": 1,
    "semana": "Semana 2"
  },
  {
    "id": "wm0UCpSsBAJEI2ms0oOD",
    "lojaNome": "SPAM - PONTA NEGRA",
    "data": "2026-06-08",
    "realizada": "SIM",
    "motivo": "Auditoria Concluída",
    "auditor": "Fernanda Teles",
    "nTentativa": 1,
    "semana": "Semana 2"
  },
  {
    "id": "vMWmBwR1DH3ya52jMs2K",
    "lojaNome": "SPRN - MIDWAY",
    "data": "2026-06-08",
    "realizada": "NÃO",
    "motivo": "ENCARREGADO NÃO ESTAVA EM LOJA",
    "auditor": "Fernanda Teles",
    "nTentativa": 1,
    "semana": "Semana 2"
  },
  {
    "id": "pf4GlXVvjy1ZI5puLwiS",
    "lojaNome": "SPAL - PARQUE SHOPPING MACEIO",
    "data": "2026-06-08",
    "realizada": "NÃO",
    "motivo": "COLABORADOR NA REUNIÃO DE ENCARREGADOS",
    "auditor": "Fernanda Teles",
    "nTentativa": 1,
    "semana": "Semana 2"
  },
  {
    "id": "nhVAoOTKwzgKsAxgpDW5",
    "lojaNome": "SPBA - AEROPORTO LOJA",
    "data": "2026-06-08",
    "realizada": "NÃO",
    "motivo": "LOJA NÃO ATENDEU A LIGAÇÃO",
    "auditor": "Bruna Costa",
    "nTentativa": 1,
    "semana": "Semana 2"
  },
  {
    "id": "lZvO6wrQTKoHRvzOlHQE",
    "lojaNome": "SPCE - OUTLET FORTALEZA",
    "data": "2026-06-08",
    "realizada": "NÃO",
    "motivo": "FUNCIONÁRIO FAZENDO CONTAGEM SEMANAL",
    "auditor": "Bruna Costa",
    "nTentativa": 1,
    "semana": "Semana 2"
  },
  {
    "id": "j8NofbMqRoiCi5I4TbUb",
    "lojaNome": "SPPB - SHOPPING MANAIRA",
    "data": "2026-06-08",
    "realizada": "NÃO",
    "motivo": "LOJA NÃO ATENDEU A LIGAÇÃO",
    "auditor": "Fernanda Teles",
    "nTentativa": 1,
    "semana": "Semana 2"
  },
  {
    "id": "iJLfEQzsZSCyOUjBgjXf",
    "lojaNome": "SPPA - SHOPPING BOULEVARD",
    "data": "2026-06-08",
    "realizada": "NÃO",
    "motivo": "LOJA NÃO ATENDEU A LIGAÇÃO",
    "auditor": "Bruna Costa",
    "nTentativa": 1,
    "semana": "Semana 2"
  },
  {
    "id": "i8d2QMG8Yz7lTnsiiMsV",
    "lojaNome": "SPPE - RUA AMELIA",
    "data": "2026-06-08",
    "realizada": "SIM",
    "motivo": "Auditoria Concluída",
    "auditor": "Bruna Costa",
    "nTentativa": 1,
    "semana": "Semana 2"
  },
  {
    "id": "VSscC3QMf20uGzdQj9AK",
    "lojaNome": "SPSP - SHOPPING PATIO PAULISTA",
    "data": "2026-06-08",
    "realizada": "NÃO",
    "motivo": "LOJA NÃO ATENDEU A LIGAÇÃO",
    "auditor": "Bruna Costa",
    "nTentativa": 2,
    "semana": "Semana 2"
  },
  {
    "id": "PEIKQTteyLdhU1g4wyqb",
    "lojaNome": "SPPB - CAMPINA GRANDE",
    "data": "2026-06-08",
    "realizada": "NÃO",
    "motivo": "LOJA NÃO ATENDEU A LIGAÇÃO",
    "auditor": "Bruna Costa",
    "nTentativa": 1,
    "semana": "Semana 2"
  },
  {
    "id": "5WNIuwXLIXmJy8umg5oJ",
    "lojaNome": "SPBA - HORTO FLORESTAL",
    "data": "2026-06-08",
    "realizada": "SIM",
    "motivo": "Auditoria Concluída",
    "auditor": "Fernanda Teles",
    "nTentativa": 1,
    "semana": "Semana 2"
  },
  {
    "id": "51BtXtxTKC3tImDLLVuG",
    "lojaNome": "SPSP - SHOPPING PATIO PAULISTA",
    "data": "2026-06-08",
    "realizada": "NÃO",
    "motivo": "Outro (Descrever nas notas)",
    "auditor": "Bruna Costa",
    "nTentativa": 1,
    "semana": "Semana 2"
  },
  {
    "id": "1EI5IO251KEktw1T27ve",
    "lojaNome": "SPBA - PRAIA DO FORTE",
    "data": "2026-06-08",
    "realizada": "SIM",
    "motivo": "Auditoria Concluída",
    "auditor": "Fernanda Teles",
    "nTentativa": 1,
    "semana": "Semana 2"
  },
  {
    "id": "tfGEh9rByAwL8ppT8Z7M",
    "lojaNome": "SPPE - CARUARU SHOPPING",
    "data": "2026-06-05",
    "realizada": "SIM",
    "motivo": "Auditoria Concluída",
    "auditor": "Bruna Costa",
    "nTentativa": 1,
    "semana": "Semana 1"
  },
  {
    "id": "iiks6SHSZb2keBT0PtxV",
    "lojaNome": "SPBA - AEROPORTO LOJA",
    "data": "2026-06-05",
    "realizada": "SIM",
    "motivo": "Auditoria Concluída",
    "auditor": "Bruna Costa",
    "nTentativa": 2,
    "semana": "Semana 1"
  },
  {
    "id": "SJRzCi7kthqZeidJMw3h",
    "lojaNome": "SPBA - AEROPORTO QUIOSQUE",
    "data": "2026-06-05",
    "realizada": "NÃO",
    "motivo": "LOJA NÃO ATENDEU A LIGAÇÃO",
    "auditor": "Bruna Costa",
    "nTentativa": 1,
    "semana": "Semana 1"
  },
  {
    "id": "KYKnbiV9pDoqlp97JQbt",
    "lojaNome": "SPPE - ORIGENS",
    "data": "2026-06-05",
    "realizada": "SIM",
    "motivo": "Auditoria Concluída",
    "auditor": "Bruna Costa",
    "nTentativa": 1,
    "semana": "Semana 1"
  },
  {
    "id": "I4tmYSbrjmEdzNBnFHXN",
    "lojaNome": "SPBA - SHOPPING PARALELA",
    "data": "2026-06-05",
    "realizada": "NÃO",
    "motivo": "LOJA NÃO ATENDEU A LIGAÇÃO",
    "auditor": "Bruna Costa",
    "nTentativa": 1,
    "semana": "Semana 1"
  },
  {
    "id": "3vWCGnXzJnok0MljZ0qF",
    "lojaNome": "SPMA - SHOPPING DA ILHA",
    "data": "2026-06-05",
    "realizada": "NÃO",
    "motivo": "LOJA NÃO ATENDEU A LIGAÇÃO",
    "auditor": "Bruna Costa",
    "nTentativa": 1,
    "semana": "Semana 1"
  },
  {
    "id": "xinzPG4IP9wBqDgSOGLe",
    "lojaNome": "SPPE - RIO MAR RECIFE",
    "data": "2026-05-29",
    "realizada": "SIM",
    "motivo": "Auditoria Concluída",
    "auditor": "Bruna Costa",
    "nTentativa": 2,
    "semana": "Semana 4"
  },
  {
    "id": "Or4whyBHDMDQ0vkDSmG9",
    "lojaNome": "SPCE - SHOPPING IGUATEMI",
    "data": "2026-05-29",
    "realizada": "SIM",
    "motivo": "Auditoria Concluída",
    "auditor": "Bruna Costa",
    "nTentativa": 1,
    "semana": "Semana 4"
  },
  {
    "id": "6cVgPtJo8tBnqDubCKII",
    "lojaNome": "SPSP - SHOPPING ELDORADO",
    "data": "2026-05-29",
    "realizada": "SIM",
    "motivo": "Auditoria Concluída",
    "auditor": "Bruna Costa",
    "nTentativa": 4,
    "semana": "Semana 4"
  },
  {
    "id": "2loYrsMT7EXce8Kj3rra",
    "lojaNome": "SPCE - LOJA SUL",
    "data": "2026-05-29",
    "realizada": "SIM",
    "motivo": "Auditoria Concluída",
    "auditor": "Bruna Costa",
    "nTentativa": 1,
    "semana": "Semana 4"
  },
  {
    "id": "uuJIqnlFgRhBc0tQpclh",
    "lojaNome": "SPPE - SHOPPING PATTEO OLINDA",
    "data": "2026-05-28",
    "realizada": "SIM",
    "motivo": "Auditoria Concluída",
    "auditor": "Fernanda Teles",
    "nTentativa": 2,
    "semana": "Semana 4"
  },
  {
    "id": "KlEBF2aRqINGVZAgHw1u",
    "lojaNome": "SPCE 3 - DABLIO MALL",
    "data": "2026-05-28",
    "realizada": "SIM",
    "motivo": "Auditoria Concluída",
    "auditor": "Fernanda Teles",
    "nTentativa": 3,
    "semana": "Semana 4"
  },
  {
    "id": "uvJdJyYhorMiwh1UU6Px",
    "lojaNome": "SPPE - ORIGENS",
    "data": "2026-05-27",
    "realizada": "SIM",
    "motivo": "Auditoria Concluída",
    "auditor": "Matheus Cosme",
    "nTentativa": 2,
    "semana": "Semana 4"
  },
  {
    "id": "XfnhUpBoHebgV6ehO5VV",
    "lojaNome": "SPPA - UMARIZAL",
    "data": "2026-05-27",
    "realizada": "SIM",
    "motivo": "Auditoria Concluída",
    "auditor": "Fernanda Teles",
    "nTentativa": 2,
    "semana": "Semana 4"
  },
  {
    "id": "3Ls6TOZvyWUS1FAAu0tU",
    "lojaNome": "SPBA - SHOPPING DA BAHIA",
    "data": "2026-05-27",
    "realizada": "SIM",
    "motivo": "Auditoria Concluída",
    "auditor": "Fernanda Teles",
    "nTentativa": 2,
    "semana": "Semana 4"
  },
  {
    "id": "kgdEQvppemwwpRJAEsky",
    "lojaNome": "SPSP - SHOPPING ELDORADO",
    "data": "2026-05-26",
    "realizada": "NÃO",
    "motivo": "LOJA NÃO ATENDEU A LIGAÇÃO",
    "auditor": "Bruna Costa",
    "nTentativa": 3,
    "semana": "Semana 4"
  },
  {
    "id": "TZDSHTbtz7HkFe8YnoE3",
    "lojaNome": "SPCE - FLORES",
    "data": "2026-05-26",
    "realizada": "SIM",
    "motivo": "Auditoria Concluída",
    "auditor": "Fernanda Teles",
    "nTentativa": 1,
    "semana": "Semana 4"
  },
  {
    "id": "R6PmEGbW5Ph1zUuGvkhB",
    "lojaNome": "SPCE - ANA BILHAR",
    "data": "2026-05-26",
    "realizada": "SIM",
    "motivo": "Auditoria Concluída",
    "auditor": "Bruna Costa",
    "nTentativa": 1,
    "semana": "Semana 4"
  },
  {
    "id": "NqasQLF8bwb5QKZ2cYjQ",
    "lojaNome": "SPPI - DIRCEU",
    "data": "2026-05-26",
    "realizada": "SIM",
    "motivo": "Auditoria Concluída",
    "auditor": "Bruna Costa",
    "nTentativa": 1,
    "semana": "Semana 4"
  },
  {
    "id": "5hLOEIsaoxSraeOBOjiC",
    "lojaNome": "SPCE - BEIRA MAR LOJA",
    "data": "2026-05-26",
    "realizada": "SIM",
    "motivo": "Auditoria Concluída",
    "auditor": "Fernanda Teles",
    "nTentativa": 1,
    "semana": "Semana 4"
  },
  {
    "id": "w5IGq1eL8jFA7GG4K2i7",
    "lojaNome": "SPCE - BEIRA MAR QUIOSQUE",
    "data": "2026-05-25",
    "realizada": "SIM",
    "motivo": "Auditoria Concluída",
    "auditor": "Bruna Costa",
    "nTentativa": 1,
    "semana": "Semana 4"
  },
  {
    "id": "vBdggvILiWyaxEY18C1m",
    "lojaNome": "SPRN - NATAL SHOPPING",
    "data": "2026-05-25",
    "realizada": "SIM",
    "motivo": "Auditoria Concluída",
    "auditor": "Matheus Cosme",
    "nTentativa": 3,
    "semana": "Semana 4"
  },
  {
    "id": "SeWTGaNUhMrnWTcjsxSD",
    "lojaNome": "SPCE - FATIMA",
    "data": "2026-05-25",
    "realizada": "SIM",
    "motivo": "Auditoria Concluída",
    "auditor": "Fernanda Teles",
    "nTentativa": 1,
    "semana": "Semana 4"
  },
  {
    "id": "P0EXiU3kds39iSkv5Cwf",
    "lojaNome": "SPRN - LAGOA MALL",
    "data": "2026-05-25",
    "realizada": "SIM",
    "motivo": "Auditoria Concluída",
    "auditor": "Matheus Cosme",
    "nTentativa": 1,
    "semana": "Semana 4"
  },
  {
    "id": "Ob2SipYLDOpWnnmCSDjq",
    "lojaNome": "SPCE - RIO MAR KENNEDY",
    "data": "2026-05-25",
    "realizada": "SIM",
    "motivo": "Auditoria Concluída",
    "auditor": "Fernanda Teles",
    "nTentativa": 1,
    "semana": "Semana 4"
  },
  {
    "id": "LeHU91JHQpZoKa5TxNn7",
    "lojaNome": "SPRN - MOSSORO",
    "data": "2026-05-25",
    "realizada": "NÃO",
    "motivo": "LOJA EM OBRA/MANUTENÇÃO",
    "auditor": "Fernanda Teles",
    "nTentativa": 1,
    "semana": "Semana 4"
  },
  {
    "id": "HCWUPFuYep8K6t5ChXAc",
    "lojaNome": "SPCE - AEROPORTO QUIOSQUE",
    "data": "2026-05-25",
    "realizada": "SIM",
    "motivo": "Auditoria Concluída",
    "auditor": "Fernanda Teles",
    "nTentativa": 1,
    "semana": "Semana 4"
  },
  {
    "id": "H8cnOkRC8ZlS7wkc10BE",
    "lojaNome": "SPCE - PARANGABA",
    "data": "2026-05-25",
    "realizada": "SIM",
    "motivo": "Auditoria Concluída",
    "auditor": "Fernanda Teles",
    "nTentativa": 1,
    "semana": "Semana 4"
  },
  {
    "id": "eqgMPhozd2vIstbDtI2b",
    "lojaNome": "SPPE - MAURICIO DE NASSAU",
    "data": "2026-05-22",
    "realizada": "SIM",
    "motivo": "Auditoria Concluída",
    "auditor": "Bruna Costa",
    "nTentativa": 2,
    "semana": "Semana 4"
  },
  {
    "id": "Wrd5sOOy8MjI8WvX2sec",
    "lojaNome": "SPSP - SHOPPING ELDORADO",
    "data": "2026-05-22",
    "realizada": "NÃO",
    "motivo": "LOJA NÃO ATENDEU A LIGAÇÃO",
    "auditor": "Bruna Costa",
    "nTentativa": 2,
    "semana": "Semana 4"
  },
  {
    "id": "RihTR8aX4fGEVE0liNDO",
    "lojaNome": "SPBA - SHOPPING SALVADOR",
    "data": "2026-05-22",
    "realizada": "SIM",
    "motivo": "Auditoria Concluída",
    "auditor": "Bruna Costa",
    "nTentativa": 1,
    "semana": "Semana 4"
  },
  {
    "id": "R9ElGh0HfAj0kdV4CTAO",
    "lojaNome": "SPCE - RIO MAR FORTALEZA",
    "data": "2026-05-22",
    "realizada": "SIM",
    "motivo": "Auditoria Concluída",
    "auditor": "Bruna Costa",
    "nTentativa": 1,
    "semana": "Semana 4"
  },
  {
    "id": "In1yFznkExziOIyABNzm",
    "lojaNome": "SPBA - VILLAS",
    "data": "2026-05-22",
    "realizada": "SIM",
    "motivo": "Auditoria Concluída",
    "auditor": "Bruna Costa",
    "nTentativa": 1,
    "semana": "Semana 4"
  },
  {
    "id": "CIARdxhgT4AgJYVKVUwg",
    "lojaNome": "SPCE - LOJA EUSEBIO",
    "data": "2026-05-22",
    "realizada": "SIM",
    "motivo": "Auditoria Concluída",
    "auditor": "Matheus Cosme",
    "nTentativa": 1,
    "semana": "Semana 4"
  },
  {
    "id": "4u87yBb6VUTdHIKjqbXf",
    "lojaNome": "SPSE - ARACAJU",
    "data": "2026-05-22",
    "realizada": "SIM",
    "motivo": "Auditoria Concluída",
    "auditor": "Bruna Costa",
    "nTentativa": 1,
    "semana": "Semana 4"
  },
  {
    "id": "4aUprok422gI2SwkkcOK",
    "lojaNome": "SPAM - VIEIRALVES",
    "data": "2026-05-22",
    "realizada": "NÃO",
    "motivo": "ESCALA ERRADA",
    "auditor": "Bruna Costa",
    "nTentativa": 1,
    "semana": "Semana 4"
  },
  {
    "id": "3wphdRH1Xezo86pivFti",
    "lojaNome": "SPCE - AQUIRAZ",
    "data": "2026-05-22",
    "realizada": "SIM",
    "motivo": "Auditoria Concluída",
    "auditor": "Matheus Cosme",
    "nTentativa": 1,
    "semana": "Semana 4"
  },
  {
    "id": "36VdDuZKAZyG18fuqotM",
    "lojaNome": "SPPE - SHOPPING PATTEO OLINDA",
    "data": "2026-05-22",
    "realizada": "NÃO",
    "motivo": "ENCARREGADO NÃO ESTAVA EM LOJA",
    "auditor": "Bruna Costa",
    "nTentativa": 1,
    "semana": "Semana 4"
  },
  {
    "id": "2tqBVCidRxfCMEbFS2sO",
    "lojaNome": "SPCE 3 - DABLIO MALL",
    "data": "2026-05-22",
    "realizada": "NÃO",
    "motivo": "Outro (Descrever nas notas)",
    "auditor": "Bruna Costa",
    "nTentativa": 2,
    "semana": "Semana 4"
  },
  {
    "id": "0UYEEVO2P4swK3I0t81x",
    "lojaNome": "SPAM - VIEIRALVES",
    "data": "2026-05-22",
    "realizada": "SIM",
    "motivo": "Auditoria Concluída",
    "auditor": "Bruna Costa",
    "nTentativa": 2,
    "semana": "Semana 4"
  },
  {
    "id": "u1OhkXGgWtAPMNQu5EAQ",
    "lojaNome": "SPSP - SHOPPING PATIO PAULISTA",
    "data": "2026-05-20",
    "realizada": "SIM",
    "motivo": "Auditoria Concluída",
    "auditor": "Fernanda Teles",
    "nTentativa": 3,
    "semana": "Semana 3"
  },
  {
    "id": "npJiWbu1RFzyonsHuaeL",
    "lojaNome": "SPPA - SHOPPING GRAO PARA",
    "data": "2026-05-20",
    "realizada": "SIM",
    "motivo": "Auditoria Concluída",
    "auditor": "Bruna Costa",
    "nTentativa": 1,
    "semana": "Semana 3"
  },
  {
    "id": "TEcQG3NonJlicX90JOEI",
    "lojaNome": "SPCE 2 - SOBRAL",
    "data": "2026-05-20",
    "realizada": "SIM",
    "motivo": "Auditoria Concluída",
    "auditor": "Bruna Costa",
    "nTentativa": 2,
    "semana": "Semana 3"
  },
  {
    "id": "QjK69QZc8yBk0aKjCQGf",
    "lojaNome": "SPCE - DESEMBARGADOR MOREIRA",
    "data": "2026-05-20",
    "realizada": "SIM",
    "motivo": "Auditoria Concluída",
    "auditor": "Bruna Costa",
    "nTentativa": 1,
    "semana": "Semana 3"
  },
  {
    "id": "wTvKhvpGyajECAHXOV8T",
    "lojaNome": "SPMT - ESTACAO CUIABA",
    "data": "2026-05-19",
    "realizada": "SIM",
    "motivo": "Auditoria Concluída",
    "auditor": "Fernanda Teles",
    "nTentativa": 1,
    "semana": "Semana 3"
  },
  {
    "id": "ouUpxA2mHdkvpIV4eXgr",
    "lojaNome": "SPPE - RIO MAR RECIFE",
    "data": "2026-05-19",
    "realizada": "NÃO",
    "motivo": "LOJA NÃO ATENDEU A LIGAÇÃO",
    "auditor": "Bruna Costa",
    "nTentativa": 1,
    "semana": "Semana 3"
  },
  {
    "id": "ofv0C8rYSZk1jCB7LNgW",
    "lojaNome": "SPBA - SHOPPING PARALELA",
    "data": "2026-05-19",
    "realizada": "SIM",
    "motivo": "Auditoria Concluída",
    "auditor": "Fernanda Teles",
    "nTentativa": 2,
    "semana": "Semana 3"
  },
  {
    "id": "QCcBwr3nsnu2lhiGRdrW",
    "lojaNome": "SPSP - SHOPPING ELDORADO",
    "data": "2026-05-19",
    "realizada": "NÃO",
    "motivo": "ESCALA ERRADA",
    "auditor": "Bruna Costa",
    "nTentativa": 1,
    "semana": "Semana 3"
  },
  {
    "id": "QATtvHDRrZqibBzobnnA",
    "lojaNome": "SPCE - OUTLET FORTALEZA",
    "data": "2026-05-19",
    "realizada": "SIM",
    "motivo": "Auditoria Concluída",
    "auditor": "Fernanda Teles",
    "nTentativa": 2,
    "semana": "Semana 3"
  },
  {
    "id": "OnZpbj0j2CG0YBJTjqLr",
    "lojaNome": "SPMA - SHOPPING DA ILHA",
    "data": "2026-05-19",
    "realizada": "SIM",
    "motivo": "Auditoria Concluída",
    "auditor": "Fernanda Teles",
    "nTentativa": 2,
    "semana": "Semana 3"
  },
  {
    "id": "rhH1JvCyFMHSosto4EI8",
    "lojaNome": "SPCE 2 - ICARAI DE AMONTADA",
    "data": "2026-05-18",
    "realizada": "SIM",
    "motivo": "Auditoria Concluída",
    "auditor": "Bruna Costa",
    "nTentativa": 1,
    "semana": "Semana 3"
  },
  {
    "id": "rRHp5l65peVm5AefsAsP",
    "lojaNome": "SPCE - AEROPORTO LOJA",
    "data": "2026-05-18",
    "realizada": "SIM",
    "motivo": "Auditoria Concluída",
    "auditor": "Bruna Costa",
    "nTentativa": 1,
    "semana": "Semana 3"
  },
  {
    "id": "gfg3CVKMTA3TLDeSNwMf",
    "lojaNome": "SPPE - SHOPPING RECIFE",
    "data": "2026-05-18",
    "realizada": "SIM",
    "motivo": "Auditoria Concluída",
    "auditor": "Fernanda Teles",
    "nTentativa": 2,
    "semana": "Semana 3"
  },
  {
    "id": "PdASmMpeRi0xmesCNFZh",
    "lojaNome": "SPBA - AEROPORTO QUIOSQUE",
    "data": "2026-05-18",
    "realizada": "SIM",
    "motivo": "Auditoria Concluída",
    "auditor": "Fernanda Teles",
    "nTentativa": 2,
    "semana": "Semana 3"
  },
  {
    "id": "9RGhPbcPaKSGSZlWq9kV",
    "lojaNome": "SPCE 2 - SOBRAL",
    "data": "2026-05-18",
    "realizada": "NÃO",
    "motivo": "LOJA NÃO ATENDEU A LIGAÇÃO",
    "auditor": "Bruna Costa",
    "nTentativa": 1,
    "semana": "Semana 3"
  },
  {
    "id": "4Qlq21jIWdM0LENOW8cw",
    "lojaNome": "SPCE 3 - JUAZEIRO DO NORTE",
    "data": "2026-05-18",
    "realizada": "SIM",
    "motivo": "Auditoria Concluída",
    "auditor": "Fernanda Teles",
    "nTentativa": 1,
    "semana": "Semana 3"
  },
  {
    "id": "xE5OmwgKpd5YF7RNselS",
    "lojaNome": "SPPE - SHOPPING GUARARAPES",
    "data": "2026-05-15",
    "realizada": "SIM",
    "motivo": "Auditoria Concluída",
    "auditor": "Bruna Costa",
    "nTentativa": 1,
    "semana": "Semana 3"
  },
  {
    "id": "vo90V8bHzMauWl6zknaS",
    "lojaNome": "SPRN - NATAL SHOPPING",
    "data": "2026-05-15",
    "realizada": "NÃO",
    "motivo": "COLABORADOR FORA DO EXPEDIENTE",
    "auditor": "Bruna Costa",
    "nTentativa": 2,
    "semana": "Semana 3"
  },
  {
    "id": "roNMBPT93NtVBj0s70eq",
    "lojaNome": "SPPE - SHOPPING TACARUNA",
    "data": "2026-05-15",
    "realizada": "SIM",
    "motivo": "Auditoria Concluída",
    "auditor": "Bruna Costa",
    "nTentativa": 2,
    "semana": "Semana 3"
  },
  {
    "id": "kBjrtepsWJA2OnaxQD5I",
    "lojaNome": "SPBA - SHOPPING DA BAHIA",
    "data": "2026-05-15",
    "realizada": "NÃO",
    "motivo": "COLABORADOR NA REUNIÃO DE ENCARREGADOS",
    "auditor": "Fernanda Teles",
    "nTentativa": 1,
    "semana": "Semana 3"
  },
  {
    "id": "hXXvuL9iDpiRng9YCtrL",
    "lojaNome": "SPMA - SHOPPING SAO LUIS",
    "data": "2026-05-15",
    "realizada": "SIM",
    "motivo": "Auditoria Concluída",
    "auditor": "Bruna Costa",
    "nTentativa": 3,
    "semana": "Semana 3"
  },
  {
    "id": "WeImXSRvWPvGysxh898g",
    "lojaNome": "SPPA - UMARIZAL",
    "data": "2026-05-15",
    "realizada": "NÃO",
    "motivo": "LOJA NÃO ATENDEU A LIGAÇÃO",
    "auditor": "Fernanda Teles",
    "nTentativa": 1,
    "semana": "Semana 3"
  },
  {
    "id": "Nxk1g44OZOGzIVGasWbq",
    "lojaNome": "SPPE - MAURICIO DE NASSAU",
    "data": "2026-05-15",
    "realizada": "NÃO",
    "motivo": "LOJA NÃO ATENDEU A LIGAÇÃO",
    "auditor": "Bruna Costa",
    "nTentativa": 1,
    "semana": "Semana 3"
  },
  {
    "id": "H5MST918oQuAee0HUk35",
    "lojaNome": "SPPE - ORIGENS",
    "data": "2026-05-15",
    "realizada": "SIM",
    "motivo": "Auditoria Concluída",
    "auditor": "Fernanda Teles",
    "nTentativa": 1,
    "semana": "Semana 3"
  },
  {
    "id": "GSLiar9Fueocg3032k8d",
    "lojaNome": "SPMA - SHOPPING SAO LUIS",
    "data": "2026-05-15",
    "realizada": "NÃO",
    "motivo": "LOJA NÃO ATENDEU A LIGAÇÃO",
    "auditor": "Bruna Costa",
    "nTentativa": 2,
    "semana": "Semana 3"
  },
  {
    "id": "DhNwFLqSRHpR6NSKQFEi",
    "lojaNome": "SPPA - PARQUE SHOPPING",
    "data": "2026-05-15",
    "realizada": "SIM",
    "motivo": "Auditoria Concluída",
    "auditor": "Bruna Costa",
    "nTentativa": 2,
    "semana": "Semana 3"
  },
  {
    "id": "C8Xeoeh0l3ZIeTBSBvdC",
    "lojaNome": "SPCE 2 - JERICOACOARA",
    "data": "2026-05-15",
    "realizada": "SIM",
    "motivo": "Auditoria Concluída",
    "auditor": "Fernanda Teles",
    "nTentativa": 1,
    "semana": "Semana 3"
  },
  {
    "id": "86JWSZ5MG7DjijzNSnKQ",
    "lojaNome": "SPPE - SHOPPING TACARUNA",
    "data": "2026-05-15",
    "realizada": "NÃO",
    "motivo": "ENCARREGADO NÃO ESTAVA EM LOJA",
    "auditor": "Bruna Costa",
    "nTentativa": 1,
    "semana": "Semana 3"
  },
  {
    "id": "84lE8Ye4nv6hF1dv0Han",
    "lojaNome": "SPSP - SHOPPING CIDADE SAO PAULO",
    "data": "2026-05-15",
    "realizada": "SIM",
    "motivo": "Auditoria Concluída",
    "auditor": "Fernanda Teles",
    "nTentativa": 1,
    "semana": "Semana 3"
  },
  {
    "id": "nwp7zfW8Dlq6sMncgzoo",
    "lojaNome": "SPPE - SHOPPING RECIFE",
    "data": "2026-05-14",
    "realizada": "NÃO",
    "motivo": "ENCARREGADO NÃO ESTAVA EM LOJA",
    "auditor": "Fernanda Teles",
    "nTentativa": 1,
    "semana": "Semana 2"
  },
  {
    "id": "dwMlgolj8He1QefuTYw5",
    "lojaNome": "SPMA - SHOPPING DA ILHA",
    "data": "2026-05-14",
    "realizada": "NÃO",
    "motivo": "ENCARREGADO NÃO ESTAVA EM LOJA",
    "auditor": "Fernanda Teles",
    "nTentativa": 1,
    "semana": "Semana 2"
  },
  {
    "id": "y0Gltydakr4EXkHdP88B",
    "lojaNome": "SPBA - HORTO FLORESTAL",
    "data": "2026-05-13",
    "realizada": "SIM",
    "motivo": "Auditoria Concluída",
    "auditor": "Bruna Costa",
    "nTentativa": 1,
    "semana": "Semana 2"
  },
  {
    "id": "iyB0yGmWUQARdQc5QKVb",
    "lojaNome": "SPBA - PRAIA DO FORTE",
    "data": "2026-05-13",
    "realizada": "SIM",
    "motivo": "Auditoria Concluída",
    "auditor": "Bruna Costa",
    "nTentativa": 1,
    "semana": "Semana 2"
  },
  {
    "id": "U7uRJHCdXMv9eneMbl48",
    "lojaNome": "SPMT - SHOPPING PANTANAL",
    "data": "2026-05-13",
    "realizada": "SIM",
    "motivo": "Auditoria Concluída",
    "auditor": "Bruna Costa",
    "nTentativa": 2,
    "semana": "Semana 2"
  },
  {
    "id": "RAffG7uVesP9FRvNFLJF",
    "lojaNome": "SPMT - SHOPPING PANTANAL",
    "data": "2026-05-13",
    "realizada": "NÃO",
    "motivo": "LOJA NÃO ATENDEU A LIGAÇÃO",
    "auditor": "Bruna Costa",
    "nTentativa": 1,
    "semana": "Semana 2"
  },
  {
    "id": "6wKsOpCLWAE2rsRfXTw8",
    "lojaNome": "SPPI - DOM SEVERINO",
    "data": "2026-05-13",
    "realizada": "SIM",
    "motivo": "Auditoria Concluída",
    "auditor": "Fernanda Teles",
    "nTentativa": 1,
    "semana": "Semana 2"
  },
  {
    "id": "2YhA4YNMs5WRPl5IbwzC",
    "lojaNome": "SPPI - SHOPPING RIVERSIDE",
    "data": "2026-05-13",
    "realizada": "SIM",
    "motivo": "Auditoria Concluída",
    "auditor": "Bruna Costa",
    "nTentativa": 1,
    "semana": "Semana 2"
  },
  {
    "id": "wS02kk10nTk7Qc9rd9PE",
    "lojaNome": "SPPB - SHOPPING MANAIRA",
    "data": "2026-05-12",
    "realizada": "SIM",
    "motivo": "Auditoria Concluída",
    "auditor": "Bruna Costa",
    "nTentativa": 1,
    "semana": "Semana 2"
  },
  {
    "id": "ijUYyB4gLcG0dT80d8Mc",
    "lojaNome": "SPBA - AEROPORTO LOJA",
    "data": "2026-05-12",
    "realizada": "SIM",
    "motivo": "Auditoria Concluída",
    "auditor": "Fernanda Teles",
    "nTentativa": 1,
    "semana": "Semana 2"
  },
  {
    "id": "gQpvUAlMHUcvp002Dbj2",
    "lojaNome": "SPBA - SHOPPING PARALELA",
    "data": "2026-05-12",
    "realizada": "NÃO",
    "motivo": "LOJA NÃO ATENDEU A LIGAÇÃO",
    "auditor": "Fernanda Teles",
    "nTentativa": 1,
    "semana": "Semana 2"
  },
  {
    "id": "YyEY2jHpH0jHBT6tiUqO",
    "lojaNome": "SPCE - OUTLET FORTALEZA",
    "data": "2026-05-12",
    "realizada": "NÃO",
    "motivo": "LOJA NÃO ATENDEU A LIGAÇÃO",
    "auditor": "Fernanda Teles",
    "nTentativa": 1,
    "semana": "Semana 2"
  },
  {
    "id": "VCgBc0umuUKUTizyJ5zJ",
    "lojaNome": "SPBA - PITUBA",
    "data": "2026-05-12",
    "realizada": "SIM",
    "motivo": "Auditoria Concluída",
    "auditor": "Fernanda Teles",
    "nTentativa": 1,
    "semana": "Semana 2"
  },
  {
    "id": "UR0XLoLY62BCU6e0Nn6v",
    "lojaNome": "SPCE 2 - PREA",
    "data": "2026-05-12",
    "realizada": "SIM",
    "motivo": "Auditoria Concluída",
    "auditor": "Fernanda Teles",
    "nTentativa": 1,
    "semana": "Semana 2"
  },
  {
    "id": "QAbJfrinLd7U5fjcO6GW",
    "lojaNome": "SPPB - CAMPINA GRANDE",
    "data": "2026-05-12",
    "realizada": "SIM",
    "motivo": "Auditoria Concluída",
    "auditor": "Fernanda Teles",
    "nTentativa": 1,
    "semana": "Semana 2"
  },
  {
    "id": "uhX3KuIlJA7CuDrts3dT",
    "lojaNome": "SPPE - CARUARU SHOPPING",
    "data": "2026-05-11",
    "realizada": "SIM",
    "motivo": "Auditoria Concluída",
    "auditor": "Fernanda Teles",
    "nTentativa": 1,
    "semana": "Semana 2"
  },
  {
    "id": "tVQhHzehixgDzrGi6nEX",
    "lojaNome": "SPAL - PARQUE SHOPPING MACEIO",
    "data": "2026-05-11",
    "realizada": "SIM",
    "motivo": "Auditoria Concluída",
    "auditor": "Bruna Costa",
    "nTentativa": 1,
    "semana": "Semana 2"
  },
  {
    "id": "nVF0VMd6iYyOLTRQFymh",
    "lojaNome": "SPAM - PONTA NEGRA",
    "data": "2026-05-11",
    "realizada": "SIM",
    "motivo": "Auditoria Concluída",
    "auditor": "Bruna Costa",
    "nTentativa": 1,
    "semana": "Semana 2"
  },
  {
    "id": "fP6mzI6UGe21G9hyd0fu",
    "lojaNome": "SPPA - PARQUE SHOPPING",
    "data": "2026-05-11",
    "realizada": "NÃO",
    "motivo": "LOJA NÃO ATENDEU A LIGAÇÃO",
    "auditor": "Bruna Costa",
    "nTentativa": 1,
    "semana": "Semana 2"
  },
  {
    "id": "efuI2KqzFCUce6HMGqPX",
    "lojaNome": "SPBA - AEROPORTO QUIOSQUE",
    "data": "2026-05-11",
    "realizada": "NÃO",
    "motivo": "LOJA NÃO ATENDEU A LIGAÇÃO",
    "auditor": "Fernanda Teles",
    "nTentativa": 1,
    "semana": "Semana 2"
  },
  {
    "id": "WwwSWj1mi5Y5oWVQaOqg",
    "lojaNome": "SPRN - NOVA PARNAMIRIM",
    "data": "2026-05-11",
    "realizada": "SIM",
    "motivo": "Auditoria Concluída",
    "auditor": "Fernanda Teles",
    "nTentativa": 1,
    "semana": "Semana 2"
  },
  {
    "id": "OIdkD0I31xQ3PkBvYwqa",
    "lojaNome": "SPSE - JARDINS",
    "data": "2026-05-11",
    "realizada": "SIM",
    "motivo": "Auditoria Concluída",
    "auditor": "Fernanda Teles",
    "nTentativa": 1,
    "semana": "Semana 2"
  },
  {
    "id": "MouUDVhG0rruNAQVxkK5",
    "lojaNome": "SPRN - MIDWAY",
    "data": "2026-05-11",
    "realizada": "SIM",
    "motivo": "Auditoria Concluída",
    "auditor": "Bruna Costa",
    "nTentativa": 1,
    "semana": "Semana 2"
  },
  {
    "id": "EPz4L0Gn7JEK4Xl1FsQ4",
    "lojaNome": "SPSP - SHOPPING PATIO PAULISTA",
    "data": "2026-05-11",
    "realizada": "NÃO",
    "motivo": "ESCALA ERRADA",
    "auditor": "Fernanda Teles",
    "nTentativa": 2,
    "semana": "Semana 2"
  },
  {
    "id": "7yA8s4AZxxklxPuypCz4",
    "lojaNome": "SPCE 3 - DABLIO MALL",
    "data": "2026-05-11",
    "realizada": "NÃO",
    "motivo": "ENCARREGADO NÃO ESTAVA EM LOJA",
    "auditor": "Bruna Costa",
    "nTentativa": 1,
    "semana": "Semana 2"
  },
  {
    "id": "5lfW1vX0xZRGCqkOx7Rn",
    "lojaNome": "SPPI - SHOPPING RIO POTY",
    "data": "2026-05-11",
    "realizada": "SIM",
    "motivo": "Auditoria Concluída",
    "auditor": "Fernanda Teles",
    "nTentativa": 1,
    "semana": "Semana 2"
  },
  {
    "id": "rCtIebBNu80OCGYovC5I",
    "lojaNome": "SPSP - SHOPPING PATIO PAULISTA",
    "data": "2026-05-08",
    "realizada": "NÃO",
    "motivo": "COLABORADOR SOZINHO EM LOJA",
    "auditor": "Fernanda Teles",
    "nTentativa": 1,
    "semana": "Semana 2"
  },
  {
    "id": "nnjOuD5ZKRnXQoY6Bnb6",
    "lojaNome": "SPPE - ORIGENS",
    "data": "2026-05-08",
    "realizada": "NÃO",
    "motivo": "LOJA NÃO ATENDEU A LIGAÇÃO",
    "auditor": "Fernanda Teles",
    "nTentativa": 1,
    "semana": "Semana 2"
  },
  {
    "id": "ZOt0aUjvnsaEa6fYP1zm",
    "lojaNome": "SPMA - SHOPPING SAO LUIS",
    "data": "2026-05-08",
    "realizada": "NÃO",
    "motivo": "ESCALA ERRADA",
    "auditor": "Bruna Costa",
    "nTentativa": 1,
    "semana": "Semana 2"
  },
  {
    "id": "T4qNZ4OQ236YcOlwxo2p",
    "lojaNome": "SPPE - BOA VIAGEM",
    "data": "2026-05-08",
    "realizada": "SIM",
    "motivo": "Auditoria Concluída",
    "auditor": "Fernanda Teles",
    "nTentativa": 1,
    "semana": "Semana 2"
  },
  {
    "id": "QnwToIWCZs7Y8d4dUeZx",
    "lojaNome": "SPPE - RUA AMELIA",
    "data": "2026-05-08",
    "realizada": "SIM",
    "motivo": "Auditoria Concluída",
    "auditor": "Fernanda Teles",
    "nTentativa": 1,
    "semana": "Semana 2"
  },
  {
    "id": "KHfzZcljczGJQI5z5Kqs",
    "lojaNome": "SPRN - NATAL SHOPPING",
    "data": "2026-05-08",
    "realizada": "NÃO",
    "motivo": "LOJA NÃO ATENDEU A LIGAÇÃO",
    "auditor": "Bruna Costa",
    "nTentativa": 1,
    "semana": "Semana 2"
  },
  {
    "id": "I4P48VYKL4CE6CDXOZXg",
    "lojaNome": "SPPA - SHOPPING BOULEVARD",
    "data": "2026-05-07",
    "realizada": "SIM",
    "motivo": "Auditoria Concluída",
    "auditor": "Fernanda Teles",
    "nTentativa": 1,
    "semana": "Semana 1"
  },
  {
    "id": "tboWXu8NxZVSDTrC6C2b",
    "lojaNome": "SPPA - UMARIZAL",
    "data": "2026-04-29",
    "realizada": "SIM",
    "motivo": "Auditoria Concluída",
    "auditor": "Bruna Costa",
    "nTentativa": 3,
    "semana": "Semana 4"
  },
  {
    "id": "eLAkbaxHIBXS9xT7ycNB",
    "lojaNome": "SPRN - MOSSORO",
    "data": "2026-04-29",
    "realizada": "SIM",
    "motivo": "Auditoria Concluída",
    "auditor": "Bruna Costa",
    "nTentativa": 3,
    "semana": "Semana 4"
  },
  {
    "id": "XwVm5qgtYQbLKSxEAOxE",
    "lojaNome": "SPCE - OUTLET FORTALEZA",
    "data": "2026-04-29",
    "realizada": "SIM",
    "motivo": "Auditoria Concluída",
    "auditor": "Bruna Costa",
    "nTentativa": 1,
    "semana": "Semana 4"
  },
  {
    "id": "SOMeM0KK8Oq7sdjywrXE",
    "lojaNome": "SPCE - BEIRA MAR LOJA",
    "data": "2026-04-29",
    "realizada": "SIM",
    "motivo": "Auditoria Concluída",
    "auditor": "Bruna Costa",
    "nTentativa": 1,
    "semana": "Semana 4"
  },
  {
    "id": "QtzXrO9QlK14EOPTIxiI",
    "lojaNome": "SPCE - FLORES",
    "data": "2026-04-29",
    "realizada": "SIM",
    "motivo": "Auditoria Concluída",
    "auditor": "Bruna Costa",
    "nTentativa": 1,
    "semana": "Semana 4"
  },
  {
    "id": "MB2zjExxbyttIJ2smQBq",
    "lojaNome": "SPCE - LOJA EUSEBIO",
    "data": "2026-04-29",
    "realizada": "SIM",
    "motivo": "Auditoria Concluída",
    "auditor": "Matheus Cosme",
    "nTentativa": 1,
    "semana": "Semana 4"
  },
  {
    "id": "DS18AhGlpqUPcDTB6msl",
    "lojaNome": "SPCE - BEIRA MAR QUIOSQUE",
    "data": "2026-04-29",
    "realizada": "SIM",
    "motivo": "Auditoria Concluída",
    "auditor": "Fernanda Teles",
    "nTentativa": 1,
    "semana": "Semana 4"
  },
  {
    "id": "B3ODLU5FNo4qFrspJTuQ",
    "lojaNome": "SPCE - DESEMBARGADOR MOREIRA",
    "data": "2026-04-29",
    "realizada": "SIM",
    "motivo": "Auditoria Concluída",
    "auditor": "Fernanda Teles",
    "nTentativa": 1,
    "semana": "Semana 4"
  },
  {
    "id": "0xBDJIaRc6ohaqvarvx5",
    "lojaNome": "SPCE - AQUIRAZ",
    "data": "2026-04-29",
    "realizada": "SIM",
    "motivo": "Auditoria Concluída",
    "auditor": "Matheus Cosme",
    "nTentativa": 1,
    "semana": "Semana 4"
  },
  {
    "id": "qh3wcJoaw80Mx8yuPrMH",
    "lojaNome": "SPBA - SHOPPING SALVADOR",
    "data": "2026-04-28",
    "realizada": "SIM",
    "motivo": "Auditoria Concluída",
    "auditor": "Fernanda Teles",
    "nTentativa": 3,
    "semana": "Semana 4"
  },
  {
    "id": "oieU0xZ4BwXzeni6b1kr",
    "lojaNome": "SPCE - AEROPORTO LOJA",
    "data": "2026-04-28",
    "realizada": "SIM",
    "motivo": "Auditoria Concluída",
    "auditor": "Fernanda Teles",
    "nTentativa": 1,
    "semana": "Semana 4"
  },
  {
    "id": "oXUPUb3JVysCGe5Idpfz",
    "lojaNome": "SPSP - SHOPPING ELDORADO",
    "data": "2026-04-28",
    "realizada": "SIM",
    "motivo": "Auditoria Concluída",
    "auditor": "Fernanda Teles",
    "nTentativa": 3,
    "semana": "Semana 4"
  },
  {
    "id": "UClwob4GYVcvXV3wqsr0",
    "lojaNome": "SPSE - ARACAJU",
    "data": "2026-04-28",
    "realizada": "SIM",
    "motivo": "Auditoria Concluída",
    "auditor": "Fernanda Teles",
    "nTentativa": 3,
    "semana": "Semana 4"
  },
  {
    "id": "zfQMmiUyQH0UbeFAlGYS",
    "lojaNome": "SPBA - PITUBA",
    "data": "2026-04-27",
    "realizada": "SIM",
    "motivo": "Auditoria Concluída",
    "auditor": "Bruna Costa",
    "nTentativa": 3,
    "semana": "Semana 4"
  },
  {
    "id": "wn9DDJvQiPcHSh7nWXQk",
    "lojaNome": "SPCE - SHOPPING IGUATEMI",
    "data": "2026-04-27",
    "realizada": "SIM",
    "motivo": "Auditoria Concluída",
    "auditor": "Fernanda Teles",
    "nTentativa": 1,
    "semana": "Semana 4"
  },
  {
    "id": "vSEKLV5JLSq2Zacq0tWx",
    "lojaNome": "SPCE - RIO MAR FORTALEZA",
    "data": "2026-04-27",
    "realizada": "SIM",
    "motivo": "Auditoria Concluída",
    "auditor": "Fernanda Teles",
    "nTentativa": 1,
    "semana": "Semana 4"
  },
  {
    "id": "tYyo7gR6vZfPZh4iPdPQ",
    "lojaNome": "SPPA - UMARIZAL",
    "data": "2026-04-27",
    "realizada": "NÃO",
    "motivo": "LOJA NÃO ATENDEU A LIGAÇÃO",
    "auditor": "Bruna Costa",
    "nTentativa": 2,
    "semana": "Semana 4"
  },
  {
    "id": "nx3v9rVcKFdh6zwbJjHV",
    "lojaNome": "SPCE - ANA BILHAR",
    "data": "2026-04-27",
    "realizada": "SIM",
    "motivo": "Auditoria Concluída",
    "auditor": "Fernanda Teles",
    "nTentativa": 1,
    "semana": "Semana 4"
  },
  {
    "id": "MloktvNnt2egpFohyjzP",
    "lojaNome": "SPBA - SHOPPING PARALELA",
    "data": "2026-04-27",
    "realizada": "SIM",
    "motivo": "Auditoria Concluída",
    "auditor": "Bruna Costa",
    "nTentativa": 2,
    "semana": "Semana 4"
  },
  {
    "id": "M5jR1b3E8K7XNElQ3DDA",
    "lojaNome": "SPBA - SHOPPING DA BAHIA",
    "data": "2026-04-27",
    "realizada": "SIM",
    "motivo": "Auditoria Concluída",
    "auditor": "Bruna Costa",
    "nTentativa": 3,
    "semana": "Semana 4"
  },
  {
    "id": "DJJ4jaZeZcY8XBJq7fny",
    "lojaNome": "SPCE - LOJA SUL",
    "data": "2026-04-27",
    "realizada": "SIM",
    "motivo": "Auditoria Concluída",
    "auditor": "Fernanda Teles",
    "nTentativa": 1,
    "semana": "Semana 4"
  },
  {
    "id": "CBFhu6qkBwLEre67WOvY",
    "lojaNome": "SPMT - ESTACAO CUIABA",
    "data": "2026-04-27",
    "realizada": "SIM",
    "motivo": "Auditoria Concluída",
    "auditor": "Bruna Costa",
    "nTentativa": 3,
    "semana": "Semana 4"
  },
  {
    "id": "xSN4xD3FkFNdRsF5c8PR",
    "lojaNome": "SPCE 2 - JERICOACOARA",
    "data": "2026-04-24",
    "realizada": "SIM",
    "motivo": "Auditoria Concluída",
    "auditor": "Bruna Costa",
    "nTentativa": 1,
    "semana": "Semana 4"
  },
  {
    "id": "gA6jehbtuAuICZQCE4Cv",
    "lojaNome": "SPSP - SHOPPING ELDORADO",
    "data": "2026-04-24",
    "realizada": "NÃO",
    "motivo": "ENCARREGADO NÃO ESTAVA EM LOJA",
    "auditor": "Fernanda Teles",
    "nTentativa": 2,
    "semana": "Semana 4"
  },
  {
    "id": "cUwahbMN1d3Iq4eyBgp3",
    "lojaNome": "SPBA - PITUBA",
    "data": "2026-04-24",
    "realizada": "NÃO",
    "motivo": "ENCARREGADO NÃO ESTAVA EM LOJA",
    "auditor": "Bruna Costa",
    "nTentativa": 2,
    "semana": "Semana 4"
  },
  {
    "id": "bYtvKiSNWMgKGvkHk70U",
    "lojaNome": "SPSE - ARACAJU",
    "data": "2026-04-24",
    "realizada": "NÃO",
    "motivo": "LOJA NÃO ATENDEU A LIGAÇÃO",
    "auditor": "Fernanda Teles",
    "nTentativa": 2,
    "semana": "Semana 4"
  },
  {
    "id": "TXBz2xs2rNsKcfkk5cX0",
    "lojaNome": "SPBA - SHOPPING DA BAHIA",
    "data": "2026-04-24",
    "realizada": "NÃO",
    "motivo": "LOJA NÃO ATENDEU A LIGAÇÃO",
    "auditor": "Bruna Costa",
    "nTentativa": 2,
    "semana": "Semana 4"
  },
  {
    "id": "OFyyuH3OMYPknqLDb8aT",
    "lojaNome": "SPCE 2 - SOBRAL",
    "data": "2026-04-24",
    "realizada": "SIM",
    "motivo": "Auditoria Concluída",
    "auditor": "Fernanda Teles",
    "nTentativa": 2,
    "semana": "Semana 4"
  },
  {
    "id": "J7kTbhV4kF7endeHU50v",
    "lojaNome": "SPPE - ORIGENS",
    "data": "2026-04-24",
    "realizada": "SIM",
    "motivo": "Auditoria Concluída",
    "auditor": "Bruna Costa",
    "nTentativa": 2,
    "semana": "Semana 4"
  },
  {
    "id": "DzL6gSmQHX89xWa714vk",
    "lojaNome": "SPBA - AEROPORTO QUIOSQUE",
    "data": "2026-04-24",
    "realizada": "SIM",
    "motivo": "Auditoria Concluída",
    "auditor": "Bruna Costa",
    "nTentativa": 1,
    "semana": "Semana 4"
  },
  {
    "id": "DQbz2ttycTcDaqqLmcAD",
    "lojaNome": "SPBA - AEROPORTO LOJA",
    "data": "2026-04-24",
    "realizada": "SIM",
    "motivo": "Auditoria Concluída",
    "auditor": "Bruna Costa",
    "nTentativa": 3,
    "semana": "Semana 4"
  },
  {
    "id": "CpCX5tMQ48ELNhHKst8W",
    "lojaNome": "SPPE - SHOPPING RECIFE",
    "data": "2026-04-24",
    "realizada": "SIM",
    "motivo": "Auditoria Concluída",
    "auditor": "Bruna Costa",
    "nTentativa": 2,
    "semana": "Semana 4"
  },
  {
    "id": "BD3YTzYAmmYqZY4G3gHL",
    "lojaNome": "SPRN - LAGOA MALL",
    "data": "2026-04-24",
    "realizada": "SIM",
    "motivo": "Auditoria Concluída",
    "auditor": "Fernanda Teles",
    "nTentativa": 1,
    "semana": "Semana 4"
  },
  {
    "id": "8XDSBzREMm5PzrhGVUZy",
    "lojaNome": "SPCE - RIO MAR KENNEDY",
    "data": "2026-04-24",
    "realizada": "SIM",
    "motivo": "Auditoria Concluída",
    "auditor": "Bruna Costa",
    "nTentativa": 1,
    "semana": "Semana 4"
  },
  {
    "id": "w7q3rcKvku0YFI9qqx2D",
    "lojaNome": "SPCE 2 - ICARAI DE AMONTADA",
    "data": "2026-04-23",
    "realizada": "SIM",
    "motivo": "Auditoria Concluída",
    "auditor": "Fernanda Teles",
    "nTentativa": 2,
    "semana": "Semana 4"
  },
  {
    "id": "Iu9jf5B5ZvcZeMUz4o6o",
    "lojaNome": "SPBA - SHOPPING SALVADOR",
    "data": "2026-04-23",
    "realizada": "NÃO",
    "motivo": "COLABORADOR NA REUNIÃO DE ENCARREGADOS",
    "auditor": "Fernanda Teles",
    "nTentativa": 2,
    "semana": "Semana 4"
  },
  {
    "id": "zvGBNrfKA5cQ4H6O169K",
    "lojaNome": "SPSP - SHOPPING ELDORADO",
    "data": "2026-04-22",
    "realizada": "NÃO",
    "motivo": "ESCALA ERRADA",
    "auditor": "Fernanda Teles",
    "nTentativa": 1,
    "semana": "Semana 4"
  },
  {
    "id": "tRD0Wgiusjboe1y08iTh",
    "lojaNome": "SPSE - ARACAJU",
    "data": "2026-04-22",
    "realizada": "NÃO",
    "motivo": "ENCARREGADO NÃO ESTAVA EM LOJA",
    "auditor": "Fernanda Teles",
    "nTentativa": 1,
    "semana": "Semana 4"
  },
  {
    "id": "sz0ZsTFcOPJWbypX0eNe",
    "lojaNome": "SPPA - PARQUE SHOPPING",
    "data": "2026-04-22",
    "realizada": "SIM",
    "motivo": "Auditoria Concluída",
    "auditor": "Fernanda Teles",
    "nTentativa": 2,
    "semana": "Semana 4"
  },
  {
    "id": "ff0VdMvnAkf1Slpk4KIC",
    "lojaNome": "SPCE 2 - SOBRAL",
    "data": "2026-04-22",
    "realizada": "NÃO",
    "motivo": "LOJA EM OBRA/MANUTENÇÃO",
    "auditor": "Fernanda Teles",
    "nTentativa": 1,
    "semana": "Semana 4"
  },
  {
    "id": "dq3PRwV4Rv3AgnFClXOc",
    "lojaNome": "SPCE - AEROPORTO QUIOSQUE",
    "data": "2026-04-22",
    "realizada": "SIM",
    "motivo": "Auditoria Concluída",
    "auditor": "Bruna Costa",
    "nTentativa": 1,
    "semana": "Semana 4"
  },
  {
    "id": "Xrqn709RQq2bMECE1npO",
    "lojaNome": "SPCE - FATIMA",
    "data": "2026-04-22",
    "realizada": "SIM",
    "motivo": "Auditoria Concluída",
    "auditor": "Bruna Costa",
    "nTentativa": 1,
    "semana": "Semana 4"
  },
  {
    "id": "VzYQQXJDnx7GeWzVTO1s",
    "lojaNome": "SPCE 2 - ICARAI DE AMONTADA",
    "data": "2026-04-22",
    "realizada": "NÃO",
    "motivo": "COLABORADOR SOZINHO EM LOJA",
    "auditor": "Fernanda Teles",
    "nTentativa": 1,
    "semana": "Semana 4"
  },
  {
    "id": "Qa4qkHgNOsN7Zu4GGhbC",
    "lojaNome": "SPBA - SHOPPING SALVADOR",
    "data": "2026-04-22",
    "realizada": "NÃO",
    "motivo": "LOJA NÃO ATENDEU A LIGAÇÃO",
    "auditor": "Fernanda Teles",
    "nTentativa": 1,
    "semana": "Semana 4"
  },
  {
    "id": "ExbmrkP6yPcBLWZKhReL",
    "lojaNome": "SPCE 2 - PREA",
    "data": "2026-04-22",
    "realizada": "SIM",
    "motivo": "Auditoria Concluída",
    "auditor": "Bruna Costa",
    "nTentativa": 3,
    "semana": "Semana 4"
  },
  {
    "id": "740uBojBiQweosdnpiGO",
    "lojaNome": "SPCE - PARANGABA",
    "data": "2026-04-22",
    "realizada": "SIM",
    "motivo": "Auditoria Concluída",
    "auditor": "Bruna Costa",
    "nTentativa": 1,
    "semana": "Semana 4"
  },
  {
    "id": "zKbXcR0iOUQ7SQvyKbRx",
    "lojaNome": "SPCE 2 - PREA",
    "data": "2026-04-20",
    "realizada": "NÃO",
    "motivo": "LOJA NÃO ATENDEU A LIGAÇÃO",
    "auditor": "Bruna Costa",
    "nTentativa": 2,
    "semana": "Semana 3"
  },
  {
    "id": "oCWh6luvQGdgGEdGvQom",
    "lojaNome": "SPMT - ESTACAO CUIABA",
    "data": "2026-04-20",
    "realizada": "NÃO",
    "motivo": "LOJA NÃO ATENDEU A LIGAÇÃO",
    "auditor": "Bruna Costa",
    "nTentativa": 2,
    "semana": "Semana 3"
  },
  {
    "id": "mZdkoNY9WXihQOEKQCHN",
    "lojaNome": "SPPE - SHOPPING TACARUNA",
    "data": "2026-04-20",
    "realizada": "SIM",
    "motivo": "Auditoria Concluída",
    "auditor": "Fernanda Teles",
    "nTentativa": 2,
    "semana": "Semana 3"
  },
  {
    "id": "mJMe27wXsKj9gktOWCcj",
    "lojaNome": "SPCE 2 - JERICOACOARA",
    "data": "2026-04-20",
    "realizada": "NÃO",
    "motivo": "COLABORADOR NO INTERVALO",
    "auditor": "Bruna Costa",
    "nTentativa": 1,
    "semana": "Semana 3"
  },
  {
    "id": "jD6s9gWwU41H45YurR5Y",
    "lojaNome": "SPSP - SHOPPING PATIO PAULISTA",
    "data": "2026-04-20",
    "realizada": "SIM",
    "motivo": "Auditoria Concluída",
    "auditor": "Bruna Costa",
    "nTentativa": 2,
    "semana": "Semana 3"
  },
  {
    "id": "hKwmjsffkM8duKPLlfVw",
    "lojaNome": "SPPE - CARUARU SHOPPING",
    "data": "2026-04-20",
    "realizada": "SIM",
    "motivo": "Auditoria Concluída",
    "auditor": "Bruna Costa",
    "nTentativa": 1,
    "semana": "Semana 3"
  },
  {
    "id": "cpJwYJjitxTEhW0GwVeF",
    "lojaNome": "SPPA - SHOPPING GRAO PARA",
    "data": "2026-04-20",
    "realizada": "SIM",
    "motivo": "Auditoria Concluída",
    "auditor": "Fernanda Teles",
    "nTentativa": 2,
    "semana": "Semana 3"
  },
  {
    "id": "bPEr1bX2bHterogHTSd0",
    "lojaNome": "SPPA - UMARIZAL",
    "data": "2026-04-20",
    "realizada": "NÃO",
    "motivo": "LOJA NÃO ATENDEU A LIGAÇÃO",
    "auditor": "Bruna Costa",
    "nTentativa": 1,
    "semana": "Semana 3"
  },
  {
    "id": "ZTcHqVezbcE7stijtMNg",
    "lojaNome": "SPBA - PITUBA",
    "data": "2026-04-20",
    "realizada": "NÃO",
    "motivo": "ENCARREGADO NÃO ESTAVA EM LOJA",
    "auditor": "Bruna Costa",
    "nTentativa": 1,
    "semana": "Semana 3"
  },
  {
    "id": "TupYxKuyc2EDJRlc4Ync",
    "lojaNome": "SPPE - BOA VIAGEM",
    "data": "2026-04-20",
    "realizada": "SIM",
    "motivo": "Auditoria Concluída",
    "auditor": "Bruna Costa",
    "nTentativa": 2,
    "semana": "Semana 3"
  },
  {
    "id": "QKyODvIEVNyTNS9qINV4",
    "lojaNome": "SPPE - MAURICIO DE NASSAU",
    "data": "2026-04-20",
    "realizada": "SIM",
    "motivo": "Auditoria Concluída",
    "auditor": "Fernanda Teles",
    "nTentativa": 1,
    "semana": "Semana 3"
  },
  {
    "id": "O8bz2F4bYMuE9dEJO8wn",
    "lojaNome": "SPSE - JARDINS",
    "data": "2026-04-20",
    "realizada": "SIM",
    "motivo": "Auditoria Concluída",
    "auditor": "Bruna Costa",
    "nTentativa": 2,
    "semana": "Semana 3"
  },
  {
    "id": "LEOpsUnona0AvaFRfazW",
    "lojaNome": "SPPE - SHOPPING PATTEO OLINDA",
    "data": "2026-04-20",
    "realizada": "SIM",
    "motivo": "Auditoria Concluída",
    "auditor": "Fernanda Teles",
    "nTentativa": 2,
    "semana": "Semana 3"
  },
  {
    "id": "7kLZzVcTjgfGDk9UWVbm",
    "lojaNome": "SPPE - BOA VIAGEM",
    "data": "2026-04-20",
    "realizada": "NÃO",
    "motivo": "LOJA NÃO ATENDEU A LIGAÇÃO",
    "auditor": "Bruna Costa",
    "nTentativa": 1,
    "semana": "Semana 3"
  },
  {
    "id": "4EuicNUrN92i4gkkuwEg",
    "lojaNome": "SPBA - VILLAS",
    "data": "2026-04-20",
    "realizada": "SIM",
    "motivo": "Auditoria Concluída",
    "auditor": "Fernanda Teles",
    "nTentativa": 1,
    "semana": "Semana 3"
  },
  {
    "id": "0o5ugLdxJgKM1qVqwoQj",
    "lojaNome": "SPAM - VIEIRALVES",
    "data": "2026-04-20",
    "realizada": "SIM",
    "motivo": "Auditoria Concluída",
    "auditor": "Fernanda Teles",
    "nTentativa": 2,
    "semana": "Semana 3"
  },
  {
    "id": "v0i2PKUSXKl9Jy3mWh3P",
    "lojaNome": "SPPB - SHOPPING MANAIRA",
    "data": "2026-04-17",
    "realizada": "SIM",
    "motivo": "Auditoria Concluída",
    "auditor": "Fernanda Teles",
    "nTentativa": 1,
    "semana": "Semana 3"
  },
  {
    "id": "smT8KHpDIBGlh20lcJxA",
    "lojaNome": "SPPE - SHOPPING TACARUNA",
    "data": "2026-04-17",
    "realizada": "NÃO",
    "motivo": "ESCALA ERRADA",
    "auditor": "Fernanda Teles",
    "nTentativa": 1,
    "semana": "Semana 3"
  },
  {
    "id": "m2x2ybr7aatXzaTPvU3u",
    "lojaNome": "SPAM - VIEIRALVES",
    "data": "2026-04-17",
    "realizada": "NÃO",
    "motivo": "ENCARREGADO NÃO ESTAVA EM LOJA",
    "auditor": "Fernanda Teles",
    "nTentativa": 1,
    "semana": "Semana 3"
  },
  {
    "id": "a2QXhf4d8DjE3SphKWfb",
    "lojaNome": "SPBA - SHOPPING DA BAHIA",
    "data": "2026-04-17",
    "realizada": "NÃO",
    "motivo": "LOJA NÃO ATENDEU A LIGAÇÃO",
    "auditor": "Bruna Costa",
    "nTentativa": 1,
    "semana": "Semana 3"
  },
  {
    "id": "XRYYiK0IWzNaMHChDWNP",
    "lojaNome": "SPPE - RIO MAR RECIFE",
    "data": "2026-04-17",
    "realizada": "SIM",
    "motivo": "Auditoria Concluída",
    "auditor": "Fernanda Teles",
    "nTentativa": 1,
    "semana": "Semana 3"
  },
  {
    "id": "X6h1hpJr0PSambE2pKX6",
    "lojaNome": "SPPB - CAMPINA GRANDE",
    "data": "2026-04-17",
    "realizada": "SIM",
    "motivo": "Auditoria Concluída",
    "auditor": "Bruna Costa",
    "nTentativa": 2,
    "semana": "Semana 3"
  },
  {
    "id": "Sp0KbKTNpNa4NPhjUjrf",
    "lojaNome": "SPPE - ORIGENS",
    "data": "2026-04-17",
    "realizada": "NÃO",
    "motivo": "ENCARREGADO NÃO ESTAVA EM LOJA",
    "auditor": "Bruna Costa",
    "nTentativa": 1,
    "semana": "Semana 3"
  },
  {
    "id": "S95v6CGFhXAylniRMOwu",
    "lojaNome": "SPMA - SHOPPING DA ILHA",
    "data": "2026-04-17",
    "realizada": "SIM",
    "motivo": "Auditoria Concluída",
    "auditor": "Bruna Costa",
    "nTentativa": 2,
    "semana": "Semana 3"
  },
  {
    "id": "RqgNTYvaRE8ORPu01IUL",
    "lojaNome": "SPPE - SHOPPING PATTEO OLINDA",
    "data": "2026-04-17",
    "realizada": "NÃO",
    "motivo": "LOJA NÃO ATENDEU A LIGAÇÃO",
    "auditor": "Fernanda Teles",
    "nTentativa": 1,
    "semana": "Semana 3"
  },
  {
    "id": "Looxy8qgjmuSgCzus41x",
    "lojaNome": "SPSE - JARDINS",
    "data": "2026-04-17",
    "realizada": "NÃO",
    "motivo": "COLABORADOR SOZINHO EM LOJA",
    "auditor": "Bruna Costa",
    "nTentativa": 1,
    "semana": "Semana 3"
  },
  {
    "id": "DvgwlFZFHCP4iky4p5ve",
    "lojaNome": "SPSP - SHOPPING PATIO PAULISTA",
    "data": "2026-04-17",
    "realizada": "NÃO",
    "motivo": "LOJA NÃO ATENDEU A LIGAÇÃO",
    "auditor": "Bruna Costa",
    "nTentativa": 1,
    "semana": "Semana 3"
  },
  {
    "id": "BNkx99SgOLQTTtitBdj5",
    "lojaNome": "SPPE - SHOPPING RECIFE",
    "data": "2026-04-17",
    "realizada": "NÃO",
    "motivo": "LOJA NÃO ATENDEU A LIGAÇÃO",
    "auditor": "Bruna Costa",
    "nTentativa": 1,
    "semana": "Semana 3"
  },
  {
    "id": "tk5fvzcopDLd3UO46kEH",
    "lojaNome": "SPRN - MOSSORO",
    "data": "2026-04-16",
    "realizada": "NÃO",
    "motivo": "LOJA NÃO ATENDEU A LIGAÇÃO",
    "auditor": "Bruna Costa",
    "nTentativa": 2,
    "semana": "Semana 3"
  },
  {
    "id": "lVHFBlKPLqTd8X1jVEg9",
    "lojaNome": "SPPI - SHOPPING RIVERSIDE",
    "data": "2026-04-16",
    "realizada": "SIM",
    "motivo": "Auditoria Concluída",
    "auditor": "Matheus Cosme",
    "nTentativa": 1,
    "semana": "Semana 3"
  },
  {
    "id": "I5pxhJrDyCZWEnm0u6hj",
    "lojaNome": "SPSP - SHOPPING CIDADE SAO PAULO",
    "data": "2026-04-16",
    "realizada": "SIM",
    "motivo": "Auditoria Concluída",
    "auditor": "Bruna Costa",
    "nTentativa": 2,
    "semana": "Semana 3"
  },
  {
    "id": "Bjub4wzKT8ebVsl6Xbkj",
    "lojaNome": "SPPE - SHOPPING GUARARAPES",
    "data": "2026-04-16",
    "realizada": "SIM",
    "motivo": "Auditoria Concluída",
    "auditor": "Fernanda Teles",
    "nTentativa": 1,
    "semana": "Semana 3"
  },
  {
    "id": "AorykdEMvqzoA615ToKg",
    "lojaNome": "SPPI - SHOPPING RIO POTY",
    "data": "2026-04-16",
    "realizada": "SIM",
    "motivo": "Auditoria Concluída",
    "auditor": "Matheus Cosme",
    "nTentativa": 1,
    "semana": "Semana 3"
  },
  {
    "id": "wieErTzyEHlDdaYMuP6h",
    "lojaNome": "SPPA - PARQUE SHOPPING",
    "data": "2026-04-15",
    "realizada": "NÃO",
    "motivo": "ENCARREGADO NÃO ESTAVA EM LOJA",
    "auditor": "Fernanda Teles",
    "nTentativa": 1,
    "semana": "Semana 3"
  },
  {
    "id": "u8bWYSZDuYObpOxo2ASl",
    "lojaNome": "SPPI - DOM SEVERINO",
    "data": "2026-04-15",
    "realizada": "SIM",
    "motivo": "Auditoria Concluída",
    "auditor": "Matheus Cosme",
    "nTentativa": 1,
    "semana": "Semana 3"
  },
  {
    "id": "dCsS2L8xin2UcnQz1YZE",
    "lojaNome": "SPBA - PRAIA DO FORTE",
    "data": "2026-04-15",
    "realizada": "SIM",
    "motivo": "Auditoria Concluída",
    "auditor": "Fernanda Teles",
    "nTentativa": 2,
    "semana": "Semana 3"
  },
  {
    "id": "cbvaBUiooa5LV9JDfSaN",
    "lojaNome": "SPBA - HORTO FLORESTAL",
    "data": "2026-04-15",
    "realizada": "SIM",
    "motivo": "Auditoria Concluída",
    "auditor": "Fernanda Teles",
    "nTentativa": 1,
    "semana": "Semana 3"
  },
  {
    "id": "WPMBcaRhwv370mR46dk2",
    "lojaNome": "SPPI - DIRCEU",
    "data": "2026-04-15",
    "realizada": "SIM",
    "motivo": "Auditoria Concluída",
    "auditor": "Matheus Cosme",
    "nTentativa": 1,
    "semana": "Semana 3"
  },
  {
    "id": "sT4tNpHkpNCEZbeoCYQT",
    "lojaNome": "SPMT - SHOPPING PANTANAL",
    "data": "2026-04-14",
    "realizada": "SIM",
    "motivo": "Auditoria Concluída",
    "auditor": "Fernanda Teles",
    "nTentativa": 1,
    "semana": "Semana 2"
  },
  {
    "id": "kMZGOTNHA03b51m8cB6H",
    "lojaNome": "SPCE 3 - DABLIO MALL",
    "data": "2026-04-14",
    "realizada": "SIM",
    "motivo": "Auditoria Concluída",
    "auditor": "Fernanda Teles",
    "nTentativa": 1,
    "semana": "Semana 2"
  },
  {
    "id": "hjI9guA8CrntsSP5wMxj",
    "lojaNome": "SPAM - PONTA NEGRA",
    "data": "2026-04-14",
    "realizada": "SIM",
    "motivo": "Auditoria Concluída",
    "auditor": "Fernanda Teles",
    "nTentativa": 1,
    "semana": "Semana 2"
  },
  {
    "id": "6zrBOPTOQX4SmPCEdKZB",
    "lojaNome": "SPPA - SHOPPING GRAO PARA",
    "data": "2026-04-14",
    "realizada": "NÃO",
    "motivo": "ENCARREGADO NÃO ATENDEU",
    "auditor": "Fernanda Teles",
    "nTentativa": 1,
    "semana": "Semana 2"
  },
  {
    "id": "qzj13dFmJIFK2WU9gUhd",
    "lojaNome": "SPPE - RUA AMELIA",
    "data": "2026-04-11",
    "realizada": "SIM",
    "motivo": "Auditoria Concluída",
    "auditor": "Bruna Costa",
    "nTentativa": 2,
    "semana": "Semana 2"
  },
  {
    "id": "PstMxLovkID2rZn4serd",
    "lojaNome": "SPPA - SHOPPING BOULEVARD",
    "data": "2026-04-11",
    "realizada": "SIM",
    "motivo": "Auditoria Concluída",
    "auditor": "Bruna Costa",
    "nTentativa": 1,
    "semana": "Semana 2"
  },
  {
    "id": "LL1VJD9VOTWR9QvXz3Rl",
    "lojaNome": "SPPE - RUA AMELIA",
    "data": "2026-04-11",
    "realizada": "NÃO",
    "motivo": "LOJA NÃO ATENDEU A LIGAÇÃO",
    "auditor": "Bruna Costa",
    "nTentativa": 1,
    "semana": "Semana 2"
  },
  {
    "id": "vrxp4AjzMkAVaTVzHTZl",
    "lojaNome": "SPBA - SHOPPING PARALELA",
    "data": "2026-04-10",
    "realizada": "NÃO",
    "motivo": "LOJA NÃO ATENDEU A LIGAÇÃO",
    "auditor": "Bruna Costa",
    "nTentativa": 1,
    "semana": "Semana 2"
  },
  {
    "id": "k6Id5DjnZxxJ5jt8SGYM",
    "lojaNome": "SPMA - SHOPPING DA ILHA",
    "data": "2026-04-10",
    "realizada": "NÃO",
    "motivo": "LOJA NÃO ATENDEU A LIGAÇÃO",
    "auditor": "Bruna Costa",
    "nTentativa": 1,
    "semana": "Semana 2"
  },
  {
    "id": "hoAaJBPp51REQnvLMS8U",
    "lojaNome": "SPRN - NOVA PARNAMIRIM",
    "data": "2026-04-10",
    "realizada": "SIM",
    "motivo": "Auditoria Concluída",
    "auditor": "Bruna Costa",
    "nTentativa": 1,
    "semana": "Semana 2"
  },
  {
    "id": "PmYIGC9lst5Jljqtvowo",
    "lojaNome": "SPAL - PARQUE SHOPPING MACEIO",
    "data": "2026-04-10",
    "realizada": "SIM",
    "motivo": "Auditoria Concluída",
    "auditor": "Fernanda Teles",
    "nTentativa": 1,
    "semana": "Semana 2"
  },
  {
    "id": "J1gtA9ZxptDOwkLRoC2v",
    "lojaNome": "SPCE 2 - PREA",
    "data": "2026-04-10",
    "realizada": "NÃO",
    "motivo": "LOJA NÃO ATENDEU A LIGAÇÃO",
    "auditor": "Bruna Costa",
    "nTentativa": 1,
    "semana": "Semana 2"
  },
  {
    "id": "Fvz3vRTdK6NG7jNHvaNz",
    "lojaNome": "SPMT - ESTACAO CUIABA",
    "data": "2026-04-10",
    "realizada": "NÃO",
    "motivo": "LOJA NÃO ATENDEU A LIGAÇÃO",
    "auditor": "Bruna Costa",
    "nTentativa": 1,
    "semana": "Semana 2"
  },
  {
    "id": "53tcbj3QYuqa2cgCf9LA",
    "lojaNome": "SPSP - SHOPPING CIDADE SAO PAULO",
    "data": "2026-04-10",
    "realizada": "NÃO",
    "motivo": "LOJA NÃO ATENDEU A LIGAÇÃO",
    "auditor": "Bruna Costa",
    "nTentativa": 1,
    "semana": "Semana 2"
  },
  {
    "id": "48KrJrFael782HLQuuYu",
    "lojaNome": "SPPB - CAMPINA GRANDE",
    "data": "2026-04-10",
    "realizada": "NÃO",
    "motivo": "LOJA NÃO ATENDEU A LIGAÇÃO",
    "auditor": "Bruna Costa",
    "nTentativa": 1,
    "semana": "Semana 2"
  },
  {
    "id": "DCz81pKTNxXIk9CGbNf5",
    "lojaNome": "SPMA - SHOPPING SAO LUIS",
    "data": "2026-04-09",
    "realizada": "SIM",
    "motivo": "Auditoria Concluída",
    "auditor": "Fernanda Teles",
    "nTentativa": 1,
    "semana": "Semana 2"
  },
  {
    "id": "tMggnZcN2WkaUzf9e2n0",
    "lojaNome": "SPBA - PRAIA DO FORTE",
    "data": "2026-04-08",
    "realizada": "NÃO",
    "motivo": "LOJA NÃO ATENDEU A LIGAÇÃO",
    "auditor": "Fernanda Teles",
    "nTentativa": 1,
    "semana": "Semana 2"
  },
  {
    "id": "slgQrYsuRCD5FOFy5Qog",
    "lojaNome": "SPRN - MOSSORO",
    "data": "2026-04-08",
    "realizada": "NÃO",
    "motivo": "LOJA NÃO ATENDEU A LIGAÇÃO",
    "auditor": "Bruna Costa",
    "nTentativa": 1,
    "semana": "Semana 2"
  },
  {
    "id": "sYYsiSfm7PzkGllk4lUZ",
    "lojaNome": "SPBA - AEROPORTO LOJA",
    "data": "2026-04-08",
    "realizada": "NÃO",
    "motivo": "LOJA NÃO ATENDEU A LIGAÇÃO",
    "auditor": "Bruna Costa",
    "nTentativa": 2,
    "semana": "Semana 2"
  },
  {
    "id": "kfLZDAGjZRdWVyiTuHPH",
    "lojaNome": "SPPE - ORIGENS",
    "data": "2026-04-08",
    "realizada": "SIM",
    "motivo": "Auditoria Concluída",
    "auditor": "Bruna Costa",
    "nTentativa": 1,
    "semana": "Semana 2"
  },
  {
    "id": "dbUpSv5YrUaePfS0XIpM",
    "lojaNome": "SPRN - MIDWAY",
    "data": "2026-04-08",
    "realizada": "SIM",
    "motivo": "Auditoria Concluída",
    "auditor": "Fernanda Teles",
    "nTentativa": 1,
    "semana": "Semana 2"
  },
  {
    "id": "LyiAWu4sUelQDfxSzGGu",
    "lojaNome": "SPCE 3 - JUAZEIRO DO NORTE",
    "data": "2026-04-08",
    "realizada": "SIM",
    "motivo": "Auditoria Concluída",
    "auditor": "Bruna Costa",
    "nTentativa": 1,
    "semana": "Semana 2"
  },
  {
    "id": "4XqySq7oz53vIFfSbqBW",
    "lojaNome": "SPBA - AEROPORTO LOJA",
    "data": "2026-04-08",
    "realizada": "NÃO",
    "motivo": "LOJA NÃO ATENDEU A LIGAÇÃO",
    "auditor": "Bruna Costa",
    "nTentativa": 1,
    "semana": "Semana 2"
  }
];
const REAL_BACKUP_TAREFAS = [
  {
    "id": "BW1odkF34YTexTVgutgI",
    "titulo": "Auditoria River",
    "descricao": "Auditoria River",
    "demandante": "Matheus Cosme",
    "prazo": "2026-03-31",
    "prioridade": "Média",
    "responsaveis": [
      "Matheus Cosme"
    ],
    "status": "CONCLUIDO",
    "link": "",
    "subtasks": []
  },
  {
    "id": "bNFXFVyQAZ6AMM7L70FX",
    "titulo": "Auditoria Dom",
    "descricao": "Auditoria Dom",
    "demandante": "Matheus Cosme",
    "prazo": "2026-03-31",
    "prioridade": "Alta",
    "responsaveis": [
      "Matheus Cosme"
    ],
    "status": "CONCLUIDO",
    "link": "",
    "subtasks": []
  },
  {
    "id": "jHAWhe2sFKLfy1qo1aSu",
    "titulo": "PBI : GG (feedbacks)",
    "descricao": "PBI : GG (feedbacks)",
    "demandante": "Matheus Cosme",
    "prazo": "2026-03-31",
    "prioridade": "Média",
    "responsaveis": [
      "Matheus Cosme"
    ],
    "status": "CONCLUIDO",
    "link": "",
    "subtasks": []
  },
  {
    "id": "WoXv1Yz0XHXxN0fa2SNO",
    "titulo": "Auditoria de BMQ",
    "descricao": "Auditoria de BMQ",
    "demandante": "Matheus Cosme",
    "prazo": "2026-03-31",
    "prioridade": "Alta",
    "responsaveis": [
      "Matheus Cosme"
    ],
    "status": "CONCLUIDO",
    "link": "",
    "subtasks": []
  },
  {
    "id": "Gx0Qi1Q7ybb0pceFGSFq",
    "titulo": "Checklist ORIGENS - PB",
    "descricao": "Checklist ORIGENS - PB",
    "demandante": "Matheus",
    "prazo": "2026-08-26",
    "prioridade": "Média",
    "responsaveis": [
      "Matheus Cosme"
    ],
    "status": "CONCLUIDO",
    "link": "",
    "subtasks": []
  },
  {
    "id": "j8w2p9hZIbvXwUmw9Q5w",
    "titulo": "Checklist Sobral",
    "descricao": "Checklist Sobral",
    "demandante": "Matheus",
    "prazo": "2026-08-26",
    "prioridade": "Alta",
    "responsaveis": [
      "Matheus Cosme"
    ],
    "status": "CONCLUIDO",
    "link": "",
    "subtasks": []
  },
  {
    "id": "MJ5VFuUKNvDmfmcEeFhl",
    "titulo": "Checklist Rio Mar Recife",
    "descricao": "Checklist Rio Mar Recife",
    "demandante": "Matheus",
    "prazo": "2026-08-27",
    "prioridade": "Média",
    "responsaveis": [
      "Matheus Cosme"
    ],
    "status": "CONCLUIDO",
    "link": "",
    "subtasks": []
  },
  {
    "id": "IDsv1q2ziv8D4MRm9pOC",
    "titulo": "Checklist Campina Grande",
    "descricao": "Checklist Campina Grande",
    "demandante": "Matheus",
    "prazo": "2026-08-27",
    "prioridade": "Alta",
    "responsaveis": [
      "Matheus Cosme"
    ],
    "status": "CONCLUIDO",
    "link": "",
    "subtasks": []
  },
  {
    "id": "mF9rDGbB9EqxXyhxhPcD",
    "titulo": "Checklist GUARARAPES",
    "descricao": "Checklist GUARARAPES",
    "demandante": "Matheus",
    "prazo": "2026-08-27",
    "prioridade": "Média",
    "responsaveis": [
      "Matheus Cosme"
    ],
    "status": "CONCLUIDO",
    "link": "",
    "subtasks": []
  },
  {
    "id": "LbBWDm4uy2yNj8ngWJLC",
    "titulo": "Checklist Grao para",
    "descricao": "Checklist Grao para",
    "demandante": "Matheus",
    "prazo": "2026-09-26",
    "prioridade": "Alta",
    "responsaveis": [
      "Matheus Cosme"
    ],
    "status": "CONCLUIDO",
    "link": "",
    "subtasks": []
  },
  {
    "id": "aBo4pEE8PIiGqZrpvxcQ",
    "titulo": "Auditar Pernambuco",
    "descricao": "Auditar Pernambuco",
    "demandante": "Jacyntho",
    "prazo": "2026-03-09",
    "prioridade": "Média",
    "responsaveis": [
      "Cosme"
    ],
    "status": "CONCLUIDO",
    "link": "",
    "subtasks": []
  },
  {
    "id": "NkvKgDiZ1VJ9hhbl9umB",
    "titulo": "Treinar novos Estagiários",
    "descricao": "Treinar novos Estagiários",
    "demandante": "Pimentel",
    "prazo": "2026-03-16",
    "prioridade": "Alta",
    "responsaveis": [
      "Cosme"
    ],
    "status": "CONCLUIDO",
    "link": "",
    "subtasks": []
  }
];
const REAL_BACKUP_USUARIOS = [
  {
    "id": "zelG1C8z1k07texnZqR6",
    "nome": "Ana Raquel",
    "cargo": "Auditor",
    "meta": 24
  },
  {
    "id": "2iaKTYCEoIXIYRU9b8C8",
    "nome": "Bruna Costa",
    "cargo": "Auditor",
    "meta": 24
  },
  {
    "id": "cM4YSWSlBwBwiH9de5TW",
    "nome": "Matheus Cosme",
    "cargo": "Auditor",
    "meta": 24
  }
];

const state = {
  currentTab: 'home',
  activeTab: 'home',
  filterStatus: 'TODOS',
  dashFilterStatus: 'TODOS',
  dateFilterMode: 'MES',
  filtroApenasCriticas: false,
  mapFilterCriticas: false,
  kanbanFilterMode: 'TODOS',
  activeDemandaId: null,
  usuarios: REAL_BACKUP_USUARIOS,
  planejamento: [],
  mapeamento: [],
  tarefas: [],
  currentDemandaResp: [],
  charts: {}
};

if (typeof window !== 'undefined') {
  window.state = state;
}

let subtarefasCriacaoTemp = [];
let chartSemanal = null;
let chartAuditorRosca = null;
let chartCausas = null;
let chartReg = null;

// ============================================================
// 🚀 INICIALIZAÇÃO DO SISTEMA
// ============================================================

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  carregarDadosLocais();
  normalizarUsuarios();
  popularSelectsUsuarios();
  populateDropdowns();

  const hoje = new Date();
  const mesAtual = hoje.getFullYear() + '-' + String(hoje.getMonth() + 1).padStart(2, '0');
  
  const planMonth = document.getElementById('plan-filter-month');
  if (planMonth && !planMonth.value) planMonth.value = mesAtual;
  
  const mapMonth = document.getElementById('map-filter-month');
  if (mapMonth && !mapMonth.value) mapMonth.value = mesAtual;

  const dashMonth = document.getElementById('dash-filter-month');
  if (dashMonth && !dashMonth.value) dashMonth.value = mesAtual;

  verificarSessaoAtiva();

  if (typeof window.initFirebase === 'function') {
    window.initFirebase();
  }
});

// ============================================================
// 🎨 TEMA (DARK / LIGHT) & UTILITÁRIOS
// ============================================================

function initTheme() {
  const saved = localStorage.getItem('sp_theme') || 'light';
  document.documentElement.setAttribute('data-theme', saved);
  updateThemeIcon(saved);
}

function toggleTheme() {
  const cur = document.documentElement.getAttribute('data-theme');
  const next = cur === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', next);
  localStorage.setItem('sp_theme', next);
  updateThemeIcon(next);
  if (state.currentTab === 'dashboard') {
    renderDashboardCharts();
  }
}

function updateThemeIcon(theme) {
  const icon = document.getElementById('icon-theme');
  if (icon) icon.className = theme === 'dark' ? 'ph ph-sun' : 'ph ph-moon';
}

function formatDate(d) {
  if (!d) return '—';
  const p = d.split('-');
  if (p.length === 3) return `${p[2]}/${p[1]}/${p[0]}`;
  return d;
}

function showToast(msg, type = 'info') {
  const c = document.getElementById('toast-container');
  if (!c) return;
  const t = document.createElement('div');
  const bg = type === 'error' ? '#DA0D17' : (type === 'success' ? '#4F7043' : (type === 'warning' ? '#DA5513' : '#56331B'));
  t.style.cssText = `background:${bg};color:#fff;padding:12px 18px;border-radius:8px;font-size:0.82rem;font-weight:600;box-shadow:0 4px 12px rgba(0,0,0,0.25);opacity:0;transform:translateY(10px);transition:all 0.3s;font-family:var(--ff-body);`;
  t.textContent = msg;
  c.appendChild(t);
  setTimeout(() => { t.style.opacity = '1'; t.style.transform = 'translateY(0)'; }, 10);
  setTimeout(() => { t.style.opacity = '0'; setTimeout(() => t.remove(), 300); }, 3500);
}

// ============================================================
// 💾 PERSISTÊNCIA LOCAL (LOCALSTORAGE FALLBACK)
// ============================================================

function saveState(key, data) {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (e) {
    console.warn("Erro ao salvar no localStorage:", e);
  }
}

function salvarPlanejamento() { saveState('sp_hub_planejamento_v12', state.planejamento); }
function salvarMapeamento() { saveState('sp_hub_mapeamento_v12', state.mapeamento); }
function salvarTarefas() { saveState('sp_hub_tarefas_v12', state.tarefas); }
function salvarUsuarios() { saveState('sp_hub_usuarios_v12', state.usuarios); }

function carregarDadosLocais() {
  const planSaved = localStorage.getItem('sp_hub_planejamento_v12');
  if (planSaved) {
    try { state.planejamento = JSON.parse(planSaved); } catch(e) { state.planejamento = [...REAL_BACKUP_PLANEJAMENTO]; }
  } else {
    state.planejamento = [...REAL_BACKUP_PLANEJAMENTO];
    salvarPlanejamento();
  }

  const mapSaved = localStorage.getItem('sp_hub_mapeamento_v12');
  if (mapSaved) {
    try { state.mapeamento = JSON.parse(mapSaved); } catch(e) { state.mapeamento = [...REAL_BACKUP_MAPEAMENTO]; }
  } else {
    state.mapeamento = [...REAL_BACKUP_MAPEAMENTO];
    salvarMapeamento();
  }

  const tarSaved = localStorage.getItem('sp_hub_tarefas_v12');
  if (tarSaved) {
    try { state.tarefas = JSON.parse(tarSaved); } catch(e) { state.tarefas = [...REAL_BACKUP_TAREFAS]; }
  } else {
    state.tarefas = [...REAL_BACKUP_TAREFAS];
    salvarTarefas();
  }

  const usrSaved = localStorage.getItem('sp_hub_usuarios_v12');
  if (usrSaved) {
    try { state.usuarios = JSON.parse(usrSaved); } catch(e) { state.usuarios = [...REAL_BACKUP_USUARIOS]; }
  } else {
    state.usuarios = [...REAL_BACKUP_USUARIOS];
    salvarUsuarios();
  }
}

// ============================================================
// ☁️ FIREBASE FIRESTORE REAL-TIME CLOUD SYNC (MULTI-DEVICE)
// ============================================================

let unsubPlanejamento = null;
let unsubMapeamento = null;
let unsubTarefas = null;
let unsubUsuarios = null;


async function forcarSincronizacaoNuvem() {
  if (typeof db === 'undefined' || !db) {
    showToast("Firestore desconectado. Verifique a conexão.", "error");
    return;
  }

  showToast("Enviando e sincronizando todos os dados locais com o Firestore na Nuvem...", "info");

  try {
    // 1. Upload das 72 lojas do Planejamento
    const batchPlan = db.batch();
    (state.planejamento || []).forEach(p => {
      batchPlan.set(db.collection('auditoria_planejamento').doc(p.id), p);
    });
    await batchPlan.commit();

    // 2. Upload do Mapeamento
    const batchMap = db.batch();
    (state.mapeamento || []).slice(0, 100).forEach(m => {
      batchMap.set(db.collection('auditoria_mapeamento').doc(m.id), m);
    });
    await batchMap.commit();

    // 3. Upload das Tarefas da Equipe
    const batchTar = db.batch();
    (state.tarefas || []).forEach(t => {
      batchTar.set(db.collection('tarefas_equipe').doc(t.id), t);
    });
    await batchTar.commit();

    showToast("🎉 Dados sincronizados e publicados com SUCESSO no Firestore! Todos os computadores foram atualizados.", "success");
    
    // Recarrega os componentes visuais
    if (typeof renderPlanejamentoTable === 'function') renderPlanejamentoTable();
    if (typeof renderMapeamentoTable === 'function') renderMapeamentoTable();
    if (typeof renderDashboardCharts === 'function') renderDashboardCharts();
  } catch (e) {
    console.error("Erro no upload para Firestore:", e);
    showToast("Erro ao publicar na nuvem: " + e.message, "error");
  }
}


// ===========================================================================
//  SEMEADURA INICIAL — DESLIGADA
//
//  Cada listener abaixo tinha um ramo "se a colecao estiver vazia, popule com
//  os dados embutidos neste arquivo". Isso era perigoso por tres motivos:
//
//   1. O mapeamento embutido tem 100 dos 515 registros reais (slice(0, 100)
//      mais abaixo). Semear por cima de um banco recem-restaurado apagaria
//      415 registros e passaria a tratar a versao truncada como verdade.
//   2. O planejamento embutido e sintetico (ids PLAN_1..PLAN_72), sem
//      interseccao com os docIds reais do backup.
//   3. A colecao users agora guarda perfis de acesso indexados pelo uid do
//      Firebase Auth. Semear usr_1..usr_5 por cima disso quebra o login.
//
//  So ligue isto num projeto Firebase VAZIO e descartavel, para um teste.
//  Nunca contra o banco de producao.
// ===========================================================================
const SEED_INICIAL_HABILITADO = false;

function setupRealtimeCloudSync() {
  if (typeof db === 'undefined' || !db) {
    console.log("ℹ️ Firestore offline. Operando com dados locais.");
    return;
  }

  console.log("⚡ Configurando escutas em tempo real no Firestore (Multi-device Cloud Sync)...");

  // 1. SINCRONIZAÇÃO EM TEMPO REAL DE PLANEJAMENTO
  try {
    if (unsubPlanejamento) unsubPlanejamento();
    unsubPlanejamento = db.collection('auditoria_planejamento').onSnapshot(async (snap) => {
      // Colecao vazia na nuvem nao significa "precisa semear". Ver
      // SEED_INICIAL_HABILITADO, logo acima de setupRealtimeCloudSync.
      if (snap.empty && !SEED_INICIAL_HABILITADO) return;
      if (snap.empty) {
        console.log("☁️ Populando auditoria_planejamento no Firestore com backup inicial...");
        const batch = db.batch();
        state.planejamento.forEach(p => {
          batch.set(db.collection('auditoria_planejamento').doc(p.id), p);
        });
        await batch.commit().catch(e => console.log("Nota seed plan:", e.message));
      } else {
        const cloudPlan = [];
        snap.forEach(doc => {
          cloudPlan.push({ id: doc.id, ...doc.data() });
        });
        cloudPlan.sort((a, b) => {
          const numA = parseInt(String(a.id || '').replace(/\D/g, ''), 10) || 0;
          const numB = parseInt(String(b.id || '').replace(/\D/g, ''), 10) || 0;
          return numA - numB;
        });
        state.planejamento = cloudPlan;
        salvarPlanejamento();
        if (state.currentTab === 'planejamento') renderPlanejamentoTable();
        if (state.currentTab === 'dashboard') renderDashboardCharts();
      }
    }, (err) => {
      console.log("Nota Firestore listener planejamento:", err.message);
    });
  } catch (e) {
    console.warn("Aviso listener planejamento:", e);
  }

  // 2. SINCRONIZAÇÃO EM TEMPO REAL DE MAPEAMENTO
  try {
    if (unsubMapeamento) unsubMapeamento();
    unsubMapeamento = db.collection('auditoria_mapeamento').onSnapshot(async (snap) => {
      // Colecao vazia na nuvem nao significa "precisa semear". Ver
      // SEED_INICIAL_HABILITADO, logo acima de setupRealtimeCloudSync.
      if (snap.empty && !SEED_INICIAL_HABILITADO) return;
      if (snap.empty) {
        console.log("☁️ Populando auditoria_mapeamento no Firestore com backup inicial...");
        const batch = db.batch();
        state.mapeamento.slice(0, 100).forEach(m => {
          batch.set(db.collection('auditoria_mapeamento').doc(m.id), m);
        });
        await batch.commit().catch(e => console.log("Nota seed map:", e.message));
      } else {
        const cloudMap = [];
        snap.forEach(doc => {
          cloudMap.push({ id: doc.id, ...doc.data() });
        });
        cloudMap.sort((a, b) => new Date(b.data || 0) - new Date(a.data || 0));
        state.mapeamento = cloudMap;
        salvarMapeamento();
        atualizarBadgesLojasCriticas();
        if (state.currentTab === 'mapeamento') renderMapeamentoTable();
        if (state.currentTab === 'planejamento') renderPlanejamentoTable();
        if (state.currentTab === 'dashboard') renderDashboardCharts();
      }
    }, (err) => {
      console.log("Nota Firestore listener mapeamento:", err.message);
    });
  } catch (e) {
    console.warn("Aviso listener mapeamento:", e);
  }

  // 3. SINCRONIZAÇÃO EM TEMPO REAL DE TAREFAS DA EQUIPE (KANBAN)
  try {
    if (unsubTarefas) unsubTarefas();
    unsubTarefas = db.collection('tarefas_equipe').onSnapshot(async (snap) => {
      // Colecao vazia na nuvem nao significa "precisa semear". Ver
      // SEED_INICIAL_HABILITADO, logo acima de setupRealtimeCloudSync.
      if (snap.empty && !SEED_INICIAL_HABILITADO) return;
      if (snap.empty) {
        console.log("☁️ Populando tarefas_equipe no Firestore com backup inicial...");
        const batch = db.batch();
        state.tarefas.forEach(t => {
          batch.set(db.collection('tarefas_equipe').doc(t.id), t);
        });
        await batch.commit().catch(e => console.log("Nota seed tarefas:", e.message));
      } else {
        const cloudTarefas = [];
        snap.forEach(doc => {
          cloudTarefas.push({ id: doc.id, ...doc.data() });
        });
        cloudTarefas.sort((a, b) => new Date(b.prazo || b.criadaEm || 0) - new Date(a.prazo || a.criadaEm || 0));
        state.tarefas = cloudTarefas;
        salvarTarefas();
        if (state.currentTab === 'tarefas') renderKanbanBoard();
        if (state.activeDemandaId) {
          const item = state.tarefas.find(t => t.id === state.activeDemandaId);
          if (item) renderSubtarefasDetalhe(item);
        }
      }
    }, (err) => {
      console.log("Nota Firestore listener tarefas:", err.message);
    });
  } catch (e) {
    console.warn("Aviso listener tarefas:", e);
  }

  // 4. SINCRONIZAÇÃO EM TEMPO REAL DE USUÁRIOS (EQUIPE)
  try {
    if (unsubUsuarios) unsubUsuarios();
    unsubUsuarios = db.collection('users').onSnapshot(async (snap) => {
      // Colecao vazia na nuvem nao significa "precisa semear". Ver
      // SEED_INICIAL_HABILITADO, logo acima de setupRealtimeCloudSync.
      if (snap.empty && !SEED_INICIAL_HABILITADO) return;
      if (snap.empty) {
        console.log("☁️ Populando users no Firestore com equipe padrão...");
        const batch = db.batch();
        state.usuarios.forEach(u => {
          batch.set(db.collection('users').doc(u.id), u);
        });
        await batch.commit().catch(e => console.log("Nota seed users:", e.message));
      } else {
        const cloudUsers = [];
        snap.forEach(doc => {
          cloudUsers.push({ id: doc.id, ...doc.data() });
        });
        state.usuarios = cloudUsers;
        normalizarUsuarios();
        salvarUsuarios();
        popularSelectsUsuarios();
        renderUsuariosLista();
        if (state.currentTab === 'dashboard') renderProdutividadeEquipe();
      }
    }, (err) => {
      console.log("Nota Firestore listener users:", err.message);
    });
  } catch (e) {
    console.warn("Aviso listener users:", e);
  }
}

// ============================================================
// 👥 GESTÃO DE EQUIPE & SELECTS
// ============================================================

const AUDITORES_EQUIPE_BASE = [
  'Ana Raquel',
  'Bruna Costa',
  'Matheus Cosme'
];

function getListaAuditoresUnificada() {
  const set = new Set();
  
  // 1. Auditores base da equipe (Ana Raquel, Bruna Costa, Matheus Cosme)
  AUDITORES_EQUIPE_BASE.forEach(nome => set.add(nome));

  // 2. Usuários cadastrados no Firestore (state.usuarios)
  if (Array.isArray(state.usuarios)) {
    state.usuarios.forEach(u => {
      const nome = (u.nome || u.displayName || '').trim();
      if (nome && u.ativo !== false && nome !== 'Colaborador') set.add(nome);
    });
  }

  // 3. Auditores que já aparecem no planejamento
  if (Array.isArray(state.planejamento)) {
    state.planejamento.forEach(p => {
      const nome = (p.auditor || p.responsavel || '').trim();
      if (nome && nome !== 'Sem auditor' && nome !== 'undefined') set.add(nome);
    });
  }

  // 4. Auditores que já aparecem no mapeamento histórico
  if (Array.isArray(state.mapeamento)) {
    state.mapeamento.forEach(m => {
      const nome = (m.auditor || m.autor || '').trim();
      if (nome && nome !== 'Sem auditor' && nome !== 'undefined') set.add(nome);
    });
  }

  return Array.from(set).sort((a, b) => a.localeCompare(b, 'pt-BR'));
}

function normalizarUsuarios() {
  const padroes = [
    { id: 'usr_1', nome: 'Ana Raquel', email: 'ana.raquel@sanpaologelato.com.br', cargo: 'Auditor Sênior' },
    { id: 'usr_2', nome: 'Bruna Costa', email: 'bruna.costa@sanpaologelato.com.br', cargo: 'Auditor Sênior' },
    { id: 'usr_4', nome: 'Matheus Cosme', email: 'matheus.cosme@sanpaologelato.com.br', cargo: 'Auditor Sênior' }
  ];

  if (!state.usuarios || state.usuarios.length === 0) {
    state.usuarios = padroes;
  } else {
    state.usuarios = state.usuarios.map((u, idx) => {
      const nome = u.nome || u.displayName || 'Colaborador';
      const email = (u.email && u.email !== 'undefined')
        ? u.email
        : (nome.toLowerCase().replace(/\s+/g, '.') + '@sanpaologelato.com.br');

      return Object.assign({}, u, {
        id: u.id || ('usr_' + (idx + 1)),
        nome: nome,
        email: email,
        cargo: u.cargo || 'Auditor'
      });
    });
  }
}

function popularSelectsUsuarios() {
  const selects = ['plan-filter-auditor', 'map-select-auditor', 'nota-select-auditor', 'kanban-filter-responsavel', 'dem-responsavel'];
  const auditores = getListaAuditoresUnificada();

  selects.forEach(id => {
    const el = document.getElementById(id);
    if (!el) return;
    const currentVal = el.value;
    const isFilter = id.includes('filter');
    
    let html = isFilter ? '<option value="">Todos os Responsáveis</option>' : '<option value="">Selecione...</option>';
    
    // Se for o filtro do planejamento, adiciona opção para lojas sem auditor
    if (id === 'plan-filter-auditor') {
      html += '<option value="__SEM_AUDITOR__">⚠️ [Sem Auditor / Não Atribuídas]</option>';
    }

    auditores.forEach(nome => {
      html += `<option value="${nome}">${nome}</option>`;
    });

    el.innerHTML = html;
    if (currentVal) el.value = currentVal;
  });
}

function populateDropdowns() {
  ['plan-filter-regional', 'dash-filter-regional'].forEach(id => {
    const el = document.getElementById(id);
    if (!el) return;
    el.innerHTML = '<option value="">Todas as Regionais (KA)</option>';
    REGIONAIS_OFICIAIS.forEach(r => el.add(new Option(r, r)));
  });

  const dashLoja = document.getElementById('dash-filter-loja');
  if (dashLoja) {
    dashLoja.innerHTML = '<option value="">Todas as Lojas (KA)</option>';
    LOJAS_KA_MASTER.forEach(l => dashLoja.add(new Option(l.nome, l.nome)));
  }

  const mapLoja = document.getElementById('map-select-loja');
  const notaLoja = document.getElementById('nota-select-loja');
  if (mapLoja) {
    mapLoja.innerHTML = '';
    LOJAS_KA_MASTER.forEach(l => mapLoja.add(new Option(l.nome, l.nome)));
  }
  if (notaLoja) {
    notaLoja.innerHTML = '';
    LOJAS_KA_MASTER.forEach(l => notaLoja.add(new Option(l.nome, l.nome)));
  }
}

function openModalUsuarios() {
  renderUsuariosLista();
  document.getElementById('modal-usuarios')?.classList.remove('hidden');
  document.getElementById('modal-usuarios')?.classList.add('active');
}

function closeModalUsuarios() {
  document.getElementById('modal-usuarios')?.classList.add('hidden');
  document.getElementById('modal-usuarios')?.classList.remove('active');
}

function renderUsuariosLista() {
  normalizarUsuarios();
  const container = document.getElementById('usuarios-lista');
  if (!container) return;

  container.innerHTML = state.usuarios.map(u => `
    <div style="display:flex; align-items:center; justify-content:space-between; padding:10px 14px; background:var(--bg-surface-2); border:1px solid var(--border-color); border-radius:var(--r-md); margin-bottom:6px;">
      <div>
        <strong style="font-size:0.88rem; color:var(--text-main);">${u.nome}</strong> 
        <span style="font-size:0.75rem; color:var(--sp-laranja); font-weight:700;">(${u.cargo})</span>
        <div style="font-size:0.76rem; color:var(--text-muted);">${u.email}</div>
      </div>
      <button class="icon-btn" style="width:32px; height:32px; color:var(--sp-red); border-color:rgba(218,13,23,0.2);" onclick="removerUsuario('${u.id}')" title="Excluir Colaborador">
        <i class="ph ph-trash"></i>
      </button>
    </div>
  `).join('');

  popularSelectsUsuarios();
}

async function adicionarNovoUsuario() {
  const nomeInput = document.getElementById('usr-nome')?.value.trim();
  const emailInput = document.getElementById('usr-email')?.value.trim();
  const cargoInput = document.getElementById('usr-cargo')?.value || 'Auditor Sênior';

  if (!nomeInput || !emailInput) {
    showToast('Informe o nome e o e-mail corporativo do colaborador.', 'error');
    return;
  }

  if (state.usuarios.some(u => u.email && u.email.toLowerCase() === emailInput.toLowerCase())) {
    showToast('Este e-mail já está cadastrado na equipe.', 'error');
    return;
  }

  const senhaInicial = prompt(
    `Senha inicial de ${nomeInput} (mínimo 6 caracteres).\n\n` +
    `Ela serve só para o primeiro acesso: a pessoa troca em "Minha Conta", ` +
    `e a partir daí ninguém mais consegue ver a senha.`);
  if (senhaInicial === null) return;
  if (!senhaInicial || senhaInicial.length < 6) {
    showToast('A senha inicial precisa de no mínimo 6 caracteres.', 'error');
    return;
  }

  // Cria a conta no Firebase Auth E o perfil em users/{uid}.
  //
  // A instancia secundaria e o ponto importante: createUserWithEmailAndPassword
  // troca a sessao corrente pela do usuario recem-criado. Numa segunda
  // instancia do Firebase, a sua sessao de admin nesta aba nao e tocada.
  //
  // O id do documento TEM de ser o uid: as regras resolvem o perfil por caminho
  // literal users/$(request.auth.uid), nunca por consulta. Era isso que o
  // codigo antigo errava ao gravar users/usr_<timestamp>.
  let secundario = null;
  try {
    secundario = firebase.initializeApp(window.firebaseConfig, 'novoUsuario-' + Date.now());
    const cred = await secundario.auth().createUserWithEmailAndPassword(emailInput, senhaInicial);
    const uid = cred.user.uid;
    await secundario.auth().signOut();

    await db.collection('users').doc(uid).set({
      displayName: nomeInput,
      email: emailInput,
      cargo: cargoInput,
      role: 'user',
      ativo: true,
      setores_permitidos: ['Auditoria']
    });
  } catch (e) {
    console.error('Erro ao criar usuário:', e);
    const msg = e && e.code === 'auth/email-already-in-use'
      ? 'Já existe uma conta com esse e-mail.'
      : (e && e.code === 'auth/invalid-email' ? 'E-mail inválido.'
      : (e && e.code === 'permission-denied' ? 'Só um administrador pode cadastrar acessos.'
      : 'Não foi possível criar o acesso: ' + (e.code || e.message)));
    showToast(msg, 'error');
    return;
  } finally {
    if (secundario) { try { await secundario.delete(); } catch (err) { console.error(err); } }
  }

  if (document.getElementById('usr-nome')) document.getElementById('usr-nome').value = '';
  if (document.getElementById('usr-email')) document.getElementById('usr-email').value = '';

  renderUsuariosLista();
  renderPlanejamentoTable();
  renderProdutividadeEquipe();
  showToast(`Colaborador ${nomeInput} cadastrado com sucesso!`, 'success');
}

// Desativa o acesso, em vez de apagar o documento.
//
// O id destes documentos e o uid do Firebase Auth. Apagar o perfil NAO apaga a
// conta - isso exige o Admin SDK, que nao roda no navegador. Sobraria uma conta
// capaz de autenticar sem perfil nenhum, e a pessoa ficaria travada na tela de
// login sem ninguem entender por que. Com ativo:false o guarda de sessao recusa
// a entrada com mensagem clara, e da para reverter.
async function removerUsuario(userId) {
  const user = state.usuarios.find(u => u.id === userId || u.email === userId);
  if (!user) return;

  if (user.id === window.usuarioUid) {
    showToast('Você não pode desativar a própria conta.', 'error');
    return;
  }

  if (!confirm(`Desativar o acesso de ${user.nome}?\n\n` +
               `A pessoa deixa de conseguir entrar no Hub, mas o histórico de ` +
               `auditorias dela é preservado. Dá para reativar depois.`)) return;

  if (typeof db !== 'undefined' && db) {
    try {
      await db.collection('users').doc(user.id).update({ ativo: false });
      showToast(`Acesso de ${user.nome} desativado.`, 'info');
    } catch (e) {
      console.error('Erro ao desativar usuário:', e);
      showToast('Não foi possível desativar o acesso: ' + (e.code || e.message), 'error');
      return;
    }
  }
  // O onSnapshot de users devolve a lista atualizada; nao mexemos no estado
  // local aqui para as duas versoes nao divergirem.

  renderUsuariosLista();
  renderPlanejamentoTable();
  renderProdutividadeEquipe();
  showToast(`Colaborador ${user.nome} removido da equipe.`, 'info');
}

// ============================================================
// 🔒 BLOCO DE SEGURANÇA, NAVEGAÇÃO E AUTENTICAÇÃO
// ============================================================

function aplicarEstadoInicialDeslogado() {
  isUserLoggedIn = false;

  sessionStorage.removeItem('sp_hub_token');
  sessionStorage.removeItem('sp_hub_user');
  localStorage.removeItem('sp_hub_token');
  localStorage.removeItem('sp_hub_user');

  const nameEl = document.getElementById('display-user-name');
  const avatarEl = document.getElementById('user-avatar-char');
  if (nameEl) nameEl.textContent = 'Visitante';
  if (avatarEl) avatarEl.textContent = '?';

  document.getElementById('portal-tab-bar')?.classList.add('hidden');
  document.getElementById('home-portals-section')?.classList.add('hidden');
  document.getElementById('btn-equipe-header')?.classList.add('hidden');
  document.getElementById('btn-logout-header')?.classList.add('hidden');
  document.getElementById('btn-sync-cloud-header')?.classList.add('hidden');

  document.getElementById('login-hero-card')?.classList.remove('hidden');

  document.querySelectorAll('.view-section').forEach(sec => sec.classList.add('hidden'));
  document.getElementById('view-home')?.classList.remove('hidden');
}

// ===========================================================================
//  GUARDA DE SESSAO
//
//  A versao anterior desta funcao aceitava como sessao valida um par de
//  chaves em sessionStorage/localStorage ('sp_hub_token' e 'sp_hub_user').
//  Qualquer pessoa poderia escrever essas duas chaves pelo console do
//  navegador e entrar com o nome que quisesse. Agora a unica fonte de
//  verdade e o Firebase Auth, e o NOME vem do perfil em users/{uid}.
// ===========================================================================

// Carrega o perfil da pessoa autenticada. Devolve null (e explica o motivo)
// quando a conta nao pode usar o sistema.
async function carregarPerfilDoUsuario(user) {
  let snap;
  try {
    snap = await db.collection('users').doc(user.uid).get();
  } catch (e) {
    console.error('[auth] falha ao ler users/' + user.uid, e && e.code);
    showToast('Não foi possível ler seu perfil de acesso. Tente novamente.', 'error');
    return null;
  }

  if (!snap.exists) {
    showToast('Sua conta existe, mas ainda não tem acesso liberado. Procure o administrador.', 'error');
    return null;
  }

  const perfil = snap.data() || {};

  if (perfil.ativo === false) {
    showToast('Esta conta está desativada. Procure o administrador.', 'error');
    return null;
  }

  // Verificacao de identidade cruzada.
  // O documento de perfil e enderecado pelo uid, mas e criado a mao no
  // console. Colar o uid de uma pessoa no documento de outra faz o sistema
  // logar voce com o nome alheio - e assinar auditorias com ele. Em vez de
  // aceitar em silencio, recusamos e dizemos exatamente o que esta errado.
  const emailPerfil = String(perfil.email || '').trim().toLowerCase();
  const emailConta = String(user.email || '').trim().toLowerCase();
  if (emailPerfil && emailConta && emailPerfil !== emailConta) {
    console.error('[auth] perfil inconsistente em users/' + user.uid +
      ': documento diz "' + emailPerfil + '", conta autenticada e "' + emailConta + '".');
    showToast('O perfil ligado a esta conta está com o e-mail de outra pessoa. ' +
      'Corrija o documento em users/' + user.uid + ' antes de entrar.', 'error');
    return null;
  }

  if (!perfil.displayName) {
    showToast('Seu perfil está sem o campo displayName. Procure o administrador.', 'error');
    return null;
  }

  return perfil;
}

function iniciarGuardaDeSessao() {
  if (!window.auth) {
    console.error('[auth] Firebase Auth indisponivel.');
    aplicarEstadoInicialDeslogado();
    return;
  }

  window.auth.onAuthStateChanged(async function (user) {
    if (!user) {
      window.perfilUsuario = null;
      aplicarEstadoInicialDeslogado();
      return;
    }

    const perfil = await carregarPerfilDoUsuario(user);
    if (!perfil) {
      await window.auth.signOut();
      return;
    }

    window.perfilUsuario = perfil;
    window.usuarioUid = user.uid;

    // O nome exibido e o de users/{uid}.displayName, nunca o prefixo do
    // e-mail nem um palpite: e ele que casa com o campo 'auditor' dos
    // registros, entao precisa ser exatamente a mesma string.
    loginSucesso(perfil.displayName, false);

    // A sincronizacao so comeca depois da identidade confirmada.
    if (typeof setupRealtimeCloudSync === 'function') setupRealtimeCloudSync();
  });
}

function verificarSessaoAtiva() {
  iniciarGuardaDeSessao();
}

async function executarLoginFirebase() {
  const emailInput = document.getElementById('login-email')?.value.trim();
  const senhaInput = document.getElementById('login-senha')?.value.trim();

  if (!emailInput || !senhaInput) {
    showToast('Informe seu e-mail corporativo e a senha.', 'error');
    return;
  }

  const btnSubmit = document.querySelector('#login-hero-card .btn-red-submit');
  if (btnSubmit) {
    btnSubmit.disabled = true;
    btnSubmit.innerHTML = '<i class="ph ph-spinner animate-spin"></i> Verificando credenciais...';
  }

  // ------------------------------------------------------------------
  //  Somente Firebase Auth. O que saiu daqui, e por que:
  //
  //   - Uma senha fixa em texto puro pareada a um e-mail (este arquivo e
  //     servido publicamente: a senha era baixavel por qualquer um).
  //   - Tres atalhos por includes() de trecho do nome, que aceitavam
  //     QUALQUER senha de 6 caracteres e nem exigiam o dominio da empresa.
  //   - Um ultimo ramo que deixava entrar qualquer @sanpaologelato.com.br
  //     com qualquer senha de 6 caracteres.
  //   - Um Promise.race de 10s: se a rede demorasse, o erro era engolido e
  //     a escada acima rodava do mesmo jeito. Conexao lenta virava bypass.
  //
  //  Quem decide o nome exibido agora e o guarda de sessao, lendo
  //  users/{uid}.displayName. Nao ha mais palpite a partir do e-mail.
  // ------------------------------------------------------------------
  try {
    await window.auth.signInWithEmailAndPassword(emailInput, senhaInput);
    // Sucesso: onAuthStateChanged assume, carrega o perfil e chama loginSucesso.
  } catch (err) {
    console.error('[auth]', err && err.code);
    const codigo = err && err.code;
    const msg =
      (codigo === 'auth/invalid-email') ? 'E-mail inválido.' :
      (codigo === 'auth/user-disabled') ? 'Esta conta está desativada.' :
      (codigo === 'auth/too-many-requests') ? 'Muitas tentativas. Aguarde alguns minutos.' :
      (codigo === 'auth/network-request-failed') ? 'Sem conexão com o servidor. Verifique a rede.' :
      'E-mail corporativo ou senha incorretos.';
    showToast(msg, 'error');
  } finally {
    if (btnSubmit) {
      btnSubmit.disabled = false;
      btnSubmit.innerHTML = '<i class="ph ph-sign-in"></i> Entrar no Hub Auditoria';
    }
  }
}

function loginSucesso(userName, emitToast = true) {
  isUserLoggedIn = true;
  const displayName = userName.trim();
  const firstChar = displayName.charAt(0).toUpperCase();

  // O par sp_hub_token / sp_hub_user saiu daqui. Era um "token" montado com
  // btoa(nome + timestamp) e a revalidacao so checava se ele existia - ou
  // seja, qualquer pessoa entrava escrevendo duas chaves pelo console.
  // Quem persiste a sessao agora e o proprio Firebase Auth.

  document.getElementById('display-user-name').textContent = displayName;
  document.getElementById('user-avatar-char').textContent = firstChar;

  document.getElementById('portal-tab-bar')?.classList.remove('hidden');
  document.getElementById('home-portals-section')?.classList.remove('hidden');
  document.getElementById('btn-equipe-header')?.classList.remove('hidden');
  document.getElementById('btn-logout-header')?.classList.remove('hidden');
  document.getElementById('btn-sync-cloud-header')?.classList.remove('hidden');

  document.getElementById('login-hero-card')?.classList.add('hidden');

  if (typeof setupRealtimeCloudSync === 'function') {
    setupRealtimeCloudSync();
  }

  if (emitToast) showToast(`Bem-vindo(a) ao Hub, ${displayName}!`, 'success');
  switchTab('home');
}

function executarLogoutFirebase() {
  try {
    if (unsubPlanejamento) { unsubPlanejamento(); unsubPlanejamento = null; }
    if (unsubMapeamento) { unsubMapeamento(); unsubMapeamento = null; }
    if (unsubTarefas) { unsubTarefas(); unsubTarefas = null; }
    if (unsubUsuarios) { unsubUsuarios(); unsubUsuarios = null; }

    if (typeof firebase !== 'undefined' && firebase.auth) {
      firebase.auth().signOut();
    }
  } catch(e) {
    console.warn("Aviso no logout Firebase:", e);
  }

  sessionStorage.clear();
  localStorage.removeItem('sp_hub_token');
  localStorage.removeItem('sp_hub_user');

  aplicarEstadoInicialDeslogado();
  showToast('Sessão encerrada com sucesso.', 'info');
}

function switchTab(tabId) {
  if (!isUserLoggedIn && tabId !== 'home') {
    showToast('Acesso restrito. Efetue o login para acessar os módulos de auditoria.', 'error');
    aplicarEstadoInicialDeslogado();
    return;
  }

  // Desarma o registro rapido ao sair da tela. Se o usuario abandonasse o
  // atalho pela metade, o flag continuaria ligado e a proxima escolha de causa
  // feita a mao gravaria um registro sem ele mandar.
  if (tabId !== 'mapeamento') state.mapeamentoRapido = false;

  state.currentTab = tabId;
  state.activeTab = tabId;

  document.querySelectorAll('.view-section').forEach(sec => sec.classList.add('hidden'));

  const targetSec = document.getElementById('view-' + tabId);
  const targetBtn = document.getElementById('tab-' + tabId);

  if (targetSec) targetSec.classList.remove('hidden');

  document.querySelectorAll('.nav-tab-btn').forEach(btn => btn.classList.remove('active'));

  if (isUserLoggedIn) {
    document.getElementById('portal-tab-bar')?.classList.remove('hidden');
    if (targetBtn) targetBtn.classList.add('active');
  } else {
    document.getElementById('portal-tab-bar')?.classList.add('hidden');
  }

  if (tabId === 'planejamento') renderPlanejamentoTable();
  if (tabId === 'mapeamento') renderMapeamentoTable();
  if (tabId === 'tarefas') renderKanbanBoard();
  if (tabId === 'dashboard') renderDashboardCharts();

  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function openConfigModal() {
  // A chave vem da configuracao gerada no build (js/firebase-config.js), e nao
  // mais fixa aqui. Uma copia fixa neste arquivo ficaria desatualizada ao
  // trocar de projeto e anularia o ponto de usar variavel de ambiente.
  const rawKey = (window.firebaseConfig && window.firebaseConfig.apiKey) || '';
  const maskedKey = rawKey
    ? rawKey.substring(0, 6) + "••••••••••••••••••••••••" + rawKey.substring(rawKey.length - 4)
    : '(configuração não carregada)';

  const keyInput = document.getElementById('cfg-api-key');
  if (keyInput) keyInput.value = maskedKey;

  document.getElementById('modal-config')?.classList.remove('hidden');
  document.getElementById('modal-config')?.classList.add('active');
}

function closeConfigModal() {
  document.getElementById('modal-config')?.classList.add('hidden');
  document.getElementById('modal-config')?.classList.remove('active');
}

// ============================================================
// 📅 PLANEJAMENTO DE AUDITORIAS (CÁLCULO DINÂMICO DE STATUS)
// ============================================================

/**
 * Calcula dinamicamente o status mensal de uma loja no Planejamento:
 * - CONCLUIDA: Se houver auditoria com REALIZADA === 'SIM' no mês de referência (ex: Setembro)
 * - ATRASADA: Se a data prevista pertence ao mês ativo, já passou em relação a hoje e ainda não foi realizada
 * - PENDENTE: Se a data prevista é futura no mês, se não há data ou se pertence a outro mês ainda não planejado
 */
function getStatusLojaPlanejamento(item, targetMonth = null) {
  const hoje = new Date().toISOString().slice(0, 10);
  const activeMonth = targetMonth || (typeof document !== 'undefined' && (document.getElementById('plan-filter-month')?.value || document.getElementById('map-filter-month')?.value)) || hoje.slice(0, 7);

  // 1. Verifica se houve visita realizada com SUCESSO (SIM) no mês ativo
  const teveAuditoriaNoMes = (state.mapeamento || []).some(m => 
    m.lojaNome === item.lojaNome && 
    (m.realizada === 'SIM' || m.realizada === 'Sim') && 
    m.data && 
    m.data.startsWith(activeMonth)
  ) || (item.ultimaData && item.ultimaData.startsWith(activeMonth) && (item.status === 'CONCLUIDA' || item.status === 'Realizada'));

  if (teveAuditoriaNoMes) {
    return 'CONCLUIDA';
  }

  // 2. Se a data prevista pertence ao mês ativo de referência
  if (item.proximaPrevista && item.proximaPrevista.startsWith(activeMonth)) {
    if (item.proximaPrevista < hoje) {
      return 'ATRASADA';
    }
    return 'PENDENTE';
  }

  // 3. Se não tem data no mês de referência (ou tem data antiga de mês passado), fica PENDENTE para agendamento no mês ativo
  return 'PENDENTE';
}

function getUltimaAuditoriaDaLoja(lojaNome, fallbackData = null) {
  if (state.mapeamento && state.mapeamento.length > 0) {
    const realizadas = state.mapeamento.filter(m => 
      m.lojaNome === lojaNome && (m.realizada === 'SIM' || m.realizada === 'Sim') && m.data
    );
    if (realizadas.length > 0) {
      realizadas.sort((a, b) => new Date(b.data) - new Date(a.data));
      return formatDate(realizadas[0].data);
    }
  }
  if (fallbackData && fallbackData !== 'Sem registro') {
    return formatDate(fallbackData);
  }
  return 'Sem registro';
}

function setFilterStatus(status) {
  state.filterStatus = status;
  const statusMap = { TODOS: 'todos', REALIZADAS: 'realizadas', RESTANTES: 'restantes', ATRASADAS: 'atrasadas', PENDENTE_TOTAL: 'pendentetotal' };
  Object.keys(statusMap).forEach(s => {
    document.getElementById('btn-status-' + statusMap[s])?.classList.remove('active');
  });
  document.getElementById('btn-status-' + statusMap[status])?.classList.add('active');
  renderPlanejamentoTable();
}

function toggleDateFilterMode() {
  const mode = document.getElementById('plan-date-mode')?.value || 'MES';
  state.dateFilterMode = mode;
  document.getElementById('plan-filter-month')?.classList.toggle('hidden', mode === 'DIA');
  document.getElementById('plan-filter-day')?.classList.toggle('hidden', mode !== 'DIA');
  renderPlanejamentoTable();
}

function toggleFiltroCriticasPlanejamento() {
  state.filtroApenasCriticas = !state.filtroApenasCriticas;
  const btn = document.getElementById('btn-filtro-criticas');
  if (btn) {
    btn.classList.toggle('active', state.filtroApenasCriticas);
  }
  if (state.filtroApenasCriticas) {
    showToast('Exibindo apenas lojas críticas (2+ tentativas sem sucesso)', 'info');
  }
  renderPlanejamentoTable();
}

function renderPlanejamentoTable() {
  const tbody = document.getElementById('planejamento-table-body');
  if (!tbody) return;

  const search = document.getElementById('plan-search')?.value.toLowerCase() || '';
  const regional = document.getElementById('plan-filter-regional')?.value || '';
  const auditor = document.getElementById('plan-filter-auditor')?.value || '';
  const monthVal = document.getElementById('plan-filter-month')?.value || '';
  const dayVal = document.getElementById('plan-filter-day')?.value || '';
  const dateMode = document.getElementById('plan-date-mode')?.value || 'MES';

  // Lista unificada e resiliente com toda a equipe de auditores
  const listaAuditores = getListaAuditoresUnificada();

  const criticasIds = getLojasCriticasIds(monthVal || undefined);

  let filtrados = (state.planejamento || []).filter(item => {
    const matchSearch = (item.lojaNome || '').toLowerCase().includes(search)
                     || (item.regional || '').toLowerCase().includes(search);
    const matchReg = !regional || item.regional === regional;

    let matchAud = true;
    if (auditor === '__SEM_AUDITOR__') {
      matchAud = !item.auditor || item.auditor.trim() === '' || item.auditor === 'Sem auditor';
    } else if (auditor) {
      matchAud = (item.auditor || '').toLowerCase().includes(auditor.toLowerCase());
    }

    let matchDate = true;
    if (dateMode === 'DIA' && dayVal) {
      matchDate = Boolean(item.proximaPrevista === dayVal || item.ultimaData === dayVal);
    } else if (dateMode === 'MES' && monthVal) {
      matchDate = true;
    }

    const currentCalculatedStatus = getStatusLojaPlanejamento(item, monthVal || undefined);

    let matchStatus = true;
    if (state.filterStatus === 'REALIZADAS') matchStatus = (currentCalculatedStatus === 'CONCLUIDA');
    if (state.filterStatus === 'RESTANTES') matchStatus = (currentCalculatedStatus !== 'CONCLUIDA');
    if (state.filterStatus === 'ATRASADAS') matchStatus = (currentCalculatedStatus === 'ATRASADA');
    if (state.filterStatus === 'PENDENTE_TOTAL') matchStatus = (currentCalculatedStatus === 'PENDENTE');

    let matchCriticas = true;
    if (state.filtroApenasCriticas) {
      matchCriticas = criticasIds.includes(item.lojaNome);
    }

    return matchSearch && matchReg && matchAud && matchDate && matchStatus && matchCriticas;
  });

  if (filtrados.length === 0) {
    tbody.innerHTML = `<tr><td colspan="6" style="text-align:center; padding:24px; color:var(--text-muted);">Nenhuma loja encontrada para os filtros selecionados.</td></tr>`;
    return;
  }

  tbody.innerHTML = filtrados.map(item => {
    const calculatedStatus = getStatusLojaPlanejamento(item, monthVal || undefined);
    const isConcluida = calculatedStatus === 'CONCLUIDA';
    const statusClass = isConcluida ? 'concluida' : (calculatedStatus === 'ATRASADA' ? 'atrasada' : 'pendente');
    const statusLabel = isConcluida ? 'Realizada' : (calculatedStatus === 'ATRASADA' ? 'Atrasada' : 'Pendente');

    // Opções de auditores disponíveis para cada loja
    const opcoes = listaAuditores.slice();
    if (item.auditor && !opcoes.includes(item.auditor)) opcoes.unshift(item.auditor);

    const optionsAuditor = [
      `<option value="" ${!item.auditor ? 'selected' : ''}>-- Selecione o Auditor --</option>`,
      ...opcoes.map(aud => {
        const selected = (item.auditor === aud) ? 'selected' : '';
        return `<option value="${aud}" ${selected}>${aud}</option>`;
      })
    ].join('');

    return `
      <tr>
        <td><strong>${item.lojaNome}</strong></td>
        <td><span class="status-badge andamento">${item.regional || '-'}</span></td>
        <td>${getUltimaAuditoriaDaLoja(item.lojaNome, item.ultimaData || item.ultimaAuditoria)}</td>
        <td>
          <input type="date" class="form-ctrl" style="width:145px; padding:6px 10px; font-size:0.8rem;" 
                 value="${item.proximaPrevista || ''}" 
                 onchange="alterarDataPrevistaPlanejamento('${item.id}', this.value)" />
        </td>
        <td>
          <select class="form-ctrl" style="width:170px; padding:6px 10px; font-size:0.8rem;" 
                  onchange="alterarAuditorLoja('${item.id}', this.value)">
            ${optionsAuditor}
          </select>
        </td>
        <td style="text-align:center; white-space:nowrap;">
          <span class="status-badge ${statusClass}">${statusLabel}</span>
          <button class="icon-btn" title="Registrar tentativa não realizada para esta loja"
                  onclick="registrarTentativaRapida('${item.id}')"
                  style="width:32px; height:32px; margin-left:8px; vertical-align:middle;">
            <i class="ph ph-phone-x"></i>
          </button>
        </td>
      </tr>
    `;
  }).join('');
}

// Atalho do Planejamento para o Mapeamento.
//
// Preenche tudo o que da para deduzir - loja, data e hora de agora, auditor
// logado, proximo numero de tentativa - e deixa so a causa para o usuario
// escolher. Como a tentativa registrada aqui e sempre NAO realizada (que e o
// caso em que existe causa), a escolha da causa fecha o registro sozinha.
window.registrarTentativaRapida = function (planId) {
  const item = (state.planejamento || []).find(p => p.id === planId);
  if (!item || !item.lojaNome) {
    showToast('Loja sem cadastro completo no planejamento.', 'error');
    return;
  }

  switchTab('mapeamento');

  const selLoja = document.getElementById('map-select-loja');
  if (selLoja) {
    selLoja.value = item.lojaNome;
    // Se a loja nao existe na lista do mapeamento, abortar e dizer por que -
    // sem isso o select cairia na primeira opcao e a tentativa seria gravada
    // na loja errada.
    if (selLoja.value !== item.lojaNome) {
      showToast(`"${item.lojaNome}" não está na lista de lojas do mapeamento.`, 'error');
      return;
    }
  }

  const agora = new Date();
  const dataEl = document.getElementById('map-input-data');
  if (dataEl) dataEl.value = agora.toISOString().slice(0, 10);

  const customEl = document.getElementById('map-input-motivo-custom');
  if (customEl) customEl.value = '';
  const customBox = document.getElementById('map-motivo-custom-box');
  if (customBox) customBox.classList.add('hidden');

  const realEl = document.getElementById('map-select-realizada');
  if (realEl) realEl.value = 'NÃO';
  if (typeof toggleMapMotivoUI === 'function') toggleMapMotivoUI();

  const audEl = document.getElementById('map-select-auditor');
  if (audEl && window.currentUser) {
    audEl.value = window.currentUser;
    if (audEl.value !== window.currentUser) audEl.selectedIndex = 0;
  }

  if (typeof sugerirProximaTentativaLoja === 'function') sugerirProximaTentativaLoja();

  const motivoEl = document.getElementById('map-select-motivo');
  if (motivoEl) motivoEl.value = '';

  // Liga o modo rapido: a proxima escolha de causa grava o registro.
  // O flag e consumido em aoEscolherMotivoMapeamento, entao o formulario volta
  // ao comportamento normal logo depois.
  state.mapeamentoRapido = true;

  const box = document.getElementById('map-motivo-box');
  if (box) {
    box.scrollIntoView({ behavior: 'smooth', block: 'center' });
    box.style.transition = 'box-shadow 0.3s';
    box.style.boxShadow = '0 0 0 3px rgba(218,13,23,0.35)';
    setTimeout(() => { box.style.boxShadow = ''; }, 2600);
  }
  if (motivoEl) setTimeout(() => motivoEl.focus(), 350);

  const tent = document.getElementById('map-select-tentativa')?.value || '1';
  showToast(`${item.lojaNome} — ${tent}ª tentativa. Escolha a causa para registrar.`, 'info');
};

// Só age quando o registro veio do atalho do Planejamento. No uso normal do
// formulário, escolher a causa não grava nada: o usuário clica em "Registrar".
window.aoEscolherMotivoMapeamento = function () {
  const isCustom = typeof verificarMotivoCustomUI === 'function' ? verificarMotivoCustomUI() : false;

  if (!state.mapeamentoRapido) return;

  const motivo = document.getElementById('map-select-motivo')?.value;
  if (!motivo) return;

  // Se o motivo escolhido for OUTRO MOTIVO (DESCREVER), não grava de imediato no clique:
  // desarma o mapeamento rápido e permite que o usuário digite a justificativa
  if (isCustom) {
    state.mapeamentoRapido = false;
    showToast('Por favor, digite os detalhes da justificativa e clique em Registrar Mapeamento.', 'info');
    return;
  }

  state.mapeamentoRapido = false;
  salvarTentativaMapeamento();
};

async function alterarDataPrevistaPlanejamento(lojaId, novaData) {
  const item = state.planejamento.find(p => p.id === lojaId);
  if (!item) return;

  item.proximaPrevista = novaData;
  item.status = getStatusLojaPlanejamento(item, novaData ? novaData.slice(0, 7) : null);
  salvarPlanejamento();

  if (typeof db !== 'undefined' && db) {
    try {
      await db.collection('auditoria_planejamento').doc(lojaId).set(item, { merge: true });
    } catch(e) {
      console.log("Nota Firestore sync date:", e.message);
    }
  }

  showToast(`Data da loja "${item.lojaNome}" salva para ${formatDate(novaData)}!`, 'success');
  
  if (state.currentTab === 'planejamento') renderPlanejamentoTable();
  if (state.currentTab === 'dashboard') renderDashboardCharts();
}

async function alterarAuditorLoja(lojaId, novoAuditor) {
  const item = state.planejamento.find(p => p.id === lojaId);
  if (!item) return;

  item.auditor = novoAuditor;
  salvarPlanejamento();

  if (typeof db !== 'undefined' && db) {
    try {
      await db.collection('auditoria_planejamento').doc(lojaId).set({ auditor: novoAuditor }, { merge: true });
    } catch(e) { 
      console.log("Nota Firestore sync auditor:", e.message); 
    }
  }

  showToast(`Auditor da loja "${item.lojaNome}" alterado para ${novoAuditor}!`, 'success');

  if (state.currentTab === 'planejamento') renderPlanejamentoTable();
  if (state.currentTab === 'dashboard') {
    renderProdutividadeEquipe();
    renderDashboardCharts();
  }
}

async function executarAgendamentoAutomatico() {
  const hoje = new Date();
  const anoAtual = hoje.getFullYear();
  const mesAtualNum = hoje.getMonth();
  const mesAtualStr = String(mesAtualNum + 1).padStart(2, '0');
  const targetMonth = `${anoAtual}-${mesAtualStr}`;

  let agendadosCount = 0;

  state.planejamento.forEach(p => {
    let dataSugerida = '';

    if (p.ultimaData && p.ultimaData.includes('-')) {
      const parts = p.ultimaData.split('-');
      const uYear = parseInt(parts[0], 10);
      const uMonth = parseInt(parts[1], 10) - 1;
      const uDay = parseInt(parts[2], 10);
      const minDate = new Date(uYear, uMonth, uDay + 15);

      const minYear = minDate.getFullYear();
      const minMonth = minDate.getMonth();
      const minMonthStr = String(minMonth + 1).padStart(2, '0');
      const minDayStr = String(minDate.getDate()).padStart(2, '0');

      if (minYear === anoAtual && minMonth === mesAtualNum) {
        dataSugerida = `${minYear}-${minMonthStr}-${minDayStr}`;
      } else if (minDate < hoje) {
        dataSugerida = `${anoAtual}-${mesAtualStr}-15`;
      } else {
        dataSugerida = `${minYear}-${minMonthStr}-${minDayStr}`;
      }
    } else {
      dataSugerida = `${anoAtual}-${mesAtualStr}-15`;
    }

    p.proximaPrevista = dataSugerida;
    p.status = getStatusLojaPlanejamento(p, targetMonth);
    agendadosCount++;
  });

  salvarPlanejamento();

  if (typeof db !== 'undefined' && db) {
    try {
      const batch = db.batch();
      state.planejamento.forEach(p => {
        const ref = db.collection('auditoria_planejamento').doc(p.id);
        batch.set(ref, p, { merge: true });
      });
      await batch.commit();
      console.log(`☁️ Firestore: ${state.planejamento.length} lojas sincronizadas no agendamento automático.`);
    } catch(e) {
      console.log("Aviso no agendamento automático Firestore:", e.message);
    }
  }

  renderPlanejamentoTable();
  if (typeof renderDashboardCharts === 'function') renderDashboardCharts();
  showToast(`⚡ ${agendadosCount} lojas agendadas para o mês vigente respeitando o intervalo de 15 dias!`, 'success');
}

// ============================================================
// 📍 MAPEAMENTO DE TENTATIVAS & LOJAS CRÍTICAS (ESTRITO)
// ============================================================

/**
 * Retorna as lojas críticas:
 * Uma loja é CRÍTICA apenas se possui 2 ou mais tentativas NÃO e AINDA NÃO foi concluída (SIM) no ciclo/mês.
 */
function getLojasCriticas(mesAno = null) {
  const tentativas = state.mapeamento || [];
  let targetMonth = mesAno;
  if (targetMonth === null || targetMonth === undefined) {
    targetMonth = (typeof document !== 'undefined' && (document.getElementById('map-filter-month')?.value || document.getElementById('plan-filter-month')?.value)) || new Date().toISOString().slice(0, 7);
  }

  const lojaStats = {};

  tentativas.forEach(m => {
    if (!m.lojaNome || !m.data) return;
    if (targetMonth && !m.data.startsWith(targetMonth)) return;

    if (!lojaStats[m.lojaNome]) {
      lojaStats[m.lojaNome] = {
        lojaNome: m.lojaNome,
        naoCount: 0,
        temSim: false,
        ultimaTentativa: m.data,
        ultimoMotivo: m.motivo,
        auditor: m.auditor
      };
    }

    const isSim = (m.realizada === 'SIM' || m.realizada === 'Sim');
    const isNao = (m.realizada === 'NÃO' || m.realizada === 'NAO' || m.realizada === 'Nao');

    if (isSim) {
      lojaStats[m.lojaNome].temSim = true;
    }
    if (isNao) {
      lojaStats[m.lojaNome].naoCount++;
      if (m.data >= lojaStats[m.lojaNome].ultimaTentativa) {
        lojaStats[m.lojaNome].ultimaTentativa = m.data;
        lojaStats[m.lojaNome].ultimoMotivo = m.motivo;
        lojaStats[m.lojaNome].auditor = m.auditor;
      }
    }
  });

  const criticas = [];
  Object.values(lojaStats).forEach(stat => {
    if (stat.naoCount >= 2 && !stat.temSim) {
      criticas.push({
        lojaNome: stat.lojaNome,
        count: stat.naoCount,
        ultimaTentativa: stat.ultimaTentativa,
        ultimoMotivo: stat.ultimoMotivo,
        auditor: stat.auditor
      });
    }
  });

  return criticas;
}

function getLojasCriticasIds(mesAno = null) {
  return getLojasCriticas(mesAno).map(c => c.lojaNome);
}

function atualizarBadgesLojasCriticas() {
  const monthVal = document.getElementById('map-filter-month')?.value || '';
  const criticas = getLojasCriticas(monthVal || undefined);
  const total = criticas.length;

  const badgeNav = document.getElementById('badge-lojas-criticas');
  if (badgeNav) {
    badgeNav.textContent = `⚠️ ${total}`;
    badgeNav.classList.toggle('hidden', total === 0);
  }

  const tagCount = document.getElementById('tag-count-criticas');
  if (tagCount) {
    tagCount.textContent = total;
  }
}

function toggleFiltroLojasCriticas() {
  state.mapFilterCriticas = !state.mapFilterCriticas;
  const btn = document.getElementById('btn-filtro-lojas-criticas');
  if (btn) {
    btn.classList.toggle('active', state.mapFilterCriticas);
  }
  renderMapeamentoTable();
  if (state.mapFilterCriticas) {
    showToast('Filtro ativado: Exibindo apenas Lojas Críticas (2+ tentativas não realizadas e não concluídas).', 'info');
  }
}

function toggleMapMotivoUI() {
  const val = document.getElementById('map-select-realizada')?.value;
  const isNao = val === 'NÃO' || val === 'NAO';
  const box = document.getElementById('map-motivo-box');
  if (box) box.classList.toggle('hidden', !isNao);

  if (!isNao) {
    const customBox = document.getElementById('map-motivo-custom-box');
    if (customBox) customBox.classList.add('hidden');
  } else {
    verificarMotivoCustomUI();
  }
}

function verificarMotivoCustomUI() {
  const motivo = document.getElementById('map-select-motivo')?.value;
  const customBox = document.getElementById('map-motivo-custom-box');
  const isCustom = motivo === 'OUTRO MOTIVO (DESCREVER)';
  if (customBox) {
    customBox.classList.toggle('hidden', !isCustom);
    if (isCustom) {
      const input = document.getElementById('map-input-motivo-custom');
      if (input) setTimeout(() => input.focus(), 150);
    }
  }
  return isCustom;
}

function sugerirProximaTentativaLoja() {
  const lojaNome = document.getElementById('map-select-loja')?.value;
  if (!lojaNome) return;

  const monthVal = document.getElementById('map-filter-month')?.value || new Date().toISOString().slice(0, 7);

  const tentativasNao = (state.mapeamento || []).filter(m => 
    m.lojaNome === lojaNome && 
    (m.realizada === 'NÃO' || m.realizada === 'NAO') &&
    (!monthVal || (m.data && m.data.startsWith(monthVal)))
  );

  const proxTentativa = Math.min(tentativasNao.length + 1, 5);
  const selectTentativa = document.getElementById('map-select-tentativa');
  if (selectTentativa) {
    selectTentativa.value = String(proxTentativa);
  }

  if (tentativasNao.length >= 1) {
    showToast(`Loja ${lojaNome} possui ${tentativasNao.length} tentativa(s) sem sucesso no período. Sugerida ${proxTentativa}ª tentativa.`, 'warning');
  }
}

function renderMapeamentoTable() {
  const tbody = document.getElementById('mapeamento-table-body');
  if (!tbody) return;

  atualizarBadgesLojasCriticas();

  const search = document.getElementById('map-search-input')?.value.toLowerCase() || '';
  const monthVal = document.getElementById('map-filter-month')?.value || '';

  const criticasMap = {};
  getLojasCriticas(monthVal || undefined).forEach(c => { criticasMap[c.lojaNome] = c; });

  let filtrados = (state.mapeamento || []).filter(m => {
    const matchSearch = m.lojaNome.toLowerCase().includes(search) || (m.motivo && m.motivo.toLowerCase().includes(search));
    const matchMonth = !monthVal || (m.data && m.data.startsWith(monthVal));
    const matchCritica = !state.mapFilterCriticas || (criticasMap[m.lojaNome] !== undefined);
    return matchSearch && matchMonth && matchCritica;
  });

  if (filtrados.length === 0) {
    tbody.innerHTML = `<tr><td colspan="7" style="text-align:center; padding:24px; color:var(--text-muted);">
      ${state.mapFilterCriticas ? '🎉 Nenhuma loja crítica encontrada no momento!' : 'Nenhum registro de mapeamento encontrado.'}
    </td></tr>`;
    return;
  }

  tbody.innerHTML = filtrados.map(m => {
    const isCritica = criticasMap[m.lojaNome] !== undefined;
    const isNao = (m.realizada === 'NÃO' || m.realizada === 'NAO');
    const badgeCritica = isCritica ? `<span style="background:#DA0D17; color:#fff; font-size:0.7rem; font-weight:700; padding:2px 6px; border-radius:4px; margin-left:6px;">⚠️ CRÍTICA</span>` : '';

    return `<tr>
      <td>${formatDate(m.data)}</td>
      <td style="font-weight:700;">
        ${m.lojaNome} ${badgeCritica}
      </td>
      <td>${m.nTentativa}ª tentativa (${m.semana || 'Semana 1'})</td>
      <td><span class="status-tag ${m.realizada === 'SIM' ? 'concluida' : 'atrasada'}">${m.realizada}</span></td>
      <td style="${isNao ? 'color:#DA0D17; font-weight:600;' : ''}">${m.motivo || '-'}</td>
      <td>${m.auditor || 'Auditor'}</td>
      <td style="text-align:center;">
        <button class="icon-btn" title="Remover este registro de mapeamento"
                onclick="removerMapeamento('${String(m.id).replace(/'/g, "\\'")}')"
                style="color:var(--sp-red); width:32px; height:32px;">
          <i class="ph ph-trash"></i>
        </button>
      </td>
    </tr>`;
  }).join('');
}

// Recalcula a ultimaData do planejamento a partir do que sobrou no mapeamento.
// Sem isso, apagar a auditoria realizada de uma loja deixaria o Planejamento
// afirmando uma data de visita que nao existe mais em lugar nenhum.
async function recalcularUltimaDataDaLoja(lojaNome) {
  const plan = (state.planejamento || []).find(p => p.lojaNome === lojaNome);
  if (!plan) return;

  const datas = (state.mapeamento || [])
    .filter(m => m.lojaNome === lojaNome && (m.realizada === 'SIM' || m.realizada === 'Sim'))
    .map(m => m.data)
    .filter(Boolean)
    .sort();

  const nova = datas.length ? datas[datas.length - 1] : '';
  if ((plan.ultimaData || '') === nova) return;

  plan.ultimaData = nova;
  salvarPlanejamento();

  if (typeof db !== 'undefined' && db) {
    try {
      await db.collection('auditoria_planejamento').doc(plan.id).update({ ultimaData: nova });
    } catch (e) {
      console.error('Erro ao recalcular ultimaData:', e);
    }
  }
}

window.removerMapeamento = async function (id) {
  const reg = (state.mapeamento || []).find(m => String(m.id) === String(id));
  if (!reg) {
    showToast('Registro não encontrado.', 'error');
    return;
  }

  const resumo = `${reg.lojaNome}\n` +
    `Data: ${formatDate(reg.data)}\n` +
    `Tentativa: ${reg.nTentativa}ª  |  Realizada: ${reg.realizada}\n` +
    (reg.motivo ? `Causa: ${reg.motivo}\n` : '') +
    `Auditor: ${reg.auditor || '-'}`;

  if (!confirm(`Remover este registro de mapeamento?\n\n${resumo}\n\nA ação não pode ser desfeita.`)) return;

  if (typeof db !== 'undefined' && db) {
    try {
      await db.collection('auditoria_mapeamento').doc(String(reg.id)).delete();
    } catch (e) {
      console.error('Erro ao remover mapeamento:', e);
      showToast('Não foi possível remover: ' + (e.code || e.message), 'error');
      return;   // nao mexe no estado local se a nuvem recusou
    }
  }

  state.mapeamento = (state.mapeamento || []).filter(m => String(m.id) !== String(reg.id));
  salvarMapeamento();

  await recalcularUltimaDataDaLoja(reg.lojaNome);

  renderMapeamentoTable();
  renderPlanejamentoTable();
  if (state.currentTab === 'dashboard') renderDashboardCharts();

  showToast(`Registro de ${reg.lojaNome} removido.`, 'info');
};

async function salvarTentativaMapeamento() {
  const loja = document.getElementById('map-select-loja')?.value;
  const data = document.getElementById('map-input-data')?.value || new Date().toISOString().slice(0, 10);
  const realizada = document.getElementById('map-select-realizada')?.value || 'SIM';
  let motivo = document.getElementById('map-select-motivo')?.value;
  const auditor = document.getElementById('map-select-auditor')?.value || (state.usuarios && state.usuarios[0] ? state.usuarios[0].nome : 'Auditor');
  const nTentativa = parseInt(document.getElementById('map-select-tentativa')?.value || '1', 10);

  if (!loja) {
    showToast('Selecione uma loja.', 'error');
    return;
  }

  if (realizada === 'NÃO' || realizada === 'NAO') {
    if (!motivo) {
      showToast('Informe a causa quando a resposta for NÃO.', 'error');
      return;
    }
    if (motivo === 'OUTRO MOTIVO (DESCREVER)') {
      const customTexto = document.getElementById('map-input-motivo-custom')?.value.trim();
      if (!customTexto) {
        showToast('Por favor, descreva a justificativa da não realização.', 'error');
        document.getElementById('map-input-motivo-custom')?.focus();
        return;
      }
      motivo = customTexto;
    }
  }

  const dayOfMonth = new Date(data).getDate();
  let semanaStr = 'Semana 1';
  if (dayOfMonth > 21) semanaStr = 'Semana 4';
  else if (dayOfMonth > 14) semanaStr = 'Semana 3';
  else if (dayOfMonth > 7) semanaStr = 'Semana 2';

  const nova = {
    id: 'MAP_' + Date.now(),
    lojaNome: loja,
    data,
    realizada,
    motivo: realizada === 'SIM' ? 'Auditoria Concluída' : motivo,
    auditor,
    nTentativa,
    semana: semanaStr
  };

  state.mapeamento.unshift(nova);
  salvarMapeamento();

  // Limpar campo customizado se houver
  const customInput = document.getElementById('map-input-motivo-custom');
  if (customInput) customInput.value = '';
  const customBox = document.getElementById('map-motivo-custom-box');
  if (customBox) customBox.classList.add('hidden');

  if (typeof db !== 'undefined' && db) {
    try {
      await db.collection('auditoria_mapeamento').doc(nova.id).set(nova);
    } catch(e) {
      console.log("Nota Firestore mapeamento sync:", e.message);
    }
  }

  if (realizada === 'SIM') {
    const plan = (state.planejamento || []).find(p => p.lojaNome === loja);
    if (plan) {
      plan.ultimaData = data;
      plan.status = 'CONCLUIDA';
      if (plan.proximaPrevista && plan.proximaPrevista <= data) {
        plan.proximaPrevista = '';
      }
      salvarPlanejamento();

      if (typeof db !== 'undefined' && db) {
        try {
          await db.collection('auditoria_planejamento').doc(plan.id).set(plan, { merge: true });
        } catch(e) {
          console.log("Nota Firestore planejamento sync:", e.message);
        }
      }
    }
  }

  renderMapeamentoTable();
  renderPlanejamentoTable();
  if (state.currentTab === 'dashboard') renderDashboardCharts();

  showToast(`Tentativa de visita registrada para ${loja} (${realizada})!`, 'success');
}

// ============================================================
// 📋 TAREFAS DA EQUIPE: KANBAN & CLICKUP MODALS
// ============================================================

function setKanbanFilter(mode) {
  state.kanbanFilterMode = mode;
  document.querySelectorAll('#view-tarefas .filter-pill-btn').forEach(b => b.classList.remove('active'));

  if (mode === 'TODOS') document.getElementById('kanban-filter-todos')?.classList.add('active');
  if (mode === '30_DIAS') document.getElementById('kanban-filter-30d')?.classList.add('active');
  if (mode === 'OCULTAR_CONCLUIDAS') document.getElementById('kanban-filter-ocultar')?.classList.add('active');

  renderKanbanBoard();
}

function renderKanbanBoard() {
  const cols = {
    PENDENTE: document.getElementById('kanban-col-pendente'),
    EM_ANDAMENTO: document.getElementById('kanban-col-andamento'),
    CONCLUIDO: document.getElementById('kanban-col-concluido')
  };
  const counts = { PENDENTE: 0, EM_ANDAMENTO: 0, CONCLUIDO: 0 };
  Object.values(cols).forEach(c => { if (c) c.innerHTML = ''; });

  const respFilter = document.getElementById('kanban-filter-responsavel')?.value || '';
  const now = new Date();
  const trintaDiasAtras = new Date(now.getTime() - (30 * 24 * 60 * 60 * 1000));

  let tarefasFiltradas = state.tarefas.filter(t => {
    if (respFilter && t.responsavel !== respFilter && (!t.responsaveis || !t.responsaveis.includes(respFilter))) {
      return false;
    }

    if (state.kanbanFilterMode === 'OCULTAR_CONCLUIDAS' && t.status === 'CONCLUIDO') {
      return false;
    }

    if (state.kanbanFilterMode === '30_DIAS' && t.status === 'CONCLUIDO') {
      const d = t.prazo ? new Date(t.prazo) : (t.criadaEm ? new Date(t.criadaEm) : null);
      if (d && d < trintaDiasAtras) return false;
    }

    return true;
  });

  tarefasFiltradas.forEach(t => {
    const st = (t.status === 'IMPEDIMENTO' || !t.status) ? 'PENDENTE' : t.status;
    if (!cols[st]) return;
    counts[st]++;

    const card = document.createElement('div');
    card.className = 'kanban-card';
    card.draggable = true;
    card.id = 'demanda-card-' + t.id;
    card.ondragstart = (e) => dragKanban(e, t.id);
    card.onclick = () => openModalDetalheDemanda(t.id);

    const subtasksArr = t.subtarefas || t.subtasks || [];
    const subtarefasTotal = subtasksArr.length;
    const subtarefasFeitas = subtasksArr.filter(s => s.concluida || s.done).length;
    const checklistInfo = subtarefasTotal > 0 ? `<span style="font-size:0.75rem; color:var(--text-muted);"><i class="ph ph-check-square"></i> ${subtarefasFeitas}/${subtarefasTotal}</span>` : '';

    card.innerHTML = `
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:6px;">
        <span class="status-badge ${t.prioridade === 'Alta' ? 'atrasada' : (t.prioridade === 'Baixa' ? 'concluida' : 'pendente')}">${t.prioridade || 'Média'}</span>
        ${checklistInfo}
      </div>
      <div class="kanban-card-title">${t.titulo}</div>
      <div class="kanban-card-meta">
        <span><i class="ph ph-user"></i> ${t.responsavel || t.demandante || 'Equipe'}</span>
        <span><i class="ph ph-calendar"></i> ${formatDate(t.prazo)}</span>
      </div>
    `;

    cols[st].appendChild(card);
  });

  const countPen = document.getElementById('count-pendente');
  const countAnd = document.getElementById('count-andamento');
  const countCon = document.getElementById('count-concluido');
  if (countPen) countPen.textContent = counts.PENDENTE;
  if (countAnd) countAnd.textContent = counts.EM_ANDAMENTO;
  if (countCon) countCon.textContent = counts.CONCLUIDO;
}

function allowDropKanban(e) { e.preventDefault(); e.currentTarget.classList.add('drag-over'); }
function leaveDropKanban(e) { e.currentTarget.classList.remove('drag-over'); }
function dragKanban(e, id) { e.dataTransfer.setData('text/plain', id); }

async function dropKanban(e, novoStatus) {
  e.preventDefault();
  e.currentTarget.classList.remove('drag-over');
  const id = e.dataTransfer.getData('text/plain');
  if (id) {
    await moverEstagioDemanda(id, novoStatus);
  }
}

async function moverEstagioDemanda(id, novoStatus) {
  const item = state.tarefas.find(t => t.id === id);
  if (!item) return;

  item.status = novoStatus;
  salvarTarefas();

  if (typeof db !== 'undefined' && db) {
    try {
      await db.collection('tarefas_equipe').doc(id).update({ status: novoStatus });
    } catch(e) {
      console.log("Nota Firestore tarefa status:", e.message);
    }
  }

  renderKanbanBoard();

  const cardEl = document.getElementById('demanda-card-' + id);
  if (cardEl) {
    cardEl.classList.add('card-book-flip');
    setTimeout(() => cardEl.classList.remove('card-book-flip'), 500);
  }

  showToast(`Demanda movida para ${novoStatus === 'EM_ANDAMENTO' ? 'Em Andamento' : (novoStatus === 'CONCLUIDO' ? 'Concluído' : 'Pendente')}!`, 'success');
}

function openModalNovaDemanda() {
  subtarefasCriacaoTemp = [];

  const tituloEl = document.getElementById('dem-titulo');
  const descEl = document.getElementById('dem-descricao');
  const demandanteEl = document.getElementById('dem-demandante');
  const prazoEl = document.getElementById('dem-prazo');
  const statusEl = document.getElementById('dem-status');
  const linkEl = document.getElementById('dem-link');

  if (tituloEl) tituloEl.value = '';
  if (descEl) descEl.value = '';
  if (demandanteEl) demandanteEl.value = state.usuarios && state.usuarios[0] ? state.usuarios[0].nome : 'Auditor';
  if (prazoEl) prazoEl.value = new Date().toISOString().slice(0, 10);
  if (statusEl) statusEl.value = 'PENDENTE';
  if (linkEl) linkEl.value = '';

  const respSelect = document.getElementById('dem-responsavel');
  if (respSelect) {
    respSelect.innerHTML = '';
    const lista = (state.usuarios && state.usuarios.length > 0) ? state.usuarios : [{ nome: 'Auditor' }];
    lista.forEach(u => {
      respSelect.innerHTML += `<option value="${u.nome}">${u.nome}</option>`;
    });
  }

  renderSubtarefasCriacao();

  const modal = document.getElementById('modal-demanda');
  if (modal) {
    modal.classList.remove('hidden');
    modal.classList.add('active');
  }
}

function closeModalNovaDemanda() {
  subtarefasCriacaoTemp = [];
  const modal = document.getElementById('modal-demanda');
  if (modal) {
    modal.classList.add('hidden');
    modal.classList.remove('active');
  }
}

function adicionarSubtarefaCriacao() {
  const input = document.getElementById('dem-checklist-input');
  const texto = input?.value.trim();
  if (!texto) return;

  subtarefasCriacaoTemp.push({ id: 'SUB_' + Date.now(), texto, concluida: false });
  input.value = '';
  renderSubtarefasCriacao();
}

function removerSubtarefaCriacao(idx) {
  subtarefasCriacaoTemp.splice(idx, 1);
  renderSubtarefasCriacao();
}

function renderSubtarefasCriacao() {
  const container = document.getElementById('dem-checklist-items');
  if (!container) return;

  if (subtarefasCriacaoTemp.length === 0) {
    container.innerHTML = `<span style="font-size:0.78rem; color:var(--text-muted);">Nenhuma sub-tarefa adicionada ao checklist.</span>`;
    return;
  }

  container.innerHTML = subtarefasCriacaoTemp.map((s, idx) => `
    <div style="display:flex; align-items:center; justify-content:space-between; padding:6px 12px; background:var(--bg-surface); border:1px solid var(--border-color); border-radius:var(--r-md);">
      <span style="font-size:0.84rem; color:var(--text-main);"><i class="ph ph-check"></i> ${s.texto}</span>
      <button type="button" class="icon-btn" style="width:24px; height:24px; color:var(--sp-red);" onclick="removerSubtarefaCriacao(${idx})">
        <i class="ph ph-trash"></i>
      </button>
    </div>
  `).join('');
}

async function salvarNovaDemanda() {
  const titulo = document.getElementById('dem-titulo')?.value.trim();
  if (!titulo) {
    showToast('Informe o título da demanda ou projeto.', 'error');
    return;
  }

  const demandanteVal = document.getElementById('dem-demandante')?.value.trim() || 'Equipe';
  const responsavelVal = document.getElementById('dem-responsavel')?.value || demandanteVal;
  const prazoVal = document.getElementById('dem-prazo')?.value || new Date().toISOString().slice(0, 10);
  const statusVal = document.getElementById('dem-status')?.value || 'PENDENTE';
  const descVal = document.getElementById('dem-descricao')?.value.trim() || '';
  const linkVal = document.getElementById('dem-link')?.value.trim() || '';

  const nova = {
    id: 'DEM_' + Date.now(),
    titulo,
    descricao: descVal,
    demandante: demandanteVal,
    responsavel: responsavelVal,
    responsaveis: [responsavelVal],
    prazo: prazoVal,
    prioridade: 'Média',
    status: statusVal,
    link: linkVal,
    criadaEm: new Date().toISOString().slice(0, 10),
    subtarefas: [...subtarefasCriacaoTemp]
  };

  if (!state.tarefas) state.tarefas = [];
  state.tarefas.unshift(nova);
  salvarTarefas();

  if (typeof db !== 'undefined' && db) {
    try {
      await db.collection('tarefas_equipe').doc(nova.id).set(nova);
    } catch(e) {
      console.log("Nota Firestore salvar demanda:", e.message);
    }
  }

  closeModalNovaDemanda();
  renderKanbanBoard();
  showToast(`Demanda "${nova.titulo}" registrada com sucesso!`, 'success');
}

function openModalDetalheDemanda(id) {
  const item = state.tarefas.find(t => t.id === id);
  if (!item) return;

  state.activeDemandaId = id;

  const dtlTitulo = document.getElementById('dtl-titulo');
  const dtlDesc = document.getElementById('dtl-descricao');
  const dtlStatus = document.getElementById('dtl-status-select');
  const dtlMeta = document.getElementById('dtl-meta-info');
  const dtlBadge = document.getElementById('dtl-prioridade-badge');
  const dtlLink = document.getElementById('dtl-link-anexo');

  if (dtlTitulo) dtlTitulo.textContent = item.titulo;
  if (dtlDesc) dtlDesc.textContent = item.descricao || 'Sem descrição informada.';
  if (dtlStatus) dtlStatus.value = (item.status === 'IMPEDIMENTO' ? 'PENDENTE' : item.status) || 'PENDENTE';

  if (dtlMeta) {
    dtlMeta.innerHTML = `<i class="ph ph-user"></i> <strong>${item.responsavel || item.demandante || 'Equipe'}</strong> &nbsp;|&nbsp; <i class="ph ph-calendar"></i> Prazo: ${formatDate(item.prazo)}`;
  }

  if (dtlBadge) {
    dtlBadge.textContent = item.prioridade || 'Média';
    dtlBadge.className = 'status-badge ' + (item.prioridade === 'Alta' ? 'atrasada' : (item.prioridade === 'Baixa' ? 'concluida' : 'pendente'));
  }

  if (dtlLink) {
    if (item.link) {
      dtlLink.href = item.link;
      dtlLink.classList.remove('hidden');
    } else {
      dtlLink.classList.add('hidden');
    }
  }

  renderSubtarefasDetalhe(item);

  const modal = document.getElementById('modal-detalhe-demanda');
  if (modal) {
    modal.classList.remove('hidden');
    modal.classList.add('active');
  }
}

function closeModalDetalheDemanda() {
  state.activeDemandaId = null;
  const modal = document.getElementById('modal-detalhe-demanda');
  if (modal) {
    modal.classList.add('hidden');
    modal.classList.remove('active');
  }
}

function renderSubtarefasDetalhe(item) {
  const container = document.getElementById('dtl-subtasks-list');
  const countLabel = document.getElementById('dtl-subtask-count');
  const progressBar = document.getElementById('dtl-progress-bar');
  if (!container) return;

  const subtarefas = item.subtarefas || item.subtasks || [];
  const total = subtarefas.length;
  const concluidas = subtarefas.filter(s => s.concluida || s.done).length;
  const pct = total > 0 ? Math.round((concluidas / total) * 100) : 0;

  if (countLabel) countLabel.textContent = `${pct}% (${concluidas}/${total})`;
  if (progressBar) progressBar.style.width = `${pct}%`;

  if (subtarefas.length === 0) {
    container.innerHTML = `<p style="font-size:0.8rem; color:var(--text-muted); padding:4px 0;">Nenhuma sub-tarefa cadastrada no checklist.</p>`;
    return;
  }

  container.innerHTML = subtarefas.map((s, idx) => {
    const isDone = s.concluida || s.done;
    const txt = s.texto || s.text || '';
    return `
      <div style="display:flex; align-items:center; justify-content:space-between; padding:8px 12px; background:var(--bg-surface-2); border:1px solid var(--border-color); border-radius:var(--r-md);">
        <label style="display:flex; align-items:center; gap:10px; font-size:0.86rem; cursor:pointer; flex:1; ${isDone ? 'text-decoration:line-through; color:var(--text-muted);' : 'color:var(--text-main);'}">
          <input type="checkbox" ${isDone ? 'checked' : ''} onchange="toggleSubtarefaNoDetalhe(${idx})" />
          <span>${txt}</span>
        </label>
        <button type="button" class="icon-btn" style="width:26px; height:26px; font-size:0.8rem; color:var(--sp-red);" onclick="removerSubtarefaNoDetalhe(${idx})">
          <i class="ph ph-trash"></i>
        </button>
      </div>
    `;
  }).join('');
}

async function adicionarSubtarefaNoDetalhe() {
  const input = document.getElementById('dtl-new-subtask-input');
  const texto = input?.value.trim();
  if (!texto || !state.activeDemandaId) return;

  const item = state.tarefas.find(t => t.id === state.activeDemandaId);
  if (!item) return;

  if (!item.subtarefas) item.subtarefas = [];
  item.subtarefas.push({ id: 'SUB_' + Date.now(), texto, concluida: false });

  salvarTarefas();
  input.value = '';

  if (typeof db !== 'undefined' && db) {
    try { await db.collection('tarefas_equipe').doc(item.id).update({ subtarefas: item.subtarefas }); } catch(e){}
  }

  renderSubtarefasDetalhe(item);
  renderKanbanBoard();
}

async function toggleSubtarefaNoDetalhe(idx) {
  if (!state.activeDemandaId) return;
  const item = state.tarefas.find(t => t.id === state.activeDemandaId);
  if (!item) return;

  const subArr = item.subtarefas || item.subtasks;
  if (!subArr || !subArr[idx]) return;

  if (subArr[idx].concluida !== undefined) {
    subArr[idx].concluida = !subArr[idx].concluida;
  } else {
    subArr[idx].done = !subArr[idx].done;
  }

  salvarTarefas();

  if (typeof db !== 'undefined' && db) {
    try { await db.collection('tarefas_equipe').doc(item.id).update({ subtarefas: subArr }); } catch(e){}
  }

  renderSubtarefasDetalhe(item);
  renderKanbanBoard();
}

async function removerSubtarefaNoDetalhe(idx) {
  if (!state.activeDemandaId) return;
  const item = state.tarefas.find(t => t.id === state.activeDemandaId);
  if (!item) return;

  const subArr = item.subtarefas || item.subtasks;
  if (!subArr) return;

  subArr.splice(idx, 1);
  salvarTarefas();

  if (typeof db !== 'undefined' && db) {
    try { await db.collection('tarefas_equipe').doc(item.id).update({ subtarefas: subArr }); } catch(e){}
  }

  renderSubtarefasDetalhe(item);
  renderKanbanBoard();
}

async function alterarStatusDemandaDetalhe(novoStatus) {
  if (!state.activeDemandaId) return;
  const item = state.tarefas.find(t => t.id === state.activeDemandaId);
  if (!item) return;

  item.status = novoStatus;
  salvarTarefas();

  if (typeof db !== 'undefined' && db) {
    try { await db.collection('tarefas_equipe').doc(item.id).update({ status: novoStatus }); } catch(e){}
  }

  renderKanbanBoard();

  const cardEl = document.getElementById('demanda-card-' + item.id);
  if (cardEl) {
    cardEl.classList.add('card-book-flip');
    setTimeout(() => cardEl.classList.remove('card-book-flip'), 500);
  }

  showToast(`Status atualizado para ${novoStatus}!`, 'success');
}

async function excluirDemandaDetalhe() {
  if (!state.activeDemandaId) return;
  const item = state.tarefas.find(t => t.id === state.activeDemandaId);
  if (!item) return;

  if (!confirm(`Deseja realmente excluir a demanda "${item.titulo}"?`)) return;

  state.tarefas = state.tarefas.filter(t => t.id !== item.id);
  salvarTarefas();

  if (typeof db !== 'undefined' && db) {
    try { await db.collection('tarefas_equipe').doc(item.id).delete(); } catch(e){}
  }

  closeModalDetalheDemanda();
  renderKanbanBoard();
  showToast('Demanda excluída com sucesso.', 'info');
}

// ============================================================
// 📊 DASHBOARD & PRODUTIVIDADE DA EQUIPE
// ============================================================

function setDashFilterStatus(status) {
  state.dashFilterStatus = status;
  ['TODOS', 'RESOLVIDO', 'PENDENTE'].forEach(s => {
    const idMap = { TODOS: 'todos', RESOLVIDO: 'resolvido', PENDENTE: 'pendente' };
    document.getElementById('dash-btn-' + idMap[s])?.classList.remove('active');
  });
  const idMap = { TODOS: 'todos', RESOLVIDO: 'resolvido', PENDENTE: 'pendente' };
  document.getElementById('dash-btn-' + idMap[status])?.classList.add('active');

  renderDashboardCharts();
}

function getDashFilteredPlanejamento() {
  const monthVal = document.getElementById('dash-filter-month')?.value || new Date().toISOString().slice(0, 7);
  const regional = document.getElementById('dash-filter-regional')?.value || '';
  const loja = document.getElementById('dash-filter-loja')?.value || '';

  return (state.planejamento || []).filter(item => {
    // No modo mensal do Dashboard, todas as lojas da rede pertencem ao universo avaliado.
    // O status (CONCLUIDA, ATRASADA, PENDENTE) é calculado dinamicamente por getStatusLojaPlanejamento(item, monthVal).
    let matchMonth = true;

    const matchReg = !regional || item.regional === regional;
    const matchLoja = !loja || item.lojaNome === loja;

    const currentCalculatedStatus = getStatusLojaPlanejamento(item, monthVal);

    let matchStatus = true;
    if (state.dashFilterStatus === 'RESOLVIDO') matchStatus = (currentCalculatedStatus === 'CONCLUIDA');
    if (state.dashFilterStatus === 'PENDENTE') matchStatus = (currentCalculatedStatus !== 'CONCLUIDA');

    return matchMonth && matchReg && matchLoja && matchStatus;
  });
}

// Eventos de mapeamento sob os mesmos filtros do Dashboard.
// O mapeamento nao guarda `regional`, entao a regional vem do planejamento da
// loja - por isso o cruzamento por lojaNome.
function getDashFilteredMapeamento() {
  const monthVal = document.getElementById('dash-filter-month')?.value || new Date().toISOString().slice(0, 7);
  const regional = document.getElementById('dash-filter-regional')?.value || '';
  const loja = document.getElementById('dash-filter-loja')?.value || '';

  const regionalDaLoja = {};
  (state.planejamento || []).forEach(p => {
    if (p.lojaNome) regionalDaLoja[p.lojaNome] = p.regional || '';
  });

  return (state.mapeamento || []).filter(m => {
    if (monthVal && !(m.data || '').startsWith(monthVal)) return false;
    if (loja && m.lojaNome !== loja) return false;
    if (regional && regionalDaLoja[m.lojaNome] !== regional) return false;
    return true;
  });
}

function renderProdutividadeEquipe() {
  const container = document.getElementById('produtividade-members-list');
  if (!container) return;

  const monthVal = document.getElementById('dash-filter-month')?.value || new Date().toISOString().slice(0, 7);

  // Lista unificada de auditores da equipe
  const auditores = getListaAuditoresUnificada();

  // Mapeamento de auditorias realizadas e tentativas por auditor no mês
  const eventosMes = (state.mapeamento || []).filter(m => (m.data || '').startsWith(monthVal));

  const porAuditor = {};
  auditores.forEach(nome => {
    const nomeNorm = nome.trim().toLowerCase();
    const lojasDoAuditor = (state.planejamento || []).filter(p => (p.auditor || '').trim().toLowerCase() === nomeNorm);
    const planejadas = lojasDoAuditor.length;

    // Lojas concluídas pelo auditor no mês
    const concluidasPlan = lojasDoAuditor.filter(p => getStatusLojaPlanejamento(p, monthVal) === 'CONCLUIDA').length;
    const concluidasMap = eventosMes.filter(m => (m.auditor || '').trim().toLowerCase() === nomeNorm && (m.realizada === 'SIM' || m.realizada === 'Sim')).length;
    const realizadas = Math.max(concluidasPlan, concluidasMap);

    const tentativas = eventosMes.filter(m => (m.auditor || '').trim().toLowerCase() === nomeNorm && (m.realizada === 'NÃO' || m.realizada === 'NAO')).length;

    let pct = 0;
    if (planejadas > 0) {
      pct = Math.min(100, Math.round((realizadas / planejadas) * 100));
    } else if (realizadas > 0) {
      pct = 100;
    }

    porAuditor[nome] = { planejadas, realizadas, tentativas, pct };
  });

  // Ordenação: mais realizadas primeiro, depois maior percentual, depois alfabético
  const nomes = Object.keys(porAuditor).sort((a, b) => {
    return (porAuditor[b].realizadas - porAuditor[a].realizadas)
        || (porAuditor[b].pct - porAuditor[a].pct)
        || a.localeCompare(b, 'pt-BR');
  });

  if (nomes.length === 0) {
    container.innerHTML = '<p style="font-size:0.8rem; color:var(--text-muted);">Nenhum auditor encontrado na equipe.</p>';
    return;
  }

  container.innerHTML = nomes.map(nome => {
    const d = porAuditor[nome];
    const plural = d.realizadas === 1 ? 'auditoria realizada' : 'auditorias realizadas';
    const subDesc = d.planejadas > 0
      ? `${d.realizadas} de ${d.planejadas} ${plural}`
      : `${d.realizadas} ${plural}`;
    const semSucesso = d.tentativas > 0
      ? ` · ${d.tentativas} ${d.tentativas === 1 ? 'tentativa sem sucesso' : 'tentativas sem sucesso'}`
      : '';

    return `
      <div class="prod-member-item">
        <div class="prod-member-name">
          <span>${window.escapeHtml ? window.escapeHtml(nome) : nome}</span>
          <span style="color:var(--sp-pistache); font-weight:800;">${d.pct}%</span>
        </div>
        <div style="font-size:0.75rem; color:var(--text-muted);">
          ${subDesc}${semSucesso}
        </div>
        <div class="produtividade-bar-bg">
          <div class="produtividade-bar-fill" style="width: ${d.pct}%;"></div>
        </div>
      </div>
    `;
  }).join('');
}

function renderDashboardCharts() {
  const dashMonthInput = document.getElementById('dash-filter-month');
  if (dashMonthInput && !dashMonthInput.value) {
    dashMonthInput.value = new Date().toISOString().slice(0, 7);
  }

  const monthVal = dashMonthInput?.value || new Date().toISOString().slice(0, 7);
  const filtrados = getDashFilteredPlanejamento();

  // 1. CARDS DE KPI SINCRONIZADOS COM CÁLCULO DINÂMICO
  const totalLojasNoPeriodo = filtrados.length;
  const concluidasCount = filtrados.filter(p => getStatusLojaPlanejamento(p, monthVal) === 'CONCLUIDA').length;
  const atrasadasCount = filtrados.filter(p => getStatusLojaPlanejamento(p, monthVal) === 'ATRASADA').length;
  const pendentesCount = Math.max(0, totalLojasNoPeriodo - concluidasCount);
  const coberturaPct = totalLojasNoPeriodo > 0 ? Math.round((concluidasCount / totalLojasNoPeriodo) * 100) : 0;

  const concEl = document.getElementById('dash-concluidas');
  const pendEl = document.getElementById('dash-pendentes');
  const cobEl = document.getElementById('dash-cobertura');
  const atrEl = document.getElementById('dash-atrasadas');
  const totEl = document.getElementById('dash-total-lojas');

  if (concEl) concEl.textContent = concluidasCount;
  if (pendEl) pendEl.textContent = pendentesCount;
  if (cobEl) cobEl.textContent = `${coberturaPct}%`;
  if (atrEl) atrEl.textContent = atrasadasCount;
  if (totEl) totEl.textContent = totalLojasNoPeriodo;

  renderProdutividadeEquipe();

  // 2. GRÁFICOS DINÂMICOS
  renderChartSemanalDinamico(monthVal);
  renderChartAuditorRoscaDinamico(filtrados);
  renderChartCausasNaoDinamico(monthVal);
  renderChartRegionalDinamico(filtrados);
}

function renderChartSemanalDinamico(monthVal) {
  const ctx = document.getElementById('chart-semanal')?.getContext('2d');
  if (!ctx || typeof Chart === 'undefined') return;
  if (state.charts && state.charts.semanal) state.charts.semanal.destroy();

  const semanasMap = { 'Semana 1': 0, 'Semana 2': 0, 'Semana 3': 0, 'Semana 4': 0 };

  state.mapeamento.filter(m => m.data && m.data.startsWith(monthVal) && (m.realizada === 'SIM')).forEach(m => {
    const dia = parseInt(m.data.split('-')[2], 10) || 1;
    if (dia <= 7) semanasMap['Semana 1']++;
    else if (dia <= 14) semanasMap['Semana 2']++;
    else if (dia <= 21) semanasMap['Semana 3']++;
    else semanasMap['Semana 4']++;
  });

  if (!state.charts) state.charts = {};
  state.charts.semanal = new Chart(ctx, {
    type: 'line',
    data: {
      labels: Object.keys(semanasMap),
      datasets: [{
        label: 'Lojas Auditadas',
        data: Object.values(semanasMap),
        borderColor: '#DA0D17',
        backgroundColor: 'rgba(218,13,23,0.12)',
        fill: true,
        tension: 0.35,
        pointRadius: 6,
        pointBackgroundColor: '#DA0D17'
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        datalabels: {
          color: '#331F10',
          font: { weight: 'bold', size: 11 },
          formatter: (val) => val > 0 ? val : '0'
        }
      },
      scales: {
        y: { beginAtZero: true, ticks: { precision: 0 } }
      }
    },
    plugins: typeof ChartDataLabels !== 'undefined' ? [ChartDataLabels] : []
  });
}

function renderChartAuditorRoscaDinamico(filtrados) {
  const ctx = document.getElementById('chart-auditor-rosca')?.getContext('2d');
  if (!ctx || typeof Chart === 'undefined') return;
  if (state.charts && state.charts.auditorRosca) state.charts.auditorRosca.destroy();

  const monthVal = document.getElementById('dash-filter-month')?.value || new Date().toISOString().slice(0, 7);

  const eventos = getDashFilteredMapeamento()
    .filter(m => m.realizada === 'SIM' || m.realizada === 'Sim');

  const porAuditor = {};
  eventos.forEach(m => {
    const nome = m.auditor || 'Sem auditor';
    porAuditor[nome] = (porAuditor[nome] || 0) + 1;
  });

  const auditoresList = Object.keys(porAuditor)
    .sort((a, b) => (porAuditor[b] - porAuditor[a]) || a.localeCompare(b, 'pt-BR'));
  const counts = auditoresList.map(aud => porAuditor[aud]);

  // Contagem de lojas restantes / pendentes no filtro selecionado do mês
  const restantesCount = (filtrados || []).filter(p => getStatusLojaPlanejamento(p, monthVal) !== 'CONCLUIDA').length;

  const chartLabels = [...auditoresList];
  const chartData = [...counts];

  const paletteAuditores = ['#265D7C', '#4F7043', '#56331B', '#8C7361', '#331F10', '#7E8B92'];
  const bgColors = auditoresList.map((_, idx) => paletteAuditores[idx % paletteAuditores.length]);

  if (restantesCount > 0) {
    chartLabels.push('Lojas Restantes');
    chartData.push(restantesCount);
    bgColors.push('#DA5513');
  }

  if (chartData.length === 0 || chartData.every(v => v === 0)) {
    chartLabels.push('Nenhuma loja no filtro');
    chartData.push(1);
    bgColors.push('#E2D7C5');
  }

  if (!state.charts) state.charts = {};
  state.charts.auditorRosca = new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: chartLabels,
      datasets: [{
        data: chartData,
        backgroundColor: bgColors
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { position: 'bottom', labels: { boxWidth: 12, font: { size: 11 } } },
        datalabels: {
          color: '#ffffff',
          font: { weight: 'bold', size: 11 },
          formatter: (val) => val > 0 ? val : ''
        }
      }
    },
    plugins: typeof ChartDataLabels !== 'undefined' ? [ChartDataLabels] : []
  });
}

function renderChartCausasNaoDinamico(monthVal) {
  const ctx = document.getElementById('chart-causas-nao')?.getContext('2d');
  if (!ctx || typeof Chart === 'undefined') return;
  if (state.charts && state.charts.causasNao) state.charts.causasNao.destroy();

  const causasCount = {};
  state.mapeamento.filter(m => m.data && m.data.startsWith(monthVal) && (m.realizada === 'NÃO' || m.realizada === 'NAO')).forEach(m => {
    const mot = m.motivo || 'OUTRO MOTIVO';
    causasCount[mot] = (causasCount[mot] || 0) + 1;
  });

  const sortedCausas = Object.entries(causasCount).sort((a, b) => b[1] - a[1]).slice(0, 6);
  const labels = sortedCausas.map(c => c[0]);
  const data = sortedCausas.map(c => c[1]);

  if (!state.charts) state.charts = {};
  state.charts.causasNao = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: labels.length > 0 ? labels : ['Sem falhas registradas'],
      datasets: [{
        label: 'Causas',
        data: data.length > 0 ? data : [0],
        backgroundColor: '#DA0D17',
        borderRadius: 4
      }]
    },
    options: {
      indexAxis: 'y',
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        datalabels: {
          color: '#331F10',
          font: { weight: 'bold', size: 10 },
          formatter: (val) => val > 0 ? val : ''
        }
      },
      scales: {
        x: { beginAtZero: true, ticks: { precision: 0 } },
        y: { ticks: { font: { size: 8.5 } } }
      }
    },
    plugins: typeof ChartDataLabels !== 'undefined' ? [ChartDataLabels] : []
  });
}

function renderChartRegionalDinamico(filtrados) {
  const ctx = document.getElementById('chart-regional')?.getContext('2d');
  if (!ctx || typeof Chart === 'undefined') return;
  if (state.charts && state.charts.regional) state.charts.regional.destroy();

  const monthVal = document.getElementById('dash-filter-month')?.value || new Date().toISOString().slice(0, 7);
  const regionais = ['SPAL', 'SPAM', 'SPBA', 'SPCE', 'SPCE 2', 'SPCE 3', 'SPMA', 'SPMT', 'SPPA', 'SPPB', 'SPPE', 'SPPI', 'SPRN', 'SPSE', 'SPSP'];
  const counts = regionais.map(r => filtrados.filter(p => p.regional === r && getStatusLojaPlanejamento(p, monthVal) === 'CONCLUIDA').length);

  if (!state.charts) state.charts = {};
  state.charts.regional = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: regionais,
      datasets: [{
        label: 'Concluídas',
        data: counts,
        backgroundColor: '#4F7043',
        borderRadius: 4
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        datalabels: {
          color: '#331F10',
          font: { weight: 'bold', size: 10 },
          formatter: (val) => val > 0 ? val : ''
        }
      },
      scales: {
        y: { beginAtZero: true, ticks: { precision: 0 } },
        x: { ticks: { font: { size: 8 } } }
      }
    },
    plugins: typeof ChartDataLabels !== 'undefined' ? [ChartDataLabels] : []
  });
}

// ============================================================
// 📝 LANÇAMENTO DE NOTAS
// ============================================================

async function salvarNotaRapida() {
  const loja = document.getElementById('nota-select-loja')?.value;
  const valor = document.getElementById('nota-input-valor')?.value;
  const data = document.getElementById('nota-input-data')?.value || new Date().toISOString().slice(0, 10);
  const auditor = document.getElementById('nota-select-auditor')?.value || (state.usuarios && state.usuarios[0] ? state.usuarios[0].nome : 'Auditor');

  if (!loja || !valor) {
    showToast('Informe a loja e a nota.', 'error');
    return;
  }

  const dayOfMonth = new Date(data).getDate() || 1;
  let semanaStr = 'Semana 1';
  if (dayOfMonth > 21) semanaStr = 'Semana 4';
  else if (dayOfMonth > 14) semanaStr = 'Semana 3';
  else if (dayOfMonth > 7) semanaStr = 'Semana 2';

  const mapItem = {
    id: 'MAP_NOTA_' + Date.now(),
    lojaNome: loja,
    data,
    realizada: 'SIM',
    motivo: `Auditoria Concluída (Nota: ${valor})`,
    auditor,
    nTentativa: 1,
    semana: semanaStr
  };
  state.mapeamento.unshift(mapItem);
  salvarMapeamento();

  if (typeof db !== 'undefined' && db) {
    try {
      await db.collection('auditoria_mapeamento').doc(mapItem.id).set(mapItem);
    } catch(e) {}
  }

  const plan = state.planejamento.find(p => p.lojaNome === loja);
  if (plan) {
    plan.ultimaData = data;
    plan.status = 'CONCLUIDA';
    salvarPlanejamento();

    if (typeof db !== 'undefined' && db) {
      try {
        await db.collection('auditoria_planejamento').doc(plan.id).set(plan, { merge: true });
      } catch(e) {}
    }
  }

  renderPlanejamentoTable();
  renderMapeamentoTable();
  if (state.currentTab === 'dashboard') renderDashboardCharts();

  showToast(`Nota ${valor} registrada para ${loja}!`, 'success');
}

