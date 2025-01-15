import {render, h} from 'vue';
import MyToast from '@/components/ui/MyToast.vue';

const mount = (component, props) => {
  let el = document.createElement('div');
  el.id = 'toast'
  document.body.appendChild(el)

  let vNode = h(component, props);
  render(vNode, el);

  const unmount = (el) => {
    if (typeof el.remove !== 'undefined') {
      el.remove();
    } else {
      el.parentNode.removeChild(el);
    }
  };
  
  const destroy = () => {
    if (el) render(null, el);
    unmount(el)
    vNode = null;
  };

  return destroy;
};


const noty = (message, isSuccess) => {
  const destroy = mount(MyToast, {text: message, isSuccess});
  setTimeout(() => {
    destroy();
  }, 5000);
};

export default {
  install: (app) => {
    app.provide('successNoty', (message) => {
      noty(message, true);
    });

    app.provide('errorNoty', (message) => {
      noty(message, false);
    });
  },
};
