# 🚀 ExpressJSBackendTemplate

Ce template ExpressJS vous permet de démarrer rapidement un backend Node.js avec gestion des utilisateurs, documentation Swagger, monitoring Prometheus & Grafana & Node Exporter, gestion des erreurs et connexion à une base de données MySQL.

## ✨ Fonctionnalités

- 📦 Structure modulaire (routes, middlewares, configs, modèles)
- 🔐 Authentification utilisateur
- 📑 Logger de requêtes
- 🛡️ Gestion centralisée des erreurs
- 📚 Documentation Swagger automatique
- 👤 Initialisation d’un utilisateur par défaut
- 🗄️ Prêt pour MySQL (via Sequelize ou autre ORM)
- 📊 Monitoring avec Prometheus, Grafana & Node Exporter
- 🐳 Déploiement facile avec Docker & Docker Compose
- 🧩 Middleware de réponse uniforme

## 🛠️ Prérequis

- [Docker](https://www.docker.com/) & [Docker Compose](https://docs.docker.com/compose/)

## ⚡ Installation rapide

1. **Clonez le projet :**
   ```bash
   git clone <url_du_repo>
   cd ExpressJSBackendTemplate
   ```

2. **Configurez les variables d’environnement :**
   Créez un fichier `.env` à la racine du projet, exemple :
   ```
   PORT=5000
   DB_HOST=mysql
   DB_USER=root
   DB_PASSWORD=motdepasse
   DB_NAME=expressjs_backend_template
   INIT_USERNAME=admin
   INIT_PASSWORD=admin
   UserPasswordSaltRound=10
   APP_NAME=ExpressJS Backend API
   APP_VERSION=1.0.0
   APP_DESCRIPTION=API documentation for the Fleet Service
   ```

3. **Lancez le projet avec Docker Compose :**
   ```bash
   docker-compose up --build
   ```
   Cela démarre l’API Express, MySQL, Prometheus, Grafana et Node Exporter.

## 🐳 Utilisation avec Docker Compose

Le fichier [`docker-compose.yaml`](./docker-compose.yaml) gère les services suivants :
- **expressjs-backend** : API Node.js
- **mysql_db** : Base de données MySQL
- **phpmyadmin** : Interface PHPMyAdmin
- **prometheus** : Monitoring des métriques
- **grafana** : Visualisation des métriques
- **node-exporter** : Export des métriques système

> ⚙️ Les configurations de Prometheus sont dans [`monitoring/prometheus.yml`](./monitoring/prometheus.yml).

## 📚 Documentation API

Swagger est disponible à l’adresse :
```
http://localhost:<PORT>/api-docs
```
Swagger est configuré dans [`app/configs/Swagger.js`](app/configs/Swagger.js).

## 📊 Monitoring

- **Prometheus** : [http://localhost:9090](http://localhost:9090)
- **Grafana** : [http://localhost:3000](http://localhost:3000) (login par défaut : admin/admin)
- **Node Exporter** : [http://localhost:9100/metrics](http://localhost:9100/metrics)

## 🗂️ Structure du projet

```text
ExpressJSBackendTemplate/
├── 🗂️ app/
│   ├── ⚙️ configs/
│   ├── 🧑‍💻 controllers/
│   ├── 🛡️ middlewares/
│   ├── 🗄️ models/
│   ├── 🚦 routes/
│   └── 🏁 Index.js
├── 💾 data/
│   └── 🐬 mysql/
├── 📈 monitoring/
│   ├── 📊 prometheus.yml
│   └── 📉 grafana/
├── 🐳 docker-compose.yml
├── 📝 .env
├── 📦 package.json
└── 📄 Readme.md
```

- `app/Index.js` : Point d’entrée principal
- `app/routes/` : Définition des routes (ex : User, Exemple)
- `app/middlewares/` : Middlewares personnalisés (auth, logger, gestion des erreurs, réponse uniforme)
- `app/configs/` : Configuration (base de données, Swagger, initialisation des données)
- `app/models/` : Modèles Sequelize
- `data/mysql/` : Données et fichiers liés à MySQL
- `monitoring/` : Fichiers de configuration Prometheus & Grafana
- `docker-compose.yml` : Orchestration des services

## 👤 Initialisation de l’utilisateur par défaut

Au démarrage, le template crée automatiquement un utilisateur par défaut si aucun n’existe (voir [`app/configs/InitData.js`](app/configs/InitData.js)). Les identifiants sont définis dans le fichier `.env`.

## 🛡️ Gestion des erreurs

Les erreurs sont gérées globalement via le middleware [`ErrorHandler`](app/middlewares/ErrorHandler.js).  
Un endpoint `/error-test` permet de tester la gestion des erreurs.

## 🧩 Middleware de réponse uniforme

Toutes les réponses API sont uniformisées grâce au middleware [`Response`](app/middlewares/Response.js), pour faciliter la consommation côté client.

## 🔒 Authentification

L’authentification utilisateur est gérée via JWT.  
Voir les routes dans [`app/routes/User.route.js`](app/routes/User.route.js) et le contrôleur [`User.controller.js`](app/controllers/User.controller.js).

## 🧪 Tests

Ajoutez vos tests unitaires dans le dossier `tests/` (à créer si besoin).

## 🛠️ Personnalisation

- Ajoutez vos routes dans `app/routes/`
- Modifiez les modèles dans `app/models/`
- Adaptez la configuration dans `app/configs/`

## 🤝 Contribution

Les contributions sont les bienvenues ! Forkez le projet et proposez vos améliorations.

## 📄 Licence

MIT

---

Pour toute question, ouvrez une issue sur le repository.