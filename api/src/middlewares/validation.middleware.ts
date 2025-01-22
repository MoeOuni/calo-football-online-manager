import { plainToInstance } from 'class-transformer';
import { validateOrReject, ValidationError } from 'class-validator';
import { NextFunction, Request, Response } from 'express';
import { HttpException } from '@exceptions/HttpException';

export const ValidationMiddleware = (type: any, skipMissingProperties = false, whitelist = false, forbidNonWhitelisted = false) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      // Transform plain body to class instance
      const dto = plainToInstance(type, req.body);

      // Validate the DTO
      await validateOrReject(dto, {
        skipMissingProperties,
        whitelist,
        forbidNonWhitelisted,
        forbidUnknownValues: true, // Important for nested validation
      });

      // Replace request body with the validated DTO
      req.body = dto;
      next();
    } catch (errors) {
      if (Array.isArray(errors)) {
        // Format validation errors into readable messages
        const message = errors.flatMap((error: ValidationError) => formatValidationError(error)).join(', ');
        next(new HttpException(400, message));
      } else {
        next(new HttpException(500, 'Internal server error during validation'));
      }
    }
  };
};

// Helper function to format nested validation errors
const formatValidationError = (error: ValidationError): string[] => {
  const constraints = error.constraints ? Object.values(error.constraints) : [];
  const nestedErrors = error.children?.flatMap(child => formatValidationError(child)) || [];
  return [...constraints, ...nestedErrors];
};
