# Desarrollo de Aplicaciones Web Interactivas utilizando Html, Css y JavaScript

## Objetivo 

Evaluar la capacidad del estudiante para analizar y proponer soluciones a un problema práctico utilizando los conceptos fundamentales de programación web en JavaScript.

## Escenario

Una biblioteca digital necesita mejorar su sistema de gestión de préstamos y devoluciones de libros. Actualmente, los usuarios pueden buscar libros, pero no hay una forma eficiente de reservarlos, devolverlos o verificar su disponibilidad en tiempo real. Además, el sistema no cuenta con alertas para recordar a los usuarios la fecha de devolución ni notificaciones sobre la disponibilidad de libros reservados.

## Análisis del problema

### 1. Estructura del sistema de préstamos

¿Cómo organizar y manipular los libros prestados usando 
arrays y sus métodos (push, pop, shift, unshift, splice)?

Para la funcionalidad de reservar/devolver libros:

- Se crea una clase `Libro`
  - `nombre`
  - `autor`
  - `stock`
- Se crea una clase `Biblioteca`
  - `libros` (*libros disponibles*)
  - `librosPrestados`
- `Biblioteca.agregarLibros()` se usa `push()` para agregar un libro
- `Biblioteca.prestarLibro()` se busca un libro por su título con `.findIndex()`, pasa el libro encontrado de los libros disponibles a los libros prestados con `splice()` y `push()` y envía un recordatorio de devolución
-  `Biblioteca.devolverLibro()` se busca un libro por su título con `.findIndex()` y pasa el libro encontrado de los libros prestados a los libros disponibles con `splice()` y `push()`.

### 2. Filtrado y búsquedas dinámicas

-  `Biblioteca.buscarLibroPorTitulo()` se busca un libro por su título con `filter()` y devuelve un array con los resultados

-  `Biblioteca.buscarLibroPorAutor()` se busca un libro por su autor con `filter()` y devuelve un array con los resultados

### 3. Interacción con el usuario
### 4. Alertas y recordatorios

-  `Biblioteca.enviarRecordatorio()` establece un recordatorio con un `setTimeout()` que se muestra luego de un tiempo con información del libro por devolver

### 5. Eventos y usabilidad
### 6. Funciones avanzadas