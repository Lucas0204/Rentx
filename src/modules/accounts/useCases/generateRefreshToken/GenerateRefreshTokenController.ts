import { Request, Response } from "express";
import { container } from "tsyringe";
import { GenerateRefreshTokenUseCase } from "./GenerateRefreshTokenUseCase";

class GenerateRefreshTokenController {
    async handle(request: Request, response: Response): Promise<Response> {
        const token = request.body.token || request.headers['x-access-token'] ||
        request.query.token;

        const generateRefreshToken = container.resolve(GenerateRefreshTokenUseCase);

        const refresh_token = await generateRefreshToken.execute(token);

        return response.json(refresh_token);
    }
}

export { GenerateRefreshTokenController };
