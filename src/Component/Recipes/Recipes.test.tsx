//Update Nutrionals Value / Ingredient

import React from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { IUser, INutrional, IIngredient } from "../../Interface/userData";
import Recipes from "./Recipes";

let mockFakeUser: IUser = {
  pseudo: "yanisMock",
  mail: "yanis@gmail.com",
  password: "yanis",
  mealEvents: [],
  ingredients: {
    1: {
      name: "Tagliatelle",
      quantity: "500",
      unity: "g",
      nutrionals: {},
    },

    2: {
      name: "Roquefort",
      quantity: "400",
      unity: "g",
      nutrionals: {},
    },
    3: {
      name: "Crème fraîche",
      quantity: "200",
      unity: "ml",
      nutrionals: {},
    },
  },
  recipies: [
    {
      name: "Pâtes au bleu",
      tag: "Pasta",
      prepTime: "10m",
      cookTime: "15",
      nutrionals: {},
      difficulty: "4",
      desc: "Tagliatelle accompagné d'une sauce roquefort",
      urlImage:
        "https://lemoulindarius.fr/wp-content/uploads/2019/04/pates-au-bleu-dauvergne-paint.jpg",
      ingredients: {
        1: {
          name: "Roquefort",
          quantity: "200",
          unity: "g",
          nutrionals: {},
        },
        2: {
          name: "Crème fraîche",
          quantity: "100",
          unity: "ml",
          nutrionals: {},
        },
        3: {
          name: "Tagliatelle",
          quantity: "250",
          unity: "g",
          nutrionals: {},
        },
      },
      process:
        "1. Faire cuire les pâtes\n2. Faire Fondre le roquefort + Ajouter de la crème \n3. Mélanger",
      id: 1654696378641,
    },
    {
      name: "Tacos 3 viande",
      tag: "Malbouffe",
      prepTime: "20m",
      cookTime: "30m",
      nutrionals: {},
      difficulty: "5",
      desc: "Sandwich où l'on mélange les viandes",
      urlImage:
        "https://burger-night.fr/thumb//max-800-1200/shopProduct/shopProduct_263_1/tacos-3-viandes.jpg",
      ingredients: {
        1: {
          name: "Escalope",
          quantity: "200",
          unity: "g",
          nutrionals: {},
        },
        2: {
          name: "Kebab",
          quantity: "200",
          unity: "g",
          nutrionals: {},
        },
        3: {
          name: "Viande haché",
          quantity: "200",
          unity: "g",
          nutrionals: {},
        },
        4: {
          name: "Sauce Fromagère",
          quantity: "100",
          unity: "ml",
          nutrionals: {},
        },
      },
      process: "1. Prend ton tél\n2. TACOS MAN",
      id: 1654696466482,
    },
    {
      name: "Ramen",
      prepTime: "5m",
      tag: "Pasta",
      cookTime: "10m",
      difficulty: "5",
      desc: "Nouille asiat",
      urlImage:
        "https://www.picard.fr/dw/image/v2/AAHV_PRD/on/demandware.static/-/Sites-catalog-picard/default/dwc8c7b587/produits/cuisine-evasion/edition/000000000000039659_E.jpg?sw=672&sh=392",
      ingredients: {},
      process: "",
      id: 1654710328173,
    },
    {
      name: "Faux-filet Frite",
      prepTime: "20m",
      tag: "Viande",
      cookTime: "30m",
      nutrionals: {},
      difficulty: "4",
      desc: "La base",
      urlImage:
        "https://www.cuisineactuelle.fr/imgre/fit/http.3A.2F.2Fprd2-bone-image.2Es3-website-eu-west-1.2Eamazonaws.2Ecom.2Fcac.2F2018.2F09.2F25.2F3ed15503-d488-4dc3-ba69-1c4cf6d25ca8.2Ejpeg/750x562/quality/80/crop-from/center/cr/wqkgUm91bGllci1UdXJpb3QvU3VjcsOpIHNhbMOpIC8gQ3Vpc2luZSBBY3R1ZWxsZQ%3D%3D/faux-filet.jpeg",
      ingredients: {},
      process: "",
      id: 1654710360602,
    },
  ],
  id: 3,
};

