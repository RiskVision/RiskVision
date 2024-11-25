"use client"

import React, { useState, useEffect, useRef } from 'react'
import { Button } from "../../components/ui/button"
import { Input } from "../../components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../components/ui/table"
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "../../components/ui/breadcrumb"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../../components/ui/dialog"
import { toast, useToast } from "../../hooks/use-toast"
import { EyeIcon, FileIcon, FolderIcon, TrashIcon, UploadIcon } from 'lucide-react'
import { listFiles, uploadFile, deleteFile, testConnection} from '../../client/blobStorage/blobStorageReportes.methods'
import { FilePreview } from '../../components/file-preview'

export default function ReportesPasados() {
  const [files, setFiles] = useState([])
  const [currentPath, setCurrentPath] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [fileToDelete, setFileToDelete] = useState(null);
  const { toast } = useToast()
  const fileInputRef = useRef(null);

  useEffect(() => {
    fetchFiles(currentPath);
  }, [currentPath])

  const fetchFiles = async () => {
    setIsLoading(true);
    try {
      console.log(`Obteniendo archivos para la ruta: ${currentPath}`);
      const fileList = await listFiles(currentPath);
      setFiles(fileList);
    } catch (error) {
      console.error(`Error al obtener archivos para la ruta ${currentPath}:`, error);
      toast({
        title: "Error",
        description: `No se pudieron obtener los archivos para la ruta ${currentPath}. Por favor, inténtelo de nuevo.`,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpload = async (event) => {
    const file = event.target.files[0]
    if (!file) return

    setIsLoading(true)
    try {
      await uploadFile(currentPath, file)
      await fetchFiles()
      toast({
        title: "Éxito",
        description: "Archivo subido correctamente",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "No se pudo subir el archivo. Por favor, inténtelo de nuevo.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleDelete = async (fileName) => {
    if (!fileName) return;
    setIsLoading(true);
    try {
      await deleteFile(currentPath, fileName);
      await fetchFiles();
      toast({
        title: "Éxito",
        description: "Archivo eliminado correctamente",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "No se pudo eliminar el archivo. Por favor, inténtelo de nuevo.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
      setFileToDelete(null);
      setIsDeleteDialogOpen(false);
    }
  };

  const navigateTo = (path) => {
    setCurrentPath(path);
  };

  const renderBreadcrumbs = () => {
    const parts = currentPath.split('/').filter(Boolean)
    return (
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink onClick={() => navigateTo('')}>Inicio</BreadcrumbLink>
          </BreadcrumbItem>
          {parts.map((part, index) => (
            <React.Fragment key={index}>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink onClick={() => navigateTo(parts.slice(0, index + 1).join('/'))}>
                  {part}
                </BreadcrumbLink>
              </BreadcrumbItem>
            </React.Fragment>
          ))}
        </BreadcrumbList>
      </Breadcrumb>
    )
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Administrador de Archivos</h1>
      {renderBreadcrumbs()}
      <div className="my-4">
        <Input
          type="file"
          onChange={handleUpload}
          className="hidden"
          id="file-upload"
          disabled={isLoading}
          ref={fileInputRef}
        />
        <Button 
          onClick={() => fileInputRef.current?.click()} 
          disabled={isLoading}
        >
          <UploadIcon className="mr-2 h-4 w-4" /> Subir Archivo
        </Button>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nombre</TableHead>
            <TableHead>Tipo</TableHead>
            <TableHead>Tamaño</TableHead>
            <TableHead>Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isLoading ? (
            <TableRow>
              <TableCell colSpan={4} className="text-center">Cargando...</TableCell>
            </TableRow>
          ) : files.length === 0 ? (
            <TableRow>
              <TableCell colSpan={4} className="text-center">No se encontraron archivos</TableCell>
            </TableRow>
          ) : (
            files.map((file) => (
              <TableRow key={file.name}>
                <TableCell className="font-medium">
                  {file.type === 'folder' ? (
                    <Button variant="ghost" onClick={() => navigateTo(`${currentPath}/${file.name}`)}>
                      <FolderIcon className="mr-2 h-4 w-4" /> {file.name}
                    </Button>
                  ) : (
                    <span><FileIcon className="inline mr-2 h-4 w-4" /> {file.name}</span>
                  )}
                </TableCell>
                <TableCell>{file.type === 'folder' ? 'Carpeta' : 'Archivo'}</TableCell>
                <TableCell>{file.size}</TableCell>
                <TableCell>
                  {file.type !== 'folder' && (
                    <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
                      <DialogTrigger asChild>
                        <Button variant="destructive" size="sm" onClick={() => {
                          setFileToDelete(file.name);
                          setIsDeleteDialogOpen(true);
                        }}>
                          <TrashIcon className="h-4 w-4" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>¿Está seguro de que desea eliminar este archivo?</DialogTitle>
                        </DialogHeader>
                        <div className="flex justify-end space-x-2">
                          <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>Cancelar</Button>
                          <Button variant="destructive" onClick={() => handleDelete(fileToDelete)}>Eliminar</Button>
                        </div>
                      </DialogContent>
                    </Dialog>
                  )}
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  )
}
