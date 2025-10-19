const sendMail = require("./Mail.service").sendMail;
const fs = require("fs").promises;
const path = require("path");

const sendInternalErrorNotificationToAdmin = async (req, error) => {
    // Get admin emails from environment variable
    const adminEmails = process.env.ADMIN_EMAIL;
    if (!adminEmails) {
        console.warn("No admin emails configured in ADMIN_EMAIL environment variable.");
        return;
    }

    try {
        // Read HTML template
        const templatePath = path.join(__dirname, "../html/admin_error500_notification.html");
        let htmlTemplate = await fs.readFile(templatePath, "utf-8");

        // Prepare template variables
        const appName = process.env.APP_NAME || "ExpressJS Backend";
        const environment = process.env.NODE_ENV || "development";
        const timestamp = new Date().toLocaleString("fr-FR", {
            dateStyle: "full",
            timeStyle: "long",
        });
        const httpMethod = req?.method || "N/A";
        const url = req?.originalUrl || req?.url || "N/A";
        const clientIp = req?.ip || req?.connection?.remoteAddress || "N/A";
        const userIdentifier = req?.user?.email || req?.user?.id || "Utilisateur non authentifié";
        const host = req?.hostname || process.env.HOST || "localhost";
        const requestBody = req?.body ? JSON.stringify(req.body, null, 2) : "Aucun corps envoyé.";
        const stacktraceExcerpt = error?.stack || "Aucune trace disponible.";
        const shortMessage = error?.message || "Erreur interne du serveur";
        const companyName = process.env.COMPANY_NAME || "Votre Entreprise";
        const year = new Date().getFullYear();

        // Replace template variables (simple string replacement)
        htmlTemplate = htmlTemplate
            .replace(/{{app_name}}/g, appName)
            .replace(/{{environment}}/g, environment)
            .replace(/{{timestamp}}/g, timestamp)
            .replace(/{{http_method}}/g, httpMethod)
            .replace(/{{url}}/g, url)
            .replace(/{{client_ip}}/g, clientIp)
            .replace(/{{user_identifier}}/g, userIdentifier)
            .replace(/{{host}}/g, host)
            .replace(/{{request_body}}/g, requestBody)
            .replace(/{{stacktrace_excerpt}}/g, stacktraceExcerpt)
            .replace(/{{short_message}}/g, shortMessage)
            .replace(/{{company_name}}/g, companyName)
            .replace(/{{year}}/g, year.toString());

        // Handle conditional blocks (simple implementation)
        if (requestBody === "Aucun corps envoyé.") {
            htmlTemplate = htmlTemplate.replace(/{{#if request_body}}[\s\S]*?{{else}}/g, "");
            htmlTemplate = htmlTemplate.replace(/{{\/if}}/g, "");
        } else {
            htmlTemplate = htmlTemplate.replace(/{{#if request_body}}/g, "");
            htmlTemplate = htmlTemplate.replace(/{{else}}[\s\S]*?{{\/if}}/g, "");
        }

        // Send email to each admin
        const emailList = adminEmails.split(',').map(email => email.trim());
        const subject = `⚠️ Erreur 500 — ${appName} — ${shortMessage}`;
        const text = `Erreur 500 détectée sur ${appName}.\n\nDate: ${timestamp}\nURL: ${url}\nMéthode: ${httpMethod}\nUtilisateur: ${userIdentifier}\n\nMessage: ${shortMessage}\n\nConsultez les logs pour plus de détails.`;

        for (const email of emailList) {
            try {
                await sendMail(email, subject, text, htmlTemplate);
                console.log(`Email sent to admin: ${email}`);
            } catch (sendError) {
                console.error(`Failed to send email to admin: ${email}`, sendError);
            }
        }
    } catch (error) {
        console.error("Error in sendInternalErrorNotificationToAdmin:", error);
    }
};

module.exports = {
    sendInternalErrorNotificationToAdmin,
};