const baseURL = 'https://6721-132-170-6-1.ngrok-free.app';

/**
 * Helper function to make HTTP requests.
 * @param {string} endpoint - The API endpoint.
 * @param {Object} [options={}] - The request options.
 * @returns {Promise<any>} The response data.
 */
async function request(endpoint, options = {}) {
  const response = await fetch(`${baseURL}${endpoint}`, {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'An error occurred');
  }

  return response.json();
}

/**
 * Create a new task template for a specific property.
 * @param {string} propertyId - The ID of the property.
 * @param {Object} data - The task template data.
 * @returns {Promise<any>} The response data.
 * @example
 * createTaskTemplate('propertyId123', {
 *   name: "Test Task",
 *   description: "A test task description",
 *   frequency: { value: 1, unit: "months" },
 *   estimatedDuration: 60,
 *   priority: "medium",
 *   category: "maintenance",
 * }).then(data => console.log(data));
 */
async function createTaskTemplate(propertyId, data) {
  return request(`/api/properties/${propertyId}/task-templates`, {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

/**
 * Get all task templates for a specific property.
 * @param {string} propertyId - The ID of the property.
 * @returns {Promise<any>} The response data.
 * @example
 * getAllTaskTemplates('propertyId123').then(data => console.log(data));
 */
async function getAllTaskTemplates(propertyId) {
  return request(`/api/properties/${propertyId}/task-templates`);
}

/**
 * List all active tasks for a specific property.
 * @param {string} propertyId - The ID of the property.
 * @returns {Promise<any>} The response data.
 * @example
 * listActiveTasks('propertyId123').then(data => console.log(data));
 */
async function listActiveTasks(propertyId) {
  return request(`/api/properties/${propertyId}/active-tasks`);
}

/**
 * Add a note to an active task.
 * @param {string} propertyId - The ID of the property.
 * @param {string} taskId - The ID of the task.
 * @param {string} note - The note to add.
 * @returns {Promise<any>} The response data.
 * @example
 * addNoteToTask('propertyId123', 'taskId456', 'This is a test note').then(data => console.log(data));
 */
async function addNoteToTask(propertyId, taskId, note) {
  return request(`/api/properties/${propertyId}/active-tasks/${taskId}/notes`, {
    method: 'POST',
    body: JSON.stringify({ note }),
  });
}

/**
 * Mark an active task as completed.
 * @param {string} propertyId - The ID of the property.
 * @param {string} taskId - The ID of the task.
 * @returns {Promise<any>} The response data.
 * @example
 * markTaskAsCompleted('propertyId123', 'taskId456').then(data => console.log(data));
 */
async function markTaskAsCompleted(propertyId, taskId) {
  return request(`/api/properties/${propertyId}/active-tasks/${taskId}/complete`, {
    method: 'PATCH',
  });
}

/**
 * Create a new property.
 * @param {Object} data - The property data.
 * @returns {Promise<any>} The response data.
 * @example
 * createProperty({
 *   name: "Test Property",
 *   address: "123 Test St",
 *   size: 2000,
 *   type: "residential",
 *   price: 500000,
 *   bedrooms: 3,
 *   bathrooms: 2,
 *   yearBuilt: 2020,
 *   description: "A beautiful test property",
 *   status: "available",
 * }).then(data => console.log(data));
 */
async function createProperty(data) {
  return request('/api/properties', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

/**
 * Get all properties.
 * @returns {Promise<any>} The response data.
 * @example
 * getAllProperties().then(data => console.log(data));
 */
async function getAllProperties() {
  return request('/api/properties');
}

/**
 * Get a single property by ID.
 * @param {string} propertyId - The ID of the property.
 * @returns {Promise<any>} The response data.
 * @example
 * getPropertyById('propertyId123').then(data => console.log(data));
 */
async function getPropertyById(propertyId) {
  return request(`/api/properties/${propertyId}`);
}

/**
 * Update a property by ID.
 * @param {string} propertyId - The ID of the property.
 * @param {Object} data - The updated property data.
 * @returns {Promise<any>} The response data.
 * @example
 * updateProperty('propertyId123', { price: 550000 }).then(data => console.log(data));
 */
async function updateProperty(propertyId, data) {
  return request(`/api/properties/${propertyId}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  });
}

/**
 * Delete a property by ID.
 * @param {string} propertyId - The ID of the property.
 * @returns {Promise<any>} The response data.
 * @example
 * deleteProperty('propertyId123').then(data => console.log(data));
 */
async function deleteProperty(propertyId) {
  return request(`/api/properties/${propertyId}`, {
    method: 'DELETE',
  });
}

export {
  createTaskTemplate,
  getAllTaskTemplates,
  listActiveTasks,
  addNoteToTask,
  markTaskAsCompleted,
  createProperty,
  getAllProperties,
  getPropertyById,
  updateProperty,
  deleteProperty,
};