import React from "react";
import "./topbar.css";
import { NotificationsNone, Language, Settings } from "@material-ui/icons";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import BasicModal from "../NotifModal";
import { ActiveTabState } from "../../Context/ActiveTabProvider";
import { Box, Typography, MenuItem, Menu } from "@material-ui/core";
import PopupState, { bindTrigger, bindMenu } from "material-ui-popup-state";
//import MenuIcon from "@mui/icons-material/Menu";
import { logout } from "../../Redux/userRedux";
import { GridMenuIcon } from "@material-ui/data-grid";

export default function Topbar() {
  const user = useSelector((state) => state.user.currentUser);
  const { notifications } = ActiveTabState();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const HandleLogout = () => {
    dispatch(logout());
    navigate("/");
  };
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  const userLocale =
    navigator.languages && navigator.languages.length
      ? navigator.languages[0].split("-")[0]
      : navigator.language.split("-")[0];

  return (
    <>
      <div className="topbar">
        <div className="topbarWrapper">
          <div className="topLeft">
            <div className="hamburger">
              <PopupState variant="popover" popupId="demo-popup-menu">
                {(popupState) => (
                  <React.Fragment>
                    <GridMenuIcon
                      className="hamicon"
                      {...bindTrigger(popupState)}
                    />
                    <Menu {...bindMenu(popupState)}>
                      <MenuItem
                        onClick={() => {
                          popupState.close();
                          navigate("/home");
                        }}
                      >
                        Home
                      </MenuItem>
                      <MenuItem
                        onClick={() => {
                          popupState.close();
                          navigate("/users");
                        }}
                      >
                        Users
                      </MenuItem>
                      <MenuItem
                        onClick={() => {
                          popupState.close();
                          navigate("/products");
                        }}
                      >
                        Products
                      </MenuItem>
                      <MenuItem
                        onClick={() => {
                          popupState.close();
                          navigate("/orders");
                        }}
                      >
                        Orders
                      </MenuItem>
                      <MenuItem
                        onClick={() => {
                          popupState.close();
                          navigate("/neworder");
                        }}
                      >
                        New Order
                      </MenuItem>
                      <MenuItem
                        onClick={() => {
                          popupState.close();
                          navigate("/manage");
                        }}
                      >
                        Manage
                      </MenuItem>

                      <MenuItem
                        onClick={() => {
                          popupState.close();
                          HandleLogout();
                        }}
                      >
                        Logout
                      </MenuItem>
                    </Menu>
                  </React.Fragment>
                )}
              </PopupState>
            </div>
            <span className="logo">ElixirAdmin</span>
          </div>
          <div className="topRight">
            <BasicModal>
              <Box sx={style}>
                {notifications.length > 0 ? (
                  notifications.map((notif) =>
                    notif.products.map((product) => (
                      <Typography sx={{ mt: 2 }} key={product.productId}>
                        New order of {product.productname}.Go to
                        <Link to="/orders"> Orders </Link> to check it out
                      </Typography>
                    ))
                  )
                ) : (
                  <Typography id="child-modal-description">
                    No new notifications
                  </Typography>
                )}
              </Box>
            </BasicModal>
            <div className="topbarIconContainer language">
              <Language />
              <span className="topIconBadge">{userLocale}</span>
            </div>
            <div className="topbarIconContainer settings">
              <Settings />
            </div>
            <div className="topbarIconContainer avatar">
              <Link to={`/user/:${user._id}`} className="link">
                <img
                  src={`${user.pic}`}
                  alt={`${user.name}`}
                  className="topAvatar"
                />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
