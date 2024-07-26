export enum status {
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

export type Country = {
  id: number;
  name: string;
  provinces: [];
};

export type SupplierForm = {
  name: string;
  shortDescription: string;
  category: number | null;
  email: string;
  phoneNumber: number | null;
  instagram?: string;
  facebook?: string;
  country: number | null;
  province: number | null;
  city: string;
  longDescription: string;
  images: File[];
};
