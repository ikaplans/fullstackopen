import axios from "axios";
const baseUrl = "http://localhost:3001";

const all = () => {
  return axios.get(`${baseUrl}/persons`).then((response) => response.data);
};

const create = (person) => {
  return axios
    .post(`${baseUrl}/persons`, person)
    .then((response) => response.data);
};

const remove = (person) => {
  return axios.delete(`${baseUrl}/persons/${person.id}`);
};

const update = (person) => {
  return axios.put(`${baseUrl}/persons/${person.id}`, person);
};

export default { all, create, remove, update };
