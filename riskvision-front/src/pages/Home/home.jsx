import React, { useState } from 'react';
import BurgerMenu from '../../components/Menu/BurgerMenu'; // Importar el componente BurgerMenu
import Logo from '../../components/images/logo-blue.png';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // Importar axios
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
    CardFooter,
} from '../../components/ui/card'; // Importar los componentes Card
import { Button } from '../../components/ui/button';
import {
    Shield,
    FileText,
    Database,
    AlertTriangle,
    BarChart3,
    FileCheck2,
    Activity,
    Brain,
    MessageSquare,
    CheckCircle,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { markdownTests } from '../../globals';

function Home() {
    const navigate = useNavigate();
    const [inputValue, setInputValue] = useState(''); // Estado para mantener el valor del input
    const [response, setResponse] = useState(''); // Estado para mantener la respuesta del servidor

    const handleRedirect = (url) => {
        navigate(url);
    };

    // Nueva función vacía para una futura llamada
    const handleAIResponse = async () => {
        try {
            // Redirigir a la ruta /resultados
            navigate('/resultados', { state: { markdownContent: markdownTests[4] } });
        } catch (error) {
            console.error('Error al procesar la respuesta del AI:', error);
        }
    };

    return (
        <div className='space-y-6'>
            <section className='text-center'>
                <h1 className='text-3xl font-bold text-gray-800 mb-4'>
                    Bienvenido a RiskVision
                </h1>
                <p className='text-xl text-gray-600 mb-8'>
                    Tu centro de análisis de riesgos impulsado por IA
                </p>
                <Button onClick={() => {handleAIResponse()}}
                    className='text-lg px-8 py-4 bg-blue-900 text-white rounded-lg shadow-[2px_2px_6px_#2f3238,inset_-4px_-4px_8px_#1c1f24] hover:bg-blue-800 hover:shadow-[inset_2px_2px_6px_#2f3238,inset_-4px_-4px_8px_#1c1f24] transition-all duration-300'

                >
                    <Link to='/resultados'>Generar Nuevo Reporte</Link>
                </Button>
            </section>

            <section>
                <h2 className='text-2xl font-semibold text-gray-800 mb-4'>
                    Estado Actual
                </h2>
                <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
                    <Card className='bg-white shadow-[5px_5px_10px_#b8b9be,-5px_-5px_10px_#ffffff]'>
                        <CardHeader className='flex flex-row items-center justify-between pb-2 space-y-0'>
                            <CardTitle className='text-sm font-medium'>
                                Puntuación de Riesgo
                            </CardTitle>
                            <AlertTriangle className='h-4 w-4 text-yellow-500' />
                        </CardHeader>
                        <CardContent>
                            <div className='text-2xl font-bold'>72/100</div>
                            <p className='text-xs text-gray-500'>
                                3% de mejora desde el mes pasado
                            </p>
                        </CardContent>
                    </Card>
                    <Card className='bg-white shadow-[5px_5px_10px_#b8b9be,-5px_-5px_10px_#ffffff]'>
                        <CardHeader className='flex flex-row items-center justify-between pb-2 space-y-0'>
                            <CardTitle className='text-sm font-medium'>
                                Amenazas Activas
                            </CardTitle>
                            <Shield className='h-4 w-4 text-red-500' />
                        </CardHeader>
                        <CardContent>
                            <div className='text-2xl font-bold'>7</div>
                            <p className='text-xs text-gray-500'>
                                2 críticas, 5 moderadas
                            </p>
                        </CardContent>
                    </Card>
                    <Card className='bg-white shadow-[5px_5px_10px_#b8b9be,-5px_-5px_10px_#ffffff]'>
                        <CardHeader className='flex flex-row items-center justify-between pb-2 space-y-0'>
                            <CardTitle className='text-sm font-medium'>
                                Puntuación de Cumplimiento
                            </CardTitle>
                            <BarChart3 className='h-4 w-4 text-green-500' />
                        </CardHeader>
                        <CardContent>
                            <div className='text-2xl font-bold'>89%</div>
                            <p className='text-xs text-gray-500'>
                                ISO 27001: 92%, LGPDPPP: 86%
                            </p>
                        </CardContent>
                    </Card>
                </div>
            </section>

            <section>
                <h2 className='text-2xl font-semibold text-gray-800 mb-4'>
                    Acciones Rápidas
                </h2>
                <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
                    <Button
                        variant='outline'
                        asChild
                        className='h-auto py-4 flex flex-col items-center justify-center space-y-2 bg-white shadow-[5px_5px_10px_#b8b9be,-5px_-5px_10px_#ffffff] hover:shadow-[inset_5px_5px_10px_#b8b9be,inset_-5px_-5px_10px_#ffffff] transition-all duration-300'
                    >
                        <Link to='/reportes-pasados'>
                            <FileCheck2 className='h-6 w-6' />
                            <span>Ver Reportes Pasados</span>
                        </Link>
                    </Button>
                    <Button
                        variant='outline'
                        asChild
                        className='h-auto py-4 flex flex-col items-center justify-center space-y-2 bg-white shadow-[5px_5px_10px_#b8b9be,-5px_-5px_10px_#ffffff] hover:shadow-[inset_5px_5px_10px_#b8b9be,inset_-5px_-5px_10px_#ffffff] transition-all duration-300'
                    >
                        <Link to='/data-table'>
                            <Database className='h-6 w-6' />
                            <span>Activos Digitales</span>
                        </Link>
                    </Button>
                    <Button
                        variant='outline'
                        asChild
                        className='h-auto py-4 flex flex-col items-center justify-center space-y-2 bg-white shadow-[5px_5px_10px_#b8b9be,-5px_-5px_10px_#ffffff] hover:shadow-[inset_5px_5px_10px_#b8b9be,inset_-5px_-5px_10px_#ffffff] transition-all duration-300'
                    >
                        <Link to='/documentos-referencia'>
                            <FileText className='h-6 w-6' />
                            <span>Documentos de Referencia</span>
                        </Link>
                    </Button>
                </div>
            </section>
        </div>
    );
}

export default Home;