// Quotes array
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
    quoteDisplay.textContent = ""; // clear old text
    if (quotes.length === 0) {
      quoteDisplay.textContent = "No quotes available!";
      return;
    }
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const quote = quotes[randomIndex];
    quoteDisplay.textContent = `"${quote.text}" — [${quote.category}]`;
  }
  
  // Function: Add quote
  function addQuote() {
    const textInput = document.getElementById("newQuoteText");
    const categoryInput = document.getElementById("newQuoteCategory");
  
    const newQuoteText = textInput.value.trim();
    const newQuoteCategory = categoryInput.value.trim();
  
    if (newQuoteText && newQuoteCategory) {
      quotes.push({ text: newQuoteText, category: newQuoteCategory });
  
      // clear input fields
      textInput.value = "";
      categoryInput.value = "";
      alert("New quote added!");
    }
  }
  
  // Function: Create Add Quote Form dynamically
  function createAddQuoteForm() {
    const formContainer = document.createElement("div");
  
    const textInput = document.createElement("input");
    textInput.id = "newQuoteText";
    textInput.type = "text";
    textInput.placeholder = "Enter a new quote";
  
    const categoryInput = document.createElement("input");
    categoryInput.id = "newQuoteCategory";
    categoryInput.type = "text";
    categoryInput.placeholder = "Enter quote category";
  
    const addButton = document.createElement("button");
    addButton.textContent = "Add Quote";
    addButton.addEventListener("click", addQuote);
  
    formContainer.appendChild(textInput);
    formContainer.appendChild(categoryInput);
    formContainer.appendChild(addButton);
  
    document.body.appendChild(formContainer);
  }
  
  // Event listeners
  newQuoteBtn.addEventListener("click", showRandomQuote);
  
  // Call to create the form dynamically
  createAddQuoteForm();
  