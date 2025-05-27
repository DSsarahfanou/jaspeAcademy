1- Cloner le projet sur github
===) Ouvrez votre terminal et faites:
git clone 

2- Se déplacer dans le projet
===) taper dans le terminal
cd jaspeAcademy 

3- Se déplacer dans un premier temps dans le projet laravel
===) taper cette commande
cd next-backend

3.1- Installer les dépendances
===)taper dans le terminal
composer install

3.2-Créer un fichier .env et copier le contenu du fichier
.env.example

Ou bien remplacer le fichier .env.example par .env

3.3- Mettre en place la base de données avec les utilisateurs
===) taper cette commande
php artisan migrate:fresh --seed

NB: Assurez- vous aue vos servers sont démarrer Apache et ?ySQL
      =======xampp ou WAMPP sur window 
      ====== taper : sudo /opt/lampp/lampp sur linux

3.4) Démarrer le serveur local de laravel
====) taper la commande 
php artisan serve

----------------------------------------------------------------------------------------------------------------------------------------------------------
4- Se déplacer maintenant dans le dossier projet de next
Ouvrir un nouveau terminal et taper
cd jaspeAcademy 
cd breeze-next

4.1- Installer les dépendances
===)taper dans le terminal
npm install
npm install react-icons 
npm install axios

NB: SI VOUS ETES SUR  WINDOWS ET QUE VOUS N'AVEZ PAS "npm"; Télécharger et installer node.js (https://nodejs.org/fr)  d'abord et reprenez le processus

4.2-Créer un fichier .env et copier le contenu du fichier
.env.example

Ou bien remplacer le fichier .env.example par .env

4.3-  Démarrer le serveur local de next


5- Copier chaque lien dans un onglet de votre navigateur
http://localhost:3000/
http://127.0.0.1:8000/


