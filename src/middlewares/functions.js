import fs from 'fs';

// Function to read file
const readFile = (fileName, Id) => {
  //  Read file
  const fileData = fs.readFileSync(`src/model/db/${fileName}.json`, 'utf-8');

  const arrayOfObjects = JSON.parse(fileData);

  // Checks if a specific data was requested
  if (!Id) {
    return arrayOfObjects;
  }

  return arrayOfObjects[Id];
};

// Function to write or update file
const updateFile = (fileName, dataToAdd, whereToAdd, flag) => {
  // Get specific data
  const data = readFile(fileName);

  // Ensures getting data was successfull
  if (!data) {
    return 'error';
  }

  const updatedData = data;
  data[whereToAdd] = dataToAdd;

  // Flag to either update or create data
  if (!updatedData && flag === 'update') {
    return 'error';
  }

  // Write to the file
  fs.writeFileSync(`src/model/db/${fileName}.json`, JSON.stringify(data, null, 2), 'utf-8');

  const updatedFile = readFile(fileName);

  // Ensures data was written
  if (updatedData === updatedFile) {
    return 'error';
  }

  return updatedData;
};

// Function to delete data from file
const deleteFile = (fileName, deleteWhat) => {
  const data = readFile(fileName);

  // Ensures getting data was successfull
  if (!data) {
    return 'error';
  }

  const deletedData = data[deleteWhat];

  if (!deletedData) {
    return 'error';
  }

  // Delete the data
  delete data[deleteWhat];
  fs.writeFileSync(`src/model/db/${fileName}.json`, JSON.stringify(data, null, 2), 'utf-8');

  const deletedFile = readFile(fileName);

  // Ensures data was deleted
  if (data === deletedFile) {
    return 'error';
  }

  return deletedData;
};

export default { readFile, updateFile, deleteFile };
