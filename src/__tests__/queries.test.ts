const request = require("supertest");
import { FastifyInstance } from "fastify";
import build from "../app";

let app: FastifyInstance;

let withQuery: string;
let withoutQuery: string;
let queryId: string;

beforeAll(async () => {
  app = await build();
  await app.ready();

  const res = await request("http://localhost:8080").get("/form-data");
  const formDataList = res.body.data.formData;

  // formData that has a query already
  withQuery = formDataList.find((f: any) => f.queries.length > 0)?.id;
  // formData that doesn't have a query
  withoutQuery = formDataList.find((f: any) => f.queries.length === 0)?.id;
});

afterAll(async () => {
  await app.close();
});

describe("POST /queries", () => {
  it("creates a new query for a formData without any queries", async () => {
    const res = await request("http://localhost:8080")
      .post("/queries")
      .send({
        title: "Test Title",
        description: "Test Description",
        formDataId: withoutQuery,
      });

    expect(res.status).toBe(200);
    expect(res.body.title).toBe("Test Title");
    expect(res.body.formData.id).toBe(withoutQuery);

    queryId = res.body.id;
  });
});

describe("PATCH /queries/:id", () => {
  it("updates an existing query to RESOLVED", async () => {
    // use the one with a query; id = withQuery
    const res1 = await request("http://localhost:8080").get("/form-data");
    const existingQuery = res1.body.data.formData
      .find((f: any) => f.id === withQuery)
      ?.queries[0];

    const res = await request("http://localhost:8080")
      .patch(`/queries/${existingQuery.id}`)
      .send({
        status: "RESOLVED",
        description: "Marked as resolved",
      });

    expect(res.status).toBe(200);
    expect(res.body.status).toBe("RESOLVED");
    expect(res.body.description).toBe("Marked as resolved");
  });
});

describe("DELETE /queries/:id", () => {
  it("deletes the query that was created", async () => {
    const res = await request("http://localhost:8080").delete(`/queries/${queryId}`);
    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
  });
});
