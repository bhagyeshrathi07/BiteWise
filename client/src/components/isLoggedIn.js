
import handleLogin from "./FrameComponent5";
import handleLogout from "./FrameComponent5";
import Button from "@mui/material/Button";

// Login Button Logic for Header
const IsLoggedInLogic = ({ IsLoggedIn }) => {
return (
IsLoggedIn ? (
    <Button
      className="sign-in7"
      onClick={handleLogout}
      disableElevation={true}
      variant="contained"
      sx={{
        textTransform: "none",
        color: "#fdfbfa",
        fontSize: "14",
        background: "#202020",
        borderRadius: "10px",
        "&:hover": { background: "#202020" },
        width: 96,
        height: 49,
      }}
    >
      Logout
    </Button>
  ) : (
    <Button
      className="sign-in7"
      onClick={handleLogin}
      disableElevation={true}
      variant="contained"
      sx={{
        textTransform: "none",
        color: "#fdfbfa",
        fontSize: "14",
        background: "#202020",
        borderRadius: "10px",
        "&:hover": { background: "#202020" },
        width: 96,
        height: 49,
      }}
    >
      Sign In
    </Button>
  ))};

export default IsLoggedInLogic;