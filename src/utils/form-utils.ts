
import { FormData } from '../types/form-types';

export const validateForm = (formData: FormData) => {
  const errors: {[key: string]: string} = {};
  
  if (!formData.aceptaTerminos) {
    errors.aceptaTerminos = "Debes aceptar los términos y condiciones";
  }
  
  return { errors, isValid: Object.keys(errors).length === 0 };
};

export const prepareFormDataForSubmission = (formData: FormData, imageUrls: string[]) => {
  // Convert FormData to JSON-compatible object for webhook
  return {
    ...formData,
    fotos: formData.fotos.map((file, index) => ({
      name: file.name,
      size: file.size,
      type: file.type,
      url: imageUrls[index] || '' // Include URL for each file
    })),
    amoblado: formData.amoblado ? 'Sí' : 'No',
    aceptaTerminos: formData.aceptaTerminos ? 'Sí' : 'No'
  };
};
