import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Fade from '@mui/material/Fade';
import { useState } from 'react';
import type { User } from '../models/user';
import { Divider, ListItemIcon, ListItemText } from '@mui/material';
import { History, Logout, Person } from '@mui/icons-material';
import { useLogoutMutation } from '../../features/account/accountApi';

type Props = {
    user: User
}

export default function FadeMenu({ user }: Props) {
  const [logout] = useLogoutMutation();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Button
       onClick={handleClick}
      >
        {user.email}
      </Button>
      <Menu
        id="fade-menu"
        slotProps={{
          list: {
            'aria-labelledby': 'fade-button',
          },
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        TransitionComponent={Fade}
      >
        <MenuItem>
            <ListItemIcon>
                <Person />
            </ListItemIcon>
            <ListItemText>Profile</ListItemText>
        </MenuItem>
        <MenuItem>
            <ListItemIcon>
                <History />
            </ListItemIcon>
            <ListItemText>My Orders</ListItemText>
        </MenuItem>
        <Divider />
        <MenuItem onClick={logout}>
            <ListItemIcon>
                <Logout />
            </ListItemIcon>
            <ListItemText>Logout</ListItemText>
        </MenuItem>
      </Menu>
    </div>
  );
}
