import express, {
    type NextFunction,
    type Request,
    type Response,
} from "express";


export const errorHandler = (
    err: Error,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    console.error("Error detectado:", err.message);
    res
        .status(500)
        .json({ error: "Error interno del servidor", detail: err.message });
};