import React, { useState, useEffect } from 'react';
import { Sidebar } from './components/Sidebar';
import { AIGenerator } from './components/AIGenerator';

function App() {
  // 1. EL ESTADO GLOBAL DEL HISTORIAL
  // Inicializamos leyendo lo que ya haya guardado en el navegador (localStorage)
  const [historial, setHistorial] = useState(() => {
    const datosGuardados = localStorage.getItem('edustack_historial');
    return datosGuardados ? JSON.parse(datosGuardados) : [];
  });

  // 2. EFECTO SECUNDARIO (Guardado Automático)
  // Cada vez que la variable 'historial' cambie, este useEffect se dispara
  // y guarda la lista actualizada en el disco duro del navegador.
  useEffect(() => {
    localStorage.setItem('edustack_historial', JSON.stringify(historial));
  }, [historial]);

  // 3. FUNCIÓN PARA AGREGAR AL HISTORIAL
  // Esta función se la pasaremos al AIGenerator para que nos avise cuando haya algo nuevo
  const agregarAlHistorial = (nuevoItem) => {
    // Agregamos el item nuevo al principio de la lista, y conservamos los viejos (...historial)
    setHistorial([nuevoItem, ...historial]);
  };

  return (
    <div className="flex h-screen bg-dark text-white">
      
      {/* Le pasamos el array 'historial' al Sidebar para que lo dibuje */}
      <Sidebar historial={historial} />

      <main className="flex-1 p-8 overflow-y-auto">
        <header className="mb-8">
          <h1 className="text-3xl font-bold">Bienvenida</h1>
          <p className="text-gray-400 mt-1">¿Qué contenido vamos a procesar hoy?</p>
        </header>

        {/* Le pasamos la función 'agregarAlHistorial' al generador */}
        <AIGenerator onGenerarExito={agregarAlHistorial} />

      </main>

    </div>
  );
}

export default App;