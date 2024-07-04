import React from 'react';
// import { useTheme } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Carrusel from './Carrusel';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

const images = [
  {
    imgPath:
      'https://images.unsplash.com/photo-1537944434965-cf4679d1a598?auto=format&fit=crop&w=400&h=250&q=60',
  },
  {
    imgPath:
      'https://images.unsplash.com/photo-1538032746644-0212e812a9e7?auto=format&fit=crop&w=400&h=250&q=60',
  },
  {
    imgPath:
      'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=400&h=250',
  },
  {
    imgPath:
      'https://images.unsplash.com/photo-1512341689857-198e7e2f3ca8?auto=format&fit=crop&w=400&h=250&q=60',
  },
];

const ImgMediaCard: React.FC = () => {
  const [showFullText, setShowFullText] = React.useState(false);

  const handleToggleText = () => {
    setShowFullText((prevShowFullText) => !prevShowFullText);
  };

  const text = `El upcycling transforma residuos en productos de mayor valor, reduciendo la basura y fomentando la creatividad. Es una práctica que beneficia al medio ambiente y a la economía local.

Utilizar materiales reciclados para crear algo nuevo no solo disminuye la cantidad de residuos, sino que también incentiva el diseño innovador. El upcycling es clave en la moda sostenible.

Además de su impacto positivo en el ambiente, el upcycling crea oportunidades de empleo en sectores creativos. Con cada producto creado, se promueve un futuro más verde y responsable.`;

  const shortText = text.split('\n\n')[0];
  const fullText = text.split('\n\n').join('\n\n');

  return (
    <Card sx={{ maxWidth: 328, backgroundColor: '#EAEAEA', borderRadius: 3 }}>
      <Typography
        gutterBottom
        variant="h5"
        component="div"
        sx={{ textAlign: 'center' }}
      >
        ¿Qué es el Upcycling?
      </Typography>
      <Carrusel images={images} />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          17/04/2023
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ whiteSpace: 'pre-line' }}
        >
          {showFullText ? fullText : shortText}
        </Typography>
      </CardContent>
      <CardActions sx={{ justifyContent: 'center' }}>
        <Button
          size="small"
          sx={{ color: '#4E169D' }}
          onClick={handleToggleText}
        >
          {showFullText ? 'Ver menos' : 'Ver más'}
        </Button>
      </CardActions>
    </Card>
  );
};

export default ImgMediaCard;
