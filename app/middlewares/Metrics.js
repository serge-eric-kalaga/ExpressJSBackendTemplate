const logger = require('../utils/Logger');

const { collectDefaultMetrics, register, Counter, Gauge, Histogram } = require('prom-client');

collectDefaultMetrics({ 
    timeout: 5000,
    // prefix: 'node_app_',
    labels: {
        app: 'expressjs-api-template'
    }
});


// Customized Http Metrics (Optional)
const httpMetricsLabelNames = ['method', 'route', 'app'];

// Buckets of response time for each route grouped by seconds
const httpRequestDurationBuckets = new Histogram({
    name: 'nodejs_http_response_time',
    help: 'Response time of all requests',
    labelNames: [...httpMetricsLabelNames, 'code']
});

// Count of all requests - gets increased by 1
const totalHttpRequestCount = new Counter({
  name: 'nodejs_http_total_count',
  help: 'Total Requests',
  labelNames: [...httpMetricsLabelNames, 'code']
});

// Response time for each route's last request 
const totalHttpRequestDuration = new Gauge({
  name: 'nodejs_http_total_duration',
  help: 'Response time of the Last Request',
  labelNames: httpMetricsLabelNames
});


function updateMetrics(req, res, next) {
    
    if (req.path === '/metrics') {
        return next();
    }
    
    let startTime = new Date().valueOf();
    res.addListener('finish', () => {
        let responseTime = (new Date().valueOf() - startTime); // milliseconds
        totalHttpRequestDuration.labels(req.method, req.route.path, 'expressjs-api-template').set(responseTime);
        totalHttpRequestCount.labels(req.method, req.route.path, 'expressjs-api-template', res.statusCode).inc();
        httpRequestDurationBuckets.labels(req.method, req.route.path, 'expressjs-api-template', res.statusCode).observe(responseTime);
    })
    next();
}


const Metrics = async (_, res) => {
  res.setHeader("Content-Type", register.contentType);
  res.send(await register.metrics());
};

module.exports = {
    updateMetrics,
    Metrics
}