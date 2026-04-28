document.addEventListener('DOMContentLoaded', function() {
  var buttons = document.querySelectorAll('#pub-filter-bar .pub-filter-btn');
  var cards = document.querySelectorAll('.pub-card');

  buttons.forEach(function(btn) {
    btn.addEventListener('click', function() {
      var filter = this.getAttribute('data-filter');

      buttons.forEach(function(b) { b.classList.remove('active'); });
      this.classList.add('active');

      cards.forEach(function(card) {
        var show = false;
        if (filter === 'all') {
          show = true;
        } else if (filter === 'position') {
          show = card.getAttribute('data-category') === 'position';
        } else {
          show = card.getAttribute('data-year') === filter;
        }
        if (show) {
          card.classList.remove('hidden');
        } else {
          card.classList.add('hidden');
        }
      });
    });
  });
});
