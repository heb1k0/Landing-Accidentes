const ANIOS = Array.from({ length: 35 }, (_, i) => 1990 + i);

let NeedMatricula = false;
let NeedDias = false;

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
    diasBaja: false,
    nombre: false,
    email: false,
    telefono: false,
};

const PROVINCIA_SELECT = document.querySelector("#provincia");
const ANIOS_SELECT = document.querySelector("#anio");
const CONDICION_SELECT = document.querySelector("#condicion");
const FORMULARIO = document.querySelector("form");
const DIAS_DIV = document.querySelector("#dias");

function generateOptions(selectElement, options) {
    const optionsHTML = options
        .map((option) => `<option data-prov="${option}">${option}</option>`)
        .join("");
    selectElement.innerHTML += optionsHTML;
}

generateOptions(PROVINCIA_SELECT, PROVINCIAS);
generateOptions(ANIOS_SELECT, ANIOS);
generateOptions(CONDICION_SELECT, CONDICION);

function viewLVL(lvl = 1, view = true) {
    const DIV_LVL = document.getElementById(`lvl-${lvl}`);
    if (view) DIV_LVL.classList.remove("d-none");
    else DIV_LVL.classList.add("d-none");
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
        dias: "diasBaja",
        nombre: "nombre",
        email: "email",
        telefono: "telefono",
    };

    const fieldName = e.target.id;
    const dataKey = fieldMappings[fieldName];


    if (e.target.name == "radio") {
        if (e.target.id == "si") {
            DIAS_DIV.classList.remove("d-none");
            NeedDias = true;
        } else {
            DIAS_DIV.classList.add("d-none");
            NeedDias = false;
        }

    }

    if (dataKey) {
        DATA[dataKey] = e.target.value;
        // SI es matrcula ponemos todo en mayusculas
        if (fieldName === "matricula") {
            DATA[dataKey] = e.target.value.toUpperCase();
            e.target.value = e.target.value.toUpperCase();
        }
        if (fieldName === "condicion") {
            handleCondicionChange();
        }
    }

    if (e.target.name == "radio") {
        e.target.id === "si" ? viewLVL(3, false) : viewLVL(3);
    }

    if(NeedDias && e.target.id === "dias" && e.target.value !== ""){ 
        viewLVL(3);
    }

    if (DATA.edadAccidente && DATA.provincia && DATA.fechaAccidente) {
        viewLVL(2);
    }
});

FORMULARIO.addEventListener("submit", function (e) {
    e.preventDefault();
    const inputs = document.querySelectorAll("input");
    const selects = document.querySelectorAll("select");
    const invalidInputs = [];
    inputs.forEach((input) => {
        if (input.id == "matricula" && !NeedMatricula) return;
        if (input.id == "dias" && !NeedDias) return;
        if (input.value === "") {
            invalidInputs.push(input);
        }
    });

    selects.forEach((select) => {
        if (select.value === "") {
            invalidInputs.push(select);
        }
    }
    );

    // quitamos todos los eorres
    inputs.forEach((input) => {
        if (input.tagName !== "SELECT") {
            input.classList.remove("is-invalid");
        }

    });
    selects.forEach((select) => {
        select.parentElement.classList.remove("is-invalid");
    });


    if (invalidInputs.length > 0) {
        invalidInputs.forEach((input) => {
            input.classList.remove("is-valid");
            input.classList.add("is-invalid");
            // Si es un select se lo ponemos al div padre
            if (input.tagName === "SELECT") {
                input.parentElement.classList.remove("is-valid");
                input.parentElement.classList.add("is-invalid");
            }
        });
        return;
    }


    // Comprobamos que el email sea valido
    const email = document.getElementById("email");
    const emailValue = email.value;
    const emailRegex = /\S+@\S+\.\S+/;

    email.classList.remove("is-invalid");


    if (!emailRegex.test(emailValue)) {
        email.classList.add("is-invalid");
        return;
    }

    // Comprobamos que el telefono sea valido
    const telefono = document.getElementById("telefono");
    const telefonoValue = telefono.value;
    const telefonoRegex = /^[0-9]{9}$/;
    telefono.classList.remove("is-invalid");
    if (!telefonoRegex.test(telefonoValue)) {
        telefono.classList.add("is-invalid");
        return;
    }

    // Comprobamos que la matricula sea valida
    const matricula = document.getElementById("matricula");
    const matriculaValue = matricula.value;
    const matriculaRegex = /^[0-9]{4}[A-Z]{3}$/;
    matricula.classList.remove("is-invalid");
    if (NeedMatricula && matriculaValue !== "" && !matriculaRegex.test(matriculaValue)) {
        matricula.classList.add("is-invalid");
        return;
    }

    alert("Formulario enviado correctamente");
    console.log("Submit", DATA);
});

function handleCondicionChange() {
    const divMatricula = document.getElementById("div_matricula");

    if (
        DATA.condicion === "Conductor" ||
        DATA.condicion === "Conductor de moto"
    ) {
        divMatricula.classList.remove("d-none");
        divMatricula.querySelector("input").classList.remove("is-valid");
        NeedMatricula = true;
    } else {
        NeedMatricula = false;
        divMatricula.classList.add("d-none");
    }
}