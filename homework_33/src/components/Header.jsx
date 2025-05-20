import { NavLink, Outlet, useMatches } from "react-router-dom";
import { AppBar, Toolbar, Typography, Box, Stack, Link as MuiLink } from '@mui/material';
import { styled } from '@mui/material/styles'; 

const navLinks = [
    { to: "/", label: "Main" },
    { to: "/todo", label: "Todo"},
];


const StyledNavLink = styled(NavLink)(({ theme, active }) => ({
    color: active ? theme.palette.warning.light : theme.palette.common.white, 
    textDecoration: 'none', 
    '&:hover': {
        textDecoration: 'underline', 
    },
    '&.active': {
        color: theme.palette.info.light,
        fontWeight: 'bold',
        textDecoration: 'underline', 
    },
}));


const Header = () => {
    const matches = useMatches();
    const currentTitle = [...matches]
        .reverse()
        .find(({ handle }) => handle?.title) 
        ?.handle.title || 'Default Title'; 

    return (
        
        <Box sx={{ flexGrow: 1 }}>
            
            <AppBar position="static"> 
                <Toolbar> 
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        {currentTitle}
                    </Typography>
 
                    <Stack direction="row" spacing={3}> 
                        {navLinks.map(({ to, label }) => (
                             <StyledNavLink
                                key={to}
                                to={to}
                                end
                                children={() => (
                                    <Typography
                                        variant="button" 
                                        color="inherit" 
                                        component="span" 
                                        sx={{ 
                                            textDecoration: 'inherit',
                                            fontWeight: 'inherit',           
                                        }} 
                                    >
                                        {label}
                                    </Typography>
                                )}
                             />
                        ))}
                    </Stack>
                </Toolbar>
            </AppBar>

            <Box component="main" sx={{ p: 4, pb: 10 }}>
                <Outlet />
            </Box>           
        </Box>        
    );
};

export default Header;




