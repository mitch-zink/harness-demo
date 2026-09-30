import assert from 'node:assert/strict';
import { test } from 'node:test';
import { add, toggle, remaining } from '../src/todos.js';

test('adds, toggles and counts', () => {
  let list = add(add([], 'Buy milk'), '  ');
  assert.equal(list.length, 1);
  list = toggle(add(list, 'Call Quinn'), 1);
  assert.equal(remaining(list), 1);
});
