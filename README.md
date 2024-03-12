# Article Summarizer

Article Summarizer is a web application that utilizes the RapidAPI to extract news or article bodies from URLs and then uses GPT to summarize them. It helps users to quickly grasp the essence of complex news and articles without having to read through the entire content.

## Features

- Extracts news or article bodies from URLs.
- Summarizes the content using GPT.
- Provides summarized content to users.
- User-friendly interface.

## Getting Started

To get started with the project, follow these steps:

1. Clone the repository.
2. Install dependencies using `npm install`.
3. Create a `.env` file in the root directory of the project.
4. Add your RapidAPI key to the `.env` file:
   VITE_RAPID_API_ARTICLE_KEY=YOUR_RAPIDAPI_KEY
   Replace `YOUR_RAPIDAPI_KEY` with your actual RapidAPI key.
5. Start the development server using `npm run dev`.
