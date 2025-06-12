# Product Listing App (Next.js + Bootstrap + TypeScript)

A fully featured product listing app built using **Next.js**, **Bootstrap 5**, and **TypeScript**.

##  Features

- Server-side rendering (SSR) with `getServerSideProps`
- Responsive layout using Bootstrap 5
- Product listing with:
  - Image, title, price, category, rating
- Client-side search filtering
- Loading spinner during filtering
- Dynamic routing for product details `/product/[id]`

## 📦 Setup Instructions

```bash
npm install
npm run dev
```

### Assumptions Made

- The API didn’t specify a limit or pagination, so I fetched all products at once and implemented client-side pagination
- Since the number of products is small, I assumed 10 products per page would be enough.
- As no design/mockup was given, I used Bootstrap cards and layout based on common e-commerce UI patterns.

## 🌐 Live Demo

- https://product-listing-app-brown.vercel.app/