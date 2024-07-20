import {
  Box,
  Button,
  createTheme,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  Typography,
} from "@mui/material";
import FileUploadOutlinedIcon from "@mui/icons-material/FileUploadOutlined";
import { useForm } from "react-hook-form";

const categories = [
  "Bienestar",
  "Capacitaciones",
  "Construcción",
  "Cultivos",
  "Gastronomía",
  "Indumentaria",
  "Merchandising",
  "Muebles/Deco",
  "Reciclaje",
  "Tecnología",
  "Transporte",
];

const countries = [
  { name: "Argentina" },
  { name: "Bolivia" },
  { name: "Brazil" },
  { name: "Chile" },
  { name: "Colombia" },
  { name: "Ecuador" },
  { name: "Paraguay" },
  { name: "Perú" },
];

const theme = createTheme({
  components: {
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          "& fieldset": {
            borderColor: "#222222",
          },
          "&.Mui-focused fieldset": {
            borderColor: "#222222",
          },
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: "#222222",
          "&.MuiFormLabel-filled": {
            color: "#4E169D",
          },
          "&.Mui-focused": {
            color: "#4E169D",
          },
        },
      },
    },
  },
});

export default function CreateProductPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const isSubmit = (data: any) => console.log(data);

  return (
    <Box sx={{ marginTop: "56px" }}>
      <Typography variant="h4" sx={{ fontSize: "25px", fontWeight: "600" }}>
        Carga de Producto/Servicio
      </Typography>
      <Typography sx={{ fontSize: "20px", fontWeight: "500" }}>
        Completá el formulario para subir tu Producto/Servicio{" "}
      </Typography>
      <form onSubmit={handleSubmit(isSubmit)}>
        <FormControl
          sx={{
            marginTop: "10px",
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: "#222222",
              },
              "&.Mui-focused fieldset": {
                borderColor: "#222222",
              },
            },
            "& .MuiInputLabel-root": {
              color: "#222222",
            },
            "& .MuiInputLabel-root.MuiFormLabel-filled": {
              color: "#4E169D",
            },
          }}
          variant="outlined"
        >
          <InputLabel required>Nombre de la organizacion</InputLabel>
          <OutlinedInput
            {...register("name")}
            label="Nombre de la organizacion"
          />
          <FormHelperText>
            Se visualizará en el título de la publicación
          </FormHelperText>
        </FormControl>
        <FormControl
          sx={{
            marginTop: "10px",
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: "#222222",
              },
              "&.Mui-focused fieldset": {
                borderColor: "#222222",
              },
            },
            "& .MuiInputLabel-root": {
              color: "#222222",
            },
            "& .MuiInputLabel-root.MuiFormLabel-filled": {
              color: "#4E169D",
            },
          }}
          variant="outlined"
        >
          <InputLabel required>
            Breve descripción del Producto/Servicio
          </InputLabel>
          <OutlinedInput
            {...register("short_description")}
            label="Breve descripción del Producto/Servicio"
          />
          <FormHelperText>
            Se visualizará en el subtítulo de la publicación 0/50{" "}
          </FormHelperText>
        </FormControl>
        <FormControl sx={{ width: "100%" }}>
          <InputLabel>Categoría*</InputLabel>
          <Select {...register("category")} fullWidth defaultValue="">
            {categories.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl
          sx={{
            marginTop: "10px",
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: "#222222",
              },
              "&.Mui-focused fieldset": {
                borderColor: "#222222",
              },
            },
            "& .MuiInputLabel-root": {
              color: "#222222",
            },
            "& .MuiInputLabel-root.MuiFormLabel-filled": {
              color: "#4E169D",
            },
          }}
          variant="outlined"
        >
          <InputLabel required>Correo Electrónico</InputLabel>
          <OutlinedInput {...register("email")} label="Correo Electrónico" />
          <FormHelperText>
            El mismo con el que te registraste o uno diferente
          </FormHelperText>
        </FormControl>
        <FormControl
          sx={{
            marginTop: "10px",
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: "#222222",
              },
              "&.Mui-focused fieldset": {
                borderColor: "#222222",
              },
            },
            "& .MuiInputLabel-root": {
              color: "#222222",
            },
            "& .MuiInputLabel-root.MuiFormLabel-filled": {
              color: "#4E169D",
            },
          }}
          variant="outlined"
        >
          <InputLabel required>Teléfono o Whatsapp</InputLabel>
          <OutlinedInput
            {...register("phoneNumber")}
            label="Teléfono o Whatsapp"
          />
          <FormHelperText>
            Con el siguiente formato +54 9 261 002 002
          </FormHelperText>
        </FormControl>
        <FormControl
          sx={{
            marginTop: "10px",
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: "#222222",
              },
              "&.Mui-focused fieldset": {
                borderColor: "#222222",
              },
            },
            "& .MuiInputLabel-root": {
              color: "#222222",
            },
            "& .MuiInputLabel-root.MuiFormLabel-filled": {
              color: "#4E169D",
            },
          }}
          variant="outlined"
        >
          <InputLabel>Instagram</InputLabel>
          <OutlinedInput {...register("instagram")} label="Facebook" />
          <FormHelperText>Podés pegar el link de tu perfil </FormHelperText>
        </FormControl>
        <FormControl
          sx={{
            marginTop: "10px",
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: "#222222",
              },
              "&.Mui-focused fieldset": {
                borderColor: "#222222",
              },
            },
            "& .MuiInputLabel-root": {
              color: "#222222",
            },
            "& .MuiInputLabel-root.MuiFormLabel-filled": {
              color: "#4E169D",
            },
          }}
          variant="outlined"
        >
          <InputLabel>Facebook</InputLabel>
          <OutlinedInput {...register("facebook")} label="Facebook" />
          <FormHelperText>Podés pegar el link de tu perfil </FormHelperText>
        </FormControl>
        <FormControl sx={{ width: "100%" }}>
          <InputLabel>País*</InputLabel>
          <Select {...register("countries")} fullWidth defaultValue="">
            {countries.map((option, index) => (
              <MenuItem key={index} value={option.name}>
                {option.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl sx={{ width: "100%" }}>
          <InputLabel>Provincia/Estado*</InputLabel>
          <Select {...register("province")} fullWidth defaultValue="">
            {countries.map((option, index) => (
              <MenuItem key={index} value={option.name}>
                {option.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl
          sx={{
            marginTop: "10px",
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: "#222222",
              },
              "&.Mui-focused fieldset": {
                borderColor: "#222222",
              },
            },
            "& .MuiInputLabel-root": {
              color: "#222222",
            },
            "& .MuiInputLabel-root.MuiFormLabel-filled": {
              color: "#4E169D",
            },
          }}
          variant="outlined"
        >
          <InputLabel>Ciudad</InputLabel>
          <OutlinedInput {...register("city")} label="Ciudad" />
          <FormHelperText>Sin abreviaturas, nombre completo</FormHelperText>
        </FormControl>
        <FormControl
          sx={{
            marginTop: "10px",
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: "#222222",
              },
              "&.Mui-focused fieldset": {
                borderColor: "#222222",
              },
            },
            "& .MuiInputLabel-root": {
              color: "#222222",
            },
            "& .MuiInputLabel-root.MuiFormLabel-filled": {
              color: "#4E169D",
            },
          }}
          variant="outlined"
        >
          <InputLabel>Descripción del Producto/Servicio</InputLabel>
          <OutlinedInput
            {...register("large_description")}
            label="Descripción del Producto/Servicio"
          />
          <FormHelperText>Máximo 300 caracteres </FormHelperText>
        </FormControl>
        <Button
          variant="contained"
          component="label"
          sx={{
            marginTop: "10px",
            padding: "10px 16px",
            borderRadius: "100px",
            width: "152px",
            height: "40px",
            textTransform: "none",
            color: "#fafafa",
            fontWeight: "bold",
            background: "#4E169D",
            gap: "8px",
          }}
        >
          <FileUploadOutlinedIcon />
          Subir Imágen
          <input type="file" hidden accept="image/*" multiple />
        </Button>
        <Typography>*Requerida al menos una imagen</Typography>
        <Typography>Hasta 3 imágenes. </Typography>
        <Typography>Máximo 3Mb cada una</Typography>
        <Button
          type="submit"
          sx={{
            width: "100%",
            height: "40px",
            borderRadius: "100px",
            textTransform: "none",
            color: "#fafafa",
            fontWeight: "bold",
            fontSize: "16px",
            background: "#4E169D",
          }}
        >
          Cargar Producto/Servicio
        </Button>
      </form>
    </Box>
  );
}
