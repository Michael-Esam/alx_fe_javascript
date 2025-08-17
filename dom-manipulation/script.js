// Array of quotes
let quotes = [
    { text: "The best way to predict the future is to invent it.", category: "Motivation" },
    { text: "Life is what happens when you're busy making other plans.", category: "Life" },
    { text: "Happiness depends upon ourselves.", category: "Philosophy" },
  ];
  
  // Elements
  const quoteDisplay = document.getElementById("quoteDisplay");
  const newQuoteBtn = document.getElementById("newQuote");
  const addQuoteBtn = document.getElementById("addQuoteBtn");
  
  // Show random quote
  function showRandomQuote() {
    if (quotes.length === 0) {
      quoteDisplay.textContent = "No quotes available!";
      return;
    }
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const quote = quotes[randomIndex];
    quoteDisplay.textContent = `"${quote.text}" — [${quote.category}]`;
  }
  
  // Add a new quote dynamically
  function addQuote() {
    const newQuoteText = document.getElementById("newQuoteText").value.trim();
    const newQuoteCategory = document.getElementById("newQuoteCategory").value.trim();
  
    if (newQuoteText && newQuoteCategory) {
      quotes.push({ text: newQuoteText, category: newQuoteCategory });
  
      // clear inputs
      document.getElementById("newQuoteText").value = "";
      document.getElementById("newQuoteCategory").value = "";
  
      alert("Quote added successfully!");
    } else {
      alert("Please fill in both fields.");
    }
  }
  
  // Event listeners
  newQuoteBtn.addEventListener("click", showRandomQuote);
  addQuoteBtn.addEventListener("click", addQuote);
  