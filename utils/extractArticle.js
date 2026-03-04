export function extractArticle() {
    // Extract readable text from the webpage
    // Remove navigation, ads, and unnecessary UI
    // Return clean article text
    // Limit result to first 3000 characters

    // Clone body to avoid modifying the real DOM directly
    const clone = document.body.cloneNode(true);

    // Remove common non-article tags
    const badTags = ['nav', 'header', 'footer', 'aside', 'script', 'style', 'iframe', 'noscript', 'button'];
    badTags.forEach(tag => {
        const elements = clone.querySelectorAll(tag);
        elements.forEach(el => el.remove());
    });

    // Get text content and clean up whitespace
    const text = clone.innerText || clone.textContent;
    const cleanText = text.replace(/\s+/g, ' ').trim();

    // Limit to first 3000 characters
    return cleanText.substring(0, 3000);
}
