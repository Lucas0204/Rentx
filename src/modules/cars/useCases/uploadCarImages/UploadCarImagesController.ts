import { container } from 'tsyringe';
import { Request, Response } from 'express';
import { UploadCarImagesUseCase } from './UploadCarImagesUseCase';
import { AppError } from '@shared/errors/AppError';

interface IFiles {
    filename: string;
}

class UploadCarImagesController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { car_id } = request.params;
        const images = request.files as IFiles[];

        if (images.length === 0) {
            return response.status(400).json({
                error: 'No images provided!'
            });
        }

        const images_name = images.map(image => image.filename);

        const uploadCarImagesUseCase = container.resolve(UploadCarImagesUseCase);

        await uploadCarImagesUseCase.execute({
            car_id,
            images_name
        });

        return response.status(204).send();
    }
}

export { UploadCarImagesController };
