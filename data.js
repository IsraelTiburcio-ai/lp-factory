/* ============================================================
   LP FACTORY · data.js
   Fuente académica: Gimnasio 2 — Modelos de Programación Lineal
   Sección: "Elementos Básicos del Modelo Normativo" (pág. 6)
   Banco de respuestas transcrito del juego de la maestra.
   Terminología de la maestra, sin alteraciones.
   ============================================================ */

window.LP_FACTORY = {
  rounds: 10,

  categories: [
    {
      id: 'variables',
      num: '1',
      label: 'VARIABLES DE DECISIÓN',
      short: 'Variables',
      sub: 'Cantidades desconocidas',
      color: '#2ee6c3',
      desc: 'Cantidades desconocidas que deben encontrarse.',
      icon: '<svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="4" y1="6" x2="20" y2="6"/><circle cx="9" cy="6" r="2.4" fill="#0b1026"/><line x1="4" y1="12" x2="20" y2="12"/><circle cx="15.5" cy="12" r="2.4" fill="#0b1026"/><line x1="4" y1="18" x2="20" y2="18"/><circle cx="7" cy="18" r="2.4" fill="#0b1026"/></svg>'
    },
    {
      id: 'restriccion',
      num: '2',
      label: 'RESTRICCIÓN',
      short: 'Restricción',
      sub: 'Limitan a valores factibles',
      color: '#ff9f43',
      desc: 'Limitan a las variables a valores permisibles (factibles).',
      icon: '<svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="7" width="18" height="10" rx="2"/><path d="M7.5 7l3.2 10M13.3 7l3.2 10"/></svg>'
    },
    {
      id: 'objetivo',
      num: '3',
      label: 'FUNCIÓN OBJETIVO',
      short: 'Función objetivo',
      sub: 'Define la meta del modelo',
      color: '#a78bfa',
      desc: 'Define la meta del modelo: maximizar o minimizar.',
      icon: '<svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="8.5"/><circle cx="12" cy="12" r="4.5"/><circle cx="12" cy="12" r="1" fill="currentColor"/></svg>'
    }
  ],

  items: [
    /* ---------- VARIABLES DE DECISIÓN ---------- */
    {
      id: 'var-solucionan',
      display: { type: 'text', value: 'Se solucionan e interpretan.' },
      cat: 'variables',
      why: 'Respuesta de referencia: VARIABLES DE DECISIÓN.'
    },
    {
      id: 'var-desconocidas',
      display: { type: 'text', value: 'Son cantidades desconocidas que deben encontrarse.' },
      cat: 'variables',
      why: 'Respuesta de referencia: VARIABLES DE DECISIÓN.'
    },
    {
      id: 'var-interpretacion',
      display: { type: 'text', value: 'Se definen para una mejor interpretación.' },
      cat: 'variables',
      why: 'Respuesta de referencia: VARIABLES DE DECISIÓN.'
    },
    {
      id: 'var-tipo-i',
      display: { type: 'text', value: 'xᵢ: número de bolsas de tipo i a producir.' },
      cat: 'variables',
      why: 'Respuesta de referencia: VARIABLES DE DECISIÓN.'
    },
    {
      id: 'var-notacion',
      display: { type: 'formula', value: 'x₁, x₂, x₁₁, x₁₂, y, r...' },
      cat: 'variables',
      why: 'Respuesta de referencia: VARIABLES DE DECISIÓN.'
    },

    /* ---------- RESTRICCIONES ---------- */
    {
      id: 'res-demanda-diez',
      display: { type: 'text', value: 'Se tiene una demanda de 10 bolsas.' },
      cat: 'restriccion',
      why: 'Respuesta de referencia: RESTRICCIÓN.'
    },
    {
      id: 'res-materia-diez',
      display: { type: 'text', value: 'Se tiene disponible 10 metros de materia prima.' },
      cat: 'restriccion',
      why: 'Respuesta de referencia: RESTRICCIÓN.'
    },
    {
      id: 'res-limitantes',
      display: { type: 'text', value: 'Limitantes que ocurren en el problema.' },
      cat: 'restriccion',
      why: 'Respuesta de referencia: RESTRICCIÓN.'
    },
    {
      id: 'res-oferta-cinco',
      display: { type: 'text', value: 'Se tiene que ofertar 5 bolsas.' },
      cat: 'restriccion',
      why: 'Respuesta de referencia: RESTRICCIÓN.'
    },
    {
      id: 'res-no-negativas',
      display: { type: 'text', value: 'No se pueden producir bolsas negativas.' },
      cat: 'restriccion',
      why: 'Respuesta de referencia: RESTRICCIÓN.'
    },
    {
      id: 'res-desigualdades',
      display: { type: 'text', value: 'Se pueden usar desigualdades.' },
      cat: 'restriccion',
      why: 'Respuesta de referencia: RESTRICCIÓN.'
    },
    {
      id: 'res-permisibles',
      display: { type: 'text', value: 'Limiten a las variables de decisión a valores permisibles (factibles).' },
      cat: 'restriccion',
      why: 'Respuesta de referencia: RESTRICCIÓN.'
    },
    {
      id: 'res-general',
      display: { type: 'formula', value: 'a₁x₁ + a₂x₂ ≤ b' },
      cat: 'restriccion',
      why: 'Respuesta de referencia: RESTRICCIÓN.'
    },
    {
      id: 'res-horas',
      display: { type: 'text', value: 'Se dispone de 45 horas disponibles en cada departamento.' },
      cat: 'restriccion',
      why: 'Respuesta de referencia: RESTRICCIÓN.'
    },
    {
      id: 'res-enteros',
      display: { type: 'text', value: 'Las bolsas deben ser valores enteros.' },
      cat: 'restriccion',
      why: 'Respuesta de referencia: RESTRICCIÓN.'
    },

    /* ---------- FUNCIÓN OBJETIVO ---------- */
    {
      id: 'fo-minimizar',
      display: { type: 'text', value: 'Se necesita minimizar los costos de producción.' },
      cat: 'objetivo',
      why: 'Respuesta de referencia: FUNCIÓN OBJETIVO.'
    },
    {
      id: 'fo-maximizar',
      display: { type: 'text', value: 'Se busca maximizar las ganancias de las ventas.' },
      cat: 'objetivo',
      why: 'Respuesta de referencia: FUNCIÓN OBJETIVO.'
    },
    {
      id: 'fo-efectividad',
      display: { type: 'text', value: 'Define la efectividad del modelo.' },
      cat: 'objetivo',
      why: 'Respuesta de referencia: FUNCIÓN OBJETIVO.'
    },
    {
      id: 'fo-general',
      display: { type: 'formula', value: 'max z = c₁x₁ + c₂x₂' },
      cat: 'objetivo',
      why: 'Respuesta de referencia: FUNCIÓN OBJETIVO.'
    },
    {
      id: 'fo-variable-z',
      display: { type: 'text', value: 'Generalmente se usa la variable z.' },
      cat: 'objetivo',
      why: 'Respuesta de referencia: FUNCIÓN OBJETIVO.'
    },
    {
      id: 'fo-en-funcion',
      display: { type: 'text', value: 'Necesariamente debe estar en función de las variables de decisión.' },
      cat: 'objetivo',
      why: 'Respuesta de referencia: FUNCIÓN OBJETIVO.'
    },
    {
      id: 'fo-igualdad',
      display: { type: 'text', value: 'Se usa necesariamente una igualdad.' },
      cat: 'objetivo',
      why: 'Respuesta de referencia: FUNCIÓN OBJETIVO.'
    }
  ]
};
