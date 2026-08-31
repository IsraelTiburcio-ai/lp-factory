# LP FACTORY — Construye el modelo

**Materia:** Optimización I
**Unidad:** Gimnasio 2 — Modelos de Programación Lineal
**Tema:** Elementos Básicos del Modelo Normativo (pág. 6 del material)
**Repositorio:** https://github.com/IsraelTiburcio-ai/lp-factory
**Sitio publicado:** https://israeltiburcio-ai.github.io/lp-factory/

Microjuego arcade-educativo de **60–90 segundos**: en la fábrica de programación
lineal llegan piezas por la cinta transportadora y tú debes enviarlas a la
máquina correcta para ensamblar el modelo.

## Concepto académico

Los **tres elementos básicos del modelo normativo**, con la terminología del material:

| Máquina | Se refiere a |
|---|---|
| 🔧 **Variables de decisión** | cantidades desconocidas que deben encontrarse |
| 🚧 **Restricción** | limitan las variables a valores permisibles (factibles) |
| 🎯 **Función objetivo** | define la meta del modelo: maximizar o minimizar |

Las 18 piezas del juego provienen del Gimnasio 2: la **Baya Prototipo** (fábrica
de bolsas estándar y de lujo: `max z = 50x₁ + 100x₂`, `7x₁ + 2x₂ ≤ 28`,
`2x₁ + 12x₂ ≤ 24`), los ejemplos de la sección de elementos básicos
("solo se dispone de 40 kg", "no se pueden producir bolsas negativas") y
problemas prototipo (demanda mínima, Cola A / Cola ByK, Muebles Baba).

## Cómo se juega

1. Pulsa **INICIAR TURNO**.
2. Llega una pieza por la cinta (p. ej. `2x₁ + 12x₂ ≤ 24`).
3. Toca la máquina correcta: **VARIABLES DE DECISIÓN**, **RESTRICCIÓN** o
   **FUNCIÓN OBJETIVO** (o teclas **1 · 2 · 3**).
4. Correcto: chispas, luz verde y puntos con combo. Incorrecto: la máquina te
   recuerda a dónde iba la pieza y por qué.
5. Son **10 preguntas por partida**. Al final: resultado con aciertos,
   tiempo, puntos, mejor combo y un repaso de los tres elementos.
6. Pulsa **VER RESPUESTAS** para revisar las 10 piezas, tu elección, la categoría
   correcta y la explicación de cada una.

Sin tutorial, sin niveles, sin campañas. Entrar → entender → jugar → repetir.

## Diseño

- **Mobile-first** (referencia 390×844), botones grandes y tap-to-send.
- Fábrica con cinta transportadora, luces, chispas y efectos discretos.
- Dificultad ligera: las pistas descriptivas de las máquinas se reservan para la
  portada y la revisión final; durante la partida queda el nombre de cada máquina.
- La clave de respuestas aparece al terminar para favorecer la retroalimentación
  sin convertir la partida en un menú o una campaña.
- Sonido sintetizado con WebAudio (tap, acierto, error, resultado) con botón
  de silencio persistente.
- Accesibilidad: contraste alto, labels ARIA, anuncios por lector de pantalla,
  soporte de teclado y respeto a `prefers-reduced-motion`.

## Tecnologías

- HTML5, CSS3 y JavaScript ES6+ (vanilla). Sin frameworks ni build.
- Despliegue automático a GitHub Pages con GitHub Actions (`.github/workflows/pages.yml`).

## Estructura

```
index.html    # estructura de pantallas (portada, juego, resultado)
styles.css    # diseño de la fábrica (mobile-first)
script.js     # lógica del juego, efectos y audio
data.js       # categorías y 18 piezas del modelo (fuente: Gimnasio 2)
assets/       # favicon
```
