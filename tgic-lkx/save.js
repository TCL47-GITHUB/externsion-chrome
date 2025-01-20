function addButtons() {
    // Thêm CSS icon vào <head> (nếu chưa tồn tại)
    if (!document.querySelector("link[href='https://file.linhkienx.com/upload/icons/user/style.css']")) {
      const linkElement = document.createElement("link");
      linkElement.rel = "stylesheet";
      linkElement.href = "https://file.linhkienx.com/upload/icons/user/style.css";
      document.head.appendChild(linkElement);
      // console.log("Font icon CSS has been injected into the page.");
    }
  
    let phoneLinks;
  
    // Kiểm tra URL hiện tại để quyết định selector
    if (window.location.href.includes("/console-admin/orders") || window.location.href.includes("/console-admin/order-trasheds")) {
      // Dành cho trang orders
      phoneLinks = document.querySelectorAll(".table-list tr td:nth-child(3) .display-grid a:last-of-type");
    } else if (window.location.href.includes("/console-admin/order-exports")) {
      // Dành cho trang order-exports
      phoneLinks = document.querySelectorAll(".display-grid i a:last-of-type");
    }
  
    phoneLinks.forEach((phoneLink) => {
      let phoneNumber = phoneLink.textContent.trim(); // Lấy nội dung text
  
      // Loại bỏ (84) nếu có và chỉ lấy phần sau nó
      phoneNumber = phoneNumber.replace(/\(84\)\s*/, "").replace(/[^0-9]/g, "");
  
      // Thêm số 0 ở đầu nếu thiếu
      if (phoneNumber && !phoneNumber.startsWith("0")) {
        phoneNumber = "0" + phoneNumber;
      }
  
      // Chỉ tạo nút nếu số điện thoại hợp lệ
      if (phoneNumber) {
        // Tạo hoặc tìm container nút
        let buttonContainer = phoneLink.parentElement.querySelector(
          ".display-flex.flex-justify-end"
        );
        if (!buttonContainer) {
          buttonContainer = document.createElement("div");
          buttonContainer.className = "display-flex flex-justify-end";
          phoneLink.parentElement.appendChild(buttonContainer);
        }
  
        // Kiểm tra nếu nút chưa tồn tại trước khi thêm
        if (!buttonContainer.querySelector(".tgic.icon-phone")) {
          const callButton = document.createElement("button");
          callButton.className = "display-flex justify-center items-center btn btn-success btn-sm"; // Thêm các lớp Bootstrap
          callButton.style.marginLeft = "8px";
          callButton.title = "Gọi điện thoại";
          callButton.innerHTML = '<i class="tgic icon-phone"></i>';
          callButton.onclick = () => {
            window.location.href = `tel:${phoneNumber}`;
          };
          buttonContainer.appendChild(callButton);
        }
  
        if (!buttonContainer.querySelector(".tgic.icon-zalo")) {
          const zaloButton = document.createElement("button");
          zaloButton.className = "display-flex justify-center items-center btn btn-primary btn-sm";
          zaloButton.style.marginLeft = "8px";
          zaloButton.title = "Mở Zalo";
          zaloButton.innerHTML = '<i class="tgic icon-zalo"></i>';
          zaloButton.onclick = () => {
            window.open(`https://zalo.me/${phoneNumber}`, "_blank");
          };
          buttonContainer.appendChild(zaloButton);
        }
      }
    });
  
    // Lấy danh sách email
    const emailLinks = document.querySelectorAll(
      ".table-list tr td:nth-child(3) .display-grid a:nth-child(2)"
    );
  
    emailLinks.forEach((emailLink) => {
      let emailAddress = emailLink.textContent.trim(); // Lấy nội dung text
  
      // Chỉ tạo nút nếu email hợp lệ
      if (emailAddress) {
        let emailButtonContainer = emailLink.parentElement.querySelector(
          ".display-flex.flex-justify-end"
        );
        if (!emailButtonContainer) {
          emailButtonContainer = document.createElement("div");
          emailButtonContainer.className = "display-flex flex-justify-end";
          emailLink.parentElement.appendChild(emailButtonContainer);
        }
  
        if (!emailButtonContainer.querySelector(".tgic.icon-mail")) {
          const emailButton = document.createElement("button");
          emailButton.className = "display-flex justify-center items-center btn btn-danger btn-sm";
          emailButton.style.marginLeft = "8px";
          emailButton.title = "Gửi Email";
          emailButton.innerHTML = '<i class="tgic icon-mail"></i>';
          emailButton.onclick = () => {
            window.location.href = `mailto:${emailAddress}`;
          };
          emailButtonContainer.appendChild(emailButton);
        }
      }
    });
  
    // console.log("Nút Call, Zalo, và Email đã được thêm vào!");
  }
  
  
  
  // Sử dụng setInterval để kiểm tra và gọi hàm addButtons
  setInterval(() => {
    addButtons();
  }, 1000); // Kiểm tra mỗi giây (bạn có thể thay đổi thời gian nếu cần)
  
  // console.log("Auto-check and inject buttons activated.");
  