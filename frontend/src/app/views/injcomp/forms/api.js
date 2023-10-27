// api.js
export const saveFormDataToMongoDB = async (formData) => {
  const dataToSend = {
    ...formData,
    inputValues: formData.inputValues // Send inputValues only
  };
  console.log(formData);
  try {
    const response = await fetch('http://localhost:3001/api/saveFormData', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(dataToSend)
    });

    if (response.ok) {
      const data = await response.json();
      console.log(data);
    } else {
      throw new Error('Failed to save data');
    }
  } catch (error) {
    console.error(error);
    // Handle the error
  }
};
