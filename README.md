# JaspeAcademy – Guide d'installation

## 1. Cloner le projet depuis GitHub

Ouvrez votre terminal et tapez :

```bash
git clone https://github.com/DSsarahfanou/jaspeAcademy.git
```

---

## 2. Se déplacer dans le projet

```bash
cd jaspeAcademy
```

---

## 3. Configuration du backend Laravel

### 3.1 Se déplacer dans le dossier backend

```bash
cd next-backend
```

### 3.2 Installer les dépendances PHP

```bash
composer install
```

### 3.3 Créer le fichier d'environnement

Copiez le fichier `.env.example` vers `.env` :

```bash
cp .env.example .env
```

### 3.4 Configurer la base de données

Assurez-vous que vos serveurs **Apache** et **MySQL** sont démarrés :

- **Windows** : via **XAMPP** ou **WAMPP**
- **Linux** : via la commande

```bash
sudo /opt/lampp/lampp start
```

Ensuite, exécutez la commande suivante :

```bash
php artisan migrate:fresh --seed
```

### 3.5 Démarrer le serveur Laravel

```bash
php artisan serve
```

---

## 4. Configuration du frontend Next.js

### 4.1 Se déplacer dans le dossier frontend

Ouvrez un **nouveau terminal**, puis tapez :

```bash
cd jaspeAcademy
cd breeze-next
```

### 4.2 Installer les dépendances

```bash
npm install
npm install react-icons
npm install axios
```

> ⚠️ **Windows uniquement** : Si la commande `npm` n’est pas reconnue, installez [Node.js](https://nodejs.org/fr) puis relancez les commandes ci-dessus.

### 4.3 Créer le fichier d’environnement

```bash
cp .env.example .env
```

### 4.4 Démarrer le serveur Next.js

```bash
npm run dev
```

---

## 5. Accéder aux applications

Ouvrez votre navigateur et accédez aux adresses suivantes :

- Frontend : [http://localhost:3000/](http://localhost:3000/)
- Backend : [http://127.0.0.1:8000/](http://127.0.0.1:8000/)

---

> ✅ Merci d'avoir suivi les étapes !
