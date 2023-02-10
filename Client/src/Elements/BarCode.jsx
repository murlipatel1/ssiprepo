import Quagga from 'quagga';
import React from 'react';

export default function BarCode(){


// const Quagga = require('require').default;
Quagga.init({
    inputStream:{
        name:"Live",
        type:"LiveStream",
        target: document.querySelector("#Scan-button") //some random element needs to be put here as in so we get the clarity to whcihc target needs to be specified
    },
    decpde:{
        readers: ["code_128_reader"]
    }
}, function(err){
    if(err){
        console.log(err);
        return
    }
    console.log("Initialization finished. Ready to start!")
    Quagga.start();
})

return(
    <div className='first'>
        <div>
            BARCODE SCANNER
        </div>
        <button >Press me!!</button>
    </div>
)

}