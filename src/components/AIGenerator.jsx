import React, { useState } from 'react';
// Añadimos el ícono CheckCircle para el resultado
import { Sparkles, FileText, Send, Loader2, CheckCircle } from 'lucide-react';

export function AIGenerator() {
  // --- 1. EL ESTADO (La memoria) ---
  const [titulo, setTitulo] = useState('');
  const [contenido, setContenido] = useState('');
  const [accion, setAccion] = useState('resumen');
  const [cargando, setCargando] = useState(false);
  
  // NUEVO ESTADO: Aquí guardaremos la respuesta que nos devuelva la IA
  const [resultado, setResultado] = useState(''); 

  // --- 2. LÓGICA DE NEGOCIO (Conexión a la API) ---
  const manejarEnvio = async (evento) => {
    evento.preventDefault();
    
    if (contenido.trim() === '') {
      alert("Por favor, pega el contenido de la clase primero.");
      return;
    }

    setCargando(true);
    setResultado(''); // Limpiamos cualquier resultado anterior al hacer un nuevo envío

    // ESTRUCTURA TRY...CATCH (Manejo de errores profesionales)
    try {
      // a. Preparar el Prompt (Ingeniería de Instrucciones oculta al usuario)
      const instrucciones = `Actúa como un profesor experto en tecnología. Tarea solicitada: ${accion}. Contexto del material: ${titulo}. Material base a procesar: ${contenido}`;

      // b. La "Tubería" hacia Google Gemini usando la variable de entorno segura
      // En Vite, leemos el .env usando import.meta.env
      const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
      const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${API_KEY}`;

      // c. Hacemos la petición (fetch) por HTTP POST (enviamos datos ocultos)
      const respuestaServidor = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: instrucciones }] }]
        })
      });

      // d. Convertimos la respuesta cruda de internet a un objeto JSON de JavaScript
      const datos = await respuestaServidor.json();
      
      // e. Navegamos por el JSON gigante que devuelve Google para sacar solo el texto
      if (datos.candidates && datos.candidates[0].content.parts[0].text) {
         const textoGenerado = datos.candidates[0].content.parts[0].text;
         setResultado(textoGenerado); // ¡Guardamos el texto en la memoria de React!
      } else {
         setResultado("Hubo un error al leer la respuesta de la IA. Revisa la consola.");
         console.log(datos); // Para ver qué falló
      }

    } catch (error) {
      // Si se cae internet o la API falla, el código cae aquí para que la app no explote
      console.error("Error grave en la conexión:", error);
      setResultado("Ocurrió un error de conexión con los servidores de Inteligencia Artificial.");
    } finally {
      // El bloque 'finally' se ejecuta SIEMPRE, haya éxito o haya error.
      setCargando(false);
    }
  };

  return (
    <div className="bg-dark-card border border-gray-800 rounded-xl p-6 shadow-lg">
      
      <div className="flex items-center gap-3 mb-6 border-b border-gray-800 pb-4">
        <Sparkles className="text-brand" size={24} />
        <h3 className="text-xl font-semibold text-white">Generador de Contenido IA</h3>
      </div>

      <form onSubmit={manejarEnvio} className="space-y-6">
        
        {/* (Los inputs siguen igual que en la etapa 4) */}
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-2">Título del Material (Opcional)</label>
          <input type="text" value={titulo} onChange={(e) => setTitulo(e.target.value)} placeholder="Ej: Arquitectura ESP32..." className="w-full bg-dark border border-gray-700 rounded-lg p-3 text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-brand transition-all" />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-400 mb-2">Contenido Base</label>
          <textarea value={contenido} onChange={(e) => setContenido(e.target.value)} placeholder="Pega aquí el texto del manual..." className="w-full h-48 bg-dark border border-gray-700 rounded-lg p-3 text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-brand transition-all resize-none"></textarea>
        </div>

        <div className="flex items-end gap-4">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-400 mb-2">¿Qué necesitas generar?</label>
            <select value={accion} onChange={(e) => setAccion(e.target.value)} className="w-full bg-dark border border-gray-700 rounded-lg p-3 text-white focus:outline-none focus:ring-1 focus:ring-brand appearance-none cursor-pointer">
              <option value="Un resumen para alumnos en lenguaje sencillo, resaltando palabras clave">Resumen para alumnos</option>
              <option value="Un examen Multiple Choice de 5 preguntas con la respuesta correcta al final">Examen Múltiple Choice (5 preguntas)</option>
              <option value="Una rúbrica de evaluación en formato de tabla para este tema">Rúbrica de Evaluación</option>
            </select>
          </div>

          <button type="submit" disabled={cargando} className={`bg-brand hover:bg-blue-600 text-white font-medium py-3 px-6 rounded-lg transition-colors flex items-center gap-2 ${cargando ? 'opacity-50 cursor-not-allowed' : ''}`}>
            {cargando ? (
              <><Loader2 size={18} className="animate-spin" /><span>Procesando...</span></>
            ) : (
              <><Send size={18} /><span>Generar con IA</span></>
            )}
          </button>
        </div>
      </form>

      {/* --- NUEVA ZONA: EL RESULTADO VISUAL --- 
          Renderizado condicional: Esto SOLO se dibuja en la pantalla si la variable 
          'resultado' tiene algún texto adentro.
      */}
      {resultado && (
        <div className="mt-8 p-6 bg-dark border border-brand/30 rounded-lg shadow-inner">
          <h4 className="text-lg font-bold text-brand mb-4 flex items-center gap-2">
            <CheckCircle size={20} />
            Resultado Generado:
          </h4>
          {/* whitespace-pre-wrap es vital: respeta los saltos de línea (Enters) que envía la IA */}
          <div className="text-gray-300 whitespace-pre-wrap leading-relaxed">
            {resultado}
          </div>
        </div>
      )}

    </div>
  );
}