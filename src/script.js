class Libro {
    constructor() {
        this.titulo = '';
        this.autor = '';
        this.disponibilidad = true;
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
}