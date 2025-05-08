
import { CustomFormData } from '../types/form-types';

export const validateForm = (formData: CustomFormData) => {
  const errors: {[key: string]: string} = {};
  
  if (!formData.aceptaTerminos) {
    errors.aceptaTerminos = "Debes aceptar los términos y condiciones";
  }
  
  return { errors, isValid: Object.keys(errors).length === 0 };
};

export const prepareFormDataForSubmission = (formData: CustomFormData, imageUrls: string[]) => {
  // Convert image URLs to downloadable PNG format when possible
  const processedImageUrls = imageUrls.map(url => {
    // Create a downloadable image URL format
    return {
      url: url,
      downloadUrl: url, // The original URL
      type: 'image/png',
      name: `image-${Date.now()}.png`
    };
  });

  // Convert FormData to JSON-compatible object for webhook
  return {
    ...formData,
    fotos: processedImageUrls,
    amoblado: formData.amoblado ? 'Sí' : 'No',
    aceptaTerminos: formData.aceptaTerminos ? 'Sí' : 'No'
  };
};

