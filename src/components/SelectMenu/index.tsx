import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  IconButton,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import ExpandMoreOutlinedIcon from "@mui/icons-material/ExpandMoreOutlined";
import React, { useEffect, useState } from "react";
import { getMetricsList } from "../../services";
import { AxiosResponse } from "axios";
import { SelectMenuProps } from "../../interfaces";

const SelectMenu = ({
  setSelectedCategories,
  selectedCategories,
  onSetData,
  isLoading,
}: SelectMenuProps) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [metricsList, setMetricsList] = useState([]);
  const [temporarySelectedCategories, setTemporarySelectedCategories] =
    useState(selectedCategories);
  const open = Boolean(anchorEl);

  useEffect(() => {
    getMetricsList()
      .then((response: AxiosResponse) => {
        setMetricsList(response?.data?.result);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const onChangeCategories = (checked: boolean, item: string) => {
    setTemporarySelectedCategories((prevState: string[]) => {
      if (prevState.some((selected: string) => selected === item)) {
        return prevState.filter((selected: string) => selected !== item);
      } else {
        return [...prevState, item];
      }
    });
  };

  const onApplyCategories = async () => {
    setSelectedCategories(temporarySelectedCategories);
    onSetData(temporarySelectedCategories);
  };

  return (
    <React.Fragment>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        <IconButton
          onClick={handleClick}
          size="small"
          aria-controls={open ? "account-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          sx={{
            border: "solid 1px #c9c4c4",
            borderRadius: "8px",
            p: "10px",
          }}
        >
          <Typography>Select Metrics</Typography>
          <ExpandMoreOutlinedIcon />
        </IconButton>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            p: 1.5,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&::before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        {metricsList?.map((item: { label: string; code: string }) => (
          <MenuItem sx={{ p: 0 }} key={item.code}>
            <FormControlLabel
              control={<Checkbox name="basic-checkbox" />}
              checked={temporarySelectedCategories.some(
                (selected) => selected === item.code
              )}
              sx={{ width: "100%", m: 0 }}
              label={item?.label}
              onChange={(event: React.SyntheticEvent, checked: boolean) =>
                onChangeCategories(checked, item.code)
              }
            />
          </MenuItem>
        ))}
        <Box display="flex" justifyContent="space-around">
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#f1f1f1",
              color: "black",
              textTransform: "capitalize",
            }}
            size="small"
            onClick={handleClose}
          >
            Cancel
          </Button>
          <Button
            sx={{ textTransform: "capitalize" }}
            size="large"
            variant="contained"
            onClick={() => {
              onApplyCategories();
              handleClose();
            }}
            disabled={isLoading}
          >
            Apply
          </Button>
        </Box>
      </Menu>
    </React.Fragment>
  );
};

export default SelectMenu;
