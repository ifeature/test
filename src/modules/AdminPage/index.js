import _ from 'lodash';
import Timer from './components/Timer';

_.defaults({ 'a': 1 }, { 'a': 3, 'b': 2 });

const root = document.getElementById('root');

root.innerText = 'Admin Page';

const timer = new Timer();
timer.render(root);
timer.run();

if (module.hot) {
    module.hot.accept(err => {
        console.error(err);
    });
}