import DeleteButton from './DeleteButton.vue';

const install = (app) => {
  app.component('DeleteButton', DeleteButton);
};

DeleteButton.install = install;


if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
}
export default DeleteButton;
