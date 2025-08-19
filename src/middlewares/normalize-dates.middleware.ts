import { Injectable, NestMiddleware } from '@nestjs/common';

@Injectable()
export class NormalizeDatesMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {
    if (req.body) {
      this.normalize(req.body);
    }
    next();
  }

  private normalize(obj: any) {
    for (const key in obj) {
      if (!obj.hasOwnProperty(key)) continue;

      const val = obj[key];

      if (typeof val === 'string' && /^\d{4}-\d{2}-\d{2}T/.test(val)) {
        obj[key] = new Date(val);
      }
      // Si es objeto anidado → recurse
      if (typeof val === 'object' && val !== null) {
        this.normalize(val);
      }
    }
  }
}