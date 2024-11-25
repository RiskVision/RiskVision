"use client"

import React, { useState, useEffect } from 'react'
import { Button } from "../../components/ui/button"
import { Input } from "../../components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../components/ui/table"
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "../../components/ui/breadcrumb"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../../components/ui/dialog"
import { toast, useToast } from "../../hooks/use-toast"
import { FileIcon, FolderIcon, TrashIcon, UploadIcon } from 'lucide-react'
import { listFiles, uploadFile, deleteFile } from '../../client/blobStorage/blobStorage.methods'

export default function FileManager() {
  const [files, setFiles] = useState([])
  const [currentPath, setCurrentPath] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  useEffect(() => {
    fetchFiles(currentPath)
  }, [currentPath])

  const fetchFiles = async (path) => {
    setIsLoading(true)
    try {
      const fileList = await listFiles(path)
      setFiles(fileList)
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch files",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleUpload = async (event) => {
    const file = event.target.files[0]
    if (!file) return

    setIsLoading(true)
    try {
      await uploadFile(currentPath, file)
      fetchFiles(currentPath)
      toast({
        title: "Success",
        description: "File uploaded successfully",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to upload file",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleDelete = async (fileName) => {
    setIsLoading(true)
    try {
      await deleteFile(currentPath, fileName)
      fetchFiles(currentPath)
      toast({
        title: "Success",
        description: "File deleted successfully",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete file",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const navigateTo = (path) => {
    setCurrentPath(path)
  }

  const renderBreadcrumbs = () => {
    const parts = currentPath.split('/').filter(Boolean)
    return (
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink onClick={() => navigateTo('')}>Home</BreadcrumbLink>
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
      <h1 className="text-2xl font-bold mb-4">File Manager</h1>
      {renderBreadcrumbs()}
      <div className="my-4">
        <Input
          type="file"
          onChange={handleUpload}
          className="hidden"
          id="file-upload"
          disabled={isLoading}
        />
        <label htmlFor="file-upload">
          <Button as="span" disabled={isLoading}>
            <UploadIcon className="mr-2 h-4 w-4" /> Upload File
          </Button>
        </label>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Size</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isLoading ? (
            <TableRow>
              <TableCell colSpan={4} className="text-center">Loading...</TableCell>
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
                <TableCell>{file.type}</TableCell>
                <TableCell>{file.size}</TableCell>
                <TableCell>
                  {file.type !== 'folder' && (
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="destructive" size="sm">
                          <TrashIcon className="h-4 w-4" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Are you sure you want to delete this file?</DialogTitle>
                        </DialogHeader>
                        <div className="flex justify-end space-x-2">
                          <Button variant="outline" onClick={() => {}}>Cancel</Button>
                          <Button variant="destructive" onClick={() => handleDelete(file.name)}>Delete</Button>
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

