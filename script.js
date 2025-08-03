// Datos completos de la malla curricular
const malla = {
    "1° Semestre": [
        "Claves del pensamiento filosófico",
        "Sociología",
        "Historia social y política de américa latina",
        "Introducción al trabajo social",
        "Sistemas jurídicos de la intervención social",
        "Habilidades de escritura académica"
    ],
    "2° Semestre": [
        "Psicología",
        "Teoría de la Acción Social",
        "Pobreza e Intervención Social",
        "Habilidades Psicosociales para la Intervención Social",
        "Inglés I",
        "Optativo Formación General",
        "Optativo Formación Teológica"
    ],
    "3° Semestre": [
        "Introducción a la Ciencia Política",
        "Introducción a la Economía",
        "Políticas Sociales",
        "Sujetos de la Acción Social",
        "Lógicas de la Intervención Social",
        "Inglés II",
        "Optativo Formación General",
        "Optativo Formación Teológica"
    ],
    "4° Semestre": [
        "Antropología Sociocultural",
        "Economía Social",
        "Diseño de Proyectos Sociales",
        "Estrategias de Intervención Social",
        "Introducción a las Metodologías de Investigación Social",
        "Optativo Formación General",
        "Optativo Formación Teológica"
    ],
    "5° Semestre": [
        "Intervención Social IA",
        "Trabajo Social y Desarrollo Territorial",
        "Evaluación de Proyectos Sociales",
        "Metodologías de la Investigación Cuantitativa",
        "Optativo Formación Complementaria"
    ],
    "6° Semestre": [
        "Intervención Social IB",
        "Trabajo Social y Salud Mental",
        "Políticas Sociales y Familia",
        "Análisis de Datos Cuantitativos",
        "Optativo Formación Complementaria"
    ],
    "7° Semestre": [
        "Intervención Social IIA",
        "Epistemología",
        "Metodologías de Investigación Cualitativa",
        "Optativo Formación Complementaria"
    ],
    "8° Semestre": [
        "Intervención Social IIB",
        "Ética de la Intervención Social",
        "Análisis de Datos Cualitativos",
        "Optativo Formación Complementaria"
    ],
    "9° Semestre": [
        "Intervención Social IIIA",
        "Seminario de Investigación I"
    ],
    "10° Semestre": [
        "Intervención Social IIIB",
        "Seminario de Investigación II"
    ]
};

// Prerrequisitos completos
const prerrequisitos = {
    "Inglés II": ["Inglés I"],
    "Intervención Social IA": ["Estrategias de Intervención Social", "Habilidades Psicosociales para la Intervención Social"],
    "Evaluación de Proyectos Sociales": ["Diseño de Proyectos Sociales"],
    "Metodologías de la Investigación Cuantitativa": ["Introducción a las Metodologías de Investigación Social"],
    "Intervención Social IB": ["Intervención Social IA"],
    "Análisis de Datos Cuantitativos": ["Metodologías de la Investigación Cuantitativa"],
    "Intervención Social IIA": ["Intervención Social IB"],
    "Metodologías de Investigación Cualitativa": ["Metodologías de la Investigación Cuantitativa"],
    "Intervención Social IIB": ["Intervención Social IIA"],
    "Análisis de Datos Cualitativos": ["Metodologías de Investigación Cualitativa"],
    "Intervención Social IIIA": ["Intervención Social IIB"],
    "Intervención Social IIIB": ["Intervención Social IIIA"],
    "Seminario de Investigación II": ["Seminario de Investigación I"],
};
// Paleta de colores rosas
const colores = {
    fondo: "#FFF0F5",  // Rosa lavanda claro
    semestre: "#FFB6C1",  // Rosa claro
    ramo: "#FFFFFF",  // Blanco
    aprobado: "#FF69B4",  // Rosa caliente
    disponible: "#FFC0CB",  // Rosa pastel
    noDisponible: "#DB7093"  // Rosa viejo
};

let ramosAprobados = new Set();

document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('malla-container');
    container.style.backgroundColor = colores.fondo;

    // Generar malla
    for (const [semestre, ramos] of Object.entries(malla)) {
        const semestreDiv = document.createElement('div');
        semestreDiv.className = 'semestre';
        semestreDiv.style.backgroundColor = colores.semestre;
        semestreDiv.innerHTML = `<h2>${semestre}</h2>`;
        
        ramos.forEach(ramo => {
            const ramoElement = document.createElement('div');
            ramoElement.className = 'ramo';
            ramoElement.textContent = ramo;
            ramoElement.style.backgroundColor = colores.ramo;
            ramoElement.dataset.nombre = ramo;
            
            ramoElement.addEventListener('click', () => {
                if (!ramoElement.classList.contains('no-disponible')) {
                    ramoElement.classList.toggle('aprobado');
                    ramoElement.style.backgroundColor = ramoElement.classList.contains('aprobado') 
                        ? colores.aprobado 
                        : colores.ramo;
                    
                    if (ramoElement.classList.contains('aprobado')) {
                        ramosAprobados.add(ramo);
                    } else {
                        ramosAprobados.delete(ramo);
                    }
                    
                    actualizarDisponibilidad();
                }
            });
            
            semestreDiv.appendChild(ramoElement);
        });
        
        container.appendChild(semestreDiv);
    }
    
    cargarProgreso();
});

function actualizarDisponibilidad() {
    document.querySelectorAll('.ramo').forEach(ramoElement => {
        const ramo = ramoElement.dataset.nombre;
        
        ramoElement.classList.remove('disponible', 'no-disponible');
        
        if (ramosAprobados.has(ramo)) {
            ramoElement.style.backgroundColor = colores.aprobado;
            return;
        }
        
        if (prerrequisitos[ramo]) {
            const requisitosCumplidos = prerrequisitos[ramo].every(req => ramosAprobados.has(req));
            
            if (requisitosCumplidos) {
                ramoElement.classList.add('disponible');
                ramoElement.style.backgroundColor = colores.disponible;
            } else {
                ramoElement.classList.add('no-disponible');
                ramoElement.style.backgroundColor = colores.noDisponible;
            }
        }
    });
    
    guardarProgreso();
}

// ... (funciones guardarProgreso() y cargarProgreso() se mantienen igual)