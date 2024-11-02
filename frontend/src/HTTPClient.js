// Base URL for the API
const API_BASE_URL = "http://localhost:3000/api";

/**
 * Fetch helper function to handle JSON requests and responses.
 * @param {string} url - The URL to fetch.
 * @param {RequestInit} [options={}] - The options for the fetch request.
 * @returns {Promise<any>} - The JSON response.
 * @throws Will throw an error if the response is not ok.
 */
const fetchJSON = async (url, options = {}) => {
  const response = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
    ...options,
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response.json();
};

/**
 * Get all task templates.
 * @returns {Promise<Array>} - A promise that resolves to an array of task templates.
 */
export const getTaskTemplates = async () => {
  return fetchJSON(`${API_BASE_URL}/task-templates`);
};

/**
 * Create a new task template.
 * @param {Object} taskTemplate - The task template to create.
 * @returns {Promise<Object>} - A promise that resolves to the created task template.
 */
export const createTaskTemplate = async (taskTemplate) => {
  return fetchJSON(`${API_BASE_URL}/task-templates`, {
    method: "POST",
    body: JSON.stringify(taskTemplate),
  });
};

/**
 * Get all properties.
 * @returns {Promise<Array>} - A promise that resolves to an array of properties.
 */
export const getProperties = async () => {
  return fetchJSON(`${API_BASE_URL}/properties`);
};

/**
 * Create a new property.
 * @param {Object} property - The property to create.
 * @returns {Promise<Object>} - A promise that resolves to the created property.
 */
export const createProperty = async (property) => {
  return fetchJSON(`${API_BASE_URL}/properties`, {
    method: "POST",
    body: JSON.stringify(property),
  });
};

/**
 * Get all active tasks for a property.
 * @param {string} propertyId - The ID of the property.
 * @param {string} [status="pending"] - The status of the tasks to fetch.
 * @returns {Promise<Array>} - A promise that resolves to an array of tasks.
 */
export const getActiveTasks = async (propertyId, status = "pending") => {
  return fetchJSON(`${API_BASE_URL}/properties/${propertyId}/active-tasks?status=${status}`);
};

/**
 * Add a note to an active task.
 * @param {string} taskId - The ID of the task.
 * @param {string} note - The note to add.
 * @returns {Promise<Object>} - A promise that resolves to the updated task.
 */
export const addNoteToTask = async (taskId, note) => {
  return fetchJSON(`${API_BASE_URL}/active-tasks/${taskId}/notes`, {
    method: "POST",
    body: JSON.stringify({ note }),
  });
};

/**
 * Mark an active task as completed.
 * @param {string} taskId - The ID of the task.
 * @returns {Promise<Object>} - A promise that resolves to the updated task.
 */
export const completeTask = async (taskId) => {
  return fetchJSON(`${API_BASE_URL}/active-tasks/${taskId}/complete`, {
    method: "PATCH",
  });
};