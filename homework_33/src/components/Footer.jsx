import React from 'react';
import { Box, Container, Typography, Link, IconButton } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import EmailIcon from '@mui/icons-material/Email';

function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        position: 'fixed',        
        bottom: 0,                
        left: 0,
        width: '100%',          
        py: 2,
        px: 2,
        color: 'white',
        backgroundColor: (theme) =>
          theme.palette.mode === 'light'
            ? theme.palette.primary.light
            : theme.palette.primary.dark,
        zIndex: (theme) => theme.zIndex.appBar + 1, 
      }}
    >
      <Container maxWidth="lg">
        <Typography variant="body1" align="center" gutterBottom>
          Contacts
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1, mb: 1 }}>
          <IconButton
            aria-label="GitHub"
            color="inherit"
            component={Link}
            href="https://github.com/your-username"
            target="_blank"
            rel="noopener noreferrer"
          >
            <GitHubIcon />
          </IconButton>
          <IconButton
            aria-label="LinkedIn"
            color="inherit"
            component={Link}
            href="https://linkedin.com/in/your-profile"
            target="_blank"
            rel="noopener noreferrer"
          >
            <LinkedInIcon />
          </IconButton>
          <IconButton
            aria-label="Email"
            color="inherit"
            component={Link}
            href="mailto:your.email@example.com"
          >
            <EmailIcon />
          </IconButton>
        </Box>
        <Typography variant="body2" color="white" align="center">
          © {new Date().getFullYear()} I.Bondarenko
        </Typography>
      </Container>
    </Box>
  );
}

export default Footer;




