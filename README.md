# 📘 README.md — MongoDB Fundamentals Project
## 📌 Project Overview

This project demonstrates MongoDB basics using the mongosh shell.
It covers:

Database & Collection creation

Basic CRUD operations

Advanced queries (projection, sorting, pagination)

Aggregation pipelines

Indexing for performance

All tasks are automated in a script: mongoshell_example.js

# ✅ Prerequisites

## Before running the scripts, ensure you have:

MongoDB installed on your machine

Download MongoDB Community Server

Start the MongoDB service:

mongod


By default, it runs on:
mongodb://127.0.0.1:27017

MongoDB Shell (mongosh) installed

Download mongosh

Verify installation:

mongosh --version


# 🚀 Running the Script
## Option 1: Run directly inside mongosh

Open mongosh:

mongosh


Inside the shell, load the script: (Replace the path to match your own path)

load("D:/PLPClass/mongodb-fundamentals/mongoshell_example.js");


## Option 2: Run from your terminal

You can also run the script when launching mongosh: (replace the path with your own path)

mongosh plp_bookstore D:/PLPClass/mongodb-fundamentals/mongoshell_example.js


This will connect to the plp_bookstore database and execute the file automatically.

# 2. Basic CRUD Operations

Find all books in a genre:

db.books.find({ genre: "Fiction" });


Find books published after a year:

db.books.find({ published_year: { $gt: 1950 } });


Find books by author:

db.books.find({ author: "George Orwell" });


Update book price:

db.books.updateOne({ title: "The Hobbit" }, { $set: { price: 17.99 } });


Delete book by title:

db.books.deleteOne({ title: "Moby Dick" });

# 3. Advanced Queries

Books in stock after 2010:

db.books.find({ in_stock: true, published_year: { $gt: 2010 } });


Projection (only title, author, price):

db.books.find({}, { title: 1, author: 1, price: 1, _id: 0 });


Sorting:

db.books.find().sort({ price: 1 }); // ascending
db.books.find().sort({ price: -1 }); // descending


Pagination:

db.books.find().skip(0).limit(5); // page 1
db.books.find().skip(5).limit(5); // page 2

# 4. Aggregation Pipelines

Average book price by genre:

db.books.aggregate([{ $group: { _id: "$genre", avgPrice: { $avg: "$price" } } }]);


Author with most books:

db.books.aggregate([
  { $group: { _id: "$author", totalBooks: { $sum: 1 } } },
  { $sort: { totalBooks: -1 } },
  { $limit: 1 }
]);


Group books by decade:

db.books.aggregate([
  {
    $group: {
      _id: { $concat: [ { $substr: ["$published_year", 0, 3] }, "0s" ] },
      count: { $sum: 1 }
    }
  },
  { $sort: { _id: 1 } }
]);

# 5. Indexing

Index on title:

db.books.createIndex({ title: 1 });


Compound index on author & published_year:

db.books.createIndex({ author: 1, published_year: -1 });


Explain query performance:

db.books.find({ title: "1984" }).explain("executionStats");