// /src/utils/data.ts

import axios from 'axios';

// Función para verificar el teléfono en el backend
export const loginUser = async (phoneNumber: string) => {
  try {
    // Realizamos la solicitud POST al backend para verificar el teléfono
    const response = await axios.post('https://api-celeste.onrender.com/api/verificarTelefono', { phone: phoneNumber });

    // Si el número es válido, devolver los datos del usuario
    return response.data;
  } catch (error: unknown) {
    // Verificamos si el error es una instancia de Error y si tiene la propiedad response
    if (axios.isAxiosError(error) && error.response) {
      // Si es un error de Axios y tiene una respuesta, devolver el mensaje de error
      throw new Error(error.response.data.message || 'Error al verificar el teléfono');
    } else {
      // Si no es un error de Axios o no tiene una respuesta, lanzar un error genérico
      throw new Error('Error desconocido al verificar el teléfono');
    }
  }
};
