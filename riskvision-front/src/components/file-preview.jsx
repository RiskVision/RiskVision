"use client"

import { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog"
import { Card, CardContent } from "./ui/card"
import { Button } from "./ui/button"
import { FileIcon, ChevronLeftIcon, ChevronRightIcon, Loader2Icon } from 'lucide-react'
import { Document, Page, pdfjs } from 'react-pdf'
import 'react-pdf/dist/Page/AnnotationLayer.css'
import 'react-pdf/dist/Page/TextLayer.css'

// Configure PDF.js worker
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`

// interface FilePreviewProps {
//   file: {
//     name: string
//     type: string
//     url?: string
//   }
//   isOpen: boolean
//   onClose: () => void
// }

export function FilePreview({ file, isOpen, onClose }) {
  const [numPages, setNumPages] = useState(0)
  const [pageNumber, setPageNumber] = useState(1)
  const [isLoading, setIsLoading] = useState(true)

  const getFileExtension = (filename) => {
    return filename.slice((filename.lastIndexOf(".") - 1 >>> 0) + 2).toLowerCase()
  }

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages)
    setIsLoading(false)
  }

  const changePage = (offset) => {
    setPageNumber(prevPageNumber => prevPageNumber + offset)
  }

  const renderPDFPreview = () => {
    return (
      <div className="flex flex-col items-center">
        <div className="relative w-full max-w-3xl bg-background">
          <Document
            file={file.url}
            onLoadSuccess={onDocumentLoadSuccess}
            loading={
              <div className="flex items-center justify-center p-8">
                <Loader2Icon className="h-8 w-8 animate-spin" />
              </div>
            }
            error={
              <div className="flex flex-col items-center justify-center p-8 text-destructive">
                <p>Error al cargar el PDF</p>
                <p className="text-sm">Por favor, intente de nuevo más tarde</p>
              </div>
            }
          >
            <Page 
              pageNumber={pageNumber} 
              width={800}
              renderTextLayer={true}
              renderAnnotationLayer={true}
            />
          </Document>
        </div>
        {numPages > 0 && (
          <div className="flex items-center gap-4 mt-4">
            <Button
              variant="outline"
              size="sm"
              onClick={() => changePage(-1)}
              disabled={pageNumber <= 1}
            >
              <ChevronLeftIcon className="h-4 w-4" />
            </Button>
            <span className="text-sm">
              Página {pageNumber} de {numPages}
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => changePage(1)}
              disabled={pageNumber >= numPages}
            >
              <ChevronRightIcon className="h-4 w-4" />
            </Button>
          </div>
        )}
      </div>
    )
  }

  const renderPreview = () => {
    const extension = getFileExtension(file.name)

    switch (extension) {
      case 'pdf':
        return renderPDFPreview()
      case 'jpg':
      case 'jpeg':
      case 'png':
      case 'gif':
        return file.url ? (
          <div className="max-h-[80vh] overflow-auto">
            <img
              src={file.url}
              alt={file.name}
              className="w-full h-auto object-contain"
            />
          </div>
        ) : (
          <Card className="w-full max-w-md">
            <CardContent className="flex items-center justify-center p-6">
              <FileIcon className="h-20 w-20 text-muted-foreground" />
            </CardContent>
          </Card>
        )
      default:
        return (
          <Card className="w-full max-w-md">
            <CardContent className="flex items-center justify-center p-6">
              <FileIcon className="h-20 w-20 text-muted-foreground" />
            </CardContent>
          </Card>
        )
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={() => onClose()}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle>Vista previa: {file.name}</DialogTitle>
        </DialogHeader>
        <div className="mt-4">
          {renderPreview()}
        </div>
      </DialogContent>
    </Dialog>
  )
}

