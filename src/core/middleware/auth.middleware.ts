import {
  Injectable,
  InternalServerErrorException,
  Logger,
  NestMiddleware,
} from "@nestjs/common";
// eslint-disable-next-line node/no-extraneous-import
import { Request, Response } from "express";
import * as firebase from "firebase-admin";

import * as serviceAccount from "../../resources/firebasepass.json";

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private defaultApp: any;
  constructor(private readonly logger: Logger) {
    this.defaultApp = firebase.initializeApp({
      credential: firebase.credential.cert({
        projectId: serviceAccount.project_id,
        clientEmail: serviceAccount.client_email,
        privateKey: serviceAccount.private_key,
      }),
    });
  }

  // eslint-disable-next-line @typescript-eslint/ban-types
  async use(req: Request, res: Response, next: Function) {
    const authorization = req.headers["authorization"];
    const token = authorization?.split(" ")[1];
    //this.log.debug('Token que se ha extraido'+ token);

    // Extract token from Bearer format
    if (!token) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    await this.defaultApp
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      .auth()
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      .verifyIdToken(token)
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      .then((decodedToken: { email: string }) => {
        const user = decodedToken.email;
        req["user"] = user;
        next();
      })
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      .catch((error: Error) => {
        this.logger.log(`Error al verificar el token ${JSON.stringify(error)}`);
        const errorBody = {
          code: "INTERNAL_SERVER_ERROR",
          message: "Error al verificar el token",
        };
        throw new InternalServerErrorException(errorBody);
      });
  }
}
