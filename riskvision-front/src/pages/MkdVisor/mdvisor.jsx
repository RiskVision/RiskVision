import React from "react";
import Markdown from "react-markdown";
import './mdvisor.styles.scss'

const MDVisor = () =>{
    const testMD = "# Test **this**"

    return(
        <div className="mkdiv container flex  juustify-start mx-auto my-6">
            <Markdown>{testMD}</Markdown>
        </div>
    )
}

export default MDVisor