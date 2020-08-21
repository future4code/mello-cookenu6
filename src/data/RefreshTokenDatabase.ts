import { BaseDatabase } from "./BaseDatabase";

export class RefreshTokenDatabase extends BaseDatabase {
  private static TABLE_NAME = "Refresh_Token";

  public async createRefreshToken(
    token: string,
    device: string,
    isActive: boolean,
    userId: string
  ): Promise<void> {
    await this.getConnection()
      .insert({
        refresh_token: token,
        device,
        is_active: Boolean(isActive),
        user_id: userId,
      })
      .into(RefreshTokenDatabase.TABLE_NAME);
  }

  public async getRefreshToken(token: string): Promise<any> {
    const result = await this.getConnection().raw(`
        SELECT * FROM ${RefreshTokenDatabase.TABLE_NAME}
        WHERE refresh_token = '${token}`);

    const retrievedToken = result[0][0];

    return {
      token: retrievedToken.refresh_token,
      device: retrievedToken.device,
      isActive: Boolean(retrievedToken.is_active),
      userId: retrievedToken.user_id,
    };
  }
}
