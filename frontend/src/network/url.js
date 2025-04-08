export const url = 'http://localhost:8080/api/'

export const geturl = route => `${url}${route}/get`

export const getsingleurl = (route, id) => `${url}${route}/getSingle/${id}`

export const posturl = (route, body) => {
    const context = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
        credentials: "include",
    }
    return [`${url}${route}/create`, context]
}

export const puturl = (route, body) => {
    const context = {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
        credentials: "include",
    }
    return [`${url}${route}/update`, context]
}

export const deleteurl = (route, id) => {
    const context = {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
    }
    return [`${url}${route}/delete/${id}`, context]
}