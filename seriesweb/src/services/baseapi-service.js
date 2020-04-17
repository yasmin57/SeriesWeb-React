import { getToken } from "./auth-service";
const URL = "http://localhost:3000/";

//Arrow function doRequest
export const doRequest = async (
  resource, //rota = series/
  method, //método (GET, POST, PUT ou DELETE)
  data = "", //body (série)
  urlParam = "" // parâmetro (id)
) => {
  console.log("enviando dados....");
  const params = {
    method: method,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + getToken()
    }
  };
  //Verifica se o método é PUT ou POST (att ou inserindo)
  if (!["GET", "DELETE"].includes(method)) {
    //Adiciona no corpo da requisição (body) o Json da série, recebida como data
    params.body = JSON.stringify(data);
  }
  //Retorna a requisição, passando os dados necessários
  return await fetch(URL + resource + urlParam, params);
};

//Requisição pública
export const doPublicRequest = async (
  resource, //rota
  method, //método
  data = "", //body
  urlParam = "" //parâmetros da url
) => {
  console.log("enviando dados....");
  const params = {
    method: method,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    }
  };
  if (!["GET", "DELETE"].includes(method)) {
    params.body = JSON.stringify(data);
  }
  return await fetch(URL + resource + urlParam, params);
};
