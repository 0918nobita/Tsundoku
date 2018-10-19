echo $API_KEY
cd client/ionic-app
touch src/app/config.ts
echo "
  export const firebaseConfig = {
    apiKey: \"$API_KEY\"
  }
" | sed -e 's/^ *//g' -e '1d' -e '$d'
cat src/app/config.ts
npm i
npm run release
