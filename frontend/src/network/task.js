import { geturl, getsingleurl, posturl, puturl, deleteurl } from "./url";

const route = "tasks";

export const getTaskCategoryDetails = async (resFunc, errFunc) => {
  try {
    const u_rl = `${geturl(route)}/category`;
    const response = await fetch(u_rl);
    const data = await response.json();
    if (data?.status && data?.status === 404) return errFunc(data.message);
    return resFunc(data);
  } catch (error) {
    console.log("error at getTaskCategoryDetails", error);
    return errFunc(error.message);
  }
};

export const getTask = async (id, resFunc, errFunc) => {
  try {
    const response = await fetch(getsingleurl(route, id));
    const data = await response.json();
    if (data?.status && data?.status === 404) return errFunc(data.message);
    return resFunc(data);
  } catch (error) {
    return errFunc(error.message);
  }
};

export const getTasks = async (resFunc, errFunc) => {
  try {
    const response = await fetch(geturl(route));
    const data = await response.json();
    if (data?.status && data?.status === 404) return errFunc(data.message);
    return resFunc(data);
  } catch (error) {
    return errFunc(error.message);
  }
};

export const postTask = async (body, resFunc, errFunc) => {
  try {
    const response = await fetch(...posturl(route, body));
    const data = await response.json();
    if (response.ok) return resFunc({ status: true });
    return errFunc({ status: false, message: data.message });
  } catch (error) {
    return errFunc(error.message);
  }
};

export const putTask = async (body, resFunc, errFunc) => {
  try {
    const response = await fetch(...puturl(route, body));
    const data = await response.json();
    if (response.ok) return resFunc({ status: true });
    return errFunc({ status: false, message: data.message });
  } catch (error) {
    return errFunc(error.message);
  }
};

export const deleteTask = async (id, resFunc, errFunc) => {
  try {
    const response = await fetch(...deleteurl(route, id));
    const data = await response.json();
    if (response.ok) return resFunc({ status: true });
    return errFunc({ status: false, message: data.message });
  } catch (error) {
    return errFunc(error.message);
  }
};
