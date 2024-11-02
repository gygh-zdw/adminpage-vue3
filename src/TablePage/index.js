import TablePage from './TablePage.vue';

const install = (app) => {
  app.component('TablePage', TablePage);
};

TablePage.install = install;

export default TablePage;

if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
}
