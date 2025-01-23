// Thêm CSS icon vào <head> (nếu chưa tồn tại)
if (
  !document.querySelector(
    "link[href='https://file.linhkienx.com/upload/icons/user/style.css']"
  )
) {
  const linkElement = document.createElement("link");
  linkElement.rel = "stylesheet";
  linkElement.href = "https://file.linhkienx.com/upload/icons/user/style.css";
  document.head.appendChild(linkElement);
}

// // Kiểm tra nếu tài liệu đã sẵn sàng
// if (document.readyState === "loading") {
//   // Nếu tài liệu chưa sẵn sàng, đợi sự kiện DOMContentLoaded
//   document.addEventListener("DOMContentLoaded", () => {
//     addButtonsTgic();
//   });
// } else {
//   // Nếu tài liệu đã sẵn sàng, hiển thị ngay lập tức
//   addButtonsTgic();
// }

// // Lắng nghe sự kiện DOMContentLoaded để chạy addButtons
// document.addEventListener("DOMContentLoaded", () => {
//   addButtonsTgic();
// });

// // Theo dõi thay đổi trong DOM và gọi lại addButtons nếu cần
// const observer = new MutationObserver(() => {
//   addButtonsTgic();
// });

// observer.observe(document.body, { childList: true, subtree: true });

// // Sử dụng setInterval để kiểm tra và gọi hàm addButtons
// setInterval(() => {
//   addButtonsTgic();
// }, 1000);

// let count = 0;
// const maxRepeats = 5; // Số lần lặp tối đa

// const intervalId = setInterval(() => {
//   addButtonsTgic();
//   count++;

//   if (count >= maxRepeats) {
//     clearInterval(intervalId); // Dừng setInterval sau khi đạt số lần lặp
//   }
// }, 1000);
function addButtonsTgic() {
  let phoneLinks;

  let emailLinks;

  // Kiểm tra URL hiện tại để quyết định selector
  if (window.location.href.includes("/orders/collection/waiting")) {
    phoneLinks = document.querySelectorAll(
      ".table-list tr td:nth-child(3) .display-grid > i"
    );

  } else if (window.location.href.includes("/order-exports")) {
    phoneLinks = document.querySelectorAll(
      ".table-list tr td:nth-child(3) .display-grid i a:last-of-type"
    );
  } else if (
    window.location.href.includes("/orders") ||
    window.location.href.includes("/order-trasheds")
  ) {
    phoneLinks = document.querySelectorAll(
      ".table-list tr td:nth-child(3) .display-grid a:last-of-type"
    );
  } else {
    console.log("Failed to inject CSS icon into the page");
  }
  phoneLinks.forEach((phoneLink) => {
    let phoneNumber = phoneLink.textContent.trim();

    // Loại bỏ (84) nếu có và chỉ lấy phần sau nó
    phoneNumber = phoneNumber.replace(/\(84\)\s*/, "").replace(/[^0-9]/g, "");

    // Thêm số 0 ở đầu nếu thiếu
    if (phoneNumber && !phoneNumber.startsWith("0")) {
      phoneNumber = "0" + phoneNumber;
    }

    // Tạo hoặc tìm container nút
    let buttonContainer = phoneLink.parentElement.querySelector(
      ".display-flex.flex-justify-end"
    );
    if (!buttonContainer) {
      buttonContainer = document.createElement("div");
      buttonContainer.className = "display-flex flex-justify-end";
      phoneLink.parentElement.appendChild(buttonContainer);
    }

    // Kiểm tra nếu nút Call chưa tồn tại
    if (!buttonContainer.querySelector(".tgic.icon-solid-phone")) {
      const callButton = document.createElement("button");
      callButton.className =
        "display-flex justify-center items-center btn btn-success btn-sm"; // Bootstrap class
      callButton.style.marginLeft = "8px";
      callButton.title = "Gọi điện";
      callButton.innerHTML = '<i class="tgic icon-solid-phone"></i>';

      // Nếu số điện thoại không hợp lệ, vô hiệu hóa và làm mờ nút
      if (!phoneNumber || !phoneNumber.startsWith("0")) {
        callButton.disabled = true;
        callButton.style.opacity = "0.35"; // Làm mờ nút
        callButton.style.cursor = "not-allowed"; // Thay đổi con trỏ chuột
        callButton.title = "Số điện thoại không hợp lệ";
      } else {
        callButton.onclick = () => {
          window.location.href = `tel:${phoneNumber}`;
        };
      }

      buttonContainer.appendChild(callButton);
    }

    // Kiểm tra nếu nút Zalo chưa tồn tại
    if (!buttonContainer.querySelector(".tgic.icon-zalo")) {
      const zaloButton = document.createElement("button");
      zaloButton.className =
        "display-flex justify-center items-center btn btn-primary btn-sm";
      zaloButton.style.marginLeft = "8px";
      zaloButton.title = "Mở Zalo";
      zaloButton.innerHTML = '<i class="tgic icon-zalo"></i>';

      // Nếu số điện thoại không hợp lệ, vô hiệu hóa và làm mờ nút
      if (!phoneNumber || !phoneNumber.startsWith("0")) {
        zaloButton.disabled = true;
        zaloButton.style.opacity = "0.35"; // Làm mờ nút
        zaloButton.style.cursor = "not-allowed"; // Thay đổi con trỏ chuột
        zaloButton.title = "Zalo không hợp lệ";
      } else {
        zaloButton.onclick = () => {
          window.open(`https://zalo.me/${phoneNumber}`, "_blank");
        };
      }

      buttonContainer.appendChild(zaloButton);
    }
  });

  // Lấy danh sách email
  if (window.location.href.includes("/orders/collection/waiting")) {
    emailLinks = document.querySelectorAll(
      ".table-list tr td:nth-child(3) .display-grid span:nth-child(2)"
    );
  }else{
    emailLinks = document.querySelectorAll(
     ".table-list tr td:nth-child(3) .display-grid a:nth-child(2)"
   );
  }

  emailLinks.forEach((emailLink) => {
    let emailAddress = emailLink.textContent.trim(); // Lấy nội dung text

    // Tạo hoặc tìm container nút
    let emailButtonContainer = emailLink.parentElement.querySelector(
      ".display-flex.flex-justify-end"
    );
    if (!emailButtonContainer) {
      emailButtonContainer = document.createElement("div");
      emailButtonContainer.className = "display-flex flex-justify-end";
      emailLink.parentElement.appendChild(emailButtonContainer);
    }

    // Kiểm tra nếu nút Email chưa tồn tại
    if (!emailButtonContainer.querySelector(".tgic.icon-mail-solid")) {
      const emailButton = document.createElement("button");
      emailButton.className =
        "display-flex justify-center items-center btn btn-danger btn-sm";
      emailButton.style.marginLeft = "8px";
      emailButton.title = "Gửi Email";
      emailButton.innerHTML = '<i class="tgic icon-mail-solid"></i>';

      // Nếu email không hợp lệ, vô hiệu hóa và làm mờ nút
      if (!emailAddress || !emailAddress.includes("@")) {
        emailButton.disabled = true;
        emailButton.style.opacity = "0.35"; // Làm mờ nút
        emailButton.style.cursor = "not-allowed"; // Thay đổi con trỏ chuột
        emailButton.title = "Email không hợp lệ";
      } else {
        emailButton.onclick = () => {
          window.location.href = `mailto:${emailAddress}`;
        };
      }

      emailButtonContainer.appendChild(emailButton);
    }
  });
}


