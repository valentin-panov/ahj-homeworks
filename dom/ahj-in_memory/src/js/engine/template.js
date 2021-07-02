const tableHeader = `
  <thead>
    <tr>
      <th class='film-table__head' data-id='id'>Id <span class='direction'>&nbsp</span></th>
      <th class='film-table__head' data-id='title'>Title <span class='direction'>&nbsp</span></th>
      <th class='film-table__head' data-id='year'>Year <span class='direction'>&nbsp</span></th>
      <th class='film-table__head' data-id='imdb'>Imdb <span class='direction'>&nbsp</span></th>
    </tr>
  </thead>
`;
function tableRow({ id, title, year, imdb }) {
  // чтобы не хардкодить это, думал прикрутить шаблонизатор, но пока руки не дошли (
  const tr = document.createElement('tr');
  tr.setAttribute('data-id', id);
  tr.setAttribute('data-title', title);
  tr.setAttribute('data-year', year);
  tr.setAttribute('data-imdb', imdb);

  const tdId = document.createElement('td');
  tdId.className = 'film-table__cell';
  tdId.innerText = id;
  tr.append(tdId);
  const tdTitle = document.createElement('td');
  tdTitle.className = 'film-table__cell';
  tdTitle.innerText = title;
  tr.append(tdTitle);
  const tdYear = document.createElement('td');
  tdYear.className = 'film-table__cell';
  tdYear.innerText = `(${year})`;
  tr.append(tdYear);
  const tdImdb = document.createElement('td');
  tdImdb.className = 'film-table__cell';
  tdImdb.innerText = `imdb: ${imdb.toFixed(2)}`;
  tr.append(tdImdb);
  return tr;
}

export { tableHeader, tableRow };
