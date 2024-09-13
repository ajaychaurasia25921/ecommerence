import React, { useState } from 'react';
import { Box, AppBar, Toolbar, styled, Stack, IconButton, Badge } from '@mui/material';
import PropTypes from 'prop-types';
import { IconBellRinging, IconMenu, IconShoppingCart } from '@tabler/icons';
import Profile from './Profile';
import ShoppingDrawer from 'src/views/Customer/ShoppingDrawer';// Import the ShoppingDrawer component

// Custom styled components
const AppBarStyled = styled(AppBar)(({ theme }) => ({
  boxShadow: 'none',
  background: theme.palette.background.paper,
  justifyContent: 'center',
  backdropFilter: 'blur(4px)',
  [theme.breakpoints.up('lg')]: {
    minHeight: '70px',
  },
}));

const ToolbarStyled = styled(Toolbar)(({ theme }) => ({
  width: '100%',
  color: theme.palette.text.secondary,
}));

const Header = (props) => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleCartClick = () => {
    setDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setDrawerOpen(false);
  };

  return (
    <>
      <AppBarStyled position="sticky" color="default">
        <ToolbarStyled>
          <IconButton
            color="inherit"
            aria-label="menu"
            onClick={props.toggleMobileSidebar}
            sx={{
              display: {
                lg: "none",
                xs: "inline",
              },
            }}
          >
            <IconMenu width="20" height="20" />
          </IconButton>

          <Box flexGrow={1} />

          <Stack spacing={1} direction="row" alignItems="center">
            <IconButton
              size="large"
              aria-label="show notifications"
              color="inherit"
            >
              <Badge variant="dot" color="primary">
                <IconBellRinging size="21" stroke="1.5" />
              </Badge>
            </IconButton>

            <IconButton
              size="large"
              aria-label="shopping cart"
              color="inherit"
              onClick={handleCartClick}
            >
              <Badge badgeContent={0} color="secondary">
                <IconShoppingCart size="21" stroke="1.5" />
              </Badge>
            </IconButton>

            <Profile />
          </Stack>
        </ToolbarStyled>
      </AppBarStyled>

      {/* Integrate the ShoppingDrawer component */}
      <ShoppingDrawer open={drawerOpen} onClose={handleDrawerClose} />
    </>
  );
};

Header.propTypes = {
  sx: PropTypes.object,
  toggleMobileSidebar: PropTypes.func.isRequired,
};

export default Header;
