import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchPeopleRequest, setSwapiPage } from '../store/swapi/swapiSlice'; 
import {
  Container,
  Typography,
  List,
  ListItem,
  ListItemText,
  CircularProgress,
  Alert,
  Box,
  Paper,
  Button,
  Pagination, 
  Grid
} from '@mui/material';
import Footer from '../components/Footer';

function Swapi() {
  const dispatch = useDispatch();
  const {
    people, 
    loading, 
    error,   
    page,    
    next,    
    previous 
  } = useSelector((state) => state.swapi);

  
  
  const totalPages = useSelector((state) => state.swapi.totalPagesFromApi); 


  useEffect(() => {
    
    dispatch(fetchPeopleRequest({ page }));
  }, [dispatch, page]);

  const handlePageChange = (event, newPage) => {
    if (newPage >= 1 && newPage !== page && (!totalPages || newPage <= totalPages)) {
      dispatch(setSwapiPage(newPage));
    }
  };

  const handleLegacyPageChange = (newPage) => {
      if (newPage >= 1 && newPage !== page && (!totalPages || newPage <= totalPages)) {
          dispatch(setSwapiPage(newPage));
      }
  }

  return (
    <Box sx={{pb: 10}}>
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Paper elevation={3} sx={{ p: { xs: 2, sm: 3, md: 4 } }}>
        <Typography variant="h4" component="h1" align="center" gutterBottom sx={{ fontWeight: 'bold', color: 'primary.main' }}>
          Characters Star Wars
        </Typography>

        {loading && (
          <Box sx={{ display: 'flex', justifyContent: 'center', my: 5 }}>
            <CircularProgress size={30} />
          </Box>
        )}

        {error && (
          <Alert severity="error" sx={{ my: 3 }}>
            Error: {typeof error === 'string' ? error : JSON.stringify(error)}
          </Alert>
        )}

        {!loading && !error && people.length > 0 && (
          <List sx={{ mb: 5 }}>
          {people.map((person) => (
            <ListItem key={person.uid} divider> 
              <ListItemText sx={{bgcolor: '#bce0fa', p: 5}}
                primary={
                  <Typography variant="h5" component="h2" color="secondary.dark" fontWeight={'bold'}>
                    {person.name} 
                  </Typography>
                }
                secondary={
                  <>
                    <Typography component="span" variant="body2" color="text.secondary" fontSize={'18px'}>
                      Year of birth: {person.birth_year}
                    </Typography>
                    <br />
                    <Typography component="span" variant="body2" color="text.secondary" fontSize={'18px'}>
                      Gender: {person.gender}
                    </Typography>
                    <br />
                    <Typography component="span" variant="body2" color="text.secondary" fontSize={'18px'}>
                      Height: {person.height} sм
                    </Typography>
                    <br />
                    <Typography component="span" variant="body2" color="text.secondary" fontSize={'18px'}>
                      Mass: {person.mass} kg
                    </Typography>
                    <br />
                    <Typography component="span" variant="body2" color="text.secondary" fontSize={'18px'}>
                      URL: {person.url} kg
                    </Typography>        
                  </>
                }
              />
            </ListItem>
          ))}
        </List>
        )}

        {!loading && !error && people.length === 0 && (
          <Typography variant="subtitle1" align="center" color="text.secondary" sx={{ my: 3 }}>
            There is no data to display.
          </Typography>
        )}
    
        {!loading && !error && totalPages > 0 && ( 
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
            <Pagination
              count={totalPages}
              page={page}
              onChange={handlePageChange}
              color="primary"
              showFirstButton
              showLastButton
              disabled={loading}
            />
          </Box>
        )}
       
        {!loading && !error && !totalPages && (next || previous) && (
           <Grid container spacing={2} justifyContent="center" sx={{ mt: 4 }}>
              <Grid>
                <Button
                  variant="contained"
                  onClick={() => handleLegacyPageChange(page - 1)}
                  disabled={!previous || loading}
                >
                  Back
                </Button>
              </Grid>
              <Grid item sx={{display: 'flex', alignItems: 'center'}}>
                <Typography>Page {page}</Typography>
              </Grid>
              <Grid item>
                <Button
                  variant="contained"
                  onClick={() => handleLegacyPageChange(page + 1)}
                  disabled={!next || loading}
                >
                  Forward
                </Button>
              </Grid>
           </Grid>
        )}
      </Paper>
      
    </Container>
    <Footer />
    </Box>
    
  );
}

export default Swapi;

