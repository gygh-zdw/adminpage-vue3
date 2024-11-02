import LoadingWrap from './LoadingWrap.vue';

const install = (app) => {
  app.component('LoadingWrap', LoadingWrap);
};

LoadingWrap.install = install;


if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
}
export default LoadingWrap;