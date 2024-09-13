import React, { useState, useEffect } from 'react';
import {
  Grid, Card, CardContent,
  InputLabel, Select, MenuItem, Box, FormControl, CardHeader, Checkbox, Button, FormControlLabel, Typography
} from '@mui/material';
import DashboardCard from 'src/components/shared/DashboardCard';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useParams, useNavigate } from 'react-router-dom';
const Permission = () => {
  const [selections, setSelections] = useState([]);
  const [names, setNames] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchNames = async () => {
      try {
        const response = await fetch('http://134.209.145.149:9999/api/menuList');
        const result = await response.json();

        if (result.success) {
          const namesList = result.data.map((item) => item.name);

          // Initialize selections state
          const initialSelections = namesList.map(() => ({
            AD: false,
            CU: false,
            AG: false,
          }));

          setNames(namesList);
          setSelections(initialSelections);
        } else {
          console.error('Failed to fetch data:', result.success);
        }
      } catch (error) {
        console.error('Error fetching names:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchNames();
  }, []);

  useEffect(() => {
    const fetchPermissions = async () => {
      try {
        const response = await fetch('http://134.209.145.149:9999/api/getPermissions');
        const permissions = await response.json();

        if (permissions) {
          // Map permissions to selections
          const updatedSelections = selections.map((selection, index) => {
            const name = names[index];
            const relevantPermissions = permissions.filter(
              (perm) => perm.menu_name === name
            );
            const newSelection = { AD: false, CU: false, AG: false };

            relevantPermissions.forEach((perm) => {
              newSelection[perm.role_type] = true;
            });

            return newSelection;
          });

          setSelections(updatedSelections);
        } else {
          console.error('Failed to fetch permissions');
        }
      } catch (error) {
        console.error('Error fetching permissions:', error);
      }
    };

    if (names.length > 0) {
      fetchPermissions();
    }
  }, [names]);

  const handleCheckboxChange = (index, permission) => (event) => {
    const updatedSelections = [...selections];
    updatedSelections[index] = {
      ...updatedSelections[index],
      [permission]: event.target.checked,
    };
    setSelections(updatedSelections);
  };

  const handleSubmit = async () => {
    const payload = names.map((name, index) => ({
      name,
      permissions: {
        AD: selections[index].AD,
        CU: selections[index].CU,
        AG: selections[index].AG,
      },
    }));

    try {
      const response = await fetch('http://134.209.145.149:9999/api/dPermission', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (response.ok) {
        toast.success('Permissions updated successfully!');
        setTimeout(() => {
          window.location.reload();
        }, 3000);
      } else {
        toast.error(`Failed to update permissions: ${result.message}`);
      }
    } catch (error) {
      toast.error('Error submitting permissions');
    }
  };

  if (loading) {
    return <Typography variant="body1">Loading...</Typography>;
  }

  return (
    <DashboardCard>


      <ToastContainer />

      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        <Typography variant="h3" component="h2" sx={{ flex: 1 }}>
          Permission
        </Typography>

        <Box sx={{ display: 'flex', gap: 2 }}>



          <FormControl variant="outlined" size="medium">
            <InputLabel>Select User</InputLabel>
            <Select
              // value={selectedOption}
              // onChange={handleChange1}
              label="Select User"
              sx={{ height: '100%', minWidth: '220px' }} // Adjust height and width as needed
            >
              <MenuItem value={12}>Admin</MenuItem>
              <MenuItem value={1}>Agent</MenuItem>
              <MenuItem value={0}>Customer</MenuItem>
            </Select>
          </FormControl>

        </Box>
      </Box>

      <CardContent>
        <Grid container spacing={2}>
          {names.map((name, index) => (
            <Grid item xs={12} key={index}>
              <Grid container alignItems="center" spacing={2}>
                <Grid item xs={3}>
                  <Typography variant="body1">{name}</Typography>
                </Grid>
                <Grid item xs={9}>
                  <Grid container spacing={1} justifyContent="flex-end">
                    <Grid item>
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={selections[index]?.AD || false}
                            onChange={handleCheckboxChange(index, 'AD')}
                            color="primary"
                          />
                        }
                        label="AD"
                      />
                    </Grid>
                    <Grid item>
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={selections[index]?.CU || false}
                            onChange={handleCheckboxChange(index, 'CU')}
                            color="primary"
                          />
                        }
                        label="CU"
                      />
                    </Grid>
                    <Grid item>
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={selections[index]?.AG || false}
                            onChange={handleCheckboxChange(index, 'AG')}
                            color="primary"
                          />
                        }
                        label="AG"
                      />
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          ))}
        </Grid>
        <Button
          variant="contained"
          color="primary"
          onClick={handleSubmit}
          sx={{ marginTop: '16px', float: 'right', marginBottom: '16px' }}
        >
          Submit
        </Button>
      </CardContent>

    </DashboardCard>

  );
};

export default Permission;
