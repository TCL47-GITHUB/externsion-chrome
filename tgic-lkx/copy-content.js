// Kiểm tra URL bắt đầu bằng "https://www.thegioiic.com/console-admin/products/"
if (
  window.location.href.startsWith(
    "https://www.thegioiic.com/console-admin/products/"
  )
) {
  // Danh sách các thẻ cần sao chép (bao gồm cả URL và thẻ <a> cuối cùng)
  const elements = [
    document.getElementById("name"),
    document.getElementById("name_en"),
    document.querySelector(".crumb li:last-child a"), // Thẻ <a> cuối cùng
    window.location.origin + ";https://linhkienx.com", // URL của trang web
    // document.getElementById('slug'),
  ];

  let index = 0; // Biến theo dõi phần tử hiện tại

  function copyNext() {
    if (index < elements.length) {
      const element = elements[index];
      let text = "";

      if (typeof element === "string") {
        // Trường hợp là URL (chuỗi tĩnh)
        text = element;
      } else if (element) {
        // Trường hợp là thẻ DOM
        if (element.tagName === "INPUT" || element.tagName === "TEXTAREA") {
          text = element.value; // Lấy value từ input hoặc textarea
        } else {
          text = element.innerText; // Lấy nội dung văn bản
        }
      } else {
        text = "No content"; // Trường hợp không tìm thấy thẻ
      }

      // Tạo textarea tạm thời để sao chép
      const textarea = document.createElement("textarea");
      textarea.value = text;
      document.body.appendChild(textarea);

      // Chọn nội dung và sao chép
      textarea.select();
      try {
        document.execCommand("copy");
        console.log(`Copied: ${text}`);
      } catch (err) {
        console.error("Error copying to clipboard:", err);
      }

      // Xoá textarea tạm thời
      document.body.removeChild(textarea);

      index++;
      setTimeout(copyNext, 300); // 300ms giữa các lần sao chép
    } else {
      alert("All content has been copied!");
      console.log("All content has been copied!");
    }
  }

  // Bắt đầu sao chép
  // copyNext();
} else if (
  window.location.href.startsWith("https://admin.linhkienx.com/products/")
) {
  // Danh sách các thẻ cần sao chép (bao gồm cả URL và thẻ <a> cuối cùng)
  const elements = [
    document.querySelector('input[name="name"]'),
    document.querySelector('input[name="name_en"]'),
    document.querySelector(".py-2 .flex.items-center.gap-2:last-child a"),
    window.location.origin + ";https://linhkienx.com", // URL của trang web

    // document.getElementById('slug'),
  ];

  let index = 0; // Biến theo dõi phần tử hiện tại

  function copyNext() {
    if (index < elements.length) {
      const element = elements[index];
      let text = "";

      if (typeof element === "string") {
        // Trường hợp là URL (chuỗi tĩnh)
        text = element;
      } else if (element) {
        // Trường hợp là thẻ DOM
        if (element.tagName === "INPUT" || element.tagName === "TEXTAREA") {
          text = element.value; // Lấy value từ input hoặc textarea
        } else {
          text = element.innerText; // Lấy nội dung văn bản
        }
      } else {
        text = "No content"; // Trường hợp không tìm thấy thẻ
      }

      // Tạo textarea tạm thời để sao chép
      const textarea = document.createElement("textarea");
      textarea.value = text;
      document.body.appendChild(textarea);

      // Chọn nội dung và sao chép
      textarea.select();
      try {
        document.execCommand("copy");
        console.log(`Copied: ${text}`);
      } catch (err) {
        console.error("Error copying to clipboard:", err);
      }

      // Xoá textarea tạm thời
      document.body.removeChild(textarea);

      index++;
      setTimeout(copyNext, 300); // 300ms giữa các lần sao chép
    } else {
      alert("All content has been copied!");
      console.log("All content has been copied!");
    }
  }

  // Bắt đầu sao chép
  // copyNext();
  console.log("URL does not match the required pattern. No content copied.");
}

// Hàm chèn button
function insertButton() {
  // Tìm phần tử `.crumb li:last-child a`
  const targetElement = document.querySelector(".crumb li:last-child a");

  if (targetElement) {
    // Tạo button
    const button = document.createElement("button");
    button.textContent = "Copy all";
    button.style.marginLeft = "10px";
    // button.style.padding = '5px 10px';
    // button.style.cursor = 'pointer';
    // button.style.border = '1px solid #ccc';
    // button.style.backgroundColor = '#007bff';
    // button.style.color = '#fff';
    // button.style.borderRadius = '4px';
    button.className = "btn-mesage btn-primary";
    button.title = "Nhấn Window + V để xem các nội dung được sao chép";

    // Gắn sự kiện click để chạy hàm addButtonsTgic
    button.addEventListener("click", () => {
      if (typeof addButtonsTgic === "function") {
        copyNext();
        console.log("Hàm addButtonsTgic đã được gọi.");
      } else {
        console.error("Hàm addButtonsTgic không tồn tại.");
      }
    });

    // Chèn button vào sau phần tử được chọn
    targetElement.parentNode.appendChild(button);
    console.log("Button đã được chèn vào thành công.");
  } else {
    console.error("Không tìm thấy phần tử `.crumb li:last-child a`.");
  }
}

// Gọi hàm chèn button khi trang đã tải
document.addEventListener("DOMContentLoaded", insertButton);
