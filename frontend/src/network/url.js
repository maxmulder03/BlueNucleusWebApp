export const url = "http://localhost:8080/api/";

export const getUrl = (route) => `${url}${route}/get`;

export const getSingleUrl = (route, id) => `${url}${route}/getSingle/${id}`;

export const buildPostRequest = (route, body) => {
  const context = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
    credentials: "include",
  };
  return [`${url}${route}/create`, context];
};

export const buildPutRequest = (route, body) => {
  const context = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
    credentials: "include",
  };
  return [`${url}${route}/update`, context];
};

export const buildDeleteRequest = (route, id) => {
  const context = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  };
  return [`${url}${route}/delete/${id}`, context];
};
