
const http = require ('http');
const querystring = require ('querystring');


const colors = [
    { variant: "Vermillion", hex: "#2E191B" },
    { variant: "Forest", hex: "#0B6623" },
    { variant: "Navy", hex: "#000080" },
    { variant: "Crimson", hex: "#DC143C" },
    { variant: "Sky Blue", hex: "#87CEEB" },
    { variant: "Lime", hex: "#00FF00" },
    { variant: "Gold", hex: "#FFD700" },
    { variant: "Lavender", hex: "#E6E6FA" },
    { variant: "Tangerine", hex: "#F28500" },
    { variant: "Magenta", hex: "#FF00FF" },
    { variant: "Cyan", hex: "#00FFFF" },
    { variant: "Olive", hex: "#808000" },
    { variant: "Teal", hex: "#008080" },
    { variant: "Maroon", hex: "#800000" },
    { variant: "Coral", hex: "#FF7F50" }
];

const server = http.createServer((req, res) =>{
    console.log('Petición a la URl: ', req.url);
    res.setHeader('Content-Type', 'text/html; charset=UTF-8');
    
    if(req.url.startsWith('/color')){
        function getRandomElement(arr) {
            const randomIndex = Math.floor(Math.random() * arr.length);
            return arr[randomIndex];
            
        }
        const randomColor = getRandomElement(colors)
        res.write(`<h1 style = "color: ${randomColor.hex}">${randomColor.hex}</h1>`);
        res.end();
    }else{  
        res.write('<h1>Bienvenido</h1>');
        res.write('<p>Haz una petición....');
        res.end();
    }
    


})

server.listen(3000, () => {
    console.log('El servidr está corriendo');
})