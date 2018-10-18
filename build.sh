echo $API_KEY
cd client/ionic-app
npm i
npx ionic build --prod --aot --minifyjs --minifycss --optimizejs
