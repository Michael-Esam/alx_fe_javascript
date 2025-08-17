// ==================== Quotes Data ====================
let quotes = JSON.parse(localStorage.getItem("quotes")) || [
    { text: "The best way to get started is to quit talking and begin doing.", category: "Motivation" },
    { text: "Don’t let yesterday take up too much of today.", category: "Inspiration" }
  ];
  
  // ==================== DOM Elements ====================
  const quoteDisplay = document.getElementById("quoteDisplay");
  const newQuoteBtn = document.getElementById("newQuote");
  
  // Category Filter (Required)
  const categoryFilter = document.createElement("select");
  categoryFilter.id = "categoryFilter";
  document.body.appendChild(categoryFilter);
  
  // ==================== Functions ====================
  
  // Show Random Quote
  function showRandomQuote() {
    let filteredQuotes = quotes;
  
    // Apply category filter if selected
    const selectedCategory = categoryFilter.value;
    if (selectedCategory !== "All" && selectedCategory) {
      filteredQuotes = quotes.filter(q => q.category === selectedCategory);
    }
  
    if (filteredQuotes.length === 0) {
      quoteDisplay.textContent = "No quotes available for this category!";
      return;
    }
  
    const random = Math.floor(Math.random() * filteredQuotes.length);
    quoteDisplay.textContent = `"${filteredQuotes[random].text}" — ${filteredQuotes[random].category}`;
    sessionStorage.setItem("lastViewedQuote", JSON.stringify(filteredQuotes[random]));
  }
  
  // ✅ Filter Quote Function 
  function filterQuote() {
    const selectedCategory = categoryFilter.value;
    let filteredQuotes = [];
  
    if (selectedCategory === "All") {
      filteredQuotes = quotes;
    } else {
      filteredQuotes = quotes.filter((q) => q.category === selectedCategory);
    }
  
    quoteDisplay.innerHTML = ""; //
  
    if (filteredQuotes.length > 0) {
      const randomQuote =
        filteredQuotes[Math.floor(Math.random() * filteredQuotes.length)];
      quoteDisplay.textContent = `"${randomQuote.text}" — ${randomQuote.category}`;
    } else {
      quoteDisplay.textContent = "No quotes found for this category!";
    }
  }
  
  // Create Add Quote Form
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
      const newQ = { text, category };
      quotes.push(newQ);
      localStorage.setItem("quotes", JSON.stringify(quotes));
      alert("Quote added successfully!");
      populateCategories(); // update filter options
  
      // Required POST request
      fetch("https://jsonplaceholder.typicode.com/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newQ)
      })
        .then(res => res.json())
        .then(data => console.log("Sent to server:", data))
        .catch(err => console.error("Error sending to server:", err));
    }
  }
  
  // Populate Categories (Required)
  function populateCategories() {
    categoryFilter.innerHTML = ""; // reset
  
    const allOption = document.createElement("option");
    allOption.value = "All";
    allOption.textContent = "All Categories";
    categoryFilter.appendChild(allOption);
  
    const uniqueCategories = [...new Set(quotes.map(q => q.category))];
    uniqueCategories.forEach(cat => {
      const opt = document.createElement("option");
      opt.value = cat;
      opt.textContent = cat;
      categoryFilter.appendChild(opt);
    });
  }
  
  // Fetch Quotes From Server
  async function fetchQuotesFromServer() {
    try {
      const response = await fetch("https://jsonplaceholder.typicode.com/posts");
      const data = await response.json();
  
      const serverQuotes = data.slice(0, 3).map(post => ({
        text: post.title,
        category: "Server"
      }));
  
      quotes.push(...serverQuotes);
      localStorage.setItem("quotes", JSON.stringify(quotes));
      populateCategories();
      console.log("Quotes synced from server!");
    } catch (error) {
      console.error("Error fetching from server", error);
    }
  }
  
  // ==================== Sync Quotes with Server ====================
  function syncQuotes() {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((response) => response.json())
      .then((serverQuotes) => {
  
        quotes = serverQuotes.map((item) => ({
          text: item.title,
          category: "Server",
        }));
        localStorage.setItem("quotes", JSON.stringify(quotes));
        showRandomQuote();
        console.log("Quotes synced with server!"); // 
      })
      .catch((error) => console.error("Error syncing quotes:", error));
  }
  
  // Run sync automatically every 30 seconds
  setInterval(syncQuotes, 30000);
  
  // ==================== Init ====================
  newQuoteBtn.addEventListener("click", showRandomQuote);
  categoryFilter.addEventListener("change", filterQuote);
  
  createAddQuoteForm();
  populateCategories();
  showRandomQuote();
  
  