function addButtonsLkx() {
  let phoneLinks;
  let emailLinks;

  // Check current URL to determine selectors
  if (
    window.location.href.includes("/orders") ||
    window.location.href.includes("/order-trasheds")
  ) {
    phoneLinks = document.querySelectorAll(
      ".c-table tr td:nth-child(3) div:last-of-type a"
    );
    emailLinks = document.querySelectorAll(
      ".c-table tr td:nth-child(3) div:nth-child(2) a"
    );
  } else if (window.location.href.includes("/order-exports")) {
    phoneLinks = document.querySelectorAll(
      ".c-table tr td:nth-child(3) p a:last-of-type"
    );
    emailLinks = document.querySelectorAll(
      ".c-table tr td:nth-child(3) p:nth-child(2) a"
    );
  }

  phoneLinks.forEach((phoneLink) => {
    let phoneNumber = phoneLink.textContent.trim();

    // Remove (84) if present and keep the part after it
    phoneNumber = phoneNumber.replace(/\(84\)\s*/, "").replace(/[^0-9]/g, "");

    // Add 0 at the start if missing
    if (phoneNumber && !phoneNumber.startsWith("0")) {
      phoneNumber = "0" + phoneNumber;
    }

    // Create or find button container
    let buttonContainer = phoneLink.parentElement.querySelector(
      ".display-flex.flex-justify-end"
    );
    if (!buttonContainer) {
      buttonContainer = document.createElement("div");
      buttonContainer.className = "display-flex flex-justify-end";
      buttonContainer.style.display = "flex";
      buttonContainer.style.justifyContent = "flex-end";
      buttonContainer.style.alignItems = "center";
      phoneLink.parentElement.appendChild(buttonContainer);
    }

    // Create Call button if not already created
    if (!buttonContainer.querySelector(".tgic.icon-solid-phone")) {
      const callButton = document.createElement("button");
      callButton.className =
        "display-flex justify-center items-center btn btn-secondary"; // Bootstrap class
      callButton.style.marginLeft = "8px";
      callButton.title = "Gọi điện";
      callButton.innerHTML = '<i class="tgic icon-solid-phone"></i>';

      // If phone number is invalid, disable and dim the button
      if (!phoneNumber || !phoneNumber.startsWith("0")) {
        callButton.disabled = true;
        callButton.style.opacity = "0.35"; // Dim the button
        callButton.style.cursor = "not-allowed"; // Change cursor
        callButton.title = "Số điện thoại không hợp lệ";
      } else {
        callButton.onclick = () => {
          window.location.href = `tel:${phoneNumber}`;
        };
      }

      buttonContainer.appendChild(callButton);
    }

    // Create Zalo button if not already created
    if (!buttonContainer.querySelector(".tgic.icon-zalo")) {
      const zaloButton = document.createElement("button");
      zaloButton.className =
        "display-flex justify-center items-center btn btn-primary";
      zaloButton.style.marginLeft = "8px";
      zaloButton.title = "Mở Zalo";
      zaloButton.innerHTML = '<i class="tgic icon-zalo"></i>';

      // If phone number is invalid, disable and dim the button
      if (!phoneNumber || !phoneNumber.startsWith("0")) {
        zaloButton.disabled = true;
        zaloButton.style.opacity = "0.35"; // Dim the button
        zaloButton.style.cursor = "not-allowed"; // Change cursor
        zaloButton.title = "Zalo không hợp lệ";
      } else {
        zaloButton.onclick = () => {
          window.open(`https://zalo.me/${phoneNumber}`, "_blank");
        };
      }

      buttonContainer.appendChild(zaloButton);
    }
  });

  emailLinks.forEach((emailLink) => {
    let emailAddress = emailLink.textContent.trim();

    // Create or find button container
    let emailButtonContainer = emailLink.parentElement.querySelector(
      ".display-flex.flex-justify-end"
    );
    if (!emailButtonContainer) {
      emailButtonContainer = document.createElement("div");
      emailButtonContainer.className = "display-flex flex-justify-end";
      emailButtonContainer.style.display = "flex";
      emailButtonContainer.style.justifyContent = "flex-end";
      emailButtonContainer.style.alignItems = "center";
      emailLink.parentElement.appendChild(emailButtonContainer);
    }

    // Create Email button if not already created
    if (!emailButtonContainer.querySelector(".tgic.icon-mail-solid")) {
      const emailButton = document.createElement("button");
      emailButton.className =
        "display-flex justify-center items-center btn btn-danger";
      emailButton.style.marginLeft = "8px";
      emailButton.title = "Gửi Email";
      emailButton.innerHTML = '<i class="tgic icon-mail-solid"></i>';

      // If email is invalid, disable and dim the button
      if (!emailAddress || !emailAddress.includes("@")) {
        emailButton.disabled = true;
        emailButton.style.opacity = "0.35"; // Dim the button
        emailButton.style.cursor = "not-allowed"; // Change cursor
        emailButton.title = "Email không hợp lệ";
      } else {
        emailButton.onclick = () => {
          window.location.href = `mailto:${emailAddress}`;
        };
      }

      emailButtonContainer.appendChild(emailButton);
    }
  });
}

