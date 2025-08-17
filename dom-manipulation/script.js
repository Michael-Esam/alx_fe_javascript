// Array of quotes
let quotes = [
    { text: "The best way to predict the future is to invent it.", category: "Motivation" },
    { text: "Life is what happens when you're busy making other plans.", category: "Life" },
    { text: "Happiness depends upon ourselves.", category: "Philosophy" },
  ];
  
  // Elements
  const quoteDisplay = document.getElementById("quoteDisplay");
  const newQuoteBtn = document.getElementById("newQuote");
  
  // Function: Show random quote
  function showRandomQuote() {
    if (quotes.length === 0) {
      quoteDisplay.innerHTML = "<p>No quotes available!</p>";
      return;
    }
  
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const quote = quotes[randomIndex];
  
    quoteDisplay.innerHTML = `<p>"${quote.text}" — [${quote.category}]</p>`;
  }
  
  // Function: Add new quote
  function addQuote() {
    const textInput = document.getElementById("newQuoteText");
    const categoryInput = document.getElementById("newQuoteCategory");
  
    const newQuoteText = textInput.value.trim();
    const newQuoteCategory = categoryInput.value.trim();
  
    if (newQuoteText && newQuoteCategory) {
      quotes.push({ text: newQuoteText, category: newQuoteCategory });
  
      textInput.value = "";
      categoryInput.value = "";
      alert("New quote added!");
    }
  }
  
  // Function: Create Add Quote Form dynamically (with innerHTML)
  function createAddQuoteForm() {
    const formContainer = document.createElement("div");
    formContainer.innerHTML = `
      <input id="newQuoteText" type="text" placeholder="Enter a new quote" />
      <input id="newQuoteCategory" type="text" placeholder="Enter quote category" />
      <button id="addQuoteBtn">Add Quote</button>
    `;
  
    document.body.appendChild(formContainer);
  
    document.getElementById("addQuoteBtn").addEventListener("click", addQuote);
  }
  
  // Event listeners
  newQuoteBtn.addEventListener("click", showRandomQuote);
  
  // Build form when page loads
  createAddQuoteForm();
  