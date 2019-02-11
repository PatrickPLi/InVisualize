# Background
I started this project at Hack the North 2018. At the time, the application was a simple HTML/CSS/JavaScript webpage that allowed users to upload an image of a product and learn about the company that makes it. Since then, I have continued working on the project, adding frameworks such as Bootstrap and Express.js to add powerful functionality and overhaul the user experience. I also made use of a more powerful Computer Vision API (Microsoft Azure,) as well as a MongoDB database.

# What it does
The web application takes an image as an input and uses machine learning to identify key objects within the image. It then scours the internet to find publicly-trade companies with exposure to these detected objects. Next, the application retrieves real-time data about the stock such as its price and ticker symbol. All of this information is clearly conveyed to the user in under a second.

# How I built it
The front-end of the web application was initially built using HTML, CSS, and JavaScript. I have since added Bootstrap to overhaul the visuals and add more structure to the page. The image recognition and stock quotes were done using the *Microsoft Azure Cognitive API* and the *AlphaVantage API* respectively. On the backend, I used *Express.js* and *Node.js* to allow for queries to a *MongoDB* database. This database contains information about numerous stocks listed on major stock exchanges. By matching keywords returned by the image recognition to the information in the database, the application can present the user with a collection of companies that are related to their query. If the result is incorrect, the user can submit feedback that helps the database become more complete.

# Where it's come, and where it's going
- [x] Looks pretty
- [x] Image recognition works
- [x] Bootstrap
- [x] Express.js, MongoDB, Node.js
- [ ] Add user account functionality
- [ ] Create portfolio management page where users can track their portfolios
- [ ] Cool animations
- [ ] World domination(???)
