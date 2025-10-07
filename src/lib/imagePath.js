import baseUrl from "./baseUrl"

export const roomImg = (fileName) => {
    const pathString = `${baseUrl}/uploads/room/${fileName}`
    return pathString
}

export const mainColorImg = (productId, fileName) => {
    const pathString = `${baseUrl}/uploads/product/${productId}/${fileName}`
    return pathString
}

export const colorImages = (productId, colorId, fileName) => {
    const pathString = `${baseUrl}/uploads/product/${productId}/${colorId}/${fileName}`
    return pathString
}
export const promoImg = (fileName) => {
    const pathString = `${baseUrl}/uploads/promotion/${fileName}`
    return pathString
}
