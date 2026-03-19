// 1. IMPORTACIONES
// 1. IMPORTACIONES
import React, { useState } from 'react';
import { Sparkles, FileText, Send, Loader2 } from 'lucide-react'; // Añadimos Loader2 para cuando cargue

export function AIGenerator() {
    // --- EL ESTADO (La memoria del componente) ---
    // useState('') significa "empieza vacío". 
    // 'titulo' es la variable que leemos, 'setTitulo' es la función que usamos para guardar cosas ahí.
    const [titulo, setTitulo] = useState('');
    const [contenido, setContenido] = useState('');
    const [accion, setAccion] = useState('resumen'); // Empieza por defecto en "resumen"

    // Este estado es para saber si la IA está "pensando" y mostrar un spinner
    const [cargando, setCargando] = useState(false);

    // --- LA LÓGICA DE NEGOCIO ---
    // Esta función se ejecuta cuando hacemos clic en "Generar con IA"
    const manejarEnvio = async (evento) => {
        evento.preventDefault(); // Evita que la página se recargue (comportamiento por defecto de HTML)

        // Validación básica: Si no hay texto, no hacemos nada
        if (contenido.trim() === '') {
            alert("Por favor, pega el contenido de la clase primero.");
            return;
        }

        // Encendemos el modo "cargando"
        setCargando(true);

        // Aquí simularemos que llamamos a la IA de Google.
        // Como aún no tenemos la llave de la API, haremos una pausa falsa de 2 segundos.
        console.log("Enviando a la IA:", { titulo, contenido, accion });

        setTimeout(() => {
            // Apagamos el modo cargando después de 2 segundos
            setCargando(false);
            alert("¡Simulación terminada! Mira la consola (F12) para ver los datos atrapados.");
            // Limpiamos los campos para el próximo uso
            setTitulo('');
            setContenido('');
        }, 2000);
    };

    return (
        // ... el resto del HTML ...
        /* CONTENEDOR PRINCIPAL DE LA TARJETA
           - bg-dark-card: Fondo oscuro elegante.
           - border-gray-800: Un borde muy sutil para delimitar el área.
           - rounded-xl: Bordes bien redondeados (estándar de diseño 2026).
           - p-6: Espacio interno generoso para que nada quede apretado.
        */
        <div className="bg-dark-card border border-gray-800 rounded-xl p-6 shadow-lg">

            {/* --- ENCABEZADO DE LA HERRAMIENTA --- */}
            <div className="flex items-center gap-3 mb-6 border-b border-gray-800 pb-4">
                <Sparkles className="text-brand" size={24} />
                <h3 className="text-xl font-semibold text-white">Generador de Contenido IA</h3>
            </div>

            {/* --- EL FORMULARIO (La estructura de datos) --- 
          Usamos la etiqueta semántica <form> para agrupar los campos de entrada.
          La clase "space-y-6" agrega automáticamente margen vertical entre cada bloque 
          hijo, sin tener que poner "mb-6" en cada uno. ¡Magia de Tailwind!
      */}
            {/* Añadimos onSubmit para que escuche el clic del botón o la tecla Enter */}
            <form onSubmit={manejarEnvio} className="space-y-6">

                {/* BLOQUE 1: TÍTULO */}
                <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">
                        Título del Material (Opcional)
                    </label>
                    <input
                        type="text"
                        placeholder="Ej: Arquitectura de Microcontroladores ESP32..."
                        // 1. Le decimos qué variable mostrar
                        value={titulo}
                        // 2. Cada vez que tipeo una letra, 'e.target.value' captura esa letra y la guarda en el estado
                        onChange={(e) => setTitulo(e.target.value)}
                        className="w-full bg-dark border border-gray-700 rounded-lg p-3 text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-brand transition-all"
                    />
                </div>

                {/* BLOQUE 2: ÁREA DE TEXTO */}
                <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">
                        Contenido Base (Pega aquí el texto de tu clase)
                    </label>
                    <textarea
                        placeholder="Pega aquí el texto del manual, apunte o artículo..."
                        // Atamos el contenido bruto a nuestra variable 'contenido'
                        value={contenido}
                        onChange={(e) => setContenido(e.target.value)}
                        className="w-full h-48 bg-dark border border-gray-700 rounded-lg p-3 text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-brand transition-all resize-none"
                    ></textarea>
                </div>

                {/* BLOQUE 3: SELECTOR Y BOTÓN */}
                <div className="flex items-end gap-4">

                    <div className="flex-1">
                        <label className="block text-sm font-medium text-gray-400 mb-2">
                            ¿Qué necesitas generar?
                        </label>
                        <select
                            // Atamos el selector a la variable 'accion'
                            value={accion}
                            onChange={(e) => setAccion(e.target.value)}
                            className="w-full bg-dark border border-gray-700 rounded-lg p-3 text-white focus:outline-none focus:ring-1 focus:ring-brand appearance-none cursor-pointer"
                        >
                            <option value="resumen">Resumen para alumnos</option>
                            <option value="examen">Examen Múltiple Choice (5 preguntas)</option>
                            <option value="rubrica">Rúbrica de Evaluación</option>
                            <option value="proyecto">Idea de Proyecto Práctico</option>
                        </select>
                    </div>

                    {/* BOTÓN MÁGICO 
              Cambiamos type="button" a type="submit".
              Si "cargando" es verdadero, deshabilitamos el botón y le bajamos la opacidad.
          */}
                    <button
                        type="submit"
                        disabled={cargando}
                        className={`bg-brand hover:bg-blue-600 text-white font-medium py-3 px-6 rounded-lg transition-colors flex items-center gap-2 ${cargando ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                        {/* Renderizado condicional: Si está cargando muestra el spinner rotando, si no, el texto */}
                        {cargando ? (
                            <>
                                <Loader2 size={18} className="animate-spin" />
                                <span>Procesando...</span>
                            </>
                        ) : (
                            <>
                                <span>Generar con IA</span>
                                <Send size={18} />
                            </>
                        )}
                    </button>

                </div>

            </form>
        </div>
    );
}