beforeEach(() => {
  mockFakeUser = {
    pseudo: "yanisMock",
    mail: "yanis@gmail.com",
    password: "yanis",
    mealEvents: [],
    ingredients: {
      1: {
        name: "Tagliatelle",
        quantity: "500",
        unity: "g",
        nutrionals: {},
      },

      2: {
        name: "Roquefort",
        quantity: "400",
        unity: "g",
        nutrionals: {},
      },
      3: {
        name: "Crème fraîche",
        quantity: "200",
        unity: "ml",
        nutrionals: {},
      },
    },
    recipies: [
      {
        name: "Pâtes au bleu",
        tag: "Pasta",
        prepTime: "10m",
        cookTime: "15",
        nutrionals: {},
        difficulty: "4",
        desc: "Tagliatelle accompagné d'une sauce roquefort",
        urlImage:
          "https://lemoulindarius.fr/wp-content/uploads/2019/04/pates-au-bleu-dauvergne-paint.jpg",
        ingredients: {
          1: {
            name: "Roquefort",
            quantity: "200",
            unity: "g",
            nutrionals: {},
          },
          2: {
            name: "Crème fraîche",
            quantity: "100",
            unity: "ml",
            nutrionals: {},
          },
          3: {
            name: "Tagliatelle",
            quantity: "250",
            unity: "g",
            nutrionals: {},
          },
        },
        process:
          "1. Faire cuire les pâtes\n2. Faire Fondre le roquefort + Ajouter de la crème \n3. Mélanger",
        id: 1654696378641,
      },
      {
        name: "Tacos 3 viande",
        tag: "Malbouffe",
        prepTime: "20m",
        cookTime: "30m",
        nutrionals: {},
        difficulty: "5",
        desc: "Sandwich où l'on mélange les viandes",
        urlImage:
          "https://burger-night.fr/thumb//max-800-1200/shopProduct/shopProduct_263_1/tacos-3-viandes.jpg",
        ingredients: {
          1: {
            name: "Escalope",
            quantity: "200",
            unity: "g",
            nutrionals: {},
          },
          2: {
            name: "Kebab",
            quantity: "200",
            unity: "g",
            nutrionals: {},
          },
          3: {
            name: "Viande haché",
            quantity: "200",
            unity: "g",
            nutrionals: {},
          },
          4: {
            name: "Sauce Fromagère",
            quantity: "100",
            unity: "ml",
            nutrionals: {},
          },
        },
        process: "1. Prend ton tél\n2. TACOS MAN",
        id: 1654696466482,
      },
      {
        name: "Ramen",
        prepTime: "5m",
        tag: "Pasta",
        cookTime: "10m",
        difficulty: "5",
        desc: "Nouille asiat",
        urlImage:
          "https://www.picard.fr/dw/image/v2/AAHV_PRD/on/demandware.static/-/Sites-catalog-picard/default/dwc8c7b587/produits/cuisine-evasion/edition/000000000000039659_E.jpg?sw=672&sh=392",
        ingredients: {},
        process: "",
        id: 1654710328173,
      },
      {
        name: "Faux-filet Frite",
        prepTime: "20m",
        tag: "Viande",
        cookTime: "30m",
        nutrionals: {},
        difficulty: "4",
        desc: "La base",
        urlImage:
          "https://www.cuisineactuelle.fr/imgre/fit/http.3A.2F.2Fprd2-bone-image.2Es3-website-eu-west-1.2Eamazonaws.2Ecom.2Fcac.2F2018.2F09.2F25.2F3ed15503-d488-4dc3-ba69-1c4cf6d25ca8.2Ejpeg/750x562/quality/80/crop-from/center/cr/wqkgUm91bGllci1UdXJpb3QvU3VjcsOpIHNhbMOpIC8gQ3Vpc2luZSBBY3R1ZWxsZQ%3D%3D/faux-filet.jpeg",
        ingredients: {},
        process: "",
        id: 1654710360602,
      },
    ],
    id: 3,
  };
});

const allRecipesFromUser = Object.values(mockFakeUser.recipies).map(
  (recipe) => recipe.name
);

const allRecipesDetails = Object.values(mockFakeUser.recipies).map(
  (recipe) => recipe
);
//Mock UserData to create a fake User

