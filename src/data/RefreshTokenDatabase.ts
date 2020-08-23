import { BaseDatabase } from "./BaseDatabase";

export class RefreshTokenDatabase extends BaseDatabase {
  private static TABLE_NAME = "Refresh_Token";

  public async createRefreshToken(
    token: string,
    device: string,
    isActive: boolean,
    userId: string
  ): Promise<void> {
    await this.getConnection()(RefreshTokenDatabase.TABLE_NAME).insert({
      refresh_token: token,
      device,
      is_active: isActive,
      user_id: userId,
    });
  }

  public async getRefreshToken(token: string): Promise<any> {
    const result = await this.getConnection()(RefreshTokenDatabase.TABLE_NAME)
      .select()
      .where({ refresh_token: token });

    const retrievedToken = result[0];

    return {
      token: retrievedToken.refresh_token,
      device: retrievedToken.device,
      isActive: Boolean(retrievedToken.is_active),
      userId: retrievedToken.user_id,
    };
  }

  public async revokeRefreshToken(userId: string): Promise<void> {
    await this.getConnection()(RefreshTokenDatabase.TABLE_NAME)
      .update({ is_active: false })
      .where({ user_id: userId });
  }
}
