const CMDS = {
    HELLO: {
        enabled: true,
        description: 'Greetings',
        usage: '!hello',
        handler: (client, channel, userstate) => {
            //client.say(channel, `Hello, ${userstate}!`);
            client.say(channel, `Hello, ${userstate['display-name']}!`);
        },
    },
    PING: {
        enabled: true,
        description: 'Ping pong',
        usage: '!ping',
        handler: (client, channel, userstate) => {
            client.say(channel, `Pong!`);
        },
    }
}
export default CMDS;

