import { create } from './create';
import { file } from './file';
import { get } from './get';

// There's only two things that need to be done to the key:
//   1. It needs to be created
//   2. It needs to be retrieved
//
// The key's location also needs to be known throughout the program,
//   so that should also be exported along with the two operations.
export { create, file, get };
