import React, { useState } from 'react';
import BurgerMenu from '../../components/menu/burgerMenu'; // Import the BurgerMenu component
import Logo from '../../components/images/logo-white.png';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // Import axios
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
    CardFooter,
} from '../../components/ui/card'; // Import the Card components
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

function Home() {
    const navigate = useNavigate();
    const [inputValue, setInputValue] = useState(''); // State to hold the input value
    const [response, setResponse] = useState(''); // State to hold the response from the server

    const handleRedirect = (url) => {
        navigate(url);
    };

    // Axios request to handle the prompt submission
    const handlePromptSubmit = async () => {
        try {
            const res = await axios.post('/your-endpoint', { prompt: inputValue });
            setResponse(res.data); // Update state with the server's response
        } catch (error) {
            console.error('There was an error processing the prompt:', error);
            setResponse('Error: Could not process your request.');
        }
    };

    // Nueva función vacía para una futura llamada
    const handleAIResponse = async () => {
        try {
            // Send the inputValue as a query parameter instead of in the body
            const res = await axios.get('http://localhost:8000/reports/getReport', {
                params: { prompt: inputValue },
            });

            if (res.status === 200) {
                const markdown = res.data.data.content; // Access the content properly

                console.log(markdown); // Log to verify the content

                // Store the Markdown content in localStorage
                localStorage.setItem('markdownContent', markdown);

                // Redirect to the /resultados route
                handleRedirect('/resultados');
            }
        } catch (error) {
            console.error('Error al procesar la respuesta del AI:', error);
        }
        console.log('Esta función realizará una llamada en el futuro');
    };
    return (
        <div className='space-y-6'>
            <section className='text-center'>
                <h1 className='text-3xl font-bold text-gray-800 mb-4'>
                    Welcome to RiskVision Dashboard
                </h1>
                <p className='text-xl text-gray-600 mb-8'>
                    Your AI-powered Cybersecurity Analysis Hub
                </p>
                <Button
                    asChild
                    className='text-lg px-8 py-4 bg-blue-600 text-white rounded-lg shadow-[5px_5px_10px_#b8b9be,-5px_-5px_10px_#ffffff] hover:shadow-[inset_5px_5px_10px_#4a4b4e,inset_-5px_-5px_10px_#ffffff] transition-all duration-300'
                >
                    <Link to='/reportes-pasados'>Generate New Report</Link>
                </Button>
            </section>

            <section>
                <h2 className='text-2xl font-semibold text-gray-800 mb-4'>
                    Current Status
                </h2>
                <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
                    <Card className='bg-white shadow-[5px_5px_10px_#b8b9be,-5px_-5px_10px_#ffffff]'>
                        <CardHeader className='flex flex-row items-center justify-between pb-2 space-y-0'>
                            <CardTitle className='text-sm font-medium'>
                                Risk Score
                            </CardTitle>
                            <AlertTriangle className='h-4 w-4 text-yellow-500' />
                        </CardHeader>
                        <CardContent>
                            <div className='text-2xl font-bold'>72/100</div>
                            <p className='text-xs text-gray-500'>
                                3% improvement from last month
                            </p>
                        </CardContent>
                    </Card>
                    <Card className='bg-white shadow-[5px_5px_10px_#b8b9be,-5px_-5px_10px_#ffffff]'>
                        <CardHeader className='flex flex-row items-center justify-between pb-2 space-y-0'>
                            <CardTitle className='text-sm font-medium'>
                                Active Threats
                            </CardTitle>
                            <Shield className='h-4 w-4 text-red-500' />
                        </CardHeader>
                        <CardContent>
                            <div className='text-2xl font-bold'>7</div>
                            <p className='text-xs text-gray-500'>
                                2 critical, 5 moderate
                            </p>
                        </CardContent>
                    </Card>
                    <Card className='bg-white shadow-[5px_5px_10px_#b8b9be,-5px_-5px_10px_#ffffff]'>
                        <CardHeader className='flex flex-row items-center justify-between pb-2 space-y-0'>
                            <CardTitle className='text-sm font-medium'>
                                Compliance Score
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
                    Quick Actions
                </h2>
                <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
                    <Button
                        variant='outline'
                        asChild
                        className='h-auto py-4 flex flex-col items-center justify-center space-y-2 bg-white shadow-[5px_5px_10px_#b8b9be,-5px_-5px_10px_#ffffff] hover:shadow-[inset_5px_5px_10px_#b8b9be,inset_-5px_-5px_10px_#ffffff] transition-all duration-300'
                    >
                        <Link to='/reportes-pasados'>
                            <FileCheck2 className='h-6 w-6' />
                            <span>View Past Reports</span>
                        </Link>
                    </Button>
                    <Button
                        variant='outline'
                        asChild
                        className='h-auto py-4 flex flex-col items-center justify-center space-y-2 bg-white shadow-[5px_5px_10px_#b8b9be,-5px_-5px_10px_#ffffff] hover:shadow-[inset_5px_5px_10px_#b8b9be,inset_-5px_-5px_10px_#ffffff] transition-all duration-300'
                    >
                        <Link to='/data-table'>
                            <Database className='h-6 w-6' />
                            <span>Digital Assets</span>
                        </Link>
                    </Button>
                    <Button
                        variant='outline'
                        asChild
                        className='h-auto py-4 flex flex-col items-center justify-center space-y-2 bg-white shadow-[5px_5px_10px_#b8b9be,-5px_-5px_10px_#ffffff] hover:shadow-[inset_5px_5px_10px_#b8b9be,inset_-5px_-5px_10px_#ffffff] transition-all duration-300'
                    >
                        <Link to='/documentos-referencia'>
                            <FileText className='h-6 w-6' />
                            <span>Reference Documents</span>
                        </Link>
                    </Button>
                </div>
            </section>
        </div>
    );
    //   <div className="min-h-screen bg-gray-100 flex flex-col">
    //     <header className="p-4 flex justify-between items-center bg-white shadow-sm">
    //       <div className="flex items-center space-x-2">
    //         <Shield className="h-8 w-8 text-blue-600" />
    //         {/* <Image
    //           src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-removebg-preview-BuRaN3XW8tt3m6DEFVgLO5MVhQ8Sbx.png"
    //           alt="RiskVision Logo"
    //           width={150}
    //           height={40}
    //           className="h-10 w-auto"
    //         /> */}
    //       </div>
    //       {/* <nav>
    //         <ul className="flex space-x-4">
    //           <li><Link href="#" className="text-gray-600 hover:text-blue-600">Dashboard</Link></li>
    //           <li><Link href="#" className="text-gray-600 hover:text-blue-600">Reports</Link></li>
    //           <li><Link href="#" className="text-gray-600 hover:text-blue-600">Assets</Link></li>
    //           <li><Link href="#" className="text-gray-600 hover:text-blue-600">Settings</Link></li>
    //         </ul>
    //       </nav> */}
    //     </header>

    //     <main className="flex-grow p-8">
    //       <section className="mb-12 text-center">
    //         <h1 className="text-4xl font-bold text-gray-800 mb-4">Welcome to RiskVision</h1>
    //         <p className="text-xl text-gray-600 mb-8">AI-powered Cybersecurity Analysis for Your Business</p>
    //         <Button className="text-lg px-8 py-4 bg-blue-600 text-white rounded-lg shadow-[5px_5px_10px_#b8b9be,-5px_-5px_10px_#ffffff] hover:shadow-[inset_5px_5px_10px_#4a4b4e,inset_-5px_-5px_10px_#ffffff] transition-all duration-300">
    //           Generate Report
    //         </Button>
    //       </section>

    //       <section className="mb-12">
    //         <h2 className="text-2xl font-semibold text-gray-800 mb-6">Current Status</h2>
    //         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
    //           <Card className="bg-white shadow-[5px_5px_10px_#b8b9be,-5px_-5px_10px_#ffffff]">
    //             <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
    //               <CardTitle className="text-sm font-medium">Risk Score</CardTitle>
    //               <AlertTriangle className="h-4 w-4 text-yellow-500" />
    //             </CardHeader>
    //             <CardContent>
    //               <div className="text-2xl font-bold">72/100</div>
    //               <p className="text-xs text-gray-500">3% improvement from last month</p>
    //             </CardContent>
    //           </Card>
    //           <Card className="bg-white shadow-[5px_5px_10px_#b8b9be,-5px_-5px_10px_#ffffff]">
    //             <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
    //               <CardTitle className="text-sm font-medium">Active Threats</CardTitle>
    //               <Shield className="h-4 w-4 text-red-500" />
    //             </CardHeader>
    //             <CardContent>
    //               <div className="text-2xl font-bold">7</div>
    //               <p className="text-xs text-gray-500">2 critical, 5 moderate</p>
    //             </CardContent>
    //           </Card>
    //           <Card className="bg-white shadow-[5px_5px_10px_#b8b9be,-5px_-5px_10px_#ffffff]">
    //             <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
    //               <CardTitle className="text-sm font-medium">Compliance Score</CardTitle>
    //               <BarChart3 className="h-4 w-4 text-green-500" />
    //             </CardHeader>
    //             <CardContent>
    //               <div className="text-2xl font-bold">89%</div>
    //               <p className="text-xs text-gray-500">ISO 27001: 92%, LGPDPPP: 86%</p>
    //             </CardContent>
    //           </Card>
    //         </div>
    //       </section>

    //       {/* <section className="mb-12">
    //         <h2 className="text-2xl font-semibold text-gray-800 mb-6">Compliance Breakdown</h2>
    //         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
    //           {[
    //             { standard: "ISO 27001", score: 92 },
    //             { standard: "ISO 27005", score: 88 },
    //             { standard: "CNBV", score: 90 },
    //             { standard: "LGPDPPP", score: 86 },
    //           ].map((item) => (
    //             <Card key={item.standard} className="bg-white shadow-[5px_5px_10px_#b8b9be,-5px_-5px_10px_#ffffff]">
    //               <CardHeader className="pb-2">
    //                 <CardTitle className="text-sm font-medium">{item.standard}</CardTitle>
    //               </CardHeader>
    //               <CardContent>
    //                 <div className="text-2xl font-bold">{item.score}%</div>
    //                 <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
    //                   <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${item.score}%` }}></div>
    //                 </div>
    //               </CardContent>
    //             </Card>
    //           ))}
    //         </div>
    //       </section> */}

    //       <section className="mb-12">
    //         <h2 className="text-2xl font-semibold text-gray-800 mb-6">Quick Actions</h2>
    //         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
    //           <Button variant="outline" className="h-auto py-4 flex flex-col items-center justify-center space-y-2 bg-white shadow-[5px_5px_10px_#b8b9be,-5px_-5px_10px_#ffffff] hover:shadow-[inset_5px_5px_10px_#b8b9be,inset_-5px_-5px_10px_#ffffff] transition-all duration-300">
    //             <FileCheck2 className="h-6 w-6" />
    //             <span>Open Last Report</span>
    //           </Button>
    //           <Button variant="outline" className="h-auto py-4 flex flex-col items-center justify-center space-y-2 bg-white shadow-[5px_5px_10px_#b8b9be,-5px_-5px_10px_#ffffff] hover:shadow-[inset_5px_5px_10px_#b8b9be,inset_-5px_-5px_10px_#ffffff] transition-all duration-300">
    //             <Database className="h-6 w-6" />
    //             <span>Digital Assets</span>
    //           </Button>
    //           <Button variant="outline" className="h-auto py-4 flex flex-col items-center justify-center space-y-2 bg-white shadow-[5px_5px_10px_#b8b9be,-5px_-5px_10px_#ffffff] hover:shadow-[inset_5px_5px_10px_#b8b9be,inset_-5px_-5px_10px_#ffffff] transition-all duration-300">
    //             <FileText className="h-6 w-6" />
    //             <span>Compliance Checklist</span>
    //           </Button>
    //         </div>
    //       </section>

    //       <section className="mb-12">
    //         <h2 className="text-2xl font-semibold text-gray-800 mb-6">Recent Activity</h2>
    //         <Card className="bg-white shadow-[5px_5px_10px_#b8b9be,-5px_-5px_10px_#ffffff]">
    //           <CardContent className="p-6">
    //             <ul className="space-y-4">
    //               {[
    //                 { action: "Report Generated", date: "2023-06-15", icon: <FileText className="h-5 w-5 text-blue-500" /> },
    //                 { action: "New Threat Detected", date: "2023-06-14", icon: <AlertTriangle className="h-5 w-5 text-red-500" /> },
    //                 { action: "Compliance Check Completed", date: "2023-06-13", icon: <CheckCircle className="h-5 w-5 text-green-500" /> },
    //               ].map((item, index) => (
    //                 <li key={index} className="flex items-center space-x-3">
    //                   {item.icon}
    //                   <div>
    //                     <p className="text-sm font-medium">{item.action}</p>
    //                     <p className="text-xs text-gray-500">{item.date}</p>
    //                   </div>
    //                 </li>
    //               ))}
    //             </ul>
    //           </CardContent>
    //         </Card>
    //       </section>

    //       <section className="mb-12">
    //         <h2 className="text-2xl font-semibold text-gray-800 mb-6">AI-Powered Features</h2>
    //         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
    //           {[
    //             { title: "Intelligent Threat Detection", description: "Our AI algorithms analyze patterns to identify potential security threats before they become critical." },
    //             { title: "Automated Compliance Checks", description: "AI-driven compliance checks ensure your systems adhere to the latest regulatory standards." },
    //             { title: "Predictive Risk Analysis", description: "Advanced machine learning models predict potential risks based on your company's unique digital footprint." },
    //             { title: "Natural Language Report Generation", description: "AI transforms complex data into clear, actionable reports in natural language." },
    //           ].map((feature, index) => (
    //             <Card key={index} className="bg-white shadow-[5px_5px_10px_#b8b9be,-5px_-5px_10px_#ffffff]">
    //               <CardHeader>
    //                 <CardTitle className="text-lg font-semibold flex items-center">
    //                   <Brain className="h-5 w-5 mr-2 text-blue-500" />
    //                   {feature.title}
    //                 </CardTitle>
    //               </CardHeader>
    //               <CardContent>
    //                 <p className="text-sm text-gray-600">{feature.description}</p>
    //               </CardContent>
    //             </Card>
    //           ))}
    //         </div>
    //       </section>

    //       <section className="mb-12">
    //         <h2 className="text-2xl font-semibold text-gray-800 mb-6">What Our Clients Say</h2>
    //         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
    //           {[
    //             { name: "John Doe", company: "Tech Solutions Inc.", quote: "RiskVision has transformed our approach to cybersecurity. The AI-powered insights are invaluable." },
    //             { name: "Jane Smith", company: "Global Finance Ltd.", quote: "The compliance features have made our audits a breeze. Highly recommended for any financial institution." },
    //           ].map((testimonial, index) => (
    //             <Card key={index} className="bg-white shadow-[5px_5px_10px_#b8b9be,-5px_-5px_10px_#ffffff]">
    //               <CardContent className="p-6">
    //                 <blockquote className="text-gray-600 italic mb-4">"{testimonial.quote}"</blockquote>
    //                 <div className="flex items-center">
    //                   <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold mr-3">
    //                     {testimonial.name.charAt(0)}
    //                   </div>
    //                   <div>
    //                     <p className="font-semibold">{testimonial.name}</p>
    //                     <p className="text-sm text-gray-500">{testimonial.company}</p>
    //                   </div>
    //                 </div>
    //               </CardContent>
    //             </Card>
    //           ))}
    //         </div>
    //       </section>

    //       <section className="mb-12">
    //         <h2 className="text-2xl font-semibold text-gray-800 mb-6">Frequently Asked Questions</h2>
    //         <div className="space-y-4">
    //           {[
    //             { question: "How does RiskVision use AI for cybersecurity analysis?", answer: "RiskVision leverages advanced machine learning algorithms to analyze your digital assets, identify potential threats, and provide actionable insights for improving your security posture." },
    //             { question: "What compliance standards does RiskVision support?", answer: "RiskVision supports a wide range of compliance standards, including ISO 27001, ISO 27005, CNBV regulations, and LGPDPPP. Our AI-driven system keeps up with the latest regulatory changes to ensure your business stays compliant." },
    //             { question: "How often should I generate a new security report?", answer: "We recommend generating a new security report at least once a month, or more frequently if your business undergoes significant changes or faces increased threats. Our AI continuously monitors your systems, allowing for real-time updates and alerts." },
    //           ].map((faq, index) => (
    //             <Card key={index} className="bg-white shadow-[5px_5px_10px_#b8b9be,-5px_-5px_10px_#ffffff]">
    //               <CardHeader>
    //                 <CardTitle className="text-lg font-semibold">{faq.question}</CardTitle>
    //               </CardHeader>
    //               <CardContent>
    //                 <p className="text-gray-600">{faq.answer}</p>
    //               </CardContent>
    //             </Card>
    //           ))}
    //         </div>
    //       </section>
    //     </main>

    //     <footer className="bg-white shadow-sm p-4 text-center text-gray-600">
    //       © 2023 RiskVision. All rights reserved.
    //     </footer>
    //   </div>
    // )
    // return (
    //   <div className="h-screen bg-gray-100 relative bg-homebg bg-cover">
    //     <BurgerMenu /> {/* Use the BurgerMenu component */}

    //     {/* KPI Section */}
    //     <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-screen-lg mx-auto my-4">
    //       <h2 className="text-2xl font-semibold mb-4">KPI Dashboard</h2>
    //       <div className="grid grid-cols-3 gap-4 text-center">
    //         {/* Example KPI 1 */}
    //         <div className="bg-gray-200 p-4 rounded-md">
    //           <h3 className="text-lg font-medium">Vulnerabilidades de interés</h3>
    //           {/*<p className="text-2xl font-bold">1,234</p>*/}
    //           <div className="mt-4 text-center">
    //             <div className="spinner"></div> {/* Spinner */}
    //             <p>Cargando</p>
    //           </div>
    //         </div>
    //         {/* Example KPI 2 */}
    //         <div className="bg-gray-200 p-4 rounded-md">
    //           <h3 className="text-lg font-medium">Recomendaciones</h3>
    //           {/*<p className="text-2xl font-bold">567</p>*/}
    //           <div className="mt-4 text-center">
    //             <div className="spinner"></div> {/* Spinner */}
    //             <p>Cargando</p>
    //           </div>
    //         </div>
    //         {/* Example KPI 3 */}
    //         <div className="bg-gray-200 p-4 rounded-md">
    //           <h3 className="text-lg font-medium">Activos vulnerables</h3>
    //           {/*<p className="text-2xl font-bold">12.5%</p>*/}
    //           <div className="mt-4 text-center">
    //             <div className="spinner"></div> {/* Spinner */}
    //             <p>Cargando</p>
    //           </div>
    //         </div>
    //       </div>
    //     </div>

    //     {/* Main content */}
    //     <div className="flex flex-col items-center justify-center h-[70vh]">
    //       <button onClick={() => {handleAIResponse()}} className="w-60 h-60 bg-201E43 rounded-full flex items-center justify-center">
    //         <img src={Logo} alt="logo" className="max-w-full max-h-full p-10" />
    //       </button>

    //       {/* Text input field below the big button */}
    //       <input
    //         type="text"
    //         value={inputValue}
    //         onChange={(e) => setInputValue(e.target.value)} // Update the state with input value
    //         onKeyPress={(e) => {
    //           if (e.key === 'Enter') {
    //             handlePromptSubmit(); // Submit the prompt on Enter key press
    //           }
    //         }}
    //         placeholder="Enter your message..."
    //         className="mt-6 px-4 py-2 border rounded-md w-80"
    //       />

    //       {/* Display the response below the input field */}
    //       {response && (
    //         <div className="mt-4 p-4 bg-white border rounded-md w-80 text-center">
    //           {response}
    //         </div>
    //       )}

    //       {/* Action Buttons 60px below the Circle Button, Side by Side */}
    //       <div className="flex justify-center space-x-4 mt-16">
    //         <button className="px-6 py-2 bg-508C9B text-white rounded-md">
    //           Ver Informe
    //         </button>
    //         <button onClick={() => { handleRedirect('/data-table') }} className="px-6 py-2 bg-508C9B text-white rounded-md">
    //           Ver Activos Digitales
    //         </button>
    //         <button onClick={() =>{handleRedirect('/reporte')}} className="px-6 py-2 bg-508C9B text-white rounded-md">
    //           Reporte
    //         </button>
    //       </div>
    //     </div>
    //   </div>
    // );
}

export default Home;
