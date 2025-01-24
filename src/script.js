class Libro {
    constructor(titulo, autor) {
        this.titulo = titulo;
        this.autor = autor;
        this.disponibilidad = true;
        this.stock = 0;
    }
}

class Biblioteca {
    constructor() {
        this.libros = [];
        this.librosPrestados = [];
    }

    agregarLibro(libro) {
        this.libros.push(libro);
    }

    prestarLibro(titulo) {
        const index = this.libros.findIndex(libro => libro.titulo === titulo);
        if (index !== -1) {
            const libroPrestado = this.libros.splice(index, 1)[0]; // Sacar libro del inventario
            this.librosPrestados.push(libroPrestado); // Agregar a libros prestados
            this.enviarRecordatorio(libroPrestado); // Enviar recordatorio
            return libroPrestado;
        }
        return null; // Libro no encontrado
    }

    devolverLibro(titulo) {
        const index = this.librosPrestados.findIndex(libro => libro.titulo === titulo);
        if (index !== -1) {
            const libroDevuelto = this.librosPrestados.splice(index, 1)[0]; // Sacar libro de prestados
            this.libros.push(libroDevuelto); 
            return libroDevuelto;
        }
        return null; // Libro no encontrado
    }

    enviarRecordatorio(libro) {
        setTimeout(() => {
            console.log(`Recordatorio: El libro "${libro.titulo}" debe ser devuelto.`);
        }, 10000); // Recordatorio después de 10 segundos (simulación)
    }

    buscarLibroPorTitulo(titulo) {
        return this.libros.filter(libro => libro.titulo.includes(titulo)); 
    }

    buscarLibroPorAutor(autor) {
        return this.libros.filter(libro => libro.autor.includes(autor)); 
    }

    mostrarLibrosDisponibles() {
        console.log("Libros disponibles:", this.libros);
    }

    mostrarLibrosPrestados() {
        console.log("Libros prestados:", this.librosPrestados);
    }

    reservarLibro(titulo) {
        const index = this.libros.findIndex(libro => libro.titulo === titulo && libro.disponibilidad);
        if (index !== -1) {
            const libroReservado = this.libros[index];
            libroReservado.disponibilidad = false; // Marcar como no disponible
            this.enviarNotificacionReserva(libroReservado); // Enviar notificación de reserva
            return libroReservado;
        }
        return null; // Libro no disponible para reserva
    }

    enviarNotificacionReserva(libro) {
        console.log(`Notificación: El libro "${libro.titulo}" ha sido reservado.`);
    }

    confirmarDevolucion(libro) {
        console.log(`Confirmación: El libro "${libro.titulo}" ha sido devuelto exitosamente.`);
    }
}

// Crear inventario de libros
const biblioteca = new Biblioteca();
biblioteca.agregarLibro(new Libro('Cien años de soledad', 'Gabriel García Márquez'));
biblioteca.agregarLibro(new Libro('Don Quijote de la Mancha', 'Miguel de Cervantes'));
biblioteca.agregarLibro(new Libro('El amor en los tiempos del cólera', 'Gabriel García Márquez'));

// Función principal para ejecutar el sistema
function main() {
    console.log("Sistema de Biblioteca");
    biblioteca.mostrarLibrosDisponibles();

    const libroPrestado = biblioteca.prestarLibro('Cien años de soledad');
    if (libroPrestado) {
        console.log(`Libro prestado: ${libroPrestado.titulo}`);
    } else {
        console.log("Libro no encontrado para prestar.");
    }

    biblioteca.mostrarLibrosDisponibles();
    biblioteca.mostrarLibrosPrestados();

    const libroDevuelto = biblioteca.devolverLibro('Cien años de soledad');
    if (libroDevuelto) {
        biblioteca.confirmarDevolucion(libroDevuelto);
    } else {
        console.log("Libro no encontrado para devolver.");
    }

    biblioteca.mostrarLibrosDisponibles();
    biblioteca.mostrarLibrosPrestados();
}

// Ejecutar el sistema
main();