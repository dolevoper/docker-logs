import { Docker } from 'node-docker-api';
import { Stream } from 'stream';

const docker = new Docker({ socketPath: '/var/run/docker.sock' });

const containerNames = ['/optimistic_tu'];

async function app() {
    const containers = await docker.container.list();

    containers
        .filter(container => {
            const names = (container.data as any).Names as string[];

            return names.some(name => containerNames.includes(name));
        })
        .forEach(async container => {
            console.log(`spying on: ${container.id}`);

            const logs = await container.logs({ follow: true, stdout: true, stderr: true }) as Stream;

            logs.on('data', info => console.log(container.id, info.toString()));
            logs.on('error', err => console.log(container.id, err.toString()));

            await new Promise(resolve => logs.on('end', resolve));
        });
}

app();