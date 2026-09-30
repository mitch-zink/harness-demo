// The to-do list: pure functions, so the tests need no browser.
export const add = (list, text) => text.trim() ? [...list, { id: list.length + 1, text: text.trim(), done: false }] : list;
export const toggle = (list, id) => list.map(t => t.id === id ? { ...t, done: !t.done } : t);
export const remaining = list => list.filter(t => !t.done).length;
