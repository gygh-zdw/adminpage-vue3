import TableColumn from './TableColumn.vue';

const install = (app) => {
  app.component('TableColumn', TableColumn);
};

TableColumn.install = install;

export default TableColumn;

if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
}
