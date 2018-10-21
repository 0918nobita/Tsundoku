cd functions
npm i
cd ../ionic-app
{
  echo "export const firebaseConfig = {"
  echo "  apiKey: \"$API_KEY\","
  echo "  authDomain: \"$AUTH_DOMAIN\","
  echo "  databaseUrl: \"$DATABASE_URL\","
  echo "  messagingSenderId: \"$MESSAGING_SENDER_ID\","
  echo "  projectId: \"$PROJECT_ID\","
  echo "  storageBucket: \"$STORAGE_BUCKET\""
  echo "};"
  echo "export const gitHubConfig = {"
  echo "  clientId: \"$GITHUB_CLIENT_ID\","
  echo "  clientSecret: \"$GITHUB_CLIENT_SECRET\""
  echo "};"
} >> src/app/config.ts
npm i
npm run release
