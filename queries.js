// Run this with: mongosh --file mongodb_shell_example.js
// Database & Collection Setup

use("plp_bookstore");

// Drop existing books collection if re-running
db.books.drop();


// Insert Sample Books

db.books.insertMany([
  {
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    genre: "Fiction",
    published_year: 1960,
    price: 12.99,
    in_stock: true,
    pages: 336,
    publisher: "J. B. Lippincott & Co."
  },
  {
    title: "1984",
    author: "George Orwell",
    genre: "Dystopian",
    published_year: 1949,
    price: 10.99,
    in_stock: true,
    pages: 328,
    publisher: "Secker & Warburg"
  },
  {
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    genre: "Fiction",
    published_year: 1925,
    price: 9.99,
    in_stock: true,
    pages: 180,
    publisher: "Charles Scribner's Sons"
  },
  {
    title: "Brave New World",
    author: "Aldous Huxley",
    genre: "Dystopian",
    published_year: 1932,
    price: 11.50,
    in_stock: false,
    pages: 311,
    publisher: "Chatto & Windus"
  },
  {
    title: "The Hobbit",
    author: "J.R.R. Tolkien",
    genre: "Fantasy",
    published_year: 1937,
    price: 14.99,
    in_stock: true,
    pages: 310,
    publisher: "George Allen & Unwin"
  },
  {
    title: "The Catcher in the Rye",
    author: "J.D. Salinger",
    genre: "Fiction",
    published_year: 1951,
    price: 8.99,
    in_stock: true,
    pages: 224,
    publisher: "Little, Brown and Company"
  },
  {
    title: "Pride and Prejudice",
    author: "Jane Austen",
    genre: "Romance",
    published_year: 1813,
    price: 7.99,
    in_stock: true,
    pages: 432,
    publisher: "T. Egerton, Whitehall"
  },
  {
    title: "The Lord of the Rings",
    author: "J.R.R. Tolkien",
    genre: "Fantasy",
    published_year: 1954,
    price: 19.99,
    in_stock: true,
    pages: 1178,
    publisher: "Allen & Unwin"
  },
  {
    title: "Animal Farm",
    author: "George Orwell",
    genre: "Political Satire",
    published_year: 1945,
    price: 8.50,
    in_stock: false,
    pages: 112,
    publisher: "Secker & Warburg"
  },
  {
    title: "The Alchemist",
    author: "Paulo Coelho",
    genre: "Fiction",
    published_year: 1988,
    price: 10.99,
    in_stock: true,
    pages: 197,
    publisher: "HarperOne"
  },
  {
    title: "Moby Dick",
    author: "Herman Melville",
    genre: "Adventure",
    published_year: 1851,
    price: 12.50,
    in_stock: false,
    pages: 635,
    publisher: "Harper & Brothers"
  },
  {
    title: "Wuthering Heights",
    author: "Emily Brontë",
    genre: "Gothic Fiction",
    published_year: 1847,
    price: 9.99,
    in_stock: true,
    pages: 342,
    publisher: "Thomas Cautley Newby"
  }
]);


// Task 2: Basic CRUD


// Find all books in a specific genre
print("Fiction Books:");
printjson(db.books.find({ genre: "Fiction" }).toArray());

// Find books published after a certain year
print("Books published after 1950:");
printjson(db.books.find({ published_year: { $gt: 1950 } }).toArray());

// Find books by a specific author
print("Books by George Orwell:");
printjson(db.books.find({ author: "George Orwell" }).toArray());

// Update the price of a specific book
db.books.updateOne({ title: "The Hobbit" }, { $set: { price: 17.99 } });

// Delete a book by its title
db.books.deleteOne({ title: "Moby Dick" });


// Task 3: Advanced Queries


// Books in stock and published after 2010
print("Books in stock and published after 2010:");
printjson(db.books.find({ in_stock: true, published_year: { $gt: 2010 } }).toArray());

// Projection: only title, author, and price
print("Projection (title, author, price):");
printjson(db.books.find({}, { title: 1, author: 1, price: 1, _id: 0 }).toArray());

// Sort by price ascending
print("Books sorted by price ASC:");
printjson(db.books.find().sort({ price: 1 }).toArray());

// Sort by price descending
print("Books sorted by price DESC:");
printjson(db.books.find().sort({ price: -1 }).toArray());

// Pagination (5 books per page)
print("Page 1 (first 5):");
printjson(db.books.find().skip(0).limit(5).toArray());
print("Page 2 (next 5):");
printjson(db.books.find().skip(5).limit(5).toArray());


// Task 4: Aggregation Pipeline


// Average price by genre
print("Average price by genre:");
printjson(db.books.aggregate([{ $group: { _id: "$genre", avgPrice: { $avg: "$price" } } }]).toArray());

// Author with most books
print("Author with most books:");
printjson(
  db.books.aggregate([
    { $group: { _id: "$author", totalBooks: { $sum: 1 } } },
    { $sort: { totalBooks: -1 } },
    { $limit: 1 }
  ]).toArray()
);

// Group books by publication decade
print("Books grouped by decade:");
printjson(
  db.books.aggregate([
    {
      $group: {
        _id: { $concat: [ { $substr: ["$published_year", 0, 3] }, "0s" ] },
        count: { $sum: 1 }
      }
    },
    { $sort: { _id: 1 } }
  ]).toArray()
);


// Task 5: Indexing


// Create index on title
db.books.createIndex({ title: 1 });

// Create compound index on author + published_year
db.books.createIndex({ author: 1, published_year: -1 });

// Explain query performance
print("Explain output for indexed query:");
printjson(db.books.find({ title: "1984" }).explain("executionStats"));

print("\nMongoDB Shell script completed!"); 