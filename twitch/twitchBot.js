import tmi from 'tmi.js';
import CMDS from './twitchCmd.js';

const opts = {
    options: {
        debug: true
    },
    connection: {
        reconnect: true,
        secure: true
    },
    identity: {
        username: 'HeroeBot',
        password: 'oauth:' + process.env.HEROE_TOKEN
    },
    channels: ['#striksy']
};

const client = new tmi.client(opts);

client.connect().catch(console.error);

client.on('message', (target, context, msg, self) => {
    if (self) {
        return;
    }

    console.log(context, msg);
    const [cmd, ...args] = msg.trim().split(' ');

    let cmdCps = cmd.substring(1).toUpperCase();
    if (CMDS[cmdCps] && CMDS[cmdCps].enabled) {
        console.log(CMDS[cmdCps], CMDS[cmdCps].enabled);
        CMDS[cmdCps].handler(client, opts.channels[0], context, args);
    }
});

export default client;
