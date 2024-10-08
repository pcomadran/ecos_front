import { useEffect, useState } from "react";
import {
  getAllCategories,
  getAllCountries,
  getAllProvinces,
  getProductById,
  updateProduct,
} from "../services/callsApi";
import { useParams } from "react-router-dom";
import FileUploadOutlinedIcon from "@mui/icons-material/FileUploadOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import { Category, Country, Province, Supplier } from "../types/typesSupplier";
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
import { Controller, SubmitHandler, useForm } from "react-hook-form";

export default function UpdateProductPage() {
  const [product, setProduct] = useState<any>({
    category: { id: 0, name: "" },
    city: "",
    country: { id: 0, name: "" },
    email: "",
    facebook: "",
    files: [],
    instagram: "",
    longDescription: "",
    name: "",
    phoneNumber: "",
    province: { id: 0, name: "" },
    shortDescription: "",
  });
  const [count, setCount] = useState<number>(product.shortDescription?.length);
  const [countD, setCountD] = useState<number>(product.longDescription?.length);
  const [success, setSuccess] = useState<boolean | null>(null);
  const [files, setFiles] = useState<File[]>([]);
  const [images, setImages] = useState<string[]>(product?.imagesURLs);
  const [fileErrors, setFileErrors] = useState<{
    sizeError?: boolean;
    countError?: boolean;
  }>({});
  const [URLsDelete, setURLsDelete] = useState<string[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [countries, setCountries] = useState<Country[]>([]);
  const [provinces, setProvinces] = useState<Province[]>([]);
  const {
    register,
    setValue,
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm<any>({
    defaultValues: {
      categoryId: product.category?.id,
      name: product.name,
      shortDescription: product.shortDescription,
      longDescription: product.longDescription,
      email: product.email,
      phoneNumber: product.phoneNumber,
      facebook: product.facebook,
      instagram: product.instagram,
      city: product.city,
      provinceId: product.province?.id,
      countryId: product.country?.id,
      files: product?.files,
      URLsToDelete: [],
    },
  });
  const { id } = useParams();

  useEffect(() => {
    async function fetchInitialData() {
      if (id) {
        const productApi = await getProductById(parseInt(id));
        setProduct(productApi);
        setValue("categoryId", productApi.category?.id);
        setValue("name", productApi?.name);
        setValue("shortDescription", productApi?.shortDescription);
        setValue("longDescription", productApi?.longDescription);
        setValue("email", productApi?.email);
        setValue("phoneNumber", productApi?.phoneNumber);
        setValue("facebook", productApi.facebook);
        setValue("instagram", productApi.instagram);
        setValue("city", productApi?.city);
        setValue("countryId", productApi.country?.id);
        setValue("files", productApi?.imagesURLs);
        setImages(productApi?.imagesURLs);
        setCount(productApi?.shortDescription?.length);
        setCount(productApi?.longDescription?.length);
      }
      const categoriesData = await getAllCategories();
      const countriesData = await getAllCountries();
      setCategories(categoriesData);
      setCountries(countriesData);
    }
    fetchInitialData();
  }, [id, setValue]);

  useEffect(() => {
    async function fetchProvinces() {
      const provincesData = await getAllProvinces(product.country?.id);
      setProvinces(provincesData);
      setValue("provinceId", product.province?.id);
    }
    fetchProvinces();
  }, [countries]);

  // const handleCount = (event: React.ChangeEvent<HTMLTextAreaElement>): void => {
  //   const word: string = event.target.value;
  //   setCount(word.length);
  // };

  const handleCount = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>): void => {
    const word: string = event.target.value;
    setCount(word.length);
  };

  // const handleCountD = (
  //   event: React.ChangeEvent<HTMLTextAreaElement>
  // ): void => {
  //   const word: string = event.target.value;
  //   setCountD(word.length);
  // };

  const handleCountD = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>): void => {
    const word: string = event.target.value;
    setCountD(word.length);
  };

  const handleProvinces = async (
    event: React.ChangeEvent<HTMLInputElement>
  ): Promise<void> => {
    const selectedCountryId = parseInt(event.target.value, 10);
    setValue("countryId", selectedCountryId);
    if (selectedCountryId) {
      const provincesData = await getAllProvinces(selectedCountryId);
      setProvinces(provincesData);
    }
  };
  const handlePhotos = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const selectedFiles: File[] = Array.from(event.target.files || []);
    let sizeError: boolean = false;
    let countError: boolean = false;
    const newFiles: File[] = [...files, ...selectedFiles];

    if (files.length > 3) {
      countError = true;
      newFiles.splice(3);
    }

    newFiles.forEach((file) => {
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
      setFiles(newFiles);
      setValue("files", newFiles, { shouldValidate: true });
    }
  };
  const handleDelete = (image: any, index: number): void => {
    if (typeof image === "string") {
      const newImages: string[] = images.filter((_, i) => i !== index);
      setImages(newImages);
      const newURLsDelete = [...URLsDelete, image];
      setURLsDelete(newURLsDelete);
      setValue("URLsToDelete", newURLsDelete);
    } else {
      const newFiles = files.filter((_, i) => i !== index - images.length);
      setFiles(newFiles);
    }
  };
  const handleEdit = (
    event: React.ChangeEvent<HTMLInputElement>,
    index: number
  ): void => {
    const file: File | null = event.target.files ? event.target.files[0] : null;
    if (file) {
      if (file.size > 3 * 1024 * 1024) {
        setFileErrors({ sizeError: true });
      }
      if (index < images.length) {
        const newImages = images.filter((_, i) => i !== index);
        setImages(newImages);
        setURLsDelete([...URLsDelete, images[index]]);
        setValue("URLsToDelete", [...URLsDelete, images[index]]);
        const newFiles = [...files, file];
        setFiles(newFiles);
        setValue("files", newFiles);
      } else {
        const newFiles = [...files];
        newFiles[index - images.length] = file;
        setFiles(newFiles);
        setValue("files", newFiles);
      }
    }
  };

  const handleSuccess = (): void => {
    setSuccess(null);
  };

  const isSubmit: SubmitHandler<any> = async (data): Promise<void> => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("shortDescription", data.shortDescription);
    formData.append("categoryId", String(data.categoryId));
    formData.append("email", data.email);
    formData.append("phoneNumber", String(data.phoneNumber));
    formData.append("instagram", String(data.instagram));
    formData.append("facebook", String(data.facebook));
    formData.append("countryId", String(data.countryId));
    formData.append("provinceId", String(data.provinceId));
    formData.append("city", data.city);
    formData.append("longDescription", String(data.longDescription));
    if (URLsDelete.length > 0) {
      formData.append("URLsToDelete", JSON.stringify(URLsDelete));
    }
    if (files.length > 0) {
      Array.from(files).forEach((file) => {
        formData.append("files", file);
      });
    }

    try {
      await updateProduct(formData, product?.id);
      setSuccess(true);
    } catch (error) {
      setSuccess(false);
    }
  };

  const onError = () => {
    setSuccess(false);
  };

  const categoryId = watch("categoryId");
  const countryId = watch("countryId");
  const provinceId = watch("provinceId");
  return (
    <Box
      sx={{ marginTop: "100px", padding: "0px 15px 60px", textAlign: "center" }}
    >
      <Typography variant="h4" sx={{ fontSize: "25px", fontWeight: "600" }}>
        Edición de Producto/Servicio
      </Typography>
      <Typography
        sx={{
          fontSize: "20px",
          fontWeight: "500",
          marginTop: "25px",
          padding: "0 20px",
        }}
      >
        Editá el formulario de carga de tu Producto/Servicio
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
        <Controller
          name="name"
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
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
              <InputLabel required>Nombre de la organización</InputLabel>
              <OutlinedInput {...field} label="Nombre de la organización" />
              <FormHelperText sx={{ color: "#222222" }}>
                Se visualizará en el título de la publicación
              </FormHelperText>
            </FormControl>
          )}
        />

        <Controller
          name="shortDescription"
          control={control}
          rules={{ required: true, maxLength: 50 }}
          render={({ field }) => (
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
                {...field}
                label="Breve descripción del Producto/Servicio"
                onChange={(e) => {
                  field.onChange(e);
                  handleCount(e);
                }}
              />
              <FormHelperText sx={{ color: "#222222" }}>
                Se visualizará en el subtítulo de la publicación {count}/50
              </FormHelperText>
            </FormControl>
          )}
        />
        <TextField
          {...register("categoryId", { required: true })}
          error={!!errors.categoryId}
          select
          label="Categoría"
          value={categoryId || ""}
          onChange={(e) => setValue("categoryId", e.target.value)}
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
        <Controller
          name="email"
          control={control}
          rules={{
            required: true,
            pattern: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g,
          }}
          render={({ field }) => (
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
              <OutlinedInput {...field} label="Correo Electrónico" />
              <FormHelperText sx={{ color: "#222222" }}>
                El mismo con el que te registraste o uno diferente
              </FormHelperText>
            </FormControl>
          )}
        />
        <Controller
          name="phoneNumber"
          control={control}
          rules={{ required: true, pattern: /^\+\d+$/ }}
          render={({ field }) => (
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
              <OutlinedInput {...field} label="Teléfono o Whatsapp" />
              <FormHelperText sx={{ color: "#222222" }}>
                Con el siguiente formato +54 9 261 002 002
              </FormHelperText>
            </FormControl>
          )}
        />
        <Controller
          name="instagram"
          control={control}
          rules={{
            pattern: /^https?:\/\/(www\.)?instagram\.com\/[a-zA-Z0-9._-]+\/?$/,
          }}
          render={({ field }) => (
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
              <OutlinedInput {...field} label="Instagram" />
              <FormHelperText sx={{ color: "#222222" }}>
                Podés pegar el link de tu perfil
              </FormHelperText>
            </FormControl>
          )}
        />
        <Controller
          name="facebook"
          control={control}
          rules={{
            pattern: /^https?:\/\/(www\.)?facebook\.com\/[a-zA-Z0-9.]+\/?$/,
          }}
          render={({ field }) => (
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
              <OutlinedInput {...field} label="Facebook" />
              <FormHelperText sx={{ color: "#222222" }}>
                Podés pegar el link de tu perfil
              </FormHelperText>
            </FormControl>
          )}
        />
        <TextField
          {...register("countryId", { required: true })}
          error={errors.country ? true : false}
          select
          label="País*"
          helperText="Seleccioná un país de la lista"
          value={countryId || ""}
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
          {...register("provinceId", { required: true })}
          error={errors.province ? true : false}
          select
          label="Provincia/Estado*"
          value={provinceId || ""}
          onChange={(e) => setValue("provinceId", e.target.value)}
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
            <MenuItem key={option.id} value={option?.id}>
              {option.name}
            </MenuItem>
          ))}
        </TextField>
        <Controller
          name="city"
          control={control}
          rules={{ required: true, pattern: /^[a-zA-ZÀ-ÿ\s'-]+$/ }}
          render={({ field }) => (
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
              <OutlinedInput {...field} label="Ciudad*" />
              <FormHelperText sx={{ color: "#222222" }}>
                Sin abreviaturas, nombre completo
              </FormHelperText>
            </FormControl>
          )}
        />
        <Controller
          name="longDescription"
          rules={{ maxLength: 300 }}
          control={control}
          render={({ field }) => (
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
                {...field}
                label="Descripción del Producto/Servicio"
                onChange={(e) => {
                  field.onChange(e);
                  handleCountD(e);
                }}
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
          )}
        />
        {images?.length + files?.length > 0 && (
          <Box sx={{ display: "flex", gap: "10px", margin: "15px 0" }}>
            {images.concat(files).map((image, index) => (
              <Box key={index} sx={{ position: "relative" }}>
                <img
                  src={
                    typeof image === "string"
                      ? image
                      : URL.createObjectURL(image)
                  }
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
                    onClick={() => handleDelete(image, index)}
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
        {images?.length + files?.length < 3 && (
          <FormControl
            sx={{
              textAlign: "left",
              marginLeft: "auto",
              marginBottom: "20px",
            }}
            error={errors.files ? true : false}
          >
            <Controller
              name="files"
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
              sx={{ color: errors.files ? "red" : "inherit" }}
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
                  Cambios guardados con éxito
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
                  Lo sentimos, los cambios no se pudieron cambiar.
                </Typography>
                <Typography alignSelf={"flex-start"} paddingLeft={"10px"}>
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
