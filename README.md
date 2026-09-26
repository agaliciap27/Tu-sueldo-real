# Tu sueldo real

**¿Cuánto vale realmente tu hora de trabajo?**

[Probar la calculadora](https://tu-sueldo-real.netlify.app/) · Proyecto de Andrea Galicia

![Vista de la calculadora Tu sueldo real](01.png)

## Por qué hice este proyecto

Cuando pensamos en nuestro sueldo por hora, solemos dividir el sueldo mensual entre las horas del contrato. Esa cuenta deja fuera tiempo y dinero que también dedicamos al trabajo: horas extra no pagadas, traslados y gastos necesarios para ir a trabajar.

Creé esta calculadora para hacer visibles esos costos y ayudar a comparar ofertas de empleo, pensar en un aumento o valorar un esquema de trabajo desde casa. La reducción gradual de la jornada laboral en México me llevó a plantear otra pregunta: además de cuántas horas trabajamos, ¿cuánto nos queda realmente por cada una?

## Qué puedes calcular

La página pide tu sueldo neto mensual, días y horas de trabajo, horas extra no pagadas, tiempo de traslado y gastos relacionados con trabajar. Muestra:

- El sueldo por hora según las horas contratadas.
- Lo que queda por hora al descontar gastos y sumar las horas extra no pagadas.
- Lo que queda por hora si también se cuenta el tiempo de traslado.
- Tres escenarios independientes: menos tiempo de traslado, hasta dos días de trabajo desde casa y un aumento salarial del 10 %.

Si los gastos por trabajar igualan o superan el sueldo, la página muestra el saldo o déficit mensual y compara los escenarios según cuánto mejoran ese saldo. Un cambio de horario, por sí solo, no reduce los gastos capturados por día.

## Cómo se hace la cuenta

La calculadora usa **4.333 semanas por mes**. Si `S` es el sueldo neto mensual, `D` los días presenciales por semana, `Hc` las horas contratadas por semana, `He` las horas extra no pagadas por semana, `T` los minutos de traslado al día, `Gt` y `Gc` los gastos diarios de transporte y comida, y `Go` otros gastos mensuales:

```text
Horas contratadas al mes = Hc × 4.333
Horas extra al mes = He × 4.333
Horas de traslado al mes = (T ÷ 60) × D × 4.333
Gastos mensuales por trabajar = (Gt + Gc) × D × 4.333 + Go

Sueldo por hora contratada = S ÷ horas contratadas al mes
Hora real sin traslado = (S − gastos mensuales) ÷ (horas contratadas al mes + horas extra al mes)
Hora real con traslado = (S − gastos mensuales) ÷ (horas contratadas al mes + horas extra al mes + horas de traslado al mes)
```

El traslado no se presenta como jornada laboral legal. La página muestra el resultado **con y sin traslado** para que cada persona elija cuál le sirve para su comparación.

## Pruebas de funcionamiento

| Caso | Datos principales | Resultado comprobado |
| --- | --- | --- |
| Cálculo habitual | $15,000 mensuales; 5 días; 40 h contratadas; 0 h extra; 90 min de traslado; $60 de transporte y $80 de comida al día | $86.55 por hora contratada; $69.05 sin traslado; $58.14 con traslado |
| Déficit | $1,000 mensuales; 5 días; 40 h contratadas; 10 min de traslado; $100 de transporte y $100 de comida al día | $4,333.00 de gastos mensuales y $3,333.00 de déficit |
| Sueldo vacío | Sin sueldo mensual | La página pide completar el sueldo y no muestra un resultado numérico |
| Gasto negativo | −$5 en transporte diario | La página muestra un error y detiene el cálculo |

Los escenarios se recalculan con los datos de cada persona. **No hay una opción que siempre sea la mejor**: con ciertos gastos y tiempos puede convenir más trabajar desde casa; con otros, un aumento del 10 % produce una mejora mayor.

## Supuestos y límites

- Se supone que todos los días de trabajo indicados son presenciales. Si ya trabajas algunos días desde casa, el resultado puede sobrestimar los gastos y el tiempo de traslado.
- En el escenario de trabajo desde casa se eliminan, para esos días, el traslado y los gastos diarios de transporte y comida.
- Los días anuales de traslado se estiman con 52 semanas; no se descuentan vacaciones ni días feriados.
- No se incluyen prestaciones, bonos ni otros beneficios. Dos empleos con el mismo sueldo neto pueden tener un valor total distinto.
- Los datos que escribes se procesan en tu navegador; la calculadora no los guarda ni los envía a un servidor.

## Fuentes sobre la jornada laboral en México

- [Reforma constitucional del artículo 123, publicada el 3 de marzo de 2026](https://dof.gob.mx/nota_detalle.php?codigo=5781417&fecha=03/03/2026).
- [Reforma de la Ley Federal del Trabajo, publicada el 1 de mayo de 2026](https://dof.gob.mx/nota_detalle_popup.php?codigo=5786537). Sus disposiciones transitorias establecen la reducción gradual de 48 horas semanales en 2026 a 40 en 2030.

## Autora

**Andrea Galicia** · Analista de datos con mirada de comercio internacional.

[LinkedIn](https://www.linkedin.com/in/andrea-galicia-puga-11346a263/) · [Calculadora en línea](https://tu-sueldo-real.netlify.app/)

Proyecto desarrollado con apoyo de Claude Design y herramientas de IA para la implementación y las pruebas.
