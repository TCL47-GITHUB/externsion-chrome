// chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
//     if (changeInfo.url && tab.url.startsWith("https://www.thegioiic.com/console-admin")) {
//       chrome.scripting.executeScript({
//         target: { tabId: tabId },
//         files: ['content.js']
//     }, () => {
//         // Gọi hàm addButtonsTgic sau khi content.js được tiêm vào
//         chrome.scripting.executeScript({
//             target: { tabId: tabId },
//             func: () => {
//                 if (typeof addButtonsTgic === 'function') {
//                     addButtonsTgic();
//                     console.log("addButtons dang chay");
//                 } else {
//                     console.error("Hàm addButtonsTgic không tồn tại trong content.js");
//                 }
//             }
//         });
//     });
// }
// });
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (
    changeInfo.status === "complete" && // Chỉ chạy khi trang tải xong
    tab.url &&
    /^https:\/\/www\.thegioiic\.com\/console-admin\/products\/\d+\/edit$/.test(tab.url) // Kiểm tra URL với số bất kỳ
  ) {
    // Tiêm file content.js
    chrome.scripting.executeScript(
      {
        target: { tabId: tabId },
        files: ["copy-content.js"],
      },
      () => {
        // Sau khi tiêm content.js, gọi hàm insertButton
        chrome.scripting.executeScript({
          target: { tabId: tabId },
          func: () => {
            insertButton();
          },
        });
      }
    );
  }
   else if (
    changeInfo.status === "complete" && // Chỉ chạy khi trang tải xong
    tab.url &&
    tab.url.startsWith("https://www.thegioiic.com/console-admin")
  ) {
    // Tiêm file content.js
    chrome.scripting.executeScript(
      {
        target: { tabId: tabId },
        files: ["content.js"],
      },
      () => {
        // Sau khi tiêm content.js, gọi hàm addButtonsTgic lặp lại 2 lần
        chrome.scripting.executeScript({
          target: { tabId: tabId },
          func: () => {
            let count = 0; // Khởi tạo bộ đếm
            const maxRepeats = 2; // Số lần lặp tối đa
            // insertButton();
            const intervalId = setInterval(() => {
              if (typeof addButtonsTgic === "function") {
                addButtonsTgic();

                console.log(`addButtonsTgic đang chạy, lần thứ ${count + 1}`);
              } else {
                console.error(
                  "Hàm addButtonsTgic không tồn tại trong content.js"
                );
              }

              count++;
              if (count >= maxRepeats) {
                clearInterval(intervalId); // Dừng lặp sau khi đạt số lần mong muốn
                console.log("Đã hoàn thành lặp 2 lần.");
              }
            }, 1000); // Lặp lại mỗi giây
          },
        });
      }
    );
  } else if (
    changeInfo.status === "complete" && // Chỉ chạy khi trang tải xong
    tab.url &&
    tab.url.startsWith("https://admin.linhkienx.com/")
  ) {
    // Tiêm file content.js
    chrome.scripting.executeScript(
      {
        target: { tabId: tabId },
        files: ["content.js"],
      },
      () => {
        // Sau khi tiêm content.js, gọi hàm addButtonsTgic lặp lại 2 lần
        chrome.scripting.executeScript({
          target: { tabId: tabId },
          func: () => {
            let count = 0; // Khởi tạo bộ đếm
            const maxRepeats = 2; // Số lần lặp tối đa

            const intervalId = setInterval(() => {
              if (typeof addButtonsLkx === "function") {
                addButtonsLkx();
                console.log(`addButtonsLkx đang chạy, lần thứ ${count + 1}`);
              } else {
                console.error(
                  "Hàm addButtonsLkx không tồn tại trong content.js"
                );
              }

              count++;
              if (count >= maxRepeats) {
                clearInterval(intervalId); // Dừng lặp sau khi đạt số lần mong muốn
                console.log("Đã hoàn thành lặp 2 lần.");
              }
            }, 1000); // Lặp lại mỗi giây
          },
        });
      }
    );
  }
});
