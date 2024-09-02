require('dotenv').config();
const { Storage } = require('@google-cloud/storage');
const { format } = require('util');
const env = require('../config/env');
const url = require('url');
const { v4: uuidv4 } = require('uuid');
const uuid = uuidv4();

const storage = new Storage({
    projectId: process.env.GCLOUD_PROJECT_ID,
    keyFilename: process.env.GCLOUD_KEYFILE_PATH,
});

const bucket = storage.bucket(process.env.GCLOUD_BUCKET_NAME);

/**
 * Subir el archivo a Firebase Storage
 * file objeto que sera almacenado en Firebase Storage
 */
module.exports = (file, pathImage) => {
    return new Promise((resolve, reject) => {
        
        if (pathImage) {
            if (pathImage != null || pathImage != undefined) {

                let fileUpload = bucket.file(`${pathImage}`);
                const blobStream = fileUpload.createWriteStream({
                    metadata: {
                        contentType: 'image/png',
                        metadata: {
                            firebaseStorageDownloadTokens: uuid,
                        }
                    },
                    resumable: false

                });

                blobStream.on('error', (error) => {
                    console.log('Error al subir archivo a firebase', error);
                    reject('Something is wrong! Unable to upload at the moment.');
                });

                blobStream.on('finish', () => {
                    // The public URL can be used to directly access the file via HTTP.
                    const url = format(`https://firebasestorage.googleapis.com/v0/b/${bucket.name}/o/${fileUpload.name}?alt=media&token=${uuid}`);
                    // console.log('URL DE CLOUD STORAGE ', url);
                    resolve(url);
                });

                blobStream.end(file.buffer);
            }
        }
    });
}

// // Crea una instancia del cliente de Secret Manager
// const secretManagerClient = new SecretManagerServiceClient();

// async function getSecretValue(secretName) {
//   const [version] = await secretManagerClient.accessSecretVersion({
//     name: secretName,
//   });
//   return version.payload.data.toString();
// }

// async function initializeStorage() {
//   // Obtiene el keyfile desde Secret Manager
//   const keyFilename = await getSecretValue('projects/ansur-project/secrets/storageKeyFile/versions/latest');

//   const storage = new Storage({
//     projectId: 'ansur-project',
//     keyFilename: JSON.parse(keyFilename), // Parsea el contenido del secreto como objeto JSON
//   });

//   const bucket = storage.bucket('gs://ansur-project.appspot.com/');

//   return {
//     uploadFile: async (file, pathImage) => {
//       if (pathImage) {
//         try {
//           let fileUpload = bucket.file(`${pathImage}`);
//           const blobStream = fileUpload.createWriteStream({
//             metadata: {
//               contentType: 'image/png',
//               metadata: {
//                 firebaseStorageDownloadTokens: uuid,
//               },
//             },
//             resumable: false,
//           });

//           return new Promise((resolve, reject) => {
//             blobStream.on('error', (error) => {
//               console.error('Error al subir archivo a Firebase:', error);
//               reject('No se pudo subir el archivo en este momento.');
//             });

//             blobStream.on('finish', () => {
//               // URL pública del archivo subido
//               const publicUrl = format(`https://firebasestorage.googleapis.com/v0/b/${bucket.name}/o/${fileUpload.name}?alt=media&token=${uuid}`);
//               console.log('URL DE CLOUD STORAGE:', publicUrl);
//               resolve(publicUrl);
//             });

//             blobStream.end(file.buffer);
//           });
//         } catch (error) {
//           console.error('Error al subir archivo:', error);
//           throw new Error('No se pudo subir el archivo en este momento.');
//         }
//       }
//     },
//     // Otras funciones relacionadas con Cloud Storage si las tienes
//   };
// }

// module.exports = initializeStorage;