import React, { useEffect, useState } from 'react';
import { Box, Button, Container, IconButton, TextField, Typography } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { createPublication, updatePublication, getPublicationByIdWithoutViews } from '../services/callsApi';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';

const MAX_IMAGES = 3;
const MAX_IMAGE_SIZE_MB = 3;

const PublicationForm: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id?: string }>();
  const [isEditMode, setIsEditMode] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [files, setFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const [charCount, setCharCount] = useState(0);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [urlsToDelete, setUrlsToDelete] = useState<string[]>([]);

  useEffect(() => {
    const loadPublicationData = async (publicationId: string) => {
      try {
        const publication = await getPublicationByIdWithoutViews(parseInt(publicationId));
        setTitle(publication.title);
        setDescription(publication.description);
        setCharCount(publication.description.length);
        setPreviews(publication.imagesURLs);
      } catch (error) {
        console.error('Error loading publication data:', error);
      }
    };
    if (id) {
      setIsEditMode(true);
      loadPublicationData(id);
    }
  }, [id]);

  useEffect(() => {
    const hasRequiredFields = title.trim() !== '' && description.trim() !== '' && (files.length > 0 || previews.length > 0);
    setIsButtonDisabled(!hasRequiredFields);
  }, [title, description, files, previews]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>, indexToReplace?: number) => {
    if (event.target.files) {
      const selectedFiles = Array.from(event.target.files);
      const validFiles = selectedFiles.filter(file => file.size <= MAX_IMAGE_SIZE_MB * 1024 * 1024);

      if (indexToReplace !== undefined) {
        if (isEditMode && previews[indexToReplace]) {
          setUrlsToDelete(prev => [...prev, previews[indexToReplace]]);
        }
        const newFiles = [...files];
        newFiles.splice(indexToReplace, 1, validFiles[0]);
        setFiles(newFiles);

        const newPreviews = [...previews];
        newPreviews[indexToReplace] = URL.createObjectURL(validFiles[0]);
        setPreviews(newPreviews);
      } else {
        const newFiles = [...files, ...validFiles].slice(0, MAX_IMAGES);
        setFiles(newFiles);

        const newPreviews = [...previews, ...validFiles.map(file => URL.createObjectURL(file))].slice(0, MAX_IMAGES);
        setPreviews(newPreviews);
      }

      event.target.value = '';
    }
  };

  const handleDeleteImage = (index: number) => {
    if (isEditMode && previews[index]) {
      setUrlsToDelete(prev => [...prev, previews[index]]);
    }
    const newPreviews = previews.filter((_, i) => i !== index);
    const newFiles = files.filter((_, i) => i !== index);

    setPreviews(newPreviews);
    setFiles(newFiles);
  };

  const token = localStorage.getItem("authToken")
  console.log(token)

  const handleSubmit = async () => {
    setIsSubmitting(true);

    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    files.forEach((file) => formData.append('files', file));

    if (isEditMode) {
      urlsToDelete.forEach((url) => formData.append('urlsToDelete', url));
    }

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
    } finally {
      setIsSubmitting(false);
    }
  };

  const shouldHideUploadButtonAndText = previews.length >= MAX_IMAGES;

  return (
    <Container sx={{ paddingTop: '65px' }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '16px' }}>
        <Typography sx={{ width: "328px", color: '#222222', fontSize: "28px", fontWeight: 600, lineHeight: "35px", textAlign: "center" }}>
          {isEditMode ? 'Edición de publicación' : 'Carga de publicación'}
        </Typography>
        <Typography sx={{ marginTop: "32px", width: "328px", color: '#222222', fontSize: "20px", fontWeight: 600, lineHeight: "30px", textAlign: "center" }}>
          {isEditMode ? 'Modificá los datos de la publicación' : 'Completá los datos para crear una nueva publicación'}
        </Typography>
        <TextField
          label="Título*"
          variant="outlined"
          fullWidth
          margin="normal"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          helperText={title ? '' : 'Se visualizará en el título de la publicación'}
          FormHelperTextProps={{ sx: { color: '#222222' } }}
          sx={{
            marginTop: "32px",
            width: '328px',
            '& label': { color: '#222222' },
            '& label.MuiInputLabel-shrink': { color: '#4E169D' },
          }}
        />
        <TextField
          label={description ? 'Contenido de la publicación*' : 'Ingresá el contenido de la publicación*'}
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
          FormHelperTextProps={{ sx: { color: '#222222', textAlign: 'right' } }}
          sx={{
            width: '328px',
            marginTop: "16px",
            '& label': { color: '#222222' },
            '& label.MuiInputLabel-shrink': { color: '#4E169D' },
          }}
        />
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
              <Box sx={{ position: 'absolute', top: 0, right: 0, display: 'flex', gap: '4px', padding: '4px' }}>
                <IconButton
                  size="small"
                  sx={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
                  onClick={() => {
                    const input = document.createElement('input');
                    input.type = 'file';
                    input.accept = 'image/*';
                    input.onchange = (e: any) => handleFileChange(e, index);
                    input.click();
                  }}
                >
                  <EditIcon sx={{ color: '#FAFAFA' }} />
                </IconButton>
                <IconButton
                  size="small"
                  sx={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
                  onClick={() => handleDeleteImage(index)}
                >
                  <DeleteIcon sx={{ color: '#FAFAFA' }} />
                </IconButton>
              </Box>
            </Box>
          ))}
        </Box>
        {!shouldHideUploadButtonAndText && (
          <Box sx={{ width: "328px", display: "flex", justifyContent: "flex-end" }}>
            <Box sx={{ marginTop: '16px', textAlign: 'left' }}>
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={(e) => handleFileChange(e)}
                style={{ display: 'none' }}
                id="upload-button"
              />
              <label htmlFor="upload-button">
                <Button
                  variant="contained"
                  component="span"
                  startIcon={<FileUploadOutlinedIcon />}
                  sx={{
                    width: "152px",
                    height: "40px",
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
              <Typography sx={{ fontSize: "12px", fontWeight: 400, color: "#222222" }}>
                *Requerida al menos una imagen.
                <br />
                Hasta 3 imágenes.
                <br />
                Máximo 3Mb cada una.
              </Typography>
            </Box>
          </Box>
        )}
        <Box sx={{ marginTop: '40px', textAlign: 'center' }}>
          <Button
            variant="contained"
            onClick={handleSubmit}
            disabled={isButtonDisabled || isSubmitting}
            sx={{
              width: "328px",
              height: "40px",
              backgroundColor: isButtonDisabled || isSubmitting ? '#505050 !important' : '#4E169D',
              color: '#FAFAFA !important',
              textTransform: 'none',
              borderRadius: '100px',
              '&:hover': {
                backgroundColor: isButtonDisabled || isSubmitting ? '#505050 !important' : '#4E169D',
              },
              '&:active': {
                backgroundColor: isButtonDisabled || isSubmitting ? '#505050 !important' : '#4E169D',
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
