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
  TextField,
  Typography,
} from "@mui/material";
import FileUploadOutlinedIcon from "@mui/icons-material/FileUploadOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { useForm } from "react-hook-form";
import { useState } from "react";

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
  const [count, setCount] = useState(0);
  const [countD, setCountD] = useState(0);
  const [imageURLs, setimageURLs] = useState([]);
  const {
    register,
    setValue,
    handleSubmit,
    watch,
    formState: { errors, isDirty, isValid },
  } = useForm({
    defaultValues: {
      category: "",
      name: "",
      short_description: "",
      large_description: "",
      email: "",
      phoneNumber: 0,
      facebook: "",
      instagram: "",
      city: "",
      province: "",
      country: "",
      imageURLs: [],
    },
  });

  console.log(errors);

  const handleCount = (event: any) => {
    const word = event.target.value;
    setCount(word.length);
  };

  const handleCountD = (event: any) => {
    const word = event.target.value;
    setCountD(word.length);
  };

  const handlePhotos = (event: any) => {
    if (imageURLs.length < 3) {
      const newFiles = Array.from(event.target.files);
      const existingFiles = watch("imageURLs") || [];
      const totalFiles = existingFiles.concat(newFiles);
      setimageURLs(totalFiles);
      setValue("imageURLs", totalFiles);
    }
  };

  const handleDelete = (index: number) => {
    const newImages = imageURLs.splice(index, 1);
    setimageURLs(newImages);
    setValue("imageURLs", newImages);
  };

  const handleEdit = (event: any, index: number) => {
    const file = event.target.files[0];
    if (file) {
      const newImages = [...imageURLs];
      newImages[index] = file;
      setimageURLs(newImages);
      setValue("imageURLs", newImages);
    }
  };

  const isSubmit = (data: any) => console.log(data);

  return (
    <Box
      sx={{ marginTop: "100px", padding: "0px 15px 60px", textAlign: "center" }}
    >
      <Typography variant="h4" sx={{ fontSize: "25px", fontWeight: "600" }}>
        Carga de Producto/Servicio
      </Typography>
      <Typography
        sx={{
          fontSize: "20px",
          fontWeight: "500",
          marginTop: "25px",
          padding: "0 20px",
        }}
      >
        Completá el formulario para subir tu Producto/Servicio
      </Typography>
      <form
        onSubmit={handleSubmit(isSubmit)}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "15px",
          marginTop: "25px",
        }}
      >
        <FormControl
          sx={{
            width: "100%",
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
            "& .MuiInputLabel-root.Mui-error": {
              color: "red",
            },
          }}
          variant="outlined"
          error={errors.name ? true : false}
        >
          <InputLabel required>Nombre de la organizacion</InputLabel>
          <OutlinedInput
            {...register("name", { required: true })}
            label="Nombre de la organizacion"
          />
          <FormHelperText sx={{ color: "#222222" }}>
            Se visualizará en el título de la publicación
          </FormHelperText>
        </FormControl>
        <FormControl
          sx={{
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
            "& .MuiInputLabel-root.Mui-error": {
              color: "red",
            },
          }}
          variant="outlined"
          error={errors.short_description ? true : false}
        >
          <InputLabel required>
            Breve descripción del Producto/Servicio
          </InputLabel>
          <OutlinedInput
            {...register("short_description", {
              required: true,
              maxLength: 50,
            })}
            label="Breve descripción del Producto/Servicio"
            onChange={handleCount}
          />
          <FormHelperText sx={{ color: "#222222" }}>
            Se visualizará en el subtítulo de la publicación {count}/50
          </FormHelperText>
        </FormControl>
        <TextField
          {...register("category", { required: true })}
          error={errors.category ? true : false}
          select
          label="Categoría"
          defaultValue=""
          helperText="Seleccioná la categoría de tu Producto/Servicio"
          sx={{
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
            "& .MuiInputLabel-root.Mui-error": {
              color: "red",
            },
            "& .MuiSelect-select": {
              textAlign: "left",
            },
            "& .MuiFormHelperText-root": {
              color: "#222222",
            },
          }}
        >
          {categories.map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </TextField>
        <FormControl
          sx={{
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
            "& .MuiInputLabel-root.Mui-error": {
              color: "red",
            },
          }}
          variant="outlined"
          error={errors.email ? true : false}
        >
          <InputLabel required>Correo Electrónico</InputLabel>
          <OutlinedInput
            {...register("email", {
              required: true,
              pattern: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g,
            })}
            label="Correo Electrónico"
          />
          <FormHelperText sx={{ color: "#222222" }}>
            El mismo con el que te registraste o uno diferente
          </FormHelperText>
        </FormControl>
        <FormControl
          sx={{
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
            "& .MuiInputLabel-root.Mui-error": {
              color: "red",
            },
          }}
          variant="outlined"
          error={errors.email ? true : false}
        >
          <InputLabel required>Teléfono o Whatsapp</InputLabel>
          <OutlinedInput
            {...register("phoneNumber", { required: true, pattern: /^\+\d+$/ })}
            label="Teléfono o Whatsapp"
          />
          <FormHelperText sx={{ color: "#222222" }}>
            Con el siguiente formato +54 9 261 002 002
          </FormHelperText>
        </FormControl>
        <FormControl
          sx={{
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
            "& .MuiInputLabel-root.Mui-error": {
              color: "red",
            },
          }}
          variant="outlined"
          error={errors.instagram ? true : false}
        >
          <InputLabel>Instagram</InputLabel>
          <OutlinedInput
            {...register("instagram", {
              pattern:
                /^https?:\/\/(www\.)?instagram\.com\/[a-zA-Z0-9._-]+\/?$/,
            })}
            label="Instagram"
          />
          <FormHelperText sx={{ color: "#222222" }}>
            Podés pegar el link de tu perfil{" "}
          </FormHelperText>
        </FormControl>
        <FormControl
          sx={{
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
            "& .MuiInputLabel-root.Mui-error": {
              color: "red",
            },
          }}
          variant="outlined"
          error={errors.facebook ? true : false}
        >
          <InputLabel>Facebook</InputLabel>
          <OutlinedInput
            {...register("facebook", {
              pattern: /^https?:\/\/(www\.)?facebook\.com\/[a-zA-Z0-9.]+\/?$/,
            })}
            label="Facebook"
          />
          <FormHelperText sx={{ color: "#222222" }}>
            Podés pegar el link de tu perfil{" "}
          </FormHelperText>
        </FormControl>
        <TextField
          {...register("country", { required: true })}
          error={errors.country ? true : false}
          select
          label="País*"
          defaultValue=""
          helperText="Seleccioná un país de la lista"
          sx={{
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
            "& .MuiInputLabel-root.Mui-error": {
              color: "red",
            },
            "& .MuiSelect-select": {
              textAlign: "left",
            },
            "& .MuiFormHelperText-root": {
              color: "#222222",
            },
          }}
        >
          {countries.map((option, index) => (
            <MenuItem key={index} value={option.name}>
              {option.name}
            </MenuItem>
          ))}
        </TextField>
        {/* <FormControl sx={{ width: "100%" }}>
          <InputLabel>País*</InputLabel>
          <Select {...register("countries")} fullWidth defaultValue="">
            {countries.map((option, index) => (
              <MenuItem key={index} value={option.name}>
                {option.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl> */}
        {/* <FormControl sx={{ width: "100%" }}>
          <InputLabel>Provincia/Estado*</InputLabel>
          <Select {...register("province")} fullWidth defaultValue="">
            {countries.map((option, index) => (
              <MenuItem key={index} value={option.name}>
                {option.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl> */}
        <TextField
          {...register("province", { required: true })}
          error={errors.province ? true : false}
          select
          label="Provincia/Estado*"
          defaultValue=""
          helperText="Seleccioná una provincia/estado de la lista"
          sx={{
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
            "& .MuiInputLabel-root.Mui-error": {
              color: "red",
            },
            "& .MuiSelect-select": {
              textAlign: "left",
            },
            "& .MuiFormHelperText-root": {
              color: "#222222",
            },
          }}
        >
          {countries.map((option, index) => (
            <MenuItem key={index} value={option.name}>
              {option.name}
            </MenuItem>
          ))}
        </TextField>
        <FormControl
          sx={{
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
            "& .MuiInputLabel-root.Mui-error": {
              color: "red",
            },
          }}
          variant="outlined"
          error={errors.city ? true : false}
        >
          <InputLabel>Ciudad*</InputLabel>
          <OutlinedInput
            {...register("city", {
              required: true,
              pattern: /^[a-zA-ZÀ-ÿ\s'-]+$/,
            })}
            label="Ciudad*"
          />
          <FormHelperText sx={{ color: "#222222" }}>
            Sin abreviaturas, nombre completo
          </FormHelperText>
        </FormControl>
        <FormControl
          sx={{
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
            "& .MuiInputLabel-root.Mui-error": {
              color: "red",
            },
          }}
          variant="outlined"
          error={errors.large_description ? true : false}
        >
          <InputLabel>Descripción del Producto/Servicio</InputLabel>
          <OutlinedInput
            {...register("large_description", { maxLength: 3 })}
            label="Descripción del Producto/Servicio"
            onChange={handleCountD}
            multiline
            rows={8}
            sx={{
              height: "192px",
              paddingTop: "30px",
              paddingRight: "35px",
              overflow: "auto",
              fontSize: "16px",
            }}
          />
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <FormHelperText sx={{ color: "#222222" }}>
              Máximo 300 caracteres{" "}
            </FormHelperText>
            <FormHelperText sx={{ color: "#222222" }}>
              {countD}/300
            </FormHelperText>
          </Box>
        </FormControl>
        {imageURLs.length > 0 && (
          <Box sx={{ display: "flex", gap: "10px", margin: "15px 0" }}>
            {imageURLs.map((file, index) => (
              <Box key={index} sx={{ position: "relative" }}>
                <img
                  src={URL.createObjectURL(file)}
                  alt={`preview ${index}`}
                  style={{
                    width: "104px",
                    height: "80px",
                    borderRadius: "4px",
                    objectFit: "cover",
                  }}
                />
                <Box
                  sx={{
                    display: "flex",
                    gap: "4px",
                    position: "absolute",
                    top: 0,
                    right: 5,
                  }}
                >
                  <Button
                    sx={{
                      borderRadius: "100px",
                      width: "24px",
                      height: "24px",
                      background: "rgba(34,34,34,0.6)",
                    }}
                  >
                    <EditOutlinedIcon
                      sx={{ width: "20px", height: "20px", color: "#fafafa" }}
                    />
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(event) => handleEdit(event, index)}
                      style={{
                        position: "absolute",
                        width: "100%",
                        height: "100%",
                        opacity: 0,
                      }}
                    />
                  </Button>
                  <Button
                    sx={{
                      borderRadius: "100px",
                      width: "24px",
                      height: "24px",
                      background: "rgba(34,34,34,0.6)",
                    }}
                    onClick={() => handleDelete(index)}
                  >
                    <DeleteOutlineOutlinedIcon
                      sx={{ width: "23px", height: "23px", color: "#fafafa" }}
                    />
                  </Button>
                </Box>
              </Box>
            ))}
          </Box>
        )}
        {imageURLs.length < 3 && (
          <FormControl
            sx={{
              textAlign: "left",
              marginLeft: "auto",
              marginBottom: "20px",
            }}
          >
            <Button
              variant="contained"
              component="label"
              sx={{
                marginTop: "10px",
                marginBottom: "5px",
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
              <input
                type="file"
                hidden
                accept="image/*"
                multiple
                onChange={handlePhotos}
              />
            </Button>
            <Typography variant="caption">
              *Requerida al menos una imagen
            </Typography>
            <Typography variant="caption">Hasta 3 imágenes. </Typography>
            <Typography variant="caption">Máximo 3Mb cada una</Typography>
          </FormControl>
        )}
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
            "&.Mui-disabled": {
              background: "#505050",
              color: "#fafafa",
              fontWeight: "400",
            },
          }}
          disabled={!isDirty || !isValid}
        >
          Cargar Producto/Servicio
        </Button>
      </form>
    </Box>
  );
}
