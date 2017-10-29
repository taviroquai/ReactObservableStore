var Store = require('react-observable-store').default;

export const updateSync = (newTitle) => {
    Store.update('namespace', {title: {nested: newTitle}});
};

export const updateAsync = (newTitle) => {
    Store.update('namespace', {loading: true});
    setTimeout(() => {
        Store.update('namespace', {loading: false, title: {nested: 'Updated'}});
    }, 2000);
};
