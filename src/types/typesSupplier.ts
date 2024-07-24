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
  imageURLs: string[];
  status?: status;
  deleted?: boolean;
  feedback?: string;
};

export type SupplierForm = {
  name: string;
  shortDescription: string;
  category: number;
  email: string;
  phoneNumber: number;
  instagram?: string;
  facebook?: string;
  country: number;
  province: number;
  city: string;
  longDescription: string;
  images: File[];
};
