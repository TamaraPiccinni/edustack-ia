// 1. IMPORTACIONES
import React from 'react';
// Importamos íconos para darle un toque visual a los botones
import { Sparkles, FileText, Send } from 'lucide-react';

export function AIGenerator() {
  return (
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
      <form className="space-y-6">
        
        {/* BLOQUE 1: TÍTULO DEL MATERIAL */}
        <div>
          {/* El 'label' es el texto descriptivo del campo */}
          <label className="block text-sm font-medium text-gray-400 mb-2">
            Título del Material (Opcional)
          </label>
          {/* El 'input' donde escribes. 
              - w-full: Ocupa todo el ancho disponible.
              - bg-dark: El fondo de la caja de texto es un poco más oscuro que la tarjeta 
                para crear un efecto de "hundimiento" visual.
              - focus:ring-1 focus:ring-brand: Cuando haces clic adentro, se pinta un 
                borde azul suave indicando que está activo.
          */}
          <input 
            type="text" 
            placeholder="Ej: Arquitectura de Microcontroladores ESP32..." 
            className="w-full bg-dark border border-gray-700 rounded-lg p-3 text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-brand transition-all"
          />
        </div>

        {/* BLOQUE 2: ÁREA DE TEXTO (El apunte bruto) */}
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-2">
            Contenido Base (Pega aquí el texto de tu clase)
          </label>
          {/* 'textarea' permite escribir múltiples líneas de texto. 
              - h-48: Le damos una altura fija generosa (12 rem = 192px).
              - resize-none: Evitamos que el usuario deforme la caja estirándola.
          */}
          <textarea 
            placeholder="Pega aquí el texto del manual, apunte o artículo que quieres procesar..."
            className="w-full h-48 bg-dark border border-gray-700 rounded-lg p-3 text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-brand transition-all resize-none"
          ></textarea>
        </div>

        {/* BLOQUE 3: SELECTOR DE ACCIÓN Y BOTÓN */}
        <div className="flex items-end gap-4">
          
          {/* El Selector (Qué queremos que haga la IA) 
              - flex-1: Le decimos que ocupe todo el espacio que el botón "Generar" no use.
          */}
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-400 mb-2">
              ¿Qué necesitas generar?
            </label>
            <select className="w-full bg-dark border border-gray-700 rounded-lg p-3 text-white focus:outline-none focus:ring-1 focus:ring-brand appearance-none cursor-pointer">
              <option value="resumen">Resumen para alumnos (Lenguaje sencillo)</option>
              <option value="examen">Examen Múltiple Choice (5 preguntas)</option>
              <option value="rubrica">Rúbrica de Evaluación (Formato Tabla)</option>
              <option value="proyecto">Idea de Proyecto Práctico</option>
            </select>
          </div>

          {/* EL BOTÓN MÁGICO 
              - bg-brand: Usa el color azul principal.
              - hover:bg-blue-600: Se oscurece un poco al pasar el mouse.
              - flex items-center gap-2: Alinea el texto "Generar" y el ícono del avión de papel.
          */}
          <button 
            type="button" 
            className="bg-brand hover:bg-blue-600 text-white font-medium py-3 px-6 rounded-lg transition-colors flex items-center gap-2"
          >
            <span>Generar con IA</span>
            <Send size={18} />
          </button>
          
        </div>

      </form>
    </div>
  );
}