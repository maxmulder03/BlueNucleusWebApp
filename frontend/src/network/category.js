import { geturl, getsingleurl, posturl, puturl, deleteurl } from "./url"

const route = "category"

export const getCategory = async (id, resFunc, errFunc) => {
  try {
    const response = await fetch(getsingleurl(route, id))
    const data = await response.json()
    if (data?.status && data?.status === 404) return errFunc(data.message)
    else return resFunc(data)
  } catch (error) {
    return errFunc(error.message)
  }
}

export const getCategories = async (resFunc, errFunc) => {
  try {
    const response = await fetch(geturl(route))
    const data = await response.json()
    if (data?.status && data?.status === 404) return errFunc(data.message)
    return resFunc(data)
  } catch (error) {
    return errFunc(error.message)
  }
}

export const postCategory = async (body, resFunc, errFunc) => {
  try {
    const response = await fetch(...posturl(route, body))
    const data = await response.json()
    if (response.ok) return resFunc({ status: true })
    return errFunc({ status: false, message: data.message })
  } catch (error) {
    return errFunc(error.message)
  }
}

export const putCategory = async (body, resFunc, errFunc) => {
  try {
    const response = await fetch(...puturl(route, body))
    const data = await response.json()
    if (response.ok) return resFunc({ status: true })
    return errFunc({ status: false, message: data.message })
  } catch (error) {
    return errFunc(error.message)
  }
}

export const deleteCategory = async (id, resFunc, errFunc) => {
  try {
    const response = await fetch(...deleteurl(route, id))
    const data = await response.json()
    if (response.ok) return resFunc({ status: true })
    return errFunc({ status: false, message: data.message })
  } catch (error) {
    return errFunc(error.message)
  }
}
