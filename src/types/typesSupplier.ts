enum status {
  REVISION_INICIAL,
  ACEPTADO,
  DENEGADO,
  REQUIERE_CAMBIOS,
  CAMBIOS_REALIZADOS,
}

export type Supplier = {
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
  imageUrls: string[];
  status?: status;
  deleted?: boolean;
  feedback?: string;
};
