"use client"

import React from 'react'
import { Link, Outlet, useLocation } from 'react-router-dom'
import { FileText, Home, Database, Users, Plus, Edit, Table, BarChart, Menu, ChevronLeft } from 'lucide-react'
import { Button } from "./ui/button"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarProvider,
  SidebarTrigger,
} from "./ui/sidebar"

import Logo from '../components/images/logo-blue-no-name.png'; // Importar el logo

const Layout = () => {
  const location = useLocation()

  const menuItems = [
    { name: 'Home', icon: Home, path: '/home' },
    { name: 'Reportes Pasados', icon: FileText, path: '/reportes-pasados' },
    { name: 'Documentos Referencia', icon: Database, path: '/documentos-referencia' },
    { name: 'Usuarios', icon: Users, path: '/usuarios' },
    { name: 'Crear Usuario', icon: Plus, path: '/crear-usuario' },
    { name: 'Editar Usuario', icon: Edit, path: '/editar-usuario' },
    { name: 'Data Tables', icon: Table, path: '/data-table' },
    { name: 'Crear Activo', icon: Plus, path: '/create' },
    { name: 'Resultados', icon: BarChart, path: '/resultados' }
  ]

  return (
    <SidebarProvider>
      <div className="flex h-screen bg-gray-100 w-screen">
        <Sidebar defaultOpen={true} className="border-r">
          <SidebarHeader className="p-4">
            <Link to="/home" className="flex items-center space-x-2 text-blue-600">
              <img src={Logo} alt="RiskVision Logo" className="h-14 w-14" /> {/* Usar el logo en lugar del ícono Shield */}
              <span className="text-2xl font-bold">RiskVision</span>
            </Link>
          </SidebarHeader>
          <SidebarContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.name}>
                  <SidebarMenuButton asChild isActive={location.pathname === item.path}>
                    <Link to={item.path} className="flex items-center space-x-2 w-full">
                      <item.icon className="h-5 w-5" />
                      <span>{item.name}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarContent>
          <SidebarFooter className="p-4">
            <SidebarTrigger>
              <Button variant="ghost" size="icon" className="w-full flex items-center justify-center">
                <ChevronLeft className="h-4 w-4" />
                <span className="sr-only">Toggle sidebar</span>
              </Button>
            </SidebarTrigger>
          </SidebarFooter>
        </Sidebar>

        {/* Main content */}
        <main className="flex-1 overflow-y-auto">
          <header className="bg-white shadow-sm p-4 flex items-center">
            <SidebarTrigger>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle sidebar</span>
              </Button>
            </SidebarTrigger>
            <h1 className="text-xl font-semibold text-gray-800 ml-4">
              {menuItems.find(item => item.path === location.pathname)?.name || 'RiskVision'}
            </h1>
          </header>
          <div className="p-4 max-w-7xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </SidebarProvider>
  )
}

export default Layout