<h1 align="center">
  Headless Ecommerce Store
</h1>

<p>Serverless ecommerce project built with Gatsby.JS, Tailwind and React using Typescript.</p>
<p>To make dynamic parts (checkout, cart) work I've used Netlify Functions, Persistent Redux Store and Stripe.</p>
<h2>
  Dynamic part
</h2>
<ul>
  <li>Login and registration done with Netlify Function and Netlify Identity.</li>
  <li>Shopping cart is built using persistent React Redux Store.</li>
  <li>For checkout I'm using Stripe's checkout and I invoke it threw Netlify Functions.</li>
  <li>Products are fetched from Stripe.</li>
</ul>
<h2>
  To run this project
</h2>
<ol>
  <li>You need to have gatsby cli installed</li>
  <li>You need to clone repo and install dependencies via <code>npm install</code></li>
  <li>You need to create stripe project and add products</li>
  <li>You need to host it on Netlify and enable Netlify identity</li>
</ol>

<h2>Demo</h2>
<p><a href="https://headless-store.netlify.app/products" target="__blank"><b>Headless Ecommerce Store Demo</b></a></p>
