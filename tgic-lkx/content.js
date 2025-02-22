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
if (window.location.href.startsWith("https://www.thegioiic.com/console-admin/orders")) {
  function addClassStyleStatus() {
    // Tìm chỉ mục của cột "Trạng thái"
    const table = document.getElementById("table-orders");
    const headers = table.querySelectorAll("thead th");
    let statusColumnIndex = -1;
    let actionColumnIndex = -1;

    // Tìm chỉ mục của cột "Trạng thái" và "Thao tác"
    headers.forEach((header, index) => {
      if (header.textContent.trim() === "Trạng thái") {
        statusColumnIndex = index;
      }
      if (header.textContent.trim() === "Thao tác") {
        actionColumnIndex = index;
      }
    });
    // Nếu tìm thấy cột "Trạng thái", thêm màu nền cho các ô trong cột
    if (statusColumnIndex !== -1) {
      const rows = table.querySelectorAll("tbody tr");
      rows.forEach((row) => {
        const cells = row.querySelectorAll("td");
        if (cells[statusColumnIndex]) {
          // cells[statusColumnIndex].style.backgroundColor = "#f1f1f1";
        }
      });
    }
    // Nếu tìm thấy cột "Trạng thái"
    if (statusColumnIndex !== -1) {
      const rows = table.querySelectorAll("tbody tr");
      rows.forEach((row) => {
        const cells = row.querySelectorAll("td");
        const statusCell = cells[statusColumnIndex];

        if (statusCell) {
          const firstSpan = statusCell.querySelector(
            ".display-grid span:first-child"
          );
          if (firstSpan && firstSpan.textContent.trim() === "Đã kiểm hàng") {
            // Thêm class
            firstSpan.classList.add("btn", "btn-sm");

            // Thêm style
            firstSpan.style.cssText = `
             width: fit-content;
      padding: 0.1rem 0.4rem;
      border-radius: 999px;
      font-size: 11px;
             color: #fff;
             background-color: #14984c;
             white-space: nowrap;
             box-shadow: rgb(79 158 79 / 20%) 0px 50px 100px -20px, 
                         rgb(47 183 116 / 25%) 0px 30px 60px -30px, 
                         rgb(0 163 91 / 30%) 0px -2px 6px 0px inset;
           `;
          }
          if (firstSpan && firstSpan.textContent.trim() === "Đang soạn hàng") {
            // Thêm class
            firstSpan.classList.add("btn", "btn-sm");

            // Thêm style
            firstSpan.style.cssText = `
              width: fit-content;
      padding: 0.1rem 0.4rem;
      border-radius: 999px;
      font-size: 11px;
              color: #fff;
              background-color: #fa7925;
              white-space: nowrap;
              box-shadow: rgb(158 123 79 / 10%) 0px 50px 100px -20px, 
                          rgb(183 172 47 / 15%) 0px 30px 60px -30px, 
                          rgb(163 116 0 / 20%)  0px -2px 6px 0px inset;
           `;
          }
          if (firstSpan && firstSpan.textContent.trim() === "Đã soạn xong") {
            // Thêm class
            firstSpan.classList.add("btn", "btn-sm");

            // Thêm style
            firstSpan.style.cssText = `
                  width: fit-content;
      padding: 0.1rem 0.4rem;
      border-radius: 999px;
      font-size: 11px;
      color: #fff;
      background-color: #0077df;
                  white-space: nowrap;
                  box-shadow: rgb(79 116 158 / 10%) 0px 50px 100px -20px, 
                              rgb(47 139 183 / 15%) 0px 30px 60px -30px, 
                              rgb(0 93 163 / 20%) 0px -2px 6px 0px inset;
           `;
          }
        }
      });
    }

    // Nếu tìm thấy cột "Thao tác", thêm màu nền cho các ô
    if (actionColumnIndex !== -1) {
      const rows = table.querySelectorAll("tbody tr");
      rows.forEach((row) => {
        const cells = row.querySelectorAll("td");
        if (cells[actionColumnIndex]) {
          // cells[actionColumnIndex].style.backgroundColor = "#f1f1f1";
        }
      });
    }
  }
}

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
  } else if (window.location.href.includes("/orders/")) {
    phoneLinks = document
      .querySelector(".col-4 .h-info-order .fa-phone")
      .parentNode.textContent.trim();
  } else if (window.location.href.includes("/order-trasheds")) {
    phoneLinks = document.querySelectorAll(
      ".table-list tr td:nth-child(3) .display-grid a:last-of-type"
    );
  } else {
    console.log("Failed to inject CSS icon into the page");
  }

  // Loại bỏ mọi ký tự không phải số
  let phoneNumber = phoneLinks.replace(/\D+/g, "");
  // let phoneNumber = phoneLink.textContent.trim();
  console.log(phoneNumber);

  // // Loại bỏ (84) nếu có và chỉ lấy phần sau nó
  // phoneNumber = phoneNumber.replace(/\(84\)\s*/, "").replace(/[^0-9]/g, "");

  // // Thêm số 0 ở đầu nếu thiếu
  // if (phoneNumber && !phoneNumber.startsWith("0")) {
  //   phoneNumber = "0" + phoneNumber;
  // }

  if (phoneNumber.startsWith("84")) {
    phoneNumber = phoneNumber.substring(2); // Bỏ "84" ở đầu
  }
  if (!phoneNumber.startsWith("0")) {
    phoneNumber = "0" + phoneNumber; // Thêm "0" nếu chưa có
  }

  console.log(phoneNumber);

  // Tạo hoặc tìm container nút
  let buttonContainer = phoneLinks.parentElement.querySelector(
    ".display-flex.flex-justify-end"
  );
  if (!buttonContainer) {
    buttonContainer = document.createElement("div");
    buttonContainer.className = "display-flex flex-justify-end";
    phoneLinks.parentElement.appendChild(buttonContainer);
  }
  //Phone
  // Kiểm tra nếu nút Call chưa tồn tại
  if (!buttonContainer.querySelector(".tgic.icon-solid-phone")) {
    const callButton = document.createElement("button");
    callButton.className =
      "display-flex justify-center items-center btn btn-success"; // Bootstrap class
    callButton.style.marginLeft = "8px";
    callButton.title = "Gọi điện";
    callButton.innerHTML = '<i class="tgic icon-solid-phone"></i>';
    callButton.style.cssText = `
          font-size: .7rem;
          padding: .2rem .4rem;
          margin-left: 8px
        `;

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
  // if (!buttonContainer.querySelector(".tgic.icon-zalo")) {
  //   const zaloButton = document.createElement("button");
  //   zaloButton.className =
  //     "display-flex justify-center items-center btn btn-primary btn-sm";
  //   zaloButton.title = "Mở Zalo";
  //   zaloButton.innerHTML = '<i class="tgic icon-zalo"></i>';
  //   // Thêm style
  //   zaloButton.style.cssText = `
  //       font-size: .7rem;
  //       padding: .2rem .4rem;
  //       margin-left: 8px
  //     `;

  //   // Nếu số điện thoại không hợp lệ, vô hiệu hóa và làm mờ nút
  //   if (!phoneNumber || !phoneNumber.startsWith("0")) {
  //     zaloButton.disabled = true;
  //     zaloButton.style.opacity = "0.35"; // Làm mờ nút
  //     zaloButton.style.cursor = "not-allowed"; // Thay đổi con trỏ chuột
  //     zaloButton.title = "Zalo không hợp lệ";
  //   } else {
  //     zaloButton.onclick = () => {
  //       window.open(`https://zalo.me/${phoneNumber}`, "_blank");
  //     };
  //   }

  //   buttonContainer.appendChild(zaloButton);
  // }

  //   // Email
  //   // Lấy danh sách email
  //   if (window.location.href.includes("/orders/collection/waiting")) {
  //     emailLinks = document.querySelectorAll(
  //       ".table-list tr td:nth-child(3) .display-grid span:nth-child(2)"
  //     );
  //   } else {
  //     emailLinks = document.querySelectorAll(
  //       ".table-list tr td:nth-child(3) .display-grid a:nth-child(2)"
  //     );
  //   }

  //   emailLinks.forEach((emailLink) => {
  //     let emailAddress = emailLink.textContent.trim(); // Lấy nội dung text

  //     // Tạo hoặc tìm container nút
  //     let emailButtonContainer = emailLink.parentElement.querySelector(
  //       ".display-flex.flex-justify-end"
  //     );
  //     if (!emailButtonContainer) {
  //       emailButtonContainer = document.createElement("div");
  //       emailButtonContainer.className = "display-flex flex-justify-end";
  //       emailLink.parentElement.appendChild(emailButtonContainer);
  //     }

  //     // Kiểm tra nếu nút Email chưa tồn tại
  //     if (!emailButtonContainer.querySelector(".tgic.icon-mail-solid")) {
  //       const emailButton = document.createElement("button");
  //       emailButton.className =
  //         "display-flex justify-center items-center btn btn-danger btn-sm";
  //       // emailButton.style.marginLeft = "8px";
  //       emailButton.title = "Gửi Email";
  //       emailButton.innerHTML = '<i class="tgic icon-mail-solid"></i>';
  //       emailButton.style.cssText = `
  //           font-size: .7rem;
  //           padding: .2rem .4rem;
  //           margin-left: 8px
  //         `;

  //       // Nếu email không hợp lệ, vô hiệu hóa và làm mờ nút
  //       if (!emailAddress || !emailAddress.includes("@")) {
  //         emailButton.disabled = true;
  //         emailButton.style.opacity = "0.35"; // Làm mờ nút
  //         emailButton.style.cursor = "not-allowed"; // Thay đổi con trỏ chuột
  //         emailButton.title = "Email không hợp lệ";
  //       } else {
  //         emailButton.onclick = () => {
  //           window.location.href = `mailto:${emailAddress}`;
  //         };
  //       }

  //       emailButtonContainer.appendChild(emailButton);
  //     }
  //   });
}

