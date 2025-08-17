// ==================== Quotes Data ====================
let quotes = JSON.parse(localStorage.getItem("quotes")) || [
    { text: "The best way to get started is to quit talking and begin doing.", category: "Motivation" },
    { text: "Don’t let yesterday take up too much of today.", category: "Inspiration" }
  ];
  
  // ==================== DOM Elements ====================
  const quoteDisplay = document.getElementById("quoteDisplay");
  const newQuoteBtn = document.getElementById("newQuote");
  
  // ==================== Functions ====================
  
  // Show Random Quote
  function showRandomQuote() {
    if (quotes.length === 0) {
      quoteDisplay.textContent = "No quotes available!";
      return;
    }
    const random = Math.floor(Math.random() * quotes.length);
    quoteDisplay.textContent = `"${quotes[random].text}" — ${quotes[random].category}`;
    sessionStorage.setItem("lastViewedQuote", JSON.stringify(quotes[random])); // optional session storage
  }
  
  // Create Add Quote Form (Required)
  function createAddQuoteForm() {
    const formDiv = document.createElement("div");
  
    const inputText = document.createElement("input");
    inputText.id = "newQuoteText";
    inputText.placeholder = "Enter a new quote";
  
    const inputCategory = document.createElement("input");
    inputCategory.id = "newQuoteCategory";
    inputCategory.placeholder = "Enter quote category";
  
    const addBtn = document.createElement("button");
    addBtn.textContent = "Add Quote";
    addBtn.onclick = addQuote;
  
    // Required → appendChild
    formDiv.appendChild(inputText);
    formDiv.appendChild(inputCategory);
    formDiv.appendChild(addBtn);
  
    document.body.appendChild(formDiv);
  }
  
  // Add Quote
  function addQuote() {
    const text = document.getElementById("newQuoteText").value.trim();
    const category = document.getElementById("newQuoteCategory").value.trim();
  
    if (text && category) {
      quotes.push({ text, category });
      localStorage.setItem("quotes", JSON.stringify(quotes));
      alert("Quote added successfully!");
    }
  }
  
  // Fetch Quotes From Server (Required)
  async function fetchQuotesFromServer() {
    try {
      const response = await fetch("https://jsonplaceholder.typicode.com/posts");
      const data = await response.json();
  
      // simulate merging server data (only first 3 posts for example)
      const serverQuotes = data.slice(0, 3).map(post => ({
        text: post.title,
        category: "Server"
      }));
  
      quotes.push(...serverQuotes);
      localStorage.setItem("quotes", JSON.stringify(quotes));
      console.log("Quotes synced from server!");
    } catch (error) {
      console.error("Error fetching from server", error);
    }
  }
  
  // ==================== Init ====================
  newQuoteBtn.addEventListener("click", showRandomQuote);
  createAddQuoteForm();
  showRandomQuote();
  