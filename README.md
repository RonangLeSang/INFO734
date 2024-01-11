# INFO734
projet de full-stack

Front end : angular js
back end : express js
dbb: Mongo DB

commande dans p4Server :
npm install cors dotenv express mongodb
npm install --save-dev typescript @types/cors @types/express @types/node ts-node
npm install ngx-cookie-service 

utilisation:
lancer le server.js,
lancer le front end (ng serve dans le dossier p4)
ensuite vous avez accès à la page de connection,
page de connection: vous avez la possibilité de vous connecter ou enregistrer
page enregistrement: possibilité de s'enregistrer ou d'annuler dans les 2cas vous revnez à la page de connection
une fois connecter vous arriver sur la page de listpartie ou vous avez la possibilité de voir les partie rejoignable
malheureusement la page à subit quelque bug donc n'affiche plus les partie mais sinon on devrait pouvoir cliquer sur n'importe 
quelle partie et la rejoindre, il y a des bouton cree partie et deconnexion mais les fonctionnalité ne sont pas implementer

vous ne pouvez pas rejoindre de partie mais avec le path:http://localhost:4200/grid vous pouvez au moin voir la grille 
ou vous pouvez normalement poser un jeton dans une colonne et si 4 jeton sont aligné vous gagné.