// function addButtonsTgic() {
//   let phoneLinks;

//   let emailLinks;

//   // Kiểm tra URL hiện tại để quyết định selector
//   if (window.location.href.includes("/orders/collection/waiting")) {
//     phoneLinks = document.querySelectorAll(
//       ".table-list tr td:nth-child(3) .display-grid > i"
//     );
//   } else if (window.location.href.includes("/order-exports")) {
//     phoneLinks = document.querySelectorAll(
//       ".table-list tr td:nth-child(3) .display-grid i a:last-of-type"
//     );
//   } else if (
//     window.location.href.includes("/orders") ||
//     window.location.href.includes("/order-trasheds")
//   ) {
//     // phoneLinks = document.querySelectorAll(
//     //   ".table-list tr td:nth-child(3) .display-grid a:last-of-type"
//     // );
//     phoneLinks = document.querySelectorAll(
//       ".table-list tr td:nth-child(3) .display-grid a:last-of-type"
//     );
//   } else {
//     console.log("Failed to inject CSS icon into the page");
//   }

//   phoneLinks.forEach((phoneLink) => {
//     let phoneNumber = phoneLink.textContent.trim();
//     console.log(phoneNumber);

//     // Loại bỏ (84) nếu có và chỉ lấy phần sau nó
//     phoneNumber = phoneNumber.replace(/\(84\)\s*/, "").replace(/[^0-9]/g, "");

