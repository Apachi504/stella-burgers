export type TIngredient = {
    calories: number,
    carbohydrates: number,
    fat: number,
    image: string,
    image_large: string,
    image_mobile: string,
    name: string,
    price: number,
    proteins: number,
    type: string,
    _id: string,
    key: string,
    title: string,
    count: number,
    success: boolean,
    index?: number
}
export type TConstructor = TIngredient & {
    id: string
}
export type TOrder = {
    createdAt: string,
    ingredients: string[],
    name: string,
    number: number,
    status: string,
    updatedAt: string,
    _id: string
}