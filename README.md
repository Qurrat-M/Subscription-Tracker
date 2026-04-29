# 📅 Subscription Tracker API

A production-grade backend for managing user subscriptions, featuring automated email reminders, secure authentication, and real-time security auditing.

## 🚀 Key Features

* **Automated Lifecycle Management**: Durable workflows for handling subscription renewals and reminders.
* **Intelligent Reminder System**: Powered by **Upstash Workflow** to send automated email alerts based on custom schedules (e.g., 7 days before expiry).
* **Security-First Architecture**: 
    * **Rate Limiting & Bot Detection**: Integrated with **Arcjet** to prevent brute-force attacks and unauthorized scraping.
    * **Forensic Audit Logging**: Custom middleware that logs all security events (401/403 errors) to a dedicated MongoDB collection for monitoring.
* **Durable Execution**: Automatic retries on failure for all background tasks, ensuring no user ever misses a renewal notification.

## 🛠️ Tech Stack

* **Runtime**: Node.js
* **Framework**: Express.js
* **Database**: MongoDB (Atlas)
* **Orchestration**: Upstash Workflow (powered by QStash)
* **Security**: Arcjet, JWT, Bcrypt
* **Caching/State**: Upstash Redis

## 📧 Automated Reminders with Upstash Workflow

This project leverages **Upstash Workflow** to handle complex, long-running processes like subscription reminders. Unlike traditional cron jobs, these workflows are:
* **Durable**: If a step fails (e.g., an email provider is down), it automatically retries from the exact point of failure without re-running previous logic.
* **Scalable**: Steps run independently, allowing the system to handle thousands of users concurrently without infrastructure overhead.
* **Cost-Efficient**: No compute resources are consumed during "wait" periods between reminders.

### Workflow Example
```javascript
// Workflow endpoint for sending reminders
app.post('/workflow', serve(async (context) => {
  const { userEmail, subscriptionName } = context.requestPayload;

  // Step 1: Wait until 7 days before expiry
  await context.sleepUntil('reminder-date', targetTimestamp);

  // Step 2: Send automated reminder email
  await context.run("send-email", async () => {
    return await emailProvider.send(userEmail, `Your ${subscriptionName} expires soon!`);
  });
}));
```


## 🛡️ Security Implementation

### Audit Logging
To maintain high observability, the system captures all unauthorized access attempts:
* **Events Logged**: Status 401 (Unauthorized) and 403 (Forbidden).
* **Data Captured**: IP address, timestamp, request method, and target URL.
* **Storage**: Logs are stored in a MongoDB "timeseries" collection for efficient forensic reporting.

## 🚦 Getting Started

### Prerequisites
* Node.js installed
* Upstash account (for QStash/Workflow API keys)
* MongoDB Atlas Cluster

### Installation
1. Clone the repository.
2. Install dependencies: `npm install @upstash/workflow express`.
3. Configure environment variables in `.env`:

   ```env
   QSTASH_TOKEN=your_upstash_token
   UPSTASH_WORKFLOW_URL=your_deployment_url
   MONGODB_URI=your_mongodb_connection_string
   ```
  

### **Why this README stands out for N26:**
* It uses **Senior technical terms** like "Durable Execution," "Forensic Audit Logging," and "Architectural Resilience".
* It explicitly explains **why** you chose Upstash (Reliability over basic Cron).
* It includes a **Security** section, which is the primary focus of the department you are applying to.
