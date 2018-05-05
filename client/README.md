<!DOCTYPE html>
<html>

<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="stylesheet" href="https://stackedit.io/style.css" />
</head>

<body class="stackedit">
  <div class="stackedit__html"><h1 id="vendible">Vendible</h1>
<p><strong>Vendible</strong> is a redesign of a previous project into a virtual mall of three stores displaying a range of products from the Wal-Mart and Gilt APIs to purchase using the Stripe API. The Front End (React/Redux) and Back End (Node/Express) were built in two separate projects and uploaded to Netlify and Heroku respectively.</p>
<h2 id="links">Links</h2>
<p>Live site: <a href="https://vendible.netlify.com/">https://vendible.netlify.com/</a><br>
Vendible Server Repo:  <a href="https://github.com/drerichards/vendible-server">https://github.com/drerichards/vendible-server</a></p>
<h2 id="screenshots">Screenshots</h2>
<p><strong>Home Page</strong><br>
<img src="https://res.cloudinary.com/andrerichards/image/upload/v1524890380/portfolio/vendi1.png" alt="Splash Page"></p>
<p><strong>Stores Page</strong><br>
<img src="https://res.cloudinary.com/andrerichards/image/upload/v1524890380/portfolio/vendi2.png" alt="Stores Page"></p>
<h2 id="api-documentation">API Documentation</h2>
<h4 id="wal-mart">Wal-Mart</h4>
<p>The Wal-Mart API allows text search of the <a href="http://Walmart.com">Walmart.com</a> catalogue and returns matching items available for sale online. Provides the products available in the Poketo Electronics store.</p>
<pre><code>https://api.walmartlabs.com/v1/search?query=${searchterm}&amp;format=json&amp;categoryId=${categoryId}&amp;apiKey=${WALMART_KEY}
</code></pre>
<h4 id="gilt">Gilt</h4>
<p>The Gilt Groupe APIs give the ability to build applications that display information about Gilt Groupe’s available products. Provides the products available in the Atelier Lks Apparel and Nurbana Home Goods stores.</p>
<pre><code>https://api.gilt.com/v1/products?q=${searchterm}&amp;store=${department}&amp;rows=20&amp;apikey=${GILT_KEY}
</code></pre>
<h4 id="stripe">Stripe</h4>
<p>Stripe is a suite of payment APIs that offers a payment platform to accept and process payments online for easy-to-use commerce solutions.</p>
<pre><code>var stripe = require("stripe")(
    "sk_test_BQokikJOvBiI2HlWgH4olfQ2");
stripe.charges.create({  
	amount: 2000,  
	currency: "usd",  
	source: "tok_amex", // obtained with Stripe.js  
	description: "Charge for chloe.jackson@example.com"
}, function(err, charge) {
	// asynchronously called
});
</code></pre>
<h2 id="technologies">Technologies:</h2>
<ul>
<li>Front End
<ul>
<li>HTML</li>
<li>CSS/Flexbox</li>
<li>Javascript</li>
<li>React</li>
<li>Redux</li>
<li>Ant Design</li>
</ul>
</li>
<li>Back End
<ul>
<li>Node</li>
<li>Express</li>
<li>MongoDB/MLab</li>
<li>Mongoose</li>
<li>Passport (Local Authentication)</li>
</ul>
</li>
</ul>
</div>
</body>

</html>