import React, { useState, useMemo } from 'react';
import { Drawer, Typography, List, ListItem, ListItemText, Box, Button, IconButton, Divider, InputAdornment, TextField } from '@mui/material';
import PropTypes from 'prop-types';
import { IconX, IconPlus, IconMinus } from '@tabler/icons';

const ShoppingDrawer = ({ open, onClose }) => {
  // State for quantity and item prices
  const [quantities, setQuantities] = useState({ item1: 1, item2: 1, item3: 1 });
  const itemPrices = { item1: 10, item2: 20, item3: 30 };

  // Calculate total price
  const total = useMemo(() => {
    return Object.keys(quantities).reduce((acc, item) => acc + quantities[item] * itemPrices[item], 0);
  }, [quantities]);

  const handleIncrement = (item) => {
    setQuantities(prev => ({ ...prev, [item]: prev[item] + 1 }));
  };

  const handleDecrement = (item) => {
    setQuantities(prev => ({ ...prev, [item]: Math.max(prev[item] - 1, 1) }));
  };

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      sx={{
        '& .MuiDrawer-paper': {
          width: 360,
          padding: 2,
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
        },
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h6" sx={{ fontWeight: 600 }}>
          Shopping Items
        </Typography>
        <IconButton onClick={onClose}>
          <IconX size={24} />
        </IconButton>
      </Box>
      
      <Divider />

      <List sx={{ flexGrow: 1 }}>
        {['item1', 'item2', 'item3'].map((item, index) => (
          <ListItem
            key={index}
            sx={{ borderRadius: 1, overflow: 'hidden', mb: 1, p: 1, bgcolor: 'background.default', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <img
                src={`https://via.placeholder.com/50?text=Item+${index + 1}`}
                alt={`Item ${index + 1}`}
                style={{ borderRadius: '50%', marginRight: 10 }}
              />
              <ListItemText primary={`Item ${index + 1}`} secondary={`$${itemPrices[item]}.00`} />
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <IconButton onClick={() => handleDecrement(item)} sx={{ marginRight: 1 }}>
                <IconMinus size={20} />
              </IconButton>
              <TextField
                value={quantities[item]}
                readOnly
                sx={{ width: 50, textAlign: 'center' }}
                InputProps={{
                  startAdornment: <InputAdornment position="start">$</InputAdornment>,
                }}
              />
              <IconButton onClick={() => handleIncrement(item)} sx={{ marginLeft: 1 }}>
                <IconPlus size={20} />
              </IconButton>
            </Box>
          </ListItem>
        ))}
      </List>
      
      <Box sx={{ mt: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Typography variant="h6" sx={{ fontWeight: 600 }}>
          Total: ${total.toFixed(2)}
        </Typography>
        <Button
          variant="contained"
          color="primary"
          fullWidth
          sx={{
            borderRadius: 2,
            boxShadow: 3,
            '&:hover': {
              backgroundColor: 'primary.dark',
              boxShadow: 6,
            },
          }}
          onClick={onClose}
        >
          Checkout
        </Button>
      </Box>
    </Drawer>
  );
};

ShoppingDrawer.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default ShoppingDrawer;
