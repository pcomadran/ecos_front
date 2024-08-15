import React, { useEffect, useState } from 'react';
import { Box, Button, Container, IconButton, TextField, Typography } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { createPublication, updatePublication, getPublicationById } from '../servises/callsApi';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const MAX_IMAGES = 3;

const PublicationForm: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id?: string }>();
  const [isEditMode, setIsEditMode] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [files, setFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const [charCount, setCharCount] = useState(0);

  useEffect(() => {
    if (id) {
      setIsEditMode(true);
      loadPublicationData(id);
    }
  }, [id]);

  const loadPublicationData = async (publicationId: string) => {
    try {
      const publication = await getPublicationById(parseInt(publicationId));
      setTitle(publication.title);
      setDescription(publication.description);
      setCharCount(publication.description.length);
      // Aquí podrías agregar la lógica para mostrar las previsualizaciones si hay imágenes cargadas
    } catch (error) {
      console.error('Error loading publication data:', error);
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const selectedFiles = Array.from(event.target.files);
      const newFiles = files.concat(selectedFiles).slice(0, MAX_IMAGES);

      setFiles(newFiles);

      const imagePreviews = newFiles.map((file) => URL.createObjectURL(file));
      setPreviews(imagePreviews);
    }
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    files.forEach((file) => formData.append('files', file));

    try {
      if (isEditMode && id) {
        await updatePublication(formData, parseInt(id));
        navigate(`/publications/menu`);
      } else {
        await createPublication(formData);
        navigate('/publications/menu');
      }
    } catch (error) {
      console.error(isEditMode ? 'Error updating publication:' : 'Error creating publication:', error);
    }
  };

  return (
    <Container sx={{paddingTop: "65px"}}>
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '16px',
      }}
    >
      <Typography variant="h4" gutterBottom>
        {isEditMode ? 'Guardar cambios' : 'Crear publicación'}
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        {isEditMode
          ? 'Modificá los datos para actualizar la publicación'
          : 'Completá los datos para crear una nueva publicación'}
      </Typography>
      <TextField
        label="Título*"
        variant="outlined"
        fullWidth
        margin="normal"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <Typography variant="body2" color="textSecondary">
        Se visualizará en el título de la publicación
      </Typography>
      <TextField
        label="Ingresá el contenido de la publicación*"
        variant="outlined"
        fullWidth
        margin="normal"
        multiline
        rows={6}
        value={description}
        onChange={(e) => {
          setDescription(e.target.value);
          setCharCount(e.target.value.length);
        }}
        helperText={`${charCount}/2000`}
        inputProps={{ maxLength: 2000 }}
      />

      {/* Previsualización de imágenes */}
      <Box sx={{ display: 'flex', gap: '16px', marginTop: '16px', flexDirection: 'column' }}>
        {previews.map((preview, index) => (
          <Box key={index} sx={{ position: 'relative', display: 'inline-block' }}>
            <img
              src={preview}
              alt={`preview-${index}`}
              style={{
                width: '100%',
                maxHeight: '200px',
                objectFit: 'cover',
                borderRadius: '8px',
              }}
            />
            <Box
              sx={{
                position: 'absolute',
                top: 0,
                right: 0,
                display: 'flex',
                gap: '4px',
                padding: '4px',
              }}
            >
              <IconButton size="small" sx={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
                <EditIcon sx={{ color: '#FAFAFA' }} />
              </IconButton>
              <IconButton size="small" sx={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
                <DeleteIcon sx={{ color: '#FAFAFA' }} />
              </IconButton>
            </Box>
          </Box>
        ))}
      </Box>

      {files.length < MAX_IMAGES && (
        <Box sx={{ marginTop: '16px', textAlign: 'center' }}>
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleFileChange}
            style={{ display: 'none' }}
            id="upload-button"
          />
          <label htmlFor="upload-button">
            <Button
              variant="contained"
              component="span"
              sx={{
                backgroundColor: '#4E169D',
                color: '#FAFAFA',
                textTransform: 'none',
                borderRadius: '100px',
                '&:hover': {
                  backgroundColor: '#4E169D',
                },
                '&:active': {
                  backgroundColor: '#4E169D',
                },
              }}
            >
              Subir imagen
            </Button>
          </label>
          <Typography variant="body2" color="textSecondary">
            *Requerida al menos una imagen
            <br />
            Hasta 3 imágenes. Máximo 3Mb cada una
          </Typography>
        </Box>
      )}

      <Box sx={{ marginTop: '16px', textAlign: 'center' }}>
        <Button
          variant="contained"
          onClick={handleSubmit}
          sx={{
            backgroundColor: '#4E169D',
            color: '#FAFAFA',
            textTransform: 'none',
            borderRadius: '100px',
            '&:hover': {
              backgroundColor: '#4E169D',
            },
            '&:active': {
              backgroundColor: '#4E169D',
            },
          }}
        >
          {isEditMode ? 'Guardar cambios' : 'Crear publicación'}
        </Button>
      </Box>
    </Box>
    </Container>
  );
};

export default PublicationForm;
