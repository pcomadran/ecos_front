import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  OutlinedInput,
  TextField,
  Typography,
} from "@mui/material";
import FileUploadOutlinedIcon from "@mui/icons-material/FileUploadOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import {
  Category,
  Country,
  Province,
  SupplierForm,
} from "../types/typesSupplier";
import {
  getAllCategories,
  getAllCountries,
  getAllProvinces,
} from "../servises/callsApi";

export default function CreateProductPage() {
  const [count, setCount] = useState<number>(0);
  const [countD, setCountD] = useState<number>(0);
  const [images, setImages] = useState<File[]>([]);
  const [success, setSuccess] = useState<boolean | null>(null);
  const [fileErrors, setFileErrors] = useState<{
    sizeError?: boolean;
    countError?: boolean;
  }>({});
  const [categories, setCategories] = useState<Category[]>([]);
  const [countries, setCountries] = useState<Country[]>([]);
  const [provinces, setProvinces] = useState<Province[]>([]);
  const {
    register,
    setValue,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<SupplierForm>({
    defaultValues: {
      category: null,
      name: "",
      shortDescription: "",
      longDescription: "",
      email: "",
      phoneNumber: null,
      facebook: "",
      instagram: "",
      city: "",
      province: null,
      country: null,
      images: [],
    },
  });

  useEffect(() => {
    const fetchInitialData = async () => {
      const categoriesData = await getAllCategories();
      const countriesData = await getAllCountries();
      setCategories(categoriesData);
      setCountries(countriesData);
    };
    fetchInitialData();
  }, []);

  const handleCount = (event: React.ChangeEvent<HTMLTextAreaElement>): void => {
    const word: string = event.target.value;
    setCount(word.length);
  };

  const handleCountD = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ): void => {
    const word: string = event.target.value;
    setCountD(word.length);
  };

  const handleProvinces = async (
    event: React.ChangeEvent<HTMLInputElement>
  ): Promise<void> => {
    const countryId: number | null = parseInt(event.target.value, 10);
    if (countryId) {
      const provincesData = await getAllProvinces(countryId);
      setProvinces(provincesData);
    }
  };

  const handlePhotos = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const files: File[] = Array.from(event.target.files || []);
    let sizeError: boolean = false;
    let countError: boolean = false;
    if (files.length + images.length > 3) {
      countError = true;
      files.length = 3 - images.length;
    }

    files.forEach((file) => {
      if (file.size > 3 * 1024 * 1024) {
        sizeError = true;
      }
    });

    if (sizeError || countError) {
      setFileErrors({
        sizeError,
        countError,
      });
    } else {
      setFileErrors({});
      const totalFiles: File[] = images.concat(files);
      setImages(totalFiles);
      setValue("images", totalFiles, { shouldValidate: true });
    }
  };

  const handleDelete = (index: number): void => {
    const newImages: File[] = images.filter((_, i) => i !== index);
    setImages(newImages);
    setValue("images", newImages);
  };

  const handleEdit = (
    event: React.ChangeEvent<HTMLInputElement>,
    index: number
  ): void => {
    const file: File | null = event.target.files ? event.target.files[0] : null;
    if (file) {
      if (file.size > 3 * 1024 * 1024) {
        setFileErrors({ sizeError: true });
      } else {
        const newImages: File[] = [...images];
        newImages[index] = file;
        setImages(newImages);
        setValue("images", newImages);
      }
    }
  };

  const handleSuccess = (): void => {
    setSuccess(null);
  };

  const isSubmit: SubmitHandler<SupplierForm> = (data): void => {
    console.log(data);
    try {
      setSuccess(true);
    } catch (error) {
      setSuccess(false);
    }
  };

  const onError = () => {
    setSuccess(false);
  };

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
        onSubmit={handleSubmit(isSubmit, onError)}
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
          error={errors.shortDescription ? true : false}
        >
          <InputLabel required>
            Breve descripción del Producto/Servicio
          </InputLabel>
          <OutlinedInput
            {...register("shortDescription", {
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
            <MenuItem key={option.id} value={option.id}>
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
          error={errors.phoneNumber ? true : false}
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
          onChange={handleProvinces}
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
          {countries?.map((option) => (
            <MenuItem key={option.id} value={option.id}>
              {option.name}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          {...register("province", { required: true })}
          error={errors.province ? true : false}
          disabled={provinces.length <= 0}
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
            "& .MuiInputLabel-root.Mui-disabled": {
              color: "#bdbdbd",
            },
          }}
        >
          {provinces?.map((option) => (
            <MenuItem key={option.id} value={option.id}>
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
          error={errors.longDescription ? true : false}
        >
          <InputLabel>Descripción del Producto/Servicio</InputLabel>
          <OutlinedInput
            {...register("longDescription", { maxLength: 3 })}
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
              Máximo 300 caracteres
            </FormHelperText>
            <FormHelperText sx={{ color: "#222222" }}>
              {countD}/300
            </FormHelperText>
          </Box>
        </FormControl>
        {images.length > 0 && (
          <Box sx={{ display: "flex", gap: "10px", margin: "15px 0" }}>
            {images.map((file, index) => (
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
        {images.length < 3 && (
          <FormControl
            sx={{
              textAlign: "left",
              marginLeft: "auto",
              marginBottom: "20px",
            }}
            error={errors.images ? true : false}
          >
            <Controller
              name="images"
              control={control}
              rules={{
                required: "Debe subir al menos una imagen",
                validate: {
                  minLength: (v) =>
                    (v && v.length >= 1) || "Debe subir al menos una imagen",
                  maxLength: (v) =>
                    (v && v.length <= 3) || "No puede subir más de 3 imágenes",
                },
              }}
              render={({ field }) => (
                <input
                  type="file"
                  hidden
                  accept="image/*"
                  multiple
                  onChange={(e) => {
                    handlePhotos(e);
                    field.onChange(e);
                  }}
                  ref={field.ref}
                />
              )}
            />
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
            <Typography
              variant="caption"
              sx={{ color: errors.images ? "red" : "inherit" }}
            >
              *Requerida al menos una imagen
            </Typography>
            <Typography
              variant="caption"
              sx={{ color: fileErrors.countError ? "red" : "inherit" }}
            >
              Hasta 3 imágenes.{" "}
            </Typography>
            <Typography
              variant="caption"
              sx={{ color: fileErrors.sizeError ? "red" : "inherit" }}
            >
              Máximo 3Mb cada una
            </Typography>
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
          // disabled={!isDirty || !isValid}
        >
          Cargar Producto/Servicio
        </Button>
      </form>
      {success !== null && (
        <Box
          sx={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            zIndex: 1,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              position: "relative",
              zIndex: 2,
              width: "328px",
              height: success === true ? "152px" : "208px",
              borderRadius: "28px",
              background: "#fafafa",
              display: "flex",
              flexDirection: "column",
              gap: "10px",
              alignItems: "center",
              padding: "16px 16px 0 16px",
            }}
          >
            {success === true ? (
              <>
                <CheckCircleOutlineOutlinedIcon
                  sx={{ color: "#1D9129", width: "40px", height: "40px" }}
                />
                <Typography sx={{ fontSize: "18px" }}>
                  Producto/Servicio cargado con éxito
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "flex-end",
                    width: "100%",
                  }}
                >
                  <Button
                    sx={{
                      textTransform: "none",
                      color: "#4E169D",
                      fontSize: "600",
                    }}
                    onClick={handleSuccess}
                  >
                    Aceptar
                  </Button>
                </Box>
              </>
            ) : (
              <>
                <CancelOutlinedIcon
                  sx={{ color: "#bc1111", width: "40px", height: "40px" }}
                />
                <Typography sx={{ fontSize: "18px" }}>
                  Lo sentimos, el Producto/Servicio no pudo ser cargado.
                </Typography>
                <Typography alignSelf={"flex-start"}>
                  Por favor, volvé a intentarlo.
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    width: "100%",
                    justifyContent: "space-evenly",
                  }}
                >
                  <Button
                    sx={{
                      textTransform: "none",
                      color: "#4E169D",
                      fontSize: "600",
                    }}
                    onClick={handleSuccess}
                  >
                    Cancelar
                  </Button>
                  <Button
                    sx={{
                      textTransform: "none",
                      color: "#4E169D",
                      fontSize: "600",
                    }}
                    onClick={handleSuccess}
                  >
                    Intentar nuevamente
                  </Button>
                </Box>
              </>
            )}
          </Box>
        </Box>
      )}
    </Box>
  );
}