jest.mock("../../App", () => {
  const originalModule = jest.requireActual("../../App");

  return {
    __esModule: true,
    ...originalModule,
    useUserContext: () => {
      return {
        data: mockFakeUser,
        setData: (userData: IUser) => {
          mockFakeUser = userData;
        },
        isConnected: true,
      };
    },
  };
});

test("It Render Proprely all Recipes", () => {
  render(
    <MemoryRouter>
      <Recipes />
    </MemoryRouter>
  );

  allRecipesFromUser.forEach((recipeName) => {
    expect(screen.getByText(recipeName)).toBeInTheDocument();
  });
});
describe("Search Bar", () => {
  const cases = ["Tac", "Pâte", "T", "P", "Faux", ""];
  const categoryCase = ["#Pas", "#V", "#Mal", ""];
  test.each(cases)(
    "given %p as search value for search by Name",
    (searchValue) => {
      render(
        <MemoryRouter>
          <Recipes />
        </MemoryRouter>
      );

      const searchBar = screen.getByLabelText("Search Bar for your Recipes");
      fireEvent.change(searchBar, { target: { value: searchValue } });

      searchValue = searchValue.toLowerCase();

      const targetRecipes = allRecipesFromUser.filter((recName) =>
        recName.toLowerCase().includes(searchValue)
      );
      const notTargetRecipes = allRecipesFromUser.filter((recName) => {
        return !recName.toLowerCase().includes(searchValue);
      });

      targetRecipes.forEach((targetRecName) => {
        expect(screen.getByText(targetRecName)).toBeInTheDocument();
      });

      notTargetRecipes.forEach((targetRecName) => {
        expect(screen.queryByText(targetRecName)).not.toBeInTheDocument();
      });
    }
  );

  test.each(categoryCase)(
    "given as %p as search value for search by tags",
    (searchValue) => {
      render(
        <MemoryRouter>
          <Recipes />
        </MemoryRouter>
      );

      const searchBar = screen.getByLabelText("Search Bar for your Recipes");
      fireEvent.change(searchBar, { target: { value: searchValue } });

      searchValue = searchValue.replace("#", "").toLowerCase();

      const targetTagRecipes = allRecipesDetails.filter((rec) =>
        rec.tag.toLowerCase().includes(searchValue)
      );
      const notTargetTagRecipes = allRecipesDetails.filter((rec) => {
        return !rec.tag.toLowerCase().includes(searchValue);
      });

      targetTagRecipes.forEach((targetRec) => {
        expect(screen.getByText(targetRec.name)).toBeInTheDocument();
      });

      notTargetTagRecipes.forEach((targetRec) => {
        expect(screen.queryByText(targetRec.name)).not.toBeInTheDocument();
      });
    }
  );
});

