customTags['<countdown>'] = new HTMLScript('countdown', function() {
  const countdownTimer = setInterval(() => {
    const dateString = this.getAttribute('date');
    const expirationDate = new Date(dateString).getTime();
    const now = new Date().getTime();
    const secondsRemaining = Math.floor((expirationDate - now) / 1000);

    if (secondsRemaining < 0) {
      clearInterval(countdownTimer);
      return;
    }

    const days = Math.floor(secondsRemaining / (3600 * 24));
    const hours = Math.floor((secondsRemaining % (3600 * 24)) / 3600);
    const minutes = Math.floor((secondsRemaining % 3600) / 60);
    const seconds = Math.floor(secondsRemaining % 60);

    const daysEl = this.querySelector("[data-days]");
    if (daysEl) daysEl.innerText = `${days}日`;
    const hoursEl = this.querySelector("[data-hours]");
    if (hoursEl) hoursEl.innerText = `${hours}時間`;
    const minutesEl = this.querySelector("[data-minutes]");
    if (minutesEl) minutesEl.innerText = `${minutes}分`;
    const secondsEl = this.querySelector("[data-seconds]");
    if (secondsEl) secondsEl.innerText = `${seconds}秒`;

  }, 1000);
});
customTags['<accordion>'] = new HTMLScript('accordion', function() {
  const items = this.children;

  items.forEach(item => {
    const title = item.querySelector('.acc-title'),
          content = item.querySelector('.acc-content');

    title.addEventListener('click', () => {
      content.classList.toggle('active');
    });
  });
});
// ifタグを定義する
customTags['<if>'] = new HTMLScript('if', function () {
  const condition = this.getAttribute('condition');

  if (Function(`'use strict'; return ${condition}`)()) {
    // 条件が真の場合、子要素を表示する
    this.style.display = 'block';
  } else {
    // 条件が偽の場合、子要素を非表示にする
    this.style.display = 'none';
  }
});

// elseタグを定義する
customTags['<else>'] = new HTMLScript('else', function () {
  // 直前の兄弟要素が非表示であれば、表示する
  const prevSibling = this.previousElementSibling;
  if (prevSibling.style.display === 'none') {
    this.style.display = 'block';
  } else {
    this.style.display = 'none';
  }
});

// elseifタグを定義する
customTags['<elseif>'] = new HTMLScript('elseif', function () {
  // 直前の兄弟要素が非表示でかつ条件がtrueであれば、表示する
  const prevSibling = this.previousElementSibling;
  const condition = this.getAttribute('condition');
  if (prevSibling.style.display === 'none' && Function(`'use strict'; return ${condition}`)()) {
    this.style.display = 'block';
  } else {
    this.style.display = 'none';
  }
});
