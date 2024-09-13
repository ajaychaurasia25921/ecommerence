// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import {
//   IconAperture, IconCopy, IconLayoutDashboard, IconLogin, IconMoodHappy, IconTypography, IconUserPlus
// } from '@tabler/icons';

// import { uniqueId } from 'lodash';

// const Menuitems = [
//   {
//     navlabel: true,
//     subheader: 'Home',
//   },
//   {
//     id: uniqueId(),
//     title: 'Dashboard',
//     icon: IconLayoutDashboard,
//     href: '/dashboard',
//   },
//   {
//     id: uniqueId(),
//     title: 'User List',
//     icon: IconLayoutDashboard,
//     href: '/userlist',
//   },
//   {
//     id: uniqueId(),
//     title: 'Agent List',
//     icon: IconLayoutDashboard,
//     href: '/agentlist',
//   },
//   {
//     id: uniqueId(),
//     title: 'Recording',
//     icon: IconLayoutDashboard,
//     href: '/recordinglist',
//   },
//   {
//     id: uniqueId(),
//     title: 'Product List',
//     icon: IconLayoutDashboard,
//     href: '/productlist',
//   },
//   {
//     id: uniqueId(),
//     title: 'Discount Coupon',
//     icon: IconLayoutDashboard,
//     href: '/discountlist',
//   },
//   {
//     id: uniqueId(),
//     title: 'Order Mangement',
//     icon: IconLayoutDashboard,
//     href: '/ordermangement',
//   },
//   {
//     id: uniqueId(),
//     title: 'Transaction Records',
//     icon: IconLayoutDashboard,
//     href: '/transactionrecords',
//   },
//   {
//     id: uniqueId(),
//     title: 'Permission',
//     icon: IconLayoutDashboard,
//     href: '/permission',
//   },
// ];

// const Menuitems1 = [
//   {
//     navlabel: true,
//     subheader: 'Home',
//   },
//   {
//     id: uniqueId(),
//     title: 'Dashboard',
//     icon: IconLayoutDashboard,
//     href: '/dashboard',
//   },
//   {
//     id: uniqueId(),
//     title: 'Chat',
//     icon: IconLayoutDashboard,
//     href: '/chat',
//   },
//   {
//     id: uniqueId(),
//     title: 'Product',
//     icon: IconLayoutDashboard,
//     href: '/product',
//   },
//   {
//     id: uniqueId(),
//     title: 'Order History',
//     icon: IconLayoutDashboard,
//     href: '/orderhistory',
//   },
//   {
//     id: uniqueId(),
//     title: 'Subscription',
//     icon: IconLayoutDashboard,
//     href: '/subscription',
//   },
// ];

// const Menuitems2 = [
//   {
//     navlabel: true,
//     subheader: 'Home',
//   },
//   {
//     id: uniqueId(),
//     title: 'Dashboard',
//     icon: IconLayoutDashboard,
//     href: '/dashboard',
//   },
//   {
//     id: uniqueId(),
//     title: 'Call History',
//     icon: IconLayoutDashboard,
//     href: '/callhistory',
//   },
//   {
//     id: uniqueId(),
//     title: 'Chat',
//     icon: IconLayoutDashboard,
//     href: '/Chat',
//   },
//   {
//     id: uniqueId(),
//     title: 'Reports',
//     icon: IconLayoutDashboard,
//     href: '/reports',
//   },
// ];

// const GetMenuItems = () => {
//  const userType = localStorage.getItem('user_type');
//   const [status, setStatus] = useState("");
//   const uid = localStorage.getItem('uid');


//   const loadData = async () => {
//     const uid = localStorage.getItem('uid');
//     try {
//       const result = await axios.post('http://134.209.145.149:9999/api/checkSidebar', { uid: uid });
//       // Assuming 'status' is the field you want from result
//       console.log(result.data, "result is ==>>>>");

//     } catch (error) {
//       console.error('Error loading data:', error);
//     }
//   };

//   useEffect(() => {
//     loadData();
//   }, );

// //   useEffect(async()=>{
// //  if(status){


// //   const result = await axios.post('http://localhost:9999/api/getCPermissions', { user_id: uid });
// //   console.log(result,"result of the specific user is ==>>>")

