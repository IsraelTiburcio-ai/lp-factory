/* ============================================================
   LP FACTORY · data.js
   Fuente académica: Gimnasio 2 — Modelos de Programación Lineal
   Sección: "Elementos Básicos del Modelo Normativo" (pág. 6)
   Ejemplos: Baya Prototipo (fábrica de bolsas) y ejercicios 3-5.
   Terminología de la maestra, sin alteraciones.
   ============================================================ */

window.LP_FACTORY = {
  rounds: 8,

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
    /* ---------- FUNCIÓN OBJETIVO · define la meta (pág. 6) ---------- */
    {
      id: 'fo-baya',
      display: { type: 'formula', value: 'max z = 50x\u2081 + 100x\u2082' },
      cat: 'objetivo',
      why: 'La meta del modelo: maximizar la utilidad de las bolsas (Baya Prototipo).'
    },
    {
      id: 'fo-ganancias',
      display: { type: 'text', value: 'Maximizar las ganancias de la semana' },
      cat: 'objetivo',
      why: 'Lo que se desea lograr define la función objetivo.'
    },
    {
      id: 'fo-utilidad-max',
      display: { type: 'text', value: 'Obtener la mayor utilidad posible' },
      cat: 'objetivo',
      why: 'Buscar el máximo es la meta: función objetivo.'
    },
    {
      id: 'fo-lujo',
      display: { type: 'formula', value: 'max z = 5x\u2081 + 2x\u2082' },
      cat: 'objetivo',
      why: 'Utilidad de $5 por bolsa de lujo y $2 por bolsa normal (pág. 6).'
    },
    {
      id: 'fo-general',
      display: { type: 'formula', value: 'max z = c\u2081x\u2081 + c\u2082x\u2082' },
      cat: 'objetivo',
      why: 'Forma general: la meta como función de las variables de decisión.'
    },
    {
      id: 'fo-costos',
      display: { type: 'text', value: 'Minimizar el costo total de la dieta' },
      cat: 'objetivo',
      why: 'También es una meta: minimizar en lugar de maximizar.'
    },

    /* ---------- VARIABLES DE DECISIÓN · cantidades desconocidas (pág. 6) ---------- */
    {
      id: 'var-b1',
      display: { type: 'formula', value: 'x\u2081 = bolsas estándar' },
      cat: 'variables',
      why: 'Cantidad desconocida que el modelo debe encontrar (Baya Prototipo).'
    },
    {
      id: 'var-b2',
      display: { type: 'formula', value: 'x\u2082 = bolsas de lujo' },
      cat: 'variables',
      why: 'Otra cantidad desconocida por determinar.'
    },
    {
      id: 'var-latas',
      display: { type: 'text', value: '¿Cuántas latas de Cola A y de ByK?' },
      cat: 'variables',
      why: 'Las cantidades a encontrar son las variables de decisión (ejercicio 4).'
    },
    {
      id: 'var-def',
      display: { type: 'text', value: 'Cantidades desconocidas que deben encontrarse' },
      cat: 'variables',
      why: 'Es la definición de las variables de decisión.'
    },
    {
      id: 'var-notacion',
      display: { type: 'formula', value: 'x\u2081, x\u2082, x\u2081\u2081, y' },
      cat: 'variables',
      why: 'Notación general de las variables de decisión (pág. 6).'
    },
    {
      id: 'var-mesas',
      display: { type: 'text', value: '¿Cuántas mesas y sillas armar?' },
      cat: 'variables',
      why: 'Decidir las cantidades a producir: variables (Muebles Baba).'
    },

    /* ---------- RESTRICCIÓN · limitan a valores factibles (pág. 6) ---------- */
    {
      id: 'res-cortado',
      display: { type: 'formula', value: '7x\u2081 + 2x\u2082 \u2264 28' },
      cat: 'restriccion',
      why: 'Limita las horas del departamento de cortado (Baya Prototipo).'
    },
    {
      id: 'res-empaque',
      display: { type: 'formula', value: '2x\u2081 + 12x\u2082 \u2264 24' },
      cat: 'restriccion',
      why: 'Limita las horas del departamento de empaquetado (Baya Prototipo).'
    },
    {
      id: 'res-kg',
      display: { type: 'text', value: 'Solo se dispone de 40 kg de materia prima' },
      cat: 'restriccion',
      why: 'Un recurso limitado es una restricción (pág. 6).'
    },
    {
      id: 'res-neg',
      display: { type: 'text', value: 'No se pueden producir bolsas negativas' },
      cat: 'restriccion',
      why: 'Condición de no negatividad: restricción implícita (pág. 6).'
    },
    {
      id: 'res-demanda',
      display: { type: 'text', value: 'Demanda mínima: 300 bombas normales' },
      cat: 'restriccion',
      why: 'Condición que limita la producción (ejercicio 3).'
    },
    {
      id: 'res-general',
      display: { type: 'formula', value: 'a\u2081x\u2081 + a\u2082x\u2082 \u2264 b' },
      cat: 'restriccion',
      why: 'Forma general de una restricción (pág. 6).'
    }
  ]
};
