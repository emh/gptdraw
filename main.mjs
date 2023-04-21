import Fastify from 'fastify';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import fastifyStatic from '@fastify/static';
import fastifyCors from '@fastify/cors';
import * as fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const fastify = Fastify({ logger: true });

fastify.register(fastifyCors, {
    origin: true
});

const staticFilesDirectory = join(__dirname, 'public');

let count = 0;

fastify.register(fastifyStatic, {
    root: staticFilesDirectory,
    prefix: '/'
});

fastify.get('/draw', async (request, reply) => {
    const svg = request.query.svg;
    const filename = `${String(count).padStart(4, '0')}.html`;

    count++;

    const content = `
<html>
    <head>
        <meta property="og:image" content="data:image/svg+xml,${encodeURIComponent(svg)}" />
    </head>
    <body>
        ${svg}
    </body>
</html>
    `;

    fs.writeFileSync(`${staticFilesDirectory}/${filename}`, content);

    return {
        url: `http://localhost:9091/${filename}`
    };
});

const start = async () => {
    try {
        await fastify.listen({ port: 9091 })
    } catch (err) {
        fastify.log.error(err)
        process.exit(1)
    }
}
start();
