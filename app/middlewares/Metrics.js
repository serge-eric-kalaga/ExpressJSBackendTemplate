const logger = require('../utils/Logger');
const { collectDefaultMetrics, register, Counter, Histogram, Gauge } = require('prom-client');

// 🚀 Collecte des métriques système et Node.js
collectDefaultMetrics({
    timeout: 5000,
    labels: { app: 'expressjs-api-template' },
    prefix: 'nodejs_' // ✅ Bon pour éviter les conflits
});

// ✅ Labels communs à toutes les métriques HTTP
const httpMetricsLabelNames = ['method', 'route', 'code', 'app'];

// 📊 Histogramme : distribution des durées de requêtes (en secondes)
const httpRequestDurationBuckets = new Histogram({
    name: 'nodejs_http_response_time_bucket', // Nom exact pour ton dashboard
    help: 'Durée des requêtes HTTP en secondes',
    labelNames: httpMetricsLabelNames,
    buckets: [0.005, 0.01, 0.025, 0.05, 0.1, 0.3, 0.5, 1, 3, 5]
});

const httpRequestDuration = new Histogram({
    name: 'http_request_duration_seconds',
    help: 'Durée des requêtes HTTP en secondes',
    labelNames: httpMetricsLabelNames,
    buckets: [0.005, 0.01, 0.025, 0.05, 0.1, 0.3, 0.5, 1, 3, 5]
});


// 🔢 Compteur : total des requêtes HTTP
const totalHttpRequestCount = new Counter({
    name: 'nodejs_http_total_count', // Nom exact pour ton dashboard
    help: 'Nombre total de requêtes HTTP',
    labelNames: httpMetricsLabelNames
});

// 📈 Gauge : durée de la dernière requête en millisecondes
const lastHttpRequestDuration = new Gauge({
    name: 'nodejs_http_last_request_duration_milliseconds',
    help: 'Durée de la dernière requête en millisecondes',
    labelNames: ['method', 'route', 'app']
});

// 🧩 Middleware pour mettre à jour les métriques
function updateMetrics(req, res, next) {
    if (req.path === '/metrics') return next();

    const startTime = process.hrtime();

    res.on('finish', () => {
        const diff = process.hrtime(startTime);
        const durationInSeconds = diff[0] + diff[1] / 1e9;
        const durationInMs = durationInSeconds * 1000;

        const route = req.route ? req.route.path : req.path;

        const labels = {
            method: req.method,
            route,
            code: res.statusCode,
            app: 'expressjs-api-template'
        };

        // 🔹 Mise à jour des métriques Prometheus
        totalHttpRequestCount.labels(labels.method, labels.route, labels.code, labels.app).inc();
        httpRequestDurationBuckets.labels(labels.method, labels.route, labels.code, labels.app).observe(durationInSeconds);
        lastHttpRequestDuration.labels(labels.method, labels.route, labels.app).set(durationInMs);
        httpRequestDuration.labels(labels.method, labels.route, labels.code, labels.app).observe(durationInSeconds);


        logger.info(`[Metrics] ${req.method} ${route} ${res.statusCode} - ${durationInMs.toFixed(2)} ms`);
    });

    next();
}

// 📡 Contrôleur /metrics
async function Metrics(_, res) {
    try {
        res.setHeader('Content-Type', register.contentType);
        res.end(await register.metrics());
    } catch (err) {
        logger.error('Erreur lors de la collecte des métriques :', err);
        res.status(500).send('Erreur lors de la collecte des métriques');
    }
}

module.exports = {
    updateMetrics,
    Metrics
};
