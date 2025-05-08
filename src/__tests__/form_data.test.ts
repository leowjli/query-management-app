const request = require("supertest");
import { FastifyInstance } from "fastify";
import build from "../app";

let app: FastifyInstance;

describe("GET /form-data", () => {
  beforeAll(async () => {
    app = await build();
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it("returns all the formData with their queries", async () => {
    const res = await request("http://localhost:8080").get("/form-data");

    expect(res.status).toBe(200);
    expect(res.body.data).toHaveProperty("total");
    expect(res.body.data).toHaveProperty("formData");
    expect(Array.isArray(res.body.data.formData)).toBe(true);
    expect(res.body.data.total).toBe(res.body.data.formData.length);
    

    const query = res.body.data.formData.find((f: any) => f.queries.length > 0);
    const noQuery = res.body.data.formData.find((f: any) => f.queries.length === 0);

    expect(query).toBeDefined();
    expect(query.queries[0]).toHaveProperty("title");
    expect(query.queries[0]).toHaveProperty("status");
    expect(["OPEN", "RESOLVED"]).toContain(query.queries[0].status);

    expect(noQuery).toBeDefined();
    expect(Array.isArray(noQuery.queries)).toBe(true);
    expect(noQuery.queries.length).toBe(0);
  });
});