//     // Thêm số 0 ở đầu nếu thiếu
//     if (phoneNumber && !phoneNumber.startsWith("0")) {
//       phoneNumber = "0" + phoneNumber;
//     }

//     // Tạo hoặc tìm container nút
//     let buttonContainer = phoneLink.parentElement.querySelector(
//       ".display-flex.flex-justify-end"
//     );
//     if (!buttonContainer) {
//       buttonContainer = document.createElement("div");
//       buttonContainer.className = "display-flex flex-justify-end";
//       phoneLink.parentElement.appendChild(buttonContainer);
//     }
//     // //Phone
//     // // Kiểm tra nếu nút Call chưa tồn tại
//     // if (!buttonContainer.querySelector(".tgic.icon-solid-phone")) {
//     //   const callButton = document.createElement("button");
//     //   callButton.className =
//     //     "display-flex justify-center items-center btn btn-success"; // Bootstrap class
//     //   callButton.style.marginLeft = "8px";
//     //   callButton.title = "Gọi điện";
//     //   callButton.innerHTML = '<i class="tgic icon-solid-phone"></i>';
//     //   callButton.style.cssText = `
//     //       font-size: .7rem;
//     //       padding: .2rem .4rem;
//     //       margin-left: 8px
//     //     `;

//     //   // Nếu số điện thoại không hợp lệ, vô hiệu hóa và làm mờ nút
//     //   if (!phoneNumber || !phoneNumber.startsWith("0")) {
//     //     callButton.disabled = true;
//     //     callButton.style.opacity = "0.35"; // Làm mờ nút
//     //     callButton.style.cursor = "not-allowed"; // Thay đổi con trỏ chuột
//     //     callButton.title = "Số điện thoại không hợp lệ";
//     //   } else {
//     //     callButton.onclick = () => {
//     //       window.location.href = `tel:${phoneNumber}`;
//     //     };
//     //   }

