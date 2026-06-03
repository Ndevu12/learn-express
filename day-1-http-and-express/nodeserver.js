const http = require("http");

const server = http.createServer((req, res) => {
    const { url, method } = req;

    const obj = {
    hello: "kama",
    another: 3
};
        if (url == '/' && method == 'GET'){
                const obj = {
            hello: "kama",
            another: 3
        };

        let other = 4;

        const { hello } = obj;

        console.log(
            `Let us see what is inside another: ${obj.another}`
        );

        console.log(`Let us see what is inside Hello: ${hello}`)

        res.end(`Home Route, Let us see what is inside Hello: ${hello}, inside another: ${obj.another}`);
    } else if (url === 'about' && method === 'GET'){
                let other = 4;

        const { hello } = obj;

        console.log(
            `Let us see what is inside another: ${obj.another}`
        );

        console.log(`Let us see what is inside Hello: ${hello}`)

        res.end(`Hello about, Let us see what is inside Hello: ${hello}, inside another: ${obj.another}`);
    } else {
                let other = 4;

        const { hello } = obj;

        console.log(
            `Let us see what is inside another: ${obj.another}`
        );

        console.log(`Let us see what is inside Hello: ${hello}, inside another: ${obj.another}`)

        res.statusCode = 404;
        res.end(`Route not found! Let us see what is inside Hello: ${hello}, inside another: ${obj.another}`);
    }
});

server.listen(8000, () => {
    console.log(`Server is listerning on http://localhost:8000`);
});
