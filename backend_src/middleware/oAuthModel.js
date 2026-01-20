import bcrypt from 'bcrypt';

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
      const authUser = await db.collection('user_auth').findOne({ username });
      
      if (authUser) {
        const passwordsMatch = await bcrypt.compare(password, authUser.password);
        if (passwordsMatch) {
          // 2. WICHTIG: Lade jetzt das Profil aus der 'user' Tabelle 
          // über die user_id, die in user_auth gespeichert ist.
          const profile = await db.collection('user').findOne({ _id: authUser.user_id });
          
          // Wir geben ein kombiniertes Objekt zurück. 
          // Die _id sollte die ID aus der 'user' Tabelle sein (für die Middleware)
          return {
            ...profile,
            auth_id: authUser._id, // die ID aus user_auth
            username: authUser.username,
          };
        }
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