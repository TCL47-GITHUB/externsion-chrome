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

// document.getElementById("tabEditContent").addEventListener("click", () => {
//   chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
//     chrome.scripting.executeScript({
//       target: { tabId: tabs[0].id },
//       function: () => {
//         // Click vào tab chỉnh sửa
//         const element = document.querySelector("li[data-id='tabEditContent']");
//         if (element) element.click();

//         // Tìm input cần chỉnh sửa
//         const inputField = document.querySelector(
//           "input[name='product_tab[title_en]']"
//         );
//         if (inputField && inputField.value === "Refer") {
//           // Cập nhật giá trị
//           inputField.value = "Reference";

//           // Kích hoạt sự kiện input & change để cập nhật giao diện
//           inputField.dispatchEvent(new Event("input", { bubbles: true }));
//           inputField.dispatchEvent(new Event("change", { bubbles: true }));

//           // Mô phỏng sự kiện nhấn phím Enter
//           inputField.dispatchEvent(
//             new KeyboardEvent("keydown", { key: "Enter", bubbles: true })
//           );
//           inputField.dispatchEvent(
//             new KeyboardEvent("keypress", { key: "Enter", bubbles: true })
//           );
//           inputField.dispatchEvent(
//             new KeyboardEvent("keyup", { key: "Enter", bubbles: true })
//           );
//         }
//       },
//     });
//   });
// });

chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
  chrome.scripting.executeScript({
      target: { tabId: tabs[0].id },
      function: () => {
          // Click vào tab chỉnh sửa
          const element = document.querySelector("li[data-id='tabEditContent']");
          if (element) element.click();

          // Tìm input cần chỉnh sửa
          const inputField = document.querySelector("input[name='product_tab[title_en]']");
          if (inputField && inputField.value === "Refer") {
              // Click vào input để kích hoạt focus
              inputField.click();
              
              // Đợi 100ms rồi focus vào input
              setTimeout(() => {
                  inputField.focus();
                  
                  // Đặt giá trị mới
                  inputField.value = "Reference";

                  // Tạo & kích hoạt sự kiện input & change để cập nhật giao diện
                  inputField.dispatchEvent(new Event('input', { bubbles: true }));
                  inputField.dispatchEvent(new Event('change', { bubbles: true }));

                  // Mô phỏng sự kiện nhấn Enter để lưu
                  setTimeout(() => {
                      inputField.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }));
                      inputField.dispatchEvent(new KeyboardEvent('keypress', { key: 'Enter', bubbles: true }));
                      inputField.dispatchEvent(new KeyboardEvent('keyup', { key: 'Enter', bubbles: true }));
                  }, 200);
              }, 100);
          }
      }
  });
});

