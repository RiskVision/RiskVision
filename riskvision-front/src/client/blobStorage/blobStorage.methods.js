// Mock data for demonstration
const mockFiles = [
    { name: 'Documents', type: 'folder', size: '-' },
    { name: 'Images', type: 'folder', size: '-' },
    { name: 'report.pdf', type: 'file', size: '2.5 MB' },
    { name: 'presentation.pptx', type: 'file', size: '5.1 MB' },
  ];
  
  export async function listFiles(path) {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    return mockFiles;
  }
  
  export async function uploadFile(path, file) {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log(`File ${file.name} uploaded to ${path}`);
  }
  
  export async function deleteFile(path, fileName) {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    console.log(`File ${fileName} deleted from ${path}`);
  }
  
  