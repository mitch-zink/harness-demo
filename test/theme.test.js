import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { test } from 'node:test';
import vm from 'node:vm';

// src/theme.js is a classic browser script, so run the real file against a fake page and storage.
const load = (storage = {}) => {
  const page = vm.createContext({ document: { documentElement: { style: {} } }, localStorage: storage });
  vm.runInContext(readFileSync(new URL('../src/theme.js', import.meta.url), 'utf8'), page);
  return { page, scheme: () => page.document.documentElement.style.colorScheme, run: code => vm.runInContext(code, page) };
};
const store = (value = null) => {
  const s = { value, getItem: () => s.value, setItem: (_, v) => { s.value = v }, removeItem: () => { s.value = null } };
  return s;
};
const broken = { getItem() { throw new Error('blocked') }, setItem() { throw new Error('blocked') }, removeItem() { throw new Error('blocked') } };

test('a saved light or dark forces that scheme on load', () => {
  assert.equal(load(store('dark')).scheme(), 'dark');
  assert.equal(load(store('light')).scheme(), 'light');
});

test('nothing saved, junk, or blocked storage follows the system', () => {
  for (const s of [store(), store('blue'), broken]) {
    const t = load(s);
    assert.equal(t.scheme(), 'light dark');
    assert.equal(t.run('savedTheme()'), 'system');
  }
});

test('saving a theme stores it and applies it; system clears it', () => {
  const s = store();
  const t = load(s);
  t.run("saveTheme('dark')");
  assert.equal(s.value, 'dark');
  assert.equal(t.scheme(), 'dark');
  assert.equal(t.run('savedTheme()'), 'dark');
  t.run("saveTheme('system')");
  assert.equal(s.value, null);
  assert.equal(t.scheme(), 'light dark');
});

test('a choice still applies for the page when storage is blocked', () => {
  const t = load(broken);
  t.run("saveTheme('light')");
  assert.equal(t.scheme(), 'light');
});
