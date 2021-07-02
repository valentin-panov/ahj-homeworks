import json from '../data/data.json';
import Table from './engine/table';

export default function init() {
  const table = new Table(json);
  table.renderTable();
  table.addListeners();
}

init();
