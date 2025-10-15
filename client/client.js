    window.onload = () => {
  // Collapsible sections
  document.querySelectorAll(".collapsible").forEach((header) => {
    header.addEventListener("click", () => {
      document.querySelectorAll(".content").forEach((content) => {
        if (content !== header.nextElementSibling) content.style.display = "none";
      });
      const content = header.nextElementSibling;
      content.style.display = content.style.display === "block" ? "none" : "block";
    });
  });

  // Form submission
  document.querySelectorAll("form").forEach((form) => {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const formData = new FormData(form);
      const params = new URLSearchParams(formData).toString();
      const method = form.querySelector('input[name="method"]:checked')?.value || form.dataset.method;
      const endpoint = form.dataset.endpoint + (params && method !== "POST" ? `?${params}` : "");
      const resultBox = form.nextElementSibling;

      fetch(endpoint, {
        method,
        headers: method === "POST" ? { "Content-Type": "application/json" } : undefined,
        body: method === "POST" ? JSON.stringify(Object.fromEntries(formData)) : undefined,
      })
        .then((res) => {
          const status = `Status: ${res.status}\nContent-Length: ${res.headers.get("Content-Length")}`;
          if (res.ok) {
            if (method !== "HEAD") {
              return res.text().then((text) => {
                if (text.length > 300) text = text.substring(0, 300) + "...";
                resultBox.textContent = `${status}\nResponse: ${text}`;
              });
            } else {
              resultBox.textContent = status;
            }
          } else {
            return res.text().then((text) => {
              resultBox.textContent = `${status}\nError: ${text}`;
              throw new Error(text);
            });
          }
        })
        .catch((err) => {
          if (!resultBox.textContent.includes("Status:")) {
            resultBox.textContent = "Error: " + err.message;
          }
        });
    });
  });
};