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
}
export type TConstructor = TIngredient & {
    id: string
}