// //  }

// //  else{


// //   const result = await axios.get('http://localhost:9999/api/getPermissions');
// //   console.log(result,"result of the user_type is ==>>>")

// //  }




// //   },status)


//   // console.log(`User type: ${userType}`, status); // Debugging line

//   switch (userType) {
//     case 'AD':
//       return Menuitems;
//     case 'CU':
//       return Menuitems1;
//     case 'AG':
//       return Menuitems2;
//     default:
//       return []; // Always return an array
//   }
// };

// export default GetMenuItems;
import {
    IconAperture, IconCopy, IconLayoutDashboard, IconLogin, IconMoodHappy, IconTypography, IconUserPlus
} from '@tabler/icons';

import { uniqueId } from 'lodash';

const Menuitems = [
    {
        navlabel: true,
        subheader: 'Home',
    },

    {
        id: uniqueId(),
        title: 'Dashboard',
        icon: IconLayoutDashboard,
        href: '/dashboard',
    },

    {
        id: uniqueId(),
        title: 'User List',
        icon: IconLayoutDashboard,
        href: '/userlist',
    },
    {
        id: uniqueId(),
        title: 'Agent List',
        icon: IconLayoutDashboard,
        href: '/agentlist',
    },

    {
        id: uniqueId(),
        title: 'Recording',
        icon: IconLayoutDashboard,
        href: '/recordinglist',
    },

    {
        id: uniqueId(),
        title: 'Product List',
        icon: IconLayoutDashboard,
        href: '/productlist',
    },

    {
        id: uniqueId(),
        title: 'Discount Coupon',
        icon: IconLayoutDashboard,
        href: '/discountlist',
    },
    {
        id: uniqueId(),
        title: 'Order Mangement',
        icon: IconLayoutDashboard,
        href: '/ordermangement',
    },
    {
        id: uniqueId(),
        title: 'Transaction Records',
        icon: IconLayoutDashboard,
        href: '/transactionrecords',
    },

    {
        id: uniqueId(),
        title: 'Permission',
        icon: IconLayoutDashboard,
        href: '/permission',
    },
    {
        id: uniqueId(),
        title: 'Languages',
        icon: IconLayoutDashboard,
        href: '/languages',
    },
    {
        id: uniqueId(),
        title: 'Vendor',
        icon: IconLayoutDashboard,
        href: '/vendor',
    },
];

const Menuitems1 = [
    {
        navlabel: true,
        subheader: 'Home',
    },

    {
        id: uniqueId(),
        title: 'Dashboard',
        icon: IconLayoutDashboard,
        href: '/dashboard',
    },

    {
        id: uniqueId(),
        title: 'Chat',
        icon: IconLayoutDashboard,
        href: '/chat',
    },
    {
        id: uniqueId(),
        title: 'Product',
        icon: IconLayoutDashboard,
        href: '/product',
    },

    {
        id: uniqueId(),
        title: 'Order History',
        icon: IconLayoutDashboard,
        href: '/orderhistory',
    },

    {
        id: uniqueId(),
        title: 'Subscription',
        icon: IconLayoutDashboard,
        href: '/subscription',
    },


];

const Menuitems2 = [
    {
        navlabel: true,
        subheader: 'Home',
    },

    {
        id: uniqueId(),
        title: 'Dashboard',
        icon: IconLayoutDashboard,
        href: '/dashboard',
    },

    {
        id: uniqueId(),
        title: 'Call History',
        icon: IconLayoutDashboard,
        href: '/callhistory',
    },
    {
        id: uniqueId(),
        title: 'Chat',
        icon: IconLayoutDashboard,
        href: '/Chat',
    },

    {
        id: uniqueId(),
        title: 'Reports',
        icon: IconLayoutDashboard,
        href: '/reports',
    },


];

const getMenuItems = () => {
    const userType = localStorage.getItem('role_id');
    console.log(`User type: ${userType}`); // Debugging line

    switch (userType) {
        case '1':
            return Menuitems;
        case '3':
            return Menuitems1;
        case '2':
            return Menuitems2;
        default:
            return []; // Always return an array
    }
};

export default getMenuItems;