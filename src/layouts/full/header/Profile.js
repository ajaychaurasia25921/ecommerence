import React, { useState,useEffect} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Avatar,
  Box,
  Menu,
  Button,
  IconButton,
  MenuItem,
  ListItemIcon,
  ListItem,
  ListItemText,
} from '@mui/material';
import { IconUser } from '@tabler/icons';
import ProfileImg from 'src/assets/images/profile/user-1.jpg';

const Profile = () => {
  const [anchorEl2, setAnchorEl2] = useState(null);
  const navigate = useNavigate();

  const handleClick2 = (event) => {
    setAnchorEl2(event.currentTarget);
  };

  const handleClose2 = () => {
    setAnchorEl2(null);
  };





  const handleLogout = () => {
    localStorage.removeItem('user_type');
    localStorage.removeItem('accessToken');
    navigate('/');
  };

  // useEffect(() => {
  //   // Function to clear localStorage
  //   const clearLocalStorage = () => {
  //     localStorage.removeItem('user_type');
  //     localStorage.removeItem('accessToken');
  //   };

  //   // Handle beforeunload event
  //   const onBeforeUnload = (event) => {
  //     // Only clear localStorage if the page is being unloaded, not reloaded
  //     if (document.visibilityState === 'hidden') {
  //       clearLocalStorage();
  //     }
  //     // Show a confirmation dialog (optional)
  //     event.preventDefault();
  //     event.returnValue = ''; // Chrome requires returnValue to be set
  //   };

  //   // Attach event listener for beforeunload
  //   window.addEventListener('beforeunload', onBeforeUnload);

  //   // Handle visibilitychange event
  //   const onVisibilityChange = () => {
  //     // If page visibility is hidden, consider it as a tab/browser close
  //     if (document.visibilityState === 'hidden') {
  //       clearLocalStorage();
  //     }
  //   };

  //   // Attach event listener for visibilitychange
  //   document.addEventListener('visibilitychange', onVisibilityChange);

  //   // Cleanup event listeners on component unmount
  //   return () => {
  //     window.removeEventListener('beforeunload', onBeforeUnload);
  //     document.removeEventListener('visibilitychange', onVisibilityChange);
  //   };
  // }, []);

  return (
    <Box>
      <IconButton
        size="large"
        aria-label="profile menu"
        color="inherit"
        aria-controls="profile-menu"
        aria-haspopup="true"
        sx={{
          ...(typeof anchorEl2 === 'object' && {
            color: 'primary.main',
          }),
        }}
        onClick={handleClick2}
      >
        <Avatar
          src={ProfileImg}
          alt="Profile"
          sx={{
            width: 35,
            height: 35,
          }}
        />
      </IconButton>
      <Menu
        id="profile-menu"
        anchorEl={anchorEl2}
        keepMounted
        open={Boolean(anchorEl2)}
        onClose={handleClose2}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        sx={{
          '& .MuiMenu-paper': {
            width: '200px',
          },
        }}
      >
        <MenuItem>
          <ListItemIcon>
            <IconUser width={20} />
          </ListItemIcon>
          <ListItem
           button
            component={Link} to="/profile"
           >
            <ListItemText primary="My Profile" />
          </ListItem>
        </MenuItem>
        <Box mt={1} py={1} px={2}>
          <Button onClick={handleLogout} variant="outlined" color="primary" fullWidth>
            Logout
          </Button>
        </Box>
      </Menu>
    </Box>
  );
};

export default Profile;
