import { describe, it, expect } from "vitest";
import request from "supertest";
import app from "../src/app.js";

import express from "express";
import { ZodError, z } from "zod";
import { errorHandler } from "../src/middleware/errorHandler.js";

describe("Error Handler", () => {
  it("should return HTTP 400 for malformed JSON", async () => {
    const response = await request(app)
      .post("/api/v1/health")
      .set("Content-Type", "application/json")
      .send('{"name":');

    console.log(response.status, response.body);

    expect(response.status).toBe(400);

    expect(response.body).toEqual({
      success: false,
      message: "Invalid JSON request body",
    });
  });

  it("should return HTTP 413 when the request body exceeds the limit", async () => {
    const largePayload = JSON.stringify({
      data: "a".repeat(11 * 1024),
    });

    const response = await request(app)
      .post("/api/v1/health")
      .set("Content-Type", "application/json")
      .send(largePayload);

    expect(response.status).toBe(413);

    expect(response.body).toEqual({
      success: false,
      message: "Request body is too large",
    });
  });

  it("should return HTTP 400 for Zod validation errors", async () => {
    const testApp = express();

    testApp.get("/test", (_req, _res, next) => {
      const schema = z.object({
        email: z.email(),
      });

      const result = schema.safeParse({
        email: "invalid-email",
      });

      if (!result.success) {
        next(result.error);
      }
    });

    testApp.use(errorHandler);

    const response = await request(testApp).get("/test");

    expect(response.status).toBe(400);

    expect(response.body.success).toBe(false);
    expect(response.body.message).toBe("Validation error");

    expect(response.body.errors).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          field: "email",
        }),
      ]),
    );
  });

  it("should return HTTP 500 for unexpected errors", async () => {
    const testApp = express();

    testApp.get("/test", (_req, _res, next) => {
      next(new Error("Database connection failed"));
    });

    testApp.use(errorHandler);

    const response = await request(testApp).get("/test");

    expect(response.status).toBe(500);

    expect(response.body).toEqual({
      success: false,
      message: "Internal server error",
    });

    expect(JSON.stringify(response.body)).not.toContain(
      "Database connection failed",
    );
  });
});