describe("Recipe are Crud", () => {
  const allUpdatableByLabel = [
    "recipe title input",
    "preparxation time input",
    "cooking time input",
    "descriptions input",
    "tag input",
  ];
  const randomUpdate = [
    "Riz au miel",
    "25m",
    "1h",
    "Du Riz avec du poulet et du miel enfaite",
    "Miel Man",
  ];
  test.each(allRecipesDetails)(
    "%p.name the recipe that we test for update test",
    async (rec) => {
      render(
        <MemoryRouter>
          <Recipes />
        </MemoryRouter>
      );

      const recipeHome = screen.getByText(rec.name);
      //Appear RecipeDetails
      fireEvent.click(recipeHome);
      allUpdatableByLabel.forEach(async (label, index) => {
        const contentEditable = await waitFor(() =>
          screen.findByLabelText(label)
        );
        fireEvent.blur(contentEditable, {
          target: { textContent: randomUpdate[index] },
        });

        expect(contentEditable.textContent).toBe(randomUpdate[index]);
      });
    }
  );
  test.each(allRecipesDetails)(
    "%p the recipe that we test for delete test",
    async (rec) => {
      render(
        <MemoryRouter>
          <Recipes />
        </MemoryRouter>
      );
      const recipeHome = screen.getByText(rec.name);
      fireEvent.click(recipeHome);
      const deleteBtn = screen.getByText("Delete");
      fireEvent.click(deleteBtn);

      expect(screen.queryByText(rec.name)).not.toBeInTheDocument();
    }
  );

  const fakeRecipe = {
    name: "Eau sucrée",
    prepTime: "50m",
    cookTime: "105m",
    difficulty: "1",
    tag: "cheap",
    urlImage: "", //A Tester,
    descriptions: "Enfaite c'est de l'eau avec du sucre c'est grave pas cher.",
    precess: "1. Tu prend de un verre\n 2. Tu met une cuillère à sucre",
    ingredients: {
      1: {
        name: "eau",
        quantity: "200",
        unity: "ml",
      },
      2: {
        name: "sucre",
        quantity: "50",
        unity: "g",
      },
    },
  };
  const allLabelForm = [
    "Nom de la recette:",
    "Temp de préparation:",
    "Temp de Cuison:",
    "the note",
    "Tag your recipe",
    "The url of your image (optionnel)",
    "Descriptions/Informations",
    "Process",
  ];
  it("add Recipe work well", async () => {
    //Aller dans le formulaire
    //Remplir puis ajouter
    //Aller dans recDetails et expect qu'il y'a 2 titre
    render(
      <MemoryRouter>
        <Recipes />
      </MemoryRouter>
    );
    const addBtn = screen.getByText("Add");
    fireEvent.click(addBtn);

    const fakeRecValue = Object.values(fakeRecipe);

    for (let i = 0; i < allLabelForm.length; i++) {
      const formElem = (await waitFor(() =>
        screen.findByLabelText(allLabelForm[i])
      )) as HTMLInputElement;
      const textUpdate = fakeRecValue[i] as string;
      fireEvent.change(formElem, { target: { value: textUpdate } });
    }

    const addFormBtn = screen.getByText("Ajouter votre recette");
    fireEvent.click(addFormBtn);

    const newRecHome = await waitFor(() =>
      screen.findByText(fakeRecValue[0] as string)
    );
    fireEvent.click(newRecHome);
    //expect to have the title, cookTime, prepTime, note to be in rec home & rec details
    [0, 1, 2, 6].forEach((i) => {
      expect(screen.getAllByText(fakeRecValue[i] as string)).toHaveLength(2);
    });

    //expect note and tag to be in rec details
    [3, 4].forEach((i) => {
      expect(screen.getByText(fakeRecValue[i] as string)).toBeInTheDocument();
    });

    const processElem = await waitFor(() =>
      screen.findByText("1. Tu prend de un verre", { exact: false })
    );
    expect(processElem).toBeInTheDocument();
  });
});

