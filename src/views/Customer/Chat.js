// Chat.js
import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import {
    Box,
    Container,
    Grid,
    IconButton,
    Avatar,
    Typography,
    Paper,
    Divider,
    InputBase,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
    TextField
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import PhoneIcon from '@mui/icons-material/Phone';
import VideocamIcon from '@mui/icons-material/Videocam';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import SendIcon from '@mui/icons-material/Send';
import theme from './theme';

function Chat() {
    return (
        <ThemeProvider theme={theme}>

            <Container maxWidth="lg" sx={{ mt: 2 }}>
                <Grid container spacing={2}>
                    {/* Sidebar */}
                    <Grid item xs={3}>
                        <Paper elevation={1} sx={{ height: '100vh', display: 'flex', flexDirection: 'column', p: 2 }}>
                            {/* User Profile */}
                            <Box display="flex" alignItems="center" mb={2}>
                                <Avatar src="/path/to/mathew-anderson.jpg" alt="Mathew Anderson" />
                                <Box ml={2}>
                                    <Typography variant="h6">Mathew Anderson</Typography>
                                    <Typography variant="body2" color="text.secondary">Designer</Typography>
                                </Box>
                            </Box>
                            <Divider />

                            {/* Search Bar */}
                            <Box mt={2} mb={2}>
                                <Paper component="form" sx={{ p: '2px 4px', display: 'flex', alignItems: 'center' }}>
                                    <IconButton sx={{ p: '10px' }} aria-label="menu">
                                        <SearchIcon />
                                    </IconButton>
                                    <InputBase
                                        sx={{ ml: 1, flex: 1 }}
                                        placeholder="Search contacts"
                                        inputProps={{ 'aria-label': 'search contacts' }}
                                    />
                                </Paper>
                            </Box>

                            {/* Recent Chats */}
                            <Box>
                                <Typography variant="subtitle1" color="text.primary" mb={1}>Recent Chats</Typography>
                                <List>
                                    {['James Johnson', 'Maria Hernandez', 'David Smith', 'Maria Rodriguez', 'Robert Smith'].map((name, index) => (
                                        <ListItem button key={index}>
                                            <ListItemAvatar>
                                                <Avatar src={`/path/to/avatar-${index + 1}.jpg`} />
                                            </ListItemAvatar>
                                            <ListItemText
                                                primary={name}
                                                secondary={<Typography variant="body2" color="text.secondary">Last message preview...</Typography>}
                                            />
                                        </ListItem>
                                    ))}
                                </List>
                            </Box>
                        </Paper>
                    </Grid>

                    {/* Chat Window */}
                    <Grid item xs={9}>
                        <Paper elevation={1} sx={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
                            {/* Chat Header */}
                            <Box display="flex" alignItems="center" justifyContent="space-between" p={2}>
                                <Box display="flex" alignItems="center">
                                    <Avatar src="/path/to/james-johnson.jpg" />
                                    <Box ml={2}>
                                        <Typography variant="h6">James Johnson</Typography>
                                        <Typography variant="body2" color="text.secondary">online</Typography>
                                    </Box>
                                </Box>
                                <Box>
                                    <IconButton><PhoneIcon /></IconButton>
                                    <IconButton><VideocamIcon /></IconButton>
                                    <IconButton><MoreVertIcon /></IconButton>
                                </Box>
                            </Box>
                            <Divider />

                            {/* Chat Messages */}
                            <Box sx={{ flexGrow: 1, overflowY: 'auto', p: 2 }}>
                                {/* Messages */}
                                <Box mb={2}>
                                    <Typography variant="body2" color="text.secondary">James Johnson, 1 hour ago</Typography>
                                    <Paper sx={{ p: 1, mt: 1, bgcolor: '#f5f5f5' }}>
                                        Micdopet mecka noopu teuwa jemdo.
                                    </Paper>
                                </Box>
                                <Box mb={2}>
                                    <Typography variant="body2" color="text.secondary">James Johnson, 30 minutes ago</Typography>
                                    <Paper sx={{ p: 1, mt: 1, bgcolor: '#f5f5f5' }}>
                                        Soeje kovitfaj cu to zubajran respe jep ufbumiv izoate biwafow.
                                    </Paper>
                                </Box>
                                <Box display="flex" justifyContent="flex-end" mb={2}>
                                    <Box>
                                        <Typography variant="body2" color="text.secondary" align="right">6 minutes ago</Typography>
                                        <Paper sx={{ p: 1, mt: 1, bgcolor: '#4a90e2', color: 'white' }}>
                                            Vi vusuh zap dutbitfo gimeim.
                                        </Paper>
                                    </Box>
                                </Box>
                                {/* Image message */}
                                <Box display="flex" justifyContent="flex-end">
                                    <img src="/path/to/image.jpg" alt="Media" style={{ borderRadius: 8, maxWidth: '100%', marginTop: 8 }} />
                                </Box>
                            </Box>

                            {/* Message Input Area */}
                            <Divider />
                            <Box sx={{ p: 2, display: 'flex', alignItems: 'center' }}>
                                <TextField
                                    fullWidth
                                    variant="outlined"
                                    placeholder="Type a message..."
                                    sx={{ mr: 2 }}
                                />
                                <IconButton color="primary" aria-label="send message">
                                    <SendIcon />
                                </IconButton>
                            </Box>
                        </Paper>
                    </Grid>

                    {/* Media and Attachments */}
                    {/* <Grid item xs={3}>
                        <Paper elevation={1} sx={{ height: '100vh', display: 'flex', flexDirection: 'column', p: 2 }}>
                            <Box mb={2}>
                                <Typography variant="subtitle1" color="text.primary">Media</Typography>
                                <Avatar variant="rounded" src="/path/to/media-image.jpg" sx={{ width: 80, height: 80, mt: 2, mx: 'auto' }} />
                            </Box>
                            <Divider />
                            <Box mt={2} flexGrow={1}>
                                <Typography variant="subtitle1" color="text.primary">Attachments</Typography>
                                <List>
                                    {['service-task.pdf', 'homepage-design.fig', 'about-us.html', 'work-project.zip'].map((file, index) => (
                                        <ListItem button key={index}>
                                            <ListItemAvatar>
                                                <Avatar>
                                                    <AttachFileIcon />
                                                </Avatar>
                                            </ListItemAvatar>
                                            <ListItemText primary={file} secondary={<Typography variant="body2" color="text.secondary">Size: {index + 1}MB</Typography>} />
                                        </ListItem>
                                    ))}
                                </List>
                            </Box>
                        </Paper>
                    </Grid> */}
                </Grid>
            </Container>
        </ThemeProvider>
    );
}

export default Chat;
