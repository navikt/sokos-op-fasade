import express, { Express, Request, Response } from "express";
import path from "path";
import expressStaticGzip from "express-static-gzip";
import RateLimit from "express-rate-limit";
import { initializeAzureAd } from "./azureAd";
import { fetchUserData, redirectIfUnauthorized, respondUnauthorizedIfNotLoggedIn } from "./middelwares";
import { proxyWithOboToken } from "./proxy";
import Config from "./config";
import { logger } from "./logger";

export const server: Express = express();

const SERVER_PORT = 8080;
const BASE_PATH = "/okonomiportalen";
const BUILD_PATH = path.resolve(__dirname, "../dist");

const startServer = () => {
  server.use(express.urlencoded({ extended: true }));
  server.use(express.json());
  server.disable("x-powered-by");

  server.use(
    BASE_PATH,
    expressStaticGzip(BUILD_PATH, {
      index: false,
      enableBrotli: true,
      orderPreference: ["br"],
    }),
    RateLimit({
      windowMs: 10 * 1000,
      max: 20,
    })
  );

  server.get([`${BASE_PATH}/internal/isAlive`, `${BASE_PATH}/internal/isReady`], (_req: Request, res: Response) =>
    res.sendStatus(200)
  );

  server.get("/bruker", respondUnauthorizedIfNotLoggedIn, fetchUserData);

  proxyWithOboToken(
    Config.SOKOS_MIKROFRONTEND_PROXY,
    Config.SOKOS_MIKROFRONTEND_API,
    Config.SOKOS_MIKROFRONTEND_API_SCOPE
  );

  proxyWithOboToken(
    Config.SOKOS_SKATTEKORT_PROXY,
    Config.SOKOS_SKATTEKORT_PERSON_API,
    Config.SOKOS_SKATTEKORT_PERSON_API_SCOPE
  );

  server.use(`/assets`, express.static(`${BUILD_PATH}/assets`));

  server.get(["/", "/*"], redirectIfUnauthorized, (_req: Request, res: Response) =>
    res.sendFile(`${BUILD_PATH}/index.html`)
  );

  server.listen(SERVER_PORT, () => console.log(`Server listening on port ${SERVER_PORT}`));
};

initializeAzureAd()
  .then(() => startServer())
  .catch((e) => logger.error("Failed to start server", e.message));
