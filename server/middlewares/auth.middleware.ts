import { Request, Response, NextFunction } from 'express';
import { OAuth2Client } from 'google-auth-library';
import dotenv from 'dotenv';
import axios from 'axios';

dotenv.config();

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

export interface AuthenticatedRequest extends Request {
    user?: any;
}

export const verifyGoogleToken = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) {
            res.status(401).json({ message: 'No token provided' });
            return;
        }

        const response = await axios.get(
            `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${token}`
        );
        if (!response) {
            res.status(401).json({ message: 'Invalid token' });
            return;
        }

        req.user = response.data;
        next();
    } catch (error) {
        res.status(401).json({ message: 'Invalid token' });
    }
};
