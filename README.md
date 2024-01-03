# ORI Proses Logs
Service Proses Logs bertugas untuk melakukan proses dan save data Logs (yang ada pada Redis Cache) ke DB MySQL.
- Service Save Logs berjalan dengan Cron-job

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run dev
```

### Start with PM2
```
pm2 start ecosystem.config.cjs --env production
```