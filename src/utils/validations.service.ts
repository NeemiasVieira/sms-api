import { Injectable } from '@nestjs/common';

@Injectable()
export class ValidationsService {
  isObjectId(string: string) {
    const objectIdRegex = /^[0-9a-fA-F]{24}$/;
    return objectIdRegex.test(string);
  }
}
