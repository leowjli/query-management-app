export interface FormData {
  id: string;
  question: string;
  answer: string;
  queries: Query[];
}

export interface Query {
  id: string;
  title: string;
  description?: string;
  status: 'OPEN' | 'RESOLVED';
  createdAt: string;
  updatedAt: string;
  formDataId: string;
}

export interface FormDataResponse {
  total: number;
  data: {
    formData: FormData[];
  };
} 