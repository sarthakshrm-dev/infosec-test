import React, { useState } from "react";
import { Card, Container, Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Signup = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({});
  const [err, setErr] = useState(null);

  function handleChange(e) {
    const { name, value } = e.target;
    setData((pValue) => {
      return {
        ...pValue,
        [name]: value,
      };
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    axios
      .post("http://localhost:5000/auth/signup", data)
      .then((res) => {
        if (res.status === 201) {
          navigate("/");
        }
      })
      .catch((err) => {
        setErr(err.response.data.message);
      });
  }

  return (
    <div className="bg-light d-flex align-items-center min-vh-100">
      <Container>
        <Card className="mx-auto" style={{ maxWidth: "400px" }}>
          <Card.Body>
            <h2 className="text-center">Signup</h2>
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-2" controlId="name">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  onChange={handleChange}
                  name="name"
                  type="text"
                  placeholder="Enter your name"
                />
              </Form.Group>
              <Form.Group className="mb-2" controlId="email">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  onChange={handleChange}
                  name="email"
                  type="email"
                  placeholder="Enter your email"
                />
              </Form.Group>
              <Form.Group className="mb-2" controlId="password">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  onChange={handleChange}
                  name="password"
                  type="password"
                  placeholder="Enter your password"
                />
              </Form.Group>
              <div className="d-flex flex-column mt-2">
                {err && <div className="mb-2">{err}</div>}
                <a
                  className="cursor-pointer text-primary"
                  onClick={() => navigate("/")}
                >
                  Already have an account?
                </a>
                <Button className="mt-2" variant="primary" type="submit" block>
                  Signup
                </Button>
              </div>
            </Form>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
};

export default Signup;
