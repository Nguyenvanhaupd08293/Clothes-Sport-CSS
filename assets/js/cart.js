document.addEventListener('DOMContentLoaded', function () {
  const minusBtns = document.querySelectorAll('.quantity-btn.minus');
  const plusBtns = document.querySelectorAll('.quantity-btn.plus');
  const quantityInputs = document.querySelectorAll('.quantity-input');
  const removeBtns = document.querySelectorAll('.remove-item');
  function updateQuantity(input, change) {
    let newValue = parseInt(input.value) + change;
    if (newValue < 1) newValue = 1;
    input.value = newValue;
    updateCartTotal();
  }
  function updateCartTotal() {
    let subtotal = 0;
    const items = document.querySelectorAll('.cart-item');

    items.forEach(item => {
      const priceText = item.querySelector('.current-price').textContent;
      const price = parseFloat(priceText.replace(/[^\d]/g, '')) / 1000;
      const quantity = parseInt(item.querySelector('.quantity-input').value);
      const total = price * quantity;

      item.querySelector('.total-price').textContent =
        total.toLocaleString('vi-VN') + '₫';
      subtotal += total;
    });

    // Update subtotal in summary
    document.querySelector(
      '.summary-row:nth-child(1) span:last-child'
    ).textContent = subtotal.toLocaleString('vi-VN') + '₫';

    // Update total (assuming fixed discount and shipping)
    const discount = 1000;
    const shipping = 30;
    const total = subtotal - discount + shipping;
    document.querySelector('.summary-row.total span:last-child').textContent =
      total.toLocaleString('vi-VN') + '₫';

    // Update item count
    const itemCount = items.length;
    document.querySelector('.items-count').textContent =
      itemCount + ' sản phẩm';
    document.querySelector('.cart-count').textContent = itemCount;
  }

  // Event listeners
  minusBtns.forEach(btn => {
    btn.addEventListener('click', function () {
      const input = this.nextElementSibling;
      updateQuantity(input, -1);
    });
  });

  plusBtns.forEach(btn => {
    btn.addEventListener('click', function () {
      const input = this.previousElementSibling;
      updateQuantity(input, 1);
    });
  });

  quantityInputs.forEach(input => {
    input.addEventListener('change', function () {
      if (this.value < 1) this.value = 1;
      updateCartTotal();
    });
  });

  removeBtns.forEach(btn => {
    btn.addEventListener('click', function () {
      if (confirm('Bạn có chắc muốn xóa sản phẩm này khỏi giỏ hàng?')) {
        this.closest('.cart-item').remove();
        updateCartTotal();
      }
    });
  });

  const applyBtn = document.querySelector('.apply-btn');
  applyBtn.addEventListener('click', function () {
    const promoInput = this.previousElementSibling;
    const promoCode = promoInput.value.trim();

    if (promoCode === '') {
      alert('Vui lòng nhập mã giảm giá');
      return;
    }

    if (promoCode.toUpperCase() === 'LINING10') {
      alert('Áp dụng mã giảm giá thành công! Giảm 10% đơn hàng.');
    } else {
      alert('Mã giảm giá không hợp lệ hoặc đã hết hạn');
    }
  });
  updateCartTotal();
});
