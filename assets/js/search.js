// アーカイブページのキーワード絞り込み。
// 各記事の data-search 属性（タイトル・タグ・日付）に対する部分一致で表示を切り替えます。
(function () {
  var input = document.getElementById('entry-search');
  var status = document.getElementById('search-status');
  var root = document.getElementById('archive-list');
  if (!input || !root) return;

  var items = Array.prototype.slice.call(root.querySelectorAll('.archive-item'));
  var months = Array.prototype.slice.call(root.querySelectorAll('.archive-month'));
  var years = Array.prototype.slice.call(root.querySelectorAll('.archive-year'));
  var groups = years.concat(months);
  var savedOpen = null;

  function apply() {
    var query = input.value.trim().toLowerCase();
    var shown = 0;

    // 検索中は該当する年月を開き、検索を消したら元の選択に戻す。
    if (query !== '' && savedOpen === null) {
      savedOpen = groups.map(function (group) { return group.open; });
    }

    items.forEach(function (item) {
      var hit = query === '' || (item.dataset.search || '').indexOf(query) !== -1;
      item.hidden = !hit;
      if (hit) shown++;
    });

    // 中身が全部隠れた月・年の見出しも隠す
    groups.forEach(function (group, index) {
      group.hidden = group.querySelectorAll('.archive-item:not([hidden])').length === 0;
      if (query !== '') group.open = !group.hidden;
      else if (savedOpen !== null) group.open = savedOpen[index];
    });
    if (query === '') savedOpen = null;

    if (query === '') {
      status.textContent = '';
    } else if (shown === 0) {
      status.textContent = '「' + input.value.trim() + '」に一致する日記は見つかりませんでした。';
    } else {
      status.textContent = shown + ' 件見つかりました。';
    }
  }

  input.addEventListener('input', apply);
  input.addEventListener('search', apply);
  apply();
})();
