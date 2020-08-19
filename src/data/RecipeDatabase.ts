import { BaseDatabase } from "./BaseDatabase";

export class RecipeDatabase extends BaseDatabase {
  private static TABLE_NAME: string = "Recipes";

  public async createRecipe(
    id: string,
    title: string,
    description: string,
    user_id: string
  ): Promise<void> {
    await this.getConnection()
      .insert({
        id,
        title,
        description,
        user_id,
      })
      .into(RecipeDatabase.TABLE_NAME);
  }

  public async getRecipeById(id: string): Promise<any> {
    const result = await this.getConnection()
      .select("*")
      .from(RecipeDatabase.TABLE_NAME)
      .where({ id });
    return result[0];
  }
}
