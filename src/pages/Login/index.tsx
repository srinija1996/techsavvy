import { DraftsOutlined, LockOpenOutlined } from "@mui/icons-material";
import {
  Box,
  Button,
  Card,
  Checkbox,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useContext, useRef, useState } from "react";
import { loginService } from "../../services";
import { Navigate, useNavigate } from "react-router-dom";
import { AppContext } from "../../App";

const Login = () => {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const context = useContext(AppContext);
  const { isLoggedIn, setIsLoggedIn } = context;
  const navigate = useNavigate();
  const smallDevice = useMediaQuery("(max-width:500px)");
  const logoRef = useRef<any>(null);

  const onChangeCredentials = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCredentials((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };

  const onSignIn = (event: React.FormEvent<HTMLElement>) => {
    setIsLoading(true);
    loginService({ ...credentials, isLoggedInHere: isLoggedIn ? 1 : 0 })
      .then((response: any) => {
        localStorage.setItem("token", JSON.stringify(response?.data?.token));
        localStorage.setItem(
          "userDetails",
          JSON.stringify(response?.data?.userDetails)
        );
        if (setIsLoggedIn) setIsLoggedIn(true);
        navigate("/dashboard");
      })
      .catch((err) => {
        if (typeof err?.response?.data?.message === "string") {
          setError(err?.response?.data?.message);
        } else
          setError(
            err?.response?.data?.message[0] || err?.response?.data?.message
          );
      })
      .finally(() => setIsLoading(false));
  };

  if (isLoggedIn) return <Navigate to="/dashboard" />;

  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        background:
          "linear-gradient(to bottom right,#f7f8fa 5%,#f8e2fe 20%,#f5f5fc 80%,#7c7dfb 98%)",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          pt: 8,
          px: 1,
          width: "100%",
        }}
      >
        <img
          src="https://techsavvy.ai/assets/images/common/logo/logo.svg"
          alt="logo"
          style={{ height: "100px", paddingBottom: "100px" }}
          loading="lazy"
          ref={logoRef}
        />
        <Card
          sx={{
            p: smallDevice ? 1 : 10,
            width: logoRef?.current?.scrollWidth,
            maxWidth: "100vw",
            backgroundColor: "#fcfafd",
            border: "solid 5px white",
            borderRadius: "13px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography variant="h5">Welcome Back!</Typography>
          <form style={{ width: "100%" }} onSubmit={onSignIn}>
            <Typography pb={1}>Email</Typography>
            <Box
              sx={{
                border: "solid 1px",
                borderRadius: "8px",
                display: "flex",
                alignItems: "center",
                boxSizing: "border-box",
                px: 2,
                width: "100%",
              }}
            >
              <DraftsOutlined />
              <TextField
                sx={{ border: "none" }}
                fullWidth
                name="email"
                type="email"
                placeholder="Email"
                onChange={onChangeCredentials}
                value={credentials.email}
              />
            </Box>
            <Typography py={1}>Password</Typography>
            <Box
              sx={{
                border: "solid 1px",
                borderRadius: "8px",
                display: "flex",
                alignItems: "center",
                boxSizing: "border-box",
                px: 2,
                width: "100%",
              }}
            >
              <LockOpenOutlined />
              <TextField
                sx={{ border: "none" }}
                name="password"
                type="password"
                placeholder="Password"
                fullWidth
                onChange={onChangeCredentials}
                value={credentials.password}
              />
              <Typography
                sx={{
                  minWidth: "min-content",
                  textAlign: "right",
                  color: "#f449a3",
                  cursor: "pointer",
                }}
                variant="body2"
              >
                Forgot Password?
              </Typography>
            </Box>

            <Box
              sx={{
                alignSelf: "flex-end",
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-end",
              }}
            >
              <Checkbox size="small" />
              <Typography variant="caption">Remember me</Typography>
            </Box>
            {error && <Typography sx={{ color: "red" }}>{error}</Typography>}
            <Button
              variant="contained"
              size="large"
              disabled={isLoading}
              onClick={onSignIn}
              type="submit"
            >
              SIGN IN
            </Button>
          </form>
        </Card>
      </Box>
    </Box>
  );
};

export default Login;
