var Store = require('react-observable-store').default;

export const updateTitle = (newTitle) => {
    Store.update('namespace', {title: {nested: newTitle}});
};
