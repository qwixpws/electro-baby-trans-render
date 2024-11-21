import express from 'express';
import dotenv from 'dotenv';
import fetch from 'node-fetch';

dotenv.config();
const authServer = express();
const PORT = process.env.PORT || 5555;

const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const REDIRECT_URI = `http://localhost:${PORT}/auth/callback`;
const SCOPES = [
    'user:read:email',
    'user:read:chat',
    'user:write:chat',
    'moderator:read:chatters',
    'moderator:read:followers',
    'moderation:read',
    'chat:edit',
    'chat:read',
    'channel:bot',
    'channel:read:redemptions',
    'channel:read:subscriptions'
];

let accessToken = null;

authServer.get('/auth', (req, res) => {
    const twitchAutUrl = `https://id.twitch.tv/oauth2/authorize?client_id=${CLIENT_ID}&scope=${SCOPES.join(' ')}&response_type=code&redirect_uri=${REDIRECT_URI}`;
    res.redirect(twitchAutUrl);
});

authServer.get('/auth/callback', async (req, res) => {
    const code = req.query.code;
    const tokenUrl = `https://id.twitch.tv/oauth2/token?client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}&code=${code}&grant_type=authorization_code&redirect_uri=${REDIRECT_URI}`;
    try {
        const response = await fetch(tokenUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });
        const tokenData = await response.json();
        console.log(tokenData);
        accessToken = tokenData.access_token;

        res.send('Authorization successful! You can close this window.');
    } catch (error) {
        console.error(error);
        res.status(500).send('An error occurred during authorization.');
    }
});

authServer.listen(PORT, () => {
    console.log(`[Twtv Auth]: Server is running on port ${PORT}`);
});

export { accessToken, authServer };
