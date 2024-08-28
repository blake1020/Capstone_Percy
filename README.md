This Percy Jackson Series is designed to show the character, mythical creatures and book covers and summary. There is also a page that allows users to view, submit, edit, and delete reviews for individual books and the series overall. It features a homepage showcasing a selection of books, a character page, and a page to view reviews by each book. This README provides an overview of the project, its components, and how to set it up.

Features

1. Homepage
   Display of Featured Books: The homepage showcases a selection of books. Each book entry includes a summary of the book, giving users a brief overview of its content.
   Book Summaries: Summaries provide insights into the plot and key themes of the featured books.
2. Reviews Page
   View Reviews: Displays a list of reviews for all books. Each review includes the reviewer's name, rating, and content.
   Submit Reviews: Users can submit new reviews by filling out a form with their name, rating, and review content.
   Edit Reviews: Users can edit existing reviews. The form updates the review content for a selected review.
   Delete Reviews: Users can delete reviews from the list, which also removes them from the database.
3. Book-Specific Reviews Page
   View Reviews by Book: This page allows users to view all reviews associated with a specific book. Each book's reviews are listed with the reviewer's name, rating, and review content.
   Submit Book-Specific Reviews: Users can submit reviews directly for a specific book from this page.
   Update Reviews for a Book: Users can edit or delete reviews for a particular book.
4. Character Page
   Character Details: Provides detailed information about characters from the books. This page is designed to give users deeper insights into the characters featured in the book series.
5. Mythical Creatures Page
   Mythical Creatures Information: This page is intended to provide information about mythical creatures featured in the book series. (Note: This page is currently under development and may not be functional yet.)
   Setup
   Prerequisites
   Node.js: Ensure you have Node.js installed. You can download it from Node.js official website.
   MongoDB: The application uses MongoDB for data storage. Make sure you have MongoDB installed and running.

API Endpoints
GET /reviews: Fetches a list of all reviews.
POST /reviews: Submits a new review.
PATCH /reviews/:id: Updates a review by ID.
DELETE /reviews/:id: Deletes a review by ID.
GET /books: Fetches a list of books.
GET /books/:id: Fetches details of a specific book by ID.
GET /books/:id/reviews: Fetches reviews for a specific book by ID.
GET /characters: Fetches a list of characters.

had a few issues with the logic of the reviews by book page
so made a seperate page for all reviews also
