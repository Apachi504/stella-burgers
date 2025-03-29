export type TIngredient = {
    _id: string;
    name: string;
    type: string;
    proteins: number;
    fat: number;
    carbohydrates: number;
    calories: number;
    price: number;
    image: string;
    image_large: string;
    image_mobile: string;
}
export type TConstructor = TIngredient & {
    id: string
}
export type TOrder = {
    _id: string;
    status: string;
    name: string;
    createdAt: string;
    updatedAt: string;
    number: number;
    ingredients: string[];
}
export type TUser={
    email: string;
    name: string;
}