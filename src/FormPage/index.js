import FormPage from './FormPage.vue';

const install = (app) => {
  app.component('FormPage', FormPage);
};

FormPage.install = install;


if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
}
export default FormPage;
