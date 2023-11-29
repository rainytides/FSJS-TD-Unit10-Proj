/**
 * Data - A class to handle data fetching from the REST API.
 *
 * Contains methods for interacting with the API, including user authentication,
 * course creation, updates, and deletion.
 */
export default class Data {
    /**
     * Performs API requests.
     * 
     * @param {string} path - The URL path for the request.
     * @param {string} [method='GET'] - The HTTP request method.
     * @param {Object|null} [body=null] - The payload for POST/PUT requests.
     * @param {boolean} [requiresAuth=false] - Whether the request requires authentication.
     * @param {Object|null} [credentials=null] - User credentials for authenticated requests.
     * @returns {Promise} A Promise that resolves to the response of the fetch request.
     */
    api(path, method = 'GET', body = null, requiresAuth = false, credentials = null) {
      const url = 'http://localhost:5000/api' + path;
      const options = {
        method,
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
        },
      };
  
      if (body !== null) {
        options.body = JSON.stringify(body);
      }
  
      if (requiresAuth) {    
        const encodedCredentials = btoa(`${credentials.emailAddress}:${credentials.password}`);
        options.headers['Authorization'] = `Basic ${encodedCredentials}`;
      }
  
      return fetch(url, options);
    }
  
    // --- USER DATA --- //
  
    /**
     * Gets user credentials from the database.
     * 
     * @param {string} emailAddress - User's email address.
     * @param {string} password - User's password.
     * @returns {Promise} A Promise that resolves to the user data if authentication is successful, otherwise null.
     */
    async getUser(emailAddress, password) {
      const response = await this.api(`/users`, 'GET', null, true, { emailAddress, password });
      
      if (response.status === 200) {
        return response.json().then(data => data);
      } else if (response.status === 401) {
        return null;
      } else {
        throw new Error();
      }
    }
    
    /**
     * Creates a new user in the database.
     * 
     * @param {Object} user - The user data to be posted.
     * @returns {Promise} A Promise that resolves to an array of errors or an empty array if successful.
     */
    async createUser(user) {
      const response = await this.api('/users', 'POST', user);
      
      if (response.status === 201) {
        return [];
      } else if (response.status === 400) {
        return response.json().then(data => data.error);
      } else {
        throw new Error();
      }
    }
  
    // --- COURSE DATA --- //
  
    /**
     * Gets all courses data from the database.
     * 
     * @returns {Promise} A Promise that resolves to the courses data.
     */
    async getCourses() {
      const response = await this.api('/courses', 'GET');
      
      if (response.status === 200) {
        return response.json().then(data => data);
      } else if (response.status === 404) {
        return response.json().then(data => data);
      } else {
        throw new Error();
      }
    }
  
    /**
     * Gets a course's data from the database.
     * 
     * @param {number} courseId - The ID of the course to retrieve.
     * @returns {Promise} A Promise that resolves to the course data.
     */
    async getCourse(courseId) {
      const response = await this.api(`/courses/${courseId}`, 'GET');
      
      if (response.status === 200) {
        return response.json().then(data => data);
      } else if (response.status === 404) {
        return response.json().then(data => data);
      } else {
        throw new Error();
      }
    }
  
    /**
     * Posts a new course's data to the database.
     * 
     * @param {Object} course - The course data to be posted.
     * @param {string} emailAddress - User's email address for authentication.
     * @param {string} password - User's password for authentication.
     * @returns {Promise} A Promise that resolves to an array of errors or an empty array if successful.
     */
    async createCourse(course, emailAddress, password) {
      const response = await this.api('/courses', 'POST', course, true, { emailAddress, password });
      
      if (response.status === 201) {
        return [];
      } else if (response.status === 400) {
        return response.json().then(data => data.error);
      } else {
        throw new Error();
      }
    }
  
    /**
     * Updates an existing course's data in the database.
     * 
     * @param {number} courseId - The ID of the course to update.
     * @param {Object} course - The updated course data.
     * @param {string} emailAddress - User's email address for authentication.
     * @param {string} password - User's password for authentication.
     * @returns {Promise} A Promise that resolves to an array of errors or an empty array if successful.
     */
    async updateCourse(courseId, course, emailAddress, password) {
      const response = await this.api(`/courses/${courseId}`, 'PUT', course, true, { emailAddress, password });
      
      if (response.status === 204) {
        return [];
      } else if (response.status === 400) {
        return response.json().then(data => data.error);
      } else {
        throw new Error();
      }
    }
  
    /**
     * Deletes a course from the database.
     * 
     * @param {number} courseId - The ID of the course to delete.
     * @param {string} emailAddress - User's email address for authentication.
     * @param {string} password - User's password for authentication.
     * @returns {Promise} A Promise that resolves to an array of errors or an empty array if successful.
     */
    async deleteCourse(courseId, emailAddress, password) {
      const response = await this.api(`/courses/${courseId}`, 'DELETE', null, true, { emailAddress, password });
      
      if (response.status === 204) {
        return [];
      } else if (response.status === 403) {
        return response.json().then(data => data.error);
      } else {
        throw new Error();
      }
    }
  }
  