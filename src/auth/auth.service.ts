// import * as jwt from 'jsonwebtoken';

// export class AuthService {
//   private secretKey = 'your-strong-secret-key'; // Use env variable in production

//   generateToken(userId: string): string {
//     const secretKey = process.env.JWT_SECRET; // ✅ .env se secret key lein
//     return jwt.sign({ id: userId }, secretKey, { expiresIn: '1h' });
//   }

//   validateToken(token: string): { id: string } {
//     try {
//         const decoded: any = jwt.verify(token, process.env.JWT_SECRET);
//         if (typeof decoded !== "object" || !decoded.id) {
//         throw new Error("Invalid token payload");
//       }
//       return { id: decoded.id };
//     } catch (error) {
//       throw new Error("Unauthorized");
//     }
//   }
// }


import { Injectable } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';

dotenv.config(); // ✅ Load .env variables

@Injectable()
export class AuthService {
  generateToken(userId: string): string {
    const secret = process.env.JWT_SECRET;
    if (!secret) {
      throw new Error('JWT secret is missing!'); // ✅ Prevent silent failures
    }

    return jwt.sign({ userId }, secret, { expiresIn: '1h' });
  }
}
