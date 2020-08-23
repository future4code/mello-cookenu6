import { BaseDatabase } from "./BaseDatabase";

export class FollowDatabase extends BaseDatabase {
  private static TABLE_NAME: string = "Follow_Relation";

  public async followUser(user_id: string, follow_id: string): Promise<void> {
    await this.getConnection()
      .insert({
        user_id,
        follow_id,
      })
      .into(FollowDatabase.TABLE_NAME);
  }

  public async unfollowUser(user_id: string, follow_id: string): Promise<void> {
    await this.getConnection()
      .delete()
      .from(FollowDatabase.TABLE_NAME)
      .where({ follow_id })
      .andWhere({ user_id });
  }

  public async getFeed(user_id: string): Promise<any> {
    const response = await this.getConnection().raw(`
    SELECT 
	    r.id,
	    r.title,
	    r.description,
	    r.creation_date AS createdAt,
	    u.id AS userId,
	    u.name AS userName
    FROM
	    Follow_Relation f JOIN Users u ON f.follow_id = u.id
	    JOIN Recipes r ON r.user_id = u.id
    WHERE 
	    f.user_id = '${user_id}'
    ORDER BY r.creation_date DESC
    `);
    return response[0];
  }
}
