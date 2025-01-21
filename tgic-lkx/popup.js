document.getElementById('copy-button').addEventListener('click', async () => {
  try {
    await chrome.scripting.executeScript({
      target: { tabId: (await getActiveTab()).id },
      files: ['copy-content.js']
    });
  } catch (error) {
    console.error('Error executing content script:', error);
  }
});

async function getActiveTab() {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  return tab;
}
