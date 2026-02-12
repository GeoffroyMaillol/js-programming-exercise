import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';

fetch('/assets/config.json')
  .then(res => res.json())
  .then(config => {
    (window as any).__APP_CONFIG__ = config;
    return bootstrapApplication(App, appConfig);
  }).catch((err) => console.error(err));
