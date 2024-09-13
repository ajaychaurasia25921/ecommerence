// import React, { useState, useEffect } from 'react';
// import { useLocation } from 'react-router';
// import { Box, List } from '@mui/material';
// import NavItem from './NavItem';
// import NavGroup from './NavGroup/NavGroup';
// import axios from 'axios';

// const SidebarItems = () => {
//   const { pathname } = useLocation();
//   const pathDirect = pathname;
//   const [menuItems, setMenuItems] = useState([]);

//   useEffect(() => {
//     const fetchMenuItems = async () => {
//       try {
//         const uid = localStorage.getItem('uid');
//         if (!uid) {
//           throw new Error('User ID not found in localStorage');
//         }

//         const response = await axios.post('http://134.209.145.149:9999/api/checkSidebar', { uid });
//         setMenuItems(response.data);
//       } catch (error) {
//         console.error('Failed to fetch menu items:', error);
//       }
//     };

//     fetchMenuItems();
//   }, []);

//   return (
//     <Box sx={{ px: 3 }}>
//       <List sx={{ pt: 0 }} className="sidebarNav">
//         {menuItems.map((item) => {
//           if (item.subheader) {
//             return <NavGroup item={item} key={item.subheader} />;
//           } else {
//             return (
//               <NavItem item={item} key={item.id} pathDirect={pathDirect} />
//             );
//           }
//         })}
//       </List>
//     </Box>
//   );
// };

// export default SidebarItems;
import React from 'react';
import getMenuItems from './MenuItems'; // Ensure this path is correct
import { useLocation } from 'react-router';
import { Box, List } from '@mui/material';
import NavItem from './NavItem';
import NavGroup from './NavGroup/NavGroup';

const SidebarItems = () => {
  const { pathname } = useLocation();
  const pathDirect = pathname;
  const menuItems = getMenuItems(); // Dynamically get the menu items based on user type

  return (
    <Box sx={{ px: 3 }}>
      <List sx={{ pt: 0 }} className="sidebarNav">
        {menuItems.map((item) => {
          if (item.subheader) {
            return <NavGroup item={item} key={item.subheader} />;
          } else {
            return (
              <NavItem item={item} key={item.id} pathDirect={pathDirect} />
            );
          }
        })}
      </List>
    </Box>
  );
};

export default SidebarItems;