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
    changeInfo.status === "complete" &&
    tab.url &&
    /^https:\/\/www\.thegioiic\.com\/console-admin\/products\/\d+\/edit$/.test(
      tab.url
    ) // Kiểm tra URL
  ) {
    // Tiêm file copy-content.js mỗi khi trang hoàn tất tải
    chrome.scripting.executeScript(
      {
        target: { tabId: tabId },
        files: ["copy-content.js"],
      },
      () => {
        console.log("Đã tiêm copy-content.js vào trang.");

        // Gọi trực tiếp hàm insertButton
        chrome.scripting.executeScript({
          target: { tabId: tabId },
          func: () => {
            // Hàm chèn button
            // Tìm phần tử `.crumb li:last-child a`
            const targetElement = document.querySelector(
              ".crumb li:last-child a"
            );

            if (targetElement) {
              // Kiểm tra xem nút đã được chèn chưa để tránh chèn trùng
              if (!document.querySelector(".btn-copy-all")) {
                // Tạo button
                const button = document.createElement("button");
                button.textContent = "Copy all";
                button.style.marginLeft = "10px";
                button.className = "btn-copy-all btn-primary";
                button.title =
                  "Nhấn Window + V để xem các nội dung được sao chép";

                // Gắn sự kiện click để chạy hàm copyNext
                button.addEventListener("click", () => {
                  index = 0; // Đặt lại giá trị index về 0
                  copyNext(); // Gọi hàm copyNext để bắt đầu sao chép
                  console.log("Hàm copyNext đã được gọi.");
                });

                // Chèn button vào sau phần tử được chọn
                targetElement.parentNode.appendChild(button);
                console.log("Button đã được chèn vào thành công.");
              }
            } else {
              console.error("Không tìm thấy phần tử `.crumb li:last-child a`.");
            }
          },
        });
      }
    );
  } 
  if (
    changeInfo.status === "complete" && // Chỉ chạy khi trang tải xong
    tab.url &&
    tab.url.startsWith("https://www.thegioiic.com/")
  ) {
    // Tiêm file copy-content.js mỗi khi trang hoàn tất tải
    chrome.scripting.executeScript(
      {
        target: { tabId: tabId },
        files: ["copy-content.js"],
      },
      () => {

        // Gọi trực tiếp hàm insertButton
        chrome.scripting.executeScript({
          target: { tabId: tabId },
          func: () => {
            // Hàm chèn button
            // Tìm phần tử `.crumb li:last-child a`
            const targetElement = document.querySelector(
              ".crumb li:last-child a"
            );

            if (targetElement) {
              // Kiểm tra xem nút đã được chèn chưa để tránh chèn trùng
              if (!document.querySelector(".btn-copy-all")) {
                // Tạo button
                const button = document.createElement("button");
                button.textContent = "Copy all";
                button.style.marginLeft = "10px";
                button.className = "btn-copy-all btn-primary";
                button.title =
                  "Nhấn Window + V để xem các nội dung được sao chép";

                // Gắn sự kiện click để chạy hàm copyNext
                button.addEventListener("click", () => {
                  index = 0; // Đặt lại giá trị index về 0
                  copyNext(); // Gọi hàm copyNext để bắt đầu sao chép
                  console.log("Hàm copyNext đã được gọi.");
                });

                // Chèn button vào sau phần tử được chọn
                targetElement.parentNode.appendChild(button);
                console.log("Button đã được chèn vào thành công.");
              }
            } else {
              console.error("Không tìm thấy phần tử `.crumb li:last-child a`.");
            }
          },
        });
      }
    );
  } 
  else if (
    changeInfo.status === "complete" && // Chỉ chạy khi trang tải xong
    tab.url &&
    tab.url === "https://www.thegioiic.com/console-admin/orders" // Kiểm tra chính xác URL
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
              if (typeof addClassStyleStatus() === "function") {
                addClassStyleStatus();
                console.log(
                  `addClassStyleStatus đang chạy, lần thứ ${count + 1}`
                );
              } else {
                console.error(
                  "Hàm addClassStyleStatus hoặc addButtonsTgic không tồn tại trong content.js"
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
    tab.url.startsWith("https://www.thegioiic.com/console-admin/orders")
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
                console.log(
                  `addClassStyleStatus đang chạy, lần thứ ${count + 1}`
                );
              } else {
                console.error(
                  "Hàm addClassStyleStatus hoặc addButtonsTgic không tồn tại trong content.js"
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
