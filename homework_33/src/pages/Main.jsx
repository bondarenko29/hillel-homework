import React from 'react';
import { Box, Typography, Paper, Grid, Chip, List, ListItem, ListItemText, Avatar, Container } from '@mui/material';
import Footer from '../components/Footer';
function Main() {
  const skills = ['React', 'JavaScript', 'Redux', 'Saga', 'MUI', 'Node.js', 'HTML5', 'CSS3'];
  const experiences = [
    {
      title: 'Frontend Developer',
      company: 'Tech Solutions Ltd.',
      years: '2022 - Present',
      description: 'Розробка сучасних вебдодатків з використанням React, Redux, Tailwindcss та MUI. Активна участь у всіх етапах життєвого циклу продукту.',
    },
    {
      title: 'Junior Developer',
      company: 'Web Star Co.',
      years: '2018 - 2022',
      description: 'Створення UI компонентів, вивчення передових технологій, участь у командній розробці.',
    },
  ];

  return (
    <Box sx={{pb: 10}}>
        <Container maxWidth="lg"> 
      <Paper elevation={3} sx={{ p: { xs: 2, sm: 3 }, mb: 3 }}>
        <Grid container spacing={3} alignItems="center">
          <Grid item xs={12} sm={4} sx={{ textAlign: 'center' }}>
            <Avatar
              src="https://avatar.iran.liara.run/public/63"
              alt="My Avatar"  
              sx={{ width: 150, height: 150, margin: 'auto', mb: 2, fontSize: '3rem' }}
            >
            </Avatar>
            <Typography variant="h4" component="h1" gutterBottom>
              Ірина Бондаренко
            </Typography>
            <Typography variant="h6" color="primary" gutterBottom>
              Frontend Developer
            </Typography>
          </Grid>
          <Grid item xs={12} sm={8}>
            <Typography variant="h5" component="h2" fontWeight={'bold'} gutterBottom>
              Про мене
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Мотивований та досвідчений Frontend розробник з фокусом на React, Redux.
              Прагну створювати ефективні та зручні інтерфейси.
            </Typography>
          </Grid>
        </Grid>
      </Paper>

      <Paper elevation={3} sx={{ p: { xs: 2, sm: 3 }, mb: 3 }}>
        <Typography variant="h5" component="h2" fontWeight={'bold'} gutterBottom sx={{ mb: 2 }}>
          Навички
        </Typography>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
          {skills.map((skill) => (
            <Chip label={skill} key={skill} color="primary" variant="outlined" />
          ))}
        </Box>
      </Paper>

      <Paper elevation={3} sx={{ p: { xs: 2, sm: 3 } }}>
        <Typography variant="h5" component="h2"  fontWeight={'bold'} gutterBottom sx={{ mb: 2 }}>
          Досвід роботи
        </Typography>
        <List disablePadding>
          {experiences.map((job, index) => (
            <ListItem key={index} disableGutters sx={{ flexDirection: 'column', alignItems: 'flex-start', mb: 2, '&:not(:last-child)': { borderBottom: '1px dashed', borderColor: 'grey.300', pb: 2 } }}>
              <Typography variant="h6" color="primary" fontWeight={'bold'}>{job.title}</Typography>
              <Typography variant="subtitle1" color="text.secondary">{job.company} ({job.years})</Typography>
              <ListItemText primary={job.description} sx={{ mt: 0.5 }}/>
            </ListItem>
          ))}
        </List>
      </Paper>
      
    </Container>
    <Footer />
    </Box>
  );
}

export default Main;