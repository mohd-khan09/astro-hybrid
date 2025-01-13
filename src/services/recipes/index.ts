const createSlugFromTitle = (title: string): string => {
  return title
    .toLowerCase()
    .replace(/(\d)\/(\d)/g, "$1-$2") // Replace forward slashes in fractions
    .replace(/[^a-z0-9\s-]/g, "") // Remove special characters
    .replace(/\s+/g, "-"); // Replace spaces with dashes
};
export const fetchAllRecipes = async () => {
  const response = await fetch("https://dummyjson.com/recipes");
  const recipes = await response.json();

  // Add slug for each recipe
  const updatedRecipes = recipes?.recipes?.map((recipe: any) => ({
    ...recipe,
    slug: createSlugFromTitle(recipe.name), // Generate slug from the name/title
  }));

  return { recipes: updatedRecipes };
};
