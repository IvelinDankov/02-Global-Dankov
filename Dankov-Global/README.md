# Table of contents.

- Installation.
- Setup.
- Usage.
- Features.
- Technologies.
- Contributing.

# Installation

Steps

1. Clone the repository

`git clone https://github.com/IvelinDankov/02-Global-Dankov.git`

2. Install dependecies.
   `cd Dankov-Global npm install`
   `cd Server npm install`

3. Start the server.
   `npm start`

4. Start Angular.
   `ng serve -o`

# Setup

1. The frondend is build with Angular. It provides the user interface where users can view products editing own products, creating and deleting own products.

2. Services: The ProductService can communicates with the backend to fetch products, apply creating new Product, updating Product and Deleting existing one.
   We provide UserService - the Users can register, login, logout, interact with products catalog.

3. Components: We provide different components inside our Page.. like Home, Register, SignUp, Comany, Contacts, Facilities, Industries, Products, Why-dankov

# Backend (Node.js with MongoDB)

1. Product Schema: The backend uses Mongoose to define Product schema, including fields like name, price, description, and likes.

# Usage

Once everything is set up:

Browse Products: Users can view a list of products on the product page.

Search and Sort: Products can be filtered based on search terms or sorted by price or creation date.

# Features

Search Products: Search products by name.
Sort Products: Sort products by:
Newest
Oldest
Price: Low to High
Price: High to Low

# Techologies Used

Frontend:

- Angular
- Angular Material (Optional)
- RxJS for reactive programming
- HTTP Client for API calls

Backend:

- Node.js
- Express.js
- MongoDB & Mongoose

Authentication:

- JWT (JSON Web Token) for user authentication (if implemented)

# Contributing

We welcome contributions to this project. Please follow the steps below to contribute:

    Fork the repository.

    Create a new branch for your feature (git checkout -b feature-name).

    Make your changes and commit them (git commit -m 'Add feature-name').

    Push to your forked repository (git push origin feature-name).

    Open a pull request.
