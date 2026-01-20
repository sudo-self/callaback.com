// src/routes/api/twilio-token/+server.js

import { json, error } from '@sveltejs/kit';
import twilio from 'twilio';

const AccessToken = twilio.jwt.AccessToken;
const SyncGrant = AccessToken.SyncGrant;

// Environment variables (set these in your .env file)
const {
    TWILIO_ACCOUNT_SID,
    TWILIO_API_KEY,
    TWILIO_API_SECRET,
    TWILIO_SYNC_SERVICE_SID
} = process.env;

/** @type {import('./$types').RequestHandler} */
export async function POST({ request }) {
    try {
        // Parse the request body
        const { identity, sessionId } = await request.json();

        // Validate inputs
        if (!identity || !sessionId) {
            throw error(400, 'Missing identity or sessionId');
        }

        // Validate environment variables
        if (!TWILIO_ACCOUNT_SID || !TWILIO_API_KEY || !TWILIO_API_SECRET || !TWILIO_SYNC_SERVICE_SID) {
            console.error('Missing Twilio credentials in environment variables');
            throw error(500, 'Server configuration error');
        }

        console.log(`Generating token for identity: ${identity}, session: ${sessionId}`);

        // Create a Sync grant
        const syncGrant = new SyncGrant({
            serviceSid: TWILIO_SYNC_SERVICE_SID,
        });

        // Create an access token
        const token = new AccessToken(
            TWILIO_ACCOUNT_SID,
            TWILIO_API_KEY,
            TWILIO_API_SECRET,
            {
                identity: identity,
                ttl: 3600 // Token valid for 1 hour
            }
        );

        token.addGrant(syncGrant);

        // Return the token
        return json({
            identity: identity,
            token: token.toJwt(),
            sessionId: sessionId
        });

    } catch (err) {
        console.error('Error generating token:', err);
        
        if (err.status) {
            throw err; // Re-throw SvelteKit errors
        }
        
        throw error(500, {
            message: 'Failed to generate token',
            details: err.message
        });
    }
}

/** @type {import('./$types').RequestHandler} */
export async function GET({ url }) {
    // Optional: Support GET requests with query parameters
    try {
        const identity = url.searchParams.get('identity');
        const sessionId = url.searchParams.get('sessionId') || 'default-session';

        if (!identity) {
            throw error(400, 'Missing identity parameter');
        }

        const syncGrant = new SyncGrant({
            serviceSid: TWILIO_SYNC_SERVICE_SID,
        });

        const token = new AccessToken(
            TWILIO_ACCOUNT_SID,
            TWILIO_API_KEY,
            TWILIO_API_SECRET,
            { identity: identity }
        );

        token.addGrant(syncGrant);

        return json({
            identity: identity,
            token: token.toJwt(),
            sessionId: sessionId
        });

    } catch (err) {
        console.error('Error generating token:', err);
        
        if (err.status) {
            throw err;
        }
        
        throw error(500, 'Failed to generate token');
    }
}
