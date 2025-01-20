document.getElementById("test-button").addEventListener("click", () => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.scripting.executeScript({
      target: { tabId: tabs[0].id },
      func: addCallButtons,
    });
  });
});

function addCallButtons() {
  const phoneLinks = document.querySelectorAll(".table-list tr td:nth-child(3) .display-grid a:last-of-type");
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
      // Tạo nút Call
      const callButton = document.createElement("button");
      callButton.textContent = "Call";
      callButton.style.marginLeft = "8px";
      callButton.onclick = () => {
        window.location.href = `tel:${phoneNumber}`;
      };

      // Tạo nút Zalo
      const zaloButton = document.createElement("button");
      zaloButton.textContent = "Zalo";
      zaloButton.style.marginLeft = "8px";
      zaloButton.onclick = () => {
        window.open(`https://zalo.me/${phoneNumber}`, "_blank");
      };

      // Chèn nút vào sau số điện thoại
      phoneLink.parentElement.appendChild(callButton);
      phoneLink.parentElement.appendChild(zaloButton);
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
      // Tạo nút Email
      const emailButton = document.createElement("button");
      emailButton.textContent = "Email";
      emailButton.style.marginLeft = "8px";
      emailButton.onclick = () => {
        window.location.href = `mailto:${emailAddress}`;
      };

      // Chèn nút vào sau email
      emailLink.parentElement.appendChild(emailButton);
    }
  });

  alert("Nút Call, Zalo, và Email đã được thêm vào!");
}