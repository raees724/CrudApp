import React, { useState, useEffect } from 'react';
import { FormGroup, FormControl, InputLabel, Input, Button, styled, Typography } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { getUsers, editUser } from '../../Util/api';

const initialValue = {
  name: '',
  username: '',
  email: '',
  phone: ''
};

const Container = styled(FormGroup)`
  width: 50%;
  margin: 5% 0 0 25%;

  & > div {
    margin-top: 20px;
  }
`;

const EditUser = () => {
  const [user, setUser] = useState(initialValue);
  const [error, setError] = useState('');
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    loadUserDetails();
  }, []);

  const loadUserDetails = async () => {
    try {
      const response = await getUsers(id);
      setUser(response);
    } catch (error) {
      console.log(error);
    }
  };

  const onValueChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  if (!user) {
    return <Typography>Loading...</Typography>;
  }

  const { name, username, email, phone } = user;

  const validateForm = () => {
    return name.trim() !== '' && username.trim() !== '' && email.trim() !== '' && phone.trim() !== '';
  };

  const checkDuplicateEmailPhone = async () => {
    try {
      const response = await getUsers();
      const duplicateUser = response.find((u) => (u.email === email || u.phone === phone) && u._id !== id);
      if (duplicateUser) {
        setError('Email Or phone number already exists.');
        return true;
      }
    } catch (error) {
      console.log(error);
    }
    return false;
  };

  const editUserDetails = async () => {
    try {
      if (!validateForm()) {
        return; // Return if the form is not valid
      }

      const isDuplicate = await checkDuplicateEmailPhone();
      if (isDuplicate) {
        return; // Return if email or phone number already exists
      }

      const response = await editUser(id, user);
      console.log(response.data);
      navigate('/all');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container>
      <Typography variant="h4">Edit Employee</Typography>
      <FormControl>
        <InputLabel htmlFor="name-input">Name</InputLabel>
        <Input id="name-input" name="name" value={name} onChange={onValueChange} required />
      </FormControl>
      <FormControl>
        <InputLabel htmlFor="username-input">Username</InputLabel>
        <Input id="username-input" name="username" value={username} onChange={onValueChange} required />
      </FormControl>
      <FormControl>
        <InputLabel htmlFor="email-input">Email</InputLabel>
        <Input id="email-input" name="email" value={email} onChange={onValueChange} required />
      </FormControl>
      <FormControl>
        <InputLabel htmlFor="phone-input">Phone</InputLabel>
        <Input id="phone-input" name="phone" value={phone} onChange={onValueChange} required />
      </FormControl>
      {error && <Typography variant="body2" color="error">{error}</Typography>}
      <FormControl>
        <Button variant="contained" color="primary" onClick={editUserDetails}>
          Edit User
        </Button>
      </FormControl>
    </Container>
  );
};

export default EditUser;
