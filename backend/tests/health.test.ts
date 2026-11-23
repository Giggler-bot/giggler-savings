import { describe, it, expect } from "vitest";
import request from "supertest";

import app from "../src/app.js";

describe("Health Check", () => {
  it("should return HTTP 200 when the API is healthy", async () => {
    const response = await request(app).get("/api/v1/health");

    expect(response.status).toBe(200);

    expect(response.body).toMatchObject({
      status: "success",
      message: "Giggler Savings API is running",
    });

    expect(response.body.timestamp).toBeDefined();
  });
});
