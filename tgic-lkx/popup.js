// document.getElementById('copy-button').addEventListener('click', async () => {
//   try {
//     // Thực thi nội dung trong 'copy-content.js' trên tab hiện tại
//     await chrome.scripting.executeScript({
//       target: { tabId: (await getActiveTab()).id }, // Lấy tab ID của tab đang hoạt động
//       files: ['copy-content.js'], // File content script cần chạy

//     });
//   } catch (error) {
//     console.error('Error executing content script:', error); // Log lỗi nếu xảy ra
//   }
// });

// async function getActiveTab() {
//   const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
//   return tab;
// }

document.getElementById("copy-button").addEventListener("click", async () => {
  try {
    const activeTab = await getActiveTab();

    // Inject file copy-content.js mỗi lần nhấn nút
    await chrome.scripting.executeScript({
      target: { tabId: activeTab.id },
      files: ["copy-content.js"], // Đảm bảo file được inject lại
    });

    // Gọi hàm copyNext() sau khi inject
    await chrome.scripting.executeScript({
      target: { tabId: activeTab.id },
      func: () => {
        if (typeof copyNext === "function") {
          copyNext();
        } else {
          console.error("Hàm copyNext không tồn tại trong content script.");
        }
      },
    });
  } catch (error) {
    console.error("Error executing content script:", error);
  }
});

async function getActiveTab() {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  return tab;
}
