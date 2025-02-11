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
      // // Click vào tab chỉnh sửa
      // const element = document.querySelector("li[data-id='tabEditContent']");
      // if (element) element.click();
      // Click vào thẻ <li> có nội dung "Thẻ sản phẩm"
      const element = Array.from(document.querySelectorAll("li")).find(
        (li) => li.textContent.trim() === "Thẻ sản phẩm"
      );
      if (element) element.click();

      // Hàm cập nhật nội dung trong iframe
      const updateIframeContent = (iframeId, newContent) => {
        const iframe = document.getElementById(iframeId);
        if (iframe && iframe.contentDocument) {
          const body = iframe.contentDocument.body;
          if (body) {
            body.innerHTML = newContent;
            console.log(`Updated content in ${iframeId}`);
          }
        }
      };

      // Nội dung mới cho từng iframe
      const content1 = `<ul>
              <li><a href="https://www.thegioiic.com/tin-tuc/dien-tro-dan-smd" target="_blank" rel="noopener">
                Cách đọc điện trở dán SMD</a></li>
            </ul>`;

      const content2 = `<ul>
              <li><a href="https://www.thegioiic.com/tin-tuc/dien-tro-dan-smd" target="_blank" rel="noopener">
                How to read SMD paste resistor code</a></li>
            </ul>`;


      // Cập nhật nội dung trong hai iframe
      updateIframeContent("mce_5_ifr", content1);
      updateIframeContent("mce_6_ifr", content2);

      updateIframeContent("mce_17_ifr", content1);
      updateIframeContent("mce_18_ifr", content2);
      // Tìm input cần chỉnh sửa
      const inputField = document.querySelector(
        "input[name='product_tab[title_en]']"
      );
      const inputFieldLKX = document.querySelector("input[name='title_en']");
      if (
        (inputField && inputField.value === "Refer") ||
        (inputField && inputField.value === "Reference") ||
        (inputFieldLKX && inputFieldLKX.value === "Refer") ||
        (inputFieldLKX && inputFieldLKX.value === "Reference")
      ) {
        // Click vào input để kích hoạt focus
        inputField.click();
        inputField.focus();

        inputFieldLKX.click();
        inputFieldLKX.focus();
        // Đợi 100ms rồi focus vào input
        setTimeout(() => {
          inputField.focus();
          inputFieldLKX.focus();
          // Đặt giá trị mới
          inputField.value = "Reference";
          inputFieldLKX.value = "Reference";

          // Tạo & kích hoạt sự kiện input & change để cập nhật giao diện
          inputField.dispatchEvent(new Event("input", { bubbles: true }));
          inputField.dispatchEvent(new Event("change", { bubbles: true }));

          inputFieldLKX.dispatchEvent(new Event("input", { bubbles: true }));
          inputFieldLKX.dispatchEvent(new Event("change", { bubbles: true }));

          // Mô phỏng sự kiện nhấn Enter để lưu
          setTimeout(() => {
            inputField.focus();
            inputField.dispatchEvent(
              new KeyboardEvent("keydown", { key: "Enter", bubbles: true })
            );
            inputField.dispatchEvent(
              new KeyboardEvent("keypress", { key: "Enter", bubbles: true })
            );
            inputField.dispatchEvent(
              new KeyboardEvent("keyup", { key: "Enter", bubbles: true })
            );
            console.log("Input field value:", inputField.value);
          }, 200);
        }, 100);
      }
    },
  });
});

// chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
//   chrome.scripting.executeScript({
//     target: { tabId: tabs[0].id },
//     function: () => {
//       // Hàm cập nhật nội dung trong iframe
//       const updateIframeContent = (iframeId, newContent) => {
//         const iframe = document.getElementById(iframeId);
//         if (iframe && iframe.contentDocument) {
//           const body = iframe.contentDocument.body;
//           if (body) {
//             body.innerHTML = newContent;
//             console.log(`Updated content in ${iframeId}`);
//           }
//         }
//       };

//       // Nội dung mới cho từng iframe
//       const content1 = `<ul>
//         <li><a href="https://www.thegioiic.com/tin-tuc/dien-tro-dan-smd" target="_blank" rel="noopener">
//           Cách đọc điện trở dán SMD</a></li>
//       </ul>`;

//       const content2 = `<ul>
//         <li><a href="https://www.thegioiic.com/tin-tuc/dien-tro-dan-smd" target="_blank" rel="noopener">
//           How to read SMD paste resistor code</a></li>
//       </ul>`;

//       // Cập nhật nội dung trong hai iframe
//       updateIframeContent("mce_17_ifr", content1);
//       updateIframeContent("mce_18_ifr", content2);
//     },
//   });
// });
