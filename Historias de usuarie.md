# Historias de usuarie de InFilm

- COMO usuarie
- QUIERO poder ver la portada de las 20 pelis más vistas
- PARA elegir pelis para echar la siesta

> R1 Muestra las 20 pelis más vistas

    · _Antecedentes:_
    Irantzu es una amante del cine. Siempre le gusta saber cuál es la peli que más gente ha visto para elegir que ver en el cine o en la siesta.

**Ejemplo R1:**

- No se muestran las 20 pelis más vistas.

- Irantzu accede a InFilm. => Se muestra un error.

- [x] Hecho

**Ejemplo R1:**

- Se muestran las 20 pelis más vistas.

- Irantzu accede a InFilm. => Se ven las 20 pelis más vistas

- [x] Hecho

---

- COMO usuarie
- QUIERO poder buscar las pelis que me interesan
- PARA compartirlas en mis redes sociales

· _Antecedentes:_
Irantzu es una amante del cine. Siempre le gusta saber cuál es la peli que más gente ha visto para elegir que ver en el cine o en la siesta.

> R1 La longitud de un término de búsqueda para que devuelva resultados es de 3 caracteres

**Ejemplo R1.1:**

- El término de búsqueda tiene una longitud superior o igual a 3 caracteres.

- Irantzu escribe 'Shang-Chi y la leyenda de los Diez Anillos' en el buscador

  => Se muestran las pelis que coincidan con la búsqueda.

- [x] Hecho

**Ejemplo R1:**

- El término de búsqueda es inferior a 3 caracteres.
- Irantzu escribe 'fu' en el buscador

  => Se le notifica a Irantzu que la longitud mínima para iniciar la búsqueda son 3 caracteres.
  => Se muestran las 20 pelis más recientes.

- [x] Hecho

> R2 Serán parte del resultado de búsqueda aquellas pelis con etiqueta idéntica al término de búsqueda

**Ejemplo R2:**

- Se muestran las pelis cuya etiqueta coincide exactamente con el término de búsqueda
- Irantzu escribe 'leyenda' en el buscador
  => Se devuelven las pelis cuya etiqueta coincida exactamente con 'leyenda'

- [x] Hecho

**Ejemplo R2.1:**

- No hay pelis cuya etiqueta coincida exactamente con el término de búsqueda
- Irantzu escribe 'Alien' en el buscador
  => Se notifica a Irantzu que no se encuentran resultados

- [ ] Hecho

> R3 Serán parte del resultado de búsqueda aquellas pelis donde la etiqueta coincida parcialmente con el término de búsqueda

**Ejemplo R3:**

- Se muestran las pelis cuya etiqueta coincide parcialmente con el término de búsqueda
- Irantzu escribe 'leyenda' en el buscador
  => Se devuelven las pelis cuya etiqueta coincida parcialmente con 'leyenda'

**Ejemplo R3:**

- No hay pelis cuya etiqueta coincida parcialmente con el término de búsqueda
- Irantzu escribe 'leyenda' en el buscador
  => Se notifica a Irantzu que no se encuentran resultados

- [ ] Hecho

> R4 Se ignoran los espacios laterales y los espacios interiores mayores que 1 del término de búsqueda.

**Ejemplo R4:**

- Se muestran las pelis cuya etiqueta coincida sin tener en cuenta los espacios laterales o interiores superiores a 1.
- Irantzu escribe ' leyenda demonio '
  => Se muestran las pelis que coincidan con 'leyenda demonio'

**Ejemplo R4:**

- los espacios laterales o interiores superiores a 1 no cuentan como caracteres para calcular la longitud de la cadena de búsqueda.
- Irantzu escribe '···f··'
  => Se le notifica a Irantzu que la longitud mínima son 3 caracteres.
  => Se muestran las 20 pelis más recientes.

**Ejemplo R4:**

- lo espacios laterales o interiores superiores a 1 no cuentan como caracteres para calcular la longitud de la cadena de búsqueda.
- Irantzu escribe '···l····e····'
  => Se muestran las pelis que coincidan con 'l e'

- [ ] Hecho

> R5 Se ignoran las mayúsculas y minúsculas

- Irantzu escribe 'LeyENdA'
  => Se muestran las pelis que coincidan con 'leyenda'

- [ ] Hecho

> R8a El resultado de búsqueda estará ordenado de más a menos reciente

- Irantzu escribe 'La casa'
  => Se muestran las pelis que coincidan con 'La casa' de más reciente a menos reciente

- [ ] Hecho

## Bonus pack:

> R6 Aquellas palabras declaradas como no permitidas no se usarán para buscar pelis

**Ejemplo R6:**

- Irantzu escribe 'paliza'
  => Se le avisa a Irantzu de que la búsqueda de esa palabra no es posible.

> R7 Dependiendo de las coincidencias que tengan las etiquetas de una peli se le asignará un peso:

- Si el término de búsqueda es idéntico a una etiqueta: +2

- Si una etiqueta coincide parcialmente con el término de búsqueda: +1

  > R8b El resultado de búsqueda estará ordenado de mayor a menor peso primero y de más a menos reciente si el peso es idéntico.