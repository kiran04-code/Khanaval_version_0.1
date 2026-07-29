import { Redis } from "ioredis";

export const redisclient = new Redis(
  "redis://default:gQAAAAAAAqAYAAIgcDJkZjM1NDJhMjBhNDg0Y2U3YTJkZThlZDdlOGMzMWUxZQ@talented-anchovy-172056.upstash.io:6379",
  {
    enableReadyCheck: false,
    maxRetriesPerRequest: null,
  }
);

