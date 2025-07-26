const malla = document.getElementById("malla");

const semestres = [
  ["Matemáticas I", "Comprensión y Producción de Textos I", "Ética y Valores", "Cátedra Constitucional", "Humanidades I", "Derecho Constitucional", "Fundamentos de Administración"],
  ["Matemáticas II", "Comprensión y Producción de Textos II", "Fundamentos de Contabilidad", "Derecho de Sociedades", "Fundamentos de Economía", "Teorías Administrativas"],
  ["Estadística I", "Fundamentos de Investigación Científica", "Contabilidad Administrativa y Costos", "Humanidades II", "Microeconomía", "Administración I"],
  ["Estadística II", "Historia Empresarial", "Matemáticas Financieras", "Derecho Laboral", "Macroeconomía", "Administración II"],
  ["Investigación de Operaciones", "Geografía Económica", "Mercados Financieros", "Fundamentos de Mercados", "Gestión Ambiental", "Comportamiento Organizacional", "Negocios Internacionales"],
  ["Gerencia de Operaciones", "Iniciativa Empresarial", "Finanzas I", "Investigación de Mercados", "Gerencia de Sueldos y Salarios", "Sistemas de Información Administrativos", "Curso Libre I"],
  ["Buenas Prácticas de Manufactura", "Finanzas II", "Gerencia de Mercados", "Gerencia del Talento Humano", "Gerencia Estratégica", "Énfasis I", "Curso Libre II"],
  ["Plan de Negocios", "Evaluación de Proyectos", "Seminario de Logística", "Seguridad y Salud del Trabajo", "Decisiones Empresariales", "Énfasis II", "Curso Libre III"],
  ["Seminario Gestión del Conocimiento e Innovación", "Seminario de Auditoria Administrativa", "Seminario de Tributaria", "Desarrollo Económico", "Énfasis III"],
  ["Prácticas Empresariales", "Énfasis IV"]
];

const requisitos = {
  "Matemáticas II": ["Matemáticas I"],
  "Comprensión y Producción de Textos II": ["Comprensión y Producción de Textos I"],
  "Teorías Administrativas": ["Fundamentos de Administración"],
  "Estadística I": ["Matemáticas II"],
  "Fundamentos de Investigación Científica": ["Comprensión y Producción de Textos II"],
  "Contabilidad Administrativa y Costos": ["Fundamentos de Contabilidad"],
  "Humanidades II": ["Humanidades I"],
  "Microeconomía": ["Fundamentos de Economía"],
  "Administración I": ["Teorías Administrativas"],
  "Estadística II": ["Estadística I"],
  "Matemáticas Financieras": ["Contabilidad Administrativa y Costos"],
  "Macroeconomía": ["Microeconomía"],
  "Administración II": ["Administración I"],
  "Investigación de Operaciones": ["Estadística II"],
  "Geografía Económica": ["Historia Empresarial"],
  "Mercados Financieros": ["Matemáticas Financieras"],
  "Comportamiento Organizacional": ["Administración II"],
  "Gerencia de Operaciones": ["Investigación de Operaciones"],
  "Iniciativa Empresarial": ["Geografía Económica"],
  "Finanzas I": ["Mercados Financieros"],
  "Investigación de Mercados": ["Fundamentos de Mercados"],
  "Gerencia de Sueldos y Salarios": ["Comportamiento Organizacional"],
  "Finanzas II": ["Finanzas I"],
  "Gerencia de Mercados": ["Investigación de Mercados"],
  "Evaluación de Proyectos": ["Finanzas II"],
  "Decisiones Empresariales": ["Gerencia Estratégica"]
};

let aprobadas = JSON.parse(localStorage.getItem("aprobadas") || "[]");

