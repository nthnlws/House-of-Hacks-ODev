import request from "supertest";
import app from "../index"; // Ensure your Express app is exported from index.ts

describe("Task Templates API", () => {
  it("should create a new task template", async () => {
    const response = await request(app)
      .post("/api/task-templates")
      .send({
        name: "Test Task",
        description: "A test task description",
        frequency: { value: 1, unit: "months" },
        estimatedDuration: 60,
        priority: "medium",
        category: "maintenance",
      });
    expect(response.status).toBe(201);
    expect(response.body.name).toBe("Test Task");
  });

  it("should get all task templates", async () => {
    const response = await request(app).get("/api/task-templates");
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  // Add more tests for other endpoints as needed
});
