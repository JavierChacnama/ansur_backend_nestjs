const cloudinary = require('cloudinary').v2; // Importa la biblioteca de Cloudinary
const { v4: uuidv4 } = require('uuid');
const uuid = uuidv4();

// Configura Cloudinary con tus credenciales
cloudinary.config({
  cloud_name: 'dtxamtvvz',
  api_key: '325291344878419',
  api_secret: 'pH0PE0K3XgWdhQ6S7tEvobFkUfk',
});

/**
 * Subir el archivo a Cloudinary
 * file: objeto que será almacenado en Cloudinary
 * pathImage: ruta o nombre del archivo en Cloudinary (opcional)
 */
const storage = async (file, pathImage) => {
  try {
    if (pathImage) {
      // Sube el archivo a Cloudinary
      const result = await cloudinary.uploader.upload(file.buffer, {
        public_id: pathImage, // Nombre del archivo en Cloudinary (opcional)
        folder: 'cloudinary_img', // Opcional: puedes organizar tus archivos en carpetas
        resource_type: 'image', // Tipo de recurso (imagen, video, etc.)
        overwrite: true, // Si deseas sobrescribir archivos existentes con el mismo nombre
        // Otras opciones como el formato, tamaño, etc., pueden configurarse aquí
      });

      // Devuelve la URL pública del archivo subido
      return result.secure_url;
    } else {
      throw new Error('Debe proporcionar un valor para pathImage');
    }
  } catch (error) {
    console.error('Error al subir archivo a Cloudinary:', error);
    throw new Error('Algo salió mal. No se pudo cargar el archivo en este momento.');
  }
};

module.exports = storage;
