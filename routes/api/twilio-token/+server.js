// src/routes/api/twilio-token/+server.js
// Works on Cloudflare Pages without the Twilio SDK

import { json, error } from '@sveltejs/kit';

/** @type {import('./$types').RequestHandler} */
export async function POST({ request }) {
    try {
        const { identity, sessionId } = await request.json();

        if (!identity || !sessionId) {
            throw error(400, 'Missing identity or sessionId');
        }

        // Environment variables
        const {
            TWILIO_ACCOUNT_SID,
            TWILIO_API_KEY,
            TWILIO_API_SECRET,
            TWILIO_SYNC_SERVICE_SID
        } = process.env;

        if (!TWILIO_ACCOUNT_SID || !TWILIO_API_KEY || !TWILIO_API_SECRET || !TWILIO_SYNC_SERVICE_SID) {
            throw error(500, 'Server configuration error');
        }

        // Generate token without Twilio SDK
        const token = await generateTwilioToken(
            TWILIO_ACCOUNT_SID,
            TWILIO_API_KEY,
            TWILIO_API_SECRET,
            TWILIO_SYNC_SERVICE_SID,
            identity
        );

        return json({
            identity,
            token,
            sessionId
        });

    } catch (err) {
        console.error('Error generating token:', err);
        
        if (err.status) {
            throw err;
        }
        
        throw error(500, 'Failed to generate token');
    }
}

/**
 * Generate Twilio Access Token using Web Crypto API
 * Works in Cloudflare Workers/Pages
 */
async function generateTwilioToken(accountSid, apiKey, apiSecret, syncServiceSid, identity) {
    const now = Math.floor(Date.now() / 1000);
    const exp = now + 3600; // 1 hour

    const header = {
        cty: 'twilio-fpa;v=1',
        typ: 'JWT',
        alg: 'HS256'
    };

    const payload = {
        jti: `${apiKey}-${now}`,
        iss: apiKey,
        sub: accountSid,
        exp: exp,
        grants: {
            identity: identity,
            data_sync: {
                service_sid: syncServiceSid
            }
        }
    };

    // Base64URL encoding
    const base64UrlEncode = (str) => {
        return btoa(str)
            .replace(/\+/g, '-')
            .replace(/\//g, '_')
            .replace(/=/g, '');
    };

    const encodedHeader = base64UrlEncode(JSON.stringify(header));
    const encodedPayload = base64UrlEncode(JSON.stringify(payload));

    // Create signature using Web Crypto API
    const signatureInput = `${encodedHeader}.${encodedPayload}`;
    const encoder = new TextEncoder();
    const key = await crypto.subtle.importKey(
        'raw',
        encoder.encode(apiSecret),
        { name: 'HMAC', hash: 'SHA-256' },
        false,
        ['sign']
    );

    const signature = await crypto.subtle.sign(
        'HMAC',
        key,
        encoder.encode(signatureInput)
    );

    // Convert signature to base64url
    const signatureArray = new Uint8Array(signature);
    const signatureBase64 = btoa(String.fromCharCode(...signatureArray))
        .replace(/\+/g, '-')
        .replace(/\//g, '_')
        .replace(/=/g, '');

    return `${encodedHeader}.${encodedPayload}.${signatureBase64}`;
}
