// src/middleware.ts
import { defineMiddleware } from 'astro:middleware';
import { features } from './config/features';

export const onRequest = defineMiddleware((context, next) => {
  const { pathname } = context.url;
  
  // Check for disabled features - redirect to home instead of 404
  if (pathname.startsWith('/blog') && !features.blog) {
    return Response.redirect(new URL('/', context.url), 302);
  }
  
  if (pathname.startsWith('/contact') && !features.contact) {
    return Response.redirect(new URL('/', context.url), 302);
  }
  
  return next();
});