//     //   buttonContainer.appendChild(callButton);
//     // }

//     // Kiểm tra nếu nút Zalo chưa tồn tại
//     // if (!buttonContainer.querySelector(".tgic.icon-zalo")) {
//     //   const zaloButton = document.createElement("button");
//     //   zaloButton.className =
//     //     "display-flex justify-center items-center btn btn-primary btn-sm";
//     //   zaloButton.title = "Mở Zalo";
//     //   zaloButton.innerHTML = '<i class="tgic icon-zalo"></i>';
//     //   // Thêm style
//     //   zaloButton.style.cssText = `
//     //       font-size: .7rem;
//     //       padding: .2rem .4rem;
//     //       margin-left: 8px
//     //     `;

//     //   // Nếu số điện thoại không hợp lệ, vô hiệu hóa và làm mờ nút
//     //   if (!phoneNumber || !phoneNumber.startsWith("0")) {
//     //     zaloButton.disabled = true;
//     //     zaloButton.style.opacity = "0.35"; // Làm mờ nút
//     //     zaloButton.style.cursor = "not-allowed"; // Thay đổi con trỏ chuột
//     //     zaloButton.title = "Zalo không hợp lệ";
//     //   } else {
//     //     zaloButton.onclick = () => {
//     //       window.open(`https://zalo.me/${phoneNumber}`, "_blank");
//     //     };
//     //   }

//     //   buttonContainer.appendChild(zaloButton);
//     // }
//   });

// //   // Email
// //   // Lấy danh sách email
// //   if (window.location.href.includes("/orders/collection/waiting")) {
// //     emailLinks = document.querySelectorAll(
// //       ".table-list tr td:nth-child(3) .display-grid span:nth-child(2)"
// //     );
// //   } else {
// //     emailLinks = document.querySelectorAll(
// //       ".table-list tr td:nth-child(3) .display-grid a:nth-child(2)"
// //     );
// //   }

// //   emailLinks.forEach((emailLink) => {
// //     let emailAddress = emailLink.textContent.trim(); // Lấy nội dung text

// //     // Tạo hoặc tìm container nút
// //     let emailButtonContainer = emailLink.parentElement.querySelector(
// //       ".display-flex.flex-justify-end"
// //     );
// //     if (!emailButtonContainer) {
// //       emailButtonContainer = document.createElement("div");
// //       emailButtonContainer.className = "display-flex flex-justify-end";
// //       emailLink.parentElement.appendChild(emailButtonContainer);
// //     }

// //     // Kiểm tra nếu nút Email chưa tồn tại
// //     if (!emailButtonContainer.querySelector(".tgic.icon-mail-solid")) {
// //       const emailButton = document.createElement("button");
// //       emailButton.className =
// //         "display-flex justify-center items-center btn btn-danger btn-sm";
// //       // emailButton.style.marginLeft = "8px";
// //       emailButton.title = "Gửi Email";
// //       emailButton.innerHTML = '<i class="tgic icon-mail-solid"></i>';
// //       emailButton.style.cssText = `
// //           font-size: .7rem;
// //           padding: .2rem .4rem;
// //           margin-left: 8px
// //         `;

// //       // Nếu email không hợp lệ, vô hiệu hóa và làm mờ nút
// //       if (!emailAddress || !emailAddress.includes("@")) {
// //         emailButton.disabled = true;
// //         emailButton.style.opacity = "0.35"; // Làm mờ nút
// //         emailButton.style.cursor = "not-allowed"; // Thay đổi con trỏ chuột
// //         emailButton.title = "Email không hợp lệ";
// //       } else {
// //         emailButton.onclick = () => {
// //           window.location.href = `mailto:${emailAddress}`;
// //         };
// //       }

// //       emailButtonContainer.appendChild(emailButton);
// //     }
// //   });
// }

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

chrome.runtime.sendMessage({ action: "clickTabEditContent" });