describe("Recipe Nutrionals work", () => {
  // Si on tous les infos sur macro on affiche les macro nutriment + ça s'adapte au nb de person only
  // Si on a sur le prix on affiche le prix  only +  ça s'adapte au nb de person
  // On affiche les 2 en même temps
  // On Affriche Rien quand on pas info

  it("Display nothing when empty value", async () => {
    render(
      <MemoryRouter>
        <Recipes />
      </MemoryRouter>
    );

    const recHome = screen.getByText(allRecipesFromUser[0]);
    fireEvent.click(recHome);

    const emptyNutr = await waitFor(() =>
      screen.findByText("On a pas les infos sur tous les ingrédients")
    );
    const emptyPrice = await waitFor(() =>
      screen.findByText("On a pas d'info sur le prix enfate")
    );
    expect(emptyNutr).toBeInTheDocument();
    expect(emptyPrice).toBeInTheDocument();
  });

  it("Display data well without math error", async () => {
    //Fake User avec plusieurs Recette et plusieurs valurs nutrionelle pour faire pleins de calculs
    mockFakeUser = {
      pseudo: "Ikims",
      mail: "Ikims@gmail.com",
      password: "aze",
      mealEvents: [],
      ingredients: {
        "1": {
          name: "Ramen Sachet",
          quantity: "100",
          tag: "Pates",
          unity: "g",
          nutrionals: {
            quantity: "100",
            proteine: "13",
            lipide: "17",
            calorie: "550",
          },
          priceOnKilo: "20",
        },
        "2": {
          name: "Roquefort",
          quantity: "150",
          tag: "Fromage",
          unity: "g",
          nutrionals: {
            quantity: "100",
            proteine: "17",
            lipide: "22",
            calorie: "344",
          },
          descriptions: "...",
          priceOnKilo: "18",
        },
        "3": {
          name: "Tagliatelle",
          quantity: "300",
          tag: "Pate",
          unity: "g",
          nutrionals: {
            quantity: "100",
            proteine: "5",
            lipide: "32",
            calorie: "400",
          },
          descriptions: "...",
          priceOnKilo: "1.5",
        },
      },
      recipies: [
        {
          name: "Ramen qui pique",
          prepTime: "1m",
          cookTime: "5m",
          difficulty: "4",
          tag: "Pâtes",
          urlImage: "https://www.epices-du-monde.com/images/8801073113428.jpg",
          desc: "Pique de fou. Rapide cheap efficace. ",
          process:
            "1. Faire bouillir de l'eau\n2. Cuir les ramens\n3. Mélanger avec la sauce piquante",
          ingredients: {
            "1": {
              name: "Ramen Sachet",
              quantity: "100",
              unity: "g",
              nutrionals: {},
            },
          },
          id: 1656672318586,
        },
        {
          name: "Pâtes au bleu",
          prepTime: "5m",
          cookTime: "15m",
          difficulty: "4",
          tag: "Pâtes",
          urlImage: "",
          desc: "Pâtes au roquefort",
          process:
            "1. Faire bouillir de l'eau\n2. Cuir les ramens\n3. Mélanger avec la sauce piquante",
          ingredients: {
            "1": {
              name: "Roquefort",
              quantity: "200",
              unity: "g",
              nutrionals: {},
            },
            "2": {
              name: "Tagliatelle",
              quantity: "250",
              unity: "g",
              nutrionals: {},
            },
          },
          id: 234,
        },
      ],
      id: 4,
    };

    const nutrionalProprety = ["Proteine", "Lipide", "Calorie"];
    //The number represent the index of an ingredient
    const getExpectProprety = (
      numberArr: number[],
      coefDiff: number[]
    ): number[] => {
      if (numberArr.length === 1) {
        const index = numberArr[0];
        return nutrionalProprety.map((nutr) => {
          const keyNutr = nutr.toLowerCase() as keyof INutrional;
          const nutrionalValueOfIng = mockFakeUser.ingredients[index]
            .nutrionals as INutrional;
          return nutrionalValueOfIng[keyNutr] as number;
        });
      } else {
        //Recup les info de tous les ings et les ajouter puis return
        return numberArr.reduce(
          (prev, curr, index) => {
            const currentIng = nutrionalProprety.map((nutr) => {
              const keyNutr = nutr.toLowerCase() as keyof INutrional;
              const nutrionalValueOfIng = mockFakeUser.ingredients[curr]
                .nutrionals as INutrional;
              return (nutrionalValueOfIng[keyNutr] * coefDiff[index]) as number;
            });

            return [
              prev[0] + +currentIng[0],
              prev[1] + +currentIng[1],
              prev[2] + +currentIng[2],
            ];
          },
          [0, 0, 0]
        );
      }
    };
    //Quantity réprésentes les quantité dans la recette
    const getExpectPrice = (indexIng: number[], quantity: number[]) => {
      return indexIng.reduce((prev, curr, index) => {
        const currentIng = mockFakeUser.ingredients[curr] as IIngredient;
        const currentPriceOnKilo = Number(currentIng.priceOnKilo);
        const coefDiff = quantity[index] / 1000;
        return prev + Math.round(currentPriceOnKilo * coefDiff);
      }, 0);
    };
    render(
      <MemoryRouter>
        <Recipes />
      </MemoryRouter>
    );

    const recHome = screen.getByText("Pâtes au bleu");
    fireEvent.click(recHome);

    const expectNutrionalValue = getExpectProprety([2, 3], [2, 2.5]);
    const expectPrice = getExpectPrice([2, 3], [200, 250]);
    //Nutrionals Value are with the right Data
    nutrionalProprety.forEach((nutr, index) => {
      expect(
        screen.getByText(`${nutr} ${expectNutrionalValue[index]}`, {
          exact: false,
        })
      ).toBeInTheDocument();
    });

    expect(
      screen.getByText(`Prix de la recette: ${expectPrice}€`)
    ).toBeInTheDocument();

    //Voir si Price correspond au bon donnée
  });
});
