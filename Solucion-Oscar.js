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



// Módulo interno
const http = require('http');
const fs = require('fs');
const querystring = require('querystring');

// Creamos servidor y lo asigno a una variable
const server = http.createServer((req, res) => {

    // Nos quedamos con la propiedad url del objeto req (request)
    // Para obtener la URL del objeto request usaremos el operador de desestructuración de objetos
    const { url } = req;
    res.setHeader('Content-Type', 'text/html; charset=utf-8');

    // Caso que tiene ?variant
    if (url.startsWith("/color?")) {
        // Usamos el operador de desestructuración para asignar a la variable path la primera posición del array y a la variable queryString la segunda posición del array
        const [path, queryString] = req.url.split('?');
        const qs = querystring.parse(queryString);
        console.log("🚀 ~ file: app.js:39 ~ server ~ qs:", qs);

        // 1. Utilizar el método de array adecuado para buscar la variante del color en el array 'colors'
        const chooseColor = colors.find(c => c.variant.toLowerCase() == qs.variant.toLowerCase());
        console.log("🚀 ~ file: Solucion-Oscar.js:43 ~ server ~ chooseColor:", chooseColor)
       
        // 2. Si encuentra el color, devolverlo tal y cómo lo hacemos aquí         res.end(`<p style="color: ${hex}">${hex}</p>`)
        if(chooseColor){
            res.write(`<p style="color: ${chooseColor.hex}">${chooseColor.hex}</p>`);
        }
        // 3. Si NO encuentra el color, mandarle uno al azar.  Mandarle también un mensaje diciendo que la variante de color elegida NO EXiste. Opcionalmente podéis enviarle el array de colores que puede usar

        else{
            res.write(`El color ${qs.variant} no existe. Te muestro un color al azar`)
            // obtener un color aleatório
            const indexRandomColor = Math.floor(Math.random() * colors.length);
            const randomColor = colors[indexRandomColor];

            const { hex } = randomColor;
            res.write(`<p style="color: ${hex}">${hex}</p>`)
        }

        res.end();
    }

    else if (url == "/color") {

        // Iteración 3: Comprobar si me han pasado una queryString o no. En caso de que si: obtener el color en función del ?variant=Vermillion. En caso contrario obtener un color aleatório

        // obtener un color aleatório
        const indexRandomColor = Math.floor(Math.random() * colors.length);
        const randomColor = colors[indexRandomColor];

        // me quedo con la propiedad .hex del color
        const { hex } = randomColor;
        res.statusCode = 200;
        res.end(`<p style="color: ${hex}">${hex}</p>`)

    } else if (url == "/") {

        // Especificar que vamos a enviar un html
        // Tenemos que especificar que la codificación es utf-8


        res.write('<h1>Bienvenido al servidor de colores</h1>');
        res.write('<p>Haz una petición a /color para obtener un color aleatório</p>');
        res.end();
    } else {
        // el recurso/endpoint/ruta que intentas acceder no existe
        res.statusCode = 404;
        // le enviamos el fichero 404.html
        // Voy a leer el fichero con un método síncrono
        const htmlContent = fs.readFileSync("./404.html");
        res.end(htmlContent);
    }
});

// levantamos el servidor en el puerto 3000
server.listen(3000, () => {
    console.log('Server running in port 3000');
});
