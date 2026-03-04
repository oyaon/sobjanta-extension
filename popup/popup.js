import { extractArticle } from '../utils/extractArticle.js';
import { analyzeText } from '../utils/aiClient.js';

document.addEventListener('DOMContentLoaded', () => {
  const explainBtn = document.getElementById('explainBtn');
  const statusEl = document.getElementById('status');

  explainBtn.addEventListener('click', async () => {
    try {
      statusEl.textContent = 'Detecting active tab...';

      // 1. Detect active tab
      const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
      if (!tab) {
        statusEl.textContent = 'No active tab found.';
        return;
      }

      statusEl.textContent = 'Extracting page text...';

      // 2. Inject extraction script and 3. Call extractArticle()
      const injectionResults = await chrome.scripting.executeScript({
        target: { tabId: tab.id },
        func: extractArticle
      });

      if (!injectionResults || !injectionResults[0] || !injectionResults[0].result) {
        statusEl.textContent = 'Failed to extract text.';
        return;
      }

      const extractedText = injectionResults[0].result;
      console.log(`Extracted text successfully (${extractedText.length} characters).`);

      statusEl.textContent = 'Analyzing text with AI...';

      // 4. Send text to aiClient
      const aiResponse = await analyzeText(extractedText);

      // 5. Log structured AI output in the console
      console.log("--- SobJanta AI Analysis ---");
      console.log("Topic:", aiResponse.topic);
      console.log("Summary:", aiResponse.summary);
      console.log("Key Points:");
      aiResponse.key_points.forEach(kp => console.log(` - ${kp}`));
      console.log("----------------------------");

      statusEl.textContent = 'Analysis complete. Check Console.';

    } catch (err) {
      console.error("Error during extraction:", err);
      statusEl.textContent = 'An error occurred. Check Console.';
    }
  });
});