// // Kiểm tra nếu tài liệu đã sẵn sàng
// if (document.readyState === "loading") {
//   // Nếu tài liệu chưa sẵn sàng, đợi sự kiện DOMContentLoaded
//   document.addEventListener("DOMContentLoaded", () => {
//     if (window.location.href.startsWith('https://www.thegioiic.com/console-admin/')) {
//       addButtonsTgic();
//     }
//     else if (window.location.href.startsWith('https://admin.linhkienx.com/')) {
//       addButtonsLkx();
//     }
//     alert("Xin chào");
//   });
// } else {
//   // Nếu tài liệu đã sẵn sàng, hiển thị ngay lập tức
//   if (window.location.href.startsWith('https://www.thegioiic.com/console-admin/')) {
//     addButtonsTgic();
//   }
//   else if (window.location.href.startsWith('https://admin.linhkienx.com/')) {
//     addButtonsLkx();
//   }
//   alert("Xin chào");
// }


  // Hàm chèn button
  function insertButton() {
    // Tìm phần tử `.crumb li:last-child a`
    const targetElement = document.querySelector('.crumb li:last-child a');
  
    if (targetElement) {
        // Tạo button
        const button = document.createElement('button');
        button.textContent = 'Copy all';
        button.style.marginLeft = '10px';
        // button.style.padding = '5px 10px';
        // button.style.cursor = 'pointer';
        // button.style.border = '1px solid #ccc';
        // button.style.backgroundColor = '#007bff';
        // button.style.color = '#fff';
        // button.style.borderRadius = '4px';
        button.className =
        "btn-mesage btn-primary";
        button.title = "Nhấn Window + V để xem các nội dung được sao chép";
  
        // Gắn sự kiện click để chạy hàm addButtonsTgic
        button.addEventListener('click', () => {
            if (typeof addButtonsTgic === 'function') {
              copyNext();
                console.log('Hàm addButtonsTgic đã được gọi.');
            } else {
                console.error('Hàm addButtonsTgic không tồn tại.');
            }
        });
  
        // Chèn button vào sau phần tử được chọn
        targetElement.parentNode.appendChild(button);
        console.log('Button đã được chèn vào thành công.');
    } else {
        console.error('Không tìm thấy phần tử `.crumb li:last-child a`.');
    }
  }
  
  // Gọi hàm chèn button khi trang đã tải
  document.addEventListener('DOMContentLoaded', insertButton);
  