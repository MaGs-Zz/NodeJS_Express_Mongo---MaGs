import React, { useState, useEffect } from 'react';
import { Container, Grid, Card, CardContent, CardMedia, Typography,
Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField,
Snackbar, Alert } from '@mui/material';

const Home = () => {
    const [cursos, setCursos] = useState([]);
    const [selectedCurso, setSelectedCurso] = useState(null);
    const [openModal, setOpenModal] = useState(false);
    const [formValues, setFormValues] = useState({
      nombre: '',
      email: '',
      password: ''
    });
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
  
    useEffect(() => {
      fetchCursos();
    }, []);
  
    const fetchCursos = async () => {
      try {
        const response = await fetch('https://localhost:3000/api/cursos');
        if (!response.ok) throw new Error('Error al obtener cursos');
        const data = await response.json();
        setCursos(data);
      } catch (error) {
        console.error('Error al obtener cursos:', error);
        setErrorMessage('Error al obtener cursos');
        setOpenSnackbar(true);
      }
    };
    
  
    const handleImageError = (e) => {
      e.target.src = 'https://via.placeholder.com/150'; // Imagen por defecto
    };
  
    const handleCardClick = (curso) => {
      setSelectedCurso(curso);
      setOpenModal(true);
    };
  
    const handleCloseModal = () => {
      setOpenModal(false);
      setSelectedCurso(null);
      setFormValues({
        nombre: '',
        email: '',
        password: ''
      });
    };
  
    const handleInputChange = (e) => {
      setFormValues({
        ...formValues,
        [e.target.name]: e.target.value,
      });
    };
  
    const handleRegisterAndEnroll = async () => {
      try {
        const createUserResponse = await fetch('/api/usuarios', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formValues),
        });
  
        if (createUserResponse.status !== 409 && !createUserResponse.ok) {
          const errorData = await createUserResponse.json();
          throw new Error(errorData.error || 'Error al registrar usuario');
        }
  
        const email = formValues.email;
  
        const enrollResponse = await fetch(`/api/usuarios/${email}/cursos`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ cursos: [selectedCurso._id] }),
        });
  
        if (!enrollResponse.ok) {
          const errorData = await enrollResponse.json();
          throw new Error(errorData.error || 'Error al inscribir en el curso');
        }
  
        setOpenSnackbar(true);
        setErrorMessage('Usuario registrado e inscrito en el curso con éxito');
        handleCloseModal();
      } catch (error) {
        console.error('Error al registrar o inscribir usuario:', error);
        setErrorMessage(error.message);
        setOpenSnackbar(true);
      }
    };
  
    const handleCloseSnackbar = () => {
      setOpenSnackbar(false);
      setErrorMessage('');
    };
  
    return (
      <Container>
        <Grid container spacing={3}>
          {cursos.map((curso) => (
            <Grid item xs={12} sm={6} md={4} key={curso.id}>
              <Card onClick={() => handleCardClick(curso)}>
                <CardMedia
                  component="img"
                  height="140"
                  image={curso.imagen}
                  alt={curso.titulo}
                  onError={handleImageError}
                  style={{ borderRadius: '50%', width: 140 }}
                />
                <CardContent>
                  <Typography variant="h6" component="div">
                    {curso.titulo}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    {curso.descripcion}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
  
        <Dialog
          open={openModal}
          onClose={handleCloseModal}
          aria-labelledby="dialog-title"
          aria-describedby="dialog-description"
        >
          <DialogTitle id="dialog-title">Registro e Inscripción</DialogTitle>
          <DialogContent>
            <Typography variant="h6">{selectedCurso?.titulo}</Typography>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Nombre"
              type="text"
              fullWidth
              value={formValues.nombre}
              onChange={handleInputChange}
            />
            {/* ... otros campos del formulario ... */}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseModal} color="primary">
              Cancelar
            </Button>
            <Button onClick={handleRegisterAndEnroll} color="primary">
              Registrarse e Inscribirse
            </Button>
          </DialogActions>
        </Dialog>
  
        <Snackbar
          open={openSnackbar}
          onClose={handleCloseSnackbar}
          message={errorMessage}
        />
      </Container>
    );
  };
  
  export default Home;
  