semestres.forEach((asignaturas, index) => {
  const columna = document.createElement("div");
  columna.classList.add("semestre");
  columna.innerHTML = `<h2>Semestre ${index + 1}</h2>`;
  asignaturas.forEach(nombre => {
    const div = document.createElement("div");
    div.classList.add("asignatura");
    div.textContent = nombre;
    if (aprobadas.includes(nombre)) div.classList.add("aprobada");

    div.addEventListener("click", () => {
      if (div.classList.contains("bloqueada")) {
        const faltan = requisitos[nombre].filter(r => !aprobadas.includes(r));
        alert(`No puedes aprobar "${nombre}" aún. Te falta(n):\n- ${faltan.join("\n- ")}`);
        return;
      }

      if (div.classList.contains("aprobada")) {
        div.classList.remove("aprobada");
        aprobadas = aprobadas.filter(a => a !== nombre);
      } else {
        div.classList.add("aprobada");
        aprobadas.push(nombre);
        motivar();
      }

      localStorage.setItem("aprobadas", JSON.stringify(aprobadas));
      actualizarBloqueos();
      actualizarProgreso();
    });

    columna.appendChild(div);
  });
  malla.appendChild(columna);
});

function actualizarBloqueos() {
  document.querySelectorAll(".asignatura").forEach(div => {
    const nombre = div.textContent;
    if (requisitos[nombre]) {
      const faltan = requisitos[nombre].filter(r => !aprobadas.includes(r));
      div.classList.toggle("bloqueada", faltan.length > 0);
    }
  });
}

const mensajes = [
  "¡Sigue así! Cada materia cuenta 💪",
  "¡Ya falta poco para lograrlo! 🌈",
  "¡Orgullo total! Vas muy bien ✨",
  "¡Un paso más cerca de tus sueños! 🏆",
  "¡No te rindas, lo estás logrando! 💖"
];

function motivar() {
  const msg = mensajes[Math.floor(Math.random() * mensajes.length)];
  document.getElementById("mensajeMotivacional").textContent = msg;
}

function actualizarProgreso() {
  const total = document.querySelectorAll(".asignatura").length;
  const completadas = aprobadas.length;
  const porcentaje = Math.round((completadas / total) * 100);
  document.getElementById("barraProgreso").style.width = `${porcentaje}%`;
  document.getElementById("porcentajeTexto").textContent = `${porcentaje}% completado`;

  const mensajeFinal = document.getElementById("felicitacionFinal");
  if (porcentaje === 100) {
    mensajeFinal.classList.remove("oculto");
    lanzarConfeti();
  } else {
    mensajeFinal.classList.add("oculto");
  }
}

function lanzarConfeti() {
  const canvas = document.getElementById('confetiCanvas');
  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  let confetis = Array.from({ length: 150 }, () => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height - canvas.height,
    r: Math.random() * 6 + 4,
    d: Math.random() * 50 + 30,
    color: `hsl(${Math.random() * 360}, 70%, 80%)`,
    tilt: Math.random() * 10 - 5
  }));

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    confetis.forEach(c => {
      ctx.beginPath();
      ctx.arc(c.x, c.y, c.r, 0, Math.PI * 2);
      ctx.fillStyle = c.color;
      ctx.fill();
    });
    update();
  }

  function update() {
    confetis.forEach(c => {
      c.y += Math.cos(c.d / 10) + 1;
      c.tilt += Math.sin(c.d / 20);
      if (c.y > canvas.height) {
        c.y = -10;
        c.x = Math.random() * canvas.width;
      }
    });
  }

  let interval = setInterval(draw, 20);
  setTimeout(() => clearInterval(interval), 6000);
}

document.getElementById("descargarDiploma").addEventListener("click", () => {
  const link = document.createElement("a");
  const diploma = `
    <svg width="800" height="600" xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" fill="#fff0f5"/>
      <text x="50%" y="30%" dominant-baseline="middle" text-anchor="middle"
            font-family="Georgia" font-size="32" fill="#c2185b">🎓 DIPLOMA SIMBÓLICO 🎓</text>
      <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle"
            font-family="Arial" font-size="24" fill="#4a148c">¡Por completar toda la malla curricular!</text>
      <text x="50%" y="65%" dominant-baseline="middle" text-anchor="middle"
            font-family="Arial" font-size="18" fill="#7b1fa2">Con esfuerzo, dedicación y amor 💖</text>
    </svg>
  `;
  const blob = new Blob([diploma], { type: "image/svg+xml" });
  link.href = URL.createObjectURL(blob);
  link.download = "Diploma_Simbolico.svg";
  link.click();
});

actualizarBloqueos();
actualizarProgreso();

