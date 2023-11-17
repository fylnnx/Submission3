import MainPages from '../views/pages/mainpages';
import Favorite from '../views/pages/favorite';
import Detail from '../views/pages/detail';

const routes = {
  '/': MainPages,
  '/mainpages': MainPages,
  '/favorite': Favorite,
  '/detail/:id': Detail,
};

export default routes;
