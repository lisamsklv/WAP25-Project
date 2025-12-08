import bcrypt from 'bcrypt';


const client = {
  id: 'client',
  grants: ['password', 'refresh_token'],
  redirectUris: [], // REQUIRED by node-oauth2-server
};

export default function oAuthModel(db) {
  return {
    getClient(clientId, clientSecret) {
      return client; // we do not handle multiple clients, thus we always return the hardcoded one
    },
    async getAccessToken(accessToken) {
      const token = await db.collection('token').findOne({ accessToken });
      if (token) {
        token.client = client;
        token.user = await db.collection('user_auth').findOne({ _id: token.user_id });
      }
      return token;
    },
    async getRefreshToken(refreshToken) {
      const token = await db.collection('token').findOne({ refreshToken });
      if (token) {
        token.client = client;
        token.user = await db.collection('user_auth').findOne({ _id: token.user_id });
      }
      return token;
    },

    // TODO: we should hash the password!!!!!
    async getUser(username, password) {
      const user = await db.collection('user_auth').findOne({ username });
        if (user && user.password === password) {
          return user;
        }
      // if (user) {
      //   const passwordsMatch = await bcrypt.compare(password, user.password);
      //   if (passwordsMatch) 
      //     return user;
      // }
      return null;
    },
    async saveToken(token, client, user) {
      // await db.collection('token').insertOne({ accessToken: token.accessToken, accessTokenExpiresAt: token.accessTokenExpiresAt, user_id: user._id });
      // await db.collection('token').insertOne({ refreshToken: token.refreshToken, refreshTokenExpiresAt: token.refreshTokenExpiresAt, user_id: user._id });
      // return { ...token, client, user };
      const tokenData = {
        accessToken: token.accessToken,
        accessTokenExpiresAt: token.accessTokenExpiresAt,
        refreshToken: token.refreshToken,
        refreshTokenExpiresAt: token.refreshTokenExpiresAt,
        client: { id: client.id },
        user: { id: user._id },
        user_id: user._id
      };

      await db.collection('token').insertOne(tokenData);
      return tokenData;
    },
    async revokeToken(token) {
      const deleted = await db.collection('token').deleteOne({ refreshToken: token.refreshToken });
      return deleted.deletedCount === 1;
    }
  };
}
