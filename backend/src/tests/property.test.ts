import request from "supertest";
import app from "../index";
import mongoose from "mongoose";

describe("Properties API", () => {
  const testProperty = {
    name: "Test Property",
    address: "123 Test St",
    size: 2000,
    type: "residential",
    price: 500000,
    bedrooms: 3,
    bathrooms: 2,
    yearBuilt: 2020,
    description: "A beautiful test property",
    status: "available",
  };

  it("should create a new property", async () => {
    const response = await request(app)
      .post("/api/properties")
      .send(testProperty);

    expect(response.status).toBe(201);
    expect(response.body.name).toBe(testProperty.name);
    expect(response.body.address).toBe(testProperty.address);
  });

  it("should get all properties", async () => {
    const response = await request(app).get("/api/properties");
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  it("should get a property by ID", async () => {
    // First create a property
    const createResponse = await request(app)
      .post("/api/properties")
      .send(testProperty);

    const propertyId = createResponse.body._id;

    // Then retrieve it
    const response = await request(app).get(`/api/properties/${propertyId}`);
    expect(response.status).toBe(200);
    expect(response.body.name).toBe(testProperty.name);
  });

  it("should update a property", async () => {
    // First create a property
    const createResponse = await request(app)
      .post("/api/properties")
      .send(testProperty);

    const propertyId = createResponse.body._id;
    const updatedData = { ...testProperty, name: "Updated Property Name" };

    // Then update it
    const response = await request(app)
      .put(`/api/properties/${propertyId}`)
      .send(updatedData);

    expect(response.status).toBe(200);
    expect(response.body.name).toBe("Updated Property Name");
  });

  it("should delete a property", async () => {
    // First create a property
    const createResponse = await request(app)
      .post("/api/properties")
      .send(testProperty);

    const propertyId = createResponse.body._id;

    // Then delete it
    const response = await request(app).delete(`/api/properties/${propertyId}`);
    expect(response.status).toBe(200);
    expect(response.body.message).toBe("Property deleted");
  });
});
