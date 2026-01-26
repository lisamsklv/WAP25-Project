import bcrypt from 'bcrypt';

const client = { id: 'client', grants: ['password', 'refresh_token'] };

export default function oAuthModel(db) {
  return {
    getClient() {
      return client;
    },

    async getAccessToken(accessToken) {
      const token = await db.collection('token').findOne({ accessToken });
      if (!token) return null;
      token.client = client;
      token.user = await db.collection('user').findOne({ _id: token.user_id });
      return token;
    },

    async getRefreshToken(refreshToken) {
      const token = await db.collection('token').findOne({ refreshToken });
      if (!token) return null;
      token.client = client;
      token.user = await db.collection('user').findOne({ _id: token.user_id });
      return token;
    },

    async getUser(username, password) {
      const authUser = await db.collection('user_auth').findOne({ username });
      if (!authUser) return null;

      const match = await bcrypt.compare(password, authUser.password);
      if (!match) return null;

      const profile = await db.collection('user').findOne({ _id: authUser.user_id });

      return {
        ...profile,
        auth_id: authUser._id,
        user_id: profile._id,
      };
    },

    async saveToken(token, client, user) {
      // store both access and refresh tokens in ONE document
      const tokenDoc = {
        accessToken: token.accessToken,
        accessTokenExpiresAt: token.accessTokenExpiresAt,
        refreshToken: token.refreshToken,
        refreshTokenExpiresAt: token.refreshTokenExpiresAt,
        user_id: user._id, // link to profile in 'user' collection
        client: { id: client.id },
      };
      await db.collection('token').insertOne(tokenDoc);
      return { ...tokenDoc, client, user };
    },

    async revokeToken(token) {
      const deleted = await db.collection('token').deleteOne({ refreshToken: token.refreshToken });
      return deleted.deletedCount === 1;
    },
  };
}
