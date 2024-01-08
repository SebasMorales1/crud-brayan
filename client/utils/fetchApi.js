/* 
Función que me permite hacer peticiones a una api, resive 4 parametros.

url: la ruta a donde se va a hacer la petición

method (opcional): El tipo de metodo de la solicitud (get, post, put, ...)

data (opcional): Los datos que se enviaran en la solicitud (nombre, descripción)

loading (opcional): va a ser una función callback que se encargara de hacer una acción mientras la solicitud esta
en proceso
*/
export function fetchApi(url, { method, data, loading}={method: 'GET', data: null, loading:null}) {
  // constante que define la configuración de la solicitud, como los headers, el tipo de metodo y el body
  const settings = {
    method, // lo mismo que poner, method: method
    headers: {
      "Content-Type": "application/json", // definimos que la solicitud va a tener un contenido de tipo json
    },
    body: data ? JSON.stringify(data) : null, // convertimos a json los datos que nos envien, si es que son pasados
  };

  if (loading && typeof loading === "function") loading(true);

  return new Promise((resolver, reject) => {
    fetch(url, settings)
      .then((res) => {
        if (!res.ok) throw new Error(`Error in query: ${res.status}`);

        return res.json();
      })
      .then((data) => resolver(data))
      .catch((error) => reject(error))
      .finally(() => {
        if (loading && typeof loading === "function") loading(false);
      });
  });
}