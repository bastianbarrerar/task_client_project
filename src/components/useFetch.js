export const getTodos = async (func) => {
  try {
    const response = await fetch(process.env.REACT_APP_API_URL);
    const jsonData = await response.json();
    func(jsonData);
    return jsonData.length;
  } catch (err) {
    console.error(err.message);
  }
};


