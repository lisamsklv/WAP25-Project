import bcrypt from 'bcrypt'; // Import aktiviert

const client = {
  id: 'client',
  grants: ['password', 'refresh_token'],
  redirectUris: [],
};

export default function oAuthModel(db) {
  return {
    async getAccessToken(accessToken) {
      const token = await db.collection('token').findOne({ accessToken });
      if (token) {
        token.client = client;
        token.user = await db.collection('user_auth').findOne({ _id: token.user_id });
      }
      return token;
    },

    async getUser(username, password) {
      const user = await db.collection('user_auth').findOne({ username });
      if (user) {
        // Nutze bcrypt für sicheren Vergleich statt Klartext
        const passwordsMatch = await bcrypt.compare(password, user.password);
        if (passwordsMatch) return user;
      }
      return null;
    },

    async saveToken(token, client, user) {
      const tokenData = {
        accessToken: token.accessToken,
        accessTokenExpiresAt: token.accessTokenExpiresAt,
        refreshToken: token.refreshToken,
        refreshTokenExpiresAt: token.refreshTokenExpiresAt,
        client: { id: client.id },
        user: { id: user._id },
        user_id: user._id,
      };
      await db.collection('token').insertOne(tokenData);
      return tokenData;
    },
    
    async revokeToken(token) {
      const deleted = await db.collection('token').deleteOne({ refreshToken: token.refreshToken });
      return deleted.deletedCount === 1;
    },
  };
}