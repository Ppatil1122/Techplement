 // Function to fetch and display Quote of the Day
       
 async function fetchQuoteOfTheDay() {
    try {
        const response = await fetch('https://api.quotable.io/random');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        document.getElementById('dailyQuote').innerText = `"${data.content}"`;
        document.getElementById('quoteAuthor').innerText = data.author; // Set the author's name without the preceding "—"
    } catch (error) {
        console.error('Error fetching the quote of the day:', error);
        document.getElementById('dailyQuote').innerText = 'Error fetching the quote of the day. Please try again later.';
        document.getElementById('quoteAuthor').innerText = '';
    }
}

// Function to search quotes by author
async function searchQuotes() {
    const authorName = document.getElementById('authorName').value.trim();
    if (!authorName) {
        document.getElementById('results').innerHTML = '<p>Please enter an author name.</p>';
        return;
    }
    
    try {
        const response = await fetch(`https://api.quotable.io/quotes?author=${encodeURIComponent(authorName)}`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        const quotes = data.results.map(quote => `<p>"${quote.content}"</p><p>${quote.author}</p>`).join('');
        document.getElementById('results').innerHTML = quotes || '<p>No quotes found for this author.</p>';
    } catch (error) {
        console.error('Error fetching quotes:', error);
        document.getElementById('results').innerHTML = '<p>Error fetching quotes. Please try again later.</p>';
    }
}

// Fetch Quote of the Day when the page loads
document.addEventListener('DOMContentLoaded', fetchQuoteOfTheDay);