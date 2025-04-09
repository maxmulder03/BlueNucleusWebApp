import { getUrl } from "./url";

const route = "tasks";

export const getTaskCategoryDetails = async (resFunc, errFunc) => {
  try {
    const u_rl = `${getUrl(route)}/category`;
    const response = await fetch(u_rl);
    const data = await response.json();
    if (data?.status && data?.status === 404) return errFunc(data.message);
    return resFunc(data);
  } catch (error) {
    console.log("error at getTaskCategoryDetails", error);
    return errFunc(error.message);
  }
};
