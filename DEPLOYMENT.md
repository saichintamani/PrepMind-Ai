# Deployment Guide - PrepMind AI

## Pre-Deployment Checklist

### Code Quality
- [ ] Run `npm run lint` - no errors
- [ ] Run `npm run typecheck` - no errors
- [ ] Run `npm run build` - successful build
- [ ] Test all routes locally
- [ ] Test authentication flow
- [ ] Test protected routes
- [ ] Test database operations
- [ ] Test responsive design on mobile

### Environment Setup
- [ ] Supabase project created
- [ ] Database migrations applied
- [ ] RLS policies verified
- [ ] Environment variables configured
- [ ] API keys securely stored

### Security
- [ ] No secrets in code
- [ ] HTTPS enabled in production
- [ ] CORS configured correctly
- [ ] SQL injection prevention verified
- [ ] XSS protection in place
- [ ] CSRF tokens if needed

## Vercel Deployment

### Step 1: Prepare Repository

```bash
# Commit all changes
git add .
git commit -m "Prepare for production deployment"
git push origin main
```

### Step 2: Connect to Vercel

1. Go to [vercel.com](https://vercel.com)
2. Click "New Project"
3. Connect your GitHub repository
4. Select the repository and project

### Step 3: Configure Build Settings

In Vercel dashboard:

**Build & Development Settings:**
- **Framework Preset**: Vite
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Install Command**: `npm install`

### Step 4: Set Environment Variables

In Vercel project settings → Environment Variables:

```
VITE_SUPABASE_URL = https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY = your_anon_key_here
```

For each environment:
- Development
- Preview
- Production

### Step 5: Deploy

Click "Deploy" to start the deployment. Vercel will:
1. Build the project
2. Run tests
3. Deploy to CDN
4. Generate preview URLs
5. Deploy to production

### Step 6: Verify Deployment

After deployment:
1. Visit production URL
2. Test login/signup flow
3. Test all main features
4. Check browser console for errors
5. Verify database connectivity
6. Test on mobile devices

## Post-Deployment Monitoring

### Analytics
- Monitor Vercel Analytics
- Track page load times
- Monitor error rates
- Check user sessions

### Supabase Monitoring
1. Go to Supabase dashboard
2. Check Database Health
3. Monitor API Usage
4. Review Auth logs
5. Check RLS policies

### Error Tracking
- Set up Sentry or similar
- Monitor console errors
- Track failed API calls
- Alert on critical errors

## Database Backup

### Manual Backup

1. Go to Supabase Dashboard
2. Navigate to Settings → Database
3. Click "Download Backup"
4. Store securely

### Automated Backups

Supabase provides:
- Daily backups (free tier)
- 7-day retention (Pro)
- 30-day retention (Enterprise)

## Scaling Considerations

### As User Base Grows

1. **Database**: 
   - Monitor query performance
   - Add indexes if needed
   - Consider connection pooling

2. **API**:
   - Use CDN for static assets
   - Implement caching
   - Rate limiting

3. **Security**:
   - Increase RLS complexity
   - Add API authentication
   - Monitor for suspicious activity

## Continuous Deployment

### GitHub Actions Workflow

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to Vercel
on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Install dependencies
        run: npm install
      
      - name: Run linter
        run: npm run lint
      
      - name: Run type check
        run: npm run typecheck
      
      - name: Build
        run: npm run build
      
      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v25
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
```

## Domain Configuration

### Custom Domain Setup

1. **In Domain Registrar**:
   - Update nameservers to Vercel's
   - Or add CNAME record

2. **In Vercel Dashboard**:
   - Go to Project Settings → Domains
   - Add custom domain
   - Verify DNS configuration

3. **SSL Certificate**:
   - Automatically provisioned by Vercel
   - Valid for 90 days
   - Auto-renewed

## Performance Optimization

### Image Optimization
- Use Vercel Image Optimization
- Configure next/image or img tags
- Lazy load images

### Code Splitting
- React.lazy() for routes
- Dynamic imports for heavy components
- Tree-shaking for dependencies

### Caching
- Set appropriate cache headers
- Use browser caching
- CDN edge caching

## Rollback Procedure

If deployment breaks:

1. **Quick Rollback** (Vercel):
   - Go to Deployments
   - Find last working deployment
   - Click "Promote to Production"

2. **Code Rollback** (Git):
   ```bash
   git revert <commit-hash>
   git push origin main
   ```

3. **Database Rollback**:
   - Restore from backup via Supabase
   - Contact Supabase support if needed

## Health Check Endpoints

### Recommended to add:

```typescript
// pages/health.tsx
export default function HealthCheck() {
  const status = {
    status: 'ok',
    timestamp: new Date().toISOString(),
    database: 'connected'
  };
  return Response.json(status);
}
```

Access: `https://yourdomain.com/api/health`

## Monitoring & Alerts

### Services to Consider

1. **Error Tracking**: Sentry, Rollbar
2. **Uptime Monitoring**: UptimeRobot, Pingdom
3. **Performance**: New Relic, DataDog
4. **Security**: Snyk, WhiteSource

### Alert Rules
- High error rate (>1%)
- Slow page loads (>3s)
- Database connection issues
- Failed authentication attempts
- Suspicious login patterns

## Security in Production

### HTTPS/SSL
- ✓ Automatically enabled by Vercel
- ✓ HTTP redirects to HTTPS
- ✓ HSTS headers enabled

### Headers
- X-Frame-Options: DENY
- X-Content-Type-Options: nosniff
- Content-Security-Policy: strict
- Strict-Transport-Security: enabled

### Rate Limiting
- Implement API rate limiting
- Protect auth endpoints
- DDoS protection via Vercel

### Data Security
- Encrypt sensitive data
- Use environment variables
- No hardcoded secrets
- Regular security audits

## Maintenance Windows

### Planned Maintenance

1. **Database Migrations**:
   - Schedule during low traffic
   - Prepare rollback plan
   - Notify users in advance

2. **Dependency Updates**:
   - Test in staging first
   - Run security audit
   - Monitor after update

3. **Infrastructure Changes**:
   - Plan backup strategy
   - Prepare rollback
   - Have communication ready

## Disaster Recovery Plan

### In Case of Data Loss

1. **Restore from Backup**:
   ```
   Contact Supabase support
   - Project ID
   - Backup date needed
   - Reason for restore
   ```

2. **Prevention**:
   - Regular backups
   - Test restore process
   - Document recovery steps
   - Maintain offline backups

### In Case of Service Down

1. **Communication**:
   - Update status page
   - Notify users
   - Provide ETA

2. **Recovery**:
   - Investigate root cause
   - Implement fix
   - Deploy fix
   - Verify service

3. **Post-Incident**:
   - Document what happened
   - Review prevention steps
   - Implement improvements
   - Share learnings

## Cost Optimization

### Vercel
- Free tier: up to 100 GB bandwidth/month
- Pro: $20/month, 1 TB bandwidth
- Enterprise: custom pricing

### Supabase
- Free: 500 MB database, 2 GB storage
- Pro: $25/month, 8 GB database, 100 GB storage
- Enterprise: custom pricing

### Tips to Reduce Costs
- Optimize database queries
- Use pagination for large datasets
- Implement caching
- Monitor bandwidth usage
- Clean up unused resources

## Support & Documentation

### Resources
- [Vercel Documentation](https://vercel.com/docs)
- [Supabase Documentation](https://supabase.com/docs)
- [React Documentation](https://react.dev)

### Getting Help
- Vercel Support: support@vercel.com
- Supabase Support: support@supabase.io
- GitHub Issues: Report bugs

## Launch Checklist (Final)

- [ ] All tests pass
- [ ] No console errors
- [ ] No TypeScript errors
- [ ] Build size optimized
- [ ] Performance monitored
- [ ] Security verified
- [ ] Database backed up
- [ ] Analytics enabled
- [ ] Error tracking configured
- [ ] Team notified
- [ ] Documentation updated
- [ ] Launch communication ready
