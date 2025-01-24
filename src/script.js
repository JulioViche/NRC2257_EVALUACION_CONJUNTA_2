class Libro {
    constructor(titulo, autor, stock) {
        this.titulo = titulo;
        this.autor = autor;
        this.stock = stock; // Stock inicial
        this.disponibilidad = stock > 0; // Disponible si hay stock
    }
}

class Biblioteca {
    constructor() {
        this.libros = [];
        this.librosPrestados = [];
        this.reservas = []; // Libros reservados
    }

    agregarLibro(libro) {
        this.libros.push(libro);
    }

    prestarLibro(titulo) {
        return new Promise((resolve) => {
            setTimeout(() => {
                const libro = this.libros.find(libro => libro.titulo === titulo && libro.stock > 0);
                if (libro) {
                    libro.stock--; // Disminuir el stock al prestar
                    this.librosPrestados.push({ titulo: libro.titulo, autor: libro.autor });
                    console.log(`Confirmación: El libro "${libro.titulo}" ha sido prestado.`);
                    this.enviarRecordatorio(libro);
                    resolve(libro);
                } else {
                    resolve(null);
                }
            }, 1000);
        });
    }

    devolverLibro(titulo) {
        return new Promise((resolve) => {
            setTimeout(() => {
                const indexPrestado = this.librosPrestados.findIndex(libro => libro.titulo === titulo);
                if (indexPrestado !== -1) {
                    this.librosPrestados.splice(indexPrestado, 1); // Quitar de libros prestados
                    const libro = this.libros.find(libro => libro.titulo === titulo);
                    libro.stock++; // Incrementar stock al devolver
                    console.log(`Confirmación: El libro "${libro.titulo}" ha sido devuelto exitosamente.`);
                    resolve(libro);
                } else {
                    resolve(null);
                }
            }, 1000);
        });
    }

    enviarRecordatorio(libro) {
        if (this.librosPrestados.some(libroPrestado => libroPrestado.titulo === libro.titulo)) {
            setTimeout(() => {
                console.log(`Recordatorio: El libro "${libro.titulo}" debe ser devuelto.`);
            }, 20000);
        }
    }

    reservarLibro(titulo) {
        const libro = this.libros.find(libro => libro.titulo === titulo && libro.disponibilidad);
        if (libro) {
            libro.disponibilidad = false; // Marcar como reservado
            this.reservas.push(libro);
            console.log(`Notificación: El libro "${libro.titulo}" ha sido reservado.`);
            return libro;
        }
        return null;
    }

    notificarDisponibilidad(titulo) {
        setTimeout(() => {
            const reserva = this.reservas.find(libro => libro.titulo === titulo);
            if (reserva && reserva.disponibilidad) {
                console.log(`Notificación: El libro "${titulo}" está disponible para recoger.`);
            }
        }, 5000);
    }

    buscarLibroPorTitulo(titulo) {
        return this.libros.filter(libro => libro.titulo.toLowerCase().includes(titulo.toLowerCase()));
    }

    buscarLibroPorAutor(autor) {
        return this.libros.filter(libro => libro.autor.toLowerCase().includes(autor.toLowerCase()));
    }

    mostrarLibrosDisponibles() {
        const disponibles = this.libros.filter(libro => libro.stock > 0);
        console.log(
            "Libros disponibles:",
            disponibles.map(libro => ({
                titulo: libro.titulo,
                autor: libro.autor,
                stock: libro.stock
            }))
        );
    }

    mostrarLibrosPrestados() {
        console.log(
            "Libros prestados:",
            this.librosPrestados.map(libro => ({ titulo: libro.titulo, autor: libro.autor }))
        );
    }
}

// Crear biblioteca y agregar libros
const biblioteca = new Biblioteca();
biblioteca.agregarLibro(new Libro("Cien años de soledad", "Gabriel García Márquez", 5));
biblioteca.agregarLibro(new Libro("Don Quijote de la Mancha", "Miguel de Cervantes", 3));
biblioteca.agregarLibro(new Libro("El amor en los tiempos del cólera", "Gabriel García Márquez", 2));

// Función principal
async function main() {
    console.log("Sistema de Biblioteca");
    biblioteca.mostrarLibrosDisponibles();

    const libroPrestado = await biblioteca.prestarLibro("Cien años de soledad");
    if (libroPrestado) {
        console.log(`Libro prestado: ${libroPrestado.titulo}`);
    } else {
        console.log("El libro no está disponible para prestar.");
    }

    biblioteca.mostrarLibrosDisponibles();
    biblioteca.mostrarLibrosPrestados();

    const libroDevuelto = await biblioteca.devolverLibro("Cien años de soledad");
    if (libroDevuelto) {
        console.log(`Libro devuelto: ${libroDevuelto.titulo}`);
    } else {
        console.log("El libro no está en la lista de libros prestados.");
    }

    biblioteca.mostrarLibrosDisponibles();
    biblioteca.mostrarLibrosPrestados();
}

main();
