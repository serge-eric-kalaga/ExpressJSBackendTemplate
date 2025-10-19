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
- 🧪 Tests unitaires avec Jest & Supertest
- 🔒 Sécurité renforcée avec Helmet et CORS
- 📧 Mail service intégré avec Nodemailer

## 🧱 Composants inclus :
- 🚀 Serveur ExpressJS avec configuration optimisée
- 🗄️ Base de données MySQL containerisée
- 🛠️ Interface PHPMyAdmin pour la gestion de la BDD
- 📊 Stack de monitoring (Prometheus + Grafana + Node Exporter)
- 🐳 Configuration Docker Compose prédéfinie

C'est une solution clé-en-main pour démarrer un projet backend sécurisé et monitoré, idéal pour éviter de reconfigurer les éléments techniques récurrents à chaque nouveau projet.

## 🛠️ Prérequis

- [Docker](https://www.docker.com/) & [Docker Compose](https://docs.docker.com/compose/)

## ⚡ Installation rapide

1. **Clonez le projet :**
   ```bash
   git clone <url_du_repo>
   cd ExpressJSBackendTemplate
   ```

2. **Configurez les variables d’environnement :**
   Dupliquez le fichier `app/.env.example` en `app/.env` et modifiez les valeurs selon vos besoins.
   Exemple de contenu du fichier `.env` :
      ```
      # App
      APP_NAME=ExpressJSBackendTemplate
      PORT=5000
      JWTKey=1234567890
      UserPasswordSaltRound=5
      DATABASE_URL=mysql2://root:1234567890@mysql_db:3333/expressjs_backend_template
      LOG_LEVEL=debug
      DATABASE_HOST=mysql_db
      DATABASE_USER=root
      # Utilisateur par defaut pour pour l'Application
      INIT_USERNAME=admin
      INIT_PASSWORD=admin

      # MYSQL
      MYSQL_ROOT_PASSWORD=1234567890
      MYSQL_DATABASE=expressjs_backend_template
      MYSQL_USER=serge
      MYSQL_PASSWORD=1234567890

      # PHPMYADMIN
      PMA_HOST=mysql_db
      PMA_PORT=3333
      # PMA_USER=serge
      # PMA_PASSWORD=1234567890

   # Grafana
   GF_SECURITY_ADMIN_USER=admin
   GF_SECURITY_ADMIN_PASSWORD=1234567890

   # Email SMTP (pour les notifications)
   EMAIL_HOST=smtp.example.com
   EMAIL_PORT=587
   EMAIL_USERNAME=mon_compte
   EMAIL_PASSWORD=mon_mot_de_passe
   EMAIL_FROM="Mon App <no-reply@example.com>"

   # Notifications d'erreur
   ADMIN_EMAIL=admin1@example.com,admin2@example.com
   ONCALL_EMAIL=oncall@example.com
   LOGO_URL=https://via.placeholder.com/48
   COMPANY_NAME=Ma Société
   SERVICE_NAME=expressjs-backend
   HOST=localhost
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

> ⚙️ Les configurations de Prometheus sont dans [`monitoring/prometheus/prometheus.yml`](./monitoring/prometheus/prometheus.yml).

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

## 📜 Logs

Les logs de l'application sont disponibles dans le dossier `app/logs/`. Les niveaux de log peuvent être configurés via la variable d’environnement `LOG_LEVEL` dans le fichier `.env`.
L'application enregistre les logs de façon structurée pour faciliter le débogage et la surveillance. Ainsi vous retrouverez un fichier de log par jour (Exemple `app/logs/2025-10-17.log`).

## ✉️ Notifications d’erreur par email

Lorsque le middleware global de gestion des erreurs détecte une erreur interne (HTTP 500), une notification email est envoyée automatiquement à tous les administrateurs listés dans `ADMIN_EMAIL`.

## 🗂️ Structure du projet

```text
ExpressJSBackendTemplate/
├── 🗂️ app/
│   ├── ⚙️ configs/
│   ├── 🧑‍💻 controllers/
│   ├── 📜 logs/
│   ├── 🛡️ middlewares/
│   ├── 🗄️ models/
│   ├── 🚦 routes/
│   ├── 🧩 services/
│   ├── 🧪 tests/
│   ├── 📑 utils/
│   └── 🏁 Index.js
├── 💾 data/
│   └── 🐬 mysql/
├── 📈 monitoring/
│   ├── 📊 prometheus.yml
│   └── 📉 grafana/
├── 🐳 docker-compose.yaml
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
- `docker-compose.yaml` : Orchestration des services

## 👤 Initialisation de l’utilisateur par défaut

Au démarrage, le template crée automatiquement un utilisateur par défaut si aucun n’existe (voir [`app/configs/InitData.js`](app/configs/InitData.js)). Les identifiants sont définis dans le fichier `.env`.

## 🛡️ Gestion des erreurs

Les erreurs sont gérées globalement via le middleware [`ErrorHandler`](app/middlewares/ErrorHandler.js).  
Un endpoint `/error-test` permet de tester la gestion des erreurs.

En cas d’erreur interne (HTTP 500), si la configuration email est présente, une notification est envoyée automatiquement aux adresses définies dans `ADMIN_EMAIL`.

## 🧩 Middleware de réponse uniforme

Toutes les réponses API sont uniformisées grâce au middleware [`Response`](app/middlewares/Response.js), pour faciliter la consommation côté client.

## 🔒 Authentification

L’authentification utilisateur est gérée via JWT.  
Voir les routes dans [`app/routes/User.route.js`](app/routes/User.route.js) et le contrôleur [`User.controller.js`](app/controllers/User.controller.js).

## 🧪 Tests

Ajoutez vos tests unitaires dans le dossier `app/tests/`.
N'oubliez pas de configurer votre environnement de test en modifiant le fichier `app/tests.env`.
Les tests utilisent Jest pour le framework de test et Supertest pour les tests d'API.
Pour exécuter les tests, utilisez la commande suivante :
```bash
npm test
```

## 🛠️ Personnalisation

- Ajoutez vos routes dans `app/routes/`
- Modifiez les modèles dans `app/models/`
- Adaptez la configuration dans `app/configs/`
- Ajoutez des middlewares dans `app/middlewares/`
- Implémentez la logique métier dans `app/services/`
- Utilisez `app/utils/` pour les fonctions utilitaires

## 🤝 Contribution

Les contributions sont les bienvenues ! Forkez le projet et proposez vos améliorations.

## 📄 Licence

MIT

---

Pour toute question, ouvrez une issue sur le repository.