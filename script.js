const ANIOS = Array.from({ length: 35 }, (_, i) => 1990 + i);

const PROVINCIAS = [
    "Álava",
    "Albacete",
    "Alicante",
    "Almería",
    "Asturias",
    "Ávila",
    "Badajoz",
    "Barcelona",
    "Burgos",
    "Cáceres",
    "Cádiz",
    "Cantabria",
    "Castellón",
    "Ciudad Real",
    "Córdoba",
    "Cuenca",
    "Gerona",
    "Granada",
    "Guadalajara",
    "Guipúzcoa",
    "Huelva",
    "Huesca",
    "Islas Balears",
    "Jaén",
    "La Coruña",
    "La Rioja",
    "Las Palmas",
    "León",
    "Lérida",
    "Lugo",
    "Madrid",
    "Málaga",
    "Murcia",
    "Navarra",
    "Orense",
    "Palencia",
    "Pontevedra",
    "Salamanca",
    "Santa Cruz de Tenerife",
    "Segovia",
    "Sevilla",
    "Soria",
    "Tarragona",
    "Teruel",
    "Toledo",
    "Valencia",
    "Valladolid",
    "Vizcaya",
    "Zamora",
    "Zaragoza",
];

const CONDICION = [
    "Conductor",
    "Conductor de moto",
    "Ciclista",
    "Ocupante",
    "Petaon",
    "Conductor de patinete eléctrico",
];

const DATA = {
    edadAccidente: false,
    provincia: false,
    fechaAccidente: false,
    condicion: false,
    tipoColision: false,
    matricula: false,
};

const PROVINCIA_SELECT = document.querySelector("#provincia");
const ANIOS_SELECT = document.querySelector("#anio");
const CONDICION_SELECT = document.querySelector("#condicion");
const FORMULARIO = document.querySelector("form");

function generateOptions(selectElement, options) {
    const optionsHTML = options
        .map((option) => `<option data-prov="${option}">${option}</option>`)
        .join("");
    selectElement.innerHTML += optionsHTML;
}

generateOptions(PROVINCIA_SELECT, PROVINCIAS);
generateOptions(ANIOS_SELECT, ANIOS);
generateOptions(CONDICION_SELECT, CONDICION);

function viewLVL(lvl = 1) {
    const DIV_LVL = document.getElementById(`lvl-${lvl}`);
    DIV_LVL.classList.remove("d-none");
}

FORMULARIO.addEventListener("change", function (e) {
    // ID INPUT : KEY OBJECT
    const fieldMappings = {
        edad: "edadAccidente",
        anio: "fechaAccidente",
        provincia: "provincia",
        condicion: "condicion",
        colision: "tipoColision",
        matricula: "matricula",
    };

    const fieldName = e.target.id;
    const dataKey = fieldMappings[fieldName];

    if (dataKey) {
        DATA[dataKey] = e.target.value;

        if (fieldName === "condicion") {
            handleCondicionChange();
        }
    }

    if (DATA.edadAccidente && DATA.provincia && DATA.fechaAccidente) {
        viewLVL(2);
    }
});

FORMULARIO.addEventListener("submit", function (e) {
    e.preventDefault();
    return;
});

function handleCondicionChange() {
    const divMatricula = document.getElementById("div_matricula");

    if (
        DATA.condicion === "Conductor" ||
        DATA.condicion === "Conductor de moto"
    ) {
        divMatricula.classList.remove("d-none");
    } else {
        console.log(DATA.condicion);
        divMatricula.classList.add("d-none");
    }
}