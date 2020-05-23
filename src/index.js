const { Docker } = require('node-docker-api');

const docker = new Docker({ socketPath: '/var/run/docker.sock' });

const containerNames = ['/optimistic_tu'];

async function app() {
    const containers = await docker.container.list();

    containers
        .filter(container => container.data.Names.some(name => containerNames.includes(name)))
        .forEach(async container => {
            console.log(`spying on: ${container.id}`);

            const logs = await container.logs({ follow: false, stdout: true, stderr: true });

            logs.pipe(process.stdout);

            await new Promise(resolve => logs.on('end', resolve));
        });
}

app();