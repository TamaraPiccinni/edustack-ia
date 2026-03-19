import React from 'react';
import { Sidebar } from './components/Sidebar';
// IMPORTAMOS LA NUEVA PIEZA DE LEGO
import { AIGenerator } from './components/AIGenerator';

function App() {
  return (
    <div className="flex h-screen bg-dark text-white">
      
      <Sidebar />

      <main className="flex-1 p-8 overflow-y-auto">
        <header className="mb-8">
          <h1 className="text-3xl font-bold">Bienvenida, Profe 👋</h1>
          <p className="text-gray-400 mt-1">¿Qué contenido vamos a procesar hoy?</p>
        </header>

        {/* AQUÍ INYECTAMOS EL FORMULARIO
          Borramos el <div> de prueba de la etapa anterior y ponemos esta etiqueta.
          React se encarga de ir al archivo AIGenerator.jsx, traer todo ese HTML 
          y pintarlo exactamente aquí.
        */}
        <AIGenerator />

      </main>

    </div>
  );
}

export default App;