import request from "supertest";
import app from "../index";

describe("Active Tasks API", () => {
  it("should list all active tasks", async () => {
    const response = await request(app).get("/api/active-tasks");
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  it("should add a note to an active task", async () => {
    const taskId = "someTaskId"; // Replace with a valid task ID
    const response = await request(app)
      .post(`/api/active-tasks/${taskId}/notes`)
      .send({ note: "This is a test note" });
    expect(response.status).toBe(200);
    expect(response.body.notes).toContain("This is a test note");
  });

  it("should mark an active task as completed", async () => {
    const taskId = "someTaskId"; // Replace with a valid task ID
    const response = await request(app).patch(
      `/api/active-tasks/${taskId}/complete`
    );
    expect(response.status).toBe(200);
    expect(response.body.status).toBe("completed");
  });

  // Add more tests for other endpoints as needed
});
