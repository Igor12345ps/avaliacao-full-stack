import axios from "axios";
import { toast } from "react-toastify";
import { BASE_URL } from "../utils/request";
import { Transfer } from "../models/transfer";

const transfersAPI = {
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
        return response.data;
      })
      .catch((error) => {
        toast.error(error.response.data.error);
      });
  }
}

export default () => transfersAPI;