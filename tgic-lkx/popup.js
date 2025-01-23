// document.getElementById('copy-button').addEventListener('click', async () => {
//   try {
//     // Thực thi nội dung trong 'copy-content.js' trên tab hiện tại
//     await chrome.scripting.executeScript({
//       target: { tabId: (await getActiveTab()).id }, // Lấy tab ID của tab đang hoạt động
//       files: ['copy-content.js'] // File content script cần chạy
//     });
//   } catch (error) {
//     console.error('Error executing content script:', error); // Log lỗi nếu xảy ra
//   }
// });

// async function getActiveTab() {
//   const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
//   return tab;
// }


document.getElementById('copy-button').addEventListener('click', async () => {
  try {
    // Thực thi hàm copyNext() trong file 'copy-content.js' trên tab hiện tại
    await chrome.scripting.executeScript({
      target: { tabId: (await getActiveTab()).id }, // Lấy tab ID của tab đang hoạt động
      func: () => {
        if (typeof copyNext === 'function') {
          copyNext(); // Gọi hàm copyNext() nếu tồn tại
        } else {
          console.error('Hàm copyNext không tồn tại trong content script.');
        }
      }
    });
  } catch (error) {
    console.error('Error executing content script:', error); // Log lỗi nếu xảy ra
  }
});

async function getActiveTab() {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  return tab;
}
