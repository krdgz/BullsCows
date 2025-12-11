# Toros y Vacas – React

Una implementación moderna del juego clásico “Toros y Vacas” construida con React y Vite. Dos jugadores definen números secretos de cuatro cifras y alternan turnos para adivinar el número del contrario. La aplicación gestiona turnos, resultados por intento (toros y vacas), historial por jugador, modal de victoria y flujo de nuevo juego.

El objetivo del proyecto es ofrecer una experiencia limpia y clara, con reglas simples y una interfaz enfocada en la jugabilidad.

## Características

- Juego para dos jugadores con colores asignados por jugador.
- Formulario de configuración de cada jugador: nombre, número secreto y color.
- Validaciones no intrusivas: el número secreto y los intentos son de 4 dígitos numéricos.
- Cinta superior con el jugador activo y acciones de juego.
- Intento de adivinanza con cálculo inmediato de toros y vacas.
- Historial de intentos por jugador en forma de acordeón.
- Modal de victoria con cierre por tecla Escape.
- Pantalla de resultados finales: revela números secretos bajo demanda y permite alternar entre los intentos de cada jugador.
- Flujo de “Nuevo juego” con confirmación.
- Modal de ayuda con reglas y enlace para apoyar el proyecto.

## Captura conceptual del flujo

1. Configuración de jugadores (datos y color).
2. Juego en turnos: cada intento muestra toros y vacas inmediatamente.
3. Cuando un jugador logra 4 toros, aparece el modal de ganador.
4. Al cerrar el modal, se muestran los resultados finales con el historial y los secretos.
5. “Nuevo juego” reinicia el estado tras confirmación.

## Estructura del proyecto

```
src/
	Components/
		AttemptsList.jsx       # Historial de intentos por jugador (acordeón)
		FormAddPlayer.jsx      # Formulario para definir cada jugador
		GamePlay.jsx           # Pantalla principal de juego por turnos
		GameResults.jsx        # Resultados finales: secretos y listas de intentos
		Header.jsx             # Encabezado
		Footer.jsx             # Pie de página con enlaces
		Help.jsx               # Modal de ayuda (reglas y enlace a GitHub)
		WinnerModal.jsx        # Modal de ganador
		SurrenderModal.jsx     # Modal genérico de confirmación (reutilizable)
	utils/
		gameLogic.js           # Cálculo de toros y vacas
		resetGame.js           # Reinicio completo del estado
	App.jsx                  # Orquestación de estados y navegación de pantallas
	index.css                # Estilos globales y de componentes
```

## Instalación y ejecución

Requisitos: Node.js 18+ y pnpm.

```bash
pnpm install
pnpm run dev
```

La aplicación levanta un servidor de desarrollo con hot reload. Abre la URL que te muestra Vite en la consola.

## Uso

- Completa los datos del Jugador 1 y Jugador 2.
- En la pantalla de juego, escribe un intento de 4 dígitos y confirma.
- Observa el resultado: toros (cifras correctas y bien posicionadas) y vacas (cifras correctas en otra posición).
- Cuando un jugador alcanza 4 toros, aparece el modal de ganador. Al cerrarlo, se muestran los resultados finales.
- En resultados finales puedes alternar entre intentos de cada jugador y revelar los números secretos bajo demanda.
- Usa “Nuevo juego” para reiniciar todo con confirmación.

## Decisiones de diseño

- Validaciones contenidas: se limita el input a dígitos y a cuatro caracteres; no se introducen restricciones adicionales que dificulten el juego.
- Estado centralizado en `App.jsx` para controlar el flujo: configuración, juego, victoria y resultados.
- Desacoplamiento de lógica: el cálculo de toros y vacas vive en `utils/gameLogic.js` y el reinicio en `utils/resetGame.js`.
- Estilos en `index.css` con clases por componente; se evita el estilo inline salvo en casos puntuales de color dinámico.
- Modales accesibles: cierre por Escape y por clic en el fondo.

## Componentes clave

- `FormAddPlayer`: gestión de datos de cada jugador con selección de color evitado si el otro ya lo ha tomado.
- `GamePlay`: entrada de intentos, cálculo de resultados y gestión de turno.
- `AttemptsList`: lista de intentos del jugador activo, últimos arriba.
- `WinnerModal`: modal alegre y moderno para anunciar la victoria.
- `GameResults`: pantalla posterior a la victoria con secretos y toggle de intentos.
- `Help`: modal con reglas del juego y enlace a GitHub.

## Contribución

Si este proyecto te resulta útil, considera apoyarlo marcándolo con una estrella en GitHub. Tu apoyo ayuda a mantener el proyecto vivo y a mejorar su calidad.

## Próximos pasos

- 

## Créditos y tecnología

- Construido con React y Vite.
- Estilos en CSS moderno.
- Filosofía: interfaz clara, reglas simples y experiencia fluida.
