import { Request, Response } from "express";

interface RequestWithUser extends Request {
    user?: any;
}

export const getCurrentUserData = (req: RequestWithUser, res: Response) => {
    res.json({
        message: 'User authenticated',
        user: req.user
    })
}