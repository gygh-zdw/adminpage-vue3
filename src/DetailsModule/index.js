import DetailsModule from './DetailsModule.vue';

const install = (app) => {
  app.component('DetailsModule', DetailsModule);
};

DetailsModule.install = install;


if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
}
export default DetailsModule;
