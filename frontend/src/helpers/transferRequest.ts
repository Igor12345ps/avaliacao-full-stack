import axios from "axios";
import { toast } from "react-toastify";
import { BASE_URL } from "../utils/request";
import { Transfer } from "../models/transfer";

const transfersAPI = {

  getAllAccounts: async (): Promise<any> => {
    return await axios
      .get(`${BASE_URL}/accounts`)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        toast.error(error.response.data.error);
      });
  },

  createAccount: async (): Promise<any> => {
    return axios
      .post(`${BASE_URL}/accounts`)
      .then((response) => {
        return response.data.number;
      })
      .catch((error) => {
        toast.error(error.response.data.error);
        return null;
      });
  },

  getAllTransfers: async (): Promise<any> => {
    return await axios
      .get(`${BASE_URL}/transfers`)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        toast.error(error.response.data.error);
      });
  },

  getTransferById: (id: number): any => {
    axios
      .get(`${BASE_URL}/transfers/${id}`)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        toast.error(error.response.data.error);
      });
  },

  postTransference: (transfer: Transfer): any => {
    axios
      .post(`${BASE_URL}/transfers`, transfer)
      .then((response) => {
        toast.success("Transferência efetuada! Espere alguns segundos para a tabela recarregar.");
        return response.data;
      })
      .catch((error) => {
        toast.error(error.response.data.error);
        return null;
      });
  }
}

export default () => transfersAPI;