import React, { useState } from 'react';
// 1. IMPORTACIONES: Añadimos Copy y Download de Lucide
import { Sparkles, FileText, Send, Loader2, CheckCircle, Copy, Download } from 'lucide-react';
// 2. IMPORTACIONES DOCX: Herramientas para crear el archivo de Word
import { Document, Packer, Paragraph, TextRun } from "docx";
import { saveAs } from "file-saver";

export function AIGenerator() {
  // --- 1. ESTADO (Memoria del componente) ---
  const [titulo, setTitulo] = useState('');
  const [contenido, setContenido] = useState('');
  const [accion, setAccion] = useState('resumen');
  const [cargando, setCargando] = useState(false);
  const [resultado, setResultado] = useState(''); 
  
  // Nuevo estado para el feedback visual del botón "Copiar"
  const [copiado, setCopiado] = useState(false); 

  // --- 2. LÓGICA DE LA IA (Petición a Google Gemini) ---
  const manejarEnvio = async (evento) => {
    evento.preventDefault();
    
    if (contenido.trim() === '') {
      alert("Por favor, pega el contenido de la clase primero.");
      return;
    }

    setCargando(true);
    setResultado(''); 

    try {
      const instrucciones = `Actúa como un profesor experto en tecnología. Tarea solicitada: ${accion}. Contexto del material: ${titulo}. Material base a procesar: ${contenido}`;
      
      const API_KEY = import.meta.env.VITE_GEMINI_API_KEY; 
      const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${API_KEY}`;

      const respuestaServidor = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: instrucciones }] }]
        })
      });

      const datos = await respuestaServidor.json();
      
      if (datos.candidates && datos.candidates[0].content.parts[0].text) {
         setResultado(datos.candidates[0].content.parts[0].text);
      } else {
         setResultado("Hubo un error al leer la respuesta de la IA. Revisa la consola.");
      }
    } catch (error) {
      console.error("Error de red:", error);
      setResultado("Ocurrió un error de conexión con los servidores de Inteligencia Artificial.");
    } finally {
      setCargando(false);
    }
  };

  // --- 3. LÓGICA DE EXPORTACIÓN Y OFIMÁTICA ---

  // Función A: Copiar al Portapapeles (API del Navegador)
  const copiarTexto = async () => {
    try {
      await navigator.clipboard.writeText(resultado);
      setCopiado(true); // Cambia el texto del botón a "¡Copiado!"
      setTimeout(() => setCopiado(false), 2000); // Lo restaura a los 2 segundos
    } catch (err) {
      console.error('Error al copiar: ', err);
      alert('No se pudo copiar el texto.');
    }
  };

  // Función B: Crear y Descargar archivo de Word (.docx)
  const descargarWord = async () => {
    // a. Construimos la estructura interna del documento Word
    const doc = new Document({
      sections: [{
        properties: {},
        children: [
          // Título del documento
          new Paragraph({
            children: [
              new TextRun({
                text: `Material EduStack: ${accion.toUpperCase()}`,
                bold: true,
                size: 28, // Tamaño 14pt
              }),
            ],
            spacing: { after: 400 }, // Espacio debajo del título
          }),
          
          // b. Mapeamos el texto de la IA
          // Dividimos el texto por cada salto de línea (\n) y creamos un párrafo de Word
          ...resultado.split('\n').map(linea => {
            return new Paragraph({
              children: [
                new TextRun({
                  text: linea,
                  size: 22, // Tamaño 11pt
                })
              ],
              spacing: { after: 120 },
            });
          })
        ],
      }],
    });

    // c. Empaquetamos y forzamos la descarga
    const blob = await Packer.toBlob(doc);
    saveAs(blob, `EduStack-${accion}.docx`);
  };


  // --- 4. INTERFAZ DE USUARIO (HTML/Tailwind) ---
  return (
    <div className="bg-dark-card border border-gray-800 rounded-xl p-6 shadow-lg">
      
      {/* Encabezado */}
      <div className="flex items-center gap-3 mb-6 border-b border-gray-800 pb-4">
        <Sparkles className="text-brand" size={24} />
        <h3 className="text-xl font-semibold text-white">Generador de Contenido IA</h3>
      </div>

      {/* Formulario Principal */}
      <form onSubmit={manejarEnvio} className="space-y-6">
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

      {/* --- ZONA DE RESULTADO Y EXPORTACIÓN --- */}
      {resultado && (
        <div className="mt-8 bg-dark border border-brand/30 rounded-lg shadow-inner overflow-hidden">
          
          {/* Barra de herramientas superior */}
          <div className="bg-gray-800/50 px-6 py-3 border-b border-gray-800 flex items-center justify-between">
            <h4 className="text-sm font-bold text-brand uppercase tracking-wider flex items-center gap-2">
              <CheckCircle size={16} />
              Resultado Listo
            </h4>
            
            {/* Botones de acción (Copiar y Word) */}
            <div className="flex gap-2">
              <button 
                onClick={copiarTexto}
                type="button"
                className="flex items-center gap-2 px-3 py-1.5 text-sm bg-dark hover:bg-gray-700 text-gray-300 rounded transition-colors border border-gray-700"
              >
                <Copy size={16} />
                {copiado ? '¡Copiado!' : 'Copiar'}
              </button>
              
              <button 
                onClick={descargarWord}
                type="button"
                className="flex items-center gap-2 px-3 py-1.5 text-sm bg-brand hover:bg-blue-600 text-white rounded transition-colors"
              >
                <Download size={16} />
                Descargar .docx
              </button>
            </div>
          </div>

          {/* Caja de texto generada */}
          <div className="p-6 text-gray-300 whitespace-pre-wrap leading-relaxed max-h-[500px] overflow-y-auto">
            {resultado}
          </div>
          
        </div>
      )}

    </div>
  );
}