import { Request, Response, NextFunction } from 'express';

export const authMiddleware = (token: string) => (req: Request, res: Response, next: NextFunction) => {
    // Allow static assets, bootstrap routes, and debug endpoints (debug = read-only diagnostics)
    if (req.path === '/' ||
        req.path === '/index.html' ||
        req.path === '/ping' ||
        req.path === '/sys' ||
        req.path.startsWith('/debug/') ||
        req.path.match(/\.(js|css|ico|png|json)$/)) {
        return next();
    }

    const authHeader = req.headers.authorization;
    if (authHeader === `Bearer ${token}`) {
        return next();
    }

    // Also check query param for easy testing/some clients
    if (req.query.token === token) {
        return next();
    }

    res.status(401).json({ error: 'Unauthorized' });
};
