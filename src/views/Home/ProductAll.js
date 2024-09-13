import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Container, IconButton, Grid, Paper, Typography, Divider, Checkbox, FormControlLabel, Box, TextField, Card, CardContent, CardMedia, Button, Pagination
} from '@mui/material';
import { styled } from '@mui/material/styles';
import Layout from './Layout';
import InfoIcon from "@mui/icons-material/Info";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

// Styled components
const Sidebar = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  backgroundColor: theme.palette.background.paper,
}));

const Content = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  minHeight: '100vh',
}));

const StyledCard = styled(Card)(({ theme }) => ({
  transition: 'transform 0.3s',
  '&:hover': {
    transform: 'scale(1.05)',
    boxShadow: theme.shadows[8],
  },
}));

const StyledButton = styled(Button)(({ theme }) => ({
  background: theme.palette.primary.main,
  color: theme.palette.common.white,
  borderRadius: 20,
  padding: '10px 20px',
  marginTop: '12px',
  textTransform: 'none',
  '&:hover': {
    background: theme.palette.primary.dark,
  },
}));

const StyledTypography = styled(Typography)(({ theme }) => ({
  color: theme.palette.primary.main,
  textAlign: 'center',
  marginBottom: theme.spacing(3),
  fontWeight: 700,
  textTransform: 'uppercase',
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    borderRadius: theme.shape.borderRadius,
    boxShadow: '0 3px 6px rgba(0, 0, 0, 0.1)',
    backgroundColor: theme.palette.background.paper,
  },
}));

function ProductAll() {
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 8; // Number of products per page

  useEffect(() => {
    fetchProducts();
  }, [page]);

  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://134.209.145.149:9999/api/product', {
        params: {
          page,
          limit: itemsPerPage, // Limit the number of products per page
        },
      });
      setProducts(response.data.products); // Assuming 'products' is the key in the API response
      setTotalPages(response.data.totalPages); // Assuming 'totalPages' is provided by the API
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Layout>
      <Container className='mt-4'>
        <StyledTypography variant="h1">Products</StyledTypography>
        <Grid container spacing={3}>
         
          <Grid item xs={12} sm={8} md={12}>
            <Content>
              <Box display="flex" justifyContent="flex-end" mb={3}>
                <StyledTextField
                  variant="outlined"
                  placeholder="Search Products"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  sx={{ width: '100%', maxWidth: '300px' }}
                />
              </Box>
              <Grid container spacing={2} marginTop={2.5}>
                {filteredProducts.map(product => (
                  <Grid item xs={12} sm={6} md={3} key={product.id}>
                    <StyledCard sx={{ maxWidth: 345, borderRadius: 12 }}>
                      <CardMedia
                        component="img"
                        alt={product.name}
                        height="200"
                        // image={product.imageUrl}
                        image="https://images.pexels.com/photos/27835751/pexels-photo-27835751/free-photo-of-a-tree-with-green-apples-on-it.jpeg?auto=compress&cs=tinysrgb&w=800&lazy=load"
                        sx={{ borderTopLeftRadius: 12, borderTopRightRadius: 12 }}
                      />
                      <CardContent>
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                          <Typography gutterBottom variant="h5" component="div">
                            {product.name}
                          </Typography>
                          <IconButton color="primary">
                            <InfoIcon />
                          </IconButton>
                        </Box>
                        <Typography variant="body2" color="text.secondary">
                          {product.description}
                        </Typography>
                        <Typography variant="h6" color="text.primary" sx={{ marginTop: 2 }}>
                          {product.price}
                        </Typography>
                        <StyledButton
                          variant="contained"
                          startIcon={<ShoppingCartIcon />}
                          fullWidth
                        >
                          Buy Now
                        </StyledButton>
                      </CardContent>
                    </StyledCard>
                  </Grid>
                ))}
              </Grid>

              {/* Pagination */}
              <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
                <Pagination
                  count={totalPages}
                  page={page}
                  onChange={(e, value) => setPage(value)}
                  color="primary"
                />
              </Box>
            </Content>
          </Grid>
        </Grid>
      </Container>
    </Layout>
  );
}

export default ProductAll;
