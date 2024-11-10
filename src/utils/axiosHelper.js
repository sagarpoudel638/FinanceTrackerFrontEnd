import axios from "axios";

const rootAPI = import.meta.env.VITE_API_URL;
const authEP = rootAPI + "/auth";
const transactionEP = rootAPI + "/transactions";

const apiProcessor = async ({ method, url, data, headers }) => {
  try {
    const response = await axios({
      method,
      url,
      data,
      headers,
    });
    return response.data;
  } catch (error) {
    return {
      status: "error",
      message: error?.response?.data?.error || error.message,
    };
  }
};

export const userSignup = async (signupInfo) => {
  const obj = {
    method: "post",
    url: `${authEP}/signup`,
    data: signupInfo,
  };
  return await apiProcessor(obj);
};

export const userLogin = async (loginInfo) => {
  const obj = {
    method: "post",
    url: `${authEP}/login`,
    data: loginInfo,
  };
  return await apiProcessor(obj);
};

export const getTransactions = async () => {
  const obj = { method: "get", url: transactionEP };
  return await apiProcessor(obj);
};

export const deleteTransaction = async (_id) => {
  const obj = { method: "delete", url: transactionEP +"/"+ _id };
  return await apiProcessor(obj);
};

export const createTransaction = async (transactionData)=>{
const obj = {method: "post",
  url: `${transactionEP}/transaction`,
  data: transactionData,}
  return await apiProcessor(obj);
}