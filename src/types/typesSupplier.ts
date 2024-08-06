export enum status {
  REVISION_INICIAL,
  ACEPTADO,
  DENEGADO,
  REQUIERE_CAMBIOS,
  CAMBIOS_REALIZADOS,
}

export type Category = {
  id: number;
  name: string;
  icon?: string;
  image?: string;
};

export type Province = {
  id: number;
  name: string;
};

export type Country = {
  id: number;
  name: string;
  province?: Province[];
};

export type Supplier = {
  id?: number;
  category?: Category;
  name: string;
  shortDescription: string;
  longDescription: string;
  email?: string;
  phoneNumber?: string;
  facebook?: string;
  instagram?: string;
  city: string;
  province?: Province;
  country?: Country;
  imagesURLs: string[];
  status?: status;
  deleted?: boolean;
  feedback?: string | null;
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
  longDescription?: string;
  files: File[];
};
