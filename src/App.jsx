import React from 'react';
// Importamos nuestro componente recién creado indicando la ruta del archivo
import { Sidebar } from './components/Sidebar';

function App() {
  return (
    /* CONTENEDOR PADRE DE TODA LA PANTALLA
       - flex: Pone a los hijos (Sidebar y Main) uno al lado del otro en una fila.
       - h-screen: Ocupa toda la altura del monitor.
       - bg-dark: Fondo general de la app.
    */
    <div className="flex h-screen bg-dark text-white">
      
      {/* 1. INSTANCIAMOS EL MENÚ LATERAL
          Con esta simple etiqueta, React trae todo el código gigante de Sidebar.jsx
          y lo dibuja aquí. Esto hace que App.jsx quede súper limpio y fácil de leer.
      */}
      <Sidebar />

      {/* 2. ÁREA DE TRABAJO PRINCIPAL
          - flex-1: Le dice a esta caja "ocupa todo el ancho de la pantalla que el Sidebar NO está usando".
          - overflow-y-auto: Si cargas un texto muy largo, solo esta caja tendrá barra 
            de desplazamiento (scroll). El Sidebar quedará fijo e inmóvil a la izquierda.
      */}
      <main className="flex-1 p-8 overflow-y-auto">
        
        {/* Encabezado del área de trabajo */}
        <header className="mb-8">
          <h1 className="text-3xl font-bold">Bienvenida</h1>
          <p className="text-gray-400 mt-1">¿Qué contenido vamos a procesar hoy?</p>
        </header>

        {/* Tarjeta donde irá nuestro futuro formulario */}
        <div className="bg-dark-card border border-gray-800 rounded-xl p-6 shadow-lg">
          <h3 className="text-xl font-semibold mb-4 text-white">Nuevo Material</h3>
          <p className="text-gray-400">
            El área de trabajo está lista. El diseño estructural ya es profesional.
          </p>
        </div>

      </main>

    </div>
  );
}

export default App;