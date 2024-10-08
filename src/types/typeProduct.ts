enum status {
  REVISION_INICIAL,
  ACEPTADO,
  DENEGADO,
  REQUIERE_CAMBIOS,
  CAMBIOS_REALIZADOS,
}

export type Product = {
  id: number;
  category?: string;
  name: string;
  short_description: string;
  large_description: string;
  email?: string;
  phoneNumber?: number;
  facebook?: string;
  instagram?: string;
  city: string;
  province?: string;
  country?: string;
  imageURLs: string[];
  status?: status;
  deleted?: boolean;
  feedback?: string;
};
