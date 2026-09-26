# Tu-sueldo-real
Una calculadora que responde una pregunta simple: ¿cuánto vale realmente una hora de tu trabajo?
🔗 tu-sueldo-real.netlify.app
---
Por qué existe
En marzo de 2026 se publicó en el DOF la reforma constitucional que reduce la jornada laboral en México, y el 1 de mayo el decreto que la aterriza en la Ley Federal del Trabajo: la jornada baja dos horas por año hasta llegar a 40 horas semanales en 2030.
Toda la conversación se fue a cuántas horas se trabajan. A mí me interesó otra pregunta: cuánto vale cada una.
Casi nadie conoce su sueldo por hora real. Dividimos el sueldo entre las horas del contrato y ahí queda. Pero el trabajo cobra más que eso: horas extra que no se pagan, tiempo de traslado, y dinero que solo se gasta por ir a trabajar.
Esta calculadora pone esos tres factores en la cuenta.
Para qué sirve
No es un diagnóstico ni nada por el estilo. Es una herramienta que te lleva a tomar consciencia de lo que realmente ganamos:
Comparar dos ofertas de trabajo que se ven distintas en papel
Ponerle número a una negociación de sueldo o de días en casa
Decidir si conviene un empleo con dos horas de traslado
Cómo funciona
Entradas
Sueldo neto mensual · días trabajados por semana · horas contratadas · horas extra no pagadas · minutos de traslado al día · gasto diario en transporte · gasto diario en comida · otros gastos mensuales por trabajar.
Cinco campos vienen pre-llenados con los valores más comunes.
Cálculo
```
Constante: 4.333 semanas por mes (52 ÷ 12)

Hp = horas contratadas × 4.333
Hx = horas extra × 4.333
Ht = (minutos de traslado ÷ 60) × días presenciales × 4.333
G  = (transporte + comida) × días presenciales × 4.333 + otros gastos

Hora nominal           = sueldo ÷ Hp
Hora real sin traslado = (sueldo − G) ÷ (Hp + Hx)
Hora real con traslado = (sueldo − G) ÷ (Hp + Hx + Ht)
```
Se muestran las dos horas reales, con y sin traslado. Legalmente el traslado no es jornada; en la práctica, si no tuvieras ese trabajo no harías ese trayecto. En vez de imponer una interpretación, la calculadora enseña las dos y deja que cada quien decida cuál le sirve.
Escenarios
Recalcula la hora real cambiando una sola cosa a la vez: media hora menos de traslado, dos días de home office, o un aumento del 10%. Después señala cuál sube más la hora real.
El resultado suele sorprender: para quien tiene traslado y gastos diarios, dos días de home office valen más que un aumento del 10%.
Modo déficit
Cuando los gastos por trabajar igualan o superan el sueldo, la hora real se vuelve negativa y la lógica se invierte: dividir un saldo negativo entre menos horas hace que ahorrar tiempo parezca empeorar el resultado.
En ese caso la calculadora deja de comparar por hora y cambia de métrica: muestra el déficit mensual y ordena las opciones por cuánto mejoran el saldo. Cambiar de métrica cuando la primera deja de tener sentido resulta más útil que apagar la sección.
Fuentes
DOF, 1 de mayo de 2026 — Decreto que reforma, adiciona y deroga diversas disposiciones de la Ley Federal del Trabajo en materia de reducción de la jornada laboral. Ver decreto
DOF, 3 de marzo de 2026 — Reforma constitucional al artículo 123, fracciones IV y XI.
Los topes de jornada, los límites de horas extra y las reglas de pago salen del texto del decreto, verificado directamente. Ninguna cifra legal viene de notas de prensa: varias fuentes secundarias reportaron mal la fecha de entrada en vigor.
Supuestos y limitaciones
Todo modelo tiene supuestos. Estos son los suyos, declarados:
Se usan 4.333 semanas por mes. Otra constante produce diferencias de centavos.
En el escenario de home office se asume que esos días no hay gasto de transporte ni de comida.
Los días al año en traslado suponen 52 semanas trabajadas, sin vacaciones ni feriados.
El cálculo no incluye prestaciones, bonos ni otros beneficios, así que dos empleos con el mismo sueldo neto pueden no valer lo mismo.
Se asume asistencia presencial todos los días trabajados. A quien ya tiene esquema híbrido, el resultado le sale inflado.
En modo déficit, el escenario de "30 minutos menos de traslado" siempre da cero: el gasto de transporte se captura por día, no por minuto.
Nada se guarda ni se envía a ningún servidor. Todo ocurre en el navegador.
Cómo se validó
Esta es la parte que más trabajo llevó.
Tres casos de prueba resueltos a mano antes de construir, con su resultado esperado escrito de antemano:
Caso	Qué prueba	Resultado esperado
Control · sin traslado ni gastos	Que la estructura no esté rota: las tres horas deben ser idénticas	$86.55
Típico · $12,000, 48 h, 90 min de traslado	El camino completo, incluidos los escenarios	$34.21
Extremo · $25,000, 6 días, 10 h extra	Las validaciones legales	$53.08
Ese método detectó tres errores que de otro modo habrían pasado: datos transpuestos al capturar, una captura tomada con parámetros distintos, y un valor de referencia calculado con una constante que no era la de la especificación.
Cuatro rondas de control de calidad después de construir, empezando por intentar romper la pieza a propósito. Entre lo que salió:
Calculaba con datos faltantes y con combinaciones contradictorias (0 días con 48 horas)
Con gastos mayores al sueldo, la lógica de recomendación se invertía
Los escenarios prometían más de lo que simulaban
Un aviso legal mal redactado que decía algo impreciso sobre las horas extra
Un campo que mostraba un valor negativo pero calculaba con cero, sin avisar
Una gráfica que en modo déficit se leía al revés que en modo normal
Se corrigieron de uno en uno, volviendo a correr el caso de prueba después de cada cambio.
Hecho con
HTML, CSS y JavaScript en un solo archivo, sin dependencias. Construida con Claude Design.
El modelo, las fórmulas, las validaciones, los casos de prueba y el control de calidad son míos.
---
Autora
Andrea Galicia — Analista de datos con mirada de comercio internacional. Investigo qué hay detrás de los negocios y lo explico con datos.
LinkedIn: www.linkedin.com/in/andrea-galicia-puga-11346a263
