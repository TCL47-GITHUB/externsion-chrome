// Tạo một toast
function showToast(message) {
    // Tạo container nếu chưa tồn tại
    if (!document.querySelector("#toast-container")) {
      const container = document.createElement("div");
      container.id = "toast-container";
      container.style.position = "fixed";
      container.style.bottom = "20px";
      container.style.right = "20px";
      container.style.zIndex = "10000";
      document.body.appendChild(container);
    }
  
    // Tạo toast
    const toast = document.createElement("div");
    toast.textContent = message;
    toast.style.background = "rgba(0, 0, 0, 0.8)";
    toast.style.color = "#fff";
    toast.style.padding = "10px 20px";
    toast.style.borderRadius = "5px";
    toast.style.marginTop = "10px";
    toast.style.boxShadow = "0 2px 6px rgba(0, 0, 0, 0.2)";
    toast.style.fontSize = "14px";
    toast.style.opacity = "0";
    toast.style.transition = "opacity 0.5s ease";
  
    // Thêm toast vào container
    const container = document.querySelector("#toast-container");
    container.appendChild(toast);
  
    // Hiển thị toast
    setTimeout(() => {
      toast.style.opacity = "1";
    }, 100);
  
    // Tự động ẩn toast sau 3 giây
    setTimeout(() => {
      toast.style.opacity = "0";
      setTimeout(() => toast.remove(), 500);
    }, 3000);
  }
  
  // Hiển thị toast khi tài liệu đã sẵn sàng
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => {
      showToast("Xin chào");
    });
  } else {
    showToast("Xin chào");
  }
  