
import { describe, it, expect } from "vitest";
import request from "supertest";

import app from "../src/app.js";

describe("Not Found Middleware", () => {
  it("should return HTTP 404 for an unknown route", async () => {
    const response = await request(app).get("/api/v1/unknown");

    expect(response.status).toBe(404);

    expect(response.body).toEqual({
      success: false,
      message: "Route GET /api/v1/unknown was not found",
    });
  });

  it("should include the HTTP method in the error message", async () => {
    const response = await request(app).post("/api/v1/unknown");

    expect(response.status).toBe(404);

    expect(response.body.message).toContain("POST");
  });
});
