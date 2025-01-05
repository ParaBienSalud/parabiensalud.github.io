document.addEventListener("DOMContentLoaded", () => {
  const tips = [
    "Consumir frutas y verduras frescas",
    "Reducir el consumo de azúcar y grasas saturadas",
    "Incluir proteínas magras en tu dieta",
    "Evitar el consumo excesivo de sodio",
    "Beber suficiente agua",
    "Realizar ejercicio regularmente",
    "Mantener una buena calidad del sueño",
    "Practicar técnicas de manejo del estrés",
    "Limitar el consumo de alcohol",
    "Hacer chequeos médicos periódicos"
  ];

  const healthyEatingTips = document.getElementById("healthy-eating-tips");

  // Cargar y manejar las primeras tres casillas
  const firstThreeStates = JSON.parse(localStorage.getItem("first-three-tips")) || [false, false, false];
  for (let i = 0; i < 3; i++) {
    if (firstThreeStates[i] === undefined) firstThreeStates[i] = false; // Manejo de estados faltantes
  }
  localStorage.setItem("first-three-tips", JSON.stringify(firstThreeStates));

  // Generar lista dinámica con checkboxes (desde la cuarta casilla en adelante)
  tips.slice(3).forEach((tip, index) => {
    const actualIndex = index + 3; // Ajustar índice para reflejar los IDs visibles
    const li = document.createElement("li");
    const label = document.createElement("label");
    const checkbox = document.createElement("input");

    checkbox.type = "checkbox";
    checkbox.setAttribute("data-id", `tip-${actualIndex}`);

    // Cargar estado desde localStorage
    const savedState = localStorage.getItem(`tip-${actualIndex}`);
    checkbox.checked = savedState === "true";

    // Guardar cambios en localStorage
    checkbox.addEventListener("change", () => {
      localStorage.setItem(`tip-${actualIndex}`, checkbox.checked);
    });

    label.appendChild(checkbox);
    label.appendChild(document.createTextNode(` ${tip}`));
    li.appendChild(label);
    healthyEatingTips.appendChild(li);
  });

  // Sincronizar estados iniciales para las primeras tres casillas
  for (let i = 0; i < 3; i++) {
    const state = firstThreeStates[i];
    localStorage.setItem(`tip-${i}`, state);
  }

  // Actualizar el estado de las primeras tres casillas en localStorage cuando cambie alguna
  document.addEventListener("change", () => {
    const updatedFirstThreeStates = [];
    for (let i = 0; i < 3; i++) {
      updatedFirstThreeStates.push(localStorage.getItem(`tip-${i}`) === "true");
    }
    localStorage.setItem("first-three-tips", JSON.stringify(updatedFirstThreeStates));
  });
});
