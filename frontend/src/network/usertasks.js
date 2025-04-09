import { getUrl, buildPostRequest, buildPutRequest } from "./url";

const route = "usertasks";

export const getUserTask = async (userid, resFunc, errFunc) => {
  try {
    const u_rl = `${getUrl(route)}/tasks?userid=${userid}`;
    const response = await fetch(u_rl);
    const data = await response.json();
    if (data?.status && data?.status === 404) return errFunc(data.message);
    return resFunc(data);
  } catch (error) {
    return errFunc(error.message);
  }
};

export const postUserTask = async (body, resFunc, errFunc) => {
  try {
    const response = await fetch(...buildPostRequest(route, body));
    const data = await response.json();
    if (response.ok) return resFunc({ status: true });
    return errFunc({ status: false, message: data.message });
  } catch (error) {
    return errFunc(error.message);
  }
};

export const putUserTask = async (body, resFunc, errFunc) => {
  try {
    const response = await fetch(...buildPutRequest(route, body));
    const data = await response.json();
    if (response.ok) return resFunc({ status: true });
    return errFunc({ status: false, message: data.message });
  } catch (error) {
    return errFunc(error.message);
  }
};
