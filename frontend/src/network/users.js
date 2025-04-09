import { getUrl } from "./url";

export const getusers = async (resFunc, errFunc) => {
  try {
    const response = await fetch(getUrl("users/getUsers"));
    const data = await response.json();
    if (data?.status && data?.status === 404) return errFunc(data.message);
    return resFunc(data);
  } catch (error) {
    return errFunc(error.message);
  }
};
