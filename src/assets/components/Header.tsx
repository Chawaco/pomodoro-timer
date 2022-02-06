import { useState } from "react";
import SettingDialog from "./SettingDialog";
import ToolBar from "@mui/material/ToolBar";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import SettingsIcon from "@mui/icons-material/Settings";

const Header = () => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <ToolBar>
        <Grid container justifyContent="flex-end">
          <Button
            variant="outlined"
            startIcon={<SettingsIcon />}
            onClick={handleOpen}
          >
            Setting
          </Button>
        </Grid>
      </ToolBar>
      <SettingDialog open={open} onClose={handleClose} />
    </>
  );
};

export default Header;
