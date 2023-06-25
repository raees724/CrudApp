import { useState } from "react";
import {
  FormGroup,
  FormControl,
  InputLabel,
  Input,
  Button,
  styled,
  Typography,
} from "@mui/material";
import { addUser } from "../../Util/api";
import { useNavigate } from "react-router-dom";

const initialValue = {
  name: "",
  username: "",
  email: "",
  phone: "",
  nameError: "",
  emailError: "",
  phoneError: "",
};

const Container = styled(FormGroup)`
    width: 50%;
    margin: 5% 0 0 25%;
    & > div {
        margin-top: 20px;
`;

const AddEmployee = () => {
  const [user, setUser] = useState(initialValue);
  const [responseMessage, setResponseMessage] = useState("");
  const { name, username, email, phone } = user;

  let navigate = useNavigate();

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const onValueChange = (e) => {
    const { name, value } = e.target;
    let errorMessage = "";

    if (name === "name" && value.trim() === "") {
      errorMessage = "Name is required.";
    } else if (name === "email" && !validateEmail(value)) {
      errorMessage = "Invalid email format.";
    } else if (name === "phone" && !/^\d+$/.test(value)) {
      errorMessage = "Phone number should contain only digits.";
    }

    setUser({ ...user, [name]: value, [`${name}Error`]: errorMessage });
  };

  const addUserDetails = async () => {
    let isValid = true;

    if (name.trim() === "") {
      setUser((prevUser) => ({
        ...prevUser,
        nameError: "Name is required.",
      }));
      isValid = false;
    }

    if (!validateEmail(email)) {
      setUser((prevUser) => ({
        ...prevUser,
        emailError: "Invalid email format.",
      }));
      isValid = false;
    }

    if (!/^\d+$/.test(phone)) {
      setUser((prevUser) => ({
        ...prevUser,
        phoneError: "Phone number should contain only digits.",
      }));
      isValid = false;
    } else if (!/^\d{10}$/.test(phone)) {
      setUser((prevUser) => ({
        ...prevUser,
        phoneError: "Phone number should contain exactly 10 digits.",
      }));
      isValid = false;
    }

    if (isValid) {
      try {
        const response = await addUser(user);
        setResponseMessage(response.message);
        setUser(initialValue);
        navigate("/all");
      } catch (error) {
        setResponseMessage(error.message);
      }
    }
  };

  return (
    <Container>
      <Typography variant="h4">Add Employee</Typography>
      <FormControl error={Boolean(user.nameError)}>
        <InputLabel htmlFor="my-input">Name</InputLabel>
        <Input
          onChange={onValueChange}
          name="name"
          value={name}
          id="my-input"
        />
        {user.nameError && (
          <Typography variant="caption" color="error">
            {user.nameError}
          </Typography>
        )}
      </FormControl>

      <FormControl>
        <InputLabel htmlFor="my-input">Username</InputLabel>
        <Input
          onChange={(e) => onValueChange(e)}
          name="username"
          value={username}
          id="my-input"
        />
      </FormControl>

      <FormControl error={Boolean(user.emailError)}>
        <InputLabel htmlFor="my-input">Email</InputLabel>
        <Input
          onChange={onValueChange}
          name="email"
          value={email}
          id="my-input"
        />
        {user.emailError && (
          <Typography variant="caption" color="error">
            {user.emailError}
          </Typography>
        )}
      </FormControl>

      <FormControl error={Boolean(user.phoneError)}>
        <InputLabel htmlFor="my-input">Phone</InputLabel>
        <Input
          onChange={onValueChange}
          name="phone"
          value={phone}
          id="my-input"
        />
        {user.phoneError && (
          <Typography variant="caption" color="error">
            {user.phoneError}
          </Typography>
        )}
      </FormControl>

      <FormControl>
        <Button
          variant="contained"
          color="secondary"
          onClick={() => addUserDetails()}
        >
          Submit
        </Button>
      </FormControl>

      {responseMessage && (
        <Typography
          variant="body1"
          color={responseMessage.includes("error") ? "error" : "success"}
        >
          {responseMessage}
        </Typography>
      )}
    </Container>
  );
};

export default AddEmployee;
