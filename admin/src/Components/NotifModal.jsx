import * as React from "react";
import { ActiveTabState } from "../Context/ActiveTabProvider";
import { NotificationsNone } from "@material-ui/icons";
import { Modal } from "@material-ui/core";

export default function BasicModal({ children }) {
  const [open, setOpen] = React.useState(false);
  const { notifications, setNotifications } = ActiveTabState();

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setNotifications([]);
  };

  return (
    <div>
      <div className="topbarIconContainer" onClick={handleOpen}>
        <NotificationsNone />
        {notifications.length > 0 && (
          <span className="topIconBadge">{notifications.length}</span>
        )}
      </div>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        {children}
      </Modal>
    </div>
  );
}
