# Deployment Guide

## Overview
This document outlines the deployment process for the Branbu web application. The application consists of a React frontend and a Node.js backend.

## Prerequisites
- AWS Account with appropriate IAM permissions
- Domain name (for production)
- SSL certificate
- PostgreSQL database instance
- Node.js v14 or higher
- PM2 or similar process manager

## Environment Setup

### Frontend Environment Variables
Create `.env.production` in the frontend directory:
```env
REACT_APP_API_URL=https://api.yourdomain.com
REACT_APP_WS_URL=wss://api.yourdomain.com
REACT_APP_ENV=production
```

### Backend Environment Variables
Create `.env` in the backend directory:
```env
NODE_ENV=production
PORT=3000
DATABASE_URL=postgresql://user:password@host:5432/dbname
JWT_SECRET=your-secure-jwt-secret
AWS_ACCESS_KEY_ID=your-aws-key
AWS_SECRET_ACCESS_KEY=your-aws-secret
AWS_REGION=your-aws-region
S3_BUCKET=your-bucket-name
```

## Deployment Steps

### Database Setup
1. Create PostgreSQL instance
2. Run migrations:
   ```bash
   cd backend
   npm run migrate
   ```

### Backend Deployment

1. Install dependencies:
   ```bash
   cd backend
   npm install --production
   ```

2. Start with PM2:
   ```bash
   pm2 start ecosystem.config.js --env production
   ```

### Frontend Deployment

1. Build the frontend:
   ```bash
   cd frontend
   npm run build
   ```

2. Deploy to S3 or your preferred hosting:
   ```bash
   aws s3 sync build/ s3://your-bucket-name
   ```

## SSL Configuration

1. Obtain SSL certificate (Let's Encrypt recommended)
2. Configure in your reverse proxy (Nginx recommended)

## Nginx Configuration Example

```nginx
server {
    listen 443 ssl;
    server_name api.yourdomain.com;

    ssl_certificate /path/to/cert.pem;
    ssl_certificate_key /path/to/key.pem;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

## Monitoring

1. Set up CloudWatch metrics
2. Configure error tracking (Sentry recommended)
3. Set up uptime monitoring

## Backup Strategy

1. Configure automated database backups
2. Set up S3 bucket versioning
3. Implement log rotation

## Rollback Procedure

1. Keep previous deployment versions
2. Document database migration rollback steps
3. Maintain deployment history

## Security Checklist

- [ ] SSL/TLS enabled
- [ ] Environment variables secured
- [ ] Database backups encrypted
- [ ] Rate limiting configured
- [ ] CORS policies set
- [ ] Security headers configured
- [ ] Regular security updates scheduled

## Troubleshooting

Common issues and solutions:

1. Database connection issues:
   - Check connection string
   - Verify network security groups
   - Confirm database credentials

2. Frontend 404 errors:
   - Verify S3 bucket configuration
   - Check CloudFront distribution
   - Confirm routing settings

3. Backend service issues:
   - Check PM2 logs
   - Verify environment variables
   - Monitor server resources

## Contact

For deployment support, contact the DevOps team at [devops@branbu.com] 