document.addEventListener("DOMContentLoaded", () => {
    const youtubeLinkInput = document.getElementById("youtubeLink");
    const resultElement = document.getElementById("result");
    const previewElement = document.getElementById("preview");
  
    document.getElementById("convertBtn").addEventListener("click", () => {
      convertLink();
    });
  
    document.getElementById("copyBtn").addEventListener("click", () => {
      copyCode();
    });
  
    function convertLink() {
      const input = youtubeLinkInput.value.trim();
      let embedCode = "";
  
      if (input.startsWith("<iframe")) {
        const srcMatch = input.match(/src="([^"]+)"/);
        const titleMatch = input.match(/title="([^"]+)"/);
        if (srcMatch && srcMatch[1]) {
          const src = srcMatch[1];
          const title = titleMatch ? titleMatch[1] : "YouTube Video";
          embedCode = `<div class="raw-html-embed">
              <p style="overflow: hidden; padding-bottom: 56.25%; position: relative; height: 0;">
                  <iframe style="left: 0; top: 0; height: 100%; width: 100%; position: absolute;" src="${src}" title="${title}" frameborder="0"></iframe>
              </p>
          </div>`;
        } else {
          embedCode = "Thẻ <iframe> không hợp lệ! Vui lòng kiểm tra lại.";
        }
      } else {
        try {
          const url = new URL(input);
          if (url.hostname === "www.youtube.com" && url.searchParams.get("v")) {
            const videoId = url.searchParams.get("v");
            embedCode = `<div class="raw-html-embed">
                <p style="overflow: hidden; padding-bottom: 56.25%; position: relative; height: 0;">
                    <iframe style="left: 0; top: 0; height: 100%; width: 100%; position: absolute;" src="https://www.youtube.com/embed/${videoId}" frameborder="0"></iframe>
                </p>
            </div>`;
          } else if (url.hostname === "youtu.be") {
            const videoId = url.pathname.slice(1);
            embedCode = `<div class="raw-html-embed">
                <p style="overflow: hidden; padding-bottom: 56.25%; position: relative; height: 0;">
                    <iframe style="left: 0; top: 0; height: 100%; width: 100%; position: absolute;" src="https://www.youtube.com/embed/${videoId}" frameborder="0"></iframe>
                </p>
            </div>`;
          } else {
            throw new Error("Link không hợp lệ!");
          }
        } catch (error) {
          embedCode = "Link không hợp lệ! Vui lòng thử lại.";
        }
      }
  
      resultElement.textContent = embedCode;
  
      previewElement.innerHTML = embedCode.includes("iframe")
        ? embedCode
        : '<p class="text-red-500">Không có nội dung để xem trước.</p>';
    }
  
    function copyCode() {
      const text = resultElement.textContent;
      navigator.clipboard
        .writeText(text)
        .then(() => showNotification("Đã sao chép!", "bg-green-500"))
        .catch(() => showNotification("Sao chép thất bại!", "bg-red-500"));
        showNotification
    }
  
    function showNotification(message, backgroundClass) {
      const notification = document.getElementById("notification");
      notification.textContent = message;
      notification.classList.remove("hidden", "bg-green-500", "bg-red-500");
      notification.classList.add(backgroundClass);
  
      setTimeout(() => {
        notification.classList.add("hidden");
      }, 2000);
    }
  });


  document.addEventListener("DOMContentLoaded", () => {
    const detachButton = document.getElementById("detachWindowBtn");
    let newWindow = null;

    detachButton.addEventListener("click", () => {
        if (!newWindow || newWindow.closed) {
            newWindow = window.open("popup.html", "_blank", "width=400,height=593, bottom=100, right=100");

            newWindow.onload = () => {
                // Tìm nút trong cửa sổ mới và ẩn nó
                const newWindowDetachButton = newWindow.document.getElementById("detachWindowBtn");
                if (newWindowDetachButton) {
                    newWindowDetachButton.style.display = "none";
                }
            };
        }
    });
});


  

