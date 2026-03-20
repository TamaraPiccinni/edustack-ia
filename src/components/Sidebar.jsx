// 1. IMPORTACIONES
import React from 'react';
// Importamos solo los íconos específicos que necesitamos de la librería lucide-react
import { BookOpen, FileText, Settings, LayoutDashboard } from 'lucide-react';

// 2. DECLARACIÓN DEL COMPONENTE
// Usamos "export" para que este archivo pueda ser "visto" y usado por otros archivos.
export function Sidebar() {
  return (
    /* ETIQUETA ASIDE: Es semántica (HTML5) para barras laterales.
       CLASES DE TAILWIND:
       - w-64: Fija un ancho exacto (256px).
       - bg-dark-card: Usa la variable de color oscuro que creaste en index.css.
       - h-screen: Le dice que ocupe el 100% de la altura de la pantalla (100vh).
       - flex flex-col: Activa Flexbox en columna (los elementos van uno debajo del otro).
    */
    <aside className="w-64 bg-dark-card h-screen border-r border-gray-800 flex flex-col">
      
      {/* --- SECCIÓN 1: LOGO / TÍTULO --- */}
      <div className="p-6"> {/* p-6 da un padding (relleno interno) generoso */}
        <h2 className="text-2xl font-bold text-white">
          EduStack <span className="text-brand">IA</span>
        </h2>
      </div>

      {/* --- SECCIÓN 2: ENLACES DE NAVEGACIÓN --- 
          La clase "flex-1" es magia pura: le dice a esta sección que se estire 
          y ocupe todo el espacio sobrante. Al hacer esto, empuja la sección 3 
          (Configuración) hacia el fondo de la pantalla automáticamente.
      */}
      <nav className="flex-1 px-4 space-y-2"> {/* space-y-2 separa los botones entre sí */}
        
        {/* BOTÓN ACTIVO (Dónde estamos parados ahora) */}
        <a href="#" className="flex items-center gap-3 p-3 rounded-lg bg-brand/10 text-brand">
          <LayoutDashboard size={20} />
          <span>Dashboard</span>
        </a>

        {/* BOTONES INACTIVOS 
            Usamos "hover:bg-gray-800 hover:text-white" para que cambien de color 
            suavemente solo cuando pasas el cursor por encima (Micro-interacción).
        */}
        <a href="#" className="flex items-center gap-3 p-3 rounded-lg text-gray-400 hover:bg-gray-800 hover:text-white transition-colors">
          <BookOpen size={20} />
          <span>Mis Clases</span>
        </a>
        <a href="#" className="flex items-center gap-3 p-3 rounded-lg text-gray-400 hover:bg-gray-800 hover:text-white transition-colors">
          <FileText size={20} />
          <span>Generador IA</span>
        </a>
      </nav>

      {/* --- SECCIÓN 3: PIE DEL MENÚ (CONFIGURACIÓN) --- */}
      <div className="p-4 border-t border-gray-800">
        <a href="#" className="flex items-center gap-3 p-3 rounded-lg text-gray-400 hover:bg-gray-800 hover:text-white transition-colors">
          <Settings size={20} />
          <span>Configuración</span>
        </a>
      </div>

    </aside>
  );
}