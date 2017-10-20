import activeModules from '@/pages/active';
let sidebars = {};

activeModules.forEach(modul => {
  try {
    // get module routes
    let moduleSidebar = require('@/pages/' + modul + '/sidebar').default;
    // add to sidebars
    sidebars[modul] = moduleSidebar;
  }
  catch (e) { }
});

export default sidebars;
