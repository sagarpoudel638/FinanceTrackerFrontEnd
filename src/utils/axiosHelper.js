import axios from "axios";

const rootAPI = import.meta.env.VITE_API_URL;
const authEP = rootAPI + "/auth";
const transactionEP = rootAPI + "/transactions";

export const getJWTtoken = () => {
  const token = localStorage.getItem("accessJWT");
  return token;
};

export const setJWTtoken = (token) => {
  localStorage.setItem("accessJWT", token);
};

export const removeJWTtoken = () => {
  localStorage.removeItem("accessJWT");
};
export const verifyToken = async () => {
  let token = getJWTtoken();

  const obj = {
    method: "get",
    url: authEP + "/verify",
    headers: {
      Authorization: "Bearer " + token,
    },
  };

  return await apiProcessor(obj);
};

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
  let token = getJWTtoken();
  const obj = {
    method: "get",
    url: transactionEP,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  return await apiProcessor(obj);
};

export const getTransactionsByID = async (_id) => {
  let token = getJWTtoken();
  const obj = {
    method: "post",
    url: transactionEP + "/" + _id,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  return await apiProcessor(obj);
}

export const deleteTransaction = async (_id) => {
  let token = getJWTtoken();
  const obj = {
    method: "delete",
    url: transactionEP + "/" + _id,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  return await apiProcessor(obj);
};

export const createTransaction = async (transactionData) => {
  let token = getJWTtoken();
  const obj = {
    method: "post",
    url: `${transactionEP}/transaction`,
    data: transactionData,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  return await apiProcessor(obj);
};

export const updateTransaction = async (id, transactionData)=>{
  let token = getJWTtoken();
  const obj = {
    method: "patch",
    url:`${transactionEP}/${id}`,
    data: transactionData,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  return await apiProcessor(obj);
}