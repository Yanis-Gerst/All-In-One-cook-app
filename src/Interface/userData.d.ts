export interface IRecipe {
  name: string;
  prepTime?: string;
  cookTime?: string;
  difficulty?: string;
  tag?: string;
  urlImage?: string;
  desc?: string;
  process?: string;
  ingredients?: IIngredients;
  manualNutr?: INutrional;
  id: number;
}

export interface IRecipes extends Array<IRecipe> {}

//Ingredient

export interface IIngredient {
  name: string;
  quantity: string | number;
  unity: string;
  tag?: string;
  descriptions?: string;
  nutrionals?: INutrional;
  priceOnKilo?: string | number;
}

export interface IIngredients {
  [index: number]: IIngredient;
}

export interface INutrionals {
  [index: number]: INutrional;
}

export interface INutrional {
  quantity?: string | number;
  proteine?: string | number;
  lipide?: string | number;
  calorie?: string | number;
}

//User

export interface IUser {
  userPseudo?: string;
  pseudo?: string;
  userMail?: string;
  mail?: string;
  userPassword?: string;
  password?: string;
  mealEvents: any;
  ingredients: IIngredients;
  recipies: IRecipes;
  id: number;
}

export interface IMealEvent {
  title?: string;
  duration?: string | number;
  start: string | Date;
  end: string | Date;
  id?: number;
  allDay?: any;
}
