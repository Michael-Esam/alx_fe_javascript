let quotes = JSON.parse(localStorage.getItem("quotes")) || [
    { text: "Stay hungry, stay foolish.", category: "Motivation" },
    { text: "Knowledge is power.", category: "Wisdom" }
  ];
  
  let lastViewed = sessionStorage.getItem("lastQuote") || null;
  
  function saveQuotes() {
    localStorage.setItem("quotes", JSON.stringify(quotes));
  }
  
  function showRandomQuote() {
    let category = document.getElementById("categoryFilter").value;
    let filtered = category === "all" ? quotes : quotes.filter(q => q.category === category);
    
    if (filtered.length === 0) {
      document.getElementById("quoteDisplay").innerHTML = "No quotes available.";
      return;
    }
  
    let randomQuote = filtered[Math.floor(Math.random() * filtered.length)];
    document.getElementById("quoteDisplay").innerHTML = `<p><b>${randomQuote.text}</b> <br> <i>(${randomQuote.category})</i></p>`;
    
    sessionStorage.setItem("lastQuote", JSON.stringify(randomQuote));
  }
  
  document.getElementById("newQuote").addEventListener("click", showRandomQuote);
  
  function addQuote() {
    let text = document.getElementById("newQuoteText").value.trim();
    let category = document.getElementById("newQuoteCategory").value.trim();
  
    if (text && category) {
      quotes.push({ text, category });
      saveQuotes();
      populateCategories();
      document.getElementById("newQuoteText").value = "";
      document.getElementById("newQuoteCategory").value = "";
      alert("Quote added!");
    }
  }
  
  function populateCategories() {
    let filter = document.getElementById("categoryFilter");
    let categories = [...new Set(quotes.map(q => q.category))];
  
    filter.innerHTML = `<option value="all">All Categories</option>`;
    categories.forEach(cat => {
      filter.innerHTML += `<option value="${cat}">${cat}</option>`;
    });
  
    let savedFilter = localStorage.getItem("selectedCategory");
    if (savedFilter) {
      filter.value = savedFilter;
    }
  }
  
  function filterQuotes() {
    let selected = document.getElementById("categoryFilter").value;
    localStorage.setItem("selectedCategory", selected);
    showRandomQuote();
  }
  
  function exportToJson() {
    const blob = new Blob([JSON.stringify(quotes, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
  
    const a = document.createElement("a");
    a.href = url;
    a.download = "quotes.json";
    a.click();
  
    URL.revokeObjectURL(url);
  }
  
  function importFromJsonFile(event) {
    const fileReader = new FileReader();
    fileReader.onload = function(e) {
      const importedQuotes = JSON.parse(e.target.result);
      quotes.push(...importedQuotes);
      saveQuotes();
      populateCategories();
      alert("Quotes imported successfully!");
    };
    fileReader.readAsText(event.target.files[0]);
  }
  
  populateCategories();
  if (lastViewed) {
    let q = JSON.parse(lastViewed);
    document.getElementById("quoteDisplay").innerHTML = `<p><b>${q.text}</b> <br> <i>(${q.category})</i></p>`;
  }
  