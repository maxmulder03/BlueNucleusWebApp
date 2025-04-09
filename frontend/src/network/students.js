import {
  getUrl,
  getsingleurl,
  buildPostRequest,
  buildPutRequest,
  buildDeleteRequest,
} from "./url";

const route = "students";

export const getStudentByFirstName = async (name, resFunc, errFunc) => {
  try {
    const url = getUrl(route);
    const new_url = `${url}/firstname?firstname=${name}`;
    const response = await fetch(new_url);
    const data = await response.json();
    if (data?.status && data?.status === 404) return errFunc(data.message);
    return resFunc(data);
  } catch (error) {
    console.log("inside error", error);
    return errFunc(error.message);
  }
};

export const getStudent = async (id, resFunc, errFunc) => {
  try {
    const response = await fetch(getsingleurl(route, id));
    const data = await response.json();
    if (data?.status && data?.status === 404) return errFunc(data.message);
    return resFunc(data);
  } catch (error) {
    return errFunc(error.message);
  }
};

export const getStudents = async (resFunc, errFunc) => {
  try {
    const response = await fetch(getUrl(route));
    const data = await response.json();
    if (data?.status && data?.status === 404) return errFunc(data.message);
    return resFunc(data);
  } catch (error) {
    return errFunc(error.message);
  }
};

export const postStudent = async (body, resFunc, errFunc) => {
  try {
    const response = await fetch(...buildPostRequest(route, body));
    const data = await response.json();
    if (response.ok) return resFunc({ status: true });
    return errFunc({ status: false, message: data.message });
  } catch (error) {
    return errFunc(error.message);
  }
};

export const putStudent = async (body, resFunc, errFunc) => {
  try {
    const response = await fetch(...buildPutRequest(route, body));
    const data = await response.json();
    if (response.ok) return resFunc({ status: true });
    return errFunc({ status: false, message: data.message });
  } catch (error) {
    return errFunc(error.message);
  }
};

export const deleteStudent = async (id, resFunc, errFunc) => {
  try {
    const response = await fetch(...buildDeleteRequest(route, id));
    const data = await response.json();
    if (response.ok) return resFunc({ status: true });
    return errFunc({ status: false, message: data.message });
  } catch (error) {
    return errFunc(error.message);
  }
};
