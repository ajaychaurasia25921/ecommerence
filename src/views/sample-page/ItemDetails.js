import { Box, Button, IconButton, Typography, Tabs, Tab } from "@mui/material";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Footer from "../Home/Footer";
import Navbar from "../Home/Navbar";
import { useNavigate } from 'react-router-dom';

const dummyItem = {
  name: "Stylish Chair",
  price: 199.99,
  longDescription:
    "A stylish chair that brings comfort and elegance to any space. Made from high-quality materials with a modern design.",
  category: "Furniture",
  image: "https://images.pexels.com/photos/18028832/pexels-photo-18028832/free-photo-of-road-through-forest-in-summer.png?auto=compress&cs=tinysrgb&w=800&lazy=load", // Replace with actual image path
};

const dummyItems = [
  { name: "Modern Sofa", image: "https://images.pexels.com/photos/18028832/pexels-photo-18028832/free-photo-of-road-through-forest-in-summer.png?auto=compress&cs=tinysrgb&w=800&lazy=load", price: 299.99 },
  { name: "Elegant Lamp", image: "https://images.pexels.com/photos/18028832/pexels-photo-18028832/free-photo-of-road-through-forest-in-summer.png?auto=compress&cs=tinysrgb&w=800&lazy=load", price: 49.99 },
  { name: "Wooden Table", image: "https://images.pexels.com/photos/18028832/pexels-photo-18028832/free-photo-of-road-through-forest-in-summer.png?auto=compress&cs=tinysrgb&w=800&lazy=load", price: 149.99 },
  { name: "Cozy Blanket", image: "https://images.pexels.com/photos/18028832/pexels-photo-18028832/free-photo-of-road-through-forest-in-summer.png?auto=compress&cs=tinysrgb&w=800&lazy=load", price: 39.99 },
];

const ItemDetails = () => {
  const navigate = useNavigate();
  const { itemId } = useParams();
  const [value, setValue] = useState("description");
  const [count, setCount] = useState(1);
  const [item, setItem] = useState(dummyItem);
  const [items, setItems] = useState(dummyItems);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    // Fetch the actual item data here
    setItem(dummyItem);
    setItems(dummyItems);
  }, [itemId]);

  return (
    <>
    <Navbar/>
    <Box width="80%" m="80px auto">
      <Box display="flex" flexWrap="wrap" columnGap="40px">
        {/* IMAGES */}
        <Box flex="1 1 40%" mb="40px">
          <img
            alt={item?.name}
            width="100%"
            height="100%"
            src={item?.image}
            style={{ objectFit: "cover", borderRadius: "10px", boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.1)" }}
          />
        </Box>

        {/* ACTIONS */}
        <Box flex="1 1 50%" mb="40px">
          <Box display="flex" justifyContent="space-between">
            <Typography variant="subtitle2" color="textSecondary">Home / {item?.category}</Typography>
            {/* <Box>
              <Button variant="text" size="small" color="primary">Prev</Button>
              <Button variant="text" size="small" color="primary">Next</Button>
            </Box> */}
          </Box>

          <Box m="65px 0 25px 0">
            <Typography variant="h4" fontWeight="bold">{item?.name}</Typography>
            <Typography variant="h5" color="primary" mt="10px">${item?.price}</Typography>
            <Typography sx={{ mt: "20px", lineHeight: 1.6 }}>
              {item?.longDescription}
            </Typography>
          </Box>

          <Box display="flex" alignItems="center" minHeight="50px">
            <Box
              display="flex"
              alignItems="center"
              border="1.5px solid #e0e0e0"
              mr="20px"
              p="2px 5px"
              borderRadius="5px"
            >
              <IconButton onClick={() => setCount(Math.max(count - 1, 1))}>
                <RemoveIcon />
              </IconButton>
              <Typography sx={{ p: "0 15px" }}>{count}</Typography>
              <IconButton onClick={() => setCount(count + 1)}>
                <AddIcon />
              </IconButton>
            </Box>
            <Button
              sx={{
                backgroundColor: "#222222",
                color: "white",
                borderRadius: "5px",
                minWidth: "150px",
                padding: "10px 40px",
                boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
              }}
                onClick={() => navigate('/buynow')}
            >
              BUY NOW
            </Button>
          </Box>
          <Box>
            <Box m="20px 0 5px 0" display="flex" alignItems="center">
              <FavoriteBorderOutlinedIcon sx={{ color: "#e53935" }} />
              <Typography sx={{ ml: "10px", color: "#e53935" }}>ADD TO WISHLIST</Typography>
            </Box>
            <Typography variant="body2" color="textSecondary">CATEGORIES: {item?.category}</Typography>
          </Box>
        </Box>
      </Box>

      {/* INFORMATION */}
      <Box m="20px 0">
        <Tabs value={value} onChange={handleChange} centered>
          <Tab label="DESCRIPTION" value="description" />
          <Tab label="REVIEWS" value="reviews" />
        </Tabs>
      </Box>
      <Box display="flex" flexWrap="wrap" gap="15px">
        {value === "description" && (
          <Typography variant="body1" sx={{ lineHeight: 1.7 }}>
            {item?.longDescription}
          </Typography>
        )}
        {value === "reviews" && (
          <Typography variant="body1">No reviews yet.</Typography>
        )}
      </Box>

      {/* RELATED ITEMS */}
      <Box mt="50px" width="100%">
        <Typography variant="h4" fontWeight="bold">
          Related Products
        </Typography>
        <Box
          mt="20px"
          display="flex"
          flexWrap="wrap"
          columnGap="1.33%"
          justifyContent="space-between"
        >
          {items.map((relatedItem, i) => (
            <Box
              key={`${relatedItem.name}-${i}`}
              flex="1 1 23%"
              mb="20px"
              sx={{ borderRadius: "10px", boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.1)" }}
            >
              <img
                alt={relatedItem.name}
                src={relatedItem.image}
                style={{ width: "100%", borderRadius: "10px 10px 0 0", objectFit: "cover" }}
              />
              <Box p="10px">
                <Typography variant="h6">{relatedItem.name}</Typography>
                <Typography variant="body2" color="textSecondary">${relatedItem.price}</Typography>
              </Box>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
    <Footer/>
    </>
  );
};

export default ItemDetails;
