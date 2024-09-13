import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
    Typography,
    Box,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Skeleton,
    IconButton,
    Popover,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Button,
    TextField
} from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';
import Swal from 'sweetalert2';
import DashboardCard from 'src/components/shared/DashboardCard';
import NoData from "src/assets/images/products/NoData.jpg";
import { useNavigate } from 'react-router-dom';

const Languages = () => {
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [anchorEl, setAnchorEl] = useState(null);
    const [popoverContent, setPopoverContent] = useState("");
    const [openDialog, setOpenDialog] = useState(false);
    const [productToDelete, setProductToDelete] = useState(null);
    const [openModal, setOpenModal] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [currentProduct, setCurrentProduct] = useState({ id: '', name: '' });
    const [validationError, setValidationError] = useState('');

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('http://134.209.145.149:9999/api/language');
                setProducts(response.data);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    const handlePopoverOpen = (event, content) => {
        setAnchorEl(event.currentTarget);
        setPopoverContent(content);
    };

    const handlePopoverClose = () => {
        setAnchorEl(null);
        setPopoverContent("");
    };

    const handleDelete = (product) => {
        setProductToDelete(product);
        setOpenDialog(true);
    };

    const confirmDelete = async () => {
        setOpenDialog(false);
        try {
            await axios.delete(`http://134.209.145.149:9999/api/language/${productToDelete.id}`);
            setProducts(products.filter((p) => p.id !== productToDelete.id));
            Swal.fire({
                icon: 'success',
                title: 'Deleted!',
                text: 'Product deleted successfully',
                confirmButtonText: 'OK'
            });
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Error!',
                text: 'Failed to delete product',
                confirmButtonText: 'OK'
            });
        }
    };

    const handleEdit = (product) => {
        setCurrentProduct(product);
        setIsEditing(true);
        setOpenModal(true);
        setValidationError('');
    };

    const handleAddProduct = () => {
        setCurrentProduct({ id: '', name: '' });
        setIsEditing(false);
        setOpenModal(true);
        setValidationError('');
    };

    const handleModalClose = () => {
        setOpenModal(false);
        setCurrentProduct({ id: '', name: '' });
        setValidationError('');
    };

    const handleSaveProduct = async () => {
        if (!currentProduct.name.trim()) {
            setValidationError('Language name cannot be empty');
            return;
        }

        if (isEditing) {
            try {
                await axios.put(`http://134.209.145.149:9999/api/language/${currentProduct.id}`, currentProduct);
                setProducts(products.map((product) => (product.id === currentProduct.id ? currentProduct : product)));
                Swal.fire({
                    icon: 'success',
                    title: 'Updated!',
                    text: 'Language updated successfully',
                    confirmButtonText: 'OK'
                });
            } catch (error) {
                Swal.fire({
                    icon: 'error',
                    title: 'Error!',
                    text: 'Failed to update language',
                    confirmButtonText: 'OK'
                });
            }
        } else {
            try {
                const response = await axios.post(`http://134.209.145.149:9999/api/language`, currentProduct);
                setProducts([...products, response.data]);
                Swal.fire({
                    icon: 'success',
                    title: 'Added!',
                    text: 'Language added successfully',
                    confirmButtonText: 'OK'
                });
            } catch (error) {
                Swal.fire({
                    icon: 'error',
                    title: 'Error!',
                    text: 'Failed to add language',
                    confirmButtonText: 'OK'
                });
            }
        }

        setOpenModal(false);
    };

    const open = Boolean(anchorEl);

    if (error) {
        return <Typography>Error: {error.message}</Typography>;
    }

    if (!Array.isArray(products)) {
        return <Typography>Error: Unexpected data format</Typography>;
    }

    return (
        <DashboardCard>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Typography variant="h3" component="h2" sx={{ flex: 1 }}>
                    Language List
                </Typography>
                <Box sx={{ display: 'flex', gap: 2 }}>
                    <Button
                        variant="contained"
                        color="primary"
                        size="large"
                        onClick={handleAddProduct}
                    >
                        Add Language
                    </Button>
                </Box>
            </Box>
            <Box sx={{ overflow: 'auto', width: { xs: '280px', sm: 'auto' } }}>
                <Table
                    aria-label="simple table"
                    sx={{
                        whiteSpace: "nowrap",
                        mt: 2
                    }}
                >
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{ backgroundColor: '#f5f5f5' }}>
                                <Typography variant="subtitle2" fontWeight={600}>
                                    Id
                                </Typography>
                            </TableCell>
                            <TableCell sx={{ backgroundColor: '#f5f5f5' }}>
                                <Typography variant="subtitle2" fontWeight={600}>
                                    Name
                                </Typography>
                            </TableCell>
                            <TableCell sx={{ backgroundColor: '#f5f5f5' }}>
                                <Typography variant="subtitle2" fontWeight={600}>
                                    Actions
                                </Typography>
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {loading ? (
                            <SkeletonLoading />
                        ) : products.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={7}>
                                    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '300px' }}>
                                        <img src={NoData} alt="No data available" style={{ maxWidth: '100%', maxHeight: '100%' }} />
                                    </Box>
                                </TableCell>
                            </TableRow>
                        ) : (
                            products.map((product, index) => (
                                <TableRow key={product.id}>
                                    <TableCell>
                                        <Typography variant="subtitle2">
                                            {index + 1}
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography variant="subtitle2">
                                            {product.name}
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <IconButton
                                            aria-owns={open ? 'mouse-over-popover' : undefined}
                                            aria-haspopup="true"
                                            onMouseEnter={(event) => handlePopoverOpen(event, 'Edit')}
                                            onMouseLeave={handlePopoverClose}
                                            onClick={() => handleEdit(product)}
                                        >
                                            <Edit />
                                        </IconButton>
                                        <IconButton
                                            aria-owns={open ? 'mouse-over-popover' : undefined}
                                            aria-haspopup="true"
                                            onMouseEnter={(event) => handlePopoverOpen(event, 'Delete')}
                                            onMouseLeave={handlePopoverClose}
                                            onClick={() => handleDelete(product)}
                                        >
                                            <Delete />
                                        </IconButton>
                                        <Popover
                                            id="mouse-over-popover"
                                            sx={{
                                                pointerEvents: 'none',
                                            }}
                                            open={open}
                                            anchorEl={anchorEl}
                                            anchorOrigin={{
                                                vertical: 'bottom',
                                                horizontal: 'left',
                                            }}
                                            transformOrigin={{
                                                vertical: 'top',
                                                horizontal: 'left',
                                            }}
                                            onClose={handlePopoverClose}
                                            disableRestoreFocus
                                        >
                                            <Box sx={{ p: 1 }}>
                                                <Typography>{popoverContent}</Typography>
                                            </Box>
                                        </Popover>
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </Box>

            <Dialog
                open={openDialog}
                onClose={() => setOpenDialog(false)}
            >
                <DialogTitle>Delete Product</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Are you sure you want to delete this language?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
                    <Button onClick={confirmDelete} color="primary">
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Modal for Adding/Editing Languages */}
            <Dialog
                open={openModal}
                onClose={handleModalClose}
                maxWidth="sm"  // Set modal to medium size
                fullWidth
                PaperProps={{
                    sx: {
                        borderRadius: 3, // Add rounded corners
                        padding: 3,      // Add padding
                    }
                }}
            >
                <DialogTitle>
                    {isEditing ? 'Edit Language' : 'Add Language'}
                </DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Language Name"
                        type="text"
                        fullWidth
                        variant="outlined"
                        value={currentProduct.name}
                        onChange={(e) => setCurrentProduct({ ...currentProduct, name: e.target.value })}
                        error={!!validationError}
                        helperText={validationError}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleModalClose} color="secondary" variant="outlined">Cancel</Button>
                    <Button onClick={handleSaveProduct} color="primary" variant="contained">
                        {isEditing ? 'Update' : 'Add'}
                    </Button>
                </DialogActions>
            </Dialog>
        </DashboardCard>
    );
};

const SkeletonLoading = () => (
    <>
        {[...Array(5)].map((_, index) => (
            <TableRow key={index}>
                <TableCell><Skeleton animation="wave" variant="rectangular" height={20} /></TableCell>
                <TableCell><Skeleton animation="wave" variant="rectangular" height={20} /></TableCell>
                <TableCell><Skeleton animation="wave" variant="rectangular" height={20} /></TableCell>
            </TableRow>
        ))}
    </>
);

export default Languages;
