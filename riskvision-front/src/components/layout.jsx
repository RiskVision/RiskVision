"use client"

import React from 'react'
import { Link, Outlet, useLocation } from 'react-router-dom'
import { Shield, Home, FileText, Database, Users, Plus, Edit, Table, BarChart, Menu, ChevronLeft } from 'lucide-react'
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
  SidebarMenuSub,
} from "./ui/sidebar"
import { Collapsible } from './ui/collapsible'
import { CollapsibleTrigger } from './ui/collapsible'
import { CollapsibleContent } from './ui/collapsible'

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
    { name: 'Resultados', icon: BarChart, path: '/resultados' },
    { name: 'Heatmap', icon: BarChart, path: '/heatmap' },
    { name: 'Documentos', icon: FileText, path: '/blobstorage' }
  ]

  return (
    <SidebarProvider>
      <div className="flex h-screen bg-gray-100 w-screen">
        <Sidebar defaultOpen={true} className="border-r">
          <SidebarHeader className="p-4">
            <Link to="/home" className="flex items-center space-x-2 text-blue-600">
              <Shield className="h-8 w-8" />
              <span className="text-2xl font-bold">RiskVision</span>
            </Link>
          </SidebarHeader>
          <SidebarContent>
            <SidebarMenu>
              <Collapsible defaultOpen className='group/collapsible'>
                <SidebarMenuItem>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton />
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <SidebarMenuSub>
                      <SidebarMenuItem>
                        Hola
                      </SidebarMenuItem>
                    </SidebarMenuSub>
                  </CollapsibleContent>
                </SidebarMenuItem>
              </Collapsible>

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