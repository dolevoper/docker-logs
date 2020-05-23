const { Docker } = require('node-docker-api');

const docker = new Docker({ socketPath: '/var/run/docker.sock' });

async function app() {
    const images = await docker.image.list();

    images.forEach(image => console.log(image.id));
}

app();