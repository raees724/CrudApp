import axios from 'axios';

const usersUrl = 'http://localhost:8080';

export const getUsers = async (id) => {
  id = id || '';
  try {
    const response = await axios.get(`${usersUrl}/${id}`);
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch users.');
  }
};

export const addUser = async (user) => {
  try {
    const response = await axios.post(`${usersUrl}/add`, user);
    return response.data;
  } catch (error) {
    if (error.response) {
      throw new Error(error.response.data.message);
    } else {
      throw new Error('Failed to add user.');
    }
  }
};

export const deleteUser = async (id) => {
  try {
    const response = await axios.delete(`${usersUrl}/${id}`);
    return response.data;
  } catch (error) {
    throw new Error('Failed to delete user.');
  }
};

export const editUser = async (id, user) => {
  try {
    const response = await axios.put(`${usersUrl}/${id}`, user);
    return response.data;
  } catch (error) {
    if (error.response) {
      throw new Error(error.response.data.message);
    } else {
      throw new Error('Failed to edit user.');
    }
  }
};

