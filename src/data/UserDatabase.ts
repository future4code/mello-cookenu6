import { BaseDatabase } from "./BaseDatabase";

export class UserDatabase extends BaseDatabase {
  public static TABLE_NAME: string = "Users";

  public async createUser(
    id: string,
    name: string,
    email: string,
    password: string,
    role: string
  ): Promise<void> {
    await this.getConnection()
      .insert({
        id,
        name,
        email,
        password,
        role,
      })
      .into(UserDatabase.TABLE_NAME);
  }

  public async getUserByEmail(email: string): Promise<any> {
    const result = await this.getConnection()
      .select("*")
      .from(UserDatabase.TABLE_NAME)
      .where({ email });
    return result[0];
  }

  public async getUserById(id: string): Promise<any> {
    const result = await this.getConnection()
      .select("id", " name", "email", "role")
      .from(UserDatabase.TABLE_NAME)
      .where({ id });
    return result[0];
  }

  public async userCheck(id: string): Promise<any> {
    const result = await this.getConnection()
      .count("id as count")
      .from(UserDatabase.TABLE_NAME)
      .where({ id });
    return Boolean(result[0].count);
  }

  public async deleteUser(id: string): Promise<void> {
    await this.getConnection()(UserDatabase.TABLE_NAME).del().where({ id });
  }
}
