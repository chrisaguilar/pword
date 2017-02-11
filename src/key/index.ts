import check from './check';
import create from './create';
import get from './get';

export default () => !check() && create() || get();
